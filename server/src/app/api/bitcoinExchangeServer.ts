import express, {Express} from "express";
import Broker from "../brokers/broker";
import {setupOrdersEndpoints} from "./endpoints/orders";
import cors from "cors";
import {setupAccountsEndpoints} from "./endpoints/account";
import {setupTradesEndpoints} from "./endpoints/trades";
import {setupPriceEndpoints} from "./endpoints/prices";

export default class BitcoinExchangeServer {
    readonly app: Express = express();
    readonly broker: Broker = new Broker();

    constructor() {
        this.app.use(cors());
        this.app.use(express.json());

        setupOrdersEndpoints(this);
        setupAccountsEndpoints(this);
        setupTradesEndpoints(this);
        setupPriceEndpoints(this);
    }

    launch(port: number): void {
        this.app.listen(port)
    }
}