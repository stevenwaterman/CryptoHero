import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import TradeDirection from "../../../../trading/tradeDirection";

export function bodyGetDirection(broker: Broker, req: Request, res: Response): TradeDirection | null {
    const directionString: string | undefined = req.body["direction"];

    if (directionString == null) {
        res.status(400);
        res.send("missing body parameter: direction");
        return null
    }

    const direction: TradeDirection | undefined = TradeDirection.MAP.get(directionString);
    if (direction == null) {
        res.status(404);
        res.send(`direction ${direction} not found`);
        return null
    }
    return direction
}
