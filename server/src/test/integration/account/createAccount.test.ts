import {API, setup} from "../util/setup";
import * as request from "request";

setup();
const endpoint = API + "account/create";

test("Can create an account", done => {
    request.post(endpoint, (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);
        const json = JSON.parse(body);

        const account = json["account"];
        expect(account).toBeTruthy();
        expect(typeof account).toEqual("string");
        done();
    });
});