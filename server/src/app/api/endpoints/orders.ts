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
import Instrument from "../../trading/instrument";
import PendingOrders from "../../brokers/pendingOrders";
import {Map} from "immutable";
import {bodyGetAccount} from "../util/paramaters/body/bodyGetAccount";

export function setupOrdersEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/api/orders/place", withBroker(broker, placeOrder));
    app.post("/api/orders/:order/cancel", withBroker(broker, cancelOrder));

    app.get("/api/orders/pending/account/:account", withBroker(broker, pendingOrders));
    app.get("/api/orders/:order/view", withBroker(broker, viewOrder));
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

    const order = new Order(account, direction, units, unitPrice);
    try {
        broker.placeOrder(instrument, order);
    } catch (error) {
        res.status(400);
        res.send(error.message);
        return;
    }

    const out = {
        "id": order.id
    };
    res.status(200);
    res.json(out);
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

function viewOrder(broker: Broker, req: Request, res: Response): void {
    const order = urlGetOrder(broker, req, res);
    if (order == null) return;

    const serialisable = SER.ORDER(order);
    res.status(200);
    res.json(serialisable);
}

function pendingOrders(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const pending: Map<Instrument, PendingOrders> = broker.getPendingOrders(account);
    const serialisable = SER.MAP(pending, SER.INSTRUMENT, SER.PENDING_ORDERS);
    res.status(200);
    res.json(serialisable);
}