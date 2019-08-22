import * as request from "request";
import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import Order from "../../../app/trading/order";
import {setup} from "../util/setup";
import Big from "big.js";
import {G} from "../util/global";
import Requirements from "../util/requirements";

setup();

function getUrl(order: Order): string {
    return `${G.API}orders/${order.id}/view`
}

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("100"));
    const order = new Order(account, TradeDirection.BUY, new Big("20"), new Big("1"));
    G.BROKER.placeOrder(Instrument.GBPBTC, order);

    const expected = {
        "id": order.id,
        "account": order.account.id,
        "direction": order.direction.name,
        "timestamp": order.timestamp.getTime(),
        "units": order.units.toString(),
        "unit price": order.showUnitPrice.toString()
    };

    request.get(getUrl(order), (error, response, body) => {
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
        account.adjustAssets(Asset.BTC, new Big("100"));

        const order = new Order(account, TradeDirection.BUY, new Big("20"), new Big("1"));
        G.BROKER.placeOrder(Instrument.GBPBTC, order);
        if (params.order == null) {
            params.order = order.id;
        }

        request.get(getUrl(params.order), (error, response) => {
            expect(error).toBeFalsy();
            expect(response.statusCode).toEqual(expectedStatus);
            done();
        });
    })
};

const defaultParams = {};

new Requirements(defaultParams, testRunner)
    .invalidWhen("order", "1", 404)
    .execute();