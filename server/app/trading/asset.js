export class Asset {
    constructor(name) {
        if (name == null) throw "Name must be defined and not null";
        this.name = name.toUpperCase();
    }
}

export const ASSETS = Object.freeze({
    "GBP": new Asset("GBP"),
    "BTC": new Asset("BTC"),
    "LTC": new Asset("LTC")
});