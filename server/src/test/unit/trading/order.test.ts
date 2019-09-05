import Order from "../../../app/trading/order";
import Account from "../../../app/trading/account";
import {Big} from "big.js";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";

let account: Account;
let buy1: Order;
let buy2: Order;
let buy3: Order;
let buy4: Order;
let buy5: Order;
let sell1: Order;
let sell2: Order;
let sell3: Order;
let sell4: Order;
let sell5: Order;

beforeEach(() => {
    account = new Account();
    buy1 = new Order(account, TradeDirection.BUY,Instrument.BTCGBP, Big(1), Big(1));
    buy2 = new Order(account, TradeDirection.BUY,Instrument.BTCGBP, Big(2), Big("2.5"));
    buy3 = new Order(account, TradeDirection.BUY,Instrument.BTCGBP, Big("2.5"), Big(2));
    buy4 = new Order(account, TradeDirection.BUY, Instrument.BTCGBP,Big("2.5"), Big("2.5"));
    buy5 = new Order(account, TradeDirection.BUY,Instrument.BTCGBP, Big(2), Big(-2));
    sell1 = new Order(account, TradeDirection.SELL,Instrument.BTCGBP, Big(1), Big(1));
    sell2 = new Order(account, TradeDirection.SELL,Instrument.BTCGBP, Big(2), Big("2.5"));
    sell3 = new Order(account, TradeDirection.SELL,Instrument.BTCGBP, Big("2.5"), Big(2));
    sell4 = new Order(account, TradeDirection.SELL,Instrument.BTCGBP, Big("2.5"), Big("2.5"));
    sell5 = new Order(account, TradeDirection.SELL,Instrument.BTCGBP, Big(2), Big(-2));
});

describe("construct", () => {
    test("constructor should throw error if called with negative units", () => {
        expect(() => new Order(account, TradeDirection.BUY,Instrument.BTCGBP, Big(-100), Big("1.14"))).toThrow();
    });

    test("constructor should throw error if called with zero units", () => {
        expect(() => new Order(account, TradeDirection.BUY,Instrument.BTCGBP, Big(0), Big("1.14"))).toThrow();
    });

    test("id is set and non-zero", () => {
        expect(new Order(account, TradeDirection.BUY, Instrument.BTCGBP,Big(1), Big(1)).id).toBeTruthy();
    });
});

