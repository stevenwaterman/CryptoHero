import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import * as request from "request";
import Big from "big.js";
import Order from "../../../app/trading/order";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import {G, setup} from "../setup/global";

setup();

function getUrl(instrument: Instrument): string {
    return `${G.API}prices/${instrument.name}/market`;
}

test("Happy Path", done => {
    const acc1 = new Account();
    const acc2 = new Account();

    acc1.adjustAssets(Asset.GBP, new Big("100"));
    acc1.adjustAssets(Asset.BTC, new Big("100"));
    acc2.adjustAssets(Asset.GBP, new Big("100"));
    acc2.adjustAssets(Asset.BTC, new Big("100"));

    const buy1 = new Order(acc1, TradeDirection.BUY, new Big("50"), new Big("1.5"));
    const sell1 = new Order(acc2, TradeDirection.SELL, new Big("50"), new Big("1.5"));

    G.BROKER.placeOrder(Instrument.GBPBTC, buy1);
    G.BROKER.placeOrder(Instrument.GBPBTC, sell1);

    const expected = {
        "unit price": new Big("1.5").toString(),
    };

    request.get(getUrl(Instrument.GBPBTC), (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const json = JSON.parse(body);
        expect(json).toEqual(expected);
        done();
    });
});
