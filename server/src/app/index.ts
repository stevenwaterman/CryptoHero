import BitcoinExchangeServer from "./api/bitcoinExchangeServer";
import Account from "./trading/account";
import Asset from "./trading/asset";
import TradeDirection from "./trading/tradeDirection";
import order from "./trading/order";
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


const acc1 = new Account();
const acc2 = new Account();
const acc3 = new Account();
const acc4 = new Account();
const instruments = Instrument.ALL.toArray();
const accounts = [acc1, acc2, acc3, acc4];
    accounts.forEach(acc => {
    Asset.ALL.forEach(asset => {
        acc.adjustAssets(asset, new Big("1e10"));
    });
});//TODO remove
setInterval(() => {
    const account = accounts[Math.floor(Math.random()*accounts.length)];
    const instrument = instruments[Math.floor(Math.random()*instruments.length)];
    const units = new Big(Math.random()*100);
    const price = new Big((Math.random() + Math.random() + Math.random() + Math.random())*100);

    const aggregate = server.broker.getAggregatePrices().get(instrument) as PriceAggregate;
    const buys = aggregate.buy.reduce((prev, curr) => prev.plus(curr.units), new Big("0"));
    const sells = aggregate.sell.reduce((prev, curr) => prev.plus(curr.units), new Big("0"));
    let direction = buys.gt(sells) ? TradeDirection.SELL : TradeDirection.BUY;

    try {
        const order = new Order(account, direction, instrument, units, price);
        server.broker.placeOrder(order);
    } catch(ignore){}
}, 200);
