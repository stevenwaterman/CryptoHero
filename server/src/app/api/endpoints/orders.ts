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
import SER from "../util/serialisation/SER";
import {bodyGetAccount} from "../util/paramaters/body/bodyGetAccount";
import {respond, respondNoSer} from "../util/serialisation/respond";

export function setupOrdersEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/api/orders/place", withBroker(broker, placeOrder));
    app.post("/api/orders/:order/cancel", withBroker(broker, cancelOrder));

    app.get("/api/orders/:order/view", withBroker(broker, viewOrder));
    app.get("/api/orders/list/account/:account", withBroker(broker, listOrders));
}

function placeOrder(broker: Broker, req: Request, res: Response): void {
    const account = bodyGetAccount(broker, req, res);
    if (account == null) return;

    const direction = bodyGetDirection(broker, req, res);
    if (direction == null) return;

    const instrument = bodyGetInstrument(broker, req, res);
    if (instrument == null) return;

    const units = bodyGetUnits(broker, req, res);
    if (units == null) return;

    const unitPrice = bodyGetUnitPrice(broker, req, res);
    if (unitPrice == null) return;

    const order = new Order(account, direction, instrument, units, unitPrice);
    try {
        broker.placeOrder(order);
    } catch (error) {
        return respondNoSer(res, 400, error);
    }

    respond(res, 200, order, SER.ORDER);
}

function listOrders(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;
    respond(res, 200, account.orders, SER.ARRAYFUNC(SER.ORDER));
}

function cancelOrder(broker: Broker, req: Request, res: Response): void {
    const order = urlGetOrder(broker, req, res);
    if (order == null) return;

    broker.cancelOrder(order);
    respondNoSer(res, 200, "Successful");
}

function viewOrder(broker: Broker, req: Request, res: Response): void {
    const order = urlGetOrder(broker, req, res);
    if (order == null) return;
    respond(res, 200, order, SER.ORDER);
}
