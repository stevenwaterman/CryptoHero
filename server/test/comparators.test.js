import Order, {buyComparator, sellComparator, TradeDirection} from "../app/order";

describe("buyComparator", () => {
    const trade1 = new Order(1, TradeDirection.BUY, 100, 1.14);
    const trade2 = new Order(1, TradeDirection.BUY, 100, 1.20);

    const trade3 = new Order(1, TradeDirection.BUY, 100, 1.14);
    trade3.timeStamp.setTime(trade1.timeStamp.getTime() + 1000);

    const trade4 = new Order(1, TradeDirection.BUY, 200, 1.14);
    const trade5 = new Order(2, TradeDirection.BUY, 200, 1.14);
    trade4.timestamp = trade1.timestamp;
    trade5.timestamp = trade1.timestamp;

    test("different prices, higher price comes first", () => {
        expect(buyComparator(trade1, trade2)).toBeGreaterThan(0);
        expect(buyComparator(trade2, trade1)).toBeLessThan(0);
    });

    test("same prices, lower timestamp comes first", () => {
        expect(buyComparator(trade1, trade3)).toBeLessThan(0);
        expect(buyComparator(trade3, trade1)).toBeGreaterThan(0);
    });

    test("same price, timestamp, and account returns 0", () => {
        expect(buyComparator(trade1, trade1)).toEqual(0);
        expect(buyComparator(trade1, trade4)).toEqual(0);
    });

    test("same price and timestamp, different account, does not return 0", () => {
        expect(buyComparator(trade4, trade5)).not.toEqual(0);
    })
});

describe("sellComparator", () => {
    const trade1 = new Order(1, TradeDirection.SELL, 100, 1.14);
    const trade2 = new Order(1, TradeDirection.SELL, 100, 1.20);

    const trade3 = new Order(1, TradeDirection.SELL, 100, 1.14);
    trade3.timeStamp.setTime(trade1.timeStamp.getTime() + 1000);

    const trade4 = new Order(1, TradeDirection.SELL, 200, 1.14);
    const trade5 = new Order(2, TradeDirection.SELL, 200, 1.14);
    trade4.timestamp = trade1.timestamp;
    trade5.timestamp = trade1.timestamp;

    test("different prices, lower price comes first", () => {
        expect(sellComparator(trade1, trade2)).toBeLessThan(0);
        expect(sellComparator(trade2, trade1)).toBeGreaterThan(0);
    });

    test("same prices, lower timestamp comes first", () => {
        expect(sellComparator(trade1, trade3)).toBeLessThan(0);
        expect(sellComparator(trade3, trade1)).toBeGreaterThan(0);
    });

    test("same price, timestamp, and account returns 0", () => {
        expect(sellComparator(trade1, trade1)).toEqual(0);
        expect(sellComparator(trade1, trade4)).toEqual(0);
    });

    test("same price and timestamp, different account, does not return 0", () => {
        expect(sellComparator(trade4, trade5)).not.toEqual(0);
    })
});