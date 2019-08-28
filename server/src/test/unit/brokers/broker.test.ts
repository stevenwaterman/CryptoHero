import Broker from "../../../app/brokers/broker";
import Account from "../../../app/trading/account";
import Instrument from "../../../app/trading/instrument";
import Order from "../../../app/trading/order";
import Asset from "../../../app/trading/asset";
import {Big} from "big.js";
import TradeDirection from "../../../app/trading/tradeDirection";
import {ExpectedOrder, ExpectedPending, ExpectedTrade} from "./expected";
import PriceAggregate, {PriceAggregateElement} from "../../../app/brokers/priceAggregate";
import {Map} from "immutable";
import {OrderState} from "../../../app/trading/orderState";

describe("constructor", () => {
    test("constructor does not throw an exception", () => {
        expect(() => new Broker()).not.toThrow();
    });

    test("constructor should return a Broker", () => {
        expect(new Broker()).toBeInstanceOf(Broker);
    });
});

let broker: Broker;
let acc1: Account;
let acc2: Account;
let acc3: Account;
let acc4: Account;
beforeEach(() => {
    broker = new Broker();
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

const placeBuy = (instrument: Instrument, account: Account, units: Big, price: Big) => {
    const order = new Order(account, TradeDirection.BUY, instrument, units, price);
    broker.placeOrder(order);
    return new ExpectedOrder(account, TradeDirection.BUY, Instrument.GBPBTC,units, price);
};

const placeSell = (instrument: Instrument, account: Account, units: Big, price: Big) => {
    const order = new Order(account, TradeDirection.SELL, instrument, units, price);
    broker.placeOrder(order);
    return new ExpectedOrder(account, TradeDirection.SELL, Instrument.GBPBTC,units, price);
};

const expectPending = (account: Account, instrument: Instrument, buys: Array<ExpectedOrder>, sells: Array<ExpectedOrder>) => {
    const pending = account.orders.filter(it => it.state === OrderState.PENDING && it.instrument.name === instrument.name);
    expect(pending).toBeTruthy();
        //TODO fix
};

describe("placing orders", () => {
    test("can place an order", () => {
        const inst = Instrument.GBPBTC;
        const order = placeBuy(inst, acc1, new Big("1"), new Big("1"));
        expectPending(acc1, inst, [order], []);
    });

    test("place an order on multiple instruments", () => {
        const o1 = placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const o2 = placeSell(Instrument.GBPLTC, acc1, new Big("1"), new Big("1"));
        expectPending(acc1, Instrument.GBPBTC, [o1], []);
        expectPending(acc1, Instrument.GBPLTC, [], [o2]);
    });
});

describe("completing trades", () => {
    test("simple trade", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));
        const expected = [new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"))];
        expect(acc1.orders).toMatchObject(expected);
        expect(acc1.orders).toHaveLength(1);

        expect(acc1.orders).toHaveLength(0);

        expect(acc2.orders).toMatchObject(expected);
        expect(acc2.orders).toHaveLength(1);

        expect(acc2.orders).toHaveLength(0);
    });

    test("multiple instruments", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        placeSell(Instrument.GBPLTC, acc1, new Big("1"), new Big("1"));

        placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));
        placeBuy(Instrument.GBPLTC, acc3, new Big("1"), new Big("1"));

        const gbpbtc = [new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"))];
        const gbpltc = [new ExpectedTrade(acc3, acc1, new Big("1"), new Big("1"))];

        expect(acc1.orders).toMatchObject(gbpbtc);
        expect(acc1.orders).toHaveLength(1);

        expect(acc1.orders).toMatchObject(gbpltc);
        expect(acc1.orders).toHaveLength(1);

        expect(acc2.orders).toMatchObject(gbpbtc);
        expect(acc2.orders).toHaveLength(1);

        expect(acc2.orders).toHaveLength(0);
        expect(acc3.orders).toHaveLength(0);

        expect(acc3.orders).toMatchObject(gbpltc);
        expect(acc3.orders).toHaveLength(1);
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
        broker.placeOrder(order);
        broker.cancelOrder(order);

        //TODO check this actually works
    });

    test("two instruments", () => {
        const o1 = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC, new Big("1"), new Big("1"));
        broker.placeOrder(o1);

        const o2 = new Order(acc1, TradeDirection.BUY, Instrument.GBPLTC, new Big("1"), new Big("1"));
        broker.placeOrder(o2);

        broker.cancelOrder(o1);
        //TODO check this works
    });
});

describe("Aggregate Prices", () => {
    test("Simple test", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        const expectedBTC = new PriceAggregate([new PriceAggregateElement(new Big("1"), new Big("1"))], []);
        const expectedLTC = new PriceAggregate([], []);
        const actual = broker.getAggregatePrices();
        expect(actual.get(Instrument.GBPBTC)).toEqual(expectedBTC);
        expect(actual.get(Instrument.GBPLTC)).toEqual(expectedLTC);
    });

    test("Two instruments", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        placeBuy(Instrument.GBPLTC, acc1, new Big("1"), new Big("1"));
        const expected = new PriceAggregate([new PriceAggregateElement(new Big("1"), new Big("1"))], []);
        const actual = broker.getAggregatePrices();
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

        expect(broker.getMarketPrices()).toEqual(expected);
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

        expect(broker.getMarketPrices()).toEqual(expected);
    });
});
