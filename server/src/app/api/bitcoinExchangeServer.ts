import express, {Express} from "express";
import Broker from "../brokers/broker";
import {setupOrdersEndpoints} from "./endpoints/orders";
import cors from "cors";
import {setupAccountsEndpoints} from "./endpoints/account";
import {setupPriceEndpoints} from "./endpoints/prices";
import * as http from "http";
import {setupInstrumentEndpoints} from "./endpoints/instruments";


export default class BitcoinExchangeServer {
    readonly app: Express = express();
    readonly broker: Broker = new Broker();
    private server: http.Server | undefined;

    constructor() {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Methods', 'GET,POST');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        setupAccountsEndpoints(this);
        setupInstrumentEndpoints(this);
        setupOrdersEndpoints(this);
        setupPriceEndpoints(this);
    }

    launch(port: number): void {
        this.server = this.app.listen(port)
    }

    shutdown(): void {
        if (this.server != null) {
            this.server.close();
        }
    }
}