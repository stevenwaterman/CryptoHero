import Broker from "../../../../brokers/broker";
import {Request, Response} from "express";
import Asset from "../../../../trading/asset";
import SER from "../../serialisation/SER";
import {respondNoSer} from "../../serialisation/respond";

export function urlGetAsset(broker: Broker, req: Request, res: Response): Asset | null {
    const assetString: string | undefined = req.params["asset"];
    if (assetString == null) {
        respondNoSer(res, 400, "Missing asset parameter");
        return null;
    }

    const asset: Asset | undefined = Asset.MAP.get(assetString);
    if (asset == null) {
        respondNoSer(res, 404, `Asset ${assetString} not recognised`);
        return null;
    }
    return asset;
}