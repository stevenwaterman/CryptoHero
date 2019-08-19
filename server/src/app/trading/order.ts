import {Big} from "big.js";
import TradeDirection from "./tradeDirection";
import uuidv4 from "uuid/v4";
import Account from "./account";
import {REGISTRY} from "../registry";

/**
 * Stores information about an order that should be placed on the exchange
 */
export default class Order {
    id = uuidv4();
    timestamp = new Date();
    account: Account;
    direction: TradeDirection;
    units: Big;
    unitPrice: Big;
    spendAmount: Big;
    gainAmount: Big;

    constructor(
        account: Account,
        direction: TradeDirection,
        units: Big,
        unitPrice: Big
    ) {
        if (units.lte(new Big("0")))
            throw `Units must be more that 0. Actual: ${units}`;

        this.account = account;
        this.direction = direction;
        this.units = new Big(units);
        this.unitPrice = new Big(unitPrice);

        this.spendAmount =
            this.direction === TradeDirection.BUY
                ? this.units.mul(this.unitPrice)
                : this.units;
        this.gainAmount =
            this.direction === TradeDirection.BUY
                ? this.units
                : this.units.mul(this.unitPrice);

        REGISTRY.registerOrder(this);
    }
}
