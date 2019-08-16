const uuidv4 = require("uuid/v4");

/**
 * Stores information about a trade that has been mde in the exchange
 */
export default class Trade {
  id = uuidv4();

  constructor(buyer, seller, units, unitPrice) {
    if (units <= 0) throw `Units must be > 0. Actual: ${units}`;

    this.buyer = buyer;
    this.seller = seller;
    this.units = units;
    this.unitPrice = unitPrice;
  }
}
