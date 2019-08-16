import Asset from "./asset";
import {Map, Set} from "immutable";

export default class Instrument {
    static readonly GBPBTC = new Instrument(Asset.GBP, Asset.BTC);
    static readonly GBPLTC = new Instrument(Asset.GBP, Asset.LTC);
    static readonly ALL: Set<Instrument> = Set([
        Instrument.GBPBTC,
        Instrument.GBPLTC
    ]);
    static readonly MAP: Map<Instrument, Instrument> = Instrument.ALL.toMap();
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
