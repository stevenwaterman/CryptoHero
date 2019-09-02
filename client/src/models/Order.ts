import Instrument from "./Instrument";

export default class Order {
    readonly id: string;
    readonly time: Date;
    readonly instrument: Instrument;
    readonly isBuy: boolean;
    readonly units: number;
    readonly state: string;
    readonly unitPrice: number;

    readonly remainingUnits: number;
    readonly averagePrice: number | null;

    constructor(id: string, time: Date, instrument: Instrument, isBuy: boolean, units: number, price: number, state: string, remaining: number, averagePrice: number | null) {
        this.id = id;
        this.time = time;
        this.instrument = instrument;
        this.isBuy = isBuy;
        this.units = units;
        this.unitPrice = price;
        this.state = state;
        this.remainingUnits = remaining;
        this.averagePrice = averagePrice;
    }

    static create(it: any): Order {
        return new Order(
            it.id,
            new Date(it.time),
            Instrument.fromName(it.instrument),
            it.direction === "buy",
            Number.parseFloat(it.units),
            Number.parseFloat(it["unit price"]),
            it.state,
            Number.parseFloat(it["remaining units"]),
            it["average price"] == null ? null : Number.parseFloat(it["average price"])
        );
    }
}