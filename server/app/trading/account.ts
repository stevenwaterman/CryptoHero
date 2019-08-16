import {Big} from "big.js";
import uuidv4 from "uuid/v4";
import Asset from "./asset";
import {Map} from "immutable";

export default class Account {
    id = uuidv4();

    /**
     * The amount left to place on new orders
     */
    private readonly availableAssets = Map(
        Asset.ALL.map((asset: Asset) => [asset, Big("0")])
    ).asMutable();

    constructor() {
    }

    adjustAssets(asset: Asset, addUnits: Big) {
        this.availableAssets.set(
            asset,
            this.getAvailableAssets(asset).plus(addUnits)
        );
    }

    getAvailableAssets(asset: Asset): Big {
        return <Big>this.availableAssets.get(asset);
    }
}
