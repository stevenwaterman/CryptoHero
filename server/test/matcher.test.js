import Matcher from "../app/matcher";
import Order, {TradeDirection} from "../app/order";
import Trade from "../app/trade";

describe("constructor", () => {
    test("constructor does not throw an exception", () => {
        expect(() => {new Matcher()}).not.toThrow();
    });

    test("constructor should return a Matcher", () => {
        expect(new Matcher()).toBeInstanceOf(Matcher);
    });
});

describe("adding orders", () => {
    const sellOrder = new Order(1, TradeDirection.SELL, 100, 1.14);
    const sellOrderNegPrice = new Order(1, TradeDirection.SELL, 100, -1.14);
    const buyOrder = new Order(1, TradeDirection.BUY, 100, 1.14);
    const buyOrderNegPrice = new Order(1, TradeDirection.BUY, 100, -1.14);

    let matcher;
    beforeEach(() => {
        matcher = new Matcher();
    });

    test("can add sell order", () => {
        expect(() => {matcher.place(sellOrder)}).not.toThrow();
    });

    test("can add sell order with -ve price", () => {
        expect(() => {matcher.place(sellOrderNegPrice)}).not.toThrow();
    });

    test("can add buy order", () => {
        expect(() => {matcher.place(buyOrder)}).not.toThrow();
    });

    test("can add buy order with -ve price", () => {
        expect(() => {matcher.place(buyOrderNegPrice)}).not.toThrow();
    });
});

