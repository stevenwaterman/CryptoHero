import {Asset} from "../../app/trading/asset";
import {Instrument} from "../../app/trading/instrument";

const a1 = new Asset("AAA");
const a2 = new Asset("BBB");

describe("construct", () => {
    test("constructor does not throw an exception", () => {
        expect(() => new Instrument(a1, a2)).not.toThrow();
    });

    test("constructor should return an instrument", () => {
        expect(new Instrument(a1, a2)).toBeInstanceOf(Instrument);
    });
});

describe("name", () => {
    test("simple test", () => {
        expect(new Instrument(a1, a2).name).toEqual(a1.name + a2.name);
        expect(new Instrument(a2, a1).name).toEqual(a2.name + a1.name);
    });
});

describe("buyer/seller gain/spend", () => {
    test("buyer gains", () => {
        expect(new Instrument(a1, a2).buyerGains).toEqual(a1);
        expect(new Instrument(a2, a1).buyerGains).toEqual(a2);
    });

    test("buyer spends", () => {
        expect(new Instrument(a1, a2).buyerSpends).toEqual(a2);
        expect(new Instrument(a2, a1).buyerSpends).toEqual(a1);
    });

    test("seller gains", () => {
        expect(new Instrument(a1, a2).sellerGains).toEqual(a2);
        expect(new Instrument(a2, a1).sellerGains).toEqual(a1);
    });

    test("seller spends", () => {
        expect(new Instrument(a1, a2).sellerSpends).toEqual(a1);
        expect(new Instrument(a2, a1).sellerSpends).toEqual(a2);
    });
});
