import TradeDirection from "../../app/trading/tradeDirection";
import Big from "big.js";
import Account from "../../app/trading/account";
import Instrument from "../../app/trading/instrument";
import {OrderState} from "../../app/trading/orderState";
import Order from "../../app/trading/order";
import Broker from "../../app/brokers/broker";
import {REGISTRY} from "../../app/registry";
import InstrumentBroker from "../../app/brokers/instrumentBroker";
import Asset from "../../app/trading/asset";


export class ExpectedAccount {
    readonly id: string;

    constructor(account: Account) {
        this.id = account.id;
    }
}

export class ExpectedOrder {
    readonly account: ExpectedAccount;
    readonly direction: TradeDirection;
    readonly instrument: Instrument;
    readonly originalUnits: Big;
    readonly unitPrice: Big;
    state: OrderState;
    readonly trades: Array<ExpectedTrade>;

    constructor(account: Account, direction: TradeDirection, instrument: Instrument, originalUnits: Big, unitPrice: Big, orderState: OrderState, trades: Array<ExpectedTrade> | undefined = undefined) {
        this.account = new ExpectedAccount(account);
        this.direction = direction;
        this.instrument = instrument;
        this.originalUnits = originalUnits;
        this.unitPrice = unitPrice;
        this.state = orderState;
        this.trades = trades || [];
    }

    static create({account, direction, instrument, originalUnits, unitPrice}: Order): ExpectedOrder {
        return new ExpectedOrder(
            account,
            direction,
            instrument,
            originalUnits,
            unitPrice,
            OrderState.PENDING,
            []
        )
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

export function expectOrders(account: Account, ...orders: Array<ExpectedOrder>): void {
    expect(account.getOrders()).toHaveLength(orders.length);
    expect(account.getOrders()).toMatchObject(orders);
}