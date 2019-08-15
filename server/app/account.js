import Order, {TradeDirection} from "./order";

const uuidv4 = require('uuid/v4');

export default class Account {
    constructor() {
        this.id = uuidv4();
    }

    createBuy = (units, unitPrice) => new Order(this, TradeDirection.BUY, units, unitPrice);
    createSell = (units, unitPrice) => new Order(this, TradeDirection.SELL, units, unitPrice);
}
