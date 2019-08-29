import Broker from "../../../../brokers/broker";
import {Request, Response} from "express";
import {REGISTRY} from "../../../../registry";
import Order from "../../../../trading/order";
import SER from "../../serialisation/SER";
import respond from "../../serialisation/respond";

export function urlGetOrder(broker: Broker, req: Request, res: Response): Order | null {
    const orderString: string | undefined = req.params["order"];
    if (orderString == null) {
        respond(res, 400, "missing order parameter", SER.NO);
        return null;
    }

    const order: Order | undefined = REGISTRY.getOrder(orderString);
    if (order == null) {
        respond(res, 404, `Order id ${orderString} not found`, SER.NO);
        return null;
    }
    return order;
}