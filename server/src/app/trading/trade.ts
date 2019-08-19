import uuidv4 from "uuid/v4";
import Big from "big.js";
import Account from "./account";

/**
 * Stores information about a trade that has been mde in the exchange
 */
export default class Trade {
    id = uuidv4();
    readonly buyer: Account;
    readonly seller: Account;
    readonly units: Big;
    readonly unitPrice: Big;

    constructor(buyer: Account, seller: Account, units: Big, unitPrice: Big) {
        if (units.lte(Big("0"))) {
            throw `Units must be > 0. Actual: ${units}`;
        }

        this.buyer = buyer;
        this.seller = seller;
        this.units = units;
        this.unitPrice = unitPrice;
    }
}