describe("matching orders", () => {
    let matcher;
    beforeEach(() => {
        matcher = new Matcher();
    });

    test("Invalid Direction", () => {
        const direction = "THIS IS INVALID";
        const order = new Order(1, direction, 1, 1);
        expect(() => {matcher.place(order)}).toThrow();
    });

    test("No trades by default", () => {
        expect(matcher.getTrades(1).length === 0).toBeTruthy();
    });

    test("One trade logged after one trade happened", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 1, 1));
        matcher.place(new Order(2, TradeDirection.SELL, 1, 1));
        expect(matcher.getTrades(1).length).toEqual(1);
        expect(matcher.getTrades(2).length).toEqual(1);
    });

    test("Simple Trade", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 1, 1));
        matcher.place(new Order(2, TradeDirection.SELL, 1, 1));
        const trade = new Trade(1, 2, 1, 1);
        expect(matcher.getTrades(1)).toContainEqual(trade);
        expect(matcher.getTrades(2)).toContainEqual(trade);
    });

    test("Two Buys", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 1, 1));
        matcher.place(new Order(2, TradeDirection.BUY, 1, 1.1));
        expect(matcher.getTrades(1).length === 0).toBeTruthy();
        expect(matcher.getTrades(2).length === 0).toBeTruthy();
    });

    test("Two Sells", () => {
        matcher.place(new Order(1, TradeDirection.SELL, 1, 1));
        matcher.place(new Order(2, TradeDirection.SELL, 1, 1.1));
        expect(matcher.getTrades(1).length === 0).toBeTruthy();
        expect(matcher.getTrades(2).length === 0).toBeTruthy();
    });

    test("Trade happens at best price for second person (buy first)", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 1, 1.1));
        matcher.place(new Order(2, TradeDirection.SELL, 1, 1));
        const trade = new Trade(1, 2, 1, 1.1);
        expect(matcher.getTrades(1)).toContainEqual(trade);
        expect(matcher.getTrades(2)).toContainEqual(trade);
    });

    test("Trade happens at best price for second person (sell first)", () => {
        matcher.place(new Order(1, TradeDirection.SELL, 1, 1));
        matcher.place(new Order(2, TradeDirection.BUY, 1, 1.1));
        const trade = new Trade(1, 2, 1, 1);
        expect(matcher.getTrades(1)).toContainEqual(trade);
        expect(matcher.getTrades(2)).toContainEqual(trade);
    });

    test("Multiple Trades", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 1, 1));
        matcher.place(new Order(2, TradeDirection.SELL, 1, 1));
        matcher.place(new Order(3, TradeDirection.SELL, 1, 1));
        matcher.place(new Order(4, TradeDirection.SELL, 1, 1));
        const trade1 = new Trade(1, 2, 1, 1);
        const trade2 = new Trade(3, 4, 1, 1);
        expect(matcher.getTrades(1)).toContainEqual(trade1);
        expect(matcher.getTrades(2)).toContainEqual(trade1);
        expect(matcher.getTrades(3)).toContainEqual(trade2);
        expect(matcher.getTrades(4)).toContainEqual(trade2);
    });

    test("Multiple Trades on One Account", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 1, 1));
        matcher.place(new Order(2, TradeDirection.SELL, 1, 1));
        matcher.place(new Order(1, TradeDirection.BUY, 1, 1));
        matcher.place(new Order(3, TradeDirection.SELL, 1, 1));
        const trade1 = new Trade(1, 2, 1, 1);
        const trade2 = new Trade(1, 3, 1, 1);
        expect(matcher.getTrades(1)).toContainEqual(trade1);
        expect(matcher.getTrades(1)).toContainEqual(trade2);
        expect(matcher.getTrades(2)).toContainEqual(trade1);
        expect(matcher.getTrades(3)).toContainEqual(trade2);
    });

    test("Partial trade", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 2, 1));
        matcher.place(new Order(2, TradeDirection.SELL, 1, 1));
        const trade1 = new Trade(1, 2, 1, 1);
        expect(matcher.getTrades(1)).toContainEqual(trade1);
        expect(matcher.getTrades(2)).toContainEqual(trade1);
    });

    test("Multiple partial trades (large first)", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 2, 1));
        matcher.place(new Order(2, TradeDirection.SELL, 1, 1));
        matcher.place(new Order(3, TradeDirection.SELL, 1, 1));
        const trade1 = new Trade(1, 2, 1, 1);
        const trade2 = new Trade(1, 3, 1, 1);
        expect(matcher.getTrades(1)).toContainEqual(trade1);
        expect(matcher.getTrades(1)).toContainEqual(trade2);
        expect(matcher.getTrades(2)).toContainEqual(trade1);
        expect(matcher.getTrades(3)).toContainEqual(trade2);
    });

    test("Multiple partial trades (small first)", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 1, 1));
        matcher.place(new Order(2, TradeDirection.BUY, 1, 1));
        matcher.place(new Order(3, TradeDirection.SELL, 2, 1));
        const trade1 = new Trade(1, 3, 1, 1);
        const trade2 = new Trade(2, 3, 1, 1);
        expect(matcher.getTrades(1)).toContainEqual(trade1);
        expect(matcher.getTrades(2)).toContainEqual(trade2);
        expect(matcher.getTrades(3)).toContainEqual(trade1);
        expect(matcher.getTrades(3)).toContainEqual(trade2);
    });

    test("Better buy prices get priority", () => {
        matcher.place(new Order(1, TradeDirection.BUY, 1, 1));
        matcher.place(new Order(2, TradeDirection.BUY, 1, 2));
        matcher.place(new Order(3, TradeDirection.SELL, 1, 1));
        const trade = new Trade(2, 3, 1, 2);
        expect(matcher.getTrades(2)).toContainEqual(trade);
        expect(matcher.getTrades(3)).toContainEqual(trade);
        expect(matcher.getTrades(1).length === 0).toBeTruthy();
    });

    test("Better sell prices get priority", () => {
        matcher.place(new Order(1, TradeDirection.SELL, 1, 1));
        matcher.place(new Order(2, TradeDirection.SELL, 1, 2));
        matcher.place(new Order(3, TradeDirection.BUY, 1, 2));
        const trade = new Trade(1, 3, 1, 1);
        expect(matcher.getTrades(1)).toContainEqual(trade);
        expect(matcher.getTrades(3)).toContainEqual(trade);
        expect(matcher.getTrades(2).length === 0).toBeTruthy();
    });
});