import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";

function assetGetAvailable(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function assetGetTotal(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function assetDeposit(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function assetWithdraw(broker: Broker, req: Request, res: Response): void {
    //TODO
}

export function setupAccountsEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;
    app.get("/api/account/assets/available", withBroker(broker, getAvailableAssets));
    app.get("/api/account/assets/total", withBroker(broker, getTotalAssets));

    app.get("/api/account/assets/:asset/available", withBroker(broker, assetGetAvailable));
    app.get("/api/account/assets/:asset/total", withBroker(broker, assetGetTotal));
    app.post("/api/account/assets/:asset/deposit", withBroker(broker, assetDeposit));
    app.post("/api/account/assets/:asset/withdraw", withBroker(broker, assetWithdraw));
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