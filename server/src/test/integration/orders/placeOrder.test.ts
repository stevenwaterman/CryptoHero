import * as request from "request";
import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import Big from "big.js";
import {setup} from "../util/setup";
import {G} from "../util/global";
import Requirements from "../util/requirements";
import Order from "../../../app/trading/order";

setup();
const url = G.API + "orders/place";

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.GBP, Big(100));

    const options = {
        "json": true,
        "body": {
            "account": account.id,
            "instrument": Instrument.BTCGBP.name,
            "direction": TradeDirection.BUY.name,
            "units": Big(20).toString(),
            "unitPrice": Big(1).toString()
        }
    };

    request.post(url, options, (error, response, body) => {
        expect(error).toBeFalsy();
        console.log(body);
        expect(response.statusCode).toEqual(200);
        expect(account.getOrders()).toHaveLength(1);
        done();
    });
});

test("cannot self-trade", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, Big(100));
    account.adjustAssets(Asset.GBP, Big(100));
    G.BROKER.placeOrder(new Order(account, TradeDirection.BUY, Instrument.BTCGBP, Big(1), Big(1)));

    const options = {
        "json": true,
        "body": {
            "account": account.id,
            "instrument": Instrument.BTCGBP.name,
            "direction": TradeDirection.SELL.name,
            "units": Big(1).toString(),
            "unitPrice": Big(1).toString()
        }
    };

    request.post(url, options, (error, response) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(400);
        expect(account.getOrders()).toHaveLength(1);
        done();
    });
});

test("Not enough funds", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, Big(5));

    const options = {
        "json": true,
        "body": {
            "account": account.id,
            "instrument": Instrument.BTCGBP.name,
            "direction": TradeDirection.BUY.name,
            "units": Big(20).toString(),
            "unitPrice": Big(1).toString()
        }
    };

    request.post(url, options, (error, response) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(400);
        expect(account.getOrders()).toHaveLength(0);
        done();
    });
});

const testRunner = (name: string, params: any, expectedStatus: number) => {
    test(name, done => {
        const account = new Account();
        account.adjustAssets(Asset.BTC, Big(100));
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
                "unitPrice": params.price
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
    "instrument": Instrument.BTCGBP.name,
    "direction": TradeDirection.BUY.name,
    "units": Big(20).toString(),
    "price": Big(1).toString()
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