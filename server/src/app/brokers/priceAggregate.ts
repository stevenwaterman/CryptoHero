import Big from "big.js";

/**
 * The best prices go at the start of each array
 */
export default class PriceAggregate {
    readonly buy: Array<PriceAggregateElement>;
    readonly sell: Array<PriceAggregateElement>;

    constructor(buy: Array<PriceAggregateElement>, sell: Array<PriceAggregateElement>) {
        this.buy = buy;
        this.sell = sell;
    }
}

export class PriceAggregateElement {
    readonly unitPrice: Big;
    units: Big;

    constructor(price: Big, units: Big) {
        this.unitPrice = price;
        this.units = units;
    }
}