import Broker from "../../brokers/broker";
import {Request, Response} from "express";
import Asset from "../../trading/asset";

export function getAssetParam(broker: Broker, req: Request, res: Response): Asset | null {
    const assetString: string | undefined = req.params["asset"];
    if (assetString == null) {
        res.status(400);
        res.send("Missing asset parameter");
        return null;
    }

    const asset: Asset | undefined = Asset.MAP.get(assetString);
    if (asset == null) {
        res.status(404);
        res.send(`Asset ${assetString} not recognised`);
        return null;
    }
    return asset;
}