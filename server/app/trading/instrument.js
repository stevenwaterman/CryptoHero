import {ASSETS} from "./asset";

export class Instrument {
    constructor(toAsset, fromAsset) {
        this.toAsset = toAsset;
        this.fromAsset = fromAsset;
        this.name = `${this.toAsset.name}${this.fromAsset.name}`;
    }
}

export const INSTRUMENTS = Object.freeze({
    "GBPBTC": new Instrument(ASSETS.GBP, ASSETS.BTC),
    "GBPLTC": new Instrument(ASSETS.GBP, ASSETS.LTC)
});