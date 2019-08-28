import Account from "../../../app/trading/account";
import {buyComparator, sellComparator} from "../../../app/brokers/comparators";
import Order from "../../../app/trading/order";
import {Big} from "big.js";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";

let acc1: Account;
let acc2: Account;

beforeEach(() => {
    acc1 = new Account();
    acc2 = new Account();
});

describe("buyComparator", () => {
    let order1: Order;
    let order2: Order;
    let order3: Order;
    let order4: Order;
    let order5: Order;

    beforeEach(() => {
        order1 = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("100"), new Big("1.14"));
        order2 = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("100"), new Big("1.2"));

        order3 = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("100"), new Big("1.14"));
        order3.timestamp.setTime(order1.timestamp.getTime() + 1000);

        order4 = {...order1};

        order5 = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("200"), new Big("1.14"));
        order5.timestamp.setTime(order1.timestamp.getTime());
    });

    test("different prices, higher price comes first", () => {
        expect(buyComparator(order1, order2)).toBeGreaterThan(0);
        expect(buyComparator(order2, order1)).toBeLessThan(0);
    });

    test("same prices, lower timestamp comes first", () => {
        expect(buyComparator(order1, order3)).toBeLessThan(0);
        expect(buyComparator(order3, order1)).toBeGreaterThan(0);
    });

    test("same price, timestamp, and id returns 0", () => {
        expect(buyComparator(order1, order1)).toEqual(0);
        expect(buyComparator(order1, order4)).toEqual(0);
    });

    test("same price and timestamp, different account, does not return 0", () => {
        expect(buyComparator(order4, order5)).not.toEqual(0);
    });
});

describe("sellComparator", () => {
    let order1: Order;
    let order2: Order;
    let order3: Order;
    let order4: Order;
    let order5: Order;

    beforeEach(() => {
        order1 = new Order(acc1, TradeDirection.SELL, Instrument.GBPBTC, new Big("100"), new Big("1.14"));
        order2 = new Order(acc1, TradeDirection.SELL, Instrument.GBPBTC, new Big("100"), new Big("1.2"));

        order3 = new Order(acc1, TradeDirection.SELL, Instrument.GBPBTC, new Big("100"), new Big("1.14"));
        order3.timestamp.setTime(order1.timestamp.getTime() + 1000);

        order4 = {...order1};

        order5 = new Order(acc1, TradeDirection.SELL, Instrument.GBPBTC, new Big("200"), new Big("1.14"));
        order5.timestamp.setTime(order1.timestamp.getTime());
    });

    test("different prices, lower price comes first", () => {
        expect(sellComparator(order1, order2)).toBeLessThan(0);
        expect(sellComparator(order2, order1)).toBeGreaterThan(0);
    });

    test("same prices, lower timestamp comes first", () => {
        expect(sellComparator(order1, order3)).toBeLessThan(0);
        expect(sellComparator(order3, order1)).toBeGreaterThan(0);
    });

    test("same price, timestamp, and id returns 0", () => {
        expect(sellComparator(order1, order1)).toEqual(0);
        expect(sellComparator(order1, order4)).toEqual(0);
    });

    test("same price and timestamp, different id, does not return 0", () => {
        expect(sellComparator(order4, order5)).not.toEqual(0);
    });
});
