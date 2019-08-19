import {List, Map, Set} from "immutable";

export default class TradeDirection {
    static readonly BUY = new TradeDirection("buy");
    static readonly SELL = new TradeDirection("sell");

    static readonly ALL: Set<TradeDirection> = Set([TradeDirection.BUY, TradeDirection.SELL]);
    static readonly MAP: Map<string, TradeDirection> = TradeDirection.ALL.toMap().mapKeys((direction) => direction.name);
    static readonly NAMES: List<string> = TradeDirection.MAP.keySeq().sort((a, b) => a.localeCompare(b)).toList();

    readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }
}
