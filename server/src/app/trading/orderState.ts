import {List, Map, Set} from "immutable";
import TradeDirection from "./tradeDirection";

export class OrderState {
    static readonly PENDING = new OrderState("pending");
    static readonly COMPLETE = new OrderState("complete");
    static readonly CANCELLED = new OrderState("cancelled");

    static readonly ALL: Set<OrderState> = Set([OrderState.PENDING, OrderState.COMPLETE, OrderState.CANCELLED]);
    static readonly MAP: Map<string, OrderState> = OrderState.ALL.toMap().mapKeys((orderState) => orderState.name);
    static readonly NAMES: List<string> = TradeDirection.MAP.keySeq().sort((a, b) => a.localeCompare(b)).toList();

    readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }
}