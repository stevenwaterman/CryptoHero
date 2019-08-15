const uuidv4 = require('uuid/v4');

/**
 * Stores information about an order that should be placed on the exchange
 */
export default class Order {
    id = uuidv4();
    timeStamp = new Date();

    constructor(account, direction, units, unitPrice) {
        if (units <= 0) throw `Units must be more that 0. Actual: ${units}`;

        this.account = account;
        this.direction = direction;
        this.units = units;
        this.unitPrice = unitPrice;
    }
}

export const TradeDirection = Object.freeze({
    BUY: "buy",
    SELL: "sell"
});

