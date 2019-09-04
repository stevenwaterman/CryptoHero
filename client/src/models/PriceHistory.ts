export function createIPriceHistory(serverData: Array<any>): IPriceHistory {
    return serverData.map(
        it => new HistoricalPricePoint(it.time, Number.parseFloat(it.price)
            )
    );
}

export type IPriceHistory = Array<HistoricalPricePoint>;

export type PriceHistory = Map<string, IPriceHistory>;

export class HistoricalPricePoint {
    time: number;
    price: number;

    constructor(time: number, price: number) {
        this.time = time;
        this.price = price;
    }
}
