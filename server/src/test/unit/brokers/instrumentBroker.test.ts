import InstrumentBroker from "../../../app/brokers/instrumentBroker";
import Order from "../../../app/trading/order";
import Account from "../../../app/trading/account";
import {Big} from "big.js";
import Instrument from "../../../app/trading/instrument";
import TradeDirection from "../../../app/trading/tradeDirection";
import Asset from "../../../app/trading/asset";
import {
    ExpectedOrder,
    ExpectedPending,
    ExpectedTrade,
    expectOrders,
    placeBuy,
    placeSell,
    testIBroker
} from "../expected";
import PriceAggregate, {PriceAggregateElement} from "../../../app/brokers/priceAggregate";
import {OrderState} from "../../../app/trading/orderState";

let acc1: Account, acc2: Account, acc3: Account, acc4: Account;
beforeEach(() => {
    acc1 = new Account();
    acc2 = new Account();
    acc3 = new Account();
    acc4 = new Account();
    [acc1, acc2, acc3, acc4].forEach(acc => {
        acc.adjustAssets(Asset.GBP, new Big("1000"));
        acc.adjustAssets(Asset.BTC, new Big("1000"));
    });
});

describe("adding orders", () => {
    let sellOrder: Order;
    let sellOrderNegPrice: Order;
    let buyOrder: Order;
    let buyOrderNegPrice: Order;

    beforeEach(() => {
        sellOrder = new Order(acc1, TradeDirection.SELL, Instrument.GBPBTC, new Big("100"), new Big("1.14"));
        sellOrderNegPrice = new Order(acc1, TradeDirection.SELL,  Instrument.GBPBTC,new Big("100"), new Big("-1.14"));
        buyOrder = new Order(acc1, TradeDirection.BUY,  Instrument.GBPBTC,new Big("100"), new Big("1.14"));
        buyOrderNegPrice = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("100"), new Big("-1.14"));
    });

    test("can add sell order", () => {
        expect(() => {
            testIBroker.place(sellOrder);
        }).not.toThrow();
    });

    test("can add sell order with -ve price", () => {
        expect(() => {
            testIBroker.place(sellOrderNegPrice);
        }).not.toThrow();
    });

    test("can add buy order", () => {
        expect(() => {
            testIBroker.place(buyOrder);
        }).not.toThrow();
    });

    test("can add buy order with -ve price", () => {
        expect(() => {
            testIBroker.place(buyOrderNegPrice);
        }).not.toThrow();
    });

    test("can't add a buy order that they can't afford", () => {
        acc1.adjustAssets(Asset.BTC, new Big("-900"));
        expect(() => {
            testIBroker.place(buyOrder);
        }).toThrow();
    });

    test("can't add a sell order that they can't afford", () => {
        acc1.adjustAssets(Asset.GBP, new Big("-950"));
        expect(() => {
            testIBroker.place(sellOrder);
        }).toThrow();
    });
});

