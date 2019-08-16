export default class SortedList {
  #comparator;
  #values = [];

  /**
   * @param comparator A __pure__ function which accepts two variables and returns a number indicating the ordering.
   * A return value less than zero indicates that the first parameter comes before the second
   * A return value indicates that the two variables are equal and are identical as far as the list cares.
   * A return value greater than zero indicates that the first parameter comes after the second
   *
   * @throws if comparator is null or not a function
   */
  constructor(comparator) {
    if (comparator == null)
      throw "SortedList constructor requires a comparator";
    if (typeof comparator !== "function") throw "Comparator must be a function";
    this.#comparator = comparator;
  }

  min = () => this.#values[0];
  max = () => this.#values[this.#values.length - 1];
  isEmpty = () => this.#values.length === 0;
  includes = data => this.#binarySearch(data).found;
  push = (...data) => data.forEach(it => this.#pushOnce(it));
  delete = (...data) => data.forEach(it => this.#deleteOnce(it));
  underlying = () => this.#values.slice();

  /**
   * @param data The value of the element that we search for
   * @returns {number} The index of the element, or -1 if it is not present
   */
  indexOf(data) {
    const searchResult = this.#binarySearch(data);
    return searchResult.found ? searchResult.index : -1;
  }

  #deleteOnce(data) {
    const searchResult = this.#binarySearch(data);
    if (searchResult.found) {
      this.#delete(searchResult.index);
    }
  }

  #pushOnce(data) {
    const idx = this.#getInsertIndex(data);
    this.#insert(data, idx);
  }

  #insert(data, idx) {
    this.#values.splice(idx, 0, data);
  }

  /**
   * Does a binary search to find the index that some data should be inserted at
   * @param data The data to be inserted
   */
  #getInsertIndex = data => this.#binarySearch(data).index;

  #delete = idx => this.#values.splice(idx, 1);

  #binarySearch(data) {
    let lowIdx = 0;
    let highIdx = this.#values.length - 1;

    while (lowIdx <= highIdx) {
      const midIdx = Math.floor((highIdx + lowIdx) / 2);
      const midData = this.#values[midIdx];
      const comparison = this.#comparator(midData, data);
      if (comparison < 0) {
        // midData is before data -> we are too low
        lowIdx = midIdx + 1;
      } else if (comparison > 0) {
        // midDta is after data -> we are too high
        highIdx = midIdx - 1;
      } else {
        // Found it!
        return {
          index: midIdx,
          found: true
        };
      }
    }
    return {
      index: lowIdx,
      found: false
    };
  }
}
