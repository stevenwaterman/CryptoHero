import SortedList from "../app/sortedList"

const numberComparator = (a, b) => b - a;

describe("Constructor", () => {
    const validComparator = numberComparator;
    const invalidComparator = 0;

    test("constructor should throw error when called without comparator", () => {
        expect(() => {
            new SortedList()
        }).toThrow();
    });

    test("constructor should throw error when comparator is not a function", () => {
        expect(() => {
            new SortedList(invalidComparator)
        }).toThrow();
    });

    test("constructor should return SortedList class when comparator is a function", () => {
        expect(new SortedList(validComparator)).toBeInstanceOf(SortedList);
    });

    test("constructor should not throw an exception when comparator is a function", () => {
        expect(() => {
            new SortedList(validComparator)
        }).not.toThrow();
    });
});

describe("indexOf", () => {
    let list;

    beforeEach(() => {
        list = new SortedList(numberComparator);
    });

    test("return -1 on an empty list", () => {
        expect(list.indexOf(5)).toEqual(-1);
    });

    test("return -1 on an element that is not contained", () => {
        list.push(1);
        expect(list.indexOf(5)).toEqual(-1);
    });

    test("work with one element in the list", () => {
        list.push(1);
        expect(list.indexOf(1)).toEqual(0);
    });

    test("work with multiple elements in the list (sorted insert)", () => {
        const vals = [1, 2, 3, 4, 5];
        list.push(...vals);
        for (let i = 0; i < vals.length; i++) {
            expect(list.indexOf(vals[i])).toEqual(i);
        }
    });

    test("work with multiple elements in the list (unsorted insert)", () => {
        const vals = [1, 2, 3, 4, 5];
        const shuffled = [2, 4, 1, 5, 3];
        list.push(...shuffled);
        for (let i = 0; i < vals.length; i++) {
            expect(list.indexOf(vals[i])).toEqual(i);
        }
    });
});