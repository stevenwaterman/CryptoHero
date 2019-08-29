import Broker from "../../../../brokers/broker";
import {Request, Response} from "express";
import Asset from "../../../../trading/asset";
import SER from "../../serialisation/SER";
import respond from "../../serialisation/respond";

export function urlGetAsset(broker: Broker, req: Request, res: Response): Asset | null {
    const assetString: string | undefined = req.params["asset"];
    if (assetString == null) {
        respond(res, 400, "Missing asset parameter", SER.NO);
        return null;
    }

    const asset: Asset | undefined = Asset.MAP.get(assetString);
    if (asset == null) {
        respond(res, 404, `Asset ${assetString} not recognised`, SER.NO);
        return null;
    }
    return asset;
}