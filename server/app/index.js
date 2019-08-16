import InstrumentBroker from "./brokers/instrumentBroker";
import Account from "./trading/account";
import {Big} from "big.js";
import Order, {TradeDirection} from "./trading/order";

console.log("Starting");
const matcher = new InstrumentBroker();

const account1 = new Account();
const account2 = new Account();

const order1 = new Order(account1, TradeDirection.BUY, new Big("1"), new Big("1"));
const order2 = new Order(account2, TradeDirection.SELL, new  Big("1"), new Big("1"));

matcher.place(order1);
matcher.place(order2);

const trades = matcher.getTrades(1);
console.log(trades);

console.log("Done");
