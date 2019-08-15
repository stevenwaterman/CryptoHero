import Account from "../../app/trading/account";
import {buyComparator, sellComparator} from "../../app/brokers/comparators";

let acc1, acc2;

beforeAll(() => {
    acc1 = new Account();
    acc2 = new Account();
});

describe("buyComparator", () => {
    let order1, order2, order3, order4, order5;

    beforeAll(() => {
        order1 = acc1.createBuy(100, 1.14);
        order2 = acc1.createBuy(100, 1.20);

        order3 = acc1.createBuy(100, 1.14);
        order3.timeStamp.setTime(order1.timeStamp.getTime() + 1000);

        order4 = acc1.createBuy(200, 1.14);
        order4.timestamp = order1.timestamp;

        order5 = acc2.createBuy(200, 1.14);
        order5.timestamp = order1.timestamp;
    });

    test("different prices, higher price comes first", () => {
        expect(buyComparator(order1, order2)).toBeGreaterThan(0);
        expect(buyComparator(order2, order1)).toBeLessThan(0);
    });

    test("same prices, lower timestamp comes first", () => {
        expect(buyComparator(order1, order3)).toBeLessThan(0);
        expect(buyComparator(order3, order1)).toBeGreaterThan(0);
    });

    test("same price, timestamp, and account returns 0", () => {
        expect(buyComparator(order1, order1)).toEqual(0);
        expect(buyComparator(order1, order4)).toEqual(0);
    });

    test("same price and timestamp, different account, does not return 0", () => {
        expect(buyComparator(order4, order5)).not.toEqual(0);
    });
});

describe("sellComparator", () => {
    let order1, order2, order3, order4, order5;

    beforeAll(() => {
        order1 = acc1.createSell(100, 1.14);
        order2 = acc1.createSell(100, 1.20);

        order3 = acc1.createSell(100, 1.14);
        order3.timeStamp.setTime(order1.timeStamp.getTime() + 1000);

        order4 = acc1.createSell(200, 1.14);
        order4.timestamp = order1.timestamp;

        order5 = acc2.createSell(200, 1.14);
        order5.timestamp = order1.timestamp;
    });

    test("different prices, lower price comes first", () => {
        expect(sellComparator(order1, order2)).toBeLessThan(0);
        expect(sellComparator(order2, order1)).toBeGreaterThan(0);
    });

    test("same prices, lower timestamp comes first", () => {
        expect(sellComparator(order1, order3)).toBeLessThan(0);
        expect(sellComparator(order3, order1)).toBeGreaterThan(0);
    });

    test("same price, timestamp, and account returns 0", () => {
        expect(sellComparator(order1, order1)).toEqual(0);
        expect(sellComparator(order1, order4)).toEqual(0);
    });

    test("same price and timestamp, different account, does not return 0", () => {
        expect(sellComparator(order4, order5)).not.toEqual(0);
    });
});