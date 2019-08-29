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
import {OrderState} from "../../../app/trading/orderState";

setup();

function getUrl(order: Order): string {
    return `${G.API}orders/${order.id}/view`
}

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("100"));
    const order = new Order(account, TradeDirection.BUY, Instrument.BTCGBP, new Big("20"), new Big("1"));
    G.BROKER.placeOrder(order);

    const expected = {
        "id": order.id,
        "average price": null,
        "instrument": Instrument.BTCGBP.name,
        "remaining units": new Big("20").toString(),
        "state": OrderState.PENDING.name,
        "direction": order.direction.name,
        "time": order.timestamp.getTime(),
        "units": order.originalUnits.toString(),
        "unit price": order.unitPrice.toString()
    };

    request.get(getUrl(order), (error, response, body) => {
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
        const account = new Account();
        account.adjustAssets(Asset.BTC, new Big("100"));

        const order = new Order(account, TradeDirection.BUY, Instrument.BTCGBP, new Big("20"), new Big("1"));
        G.BROKER.placeOrder(order);
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