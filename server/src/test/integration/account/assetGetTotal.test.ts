import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import * as request from "request";
import Big from "big.js";
import Order from "../../../app/trading/order";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import {setup} from "../util/setup";
import {G} from "../util/global";
import Requirements from "../util/requirements";

setup();


function getUrl(accountId: string, assetName: string): string {
    return `${G.API}account/${accountId}/assets/${assetName}/available`;
}

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("100"));

    const order = new Order(account, TradeDirection.BUY, new Big("20"), new Big("2"));
    G.BROKER.placeOrder(Instrument.GBPBTC, order);

    request.get(getUrl(account.id, Asset.BTC.name), (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const json = JSON.parse(body);

        const expected = {
            "amount": new Big("60").toString()
        };
        expect(json).toEqual(expected);
        done();
    });
});

const testRunner = (name: string, params: any, expectedStatus: number) => {
    test(name, done => {
        const account = new Account();
        if (params.account == null) {
            params.account = account.id;
        }

        request.get(getUrl(params.account, params.asset), (error, response) => {
            expect(error).toBeFalsy();
            expect(response.statusCode).toEqual(expectedStatus);
            done();
        })
    })
};

const defaultParams = {
    "asset": Asset.BTC.name,
};

new Requirements(defaultParams, testRunner)
    .invalidWhen("asset", "ABC", 404)
    .invalidWhen("account", "1", 404)
    .execute();
