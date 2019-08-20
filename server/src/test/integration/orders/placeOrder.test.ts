import * as request from "request";
import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import Big from "big.js";
import {G, setup} from "../setup/global";

setup();
const endpoint = G.API + "orders/place";

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("100"));

    const options = {
        "json": true,
        "body": {
            "account": account.id,
            "instrument": Instrument.GBPBTC.name,
            "direction": TradeDirection.BUY.name,
            "units": new Big("20").toString(),
            "unit price": new Big("1").toString()
        }
    };

    request.post(endpoint, options, (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);

        const expected: string = G.BROKER.getIBroker(Instrument.GBPBTC).getPendingOrders(account).buy[0].id;
        const newOrderId = body["id"];
        expect(newOrderId).toBeTruthy();
        expect(typeof newOrderId).toEqual("string");

        expect(expected).toEqual(newOrderId);
        done();
    });
});