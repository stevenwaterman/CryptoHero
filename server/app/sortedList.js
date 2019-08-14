export default class SortedList {
    #comparator;
    #values = [];

    constructor(comparator) {
        if(!comparator){
            throw "SortedList constructor requires a comparator"
        }
        this.#comparator = comparator;
    };

    min = () => this.#values[0];
    isEmpty = () => Boolean(this.#values.length);
    includes = (data) => this.#binarySearch(data).found;

    /**
     * Performs a binary search for a specified element
     * @param data The value of the element that we search for
     * @returns {number} The index of the element, or -1 if it is not present
     */
    indexOf(data){
        const searchResult = this.#binarySearch(data);
        return searchResult.found ? searchResult.index : -1;
    }

    add(data){
        const idx = this.#getInsertIndex(data);
        this.#insert(data, idx);
    }

    delete(data){
        const searchResult = this.#binarySearch(data);
        if(searchResult.found){
            this.#delete(searchResult.index);
        }
    }

    #insert(data, idx){
        this.#values.splice(idx, 0, data);
    }

    /**
     * Does a binary search to find the index that some data should be inserted at
     * @param data The data to be inserted
     */
    #getInsertIndex = (data) => this.#binarySearch(data).index;

    #delete = (idx) => this.#values.splice(idx, 1);

    #binarySearch(data){
        if(this.isEmpty){
            return {
                "index": -1,
                "found": false
            }
        }

        let lowIdx = 0;
        let highIdx = this.#values.length - 1;

        while(lowIdx !== highIdx){
            const midIdx = Math.floor((highIdx + lowIdx) / 2);
            const midData = this.#values[midIdx];
            const comparison = this.#comparator.compare(midData, data);
            if(comparison < 0) {
                //We are too low
                lowIdx = midIdx + 1;
            } else if (comparison > 0) {
                // We are too high
                highIdx = midIdx - 1;
            } else {
                // Found it!
                return {
                    "index": midIdx,
                    "found": true
                };
            }
        }
        return {
            "index": lowIdx,
            "found": false
        };
    }
}
