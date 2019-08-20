import * as request from "request";
import {REGISTRY} from "../../../app/registry";
import {G, setup} from "../setup/global";

setup();
const url = G.API + "account/create";

test("Happy Path", done => {
    request.post(url, (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const json = JSON.parse(body);

        const newAccountId = json["id"];
        expect(newAccountId).toBeTruthy();
        expect(typeof newAccountId).toEqual("string");

        const retrieved = REGISTRY.getAccount(newAccountId);
        expect(retrieved).toBeTruthy();
        done();
    });
});