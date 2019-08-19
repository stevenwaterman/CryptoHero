import Asset from "./asset";
import {List, Map, Set} from "immutable";

export default class Instrument {
    static readonly GBPBTC = new Instrument(Asset.GBP, Asset.BTC);
    static readonly GBPLTC = new Instrument(Asset.GBP, Asset.LTC);

    static readonly ALL: Set<Instrument> = Set([
        Instrument.GBPBTC,
        Instrument.GBPLTC
    ]);
    static readonly MAP: Map<string, Instrument> = Instrument.ALL.toMap().mapKeys((inst) => inst.name);
    static readonly NAMES: List<string> = Instrument.MAP.keySeq().sort((a, b) => a.localeCompare(b)).toList();

    readonly name: string;
    readonly toAsset: Asset;
    readonly buyerGains: Asset;
    readonly sellerSpends: Asset;
    readonly fromAsset: Asset;
    readonly buyerSpends: Asset;
    readonly sellerGains: Asset;

    private constructor(toAsset: Asset, fromAsset: Asset) {
        this.toAsset = toAsset;
        this.buyerGains = toAsset;
        this.sellerSpends = toAsset;

        this.fromAsset = fromAsset;
        this.buyerSpends = fromAsset;
        this.sellerGains = fromAsset;

        this.name = `${this.toAsset.name}${this.fromAsset.name}`;
    }
}
