import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";

export function setupPriceEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.get("/prices", withBroker(broker, aggregatePrices));
}

function aggregatePrices(broker: Broker, req: Request, res: Response): void {
    //TODO
}
