import * as request from "request";
import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import Order from "../../../app/trading/order";
import Big from "big.js";
import {setup} from "../util/setup";
import {G} from "../util/global";
import Requirements from "../util/requirements";

setup();

function getUrl(accountId: string): string {
    return `${G.API}orders/pending/account/${accountId}`;
}

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("100"));

    const order = new Order(account, TradeDirection.BUY, new Big("20"), new Big("1"));
    G.BROKER.placeOrder(Instrument.GBPBTC, order);

    const expected = {
        "GBPBTC": {
            "buy": [
                {
                    "id": order.id,
                    "account": order.account.id,
                    "direction": order.direction.name,
                    "timestamp": order.timestamp.getTime(),
                    "units": order.units.toString(),
                    "unit price": order.showUnitPrice.toString()
                }
            ],
            "sell": []
        },
        "GBPLTC": {
            "buy": [],
            "sell": []
        }
    };

    request.get(getUrl(account.id), (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);

        const json = JSON.parse(body);
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

        request.get(getUrl(params.account), (error, response) => {
            expect(error).toBeFalsy();
            expect(response.statusCode).toEqual(expectedStatus);
            done();
        });
    });
};

const defaultParams = {};

new Requirements(defaultParams, testRunner)
    .invalidWhen("account", "1", 404)
    .execute();