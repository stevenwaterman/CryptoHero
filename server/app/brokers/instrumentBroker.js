import SortedList from "./sortedList";
import {TradeDirection} from "../trading/order";
import Trade from "../trading/trade";
import {buyComparator, sellComparator} from "./comparators";

/**
 * The matcher accepts orders and matches them to create trades
 */
export default class InstrumentBroker {
    #buys = new SortedList(buyComparator);
    #sells = new SortedList(sellComparator);
    #trades = [];

    constructor(instrument) {
        if (instrument == null) throw "Instrument must be defined and not null";
        this.instrument = instrument;
    };

    /**
     * Performs a trade on two matched orders. Adjusts the units of the two orders.
     * @param instrument The instrument to trade in
     * @param order The new order. Must be defined + not null
     * @param matched The old order from the book. Must be define + not null
     * @returns {Trade} The trade produced from matching the orders.
     */
    static #makeTrade(instrument, order, matched) {
        const buy = order.direction === TradeDirection.BUY ? order : matched;
        const sell = matched.direction === TradeDirection.SELL ? matched : order;

        const unitPrice = matched.unitPrice;
        const units = InstrumentBroker.#getUnitsTraded(order, matched);
        buy.units -= units;
        sell.units -= units;

        InstrumentBroker.#updatePositionOnTrade(instrument, buy, sell, units, unitPrice);
        return new Trade(buy.account, sell.account, units, unitPrice);
    };

    /**
     * Tells you whether a trade can be done between two orders.
     * One of the orders must be a buy, the other must be a sell.
     */
    static #tradePossible(o1, o2) {
        if (o1 == null) return false;
        if (o2 == null) return false;
        if (o1.units <= 0 || o2.units <= 0) return false;

        switch (o1.direction) {
            case TradeDirection.BUY:
                return o1.unitPrice >= o2.unitPrice;
            case TradeDirection.SELL:
                return o1.unitPrice <= o2.unitPrice;
        }
    }

    /**
     * Determines how many units can be traded between two matched orders.
     * @param o1 Must be a defined, NonNull Order
     * @param o2 Must be a defined, NonNull Order
     * @returns {number} The number of units that can be traded between the two orders
     */
    static #getUnitsTraded(o1, o2) {
        return Math.min(o1.units, o2.units)
    }

    static #updatePositionOnPlaceOrder(instrument, order) {
        const account = order.account;
        const asset = order.direction === TradeDirection.BUY ? instrument.fromAsset : instrument.toAsset;
        const amount = order.direction === TradeDirection.BUY ? order.units * order.unitPrice : order.units;
        account.addAssets(asset, -amount);
    }

    /**
     * Returns the list of all trades involving a given account
     */
    getTrades = (account) => this.#trades.filter((trade) => trade.buyer.id === account.id || trade.seller.id === account.id);

    #getPendingBuys = (account) => this.#buys.underlying().filter((order) => order.account.id === account.id);

    #getPendingSells = (account) => this.#sells.underlying().filter((order) => order.account.id === account.id);

    getPendingOrders = (account) => new Object({
        "buy": this.#getPendingBuys(account),
        "sell": this.#getPendingSells(account)
    });

    /**
     * Checks the first order on the buy and sell lists and removes them if there's no units left
     */
    #clearCompletedOrders() {
        const buy = this.#buys.min();
        if (buy != null && buy.units <= 0) {
            this.#buys.delete(buy);
        }

        const sell = this.#sells.min();
        if (sell != null && sell.units <= 0) {
            this.#sells.delete(sell);
        }
    }

    /**
     * @param order A non-null, defined Order object that we want to find a match for
     * @returns {Order} The best-priced, oldest buy/sell order (opposite direction to order parameter)
     */
    #getPotentialOrderMatch(order) {
        switch (order.direction) {
            case TradeDirection.BUY:
                return this.#sells.min();
            case TradeDirection.SELL:
                return this.#buys.min();
        }
    }

    /**
     * Places an order on the book
     * @param order A non-null, defined Order object to add
     */
    #pushOrder(order) {
        switch (order.direction) {
            case TradeDirection.BUY:
                this.#buys.push(order);
                break;
            case TradeDirection.SELL:
                this.#sells.push(order);
                break;
        }
    }

    /**
     * Repeatedly match an order with orders form the book, reducing the
     * @param order Must be
     */
    #makeTrades(order) {
        let match = this.#getPotentialOrderMatch(order);
        while (InstrumentBroker.#tradePossible(order, match)) {
            const trade = InstrumentBroker.#makeTrade(this.instrument, order, match);
            this.#trades.push(trade);

            this.#clearCompletedOrders();
            match = this.#getPotentialOrderMatch(order);
        }
    };

    static #updatePositionOnCancelOrder(instrument, order) {
        const account = order.account;
        const asset = order.direction === TradeDirection.BUY ? instrument.fromAsset : instrument.toAsset;
        const amount = order.direction === TradeDirection.BUY ? order.units * order.unitPrice : order.units;
        account.addAssets(asset, amount);
    }

    static #updatePositionOnTrade(instrument, buyOrder, sellOrder, units, unitPrice) {
        InstrumentBroker.#updatePositionOnBuy(instrument, buyOrder, units, unitPrice);
        InstrumentBroker.#updatePositionOnSell(instrument, sellOrder, units, unitPrice);
    }

    static #updatePositionOnBuy(instrument, order, actualUnits, actualUnitPrice) {
        const account = order.account;
        const gaining = instrument.toAsset;
        const spending = instrument.fromAsset;

        // noinspection UnnecessaryLocalVariableJS
        const gainedAmount = actualUnits;
        account.addAssets(gaining, gainedAmount);

        const expectedSpend = actualUnits * order.unitPrice;
        const actuallySpent = actualUnits * actualUnitPrice;
        const refundDue = expectedSpend - actuallySpent;
        account.addAssets(spending, refundDue);
    }

    static #updatePositionOnSell(instrument, order, actualUnits, actualUnitPrice) {
        const account = order.account;
        const gaining = instrument.fromAsset;

        // noinspection UnnecessaryLocalVariableJS
        const gainedAmount = actualUnits * actualUnitPrice;
        account.addAssets(gaining, gainedAmount);
    }

    /**
     * Matches the order param with orders from the book until no more can be made
     * then adds the order to the book if it has any remaining quantity.
     * @param order Should be a defined, non-null Order object. Otherwise, will throw error.
     */
    place(order) { //TODO check that the account can afford it
        if (order == null) throw 'Order must be defined and non-null';
        const validDirections = [TradeDirection.BUY, TradeDirection.SELL];
        if (!validDirections.includes(order.direction)) throw `Unrecognised TradeDirection: ${order.direction}`;

        InstrumentBroker.#updatePositionOnPlaceOrder(this.instrument, order);
        this.#makeTrades(order);
        if (order.units > 0) {
            this.#pushOrder(order);
        }
    };
}
