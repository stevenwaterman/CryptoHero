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