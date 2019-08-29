import Order from "../../../app/trading/order";
import Account from "../../../app/trading/account";
import {Big} from "big.js";
import Instrument from "../../../app/trading/instrument";
import TradeDirection from "../../../app/trading/tradeDirection";
import Asset from "../../../app/trading/asset";
import {
    ExpectedOrder,
    ExpectedTrade,
    expectOrders,
} from "../expected";
import PriceAggregate, {PriceAggregateElement} from "../../../app/brokers/priceAggregate";
import {OrderState} from "../../../app/trading/orderState";
import Broker from "../../../app/brokers/broker";
import {REGISTRY} from "../../../app/registry";
import InstrumentBroker from "../../../app/brokers/instrumentBroker";
import MockDate from "mockdate";

function placeBuy(account: Account, units: Big, price: Big): ExpectedOrder {
    return placeOrder(TradeDirection.BUY, account, units, price);
}
function placeSell(account: Account, units: Big, price: Big): ExpectedOrder {
    return placeOrder(TradeDirection.SELL, account, units, price)
}
function placeOrder(direction: TradeDirection, account: Account, units: Big, price: Big): ExpectedOrder {
    time++;
    MockDate.set(time);
    const order = new Order(account, direction, Instrument.BTCGBP, units, price);
    iBroker.place(order);
    return new ExpectedOrder(account, direction, Instrument.BTCGBP, units, price, OrderState.PENDING);
}

let broker: Broker;
let iBroker: InstrumentBroker;
let acc1: Account, acc2: Account, acc3: Account, acc4: Account;
let time: number = 1000;
beforeEach(() => {
    MockDate.set(time);
    REGISTRY.clear();
    broker = new Broker();
    iBroker = broker.getIBroker(Instrument.BTCGBP);
    acc1 = new Account();
    acc2 = new Account();
    acc3 = new Account();
    acc4 = new Account();
    [acc1, acc2, acc3, acc4].forEach(acc => {
        Asset.ALL.forEach(it => acc.adjustAssets(it, new Big("1000")));
    });
    MockDate.reset();
});

describe("adding orders", () => {
    let sellOrder: Order;
    let sellOrderNegPrice: Order;
    let buyOrder: Order;
    let buyOrderNegPrice: Order;

    beforeEach(() => {
        sellOrder = new Order(acc1, TradeDirection.SELL, Instrument.BTCGBP, new Big("100"), new Big("1.14"));
        sellOrderNegPrice = new Order(acc1, TradeDirection.SELL, Instrument.BTCGBP, new Big("100"), new Big("-1.14"));
        buyOrder = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, new Big("100"), new Big("1.14"));
        buyOrderNegPrice = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, new Big("100"), new Big("-1.14"));
    });

    test("can add sell order", () => {
        expect(() => {
            iBroker.place(sellOrder);
        }).not.toThrow();
    });

    test("can add sell order with -ve price", () => {
        expect(() => {
            iBroker.place(sellOrderNegPrice);
        }).not.toThrow();
    });

    test("can add buy order", () => {
        expect(() => {
            iBroker.place(buyOrder);
        }).not.toThrow();
    });

    test("can add buy order with -ve price", () => {
        expect(() => {
            iBroker.place(buyOrderNegPrice);
        }).not.toThrow();
    });

    test("can't add a buy order that they can't afford", () => {
        acc1.adjustAssets(Asset.BTC, new Big("-900"));
        expect(() => {
            iBroker.place(buyOrder);
        }).toThrow();
    });

    test("can't add a sell order that they can't afford", () => {
        acc1.adjustAssets(Asset.GBP, new Big("-950"));
        expect(() => {
            iBroker.place(sellOrder);
        }).toThrow();
    });
});

