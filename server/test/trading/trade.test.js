import Trade from "../../app/trading/trade";
import {Big} from "big.js";

describe("constructor", () => {
    test("constructor does not throw an exception", () => {
        expect(() => {
            new Trade(1, 2, new Big("100"), new Big("1.14"));
        }).not.toThrow();
    });

    test("constructor throws for 0 units", () => {
        expect(() => {
            new Trade(1, 2, new Big("0"), new Big("1.14"));
        }).toThrow();
    });

    test("constructor throws for negative units", () => {
        expect(() => {
            new Trade(1, 2, new Big("-100"), new Big("1.14"));
        }).toThrow();
    });

    test("constructor does not throw for negative price", () => {
        expect(() => {
            new Trade(1, 2, new Big("100"), new Big("-1.14"));
        }).not.toThrow();
    });

    test("id is set and non-zero", () => {
        expect(new Trade(1, 2, new Big("1"), new Big("1")).id).toBeTruthy();
    });
});
