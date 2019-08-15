import {INSTRUMENTS} from "../trading/instrument";
import InstrumentBroker from "./instrumentBroker";

export default class Broker {
    instrumentBrokers = {};

    constructor() {
        Object.values(INSTRUMENTS).forEach((instrument) => {
            this.instrumentBrokers[instrument.name] = new InstrumentBroker(instrument);
        });
    };

    #getBroker = (instrument) => this.instrumentBrokers[instrument.name];

    getTrades(account) {
        const trades = {};
        Object.entries(this.instrumentBrokers).forEach((arr) => {
            const instrumentName = arr[0];
            const iBroker = arr[1];
            trades[instrumentName] = iBroker.getTrades(account);
        });
        return trades;
    }

    getPendingOrders(account) {
        const orders = {};
        Object.entries(this.instrumentBrokers).forEach((arr) => {
            const instrumentName = arr[0];
            const iBroker = arr[1];
            orders[instrumentName] = iBroker.getPendingOrders(account);
        });
        return orders;
    }

    /**
     * If you buy 100 units of the instrument GBPBTC at a unit price of 1.1, you will spend 110 BTC to get 100 GBP.
     */
    placeOrder(instrument, order) {
        const broker = this.#getBroker(instrument);
        broker.place(order);
    };

    //TODO cancel order.
}