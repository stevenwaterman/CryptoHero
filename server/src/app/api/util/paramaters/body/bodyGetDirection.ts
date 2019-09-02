import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import TradeDirection from "../../../../trading/tradeDirection";
import {respondNoSer} from "../../serialisation/respond";

export function bodyGetDirection(broker: Broker, req: Request, res: Response): TradeDirection | null {
    const directionString: string | undefined = req.body["direction"];

    if (directionString == null) {
        respondNoSer(res, 400, "missing body parameter direction");
        return null
    }

    const direction: TradeDirection | undefined = TradeDirection.MAP.get(directionString);
    if (direction == null) {
        respondNoSer(res, 404, `direction ${direction} not found`);
        return null
    }
    return direction
}
