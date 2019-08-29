import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Big from "big.js";
import SER from "../../serialisation/SER";
import respond from "../../serialisation/respond";

export function bodyGetUnitPrice(broker: Broker, req: Request, res: Response): Big | null {
    const priceString: string | undefined = req.body["unit price"];

    if (priceString == null) {
        respond(res, 400, "missing body parameter: unit price", SER.NO);
        return null
    }

    try {
        return new Big(priceString);
    } catch {
        respond(res, 400, `unit price ${priceString} not found`, SER.NO);
        return null;
    }
}
