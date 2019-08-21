import * as request from "request";
import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import Big from "big.js";
import {setup} from "../util/setup";
import {G} from "../util/global";
import Requirements from "../util/requirements";

setup();
const url = G.API + "orders/place";

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

    request.post(url, options, (error, response, body) => {
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
//TODO test against self-trading
test("Not enough funds", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("5"));

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

    request.post(url, options, (error, response) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(400);
        expect(G.BROKER.getIBroker(Instrument.GBPBTC).getPendingOrders(account).buy).toHaveLength(0);
        done();
    });
});

const testRunner = (name: string, params: any, expectedStatus: number) => {
    test(name, done => {
        const account = new Account();
        account.adjustAssets(Asset.BTC, new Big("100"));
        if (params.account == null) {
            params.account = account.id;
        }

        const options = {
            "json": true,
            "body": {
                "account": params.account,
                "instrument": params.instrument,
                "direction": params.direction,
                "units": params.units,
                "unit price": params.price
            }
        };

        request.post(url, options, (error, response) => {
            expect(error).toBeFalsy();
            expect(response.statusCode).toEqual(expectedStatus);
            done();
        })
    })
};

const defaultParams = {
    "instrument": Instrument.GBPBTC.name,
    "direction": TradeDirection.BUY.name,
    "units": new Big("20").toString(),
    "price": new Big("1").toString()
};

new Requirements(defaultParams, testRunner)
    .invalidWhen("account", "1", 404)
    .invalidWhen("instrument", "abc", 404)
    .invalidWhen("direction", "NONEXISTENT", 404)
    .invalidWhen("units", "-1", 400)
    .invalidWhen("units", "0", 400)
    .invalidWhen("units", "a", 400)
    .invalidWhen("price", "a", 400)
    .execute();