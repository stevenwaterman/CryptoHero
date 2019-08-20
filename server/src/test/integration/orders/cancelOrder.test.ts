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

function getUrl(orderId: string): string {
    return `${G.API}orders/${orderId}/cancel`
}

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("100"));
    const order = new Order(account, TradeDirection.BUY, new Big("20"), new Big("1"));
    G.BROKER.placeOrder(Instrument.GBPBTC, order);

    const options = {
        "json": true,
        "body": {
            "instrument": Instrument.GBPBTC.name
        }
    };

    request.post(getUrl(order.id), options, (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);

        expect(body).toEqual("Successful");

        const pending = G.BROKER.getIBroker(Instrument.GBPBTC).getPendingOrders(account).buy;
        expect(pending).toHaveLength(0);
        done();
    });
});

const testRunner = (name: string, params: any, expectedStatus: number) => {
    test(name, done => {
        const account = new Account();
        account.adjustAssets(Asset.BTC, new Big("100"));

        const order = new Order(account, TradeDirection.BUY, new Big("20"), new Big("1"));
        G.BROKER.placeOrder(Instrument.GBPBTC, order);
        if (params.order == null) {
            params.order = order.id;
        }

        const options = {
            "json": true,
            "body": {
                "instrument": params.instrument
            }
        };

        request.post(getUrl(params.order), options, (error, response) => {
            expect(error).toBeFalsy();
            expect(response.statusCode).toEqual(expectedStatus);
            done();
        });
    })
};

const defaultParams = {
    "instrument": Instrument.GBPBTC.name,
};

new Requirements(defaultParams, testRunner)
    .invalidWhen("order", "1", 404)
    .invalidWhen("instrument", "abc", 404)
    .execute();