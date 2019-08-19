import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";

export function setupOrdersEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/orders/place", withBroker(broker, placeOrder));
    app.post("/orders/cancel", withBroker(broker, cancelOrder));

    app.get("/orders/pending", withBroker(broker, pendingOrders));
}

function placeOrder(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function cancelOrder(broker: Broker, req: Request, res: Response): void {
    //TODO
}

function pendingOrders(broker: Broker, req: Request, res: Response): void {
    //TODO
}