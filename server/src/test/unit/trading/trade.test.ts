import Trade from "../../../app/trading/trade";
import {Big} from "big.js";
import Account from "../../../app/trading/account";

describe("constructor", () => {
    let acc1: Account;
    let acc2: Account;

    beforeEach(() => {
        acc1 = new Account();
        acc2 = new Account();
    });

    test("constructor throws for 0 units", () => {
        expect(() => {
            new Trade(acc1, acc2, new Big("0"), new Big("1.14"));
        }).toThrow();
    });

    test("constructor throws for negative units", () => {
        expect(() => {
            new Trade(acc1, acc2, new Big("-100"), new Big("1.14"));
        }).toThrow();
    });

    test("constructor does not throw for negative price", () => {
        expect(() => {
            new Trade(acc1, acc2, new Big("100"), new Big("-1.14"));
        }).not.toThrow();
    });

    test("id is set and non-zero", () => {
        expect(new Trade(acc1, acc2, new Big("1"), new Big("1")).id).toBeTruthy();
    });
});
