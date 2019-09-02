import Broker from "../../../../brokers/broker";
import {Request, Response} from "express";
import {REGISTRY} from "../../../../registry";
import Order from "../../../../trading/order";
import SER from "../../serialisation/SER";
import {respondNoSer} from "../../serialisation/respond";

export function urlGetOrder(broker: Broker, req: Request, res: Response): Order | null {
    const orderString: string | undefined = req.params["order"];
    if (orderString == null) {
        respondNoSer(res, 400, "missing order parameter");
        return null;
    }

    const order: Order | undefined = REGISTRY.getOrder(orderString);
    if (order == null) {
        respondNoSer(res, 404, `Order id ${orderString} not found`);
        return null;
    }
    return order;
}