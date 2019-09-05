import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Big from "big.js";
import SER from "../../serialisation/SER";
import {respondNoSer} from "../../serialisation/respond";

export function bodyGetUnitPrice(broker: Broker, req: Request, res: Response): Big | null {
    const priceString: string | undefined = req.body["unitPrice"];

    if (priceString == null) {
        respondNoSer(res, 400, "missing body parameter: unit price");
        return null
    }

    try {
        return Big(priceString);
    } catch {
        respondNoSer(res, 400, `unit price ${priceString} not found`);
        return null;
    }
}
