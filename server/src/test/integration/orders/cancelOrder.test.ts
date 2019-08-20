import * as request from "request";
import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import Order from "../../../app/trading/order";
import Big from "big.js";
import {G, setup} from "../setup/global";

setup();

function getUrl(order: Order): string {
    return `${G.API}orders/${order.id}/cancel`
}

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("100"));
    const order = new Order(account, TradeDirection.BUY, new Big("20"), new Big("1"));
    G.BROKER.placeOrder(Instrument.GBPBTC, order);

    const options = {
        "json": true,
        "body": {
            "order": order.id,
            "instrument": Instrument.GBPBTC.name
        }
    };

    request.post(getUrl(order), options, (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);

        expect(body).toEqual("Successful");

        const pending = G.BROKER.getIBroker(Instrument.GBPBTC).getPendingOrders(account).buy;
        expect(pending).toHaveLength(0);
        done();
    });
});