import Big from "big.js";

const toOrderDepthPoint: (it: any) => OrderDepthPoint =
    (it: any) => new OrderDepthPoint(
        Big(it["unit price"]),
        Big(it.units)
    );

export class IOrderDepth {
    readonly buys: DirectionalOrderDepth;
    readonly sells: DirectionalOrderDepth;

    constructor(buys: DirectionalOrderDepth, sells: DirectionalOrderDepth) {
        this.buys = buys;
        this.sells = sells;
    }

    static fromServer(priceAggregate: any): IOrderDepth {
        const buys: Array<any> = priceAggregate.buy;
        const sells: Array<any> = priceAggregate.sell;

        return new IOrderDepth(buys.map(toOrderDepthPoint), sells.map(toOrderDepthPoint));
    }
}

export type OrderDepth = Map<string, IOrderDepth>;

export type DirectionalOrderDepth = Array<OrderDepthPoint>;

export class OrderDepthPoint {
    readonly price: Big;
    readonly volume: Big;

    constructor(price: Big, volume: Big) {
        this.price = price;
        this.volume = volume;
    }
}