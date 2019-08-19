import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";

export function setupAccountsEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;
    app.get("/api/account/assets/available", withBroker(broker, getAvailableAssets));
    app.get("/api/account/assets/total", withBroker(broker, getTotalAssets));
    app.post("/api/account/assets/deposit", withBroker(broker, depositAssets));
    app.post("/api/account/assets/withdraw", withBroker(broker, withdrawAssets));
}

function getAvailableAssets(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function getTotalAssets(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function depositAssets(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function withdrawAssets(broker: Broker, req: Request, res: Response): void {
    //TODO
}