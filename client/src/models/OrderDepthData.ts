const toPoint: (it: any) => OrderDepthPoint =
    (it: any) => new OrderDepthPoint(
        Number.parseFloat(it["unit price"]),
        Number.parseFloat(it.units)
    );

export class InstrumentOrderDepthData {
    readonly buys: Array<OrderDepthPoint>;
    readonly sells: Array<OrderDepthPoint>;

    constructor(buys: Array<OrderDepthPoint>, sells: Array<OrderDepthPoint>) {
        this.buys = buys;
        this.sells = sells;
    }

    static fromServer(priceAggregate: any): InstrumentOrderDepthData {
        const buys: Array<any> = priceAggregate.buy;
        const sells: Array<any> = priceAggregate.sell;

        return new InstrumentOrderDepthData(buys.map(toPoint), sells.map(toPoint));
    }
}

export type OrderDepthData = Map<string, InstrumentOrderDepthData>;

export class OrderDepthPoint{
    price: number;
    volume: number;

    constructor(price: number, volume: number) {
        this.price = price;
        this.volume = volume;
    }
}