import {Asset} from "../../app/trading/asset";
import {Instrument} from "../../app/trading/instrument";

const asset1 = new Asset("AAA");
const asset2 = new Asset("BBB");

describe("construct", () => {

    test("constructor does not throw an exception", () => {
        expect(() => new Instrument(asset1, asset2)).not.toThrow();
    });

    test("constructor should return an instrument", () => {
        expect(new Instrument(asset1, asset2)).toBeInstanceOf(Instrument);
    });
});

describe("name", () => {
    test("simple test", () => {
        expect(new Instrument(asset1, asset2).name).toEqual(asset1.name + asset2.name);
        expect(new Instrument(asset2, asset1).name).toEqual(asset2.name + asset1.name);
    });
});
