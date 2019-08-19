import TradeDirection from "../../../app/trading/tradeDirection";
import Big from "big.js";
import Account from "../../../app/trading/account";

export class ExpectedPending {
    readonly buy: Array<ExpectedOrder>;
    readonly sell: Array<ExpectedOrder>;

    constructor(buy: Array<ExpectedOrder>, sell: Array<ExpectedOrder>) {
        this.buy = buy;
        this.sell = sell;
    }
}

export class ExpectedAccount {
    readonly id: string;

    constructor(account: Account) {
        this.id = account.id;
    }
}

export class ExpectedOrder {
    readonly account: ExpectedAccount;
    readonly direction: TradeDirection;
    readonly units: Big;
    readonly unitPrice: Big;

    constructor(account: Account, direction: TradeDirection, units: Big, unitPrice: Big) {
        this.account = new ExpectedAccount(account);
        this.direction = direction;
        this.units = units;
        this.unitPrice = unitPrice;
    }
}

export class ExpectedTrade {
    readonly buyer: ExpectedAccount;
    readonly seller: ExpectedAccount;
    readonly units: Big;
    readonly unitPrice: Big;

    constructor(buyer: Account, seller: Account, units: Big, unitPrice: Big) {
        this.buyer = new ExpectedAccount(buyer);
        this.seller = new ExpectedAccount(seller);
        this.units = units;
        this.unitPrice = unitPrice;
    }
}

