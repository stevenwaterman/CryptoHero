import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import {withBroker} from "../util/withBroker";
import Broker from "../../brokers/broker";

export function setupTradesEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.get("/api/trades/list", withBroker(broker, listTrades));
    app.get("/api/trades/:trade/view", withBroker(broker, viewTrade));
}

function listTrades(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function viewTrade(broker: Broker, req: Request, res: Response): void {
    //TODO
}