describe("matching orders", () => {
    test("Simple Order", () => {
        const o1 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        o1.trades.push(trade);
        o2.trades.push(trade);
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });

    test("Two Buys", () => {
        const o1 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o2 = placeBuy(Instrument.GBPBTC, acc2, new Big("1"), new Big("1.1"));
        expectOrders(acc1);
        expectOrders(acc2);
    });

    test("Two Sells", () => {
        const o1 = placeSell(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1.1"));
        expectOrders(acc1);
        expectOrders(acc2);
    });

    test("Order happens at best price for second person (buy first)", () => {
        const o1 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1.1"));
        const o2 = placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1.1"));
        o1.trades.push(trade);
        o2.trades.push(trade);
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });

    test("Order happens at best price for second person (sell first)", () => {
        const o1 = placeSell(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o2 = placeBuy(Instrument.GBPBTC, acc2, new Big("1"), new Big("1.1"));
        const trade = new ExpectedTrade(acc2, acc1, new Big("1"), new Big("1"));
        o1.trades.push(trade);
        o2.trades.push(trade);
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });

    test("Multiple Trades", () => {
        const o1 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));
        const o3 = placeBuy(Instrument.GBPBTC, acc3, new Big("1"), new Big("1"));
        const o4 = placeSell(Instrument.GBPBTC, acc4, new Big("1"), new Big("1"));
        const trade1 = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        const trade2 = new ExpectedTrade(acc3, acc4, new Big("1"), new Big("1"));
        o1.trades.push(trade1);
        o2.trades.push(trade1);
        o3.trades.push(trade2);
        o4.trades.push(trade2);
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
        expectOrders(acc3, o3);
        expectOrders(acc4, o4);
    });

    test("Multiple Trades on One Account", () => {
        const o1 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));
        const o3 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o4 = placeSell(Instrument.GBPBTC, acc3, new Big("1"), new Big("1"));
        const trade1 = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        const trade2 = new ExpectedTrade(acc1, acc3, new Big("1"), new Big("1"));
        o1.trades.push(trade1);
        o2.trades.push(trade2);
        o3.trades.push(trade1);
        o4.trades.push(trade2);
        o1.state = OrderState.COMPLETE;
        o2.state = OrderState.COMPLETE;
        o3.state = OrderState.COMPLETE;
        o4.state = OrderState.COMPLETE;
        expectOrders(acc1, o1, o3);
        expectOrders(acc2, o2);
        expectOrders(acc3, o4);
    });

    test("Multiple trades on book by one account simultaneously", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        placeBuy(acc1, new Big("1"), new Big("1"));
        placeSell(acc2, new Big("1"), new Big("1"));
        placeSell(acc3, new Big("1"), new Big("1"));
        const trade1 = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        const trade2 = new ExpectedTrade(acc1, acc3, new Big("1"), new Big("1"));
        expectExactly(acc1, trade1, trade2);
        expectExactly(acc2, trade1);
        expectExactly(acc3, trade2);
    });

    test("Partial tradeModal", () => {
        placeBuy(acc1, new Big("2"), new Big("1"));
        placeSell(acc2, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        expectExactly(acc1, trade);
        expectExactly(acc2, trade);
    });

    test("Multiple partial trades (large buy first)", () => {
        placeBuy(acc1, new Big("2"), new Big("1.1"));
        placeSell(acc2, new Big("1"), new Big("1"));
        placeSell(acc3, new Big("1"), new Big("1.1"));
        const trade1 = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1.1"));
        const trade2 = new ExpectedTrade(acc1, acc3, new Big("1"), new Big("1.1"));
        expectExactly(acc1, trade1, trade2);
        expectExactly(acc2, trade1);
        expectExactly(acc3, trade2);
    });

    test("Multiple partial trades (small buys first)", () => {
        placeBuy(acc1, new Big("1"), new Big("1.1"));
        placeBuy(acc2, new Big("2"), new Big("1"));
        placeSell(acc3, new Big("3"), new Big("1"));
        const trade1 = new ExpectedTrade(acc1, acc3, new Big("1"), new Big("1.1"));
        const trade2 = new ExpectedTrade(acc2, acc3, new Big("2"), new Big("1"));
        expectExactly(acc1, trade1);
        expectExactly(acc2, trade2);
        expectExactly(acc3, trade1, trade2);
    });

    test("Better buy prices go to front of queue", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        placeBuy(acc2, new Big("1"), new Big("2"));
        placeSell(acc3, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc2, acc3, new Big("1"), new Big("2"));
        expectNoTrades(acc1);
        expectExactly(acc2, trade);
        expectExactly(acc3, trade);
    });

    test("Better sell prices go to front of queue", () => {
        placeSell(acc1, new Big("1"), new Big("1"));
        placeSell(acc2, new Big("1"), new Big("2"));
        placeBuy(acc3, new Big("1"), new Big("2"));
        const trade = new ExpectedTrade(acc3, acc1, new Big("1"), new Big("1"));
        expectExactly(acc1, trade);
        expectNoTrades(acc2);
        expectExactly(acc3, trade);
    });

    test("Earlier buys get priority", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        const earlyBuy = new Order(acc2, TradeDirection.BUY, Instrument.GBPBTC, new Big("1"), new Big("1"));
        earlyBuy.timestamp.setTime(earlyBuy.timestamp.getTime() - 1000);
        iBroker.place(earlyBuy);
        placeSell(acc3, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc2, acc3, new Big("1"), new Big("1"));
        expectNoTrades(acc1);
        expectExactly(acc2, trade);
        expectExactly(acc3, trade);
    });

    test("Earlier sells get priority", () => {
        placeSell(acc1, new Big("1"), new Big("1"));
        const earlySell = new Order(acc2, TradeDirection.SELL, Instrument.GBPBTC, new Big("1"), new Big("1"));
        earlySell.timestamp.setTime(earlySell.timestamp.getTime() - 1000);
        iBroker.place(earlySell);
        placeBuy(acc3, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc3, acc2, new Big("1"), new Big("1"));
        expectNoTrades(acc1);
        expectExactly(acc2, trade);
        expectExactly(acc3, trade);
    });
});

