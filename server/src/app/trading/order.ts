import {Big} from "big.js";
import TradeDirection from "./tradeDirection";
import uuidv4 from "uuid/v4";
import Account from "./account";
import {REGISTRY} from "../registry";
import Instrument from "./instrument";
import Trade from "./trade";
import {OrderState} from "./orderState";
import Asset from "./asset";
import Room from "../websockets/Room";
import * as OrderPayloads from "../websockets/OrderPayloads"

/**
 * Stores information about an order that should be placed on the exchange
 */
export default class Order {
    readonly id = uuidv4();
    readonly timestamp = new Date();
    readonly account: Account;

    readonly direction: TradeDirection;
    readonly instrument: Instrument;

    readonly originalUnits: Big;
    readonly unitPrice: Big;

    readonly originalExpectedAmount: Big;

    readonly spentAsset: Asset;
    readonly gainedAsset: Asset;
    readonly originallyLocked: Big;

    private state: OrderState = OrderState.PENDING;
    private readonly trades: Array<Trade> = [];

    readonly tradeAddedRoom = new Room<OrderPayloads.TradeAdded>();
    readonly cancelledRoom = new Room<OrderPayloads.Cancelled>();

    addTrade(trade: Trade): void{
        this.trades.push(trade);

        const remaining = this.getRemainingUnits();
        if(remaining.eq(0)){
            this.state = OrderState.COMPLETE;
        }

        this.tradeAddedRoom.fire({
            self: this,
            newTrade: trade
        })
    }

    getState(): OrderState{
        return this.state;
    }

    cancel(): void{
        this.state = OrderState.CANCELLED;
        this.cancelledRoom.fire({
            self: this
        })
    }

    constructor(
        account: Account,
        direction: TradeDirection,
        instrument: Instrument,
        originalUnits: Big,
        unitPrice: Big
    ) {
        if (originalUnits.lte(0))
            throw `Units must be more that 0. Actual: ${originalUnits}`;

        this.account = account;

        this.direction = direction;
        this.instrument = instrument;

        this.originalUnits = originalUnits;
        this.unitPrice = unitPrice;

        this.originalExpectedAmount = this.originalUnits.mul(this.unitPrice);

        this.spentAsset = direction.getSpentAsset(instrument);
        this.gainedAsset = direction.getGainedAsset(instrument);
        this.originallyLocked = direction.originallyLocked(this);

        REGISTRY.registerOrder(this);
    }

    readonly getCompletedUnits = () =>
        this.trades.map(it => it.units)
            .reduce(
                (a: Big, b: Big) => a.plus(b),
                Big(0)
            );

    readonly getRemainingUnits = () => this.originalUnits.sub(this.getCompletedUnits());

    readonly getRemainingFraction = () => this.getRemainingUnits().div(this.originalUnits);

    readonly getAmountSoFar = () =>
        this.trades.map(
            it => it.units.mul(it.unitPrice)
        ).reduce(
            (a, b) => a.plus(b),
            Big(0)
        );

    readonly getFutureExpectedAmount = () =>
        this.getRemainingUnits().mul(this.unitPrice);

    readonly getExpectedAmount = () =>
        this.getAmountSoFar().plus(this.getFutureExpectedAmount());

    readonly getAveragePrice: () => Big | null = () => {
        const completed = this.getCompletedUnits();
        if (completed.eq(Big(0))) {
            return null;
        } else {
            return this.getAmountSoFar().div(completed);
        }
    }
}

