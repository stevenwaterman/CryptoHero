import {Big} from "big.js";

export default class PricePoint{
    readonly time: number;
    readonly price: Big;

    constructor(time: number, price: Big) {
        this.time = time;
        this.price = price;
    }
}