describe("pending orders", () => {
    test("at first, no orders", () => {
        //TODO expectPending(acc1, [], []);
    });

    test("place one buy order", () => {
        const order = placeBuy(acc1, new Big("1"), new Big("1"));
        //TODO expectPending(acc1, [order], []);
    });

    test("place one sell order", () => {
        const order = placeSell(acc1, new Big("1"), new Big("1"));
        //TODO expectPending(acc1, [], [order]);
    });

    test("placing multiple orders", () => {
        const b1 = placeBuy(acc1, new Big("2"), new Big("2"));
        const b2 = placeBuy(acc1, new Big("1"), new Big("1"));
        const s1 = placeSell(acc1, new Big("3"), new Big("3"));
        const s2 = placeSell(acc1, new Big("4"), new Big("4"));
        //TODO expectPending(acc1, [b1, b2], [s1, s2]);
    });

    test("when multiple people place orders", () => {
        const o1 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o2 = placeBuy(acc2, new Big("1"), new Big("1"));
        //TODO expectPending(acc1, [o1], []);
        //TODO expectPending(acc2, [o2], []);
    });

    test("when a tradeModal is completed, orders aren't pending any more", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        placeSell(acc2, new Big("1"), new Big("1"));
        //TODO expectPending(acc1, [], []);
        //TODO expectPending(acc1, [], []);
    });

    test("pending orders update after partial trades", () => {
        placeBuy(acc1, new Big("2"), new Big("1"));
        placeSell(acc2, new Big("1"), new Big("1"));
        const order = new ExpectedOrder(acc1, TradeDirection.BUY,Instrument.GBPBTC, new Big("1"), new Big("1"));
        //TODO expectPending(acc1, [order], []);
    });
});
//TODO funds from both asses should get locked when selling at negative price
describe("position updated after order", () => {
    test("BUY 1x1", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1000"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("999"));
    });

    test("SELL 1x1", () => {
        placeSell(acc1, new Big("1"), new Big("1"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("999"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("1000"));
    });

    test("BUY 2.5x2.5", () => {
        placeBuy(acc1, new Big("2.5"), new Big("2.5"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1000"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("993.75"));
    });

    test("SELL 2.5x2.5", () => {
        placeSell(acc1, new Big("2.5"), new Big("2.5"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("997.5"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("1000"));
    });
});

describe("position updated after tradeModal", () => {
    test("1x1", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        placeSell(acc2, new Big("1"), new Big("1"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1001"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("999"));
        expect(acc2.getAvailableAssets(Asset.GBP)).toEqual(new Big("999"));
        expect(acc2.getAvailableAssets(Asset.BTC)).toEqual(new Big("1001"));
    });

    test("2x2", () => {
        placeBuy(acc1, new Big("2"), new Big("2"));
        placeSell(acc2, new Big("2"), new Big("2"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1002"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("996"));
        expect(acc2.getAvailableAssets(Asset.GBP)).toEqual(new Big("998"));
        expect(acc2.getAvailableAssets(Asset.BTC)).toEqual(new Big("1004"));
    });

    test("2.5x2", () => {
        placeBuy(acc1, new Big("2.5"), new Big("2"));
        placeSell(acc2, new Big("2.5"), new Big("2"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1002.5"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("995"));
        expect(acc2.getAvailableAssets(Asset.GBP)).toEqual(new Big("997.5"));
        expect(acc2.getAvailableAssets(Asset.BTC)).toEqual(new Big("1005"));
    });

    test("2x2.5", () => {
        placeBuy(acc1, new Big("2"), new Big("2.5"));
        placeSell(acc2, new Big("2"), new Big("2.5"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1002"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("995"));
        expect(acc2.getAvailableAssets(Asset.GBP)).toEqual(new Big("998"));
        expect(acc2.getAvailableAssets(Asset.BTC)).toEqual(new Big("1005"));
    });

    test("2.5x2.5", () => {
        placeBuy(acc1, new Big("2.5"), new Big("2.5"));
        placeSell(acc2, new Big("2.5"), new Big("2.5"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1002.5"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("993.75"));
        expect(acc2.getAvailableAssets(Asset.GBP)).toEqual(new Big("997.5"));
        expect(acc2.getAvailableAssets(Asset.BTC)).toEqual(new Big("1006.25"));
    });

    test("2x-1.5", () => {
        placeBuy(acc1, new Big("2"), new Big("-1.5"));
        placeSell(acc2, new Big("2"), new Big("-1.5"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1002"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("1003"));
        expect(acc2.getAvailableAssets(Asset.GBP)).toEqual(new Big("998"));
        expect(acc2.getAvailableAssets(Asset.BTC)).toEqual(new Big("997"));
    });

    test("different prices", () => {
        placeBuy(acc1, new Big("1"), new Big("2"));
        placeSell(acc2, new Big("1"), new Big("1"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1001"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("998"));
        expect(acc2.getAvailableAssets(Asset.GBP)).toEqual(new Big("999"));
        expect(acc2.getAvailableAssets(Asset.BTC)).toEqual(new Big("1002"));
    });
});

describe("locked assets", () => {
    test("One Buy", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        //TODO expect(iBroker.getLockedAssets(acc1)).toEqual([new Big("0"), new Big("1")]);
    });

    test("One Sell", () => {
        placeSell(acc1, new Big("1"), new Big("1"));
        //TODO expect(iBroker.getLockedAssets(acc1)).toEqual([new Big("1"), new Big("0")]);
    });

    test("Complex orders", () => {
        placeBuy(acc1, new Big("2"), new Big("1.2"));
        placeSell(acc1, new Big("3"), new Big("1.8"));
        //TODO expect(iBroker.getLockedAssets(acc1)).toEqual([new Big("3"), new Big("2.4")]);
    });

    test("Multiple buys", () => {
        placeBuy(acc1, new Big("2"), new Big("3"));
        placeBuy(acc1, new Big("10"), new Big("1"));
        //TODO expect(iBroker.getLockedAssets(acc1)).toEqual([new Big("0"), new Big("16")]);
    });

    test("Multiple sells", () => {
        placeSell(acc1, new Big("2"), new Big("3"));
        placeSell(acc1, new Big("10"), new Big("10"));
        //TODO expect(iBroker.getLockedAssets(acc1)).toEqual([new Big("12"), new Big("0")]);
    });

    test("Multiple accounts", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        placeBuy(acc2, new Big("1"), new Big("1"));
        //TODO expect(iBroker.getLockedAssets(acc1)).toEqual([new Big("0"), new Big("1")]);
        //TODO expect(iBroker.getLockedAssets(acc2)).toEqual([new Big("0"), new Big("1")]);
    });

    test("Decreases after tradeModal", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        //TODO expect(iBroker.getLockedAssets(acc1)).toEqual([new Big("0"), new Big("1")]);
        placeSell(acc2, new Big("1"), new Big("1"));
        //TODO expect(iBroker.getLockedAssets(acc1)).toEqual([new Big("0"), new Big("0")]);
        //TODO expect(iBroker.getLockedAssets(acc2)).toEqual([new Big("0"), new Big("0")]);
    });
});

describe("Cancel order", () => {
    test("Throws if cancelling order that hasn't been placed", () => {
        expect(() => {
            iBroker.cancel(new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC,new Big("1"), new Big("1)")));
        }).toThrow();
    });

    test("Does not throw on valid call", () => {
        const order = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC,new Big("1"), new Big("1"));
        iBroker.place(order);
        expect(() => {
            iBroker.cancel(order);
        }).not.toThrow();
    });

    test("Prevents trades from being made with the cancelled order", () => {
        const order = new Order(acc1, TradeDirection.BUY,Instrument.GBPBTC, new Big("1"), new Big("1"));
        iBroker.place(order);
        iBroker.cancel(order);
        iBroker.place(new Order(acc2, TradeDirection.SELL, Instrument.GBPBTC,new Big("1"), new Big("1")));
        //TODO expect(iBroker.getTrades(acc1)).toHaveLength(0);
    });

    test("Removes the order from pending orders", () => {
        const order = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC,new Big("1"), new Big("1"));
        iBroker.place(order);
        iBroker.cancel(order);
        //TODO expectPending(acc1, [], []);
    });

    test("Unlocks the assets", () => {
        const order = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC,new Big("1"), new Big("1"));
        iBroker.place(order);
        iBroker.cancel(order);
        //TODO expect(iBroker.getLockedAssets(acc1)).toEqual([new Big("0"), new Big("0")]);
    });
});

describe("Self-Order prevention", () => {
    test("Buy first", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        const sell = new Order(acc1, TradeDirection.SELL, Instrument.GBPBTC,new Big("1"), new Big("1"));
        expect(() => {
            iBroker.place(sell);
        }).toThrow();
    });

    test("Sell first", () => {
        placeSell(acc1, new Big("1"), new Big("1"));
        const buy = new Order(acc1, TradeDirection.BUY,Instrument.GBPBTC, new Big("1"), new Big("1"));
        expect(() => {
            iBroker.place(buy);
        }).toThrow();
    });
});

describe("Price aggregate", () => {
    test("Simple Buy", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        const expected = new PriceAggregate([new PriceAggregateElement(new Big("1"), new Big("1"))], []);
        expect(iBroker.getAggregatePrices()).toEqual(expected);
    });

    test("Simple Sell", () => {
        placeSell(acc1, new Big("1"), new Big("1"));
        const expected = new PriceAggregate([], [new PriceAggregateElement(new Big("1"), new Big("1"))]);
        expect(iBroker.getAggregatePrices()).toEqual(expected);
    });

    test("Two buys at different prices", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        placeBuy(acc1, new Big("2"), new Big("3"));
        const expected = new PriceAggregate([
            new PriceAggregateElement(new Big("3"), new Big("2")),
            new PriceAggregateElement(new Big("1"), new Big("1"))
        ], []);
        expect(iBroker.getAggregatePrices()).toEqual(expected);
    });

    test("Two buys at same price", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        placeBuy(acc1, new Big("2"), new Big("1"));
        const expected = new PriceAggregate([
            new PriceAggregateElement(new Big("1"), new Big("3"))
        ], []);
        expect(iBroker.getAggregatePrices()).toEqual(expected);
    });

    test("Two Sells at different prices", () => {
        placeSell(acc1, new Big("1"), new Big("1"));
        placeSell(acc1, new Big("2"), new Big("3"));
        const expected = new PriceAggregate([], [
            new PriceAggregateElement(new Big("1"), new Big("1")),
            new PriceAggregateElement(new Big("3"), new Big("2"))
        ]);
        expect(iBroker.getAggregatePrices()).toEqual(expected);
    });

    test("Two Sells at same price", () => {
        placeSell(acc1, new Big("1"), new Big("1"));
        placeSell(acc1, new Big("2"), new Big("1"));
        const expected = new PriceAggregate([], [
            new PriceAggregateElement(new Big("1"), new Big("3"))
        ]);
        expect(iBroker.getAggregatePrices()).toEqual(expected);
    });

    test("One buy one sell (not overlapping)", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        placeSell(acc2, new Big("1"), new Big("2"));
        const expected = new PriceAggregate(
            [new PriceAggregateElement(new Big("1"), new Big("1"))],
            [new PriceAggregateElement(new Big("2"), new Big("1"))]
        );
        expect(iBroker.getAggregatePrices()).toEqual(expected);
    });

    test("Overlapping", () => {
        placeBuy(acc1, new Big("2"), new Big("2"));
        placeSell(acc2, new Big("1"), new Big("1"));
        const expected = new PriceAggregate(
            [new PriceAggregateElement(new Big("2"), new Big("1"))],
            []
        );
        expect(iBroker.getAggregatePrices()).toEqual(expected);
    })
});

describe("Market prices", () => {
    test("After 0 trades", () => {
        expect(iBroker.getMarketPrice()).toEqual(new Big("0"));
        placeBuy(acc1, new Big("1"), new Big("2"));
        expect(iBroker.getMarketPrice()).toEqual(new Big("0"));
    });

    test("After 1 tradeModal", () => {
        placeBuy(acc1, new Big("2"), new Big("2"));
        placeSell(acc2, new Big("3"), new Big("1"));
        expect(iBroker.getMarketPrice()).toEqual(new Big("2"));
    });

    test("After 2 trades", () => {
        placeBuy(acc1, new Big("1"), new Big("3"));
        placeSell(acc2, new Big("1"), new Big("3"));
        placeBuy(acc1, new Big("1"), new Big("5"));
        placeSell(acc2, new Big("1"), new Big("5"));
        expect(iBroker.getMarketPrice()).toEqual(new Big("5"));
    })
});