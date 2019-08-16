import {Instrument} from "../trading/instrument";
import InstrumentBroker from "./instrumentBroker";
import {Big} from "big.js";
import {Map} from "immutable";
import Asset from "../trading/asset";
import Account from "../trading/account";
import Order from "../trading/order";

export default class Broker {
    private readonly instrumentBrokers: Map<Instrument, InstrumentBroker> = Map(
        Instrument.ALL.map(inst => [inst, new InstrumentBroker(inst)])
    );

    constructor() {
    }

    getTrades(account: Account) {
        return Map(
            this.instrumentBrokers.map(
                (broker: InstrumentBroker, instrument: Instrument) => {
                    return [instrument, broker.getTrades(account)];
                }
            )
        );
    }

    getPendingOrders(account: Account) {
        return Map(
            this.instrumentBrokers.map(
                (broker: InstrumentBroker, instrument: Instrument) => {
                    return [instrument, broker.getPendingOrders(account)];
                }
            )
        );
    }

    /**
     * Return a list of the assets that are locked due to a pending order for a given account
     */
    getLockedAssets(account: Account) {
        return Map<Asset, Big>().withMutations((map: Map<Asset, Big>) => {
            this.instrumentBrokers.forEach((broker, instrument) => {
                const iLockedAssets = broker.getLockedAssets(account);

                const a1 = instrument.toAsset;
                const a1Units = iLockedAssets[0];
                const a1Current = <Big>map.get(a1);
                map.set(a1, a1Current.plus(a1Units));

                const a2 = instrument.fromAsset;
                const a2Units = iLockedAssets[1];
                const a2Current = <Big>map.get(a2);
                map.set(a2, a2Current.plus(a2Units));
            });
        });
    }

    /**
     * If you buy 100 units of the instrument GBPBTC at a unit price of 1.1, you will spend 110 BTC to get 100 GBP.
     * If you sell 100 units of the instrument GBPBTC at a unit price of 1.1, you will spend 100GBP to get 110BTC.
     */
    placeOrder(instrument: Instrument, order: Order) {
        const iBroker = this.getIBroker(instrument);
        iBroker.place(order);
    }

    cancelOrder(instrument: Instrument, order: Order) {
        const iBroker = this.getIBroker(instrument);
        iBroker.cancel(order);
    }

    private getIBroker(instrument: Instrument) {
        const iBroker = this.instrumentBrokers.get(instrument);
        if (iBroker == null) {
            throw "Broker does not exist for instrument. This should never happen";
        }
        return iBroker;
    }
}
