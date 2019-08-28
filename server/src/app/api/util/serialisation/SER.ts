import Asset from "../../../trading/asset";
import Big from "big.js";
import {Map} from "immutable";
import Instrument from "../../../trading/instrument";
import Account from "../../../trading/account";
import Order from "../../../trading/order";
import TradeDirection from "../../../trading/tradeDirection";
import PriceAggregate, {PriceAggregateElement} from "../../../brokers/priceAggregate";
import {OrderState} from "../../../trading/orderState";

export type Serialisable = string | number | {[k: string]: Serialisable | Array<Serialisable>};

export default class SER {
    static NO<T extends Serialisable | Array<Serialisable>>(serialisable: T): T {
        return serialisable;
    }

    static ERROR(error: Error): string {
        return error.message;
    }

    static BIG(big: Big): Serialisable {
        return big.toString();
    }

    static MAP<K, V>(map: Map<K, V>, keyFunc: (k: K) => string, valFunc: (v: V) => any): Serialisable {
        return map
            .mapKeys(keyFunc)
            .map(valFunc)
            .toObject();
    }

    static MAPFUNC<K, V>(
        keyFunc: (k: K) => string,
        valFunc: (v: V) => Serialisable
    ): (map: Map<K, V>) => Serialisable {
        return (map: Map<K, V>) => SER.MAP(map, keyFunc, valFunc);
    }

    static DIRECTION(direction: TradeDirection): string {
        return direction.name;
    }

    static ASSET(asset: Asset): string {
        return asset.name;
    }

    static ACCOUNT(account: Account): string {
        return account.id;
    }

    static ARRAY<S, T extends Serialisable>(array: Array<S>, func: (s: S) => T): Array<T> {
        return array.map(func);
    }

    static INSTRUMENT(instrument: Instrument): string {
        return instrument.name;
    }

    static ARRAYFUNC<S, T extends Serialisable>(func: (s: S) => T): (arr: Array<S>) => Array<T> {
        return (arr: Array<S>) => SER.ARRAY(arr, func);
    }

    static ORDER(
        {
            direction,
            getAveragePrice,
            getRemainingUnits,
            id,
            instrument,
            originalUnits,
            state,
            timestamp: {getTime},
            unitPrice
        }: Order
    ): Serialisable {
        return {
            "id": id,
            "time": getTime(),
            "instrument": SER.INSTRUMENT(instrument),
            "state": SER.ORDER_STATE(state),
            "direction": SER.DIRECTION(direction),
            "units": SER.BIG(originalUnits),
            "unit price": SER.BIG(unitPrice),
            "remaining units": SER.BIG(getRemainingUnits()),
            "average price": SER.BIG(getAveragePrice())
        };
    }

    static PRICE_AGGREGATE({buy, sell}: PriceAggregate): Serialisable {
        return {
            "buy": SER.ARRAY(buy, SER.PRICE_AGGREGATE_ELEMENT),
            "sell": SER.ARRAY(sell, SER.PRICE_AGGREGATE_ELEMENT)
        }
    }

    private static PRICE_AGGREGATE_ELEMENT(element: PriceAggregateElement): Serialisable {
        return {
            "unit price": SER.BIG(element.unitPrice),
            "units": SER.BIG(element.units)
        }
    }

    private static ORDER_STATE(state: OrderState): Serialisable {
        return state.name
    }
}

