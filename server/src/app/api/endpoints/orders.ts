import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";
import {urlGetAccount} from "../util/paramaters/url/urlGetAccount";
import {bodyGetUnits} from "../util/paramaters/body/bodyGetUnits";
import Order from "../../trading/order";
import {bodyGetDirection} from "../util/paramaters/body/bodyGetDirection";
import {bodyGetInstrument} from "../util/paramaters/body/bodyGetInstrument";
import {bodyGetUnitPrice} from "../util/paramaters/body/bodyGetUnitPrice";
import {urlGetOrder} from "../util/paramaters/url/urlGetOrder";

export function setupOrdersEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/api/orders/place", withBroker(broker, placeOrder));
    app.get("/api/orders/pending", withBroker(broker, pendingOrders));

    app.get("/api/orders/:order/view", withBroker(broker, viewOrder));
    app.post("/api/orders/:order/cancel", withBroker(broker, cancelOrder));
}

function placeOrder(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const direction = bodyGetDirection(broker, req, res);
    if (direction == null) return;

    const instrument = bodyGetInstrument(broker, req, res);
    if (instrument == null) return;

    const units = bodyGetUnits(broker, req, res);
    if (units == null) return;

    const unitPrice = bodyGetUnitPrice(broker, req, res);
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
    const order = urlGetOrder(broker, req, res);
    if (order == null) return;

    res.status(200);
    res.json(order);
}

function cancelOrder(broker: Broker, req: Request, res: Response): void {
    const order = urlGetOrder(broker, req, res);
    if (order == null) return;

    const instrument = bodyGetInstrument(broker, req, res);
    if (instrument == null) return;

    broker.cancelOrder(instrument, order);

    res.status(200);
    res.send("Successful");
}

function pendingOrders(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const pending = broker.getPendingOrders(account);

    res.status(200);
    res.json(pending);
}