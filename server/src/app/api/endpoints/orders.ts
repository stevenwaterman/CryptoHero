import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";

function viewOrder(broker: Broker, req: Request, res: Response): void {
    //TODO
}

export function setupOrdersEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/api/orders/place", withBroker(broker, placeOrder));
    app.get("/api/orders/pending", withBroker(broker, pendingOrders));

    app.get("/api/orders/:order/view", withBroker(broker, viewOrder));
    app.post("/api/orders/:order/cancel", withBroker(broker, cancelOrder));
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