import {List, Map, Set} from "immutable";

export default class Asset {
    static readonly GBP = new Asset("GBP");
    static readonly USD = new Asset("USD");
    static readonly BTC = new Asset("BTC");
    static readonly ETH = new Asset("ETH");
    static readonly BCH = new Asset("BCH");
    static readonly LTC = new Asset("LTC");
    static readonly BNB = new Asset("BNB");
    static readonly XMR = new Asset("XMR");
    static readonly XLM = new Asset("XLM");
    static readonly DOGE = new Asset("DOGE");

    static readonly ALL: Set<Asset> = Set([
        Asset.GBP,
        Asset.USD,
        Asset.BTC,
        Asset.ETH,
        Asset.BCH,
        Asset.LTC,
        Asset.BNB,
        Asset.XMR,
        Asset.XLM,
        Asset.DOGE
    ]);

    static readonly MAP: Map<string, Asset> = Asset.ALL.toMap().mapKeys((asset) => asset.name);
    static readonly NAMES: List<string> = Asset.MAP.keySeq().sort((a, b) => a.localeCompare(b)).toList();
    readonly name: string;

    private constructor(name: String) {
        if (name == null) throw "Name must be defined and not null";
        this.name = name.toUpperCase();
    }
}
