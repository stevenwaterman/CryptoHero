import {List, Map, Set} from "immutable";
import Asset from "./asset";
import Instrument from "./instrument";
import Order from "./order";
import Big from "big.js";

export default class TradeDirection {
    static readonly BUY = new TradeDirection("buy",
        it => it.fromAsset,
        it => it.toAsset,
        it => it.originalUnits.mul(it.unitPrice)
    );

    static readonly SELL = new TradeDirection("sell",
        it => it.toAsset,
        it => it.fromAsset,
        it => it.originalUnits
    );

    static readonly ALL: Set<TradeDirection> = Set([TradeDirection.BUY, TradeDirection.SELL]);
    static readonly MAP: Map<string, TradeDirection> = TradeDirection.ALL.toMap().mapKeys((direction) => direction.name);
    static readonly NAMES: List<string> = TradeDirection.MAP.keySeq().sort((a, b) => a.localeCompare(b)).toList();

    readonly name: string;
    readonly getSpentAsset: (instrument: Instrument) => Asset;
    readonly getGainedAsset: (instrument: Instrument) => Asset;
    readonly originallyLocked: (order: Order) => Big;

    private constructor(
        name: string,
        getSpentAsset: (instrument: Instrument) => Asset,
        getGainedAsset: (instrument: Instrument) => Asset,
        getAmountToLock: (order: Order) => Big
    ) {
        this.name = name;
        this.getSpentAsset = getSpentAsset;
        this.getGainedAsset = getGainedAsset;
        this.originallyLocked = getAmountToLock;
    }
}
