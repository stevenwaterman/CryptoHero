import {API, broker, setup} from "../util/setup";
import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import * as request from "request";
import Big from "big.js";
import Order from "../../../app/trading/order";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";

setup();

const endpointPrefix = API + "account/";
const endpointPostfix = "/assets/available";

function getUrl(account: Account): string {
    return endpointPrefix + account.id + endpointPostfix;
}

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("100"));
    const order = new Order(account, TradeDirection.BUY, new Big("20"), new Big("2"));
    broker.placeOrder(Instrument.GBPBTC, order);

    request.get(getUrl(account), (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const json = JSON.parse(body);
        expect(json).toMatchObject({
            "BTC": new Big("60").toString(),
            "GBP": new Big("0").toString(),
            "LTC": new Big("0").toString()
        });
        done();
    });
});
