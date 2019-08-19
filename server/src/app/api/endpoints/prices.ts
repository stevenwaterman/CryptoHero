import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";

export function setupPriceEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.get("/api/prices/aggregate", withBroker(broker, aggregatePrices));
    app.get("/api/prices/market", withBroker(broker, marketPrices))
}

function aggregatePrices(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function marketPrices(broker: Broker, req: Request, res: Response): void {
    //TODO
}
