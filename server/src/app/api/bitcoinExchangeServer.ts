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