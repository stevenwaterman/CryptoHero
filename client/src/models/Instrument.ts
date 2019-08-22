export default class Instrument {
    readonly name: string;
    readonly asset1: string;
    readonly asset2: string;

    constructor(asset1: string, asset2: string) {
        this.asset1 = asset1;
        this.asset2 = asset2;
        this.name = `${asset1}/${asset2}`;
    }
}