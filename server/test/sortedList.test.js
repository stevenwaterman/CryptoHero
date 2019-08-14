import SortedList from "../app/sortedList"

describe("Creation", () => {
    // noinspection JSUnusedLocalSymbols
    const exampleComparator = (a, b) => 0;
    const invalidComparator = 0;

    test("constructor should throw error when called without comparator", () => {
        expect(new SortedList()).toThrow();
    });

    test("constructor should throw error when comparator is not a function", () => {
        expect(new SortedList(invalidComparator)).toThrow();
    });

    test("constructor should return SortedList class when comparator is a function", () => {
        expect(new SortedList(exampleComparator));
    });
});