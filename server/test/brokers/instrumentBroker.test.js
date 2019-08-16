import InstrumentBroker from "../../app/brokers/instrumentBroker";
import Order, {TradeDirection} from "../../app/trading/order";
import Account from "../../app/trading/account";
import {INSTRUMENTS} from "../../app/trading/instrument";
import {expectedOrder, expectedPending, expectedTrade} from "./expected";
import {ASSETS} from "../../app/trading/asset";

describe("constructor", () => {
    test("constructor does not throw an exception", () => {
        expect(() => {
            new InstrumentBroker(INSTRUMENTS.GBPBTC)
        }).not.toThrow();
    });

    test("constructor should return a InstrumentBroker", () => {
        expect(new InstrumentBroker(INSTRUMENTS.GBPBTC)).toBeInstanceOf(InstrumentBroker);
    });

    test("null instrument should throw", () => {
        expect(() => {
            new InstrumentBroker(null)
        }).toThrow();
    });

    test("undefined instrument should throw", () => {
        expect(() => {
            new InstrumentBroker()
        }).toThrow();
    });
});

let acc1, acc2, acc3, acc4;
let iBroker;
beforeEach(() => {
    acc1 = new Account();
    acc2 = new Account();
    acc3 = new Account();
    acc4 = new Account();
    iBroker = new InstrumentBroker(INSTRUMENTS.GBPBTC);
    [acc1, acc2, acc3, acc4].forEach((acc) => {
        acc.adjustAssets(ASSETS.GBP, 1000);
        acc.adjustAssets(ASSETS.BTC, 1000);
    })
});

const placeBuy = function (account, units, price) {
    iBroker.place(new Order(account, TradeDirection.BUY, units, price));
    return expectedOrder(account, TradeDirection.BUY, units, price);
};

const placeSell = function (account, units, price) {
    iBroker.place(new Order(account, TradeDirection.SELL, units, price));
    return expectedOrder(account, TradeDirection.SELL, units, price);
};

describe("adding orders", () => {
    let sellOrder;
    let sellOrderNegPrice;
    let buyOrder;
    let buyOrderNegPrice;

    beforeEach(() => {
        sellOrder = new Order(acc1, TradeDirection.SELL, 100, 1.14);
        sellOrderNegPrice = new Order(acc1, TradeDirection.SELL, 100, -1.14);
        buyOrder = new Order(acc1, TradeDirection.BUY, 100, 1.14);
        buyOrderNegPrice = new Order(acc1, TradeDirection.BUY, 100, -1.14);
    });

    test("can add sell order", () => {
        expect(() => {
            iBroker.place(sellOrder)
        }).not.toThrow();
    });

    test("can add sell order with -ve price", () => {
        expect(() => {
            iBroker.place(sellOrderNegPrice)
        }).not.toThrow();
    });

    test("can add buy order", () => {
        expect(() => {
            iBroker.place(buyOrder)
        }).not.toThrow();
    });

    test("can add buy order with -ve price", () => {
        expect(() => {
            iBroker.place(buyOrderNegPrice)
        }).not.toThrow();
    });

    test("can't add a buy order that they can't afford", () => {
        acc1.adjustAssets(ASSETS.BTC, -900);
        expect(() => {
            iBroker.place(buyOrder)
        }).toThrow();
    });

    test("can't add a sell order that they can't afford", () => {
        acc1.adjustAssets(ASSETS.GBP, -950);
        expect(() => {
            iBroker.place(sellOrder)
        }).toThrow();
    });
});

