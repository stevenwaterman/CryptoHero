import * as request from "request";
import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import Order from "../../../app/trading/order";
import {G, setup} from "../setup/global";
import Big from "big.js";

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
        "unit price": order.unitPrice.toString()
    };

    request.get(getUrl(order), (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);

        const json = JSON.parse(body);
        expect(json).toEqual(expected);
        done();
    });
});