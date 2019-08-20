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
    return `${G.API}prices/${instrument.name}/aggregate`;
}

test("Happy Path", done => {
    const acc1 = new Account();

    acc1.adjustAssets(Asset.GBP, new Big("100"));
    acc1.adjustAssets(Asset.BTC, new Big("100"));

    const order = new Order(acc1, TradeDirection.BUY, new Big("50"), new Big("1.5"));
    G.BROKER.placeOrder(Instrument.GBPBTC, order);

    const expected = {
        "buy": [
            {
                "unit price": new Big("1.5").toString(),
                "units": new Big("50").toString()
            }
        ],
        "sell": []
    };

    request.get(getUrl(Instrument.GBPBTC), (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const json = JSON.parse(body);
        expect(json).toEqual(expected);
        done();
    });
});
