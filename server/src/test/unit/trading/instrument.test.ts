import Asset from "../../../app/trading/asset";
import Instrument from "../../../app/trading/instrument";

describe("name", () => {
    test("simple test", () => {
        expect(Instrument.GBPBTC.name).toEqual("GBPBTC");
    });
});

describe("buyer/seller gain/spend", () => {
    test("buyer gains", () => {
        expect(Instrument.GBPBTC.buyerGains).toEqual(Asset.GBP);
    });

    test("buyer spends", () => {
        expect(Instrument.GBPBTC.buyerSpends).toEqual(Asset.BTC);
    });

    test("seller gains", () => {
        expect(Instrument.GBPBTC.sellerGains).toEqual(Asset.BTC);
    });

    test("seller spends", () => {
        expect(Instrument.GBPBTC.sellerSpends).toEqual(Asset.GBP);
    });
});
