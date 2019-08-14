import SortedList from "../app/sortedList"

const numberComparator = (a, b) => a - b;

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

    test("work for non-integers", () => {
        const list = new SortedList((a,b) => a.localeCompare(b));
        const vals = ["ab", "andy", "internet", "steve"];
        const shuffled = ["internet", "andy", "steve", "ab"];
        list.push(...shuffled);
        for (let i = 0; i < vals.length; i++) {
            expect(list.indexOf(vals[i])).toEqual(i);
        }
    })
});

describe("delete", () => {
    let list;
    beforeEach(() => {
        list = new SortedList(numberComparator);
    });

    test("deleting from an empty list does nothing", () => {
        expect(() => {
            list.delete(0);
        }).not.toThrow();
    });

    test("deleting an element that does not exist does nothing", () => {
        list.push(1);
        expect(() => {
            list.delete(0);
        }).not.toThrow();
        expect(list.isEmpty()).toBeFalsy();
    });

    test("deleting from a list of length 1 works", () => {
        list.push(1);
        list.delete(1);
        expect(list.isEmpty()).toBeTruthy();
        expect(list.indexOf(1)).toEqual(-1);
    });

    test("deleting from a longer list works (added in order)", () => {
        list.push(1,2,3,4,5);
        list.delete(3);
        expect(list.indexOf(3)).toEqual(-1);
    });

    test("deleting does not affect the other elements", () => {
        list.push(1,2,3,4,5);
        list.delete(3);
        expect(list.isEmpty()).toBeFalsy();
        expect(list.indexOf(1)).toEqual(0);
        expect(list.indexOf(2)).toEqual(1);
        expect(list.indexOf(4)).toEqual(2);
        expect(list.indexOf(5)).toEqual(3);
    });

    test("an element that has been deleted can be re-added", () => {
        list.push(1,2,3,4,5);
        list.delete(3);
        list.push(3);
        expect(list.indexOf(3)).toEqual(2)
    })
});