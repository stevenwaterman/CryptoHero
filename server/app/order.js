/**
 * Stores information about an order that should be placed on the exchange
 */
export default class Order {
    constructor(account, direction, units, unitPrice) {
        if (units <= 0) throw `Units must be more that 0. Actual: ${units}`;

        this.account = account;
        this.direction = direction;
        this.units = units;
        this.unitPrice = unitPrice;
        this.timeStamp = new Date();
    }
}

export const TradeDirection = Object.freeze({
    BUY: "buy",
    SELL: "sell"
});

/**
 * Higher prices come before lower prices
 * Then earlier timestamps come before later timestamps
 * Then return 0 iff account numbers are the same
 */
export const buyComparator = (a, b) => {
    if (a.unitPrice > b.unitPrice) return -1;
    if (a.unitPrice < b.unitPrice) return 1;
    if (a.timeStamp < b.timeStamp) return -1;
    if (a.timeStamp > b.timeStamp) return 1;
    return a.account - b.account;
};

/**
 * Lower prices come before lower prices
 * Then earlier timestamps come before later timestamps
 * Then return 0 iff account numbers are the same
 */
export const sellComparator = (a, b) => {
    if (a.unitPrice < b.unitPrice) return -1;
    if (a.unitPrice > b.unitPrice) return 1;
    if (a.timeStamp < b.timeStamp) return -1;
    if (a.timeStamp > b.timeStamp) return 1;
    return a.account - b.account;
};