describe("matching orders", () => {
    const expectNoTrades = function (account) {
        expectTradeCount(account, 0);
    };

    const expectTradeCount = function (account, count) {
        expect(iBroker.getTrades(account)).toHaveLength(count);
    };

    const expectExactly = function (account, ...trades) {
        expect(iBroker.getTrades(account)).toMatchObject(trades);
    };

    test("Test our expectedTrade helper function", () => {
        placeBuy(acc1, 1, 1);
        placeSell(acc2, 1, 1);

        //Check that our expected trade correctly doesn't match
        const trade1 = expectedTrade(acc2, acc1, 1, 1);
        expect(iBroker.getTrades(acc1)).not.toMatchObject([trade1]);

        //Check that it does match when it should
        const trade2 = expectedTrade(acc1, acc2, 1, 1);
        expect(iBroker.getTrades(acc1)).toMatchObject([trade2]);
    });

    test("Invalid Direction", () => {
        const direction = "THIS IS INVALID";
        const order = new Order(1, direction, 1, 1);
        expect(() => {
            iBroker.place(order)
        }).toThrow();
    });

    test("Null order", () => {
        expect(() => {
            iBroker.place(null);
        }).toThrow();
    });

    test("Undefined Order", () => {
        expect(() => {
            iBroker.place();
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

    test("Multiple partial trades (large buy first)", () => {
        placeBuy(acc1, 2, 1.1);
        placeSell(acc2, 1, 1);
        placeSell(acc3, 1, 1.1);
        const trade1 = expectedTrade(acc1, acc2, 1, 1.1);
        const trade2 = expectedTrade(acc1, acc3, 1, 1.1);
        expectExactly(acc1, trade1, trade2);
        expectExactly(acc2, trade1);
        expectExactly(acc3, trade2);
    });

    test("Multiple partial trades (small buys first)", () => {
        placeBuy(acc1, 1, 1.1);
        placeBuy(acc2, 2, 1);
        placeSell(acc3, 3, 1);
        const trade1 = expectedTrade(acc1, acc3, 1, 1.1);
        const trade2 = expectedTrade(acc2, acc3, 2, 1);
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
        earlyBuy.timestamp.setTime(earlyBuy.timestamp.getTime() - 1000);
        iBroker.place(earlyBuy);
        placeSell(acc3, 1, 1);
        const trade = expectedTrade(acc2, acc3, 1, 1);
        expectNoTrades(acc1);
        expectExactly(acc2, trade);
        expectExactly(acc3, trade);
    });

    test("Earlier sells get priority", () => {
        placeSell(acc1, 1, 1);
        const earlySell = new Order(acc2, TradeDirection.SELL, 1, 1);
        earlySell.timestamp.setTime(earlySell.timestamp.getTime() - 1000);
        iBroker.place(earlySell);
        placeBuy(acc3, 1, 1);
        const trade = expectedTrade(acc3, acc2, 1, 1);
        expectNoTrades(acc1);
        expectExactly(acc2, trade);
        expectExactly(acc3, trade);
    });
});

describe("pending orders", () => {
    const expectPending = (account, buys, sells) => {
        const pending = iBroker.getPendingOrders(account);
        const expected = expectedPending(buys, sells);
        expect(pending).toMatchObject(expected);
        expect(pending.buy).toHaveLength(buys.length);
        expect(pending.sell).toHaveLength(sells.length);
    };

    test("at first, no orders", () => {
        expectPending(acc1, [], []);
    });

    test("place one buy order", () => {
        const order = placeBuy(acc1, 1, 1);
        expectPending(acc1, [order], []);
    });

    test("place one sell order", () => {
        const order = placeSell(acc1, 1, 1);
        expectPending(acc1, [], [order]);
    });

    test("placing multiple orders", () => {
        const b1 = placeBuy(acc1, 2, 2);
        const b2 = placeBuy(acc1, 1, 1);
        const s1 = placeSell(acc1, 3, 3);
        const s2 = placeSell(acc1, 4, 4);
        expectPending(acc1, [b1, b2], [s1, s2]);
    });

    test("when multiple people place orders", () => {
        const o1 = placeBuy(acc1, 1, 1);
        const o2 = placeBuy(acc2, 1, 1);
        expectPending(acc1, [o1], []);
        expectPending(acc2, [o2], []);
    });

    test("when a trade is completed, orders aren't pending any more", () => {
        placeBuy(acc1, 1, 1);
        placeSell(acc2, 1, 1);
        expectPending(acc1, [], []);
        expectPending(acc1, [], []);
    });

    test("pending orders update after partial trades", () => {
        let order = placeBuy(acc1, 2, 1);
        placeSell(acc2, 1, 1);
        order.units = 1;
        expectPending(acc1, [order], []);
    });
});

describe("position updated after order", () => {
    test("BUY 1x1", () => {
        placeBuy(acc1, 1, 1);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(1000);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(999);
    });

    test("SELL 1x1", () => {
        placeSell(acc1, 1, 1);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(999);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(1000);
    });

    test("BUY 2.5x2.5", () => {
        placeBuy(acc1, 2.5, 2.5);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(1000);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(993.75);
    });

    test("SELL 2.5x2.5", () => {
        placeSell(acc1, 2.5, 2.5);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(997.5);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(1000);
    });
});

describe("position updated after trade", () => {
    test("1x1", () => {
        placeBuy(acc1, 1, 1);
        placeSell(acc2, 1, 1);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(1001);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(999);
        expect(acc2.getAvailableAssets(ASSETS.GBP)).toEqual(999);
        expect(acc2.getAvailableAssets(ASSETS.BTC)).toEqual(1001);
    });

    test("2x2", () => {
        placeBuy(acc1, 2, 2);
        placeSell(acc2, 2, 2);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(1002);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(996);
        expect(acc2.getAvailableAssets(ASSETS.GBP)).toEqual(998);
        expect(acc2.getAvailableAssets(ASSETS.BTC)).toEqual(1004);
    });

    test("2.5x2", () => {
        placeBuy(acc1, 2.5, 2);
        placeSell(acc2, 2.5, 2);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(1002.5);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(995);
        expect(acc2.getAvailableAssets(ASSETS.GBP)).toEqual(997.5);
        expect(acc2.getAvailableAssets(ASSETS.BTC)).toEqual(1005);
    });

    test("2x2.5", () => {
        placeBuy(acc1, 2, 2.5);
        placeSell(acc2, 2, 2.5);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(1002);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(995);
        expect(acc2.getAvailableAssets(ASSETS.GBP)).toEqual(998);
        expect(acc2.getAvailableAssets(ASSETS.BTC)).toEqual(1005);
    });

    test("2.5x2.5", () => {
        placeBuy(acc1, 2.5, 2.5);
        placeSell(acc2, 2.5, 2.5);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(1002.5);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(993.75);
        expect(acc2.getAvailableAssets(ASSETS.GBP)).toEqual(997.5);
        expect(acc2.getAvailableAssets(ASSETS.BTC)).toEqual(1006.25);
    });

    test("2x-1.5", () => {
        placeBuy(acc1, 2, -1.5);
        placeSell(acc2, 2, -1.5);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(1002);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(1003);
        expect(acc2.getAvailableAssets(ASSETS.GBP)).toEqual(998);
        expect(acc2.getAvailableAssets(ASSETS.BTC)).toEqual(997);
    });

    test("different prices", () => {
        placeBuy(acc1, 1, 2);
        placeSell(acc2, 1, 1);
        expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(1001);
        expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(998);
        expect(acc2.getAvailableAssets(ASSETS.GBP)).toEqual(999);
        expect(acc2.getAvailableAssets(ASSETS.BTC)).toEqual(1002);
    })
});

describe("locked assets", () => {
    test("One Buy", () => {
        placeBuy(acc1, 1, 1);
        expect(iBroker.getLockedAssets(acc1)).toEqual([0, 1]);
    });

    test("One Sell", () => {
        placeSell(acc1, 1, 1);
        expect(iBroker.getLockedAssets(acc1)).toEqual([1, 0]);
    });

    test("Complex orders", () => {
        placeBuy(acc1, 2, 1.2);
        placeSell(acc1, 3, 1.8);
        expect(iBroker.getLockedAssets(acc1)).toEqual([3, 2.4])
    });

    test("Multiple buys", () => {
        placeBuy(acc1, 2, 3);
        placeBuy(acc1, 10, 1);
        expect(iBroker.getLockedAssets(acc1)).toEqual([0, 16]);
    });

    test("Multiple sells", () => {
        placeSell(acc1, 2, 3);
        placeSell(acc1, 10, 10);
        expect(iBroker.getLockedAssets(acc1)).toEqual([12, 0]);
    });

    test("Multiple accounts", () => {
        placeBuy(acc1, 1, 1);
        placeBuy(acc2, 1, 1);
        expect(iBroker.getLockedAssets(acc1)).toEqual([0, 1]);
        expect(iBroker.getLockedAssets(acc2)).toEqual([0, 1]);
    });

    test("Decreases after trade", () => {
        placeBuy(acc1, 1, 1);
        expect(iBroker.getLockedAssets(acc1)).toEqual([0, 1]);
        placeSell(acc2, 1, 1);
        expect(iBroker.getLockedAssets(acc1)).toEqual([0, 0]);
        expect(iBroker.getLockedAssets(acc2)).toEqual([0, 0]);
    });
});