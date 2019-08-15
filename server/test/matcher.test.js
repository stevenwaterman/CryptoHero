import Matcher from "../app/matcher";
import Order, {TradeDirection} from "../app/order";
import Trade from "../app/trade";

describe("constructor", () => {
    test("constructor does not throw an exception", () => {
        expect(() => {
            new Matcher()
        }).not.toThrow();
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
        expect(() => {
            matcher.place(sellOrder)
        }).not.toThrow();
    });

    test("can add sell order with -ve price", () => {
        expect(() => {
            matcher.place(sellOrderNegPrice)
        }).not.toThrow();
    });

    test("can add buy order", () => {
        expect(() => {
            matcher.place(buyOrder)
        }).not.toThrow();
    });

    test("can add buy order with -ve price", () => {
        expect(() => {
            matcher.place(buyOrderNegPrice)
        }).not.toThrow();
    });
});

describe("matching orders", () => {
    let matcher;
    beforeEach(() => {
        matcher = new Matcher();
    });

    const placeBuy = function (account, units, price) {
        matcher.place(new Order(account, TradeDirection.BUY, units, price));
    };

    const placeSell = function (account, units, price) {
        matcher.place(new Order(account, TradeDirection.SELL, units, price));
    };

    const expectSomeTrades = function (account) {
        expect(matcher.getTrades(account).length === 0).toBeFalsy();
    };

    const expectNoTrades = function (account) {
        expectTradeCount(account, 0);
    };

    const expectTradeCount = function (account, count) {
        expect(matcher.getTrades(account).length).toEqual(count);
    };

    const expectOnlyTrades = function (account, ...trades) {
        //const found = matcher.getTrades(account);
        expect(matcher.getTrades(account)).toEqual(trades);
        //trades.forEach((it) => {
        //    expect(found).toContainEqual(it);
        //});
        //expect(found.length).toEqual(trades.length);
    };

    test("Invalid Direction", () => {
        const direction = "THIS IS INVALID";
        const order = new Order(1, direction, 1, 1);
        expect(() => {
            matcher.place(order)
        }).toThrow();
    });

    test("Null order", () => {
        expect(() => {
            matcher.place(null);
        }).toThrow();
    });

    test("Undefined Order", () =>{
        expect(() => {
            matcher.place();
        }).toThrow();
    });

    test("No trades by default", () => {
        expectNoTrades(1);
    });

    test("Simple Trade", () => {
        placeBuy(1, 1, 1);
        placeSell(2, 1, 1);
        const trade = new Trade(1, 2, 1, 1);
        expectOnlyTrades(1, trade);
        expectOnlyTrades(2, trade);
    });

    test("Two Buys", () => {
        placeBuy(1, 1, 1);
        placeBuy(2, 1, 1.1);
        expectNoTrades(1);
        expectNoTrades(2);
    });

    test("Two Sells", () => {
        placeSell(1, 1, 1);
        placeSell(1, 1, 1.1);
        expectNoTrades(1);
        expectNoTrades(2);
    });

    test("Trade happens at best price for second person (buy first)", () => {
        placeBuy(1, 1, 1.1);
        placeSell(2, 1, 1);
        const trade = new Trade(1, 2, 1, 1.1);
        expectOnlyTrades(1, trade);
        expectOnlyTrades(2, trade);
    });

    test("Trade happens at best price for second person (sell first)", () => {
        placeSell(1, 1, 1);
        placeBuy(2, 1, 1.1);
        const trade = new Trade(2, 1, 1, 1);
        expectOnlyTrades(1, trade);
        expectOnlyTrades(2, trade);
    });

    test("Multiple Trades", () => {
        placeBuy(1, 1, 1);
        placeSell(2, 1, 1);
        placeBuy(3, 1, 1);
        placeSell(4, 1, 1);
        const trade1 = new Trade(1, 2, 1, 1);
        const trade2 = new Trade(3, 4, 1, 1);
        expectOnlyTrades(1, trade1);
        expectOnlyTrades(2, trade1);
        expectOnlyTrades(3, trade2);
        expectOnlyTrades(4, trade2);
    });

    test("Multiple Trades on One Account", () => {
        placeBuy(1, 1, 1);
        placeSell(2, 1, 1);
        placeBuy(1, 1, 1);
        placeSell(3, 1, 1);
        const trade1 = new Trade(1, 2, 1, 1);
        const trade2 = new Trade(1, 3, 1, 1);
        expectOnlyTrades(1, trade1, trade2);
        expectOnlyTrades(2, trade1);
        expectOnlyTrades(3, trade2);
    });

    test("Multiple trades on book by one account simultaneously", () => {
        placeBuy(1, 1, 1);
        placeBuy(1, 1, 1);
        placeSell(2, 1, 1);
        placeSell(3, 1, 1);
        const trade1 = new Trade(1, 2, 1, 1);
        const trade2 = new Trade(1, 3, 1, 1);
        expectOnlyTrades(1, trade1, trade2);
        expectOnlyTrades(2, trade1);
        expectOnlyTrades(3, trade2);
    });

    test("Partial trade", () => {
        placeBuy(1, 2, 1);
        placeSell(2, 1, 1);
        const trade = new Trade(1, 2, 1, 1);
        expectOnlyTrades(1, trade);
        expectOnlyTrades(2, trade);
    });

    test("Multiple partial trades (large first)", () => {
        placeBuy(1, 2, 1);
        placeSell(2, 1, 1);
        placeSell(3, 1, 1);
        const trade1 = new Trade(1, 2, 1, 1);
        const trade2 = new Trade(1, 3, 1, 1);
        expectOnlyTrades(1, trade1, trade2);
        expectOnlyTrades(2, trade1);
        expectOnlyTrades(3, trade2);
    });

    test("Multiple partial trades (small first)", () => {
        placeBuy(1, 1, 1);
        placeBuy(2, 1, 1);
        placeSell(3, 2, 1);
        const trade1 = new Trade(1, 3, 1, 1);
        const trade2 = new Trade(2, 3, 1, 1);
        expectOnlyTrades(1, trade1);
        expectOnlyTrades(2, trade2);
        expectOnlyTrades(3, trade1, trade2);
    });

    test("Better buy prices go to front of queue", () => {
        placeBuy(1, 1, 1);
        placeBuy(2, 1, 2);
        placeSell(3, 1, 1);
        const trade = new Trade(2, 3, 1, 2);
        expectNoTrades(1);
        expectOnlyTrades(2, trade);
        expectOnlyTrades(3, trade);
    });

    test("Better sell prices go to front of queue", () => {
        placeSell(1, 1, 1);
        placeSell(2, 1, 2);
        placeBuy(3, 1, 2);
        const trade = new Trade(3, 1, 1, 1);
        expectOnlyTrades(1, trade);
        expectNoTrades(2);
        expectOnlyTrades(3, trade);
    });

    test("Earlier buys get priority", () => {
        placeBuy(1, 1, 1);
        const earlyBuy = new Order(2, TradeDirection.BUY, 1, 1);
        earlyBuy.timeStamp.setTime(earlyBuy.timeStamp.getTime() - 1000);
        matcher.place(earlyBuy);
        placeSell(3, 1, 1);
        const trade = new Trade(2, 3, 1, 1);
        expectNoTrades(1);
        expectOnlyTrades(2, trade);
        expectOnlyTrades(3, trade);
    });

    test("Earlier sells get priority", () => {
        placeSell(1, 1, 1);
        const earlySell = new Order(2, TradeDirection.SELL, 1, 1);
        earlySell.timeStamp.setTime(earlySell.timeStamp.getTime() - 1000);
        matcher.place(earlySell);
        placeBuy(3, 1, 1);
        const trade = new Trade(3, 2, 1, 1);
        expectNoTrades(1);
        expectOnlyTrades(2, trade);
        expectOnlyTrades(3, trade);
    });
});