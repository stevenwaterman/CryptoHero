import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import TradeDirection from "../../../../trading/tradeDirection";
import SER from "../../serialisation/SER";
import respond from "../../serialisation/respond";

export function bodyGetDirection(broker: Broker, req: Request, res: Response): TradeDirection | null {
    const directionString: string | undefined = req.body["direction"];

    if (directionString == null) {
        respond(res, 400, "missing body parameter direction", SER.NO);
        return null
    }

    const direction: TradeDirection | undefined = TradeDirection.MAP.get(directionString);
    if (direction == null) {
        respond(res, 404, `direction ${direction} not found`, SER.NO);
        return null
    }
    return direction
}
