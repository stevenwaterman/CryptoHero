import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Big from "big.js";
import SER from "../../serialisation/SER";
import {respondNoSer} from "../../serialisation/respond";

export function bodyGetUnits(broker: Broker, req: Request, res: Response): Big | null {
    const unitString: string | undefined = req.body["units"];

    if (unitString == null) {
        respondNoSer(res, 400, "missing body parameter: units");
        return null
    }

    let units: Big;
    try {
        units = Big(unitString);
    } catch {
        respondNoSer(res, 400, `units ${unitString} is not a number`);
        return null;
    }

    if (units.lte(0)) {
        respondNoSer(res, 400, `units must be positive, was ${units.toString()}`);
        return null;
    }
    return units;
}
