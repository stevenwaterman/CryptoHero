export default class SortedList<T> {
    private readonly comparator: (a: T, b: T) => number;
    private readonly values: Array<T> = [];

    /**
     * @param comparator A __pure__ function which accepts two variables and returns a number indicating the ordering.
     * A return value less than zero indicates that the first parameter comes before the second
     * A return value indicates that the two variables are equal and are identical as far as the list cares.
     * A return value greater than zero indicates that the first parameter comes after the second
     *
     * @throws if comparator is null or not a function
     */
    constructor(comparator: (a: T, b: T) => number) {
        if (comparator == null) {
            throw "SortedList constructor requires a comparator";
        }

        this.comparator = comparator;
    }

    min(): T | undefined {
        return this.values[0];
    }

    max(): T | undefined {
        return this.values[this.values.length - 1];
    }

    isEmpty(): boolean {
        return this.values.length === 0;
    }

    includes(elem: T) {
        return this.binarySearch(elem).found;
    }

    push(...data: Array<T>) {
        data.forEach(it => this.pushOnce(it));
    }

    delete(...data: Array<T>) {
        data.forEach(it => this.deleteOnce(it));
    }

    underlying() {
        return this.values.slice();
    }

    /**
     * @param elem The value of the element that we search for
     * @returns {number} The index of the element, or -1 if it is not present
     */
    indexOf(elem: T) {
        const searchResult = this.binarySearch(elem);
        return searchResult.found ? searchResult.index : -1;
    }

    binarySearch(elem: T) {
        let lowIdx = 0;
        let highIdx = this.values.length - 1;

        while (lowIdx <= highIdx) {
            const midIdx = Math.floor((highIdx + lowIdx) / 2);
            const midData = this.values[midIdx];
            const comparison = this.comparator(midData, elem);
            if (comparison < 0) {
                // midData is before data -> we are too low
                lowIdx = midIdx + 1;
            } else if (comparison > 0) {
                // midDta is after data -> we are too high
                highIdx = midIdx - 1;
            } else {
                // Found it!
                return new BinarySearchResult(midIdx, true);
            }
        }
        return new BinarySearchResult(lowIdx, false);
    }

    private deleteOnce(elem: T) {
        const searchResult = this.binarySearch(elem);
        if (searchResult.found) {
            this.deleteAt(searchResult.index);
        }
    }

    private pushOnce(elem: T) {
        const idx = this.getInsertIndex(elem);
        this.insert(elem, idx);
    }

    private insert(elem: T, idx: number) {
        this.values.splice(idx, 0, elem);
    }

    /**
     * Does a binary search to find the index that some data should be inserted at
     * @param elem The data to be inserted
     */
    private getInsertIndex(elem: T) {
        return this.binarySearch(elem).index;
    }

    private deleteAt(idx: number) {
        this.values.splice(idx, 1);
    }
}

class BinarySearchResult {
    readonly index: number;
    readonly found: boolean;

    constructor(index: number, found: boolean) {
        this.index = index;
        this.found = found;
    }
}
