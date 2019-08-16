import InstrumentBroker from "./brokers/instrumentBroker";
import Account from "./trading/account";
import {Big} from "big.js";
import Order from "./trading/order";
import {Instrument} from "./trading/instrument";
import TradeDirection from "./trading/tradeDirection";
import Asset from "./trading/asset";

console.log("Starting");
const matcher = new InstrumentBroker(Instrument.GBPBTC);

const account1 = new Account();
const account2 = new Account();

account1.adjustAssets(Asset.BTC, new Big("1"));
account2.adjustAssets(Asset.GBP, new Big("1"));

const order1 = new Order(
    account1,
    TradeDirection.BUY,
    new Big("1"),
    new Big("1")
);
const order2 = new Order(
    account2,
    TradeDirection.SELL,
    new Big("1"),
    new Big("1")
);

matcher.place(order1);
matcher.place(order2);

const trades = matcher.getTrades(account1);
console.log(trades);

console.log("Done");
