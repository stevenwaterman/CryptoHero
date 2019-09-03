import Instrument from "./Instrument";

export class InstrumentHistoricalPriceData {
    readonly data: Array<[number, number]>;

    constructor(data: Array<[number, number]>) {
        this.data = data;
    }

    static fromServer(serverData: Array<any>): InstrumentHistoricalPriceData {
        const data: Array<[number, number]> = serverData.map(it => [it.time, Number.parseFloat(it.price)]);
        return new InstrumentHistoricalPriceData(data);
    }
}

export default class HistoricalPriceData {
    readonly data: Map<string, InstrumentHistoricalPriceData>;
    constructor(data: Array<[Instrument, InstrumentHistoricalPriceData]>) {
        this.data = new Map(data.map(([instrument, data]) => [instrument.name, data]));
    }
}