import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import * as request from "request";
import Big from "big.js";
import {G, setup} from "../setup/global";

setup();

function getUrl(account: Account, asset: Asset): string {
    return `${G.API}account/${account.id}/assets/${asset.name}/withdraw`;
}

//TODO when not enough money

test("Happy Path", done => {
    const account = new Account();
    account.adjustAssets(Asset.BTC, new Big("120"));

    const options = {
        "json": true,
        "body": {
            "asset": Asset.BTC.name,
            "units": new Big("100").toString()
        }
    };

    request.post(getUrl(account, Asset.BTC), options, (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const expected = "Successful";
        expect(body).toEqual(expected);

        expect(account.getAvailableAssets(Asset.BTC)).toEqual(new Big("20"));
        done();
    });
});
