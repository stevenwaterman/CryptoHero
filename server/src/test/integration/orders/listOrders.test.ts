import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import * as request from "request";
import Big from "big.js";
import Order from "../../../app/trading/order";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import Trade from "../../../app/trading/trade";
import {Map} from "immutable"
import {setup} from "../util/setup";
import {G} from "../util/global";
import Requirements from "../util/requirements";

setup();

function getUrl(accountId: string): string {
    return `${G.API}orders/list/account/${accountId}`;
}

test("Happy Path", done => {
    const acc1 = new Account();
    const acc2 = new Account();
    acc1.adjustAssets(Asset.BTC, new Big("100"));
    acc2.adjustAssets(Asset.GBP, new Big("100"));

    const buy = new Order(acc1, TradeDirection.BUY, Instrument.GBPBTC,new Big("50"), new Big("1.5"));
    const sell = new Order(acc2, TradeDirection.SELL, Instrument.GBPBTC,new Big("50"), new Big("1.5"));
    G.BROKER.placeOrder(buy);
    G.BROKER.placeOrder(sell);

    //TODO check that it actually works


    request.get(getUrl(acc1.id), (error, response, body) => {
        expect(error).toBeFalsy();
        console.log(response.body);
        expect(response.statusCode).toEqual(200);
        done();
    });
});

const testRunner = (name: string, params: any, expectedStatus: number) => {
    test(name, done => {
        const account = new Account();
        if (params.account == null) {
            params.account = account.id;
        }

        request.get(getUrl(params.account), (error, response) => {
            expect(error).toBeFalsy();
            expect(response.statusCode).toEqual(expectedStatus);
            done();
        });
    })
};

const defaultParams = {};

new Requirements(defaultParams, testRunner)
    .invalidWhen("account", "1", 404)
    .execute();
