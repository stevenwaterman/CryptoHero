import {TradeDirection} from "../../app/trading/order";
import Account from "../../app/trading/account";
import {ASSETS} from "../../app/trading/asset";

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

    test("Assets are zero by default", () => {
        expect(new Account().getAssets(ASSETS.GBP)).toEqual(0);
    });
});

let account;
beforeEach(() => {
    account = new Account();
});

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

describe("Editing Assets", () => {
    test("Add positive amount", () => {
        account.addAssets(ASSETS.GBP, 1);
        expect(account.getAssets(ASSETS.GBP)).toEqual(1);
    });

    test("Add decimal amount", () => {
        account.addAssets(ASSETS.GBP, 1.5);
        expect(account.getAssets(ASSETS.GBP)).toBeCloseTo(1.5, 5);
    });

    test("Add nothing", () => {
        account.addAssets(ASSETS.GBP, 0);
        expect(account.getAssets(ASSETS.GBP)).toEqual(0);
    });

    test("Subtract amount", () => {
        account.addAssets(ASSETS.GBP, -1);
        expect(account.getAssets(ASSETS.GBP)).toEqual(-1);
    });

    test("Works for multiple assets", () => {
        account.addAssets(ASSETS.BTC, 1);
        expect(account.getAssets(ASSETS.GBP)).toEqual(0);
        expect(account.getAssets(ASSETS.BTC)).toEqual(1);
    });

    test("Can be called multiple times", () => {
        account.addAssets(ASSETS.GBP, 1);
        account.addAssets(ASSETS.GBP, 2);
        expect(account.getAssets(ASSETS.GBP)).toEqual(3);
    });
});