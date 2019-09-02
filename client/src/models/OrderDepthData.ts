import Instrument from "./Instrument";

const toTuple: (it: any) => [number, number] =
    (it: any) => [
        Number.parseFloat(it["unit price"]),
        Number.parseFloat(it.units)
    ];

export class InstrumentOrderDepthData {
    readonly buys: Array<[number, number]>;
    readonly sells: Array<[number, number]>;

    constructor(buys: Array<[number, number]>, sells: Array<[number, number]>) {
        this.buys = buys;
        this.sells = sells;
    }

    static fromServer(priceAggregate: any): InstrumentOrderDepthData {
        const buys: Array<any> = priceAggregate.buy;
        const sells: Array<any> = priceAggregate.sell;

        return new InstrumentOrderDepthData(buys.map(toTuple), sells.map(toTuple));
    }
}

export default class OrderDepthData {
    readonly data: Map<string, InstrumentOrderDepthData>;

    constructor(data: Array<[Instrument, InstrumentOrderDepthData]>) {
        this.data = new Map(data.map(([instrument, data]) => [instrument.name, data]));
    }
}