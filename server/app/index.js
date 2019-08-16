import InstrumentBroker from "./brokers/instrumentBroker";
import Account from "./trading/account";

console.log("Starting");
const matcher = new InstrumentBroker();

const account1 = new Account();
const account2 = new Account();

const order1 = account1.createBuy(1, 1);
const order2 = account2.createSell(1, 1);

matcher.place(order1);
matcher.place(order2);

const trades = matcher.getTrades(1);
console.log(trades);

console.log("Done");
