import Broker from "../../app/brokers/broker";
import Account from "../../app/trading/account";
import {INSTRUMENTS} from "../../app/trading/instrument";
import {TradeDirection} from "../../app/trading/order";
import {expectedOrder, expectedPending, expectedTrade} from "./expected";
import {ASSETS} from "../../app/trading/asset";

describe("constructor", () => {
    test("constructor does not throw an exception", () => {
        expect(() => new Broker()).not.toThrow();
    });

    test("constructor should return a Broker", () => {
        expect(new Broker()).toBeInstanceOf(Broker);
    });
});

let broker;
let acc1, acc2, acc3, acc4;
beforeEach(() => {
    broker = new Broker();
    acc1 = new Account();
    acc2 = new Account();
    acc3 = new Account();
    acc4 = new Account();
});

const placeBuy = (instrument, account, units, price) => {
    const order = account.createBuy(units, price);
    broker.placeOrder(instrument, order);
    return expectedOrder(account, TradeDirection.BUY, units, price);
};

const placeSell = (instrument, account, units, price) => {
    const order = account.createSell(units, price);
    broker.placeOrder(instrument, order);
    return expectedOrder(account, TradeDirection.SELL, units, price);
};

describe("placing orders", () => {
    test("can place an order", () => {
        const order = placeBuy(INSTRUMENTS.GBPBTC, acc1, 1, 1);
        const pending = broker.getPendingOrders(acc1);
        expect(pending).toMatchObject({
            "GBPBTC": expectedPending([order], [])
        });
    });

    test("place an order on multiple instruments", () => {
        const o1 = placeBuy(INSTRUMENTS.GBPBTC, acc1, 1, 1);
        const o2 = placeSell(INSTRUMENTS.GBPLTC, acc1, 1, 1);
        const pending = broker.getPendingOrders(acc1);
        expect(pending).toMatchObject({
            "GBPBTC": expectedPending([o1], []),
            "GBPLTC": expectedPending([], [o2])
        });
    });
});

describe("completing trades", () => {
    test("simple trade", () => {
        placeBuy(INSTRUMENTS.GBPBTC, acc1, 1, 1);
        placeSell(INSTRUMENTS.GBPBTC, acc2, 1, 1);
        const expected = {
            "GBPBTC": [expectedTrade(acc1, acc2, 1, 1)]
        };
        expect(broker.getTrades(acc1)).toMatchObject(expected);
        expect(broker.getTrades(acc2)).toMatchObject(expected);
    });

    test("multiple instruments", () => {
        placeBuy(INSTRUMENTS.GBPBTC, acc1, 1, 1);
        placeSell(INSTRUMENTS.GBPLTC, acc1, 1, 1);

        placeSell(INSTRUMENTS.GBPBTC, acc2, 1, 1);
        placeBuy(INSTRUMENTS.GBPLTC, acc3, 1, 1);

        const expected = {
            "GBPBTC": [expectedTrade(acc1, acc2, 1, 1)],
            "GBPLTC": [expectedTrade(acc3, acc1, 1, 1)]
        };

        expect(broker.getTrades(acc1)).toMatchObject(expected);
    })
});

describe("position should update", () => {
    beforeEach(() => {
        [acc1, acc2, acc3, acc4].forEach((acc) => {
            acc.addAssets(ASSETS.GBP, 10);
            acc.addAssets(ASSETS.BTC, 10);
            acc.addAssets(ASSETS.LTC, 10);
        });
    });

    test("Works with trades in multiple instruments", () => {
        placeBuy(INSTRUMENTS.GBPBTC, acc1, 1, 1);
        placeBuy(INSTRUMENTS.GBPLTC, acc1, 1, 1);
        placeSell(INSTRUMENTS.GBPBTC, acc2, 1, 1);
        placeSell(INSTRUMENTS.GBPLTC, acc3, 1, 1);

        expect(acc1.getAssets(ASSETS.GBP)).toEqual(12);
        expect(acc1.getAssets(ASSETS.BTC)).toEqual(9);
        expect(acc1.getAssets(ASSETS.LTC)).toEqual(9);

        expect(acc2.getAssets(ASSETS.GBP)).toEqual(9);
        expect(acc2.getAssets(ASSETS.BTC)).toEqual(11);
        expect(acc2.getAssets(ASSETS.LTC)).toEqual(10);

        expect(acc3.getAssets(ASSETS.GBP)).toEqual(9);
        expect(acc3.getAssets(ASSETS.BTC)).toEqual(10);
        expect(acc3.getAssets(ASSETS.LTC)).toEqual(11);
    });
});