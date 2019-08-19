import SortedList from "../../../app/brokers/sortedList";

const numberComparator = (a: number, b: number) => a - b;

let list: SortedList<number>;
beforeEach(() => {
    list = new SortedList(numberComparator);
});

describe("indexOf", () => {
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
        const values = [1, 2, 3, 4, 5];
        list.push(...values);
        for (let i = 0; i < values.length; i++) {
            expect(list.indexOf(values[i])).toEqual(i);
        }
    });

    test("work with multiple elements in the list (unsorted insert)", () => {
        const values = [1, 2, 3, 4, 5];
        const shuffled = [2, 4, 1, 5, 3];
        list.push(...shuffled);
        for (let i = 0; i < values.length; i++) {
            expect(list.indexOf(values[i])).toEqual(i);
        }
    });

    test("work for non-integers", () => {
        const list: SortedList<string> = new SortedList((a: string, b: string) => a.localeCompare(b));
        const values = ["ab", "andy", "internet", "steve"];
        const shuffled = ["internet", "andy", "steve", "ab"];
        list.push(...shuffled);
        for (let i = 0; i < values.length; i++) {
            expect(list.indexOf(values[i])).toEqual(i);
        }
    });

    test("works with duplicate values", () => {
        list.push(1, 2, 2, 2, 2, 2, 3, 4, 5, 6);
        const idx = list.indexOf(2);
        expect(idx).toBeGreaterThanOrEqual(1);
        expect(idx).toBeLessThanOrEqual(5);
    });
});

describe("delete", () => {
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
        list.push(1, 2, 3, 4, 5);
        list.delete(3);
        expect(list.indexOf(3)).toEqual(-1);
    });

    test("deleting does not affect the other elements", () => {
        list.push(1, 2, 3, 4, 5);
        list.delete(3);
        expect(list.isEmpty()).toBeFalsy();
        expect(list.indexOf(1)).toEqual(0);
        expect(list.indexOf(2)).toEqual(1);
        expect(list.indexOf(4)).toEqual(2);
        expect(list.indexOf(5)).toEqual(3);
    });

    test("an element that has been deleted can be re-added", () => {
        list.push(1, 2, 3, 4, 5);
        list.delete(3);
        list.push(3);
        expect(list.indexOf(3)).toEqual(2);
    });

    test("Does not delete more than 1 element", () => {
        list.push(1, 1);
        list.delete(1);
        expect(list.isEmpty()).toBeFalsy();
    });

    test("Works with multiple elements to delete", () => {
        list.push(1, 2, 3, 4, 5);
        list.delete(1, 3, 5);
        expect(list.includes(1)).toBeFalsy();
        expect(list.includes(2)).toBeTruthy();
        expect(list.includes(3)).toBeFalsy();
        expect(list.includes(4)).toBeTruthy();
        expect(list.includes(5)).toBeFalsy();
    });
});

describe("isEmpty", () => {
    test("List is empty at first", () => {
        expect(list.isEmpty()).toBeTruthy();
    });

    test("List is not empty after adding", () => {
        list.push(1);
        expect(list.isEmpty()).toBeFalsy();
    });

    test("List is empty after adding and deleting", () => {
        list.push(1);
        list.delete(1);
        expect(list.isEmpty()).toBeTruthy();
    });
});

describe("includes", () => {
    test("Empty list does not include a value", () => {
        expect(list.includes(1)).toBeFalsy();
    });

    test("List of 1 element includes that element", () => {
        list.push(1);
        expect(list.includes(1)).toBeTruthy();
    });

    test("List of 1 element does not include another element", () => {
        list.push(1);
        expect(list.includes(2)).toBeFalsy();
    });

    test("Works with duplicates", () => {
        list.push(1, 1);
        expect(list.includes(1)).toBeTruthy();
        expect(list.includes(2)).toBeFalsy();
    });

    test("List of multiple elements includes all of them (sorted input)", () => {
        const vals = [1, 2, 3, 4, 5];
        list.push(...vals);
        vals.forEach(it => {
            expect(list.includes(it)).toBeTruthy();
        });
    });

    test("List of multiple elements includes all of them (unsorted input)", () => {
        const vals = [3, 5, 2, 4, 1];
        list.push(...vals);
        vals.forEach(it => {
            expect(list.includes(it)).toBeTruthy();
        });
    });

    test("List of multiple elements does not include other elements", () => {
        const vals = [1, 2, 3, 4, 5];
        list.push(...vals);
        expect(list.includes(0)).toBeFalsy();
    });

    test("Uses comparator for includes", () => {
        // noinspection JSUnusedLocalSymbols
        const list = new SortedList((a, b) => 0);
        list.push(1);
        expect(list.includes("cats")).toBeTruthy();
    });
});

describe("min", () => {
    test("undefined when list is empty", () => {
        expect(list.min()).toBeUndefined();
    });

    test("defined when list is nonempty", () => {
        list.push(1);
        expect(list.min()).toBeDefined();
    });

    test("returns only element of list", () => {
        list.push(1);
        expect(list.min()).toEqual(1);
    });

    test("returns minimum (sorted input)", () => {
        list.push(1, 2, 3, 4, 5);
        expect(list.min()).toEqual(1);
    });

    test("returns minimum (unsorted input)", () => {
        list.push(3, 5, 1, 4, 2);
        expect(list.min()).toEqual(1);
    });

    test("updates when deleting elements", () => {
        const vals = [1, 2, 3, 4, 5];
        list.push(...vals);
        vals.forEach(it => {
            expect(list.min()).toEqual(it);
            list.delete(it);
        });
        expect(list.min()).toBeUndefined();
    });

    test("updates when adding elements", () => {
        const vals = [5, 4, 3, 2, 1];
        vals.forEach(it => {
            list.push(it);
            expect(list.min()).toEqual(it);
        });
    });
});

describe("max", () => {
    test("undefined when list is empty", () => {
        expect(list.max()).toBeUndefined();
    });

    test("defined when list is nonempty", () => {
        list.push(1);
        expect(list.max()).toBeDefined();
    });

    test("returns only element of list", () => {
        list.push(1);
        expect(list.max()).toEqual(1);
    });

    test("returns maximum (sorted input)", () => {
        list.push(1, 2, 3, 4, 5);
        expect(list.max()).toEqual(5);
    });

    test("returns maximum (unsorted input)", () => {
        list.push(3, 5, 1, 4, 2);
        expect(list.max()).toEqual(5);
    });

    test("updates when deleting elements", () => {
        const values = [5, 4, 3, 2, 1];
        list.push(...values);
        values.forEach(it => {
            expect(list.max()).toEqual(it);
            list.delete(it);
        });
        expect(list.max()).toBeUndefined();
    });

    test("updates when adding elements", () => {
        const values = [1, 2, 3, 4, 5];
        values.forEach(it => {
            list.push(it);
            expect(list.max()).toEqual(it);
        });
    });
});
