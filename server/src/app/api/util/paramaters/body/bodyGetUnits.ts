import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Big from "big.js";

export function bodyGetUnits(broker: Broker, req: Request, res: Response): Big | null {
    const unitString: string | undefined = req.body["units"];

    if (unitString == null) {
        res.status(400);
        res.send("missing body parameter: units");
        return null
    }

    let units: Big;
    try {
        units = new Big(unitString);
    } catch {
        res.status(400);
        res.send(`units ${unitString} is not a number`);
        return null;
    }

    if (units.lte(new Big("0"))) {
        res.status(400);
        res.send(`units must be positive, was ${units.toString()}`);
        return null;
    }
    return units;
}
