import Order from "../../app/trading/order";
import Account from "../../app/trading/account";
import {Big} from "big.js";
import {TradeDirection} from "../../app/trading/tradeDirection";

let account;
let buy1;
let buy2;
let buy3;
let buy4;
let buy5;
let sell1;
let sell2;
let sell3;
let sell4;
let sell5;

beforeEach(() => {
    account = new Account();
    buy1 = new Order(account, TradeDirection.BUY, new Big("1"), new Big("1"));
    buy2 = new Order(account, TradeDirection.BUY, new Big("2"), new Big("2.5"));
    buy3 = new Order(account, TradeDirection.BUY, new Big("2.5"), new Big("2"));
    buy4 = new Order(account, TradeDirection.BUY, new Big("2.5"), new Big("2.5"));
    buy5 = new Order(account, TradeDirection.BUY, new Big("2"), new Big("-2"));
    sell1 = new Order(account, TradeDirection.SELL, new Big("1"), new Big("1"));
    sell2 = new Order(account, TradeDirection.SELL, new Big("2"), new Big("2.5"));
    sell3 = new Order(account, TradeDirection.SELL, new Big("2.5"), new Big("2"));
    sell4 = new Order(account, TradeDirection.SELL, new Big("2.5"), new Big("2.5"));
    sell5 = new Order(account, TradeDirection.SELL, new Big("2"), new Big("-2"));
});

describe("construct", () => {
    test("constructor does not throw an exception", () => {
        expect(() => new Order(account, TradeDirection.BUY, new Big("100"), new Big("1.14"))).not.toThrow();
    });

    test("constructor should return an Order", () => {
        expect(new Order(account, TradeDirection.BUY, new Big("100"), new Big("1.14"))).toBeInstanceOf(Order);
    });

    test("constructor should throw error if called with negative units", () => {
        expect(() => new Order(account, TradeDirection.BUY, new Big("-100"), new Big("1.14"))).toThrow();
    });

    test("constructor should throw error if called with zero units", () => {
        expect(() => new Order(account, TradeDirection.BUY, new Big("0"), new Big("1.14"))).toThrow();
    });

    test("id is set and non-zero", () => {
        expect(new Order(account, TradeDirection.BUY, new Big("1"), new Big("1")).id).toBeTruthy();
    });
});

describe("gain amount", () => {
    test("BUY 1x1", () => {
        expect(buy1.gainAmount).toEqual(new Big("1"));
    });

    test("BUY 2x2.5", () => {
        expect(buy2.gainAmount).toEqual(new Big("2"));
    });

    test("BUY 2.5x2", () => {
        expect(buy3.gainAmount).toEqual(new Big("2.5"));
    });

    test("BUY 2.5x2.5", () => {
        expect(buy4.gainAmount).toEqual(new Big("2.5"));
    });

    test("BUY 2x-2", () => {
        expect(buy5.gainAmount).toEqual(new Big("2"));
    });

    test("SELL 1x1", () => {
        expect(sell1.gainAmount).toEqual(new Big("1"));
    });

    test("SELL 2x2.5", () => {
        expect(sell2.gainAmount).toEqual(new Big("5"));
    });

    test("SELL 2.5x2", () => {
        expect(sell3.gainAmount).toEqual(new Big("5"));
    });

    test("SELL 2.5x2.5", () => {
        expect(sell4.gainAmount).toEqual(new Big("6.25"));
    });

    test("SELL 2x-2", () => {
        expect(sell5.gainAmount).toEqual(new Big("-4"));
    });
});

describe("spend amount", () => {
    test("BUY 1x1", () => {
        expect(buy1.spendAmount).toEqual(new Big("1"));
    });

    test("BUY 2x2.5", () => {
        expect(buy2.spendAmount).toEqual(new Big("5"));
    });

    test("BUY 2.5x2", () => {
        expect(buy3.spendAmount).toEqual(new Big("5"));
    });

    test("BUY 2.5x2.5", () => {
        expect(buy4.spendAmount).toEqual(new Big("6.25"));
    });

    test("BUY 2x-2", () => {
        expect(buy5.spendAmount).toEqual(new Big("-4"));
    });

    test("SELL 1x1", () => {
        expect(sell1.spendAmount).toEqual(new Big("1"));
    });

    test("SELL 2x2.5", () => {
        expect(sell2.spendAmount).toEqual(new Big("2"));
    });

    test("SELL 2.5x2", () => {
        expect(sell3.spendAmount).toEqual(new Big("2.5"));
    });

    test("SELL 2.5x2.5", () => {
        expect(sell4.spendAmount).toEqual(new Big("2.5"));
    });

    test("SELL 2x-2", () => {
        expect(sell5.spendAmount).toEqual(new Big("2"));
    });
});
