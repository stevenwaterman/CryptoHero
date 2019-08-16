import {INSTRUMENTS} from "../trading/instrument";
import InstrumentBroker from "./instrumentBroker";

export default class Broker {
  instrumentBrokers = {};

  constructor() {
    Object.values(INSTRUMENTS).forEach(instrument => {
      this.instrumentBrokers[instrument.name] = new InstrumentBroker(
        instrument
      );
    });
  }

  #getIBroker = instrument => this.instrumentBrokers[instrument.name];

  getTrades(account) {
    const trades = {};
    Object.entries(this.instrumentBrokers).forEach(arr => {
      const instrumentName = arr[0];
      const iBroker = arr[1];
      trades[instrumentName] = iBroker.getTrades(account);
    });
    return trades;
  }

  getPendingOrders(account) {
    const orders = {};
    this.#forEachInstrumentBroker((name, iBroker) => {
      orders[name] = iBroker.getPendingOrders(account);
    });
    return orders;
  }

  /**
   * Return a list of the assets that are locked due to a pending order for a given account
   */
  getLockedAssets(account) {
    const lockedAssets = {};
    this.#forEachInstrumentBroker((_, iBroker) => {
      const iLockedAssets = iBroker.getLockedAssets(account);

      const a1 = iBroker.instrument.toAsset;
      const a1Units = iLockedAssets[0];
      const a1Current = lockedAssets[a1.name] ?? 0;
      lockedAssets[a1.name] = a1Current + a1Units;

      const a2 = iBroker.instrument.fromAsset;
      const a2Units = iLockedAssets[1];
      const a2Current = lockedAssets[a2.name] ?? 0;
      lockedAssets[a2.name] = a2Current + a2Units;
    });
    return lockedAssets;
  }

  #forEachInstrumentBroker(func) {
    Object.entries(this.instrumentBrokers).forEach(arr => {
      func(arr[0], arr[1]);
    });
  }

  /**
   * If you buy 100 units of the instrument GBPBTC at a unit price of 1.1, you will spend 110 BTC to get 100 GBP.
   * If you sell 100 units of the instrument GBPBTC at a unit price of 1.1, you will spend 100GBP to get 110BTC.
   */
  placeOrder(instrument, order) {
    const iBroker = this.#getIBroker(instrument);
    iBroker.place(order);
  }

  cancelOrder(instrument, order) {
    const iBroker = this.#getIBroker(instrument);
    iBroker.cancel(order);
  }
}
