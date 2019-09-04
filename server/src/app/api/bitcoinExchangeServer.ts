import express, {Express, Request, Response} from "express";
import Broker from "../brokers/broker";
import {setupOrdersEndpoints} from "./endpoints/orders";
import cors from "cors";
import {setupAccountsEndpoints} from "./endpoints/account";
import * as http from "http";
import {setupInstrumentEndpoints} from "./endpoints/instruments";
import socketIO, {Socket} from "socket.io";
import MarketPriceRoom, {MarketPricePayload} from "../websockets/MarketPriceRoom";
import SER from "./util/serialisation/SER";
import AggregatePriceRoom, {AggregatePricePayload} from "../websockets/AggregatePriceRoom";
import {REGISTRY} from "../registry";
import Account from "../trading/account";


export default class BitcoinExchangeServer {
    readonly app: Express = express();
    private server: http.Server = new http.Server(this.app);
    private io = socketIO(this.server, {origins: "http://localhost:3000"});

    readonly broker: Broker = new Broker();

    constructor() {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Methods', 'GET,POST');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        this.app.get("/", function(req: Request, res: Response): void {
            res.sendFile(__dirname + "/public/index.html")
        });

        MarketPriceRoom.join((payload: MarketPricePayload) => {
            const serialised = {
                instrument: SER.INSTRUMENT(payload.instrument),
                time: payload.time,
                price: SER.BIG(payload.newPrice),
            };
            this.io.emit("market price", serialised)
        });

        AggregatePriceRoom.join((payload: AggregatePricePayload) => {
            const serialised = {
                instrument: SER.INSTRUMENT(payload.instrument),
                delta: SER.PRICE_AGGREGATE(payload.delta)
            };
            this.io.emit("order depth", serialised)
        });

        this.io.on("connection", (socket: Socket) => {
            socket.on("account listener start", (accountId: string) => {
                const account: Account | undefined = REGISTRY.getAccount(accountId);
                if(account == null){
                    socket.emit("error", "invalid account id");
                }
                else {
                    const id1 = account.changedOrderRoom.join(payload => {
                        socket.emit("update order", SER.ORDER(payload.changedOrder));
                    });

                    const id2 = account.newOrderRoom.join(payload => {
                        socket.emit("update order", SER.ORDER(payload.newOrder));
                    });

                    const id3 = account.availableFundsRoom.join(payload => {
                        socket.emit("update funds", {
                            asset: SER.ASSET(payload.asset),
                            newAmount: SER.BIG(payload.newAmount)
                        });
                    });

                    socket.emit("account listener id", [id1, id2, id3])
                }
            });

            socket.on("account listener stop", (accountId: string, listenerId: [string, string, string]) => {
                const account: Account | undefined = REGISTRY.getAccount(accountId);
                if(account == null){
                    socket.emit("error", "invalid account id");
                }
                else {
                    account.changedOrderRoom.leave(listenerId[0]);
                    account.newOrderRoom.leave(listenerId[1]);
                    account.availableFundsRoom.leave(listenerId[2]);
                }
            })
        });

        setupAccountsEndpoints(this);
        setupInstrumentEndpoints(this);
        setupOrdersEndpoints(this);
    }

    launch(port: number): void {
        this.server = this.server.listen(port)
    }

    shutdown(): void {
        if (this.server != null) {
            this.server.close();
        }
    }
}