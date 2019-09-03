import Instrument from "./Instrument";

export class InstrumentPriceHistory {
    readonly data: Array<[number, number]>;

    constructor(data: Array<[number, number]>) {
        this.data = data;
    }

    static fromServer(serverData: Array<any>): InstrumentPriceHistory {
        const data: Array<[number, number]> = serverData.map(it => [it.time, Number.parseFloat(it.price)]);
        return new InstrumentPriceHistory(data);
    }
}

export type PriceHistory = Map<string, InstrumentPriceHistory>;
