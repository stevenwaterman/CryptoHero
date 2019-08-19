import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";

export function setupAccountsEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;
    app.get("/api/instruments/list", withBroker(broker, getAvailableAssets));
}

function getAvailableAssets(broker: Broker, req: Request, res: Response): void {
    //TODO
}
