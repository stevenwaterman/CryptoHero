import Broker from "../app/broker";
import Order, {TradeDirection} from "../app/order";
import Account from "../app/account";

describe("constructor", () => {
    test("constructor does not throw an exception", () => {
        expect(() => {
            new Broker()
        }).not.toThrow();
    });

    test("constructor should return a Broker", () => {
        expect(new Broker()).toBeInstanceOf(Broker);
    });
});

const acc1 = new Account();
const acc2 = new Account();
const acc3 = new Account();
const acc4 = new Account();

describe("adding orders", () => {
    const sellOrder = acc1.createSell(100, 1.14);
    const sellOrderNegPrice = acc1.createSell(100, -1.14);
    const buyOrder = acc1.createBuy(100, 1.14);
    const buyOrderNegPrice = acc1.createBuy(100, -1.14);

    let matcher;
    beforeEach(() => {
        matcher = new Broker();
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
        matcher = new Broker();
    });

    const placeBuy = function (account, units, price) {
        matcher.place(account.createBuy(units, price));
    };

    const placeSell = function (account, units, price) {
        matcher.place(account.createSell(units, price));
    };

    const expectNoTrades = function (account) {
        expectTradeCount(account, 0);
    };

    const expectTradeCount = function (account, count) {
        expect(matcher.getTrades(account)).toHaveLength(count);
    };

    const expectExactly = function (account, ...trades) {
        expect(matcher.getTrades(account)).toMatchObject(trades);
    };

    /**
     * Allows for partial matching - so we don't match on IDs because they are UUIDs
     */
    const expectedTrade = function (buyer, seller, units, unitPrice) {
        return {"buyer": buyer, "seller": seller, "units": units, "unitPrice": unitPrice};
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

    test("Undefined Order", () => {
        expect(() => {
            matcher.place();
        }).toThrow();
    });

    test("No trades by default", () => {
        expectNoTrades(acc1);
    });

    test("Simple Trade", () => {
        placeBuy(acc1, 1, 1);
        placeSell(acc2, 1, 1);
        const trade = expectedTrade(acc1, acc2, 1, 1);
        expectExactly(acc1, trade);
        expectExactly(acc2, trade);
    });

    test("Two Buys", () => {
        placeBuy(acc1, 1, 1);
        placeBuy(acc2, 1, 1.1);
        expectNoTrades(acc1);
        expectNoTrades(acc2);
    });

    test("Two Sells", () => {
        placeSell(acc1, 1, 1);
        placeSell(acc2, 1, 1.1);
        expectNoTrades(acc1);
        expectNoTrades(acc2);
    });

    test("Trade happens at best price for second person (buy first)", () => {
        placeBuy(acc1, 1, 1.1);
        placeSell(acc2, 1, 1);
        const trade = expectedTrade(acc1, acc2, 1, 1.1);
        expectExactly(acc1, trade);
        expectExactly(acc2, trade);
    });

    test("Trade happens at best price for second person (sell first)", () => {
        placeSell(acc1, 1, 1);
        placeBuy(acc2, 1, 1.1);
        const trade = expectedTrade(acc2, acc1, 1, 1);
        expectExactly(acc1, trade);
        expectExactly(acc2, trade);
    });

    test("Multiple Trades", () => {
        placeBuy(acc1, 1, 1);
        placeSell(acc2, 1, 1);
        placeBuy(acc3, 1, 1);
        placeSell(acc4, 1, 1);
        const trade1 = expectedTrade(acc1, acc2, 1, 1);
        const trade2 = expectedTrade(acc3, acc4, 1, 1);
        expectExactly(acc1, trade1);
        expectExactly(acc2, trade1);
        expectExactly(acc3, trade2);
        expectExactly(acc4, trade2);
    });

    test("Multiple Trades on One Account", () => {
        placeBuy(acc1, 1, 1);
        placeSell(acc2, 1, 1);
        placeBuy(acc1, 1, 1);
        placeSell(acc3, 1, 1);
        const trade1 = expectedTrade(acc1, acc2, 1, 1);
        const trade2 = expectedTrade(acc1, acc3, 1, 1);
        expectExactly(acc1, trade1, trade2);
        expectExactly(acc2, trade1);
        expectExactly(acc3, trade2);
    });

    test("Multiple trades on book by one account simultaneously", () => {
        placeBuy(acc1, 1, 1);
        placeBuy(acc1, 1, 1);
        placeSell(acc2, 1, 1);
        placeSell(acc3, 1, 1);
        const trade1 = expectedTrade(acc1, acc2, 1, 1);
        const trade2 = expectedTrade(acc1, acc3, 1, 1);
        expectExactly(acc1, trade1, trade2);
        expectExactly(acc2, trade1);
        expectExactly(acc3, trade2);
    });

    test("Partial trade", () => {
        placeBuy(acc1, 2, 1);
        placeSell(acc2, 1, 1);
        const trade = expectedTrade(acc1, acc2, 1, 1);
        expectExactly(acc1, trade);
        expectExactly(acc2, trade);
    });

    test("Multiple partial trades (large first)", () => {
        placeBuy(acc1, 2, 1);
        placeSell(acc2, 1, 1);
        placeSell(acc3, 1, 1);
        const trade1 = expectedTrade(acc1, acc2, 1, 1);
        const trade2 = expectedTrade(acc1, acc3, 1, 1);
        expectExactly(acc1, trade1, trade2);
        expectExactly(acc2, trade1);
        expectExactly(acc3, trade2);
    });

    test("Multiple partial trades (small first)", () => {
        placeBuy(acc1, 1, 1);
        placeBuy(acc2, 1, 1);
        placeSell(acc3, 2, 1);
        const trade1 = expectedTrade(acc1, acc3, 1, 1);
        const trade2 = expectedTrade(acc2, acc3, 1, 1);
        expectExactly(acc1, trade1);
        expectExactly(acc2, trade2);
        expectExactly(acc3, trade1, trade2);
    });

    test("Better buy prices go to front of queue", () => {
        placeBuy(acc1, 1, 1);
        placeBuy(acc2, 1, 2);
        placeSell(acc3, 1, 1);
        const trade = expectedTrade(acc2, acc3, 1, 2);
        expectNoTrades(acc1);
        expectExactly(acc2, trade);
        expectExactly(acc3, trade);
    });

    test("Better sell prices go to front of queue", () => {
        placeSell(acc1, 1, 1);
        placeSell(acc2, 1, 2);
        placeBuy(acc3, 1, 2);
        const trade = expectedTrade(acc3, acc1, 1, 1);
        expectExactly(acc1, trade);
        expectNoTrades(acc2);
        expectExactly(acc3, trade);
    });

    test("Earlier buys get priority", () => {
        placeBuy(acc1, 1, 1);
        const earlyBuy = new Order(acc2, TradeDirection.BUY, 1, 1);
        earlyBuy.timeStamp.setTime(earlyBuy.timeStamp.getTime() - 1000);
        matcher.place(earlyBuy);
        placeSell(acc3, 1, 1);
        const trade = expectedTrade(acc2, acc3, 1, 1);
        expectNoTrades(acc1);
        expectExactly(acc2, trade);
        expectExactly(acc3, trade);
    });

    test("Earlier sells get priority", () => {
        placeSell(acc1, 1, 1);
        const earlySell = new Order(acc2, TradeDirection.SELL, 1, 1);
        earlySell.timeStamp.setTime(earlySell.timeStamp.getTime() - 1000);
        matcher.place(earlySell);
        placeBuy(acc3, 1, 1);
        const trade = expectedTrade(acc3, acc2, 1, 1);
        expectNoTrades(acc1);
        expectExactly(acc2, trade);
        expectExactly(acc3, trade);
    });
});