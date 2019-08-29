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
    readonly fromAsset: Asset;

    private constructor(toAsset: Asset, fromAsset: Asset) {
        this.toAsset = toAsset;
        this.fromAsset = fromAsset;

        this.name = `${this.toAsset.name}/${this.fromAsset.name}`;
    }
}
