import BitcoinExchangeServer from "./api/bitcoinExchangeServer";
import Account from "./trading/account";
import Asset from "./trading/asset";
import TradeDirection from "./trading/tradeDirection";
import Order from "./trading/order";
import Instrument from "./trading/instrument";
import Big from "big.js";
import {OrderState} from "./trading/orderState";

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
const accounts = [buyer, seller];
accounts.forEach(acc => {
    Asset.ALL.forEach(asset => {
        acc.adjustAssets(asset, Big("1e10"));
    });
});
const instruments = Array.from(Instrument.ALL);
setInterval(() => {
    const marketPrices = server.broker.getMarketPrices();
    const instrument = instruments[Math.floor(Math.random() * instruments.length)];
    const direction: TradeDirection = Math.round(Math.random()) === 0 ? TradeDirection.BUY : TradeDirection.SELL;
    const units: Big = Big(Math.random() * 100);
    const midPoint = marketPrices.get(instrument) as Big;
    const price: Big = midPoint.plus(gaussRand() * 0.2).plus(direction === TradeDirection.BUY ? -0.1 : 0.1);

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

    account.getOrders()
        .filter(it =>
            it.getState() === OrderState.PENDING &&
            it.instrument.name === instrument.name &&
            it.unitPrice.sub(midPoint).abs().gt(1)
        ).forEach(it => server.broker.cancelOrder(it));
}, 1);

function gaussRand(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
