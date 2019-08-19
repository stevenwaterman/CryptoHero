import Broker from "../../../../brokers/broker";
import {Request, Response} from "express";
import {REGISTRY} from "../../../../registry";
import Order from "../../../../trading/order";

export function urlGetOrder(broker: Broker, req: Request, res: Response): Order | null {
    const orderString: string | undefined = req.params["order"];
    if (orderString == null) {
        res.status(400);
        res.send("Missing order parameter");
        return null;
    }

    const order: Order | undefined = REGISTRY.getOrder(orderString);
    if (order == null) {
        res.status(404);
        res.send(`Order id ${orderString} not found`);
        return null;
    }
    return order;
}