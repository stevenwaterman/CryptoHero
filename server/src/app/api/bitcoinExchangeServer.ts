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


export default class BitcoinExchangeServer {
    readonly app: Express = express();
    private server: http.Server = new http.Server(this.app);
    private io = socketIO(this.server);

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