import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import * as request from "request";
import Big from "big.js";
import Order from "../../../app/trading/order";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import {setup} from "../util/setup";
import {G} from "../util/global";

setup();

const url = `${G.API}prices/market`;

test("Happy Path", done => {
    const acc1 = new Account();
    const acc2 = new Account();

    acc1.adjustAssets(Asset.GBP, new Big("100"));
    acc1.adjustAssets(Asset.BTC, new Big("100"));
    acc1.adjustAssets(Asset.LTC, new Big("100"));
    acc2.adjustAssets(Asset.GBP, new Big("100"));
    acc2.adjustAssets(Asset.BTC, new Big("100"));
    acc2.adjustAssets(Asset.LTC, new Big("100"));

    const buy1 = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, new Big("20"), new Big("1.5"));
    const sell1 = new Order(acc2, TradeDirection.SELL, Instrument.BTCGBP, Big("20"), new Big("1.5"));
    const buy2 = new Order(acc1, TradeDirection.BUY, Instrument.LTCGBP, new Big("10"), new Big("1.6"));
    const sell2 = new Order(acc2, TradeDirection.SELL, Instrument.LTCGBP, new Big("10"), new Big("1.6"));

    G.BROKER.placeOrder(buy1);
    G.BROKER.placeOrder(sell1);
    G.BROKER.placeOrder(buy2);
    G.BROKER.placeOrder(sell2);

    const expected = {
        "BTCGBP": new Big("1.5").toString(),
        "LTCGBP": new Big("1.6").toString()
    };

    request.get(url, (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const json = JSON.parse(body);
        expect(json).toEqual(expected);
        done();
    });
});
