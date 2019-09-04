import BitcoinExchangeServer from "./api/bitcoinExchangeServer";
import Account from "./trading/account";
import Asset from "./trading/asset";
import TradeDirection from "./trading/tradeDirection";
import Order from "./trading/order";
import Instrument from "./trading/instrument";
import Big from "big.js";
import PriceAggregate from "./brokers/priceAggregate";

console.log("Launching Server");
const server = new BitcoinExchangeServer();
server.launch(4000);
console.log("Listening on port 4000");

process.on('exit', () => {
    console.log("Server shutting down");
    server.shutdown();
    console.log("Server shut down");
});
//TODO remove

const buyer = new Account();
const seller = new Account();
const instruments = Instrument.ALL.toArray();
const accounts = [buyer, seller];
accounts.forEach(acc => {
    Asset.ALL.forEach(asset => {
        acc.adjustAssets(asset, new Big("1e10"));
    });
});
let midPoint = 10;
setInterval(() => {
    midPoint += 0.0001;
    Instrument.ALL.forEach(instrument => {
        const direction = Math.round(Math.random()) === 0 ? TradeDirection.BUY : TradeDirection.SELL;
        const units = new Big(Math.random() * 100);
        const price = new Big( midPoint + gaussRand() + (direction === TradeDirection.BUY ? -0.2 : 0.2));

        let account;
        if (direction == TradeDirection.BUY) {
            account = buyer;
        } else {
            account = seller;
        }

        try {
            const order = new Order(account, direction, instrument, units, price);
            server.broker.placeOrder(order);
        } catch (ignore) {
        }
    })
}, 250);

function gaussRand(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
