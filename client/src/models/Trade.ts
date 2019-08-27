import Instrument from "./Instrument";

export default class Trade {
    readonly id: string;
    readonly instrument: Instrument;
    readonly time: Date;
    readonly units: number;
    readonly price: number;
    readonly isBuy: boolean;

    constructor(id: string, instrument: Instrument, time: Date, units: number, price: number, buy: boolean) {
        this.id = id;
        this.instrument = instrument;
        this.time = time;
        this.units = units;
        this.price = price;
        this.isBuy = buy;
    }
}