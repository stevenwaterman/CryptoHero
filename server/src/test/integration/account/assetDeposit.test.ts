import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import * as request from "request";
import Big from "big.js";
import {setup} from "../util/setup";
import {G} from "../util/global";
import Requirements from "../util/requirements";

setup();

function getUrl(accountId: string, assetName: string): string {
    return `${G.API}account/${accountId}/assets/${assetName}/deposit`;
}

test("Happy Path", done => {
    const account = new Account();

    const options = {
        "json": true,
        "body": {
            "units": new Big("100").toString()
        }
    };

    request.post(getUrl(account.id, Asset.BTC.name), options, (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const expected = "Successful";
        expect(body).toEqual(expected);

        expect(account.getAvailableAssets(Asset.BTC)).toEqual(new Big("100"));
        done();
    });
});

const testRunner = (name: string, params: any, expectedStatus: number) => {
    test(name, done => {
        const options = {
            "json": true,
            "body": {
                "units": params.units
            }
        };

        let account = new Account();
        if (params.account == null) {
            params.account = account.id;
        }

        request.post(getUrl(params.account, params.asset), options, (error, response) => {
            expect(error).toBeFalsy();
            expect(response.statusCode).toEqual(expectedStatus);
            done();
        });
    })
};

const defaultParams = {
    "asset": Asset.BTC.name,
    "units": new Big("100").toString()
};

new Requirements(defaultParams, testRunner)
    .invalidWhen("asset", "ABC", 404)
    .invalidWhen("units", "-1", 400)
    .invalidWhen("units", "0", 400)
    .invalidWhen("units", "abc", 400)
    .invalidWhen("account", "1", 404)
    .execute();
