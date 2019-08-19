import {Request, Response} from "express";
import Broker from "../../brokers/broker";
import Big from "big.js";

export function getUnitPrice(broker: Broker, req: Request, res: Response): Big | null {
    const priceString: string | undefined = req.body["unit price"];

    if (priceString == null) {
        res.status(400);
        res.send("missing body parameter: unit price");
        return null
    }

    try {
        return new Big(priceString);
    } catch {
        res.status(400);
        res.send(`unit price ${priceString} is not a number`);
        return null;
    }
}
