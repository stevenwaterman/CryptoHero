import Asset from "../../../trading/asset";
import Big from "big.js";
import {Map} from "immutable";
import Instrument from "../../../trading/instrument";
import Account from "../../../trading/account";
import Order from "../../../trading/order";
import TradeDirection from "../../../trading/tradeDirection";
import PriceAggregate, {PriceAggregateElement} from "../../../brokers/priceAggregate";
import {OrderState} from "../../../trading/orderState";
import PricePoint from "../../../brokers/PricePoint";

type InnerSerialisable = null | string | number | { [k: string]: InnerSerialisable | Array<InnerSerialisable>};
export type Serialisable = InnerSerialisable | Array<InnerSerialisable>

export default class SER {
    static BIG(big: Big | null): InnerSerialisable {
        if (big == null) {
            return null;
        } else {
            return big.toFixed(5);
        }
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

    static ARRAY<S, T extends InnerSerialisable>(array: Array<S>, func: (s: S) => T): Array<T> {
        return array.map(func);
    }

    static INSTRUMENT(instrument: Instrument): string {
        return instrument.name;
    }

    static ARRAYFUNC<S, T extends InnerSerialisable>(func: (s: S) => T): (arr: Array<S>) => Array<T> {
        return (arr: Array<S>) => SER.ARRAY(arr, func);
    }

    static ORDER(order: Order
    ): InnerSerialisable {
        return {
            "id": order.id,
            "time": order.timestamp.getTime(),
            "instrument": SER.INSTRUMENT(order.instrument),
            "state": SER.ORDER_STATE(order.getState()),
            "direction": SER.DIRECTION(order.direction),
            "units": SER.BIG(order.originalUnits),
            "unit price": SER.BIG(order.unitPrice),
            "remaining units": SER.BIG(order.getRemainingUnits()),
            "average price": SER.BIG(order.getAveragePrice())
        };
    }

    static PRICE_AGGREGATE({buy, sell}: PriceAggregate): InnerSerialisable {
        return {
            "buy": SER.ARRAY(buy, SER.PRICE_AGGREGATE_ELEMENT),
            "sell": SER.ARRAY(sell, SER.PRICE_AGGREGATE_ELEMENT)
        }
    }

    static PRICE_AGGREGATE_ELEMENT(element: PriceAggregateElement): InnerSerialisable {
        return {
            "unit price": SER.BIG(element.unitPrice),
            "units": SER.BIG(element.units)
        }
    }

    private static ORDER_STATE(state: OrderState): InnerSerialisable {
        return state.name
    }

    static NO<T extends Serialisable>(t: T): T {
        return t;
    }

    static PRICE_POINT(pricePoint: PricePoint): InnerSerialisable {
        return {
            time: pricePoint.time,
            price: SER.BIG(pricePoint.price)
        }
    }
}

