import Big from "big.js";

export function createIPriceHistory(serverData: Array<any>): IPriceHistory {
    return serverData.map(
        it => new HistoricalPricePoint(it.time, Big(it.price)
        )
    );
}

export type IPriceHistory = Array<HistoricalPricePoint>;

export type PriceHistory = Map<string, IPriceHistory>;

export class HistoricalPricePoint {
    time: number;
    price: Big;

    constructor(time: number, price: Big) {
        this.time = time;
        this.price = price;
    }
}
