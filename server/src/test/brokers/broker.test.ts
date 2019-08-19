import Broker from "../../app/brokers/broker";
import Account from "../../app/trading/account";
import Instrument from "../../app/trading/instrument";
import Order from "../../app/trading/order";
import Asset from "../../app/trading/asset";
import {Big} from "big.js";
import TradeDirection from "../../app/trading/tradeDirection";
import {ExpectedOrder, ExpectedPending, ExpectedTrade} from "./expected";
import PendingOrders from "../../app/brokers/pendingOrders";

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
    const order = new Order(account, TradeDirection.BUY, units, price);
    broker.placeOrder(instrument, order);
    return new ExpectedOrder(account, TradeDirection.BUY, units, price);
};

const placeSell = (instrument: Instrument, account: Account, units: Big, price: Big) => {
    const order = new Order(account, TradeDirection.SELL, units, price);
    broker.placeOrder(instrument, order);
    return new ExpectedOrder(account, TradeDirection.SELL, units, price);
};

const expectPending = (account: Account, instrument: Instrument, buys: Array<ExpectedOrder>, sells: Array<ExpectedOrder>) => {
    const pending = broker.getPendingOrders(account);
    const maybeIPending: PendingOrders | undefined = pending.get(instrument);
    expect(maybeIPending).toBeTruthy();

    const iPending = <PendingOrders>maybeIPending;
    const expectedPending = new ExpectedPending(buys, sells);
    expect(iPending).toMatchObject(expectedPending);
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
        expect(broker.getTrades(acc1).get(Instrument.GBPBTC)).toMatchObject(expected);
        expect(broker.getTrades(acc1).get(Instrument.GBPBTC)).toHaveLength(1);

        expect(broker.getTrades(acc1).get(Instrument.GBPLTC)).toHaveLength(0);

        expect(broker.getTrades(acc2).get(Instrument.GBPBTC)).toMatchObject(expected);
        expect(broker.getTrades(acc2).get(Instrument.GBPBTC)).toHaveLength(1);

        expect(broker.getTrades(acc2).get(Instrument.GBPLTC)).toHaveLength(0);
    });

    test("multiple instruments", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("1"), new Big("1"));
        placeSell(Instrument.GBPLTC, acc1, new Big("1"), new Big("1"));

        placeSell(Instrument.GBPBTC, acc2, new Big("1"), new Big("1"));
        placeBuy(Instrument.GBPLTC, acc3, new Big("1"), new Big("1"));

        const gbpbtc = [new ExpectedTrade(acc1, acc2, new Big("1"), new Big("1"))];
        const gbpltc = [new ExpectedTrade(acc3, acc1, new Big("1"), new Big("1"))];

        expect(broker.getTrades(acc1).get(Instrument.GBPBTC)).toMatchObject(gbpbtc);
        expect(broker.getTrades(acc1).get(Instrument.GBPBTC)).toHaveLength(1);

        expect(broker.getTrades(acc1).get(Instrument.GBPLTC)).toMatchObject(gbpltc);
        expect(broker.getTrades(acc1).get(Instrument.GBPLTC)).toHaveLength(1);

        expect(broker.getTrades(acc2).get(Instrument.GBPBTC)).toMatchObject(gbpbtc);
        expect(broker.getTrades(acc2).get(Instrument.GBPBTC)).toHaveLength(1);

        expect(broker.getTrades(acc2).get(Instrument.GBPLTC)).toHaveLength(0);
        expect(broker.getTrades(acc3).get(Instrument.GBPBTC)).toHaveLength(0);

        expect(broker.getTrades(acc3).get(Instrument.GBPLTC)).toMatchObject(gbpltc);
        expect(broker.getTrades(acc3).get(Instrument.GBPLTC)).toHaveLength(1);
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

describe("locked assets", () => {
    test("simple test", () => {
        placeBuy(Instrument.GBPBTC, acc1, new Big("100"), new Big("2"));
        const locked = broker.getLockedAssets(acc1);
        expect(locked.get(Asset.BTC)).toEqual(new Big("200"));
        expect(locked.get(Asset.GBP)).toEqual(new Big("0"));
        expect(locked.get(Asset.LTC)).toEqual(new Big("0"));
    });
});

describe("cancelling order", () => {
    test("simple test", () => {
        const order = new Order(acc1, TradeDirection.BUY, new Big("1"), new Big("1"));
        broker.placeOrder(Instrument.GBPBTC, order);
        broker.cancelOrder(Instrument.GBPBTC, order);

        const pending = broker.getPendingOrders(acc1);
        const expectedPending = new ExpectedPending([], []);
        expect(pending.get(Instrument.GBPBTC)).toMatchObject(expectedPending);
        expect(pending.get(Instrument.GBPLTC)).toMatchObject(expectedPending);
    });

    test("two instruments", () => {
        const o1 = new Order(acc1, TradeDirection.BUY, new Big("1"), new Big("1"));
        broker.placeOrder(Instrument.GBPBTC, o1);

        const o2 = new Order(acc1, TradeDirection.BUY, new Big("1"), new Big("1"));
        broker.placeOrder(Instrument.GBPLTC, o2);

        broker.cancelOrder(Instrument.GBPBTC, o1);

        const pending = broker.getPendingOrders(acc1);

        expect(pending.get(Instrument.GBPBTC)).toMatchObject(new ExpectedPending([], []));
        expect(pending.get(Instrument.GBPLTC)).toMatchObject(new ExpectedPending([o2], []));
    });
});
