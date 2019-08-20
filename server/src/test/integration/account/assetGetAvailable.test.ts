import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import * as request from "request";
import Big from "big.js";
import Order from "../../../app/trading/order";
import TradeDirection from "../../../app/trading/tradeDirection";
import Instrument from "../../../app/trading/instrument";
import {G, setup} from "../setup/global";

setup();

function getUrl(account: Account, asset: Asset): string {
    return `${G.API}account/${account.id}/assets/${asset.name}/available`;
}

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("100"));

    const order = new Order(account, TradeDirection.BUY, new Big("20"), new Big("2"));
    G.BROKER.placeOrder(Instrument.GBPBTC, order);

    request.get(getUrl(account, Asset.BTC), (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const json = JSON.parse(body);

        const expected = {
            "amount": new Big("60").toString()
        };
        expect(json).toEqual(expected);
        done();
    });
});
