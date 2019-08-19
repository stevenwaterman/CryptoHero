import Instrument from "../trading/instrument";
import InstrumentBroker from "./instrumentBroker";
import {Big} from "big.js";
import Asset from "../trading/asset";
import Account from "../trading/account";
import Order from "../trading/order";
import PendingOrders from "./pendingOrders";
import Trade from "../trading/trade";
import * as Immutable from "immutable";
import PriceAggregate from "./priceAggregate";

export default class Broker {
    private readonly instrumentBrokers: Immutable.Map<Instrument, InstrumentBroker> = Immutable.Map(
        Instrument.ALL.map(inst => [inst, new InstrumentBroker(inst)])
    );

    constructor() {
    }

    getTrades(account: Account): Immutable.Map<Instrument, Array<Trade>> {
        return this.instrumentBrokers.map((iBroker) => iBroker.getTrades(account));
    }

    getPendingOrders(account: Account): Immutable.Map<Instrument, PendingOrders> {
        return this.instrumentBrokers.map((iBroker) => iBroker.getPendingOrders(account));
    }

    getAggregatePrices(): Immutable.Map<Instrument, PriceAggregate> {
        return this.instrumentBrokers.map((iBroker) => iBroker.getAggregatePrices());
    }

    getMarketPrices(): Immutable.Map<Instrument, Big> {
        return this.instrumentBrokers.map((iBroker) => iBroker.getMarketPrice());
    }

    /**
     * Return a list of the assets that are locked due to a pending order for a given account
     */
    getLockedAssets(account: Account): Immutable.Map<Asset, Big> {
        const addBig = (map: Immutable.Map<Asset, Big>, asset: Asset, toAdd: Big) => {
            const current: Big | undefined = map.get(asset);
            const total = (current == null) ? toAdd : toAdd.plus(current);
            map.set(asset, total);
        };

        return Immutable.Map<Asset, Big>().withMutations((map: Immutable.Map<Asset, Big>) => {
            this.instrumentBrokers.forEach((broker, instrument) => {
                const iLockedAssets = broker.getLockedAssets(account);
                addBig(map, instrument.toAsset, iLockedAssets[0]);
                addBig(map, instrument.fromAsset, iLockedAssets[1]);
            });
        });
    }

    clear(): void {
        this.instrumentBrokers.valueSeq().forEach((iBroker) => iBroker.clear())
    }

    /**
     * If you buy 100 units of the instrument GBPBTC at a unit price of 1.1, you will spend 110 BTC to get 100 GBP.
     * If you sell 100 units of the instrument GBPBTC at a unit price of 1.1, you will spend 100GBP to get 110BTC.
     */
    placeOrder(instrument: Instrument, order: Order): void {
        const iBroker = this.getIBroker(instrument);
        iBroker.place(order);
    }

    cancelOrder(instrument: Instrument, order: Order): void {
        const iBroker = this.getIBroker(instrument);
        iBroker.cancel(order);
    }

    getIBroker(instrument: Instrument): InstrumentBroker {
        const iBroker = this.instrumentBrokers.get(instrument);
        if (iBroker == null) {
            throw "Broker does not exist for instrument. This should never happen";
        }
        return iBroker;
    }
}
