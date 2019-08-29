import Asset from "./asset";
import {List, Map, Set} from "immutable";

export default class Instrument {
    static readonly BTCGBP = new Instrument(Asset.BTC, Asset.GBP);
    static readonly LTCGBP = new Instrument(Asset.LTC, Asset.GBP);

    static readonly ALL: Set<Instrument> = Set([
        Instrument.BTCGBP,
        Instrument.LTCGBP
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
