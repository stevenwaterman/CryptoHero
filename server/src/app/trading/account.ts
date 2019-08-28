import {Big} from "big.js";
import uuidv4 from "uuid/v4";
import Asset from "./asset";
import * as Immutable from "immutable";
import {REGISTRY} from "../registry";
import Order from "./order";

export default class Account {
    id: string = uuidv4();

    /**
     * The amount left to place on new orders
     */
    private readonly availableAssets: Map<Asset, Big> = new Map<Asset, Big>(
        Asset.ALL.map((asset: Asset) => [asset, Big("0")])
    );

    readonly orders: Array<Order> = [];

    constructor() {
        REGISTRY.registerAccount(this);
    }

    adjustAssets(asset: Asset, addUnits: Big): void {
        this.availableAssets.set(
            asset,
            this.getAvailableAssets(asset).plus(addUnits)
        );
    }

    getAllAvailableAssets(): Immutable.Map<Asset, Big> {
        return Immutable.Map<Asset, Big>().withMutations(map => {
            this.availableAssets.forEach((amount, asset) => {
                map.set(asset, amount);
            })
        });
    }

    getAvailableAssets(asset: Asset): Big {
        return <Big>this.availableAssets.get(asset);
    }
}
