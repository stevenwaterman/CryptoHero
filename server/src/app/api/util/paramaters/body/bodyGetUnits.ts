import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Big from "big.js";
import SER from "../../serialisation/SER";
import respond from "../../serialisation/respond";

export function bodyGetUnits(broker: Broker, req: Request, res: Response): Big | null {
    const unitString: string | undefined = req.body["units"];

    if (unitString == null) {
        respond(res, 400, "missing body parameter: units", SER.NO);
        return null
    }

    let units: Big;
    try {
        units = new Big(unitString);
    } catch {
        respond(res, 400, `units ${unitString} is not a number`, SER.NO);
        return null;
    }

    if (units.lte(new Big("0"))) {
        respond(res, 400, `units must be positive, was ${units.toString()}`, SER.NO);
        return null;
    }
    return units;
}
