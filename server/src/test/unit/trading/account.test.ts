import Account from "../../../app/trading/account";
import Asset from "../../../app/trading/asset";
import {Big} from "big.js";

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
        expect(new Account().getAvailableAssets(Asset.GBP)).toEqual(new Big("0"));
    });
});

let account: Account;
beforeEach(() => {
    account = new Account();
});

describe("Editing Assets", () => {
    test("Add positive amount", () => {
        account.adjustAssets(Asset.GBP, new Big("1"));
        expect(account.getAvailableAssets(Asset.GBP)).toEqual(new Big("1"));
    });

    test("Add decimal amount", () => {
        account.adjustAssets(Asset.GBP, new Big("1.5"));
        expect(account.getAvailableAssets(Asset.GBP)).toEqual(new Big("1.5"));
    });

    test("Add nothing", () => {
        account.adjustAssets(Asset.GBP, new Big("0"));
        expect(account.getAvailableAssets(Asset.GBP)).toEqual(new Big("0"));
    });

    test("Subtract amount", () => {
        account.adjustAssets(Asset.GBP, new Big("-1"));
        expect(account.getAvailableAssets(Asset.GBP)).toEqual(new Big("-1"));
    });

    test("Works for multiple assets", () => {
        account.adjustAssets(Asset.BTC, new Big("1"));
        expect(account.getAvailableAssets(Asset.GBP)).toEqual(new Big("0"));
        expect(account.getAvailableAssets(Asset.BTC)).toEqual(new Big("1"));
    });

    test("Can be called multiple times", () => {
        account.adjustAssets(Asset.GBP, new Big("1"));
        account.adjustAssets(Asset.GBP, new Big("2"));
        expect(account.getAvailableAssets(Asset.GBP)).toEqual(new Big("3"));
    });
});
