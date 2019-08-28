import Asset from "../../../app/trading/asset";
import Instrument from "../../../app/trading/instrument";

describe("name", () => {
    test("simple test", () => {
        expect(Instrument.GBPBTC.name).toEqual("GBPBTC");
    });
});
