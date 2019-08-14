import Trade from "../app/trade";

describe("constructor", () => {
    test("constructor does not throw an exception", () => {
        expect(() => {new Trade(1, 2, 100, 1.14)}).not.toThrow();
    });

    test("constructor throws for 0 units", () => {
        expect(() => {new Trade(1, 2, 0, 1.14)}).toThrow();
    });

    test("constructor throws for negative units", () => {
        expect(() => {new Trade(1, 2, -100, 1.14)}).toThrow();
    });

    test("constructor does not throw for negative price", () => {
        expect(() => {new Trade(1, 2, 100, -1.14)}).not.toThrow();
    });
});
