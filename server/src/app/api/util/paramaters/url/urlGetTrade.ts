import Broker from "../../../../brokers/broker";
import {Request, Response} from "express";
import Trade from "../../../../trading/trade";
import {REGISTRY} from "../../../../registry";

export function urlGetTrade(broker: Broker, req: Request, res: Response): Trade | null {
    const tradeId: string | undefined = req.params["tradeModal"];
    if (tradeId == null) {
        res.status(400);
        res.send("Missing tradeModal parameter");
        return null;
    }

    const trade: Trade | undefined = REGISTRY.getTrade(tradeId);
    if (trade == null) {
        res.status(404);
        res.send(`Trade ${tradeId} not found`);
        return null;
    }
    return trade;
}