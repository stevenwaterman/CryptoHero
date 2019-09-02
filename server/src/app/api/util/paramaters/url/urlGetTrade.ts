import Broker from "../../../../brokers/broker";
import {Request, Response} from "express";
import Trade from "../../../../trading/trade";
import {REGISTRY} from "../../../../registry";
import SER from "../../serialisation/SER";
import {respondNoSer} from "../../serialisation/respond";

export function urlGetTrade(broker: Broker, req: Request, res: Response): Trade | null {
    const tradeId: string | undefined = req.params["trade"];
    if (tradeId == null) {
        respondNoSer(res, 400, "missing trade parameter");
        return null;
    }

    const trade: Trade | undefined = REGISTRY.getTrade(tradeId);
    if (trade == null) {
        respondNoSer(res, 404, `Trade ${tradeId} not found`);
        return null;
    }
    return trade;
}