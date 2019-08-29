import Instrument from "./Instrument";

export default class Order {
    readonly id: string;
    readonly time: Date;
    readonly instrument: Instrument;
    readonly isBuy: boolean;
    readonly units: number;
    readonly unitPrice: number;

    readonly remainingUnits: number;
    readonly averagePrice: number | null;

    constructor(id: string, time: Date, instrument: Instrument, isBuy: boolean, units: number, price: number, remaining: number, averagePrice: number | null) {
        this.id = id;
        this.time = time;
        this.instrument = instrument;
        this.isBuy = isBuy;
        this.units = units;
        this.unitPrice = price;
        this.remainingUnits = remaining;
        this.averagePrice = averagePrice;
    }
}