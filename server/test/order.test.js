import Order, {TradeDirection} from "../app/order";

describe("construct", () => {
    test("constructor does not throw an exception", () => {
        expect(() => new Order(1, TradeDirection.BUY, 100, 1.14)).not.toThrow();
    });

    test("constructor should return an Order", () => {
        expect(new Order(1, TradeDirection.BUY, 100, 1.14)).toBeInstanceOf(Order);
    });

    test("constructor should throw error if called with negative units", () => {
        expect(() => new Order(1, TradeDirection.BUY, -100, 1.14)).toThrow();
    });

    test("constructor should throw error if called with zero units", () => {
        expect(() => new Order(1, TradeDirection.BUY, 0, 1.14)).toThrow();
    });
});
