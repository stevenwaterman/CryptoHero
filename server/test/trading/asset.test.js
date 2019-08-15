import {Asset} from "../../app/trading/asset";

describe("construct", () => {
    test("constructor does not throw an exception", () => {
        expect(() => new Asset("Test")).not.toThrow();
    });

    test("constructor should return an asset", () => {
        expect(new Asset("Test")).toBeInstanceOf(Asset);
    });

    test("name should be converted to uppercase", () => {
        expect(new Asset("Test")).toMatchObject({"name": "TEST"});
    });
});
