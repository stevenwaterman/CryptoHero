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

function getUrl(instrumentName: string): string {
    return `${G.API}prices/${instrumentName}/market`;
}

test("Happy Path", done => {
    const acc1 = new Account();
    const acc2 = new Account();

    acc1.adjustAssets(Asset.GBP, new Big("100"));
    acc1.adjustAssets(Asset.BTC, new Big("100"));
    acc2.adjustAssets(Asset.GBP, new Big("100"));
    acc2.adjustAssets(Asset.BTC, new Big("100"));

    const buy1 = new Order(acc1, TradeDirection.BUY, Instrument.BTCGBP, new Big("50"), new Big("1.5"));
    const sell1 = new Order(acc2, TradeDirection.SELL, Instrument.BTCGBP, new Big("50"), new Big("1.5"));

    G.BROKER.placeOrder(buy1);
    G.BROKER.placeOrder(sell1);

    const expected = new Big("1.5").toString();

    request.get(getUrl(Instrument.BTCGBP.name), (error, response, body) => {
        expect(error).toBeFalsy();
        console.log(response.body);
        expect(response.statusCode).toEqual(200);
        const json = JSON.parse(body);
        expect(json).toEqual(expected);
        done();
    });
});

const testRunner = (name: string, params: any, expectedStatus: number) => {
    test(name, done => {
        request.get(getUrl(params.instrument), (error, response) => {
            expect(error).toBeFalsy();
            expect(response.statusCode).toEqual(expectedStatus);
            done();
        });
    })
};

const defaultParams = {
    "instrument": Instrument.BTCGBP.name
};

new Requirements(defaultParams, testRunner)
    .invalidWhen("instrument", "abc", 404)
    .execute();
