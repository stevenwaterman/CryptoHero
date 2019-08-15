import Order, {TradeDirection} from "./order";
import {ASSETS} from "./asset";

const uuidv4 = require('uuid/v4');

export default class Account {
    id = uuidv4();
    /**
     * The amount left to place on new orders
     */
    position = {};

    //TODO add ability to see total position if all orders were cancelled

    constructor() {
        Object.keys(ASSETS).forEach((asset) => {
            this.position[asset] = 0;
        });
    }

    addAssets = (asset, addUnits) => this.position[asset.name] += addUnits;

    getAssets = (asset) => {
        console.log(this.position);
        return this.position[asset.name];
    };

    createBuy = (units, unitPrice) => new Order(this, TradeDirection.BUY, units, unitPrice);
    createSell = (units, unitPrice) => new Order(this, TradeDirection.SELL, units, unitPrice);
}