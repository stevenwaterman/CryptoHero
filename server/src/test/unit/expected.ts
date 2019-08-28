import TradeDirection from "../../app/trading/tradeDirection";
import Big from "big.js";
import Account from "../../app/trading/account";
import Instrument from "../../app/trading/instrument";
import {OrderState} from "../../app/trading/orderState";
import Order from "../../app/trading/order";
import Broker from "../../app/brokers/broker";
import {REGISTRY} from "../../app/registry";
import {G} from "../integration/util/global";
import InstrumentBroker from "../../app/brokers/instrumentBroker";

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
    readonly instrument: Instrument;
    readonly originalUnits: Big;
    readonly unitPrice: Big;
    state: OrderState;
    readonly trades: Array<ExpectedTrade>;

    constructor(account: Account, direction: TradeDirection,  instrument: Instrument, originalUnits: Big, unitPrice: Big, orderState: OrderState, trades: Array<ExpectedTrade> | undefined = undefined) {
        this.account = new ExpectedAccount(account);
        this.direction = direction;
        this.instrument = instrument;
        this.originalUnits = originalUnits;
        this.unitPrice = unitPrice;
        this.state = orderState;
        this.trades = trades || [];
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

export let testBroker: Broker;
export let testIBroker: InstrumentBroker;

export function placeBuy(instrument: Instrument, account: Account, units: Big, price: Big): ExpectedOrder{
    return placeOrder(TradeDirection.BUY, instrument, account, units, price);
}

export function placeSell(instrument: Instrument, account: Account, units: Big, price: Big): ExpectedOrder{
    return placeOrder(TradeDirection.SELL, instrument, account, units, price)
}

export function placeOrder(direction: TradeDirection, instrument: Instrument, account: Account, units: Big, price: Big): ExpectedOrder{
    const order = new Order(account, direction, instrument, units, price);
    testBroker.placeOrder(order);
    return new ExpectedOrder(account, direction, instrument,units, price, OrderState.PENDING);
}

export function expectOrders(account: Account, ...orders: Array<ExpectedOrder>): void {
    expect(account.orders).toBeTruthy();
    expect(account.orders).toHaveLength(orders.length);
    expect(account.orders).toMatchObject(orders);
}

export function setup(): void {
    beforeEach(() => {
        REGISTRY.clear();
        testBroker = new Broker();
        testIBroker = testBroker.getIBroker(Instrument.GBPBTC);
    });
}
