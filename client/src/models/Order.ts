import Instrument from "./Instrument";
import Big from "big.js";

export default class Order {
    readonly id: string;
    readonly time: Date;
    readonly instrument: Instrument;
    readonly isBuy: boolean;
    readonly units: Big;
    readonly state: string;
    readonly unitPrice: Big;

    readonly remainingUnits: Big;
    readonly averagePrice: Big | null;

    constructor(id: string, time: Date, instrument: Instrument, isBuy: boolean, units: Big, price: Big, state: string, remaining: Big, averagePrice: Big | null) {
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
            Big(it.units),
            Big(it["unit price"]),
            it.state,
            Big(it["remaining units"]),
            it["average price"] == null ? null : Big(it["average price"])
        );
    }
}