import Broker from "../../../app/brokers/broker";
import Account from "../../../app/trading/account";
import Instrument from "../../../app/trading/instrument";
import Order from "../../../app/trading/order";
import Asset from "../../../app/trading/asset";
import {Big} from "big.js";
import TradeDirection from "../../../app/trading/tradeDirection";
import {
    ExpectedOrder,
    ExpectedPending,
    ExpectedTrade,
    expectOrders,
    placeBuy,
    placeSell,
    setup,
    testBroker
} from "../expected";
import PriceAggregate, {PriceAggregateElement} from "../../../app/brokers/priceAggregate";
import {Map} from "immutable";
import {OrderState} from "../../../app/trading/orderState";

setup();

describe("constructor", () => {
    test("constructor does not throw an exception", () => {
        expect(() => new Broker()).not.toThrow();
    });

    test("constructor should return a Broker", () => {
        expect(new Broker()).toBeInstanceOf(Broker);
    });
});

let acc1: Account;
let acc2: Account;
let acc3: Account;
let acc4: Account;
beforeEach(() => {
    acc1 = new Account();
    acc2 = new Account();
    acc3 = new Account();
    acc4 = new Account();
    [acc1, acc2, acc3, acc4].forEach(acc => {
        acc.adjustAssets(Asset.GBP, new Big("1000"));
        acc.adjustAssets(Asset.BTC, new Big("1000"));
        acc.adjustAssets(Asset.LTC, new Big("1000"));
    });
});



describe("placing orders", () => {
    test("can place an order", () => {
        const inst = Instrument.GBPBTC;
        const order: ExpectedOrder = placeBuy(inst, acc1, new Big("1"), new Big("1"));
        expectOrders(acc1, order);
    });

    test("place an order on multiple instruments", () => {
        const o1 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(Instrument.GBPLTC, acc1, new Big("1"), new Big("1"));
        expectOrders(acc1, o1,o2);
    });
});

describe("completing trades", () => {
    test("simple trade", () => {
        const expectO1 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const expectO2 = placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));

        const expectedTrade = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        expectO1.trades.push(expectedTrade);
        expectO1.state = OrderState.COMPLETE;
        expectO2.trades.push(expectedTrade);
        expectO2.state = OrderState.COMPLETE;

        expectOrders(acc1, expectO1);
        expectOrders(acc2, expectO2);
    });

    test("multiple instruments", () => {
        const o1 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(Instrument.GBPLTC, acc1, new Big("1"), new Big("1"));

        const o3 = placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));
        const o4 = placeBuy(Instrument.GBPLTC, acc3, new Big("1"), new Big("1"));

        const gbpbtc = new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"));
        const gbpltc = new ExpectedTrade(acc3, acc1, new Big("1"), new Big("1"));

        o1.trades.push(gbpbtc);
        o1.state = OrderState.COMPLETE;

        o2.trades.push(gbpltc);
        o2.state = OrderState.COMPLETE;

        o3.trades.push(gbpbtc);
        o3.state = OrderState.COMPLETE;

        o4.trades.push(gbpltc);
        o4.state = OrderState.COMPLETE;

        expectOrders(acc1, o1, o2);
        expectOrders(acc2, o3);
        expectOrders(acc3, o4);
    });
});

describe("position should update", () => {
    test("Works with trades in multiple instruments", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        placeBuy(Instrument.GBPLTC, acc1, new Big("1"), new Big("1"));
        placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));
        placeSell(Instrument.GBPLTC, acc3, new Big("1"), new Big("1"));

        expect(acc1.getAvailableAssets(Asset.GBP)).toEqual(new Big("1002"));
        expect(acc1.getAvailableAssets(Asset.BTC)).toEqual(new Big("999"));
        expect(acc1.getAvailableAssets(Asset.LTC)).toEqual(new Big("999"));

        expect(acc2.getAvailableAssets(Asset.GBP)).toEqual(new Big("999"));
        expect(acc2.getAvailableAssets(Asset.BTC)).toEqual(new Big("1001"));
        expect(acc2.getAvailableAssets(Asset.LTC)).toEqual(new Big("1000"));

        expect(acc3.getAvailableAssets(Asset.GBP)).toEqual(new Big("999"));
        expect(acc3.getAvailableAssets(Asset.BTC)).toEqual(new Big("1000"));
        expect(acc3.getAvailableAssets(Asset.LTC)).toEqual(new Big("1001"));
    });
});

describe("cancelling order", () => {
    test("simple test", () => {
        const order = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("1"), new Big("1"));
        testBroker.placeOrder(order);

        const expected = new ExpectedOrder(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("1"), new Big("1"), OrderState.PENDING);
        expectOrders(acc1, expected);

        testBroker.cancelOrder(order);
        expected.state = OrderState.CANCELLED;
        expectOrders(acc1, expected);
    });

    test("two instruments", () => {
        const o1 = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("1"), new Big("1"));
        testBroker.placeOrder(o1);

        const o2 = new Order(acc1, TradeDirection.BUY, Instrument.GBPLTC, new Big("1"), new Big("1"));
        testBroker.placeOrder(o2);

        const expectO1 = new ExpectedOrder(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("1"), new Big("1"), OrderState.PENDING);
        const expectO2 = new ExpectedOrder(acc1, TradeDirection.BUY, Instrument.GBPLTC, new Big("1"), new Big("1"), OrderState.PENDING);
        expectOrders(acc1, expectO1, expectO2);

        testBroker.cancelOrder(o1);
        expectO1.state = OrderState.CANCELLED;
        expectOrders(acc1, expectO1, expectO2);
    });
});

describe("Aggregate Prices", () => {
    test("Simple test", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const expectedBTC = new PriceAggregate([new PriceAggregateElement(new Big("1"), new Big("1"))], []);
        const expectedLTC = new PriceAggregate([], []);
        const actual = testBroker.getAggregatePrices();
        expect(actual.get(Instrument.GBPBTC)).toEqual(expectedBTC);
        expect(actual.get(Instrument.GBPLTC)).toEqual(expectedLTC);
    });

    test("Two instruments", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        placeBuy(Instrument.GBPLTC, acc1, new Big("1"), new Big("1"));
        const expected = new PriceAggregate([new PriceAggregateElement(new Big("1"), new Big("1"))], []);
        const actual = testBroker.getAggregatePrices();
        expect(actual.get(Instrument.GBPBTC)).toEqual(expected);
        expect(actual.get(Instrument.GBPLTC)).toEqual(expected);
    });
});

describe("Market Prices", () => {
    test("No trades", () => {
        const expected = Map().withMutations(map => {
            map.set(Instrument.GBPBTC, new Big("0"));
            map.set(Instrument.GBPLTC, new Big("0"));
        });

        expect(testBroker.getMarketPrices()).toEqual(expected);
    });

    test("With trades", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));

        placeBuy(Instrument.GBPLTC, acc1, new Big("2"), new Big("2"));
        placeSell(Instrument.GBPLTC, acc2, new Big("2"), new Big("2"));

        const expected = Map().withMutations(map => {
            map.set(Instrument.GBPBTC, new Big("1"));
            map.set(Instrument.GBPLTC, new Big("2"));
        });

        expect(testBroker.getMarketPrices()).toEqual(expected);
    });
});
