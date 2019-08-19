import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";
import {getAccount} from "../util/getAccount";
import {getUnits} from "../util/getUnits";
import Order from "../../trading/order";
import {getTradeDirection} from "../util/getTradeDirection";
import {getInstrument} from "../util/getInstrument";
import {getUnitPrice} from "../util/getUnitPrice";
import {getOrderParam} from "../util/getOrder";

export function setupOrdersEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/api/orders/place", withBroker(broker, placeOrder));
    app.get("/api/orders/pending", withBroker(broker, pendingOrders));

    app.get("/api/orders/:order/view", withBroker(broker, viewOrder));
    app.post("/api/orders/:order/cancel", withBroker(broker, cancelOrder));
}

function placeOrder(broker: Broker, req: Request, res: Response): void {
    const account = getAccount(broker, req, res);
    if (account == null) return;

    const direction = getTradeDirection(broker, req, res);
    if (direction == null) return;

    const instrument = getInstrument(broker, req, res);
    if (instrument == null) return;

    const units = getUnits(broker, req, res);
    if (units == null) return;

    const unitPrice = getUnitPrice(broker, req, res);
    if (unitPrice == null) return;

    const order = new Order(account, direction, units, unitPrice);
    broker.placeOrder(instrument, order);

    const out = {
        "id": order.id
    };
    res.status(200);
    res.json(out);
}

function viewOrder(broker: Broker, req: Request, res: Response): void {
    const order = getOrderParam(broker, req, res);
    if (order == null) return;

    res.status(200);
    res.json(order);
}

function cancelOrder(broker: Broker, req: Request, res: Response): void {
    const order = getOrderParam(broker, req, res);
    if (order == null) return;

    const instrument = getInstrument(broker, req, res);
    if (instrument == null) return;

    broker.cancelOrder(instrument, order);

    res.status(200);
    res.send("Successful");
}

function pendingOrders(broker: Broker, req: Request, res: Response): void {
    const account = getAccount(broker, req, res);
    if (account == null) return;

    const pending = broker.getPendingOrders(account);

    res.status(200);
    res.json(pending);
}