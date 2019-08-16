import TradeDirection from "../../app/trading/tradeDirection";
import Big from "big.js";
import Account from "../../app/trading/account";

export function expectedPending(buys: Array<any>, sells: Array<any>){
    return new Object({
        buy: buys,
        sell: sells
    });
}

export function expectedOrder(account: Account, direction: TradeDirection, units: Big, unitPrice: Big) {
    return new Object({
        account: {
            id: account.id
        },
        direction: direction,
        units: units,
        unitPrice: unitPrice
    });
}

/**
 * Allows for partial matching - so we don't match on IDs because they are UUIDs
 */
export function expectedTrade(buyer: Account, seller: Account, units: Big, unitPrice: Big){
    return new Object({
        buyer: {
            id: buyer.id
        },
        seller: {
            id: seller.id
        },
        units: units,
        unitPrice: unitPrice
    });
}

