import {Request, Response} from "express";
import Broker from "../../brokers/broker";
import Big from "big.js";

export function getUnits(broker: Broker, req: Request, res: Response): Big | null {
    const amountString: string | undefined = req.body["amount"];

    if (amountString == null) {
        res.status(400);
        res.send("missing body parameter: amount");
        return null
    }

    try {
        return new Big(amountString);
    } catch {
        res.status(400);
        res.send(`units ${amountString} is not a number`);
        return null;
    }
}
