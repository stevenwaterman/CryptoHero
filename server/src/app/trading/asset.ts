import {List, Map, Set} from "immutable";

export default class Asset {
    static readonly GBP = new Asset("GBP");
    static readonly BTC = new Asset("BTC");
    static readonly LTC = new Asset("LTC");
    static readonly ALL: Set<Asset> = Set([Asset.GBP, Asset.BTC, Asset.LTC]);
    static readonly MAP: Map<string, Asset> = Asset.ALL.toMap().mapKeys((asset) => asset.name);
    static readonly NAMES: List<string> = Asset.MAP.keySeq().sort((a, b) => a.localeCompare(b)).toList();
    readonly name: string;

    private constructor(name: String) {
        if (name == null) throw "Name must be defined and not null";
        this.name = name.toUpperCase();
    }
}