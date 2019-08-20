import * as request from "request";
import Instrument from "../../../app/trading/instrument";
import {setup} from "../util/setup";
import {G} from "../util/global";

setup();

const url = `${G.API}instruments/list`;

test("Happy Path", done => {
    request.get(url, (error, response, body) => {
        expect(error).toBeFalsy();
        expect(response.statusCode).toEqual(200);

        const json = JSON.parse(body);
        const expected = Instrument.NAMES.toArray();
        expect(json).toEqual(expected);
        done();
    });
});
