import Order, {TradeDirection} from "../../app/trading/order";
import Account from "../../app/trading/account";

let account;
let buy1;
let buy2;
let buy3;
let buy4;
let buy5;
let sell1;
let sell2;
let sell3;
let sell4;
let sell5;

beforeEach(() => {
  account = new Account();
  buy1 = new Order(account, TradeDirection.BUY, 1, 1);
  buy2 = new Order(account, TradeDirection.BUY, 2, 2.5);
  buy3 = new Order(account, TradeDirection.BUY, 2.5, 2);
  buy4 = new Order(account, TradeDirection.BUY, 2.5, 2.5);
  buy5 = new Order(account, TradeDirection.BUY, 2, -2);
  sell1 = new Order(account, TradeDirection.SELL, 1, 1);
  sell2 = new Order(account, TradeDirection.SELL, 2, 2.5);
  sell3 = new Order(account, TradeDirection.SELL, 2.5, 2);
  sell4 = new Order(account, TradeDirection.SELL, 2.5, 2.5);
  sell5 = new Order(account, TradeDirection.SEL, 2, -2);
});

describe("construct", () => {
  test("constructor does not throw an exception", () => {
    expect(() => new Order(1, TradeDirection.BUY, 100, 1.14)).not.toThrow();
  });

  test("constructor should return an Order", () => {
    expect(new Order(1, TradeDirection.BUY, 100, 1.14)).toBeInstanceOf(Order);
  });

  test("constructor should throw error if called with negative units", () => {
    expect(() => new Order(1, TradeDirection.BUY, -100, 1.14)).toThrow();
  });

  test("constructor should throw error if called with zero units", () => {
    expect(() => new Order(1, TradeDirection.BUY, 0, 1.14)).toThrow();
  });

  test("id is set and non-zero", () => {
    expect(new Order(1, TradeDirection.BUY, 1, 1).id).toBeTruthy();
  });
});

describe("gain amount", () => {
  test("BUY 1x1", () => {
    expect(buy1.gainAmount).toEqual(1);
  });

  test("BUY 2x2.5", () => {
    expect(buy2.gainAmount).toEqual(2);
  });

  test("BUY 2.5x2", () => {
    expect(buy3.gainAmount).toEqual(2.5);
  });

  test("BUY 2.5x2.5", () => {
    expect(buy4.gainAmount).toEqual(2.5);
  });

  test("BUY 2x-2", () => {
    expect(buy5.gainAmount).toEqual(2);
  });

  test("SELL 1x1", () => {
    expect(sell1.gainAmount).toEqual(1);
  });

  test("SELL 2x2.5", () => {
    expect(sell2.gainAmount).toEqual(5);
  });

  test("SELL 2.5x2", () => {
    expect(sell3.gainAmount).toEqual(5);
  });

  test("SELL 2.5x2.5", () => {
    expect(sell4.gainAmount).toEqual(6.25);
  });

  test("SELL 2x-2", () => {
    expect(sell5.gainAmount).toEqual(-4);
  });
});

describe("spend amount", () => {
  test("BUY 1x1", () => {
    expect(buy1.spendAmount).toEqual(1);
  });

  test("BUY 2x2.5", () => {
    expect(buy2.spendAmount).toEqual(5);
  });

  test("BUY 2.5x2", () => {
    expect(buy3.spendAmount).toEqual(5);
  });

  test("BUY 2.5x2.5", () => {
    expect(buy4.spendAmount).toEqual(6.25);
  });

  test("BUY 2x-2", () => {
    expect(buy5.spendAmount).toEqual(-4);
  });

  test("SELL 1x1", () => {
    expect(sell1.spendAmount).toEqual(1);
  });

  test("SELL 2x2.5", () => {
    expect(sell2.spendAmount).toEqual(2);
  });

  test("SELL 2.5x2", () => {
    expect(sell3.spendAmount).toEqual(2.5);
  });

  test("SELL 2.5x2.5", () => {
    expect(sell4.spendAmount).toEqual(2.5);
  });

  test("SELL 2x-2", () => {
    expect(sell5.spendAmount).toEqual(2);
  });
});
