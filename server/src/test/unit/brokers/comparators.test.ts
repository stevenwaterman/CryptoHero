import Account from "../../../app/trading/account";
import {buyComparator, sellComparator} from "../../../app/brokers/comparators";
import Order from "../../../app/trading/order";
import {Big} from "big.js";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import {REGISTRY} from "../../../app/registry";
import Asset from "../../../app/trading/asset";
import MockDate from "mockdate";

let acc1: Account;
let acc2: Account;
beforeEach(() => {
    REGISTRY.clear();
    acc1 = new Account();
    acc2 = new Account();
    [acc1, acc2].forEach(acc => {
        Asset.ALL.forEach(it => acc.adjustAssets(it, Big(1000)));
    });
});

describe("buyComparator", () => {
    let order1: Order;
    let order2: Order;
    let order3: Order;
    let order4: Order;

    beforeEach(() => {
        order1 = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, Big(100), Big("1.14"));
        order2 = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, Big(100), Big("1.2"));

        order3 = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, Big(100), Big("1.14"));
        order3.timestamp.setTime(order1.timestamp.getTime() + 1000);

        order4 = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, Big(200), Big("1.14"));
        order4.timestamp.setTime(order1.timestamp.getTime());
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
    });
});

describe("sellComparator", () => {
    let order1: Order;
    let order2: Order;
    let order3: Order;
    let order4: Order;

    beforeEach(() => {
        order1 = new Order(acc1, TradeDirection.SELL, Instrument.BTCGBP, Big(100), Big("1.14"));
        order2 = new Order(acc1, TradeDirection.SELL, Instrument.BTCGBP, Big(100), Big("1.2"));

        order3 = new Order(acc1, TradeDirection.SELL, Instrument.BTCGBP, Big(100), Big("1.14"));
        order3.timestamp.setTime(order1.timestamp.getTime() + 1000);

        order4 = new Order(acc1, TradeDirection.SELL, Instrument.BTCGBP, Big(200), Big("1.14"));
        order4.timestamp.setTime(order1.timestamp.getTime());
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
    });
});
