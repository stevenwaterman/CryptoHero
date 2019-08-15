import Matcher from "./matcher";
import Order, {TradeDirection} from "./order";

console.log("Starting");
const matcher = new Matcher();

const order1 = new Order(1, TradeDirection.BUY, 1, 1);
const order2 = new Order(2, TradeDirection.SELL, 1, 1);

matcher.place(order1);
matcher.place(order2);

const trades = matcher.getTrades(1);
console.log(trades);

console.log("Done");