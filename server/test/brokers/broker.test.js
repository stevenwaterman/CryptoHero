import Broker from "../../app/brokers/broker";
import Account from "../../app/trading/account";
import {INSTRUMENTS} from "../../app/trading/instrument";
import Order, {TradeDirection} from "../../app/trading/order";
import {expectedOrder, expectedPending, expectedTrade} from "./expected";
import {ASSETS} from "../../app/trading/asset";
import {Big} from "big.js";

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
  [acc1, acc2, acc3, acc4].forEach(acc => {
    acc.adjustAssets(ASSETS.GBP, new Big("1000"));
    acc.adjustAssets(ASSETS.BTC, new Big("1000"));
    acc.adjustAssets(ASSETS.LTC, new Big("1000"));
  });
});

const placeBuy = (instrument, account, units, price) => {
  const order = new Order(account, TradeDirection.BUY, units, price);
  broker.placeOrder(instrument, order);
  return expectedOrder(account, TradeDirection.BUY, units, price);
};

const placeSell = (instrument, account, units, price) => {
  const order = new Order(account, TradeDirection.SELL, units, price);
  broker.placeOrder(instrument, order);
  return expectedOrder(account, TradeDirection.SELL, units, price);
};

describe("placing orders", () => {
  test("can place an order", () => {
    const order = placeBuy(INSTRUMENTS.GBPBTC, acc1, new Big("1"), new Big("1"));
    const pending = broker.getPendingOrders(acc1);
    expect(pending).toMatchObject({
      GBPBTC: expectedPending([order], [])
    });
  });

  test("place an order on multiple instruments", () => {
    const o1 = placeBuy(INSTRUMENTS.GBPBTC, acc1, new Big("1"), new Big("1"));
    const o2 = placeSell(INSTRUMENTS.GBPLTC, acc1, new Big("1"), new Big("1"));
    const pending = broker.getPendingOrders(acc1);
    expect(pending).toMatchObject({
      GBPBTC: expectedPending([o1], []),
      GBPLTC: expectedPending([], [o2])
    });
  });
});

describe("completing trades", () => {
  test("simple trade", () => {
    placeBuy(INSTRUMENTS.GBPBTC, acc1, new Big("1"), new Big("1"));
    placeSell(INSTRUMENTS.GBPBTC, acc2, new Big("1"), new Big("1"));
    const expected = {
      GBPBTC: [expectedTrade(acc1, acc2, new Big("1"), new Big("1"))]
    };
    expect(broker.getTrades(acc1)).toMatchObject(expected);
    expect(broker.getTrades(acc2)).toMatchObject(expected);
  });

  test("multiple instruments", () => {
    placeBuy(INSTRUMENTS.GBPBTC, acc1, new Big("1"), new Big("1"));
    placeSell(INSTRUMENTS.GBPLTC, acc1, new Big("1"), new Big("1"));

    placeSell(INSTRUMENTS.GBPBTC, acc2, new Big("1"), new Big("1"));
    placeBuy(INSTRUMENTS.GBPLTC, acc3, new Big("1"), new Big("1"));

    const expected = {
      GBPBTC: [expectedTrade(acc1, acc2, new Big("1"), new Big("1"))],
      GBPLTC: [expectedTrade(acc3, acc1, new Big("1"), new Big("1"))]
    };

    expect(broker.getTrades(acc1)).toMatchObject(expected);
  });
});

describe("position should update", () => {
  test("Works with trades in multiple instruments", () => {
    placeBuy(INSTRUMENTS.GBPBTC, acc1, new Big("1"), new Big("1"));
    placeBuy(INSTRUMENTS.GBPLTC, acc1, new Big("1"), new Big("1"));
    placeSell(INSTRUMENTS.GBPBTC, acc2, new Big("1"), new Big("1"));
    placeSell(INSTRUMENTS.GBPLTC, acc3, new Big("1"), new Big("1"));

    expect(acc1.getAvailableAssets(ASSETS.GBP)).toEqual(new Big("1002"));
    expect(acc1.getAvailableAssets(ASSETS.BTC)).toEqual(new Big("999"));
    expect(acc1.getAvailableAssets(ASSETS.LTC)).toEqual(new Big("999"));

    expect(acc2.getAvailableAssets(ASSETS.GBP)).toEqual(new Big("999"));
    expect(acc2.getAvailableAssets(ASSETS.BTC)).toEqual(new Big("1001"));
    expect(acc2.getAvailableAssets(ASSETS.LTC)).toEqual(new Big("1000"));

    expect(acc3.getAvailableAssets(ASSETS.GBP)).toEqual(new Big("999"));
    expect(acc3.getAvailableAssets(ASSETS.BTC)).toEqual(new Big("1000"));
    expect(acc3.getAvailableAssets(ASSETS.LTC)).toEqual(new Big("1001"));
  });
});

describe("locked assets", () => {
  test("simple test", () => {
    placeBuy(INSTRUMENTS.GBPBTC, acc1, new Big("100"), new Big("2"));
    expect(broker.getLockedAssets(acc1)).toMatchObject({
      BTC: new Big("200"),
      GBP: new Big("0"),
      LTC: new Big("0")
    });
  });
});
