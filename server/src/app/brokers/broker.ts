import Instrument from "../trading/instrument";
import InstrumentBroker from "./instrumentBroker";
import {Big} from "big.js";
import Order from "../trading/order";
import * as Immutable from "immutable";
import PriceAggregate from "./priceAggregate";

export default class Broker {
    private readonly instrumentBrokers: Immutable.Map<Instrument, InstrumentBroker> = Immutable.Map(
        Instrument.ALL.map(it => [it, new InstrumentBroker()])
    );

    constructor() {
    }

    getAggregatePrices(): Immutable.Map<Instrument, PriceAggregate> {
        return this.instrumentBrokers.map((iBroker) => iBroker.getAggregatePrices());
    }

    getMarketPrices(): Immutable.Map<Instrument, Big> {
        return this.instrumentBrokers.map((iBroker) => iBroker.getMarketPrice());
    }

    /**
     * If you buy 100 units of the instrument GBPBTC at a unit price of 1.1, you will spend 110 BTC to get 100 GBP.
     * If you sell 100 units of the instrument GBPBTC at a unit price of 1.1, you will spend 100GBP to get 110BTC.
     */
    placeOrder(order: Order): void {
        const iBroker = this.getIBroker(order.instrument);
        iBroker.place(order);
    }

    cancelOrder(order: Order): void {
        const iBroker = this.getIBroker(order.instrument);
        iBroker.cancel(order);
    }

    getIBroker(instrument: Instrument): InstrumentBroker {
        const iBroker = this.instrumentBrokers.get(instrument);
        if (iBroker == null) {
            throw "Broker does not exist for instrument. This should never happen";
        }
        return iBroker;
    }

    clear(): void {
        this.instrumentBrokers.valueSeq().forEach((iBroker) => iBroker.clear())
    }
}
