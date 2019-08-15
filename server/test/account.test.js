import {TradeDirection} from "../app/order";
import Account from "../app/account";

describe("construct", () => {
    test("constructor does not throw an exception", () => {
        expect(() => new Account()).not.toThrow();
    });

    test("constructor should return an Account", () => {
        expect(new Account()).toBeInstanceOf(Account);
    });

    test("id is set and non-zero", () => {
        expect(new Account().id).toBeTruthy();
    });
});

const account = new Account();

describe("Create buy", () => {
    test("Simple Create", () => {
        expect(account.createBuy(1, 1)).toMatchObject({
            "account": account,
            "direction": TradeDirection.BUY,
            "units": 1,
            "unitPrice": 1
        });
    });

    test("Invalid Units", () => {
        expect(() => {
            account.createBuy(0, 1)
        }).toThrow();
        expect(() => {
            account.createBuy(-1, 1)
        }).toThrow();
    });

    test("Price <= 0", () => {
        expect(() => {
            account.createBuy(1, 0)
        }).not.toThrow();
        expect(() => {
            account.createBuy(1, -1)
        }).not.toThrow();
    });
});

describe("Create sell", () => {
    test("Simple Create", () => {
        expect(account.createSell(1, 1)).toMatchObject({
            "account": account,
            "direction": TradeDirection.SELL,
            "units": 1,
            "unitPrice": 1
        });
    });

    test("Invalid Units", () => {
        expect(() => {
            account.createSell(0, 1)
        }).toThrow();
        expect(() => {
            account.createSell(-1, 1)
        }).toThrow();
    });

    test("Price <= 0", () => {
        expect(() => {
            account.createSell(1, 0)
        }).not.toThrow();
        expect(() => {
            account.createSell(1, -1)
        }).not.toThrow();
    });
});