import Asset from "../../../trading/asset";
import Big from "big.js";
import {Map} from "immutable";
import Instrument from "../../../trading/instrument";
import Account from "../../../trading/account";
import Trade from "../../../trading/trade";
import Order from "../../../trading/order";
import TradeDirection from "../../../trading/tradeDirection";
import PendingOrders from "../../../brokers/pendingOrders";
import PriceAggregate, {PriceAggregateElement} from "../../../brokers/priceAggregate";

export default class SER {
    static BIG(big: Big): string {
        return big.toString();
    }

    static MAP<K, V>(map: Map<K, V>, keyFunc: (k: K) => string, valFunc: (v: V) => any): any {
        return map
            .mapKeys(keyFunc)
            .map(valFunc)
            .toObject();
    }

    static MAPFUNC<K, V>(keyFunc: (k: K) => string, valFunc: (v: V) => any): (map: Map<K, V>) => any {
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

    static ARRAY<S, T>(array: Array<S>, func: (s: S) => T): Array<T> {
        return array.map(func);
    }

    static TRADE(trade: Trade): any {
        return {
            "id": trade.id,
            "buyer": SER.ACCOUNT(trade.buyer),
            "seller": SER.ACCOUNT(trade.seller),
            "units": SER.BIG(trade.units),
            "unit price": SER.BIG(trade.showUnitPrice)
        };
    }

    static INSTRUMENT(instrument: Instrument): string {
        return instrument.name;
    }

    static ARRAYFUNC<S, T>(func: (s: S) => T): (arr: Array<S>) => Array<T> {
        return (arr: Array<S>) => SER.ARRAY(arr, func);
    }

    static ORDER(order: Order): any {
        return {
            "id": order.id,
            "account": SER.ACCOUNT(order.account),
            "timestamp": order.timestamp.getTime(),
            "direction": SER.DIRECTION(order.direction),
            "units": SER.BIG(order.units),
            "unit price": SER.BIG(order.showUnitPrice)
        }
    }

    static PENDING_ORDERS(pendingOrders: PendingOrders): any {
        return {
            "buy": SER.ARRAY(pendingOrders.buy, SER.ORDER),
            "sell": SER.ARRAY(pendingOrders.sell, SER.ORDER)
        }
    }

    static PRICE_AGGREGATE(priceAggregate: PriceAggregate): any {
        return {
            "buy": SER.ARRAY(priceAggregate.buy, SER.PRICE_AGGREGATE_ELEMENT),
            "sell": SER.ARRAY(priceAggregate.sell, SER.PRICE_AGGREGATE_ELEMENT)
        }
    }

    private static PRICE_AGGREGATE_ELEMENT(element: PriceAggregateElement): any {
        return {
            "unit price": SER.BIG(element.showUnitPrice),
            "units": SER.BIG(element.units)
        }
    }
}