describe("matching orders", () => {
    test("Simple Order", () => {
        const o1 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(acc2, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        o1.trades.push(trade);
        o2.trades.push(trade);
        o1.state = OrderState.COMPLETE;
        o2.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });

    test("Two Buys", () => {
        const o1 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o2 = placeBuy(acc2, new Big("1"), new Big("1.1"));
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });

    test("Two Sells", () => {
        const o1 = placeSell(acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(acc2, new Big("1"), new Big("1.1"));
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });

    test("Order happens at best price for second person (buy first)", () => {
        const o1 = placeBuy(acc1, new Big("1"), new Big("1.1"));
        const o2 = placeSell(acc2, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1.1"));
        o1.trades.push(trade);
        o2.trades.push(trade);
        o1.state = OrderState.COMPLETE;
        o2.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });

    test("Order happens at best price for second person (sell first)", () => {
        const o1 = placeSell(acc1, new Big("1"), new Big("1"));
        const o2 = placeBuy(acc2, new Big("1"), new Big("1.1"));
        const trade = new ExpectedTrade(acc2, acc1, new Big("1"), new Big("1"));
        o1.trades.push(trade);
        o2.trades.push(trade);
        o1.state = OrderState.COMPLETE;
        o2.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });

    test("Multiple Trades", () => {
        const o1 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(acc2, new Big("1"), new Big("1"));
        const o3 = placeBuy(acc3, new Big("1"), new Big("1"));
        const o4 = placeSell(acc4, new Big("1"), new Big("1"));
        const trade1 = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        const trade2 = new ExpectedTrade(acc3, acc4, new Big("1"), new Big("1"));
        o1.trades.push(trade1);
        o2.trades.push(trade1);
        o3.trades.push(trade2);
        o4.trades.push(trade2);
        o1.state = OrderState.COMPLETE;
        o2.state = OrderState.COMPLETE;
        o3.state = OrderState.COMPLETE;
        o4.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
        expectOrders(acc3, o3);
        expectOrders(acc4, o4);
    });

    test("Multiple Trades on One Account", () => {
        const o1 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(acc2, new Big("1"), new Big("1"));
        const o3 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o4 = placeSell(acc3, new Big("1"), new Big("1"));
        const trade1 = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        const trade2 = new ExpectedTrade(acc1, acc3, new Big("1"), new Big("1"));
        o1.trades.push(trade1);
        o2.trades.push(trade1);
        o3.trades.push(trade2);
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
        const o1 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o2 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o3 = placeSell(acc2, new Big("1"), new Big("1"));
        const o4 = placeSell(acc3, new Big("1"), new Big("1"));

        const trade1 = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        const trade2 = new ExpectedTrade(acc1, acc3, new Big("1"), new Big("1"));
        o1.trades.push(trade1);
        o1.state = OrderState.COMPLETE;
        o3.trades.push(trade1);
        o3.state = OrderState.COMPLETE;

        o2.trades.push(trade2);
        o2.state = OrderState.COMPLETE;
        o4.trades.push(trade2);
        o4.state = OrderState.COMPLETE;

        expectOrders(acc1, o1, o2);
        expectOrders(acc2, o3);
        expectOrders(acc3, o4);
    });

    test("Partial trade", () => {
        const o1 = placeBuy(acc1, new Big("2"), new Big("1"));
        const o2 = placeSell(acc2, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        o1.trades.push(trade);
        o2.trades.push(trade);
        o2.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });

    test("Multiple partial trades (large buy first)", () => {
        const o1 = placeBuy(acc1, new Big("2"), new Big("1.1"));
        const o2 = placeSell(acc2, new Big("1"), new Big("1"));
        const o3 = placeSell(acc3, new Big("1"), new Big("1.1"));
        const trade1 = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1.1"));
        const trade2 = new ExpectedTrade(acc1, acc3, new Big("1"), new Big("1.1"));
        o1.trades.push(trade1, trade2);
        o2.trades.push(trade1);
        o3.trades.push(trade2);
        o1.state = OrderState.COMPLETE;
        o2.state = OrderState.COMPLETE;
        o3.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
        expectOrders(acc3, o3);
    });

    test("Multiple partial trades (small buys first)", () => {
        const o1 = placeBuy(acc1, new Big("1"), new Big("1.1"));
        const o2 = placeBuy(acc2, new Big("2"), new Big("1"));
        const o3 = placeSell(acc3, new Big("3"), new Big("1"));
        const trade1 = new ExpectedTrade(acc1, acc3, new Big("1"), new Big("1.1"));
        const trade2 = new ExpectedTrade(acc2, acc3, new Big("2"), new Big("1"));
        o1.trades.push(trade1);
        o2.trades.push(trade2);
        o3.trades.push(trade1, trade2);
        o1.state = OrderState.COMPLETE;
        o2.state = OrderState.COMPLETE;
        o3.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
        expectOrders(acc3, o3);
    });

    test("Better buy prices go to front of queue", () => {
        const o1 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o2 = placeBuy(acc2, new Big("1"), new Big("2"));
        const o3 = placeSell(acc3, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc2, acc3, new Big("1"), new Big("2"));
        o2.trades.push(trade);
        o3.trades.push(trade);
        o2.state = OrderState.COMPLETE;
        o3.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
        expectOrders(acc3, o3);
    });

    test("Better sell prices go to front of queue", () => {
        const o1 = placeSell(acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(acc2, new Big("1"), new Big("2"));
        const o3 = placeBuy(acc3, new Big("1"), new Big("2"));
        const trade = new ExpectedTrade(acc3, acc1, new Big("1"), new Big("1"));
        o1.trades.push(trade);
        o3.trades.push(trade);
        o1.state = OrderState.COMPLETE;
        o3.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
        expectOrders(acc3, o3);
    });

    test("Earlier buys get priority", () => {
        const o1 = placeBuy(acc1, new Big("1"), new Big("1"));
        const o2Actual = new Order(acc2, TradeDirection.BUY, Instrument.BTCGBP, new Big("1"), new Big("1"));
        o2Actual.timestamp.setTime(o2Actual.timestamp.getTime() - 1000);
        iBroker.place(o2Actual);
        const o2 = ExpectedOrder.create(o2Actual);
        const o3 = placeSell(acc3, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc2, acc3, new Big("1"), new Big("1"));
        o2.state = OrderState.COMPLETE;
        o2.trades.push(trade);
        o3.state = OrderState.COMPLETE;
        o3.trades.push(trade);
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
        expectOrders(acc3, o3);
    });

    test("Earlier sells get priority", () => {
        const o1 = placeSell(acc1, new Big("1"), new Big("1"));
        const o2Actual = new Order(acc2, TradeDirection.SELL, Instrument.BTCGBP, new Big("1"), new Big("1"));
        o2Actual.timestamp.setTime(o2Actual.timestamp.getTime() - 1000);
        iBroker.place(o2Actual);
        const o2 = ExpectedOrder.create(o2Actual);
        const o3 = placeBuy(acc3, new Big("1"), new Big("1"));
        const trade = new ExpectedTrade(acc3, acc2, new Big("1"), new Big("1"));
        o2.trades.push(trade);
        o2.state = OrderState.COMPLETE;
        o3.trades.push(trade);
        o3.state = OrderState.COMPLETE;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
        expectOrders(acc3, o3);
    });
});

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

    test("SELL negative price", () => {
        placeSell(acc1, new Big("1"), new Big("-1"));
        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("999"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("999"));
    })
});

describe("position updated after trade", () => {
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

describe("Cancel order", () => {
    test("Throws if cancelling order that hasn't been placed", () => {
        expect(() => {
            iBroker.cancel(new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, new Big("1"), new Big("1)")));
        }).toThrow();
    });

    test("Does not throw on valid call", () => {
        const order = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, new Big("1"), new Big("1"));
        iBroker.place(order);
        expect(() => {
            iBroker.cancel(order);
        }).not.toThrow();
    });

    test("Prevents trades from being made with the cancelled order", () => {
        const buy = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, new Big("1"), new Big("1"));
        const o1 = ExpectedOrder.create(buy);
        iBroker.place(buy);
        iBroker.cancel(buy);
        const o2 = placeSell(acc2, new Big("1"), new Big("1"));

        o1.state = OrderState.CANCELLED;
        expectOrders(acc1, o1);
        expectOrders(acc2, o2);
    });


    test("Unlocks the assets", () => {
        const before = (acc1.getAvailableAssets(Asset.BTC));
        const order = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, new Big("1"), new Big("1"));
        iBroker.place(order);
        iBroker.cancel(order);
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(before);
    });
});

describe("Self-Order prevention", () => {
    test("Buy first", () => {
        placeBuy(acc1, new Big("1"), new Big("1"));
        const sell = new Order(acc1, TradeDirection.SELL, Instrument.BTCGBP, new Big("1"), new Big("1"));
        expect(() => {
            iBroker.place(sell);
        }).toThrow();
    });

    test("Sell first", () => {
        placeSell(acc1, new Big("1"), new Big("1"));
        const buy = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, new Big("1"), new Big("1"));
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

    test("After 1 trade", () => {
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