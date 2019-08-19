import Account from "../app/trading/account";
import {REGISTRY} from "../app/registry";
import Order from "../app/trading/order";
import TradeDirection from "../app/trading/tradeDirection";
import Trade from "../app/trading/trade";
import Big from "big.js";

beforeEach(() => {
    REGISTRY.clear();
});

describe("objects don't show up without being created", () => {
    test("account", () => {
        expect(REGISTRY.getAccount("1")).toBeUndefined();
        new Account();
        expect(REGISTRY.getAccount("1")).toBeUndefined();
    });
    test("order", () => {
        expect(REGISTRY.getOrder("1")).toBeUndefined();
        new Order(new Account(), TradeDirection.BUY, new Big("1"), new Big("1"));
        expect(REGISTRY.getOrder("1")).toBeUndefined();
    });
    test("trade", () => {
        expect(REGISTRY.getTrade("1")).toBeUndefined();
        new Trade(new Account(), new Account(), new Big("1"), new Big("1"));
        expect(REGISTRY.getTrade("1")).toBeUndefined();
    });
});

describe("objects show up after being created", () => {
    test("account", () => {
        const acc = new Account();
        expect(REGISTRY.getAccount(acc.id)).toEqual(acc);
    });
    test("order", () => {
        const order = new Order(new Account(), TradeDirection.BUY, new Big("1"), new Big("1"));
        expect(REGISTRY.getOrder(order.id)).toEqual(order);
    });
    test("trade", () => {
        const trade = new Trade(new Account(), new Account(), new Big("1"), new Big("1"));
        expect(REGISTRY.getTrade(trade.id)).toEqual(trade);
    });
});

describe("works with multiple objects", () => {
    test("account", () => {
        const acc1 = new Account();
        const acc2 = new Account();
        expect(REGISTRY.getAccount(acc1.id)).toEqual(acc1);
        expect(REGISTRY.getAccount(acc2.id)).toEqual(acc2);
    });
    test("order", () => {
        const order1 = new Order(new Account(), TradeDirection.BUY, new Big("1"), new Big("1"));
        const order2 = new Order(new Account(), TradeDirection.BUY, new Big("1"), new Big("1"));
        expect(REGISTRY.getOrder(order1.id)).toEqual(order1);
        expect(REGISTRY.getOrder(order2.id)).toEqual(order2);
    });
    test("trade", () => {
        const trade1 = new Trade(new Account(), new Account(), new Big("1"), new Big("1"));
        const trade2 = new Trade(new Account(), new Account(), new Big("1"), new Big("1"));
        expect(REGISTRY.getTrade(trade1.id)).toEqual(trade1);
        expect(REGISTRY.getTrade(trade2.id)).toEqual(trade2);
    });
});