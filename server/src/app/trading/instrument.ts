import Asset from "./asset";
import {List, Map, Set} from "immutable";

export default class Instrument {
    static readonly GBPUSD = new Instrument(Asset.GBP, Asset.USD);
    static readonly BTCGBP = new Instrument(Asset.BTC, Asset.GBP);
    static readonly LTCGBP = new Instrument(Asset.LTC, Asset.GBP);
    static readonly BTCUSD = new Instrument(Asset.BTC, Asset.USD);
    static readonly ETHUSD = new Instrument(Asset.ETH, Asset.USD);
    static readonly BCHUSD = new Instrument(Asset.BCH, Asset.USD);
    static readonly LTCUSD = new Instrument(Asset.LTC, Asset.USD);
    static readonly BNBUSD = new Instrument(Asset.BNB, Asset.USD);
    static readonly XMRUSD = new Instrument(Asset.XMR, Asset.USD);
    static readonly XLMUSD = new Instrument(Asset.XLM, Asset.USD);
    static readonly DOGEUSD = new Instrument(Asset.DOGE, Asset.USD);
    static readonly LTCBTC = new Instrument(Asset.LTC, Asset.BTC);
    static readonly ETHBTC = new Instrument(Asset.ETH, Asset.BTC);
    static readonly BCHBTC = new Instrument(Asset.BCH, Asset.BTC);

    static readonly ALL: Set<Instrument> = Set([
        Instrument.GBPUSD, Instrument.BTCGBP, Instrument.LTCGBP, Instrument.BTCUSD, Instrument.ETHUSD,
        Instrument.BCHUSD, Instrument.LTCUSD, Instrument.BNBUSD, Instrument.XMRUSD, Instrument.XLMUSD,
        Instrument.DOGEUSD, Instrument.LTCBTC, Instrument.ETHBTC, Instrument.BCHBTC
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
