export default class Instrument {
    readonly name: string;
    readonly asset1: string;
    readonly asset2: string;

    static comparator = (a: Instrument, b: Instrument) => {
        const cmp = a.asset1.localeCompare(b.asset1);
        if (cmp !== 0) return cmp;
        return a.asset2.localeCompare(b.asset2)
    };

    constructor(asset1: string, asset2: string) {
        this.asset1 = asset1;
        this.asset2 = asset2;
        this.name = `${asset1}/${asset2}`;
    }

    static fromName(instrumentName: string): Instrument {
        const [asset1, asset2] = instrumentName.split("/") as [string, string];
        return new Instrument(asset1, asset2);
    }
}