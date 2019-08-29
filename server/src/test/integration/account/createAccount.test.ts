import * as request from "request";
import {REGISTRY} from "../../../app/registry";
import {setup} from "../util/setup";
import {G} from "../util/global";

setup();
const url = G.API + "account/create";

test("Happy Path", done => {
    request.post(url, (error, response, body) => {
        expect(error).toBeFalsy();
        console.log(response.body);
        expect(response.statusCode).toEqual(200);
        const newAccountId = JSON.parse(body);
        expect(newAccountId).toBeTruthy();
        expect(typeof newAccountId).toEqual("string");

        const retrieved = REGISTRY.getAccount(newAccountId);
        expect(retrieved).toBeTruthy();
        done();
    });
});