import SortedList from "./sortedList";
import Trade from "../trading/trade";
import {buyComparator, sellComparator} from "./comparators";
import {Big} from "big.js";
import Instrument from "../trading/instrument";
import Order from "../trading/order";
import TradeDirection from "../trading/tradeDirection";
import Account from "../trading/account";
import Asset from "../trading/asset";
import PendingOrders from "./pendingOrders";
import PriceAggregate, {PriceAggregateElement} from "./priceAggregate";

/**
 * The matcher accepts orders and matches them to create trades
 */
export default class InstrumentBroker {
    readonly instrument: Instrument;
    private readonly buys: SortedList<Order> = new SortedList(buyComparator);
    private readonly sells: SortedList<Order> = new SortedList(sellComparator);
    private readonly trades: Array<Trade> = [];

    constructor(instrument: Instrument) {
        this.instrument = instrument;
    }

    /**
     * Performs a trade on two matched orders. Adjusts the units of the two orders.
     * @param instrument The instrument to trade in
     * @param order The new order. Must be defined + not null
     * @param matched The old order from the book. Must be define + not null
     * @returns {Trade} The trade produced from matching the orders.
     */
    private static makeTrade(
        instrument: Instrument,
        order: Order,
        matched: Order
    ): Trade {
        const buy = order.direction === TradeDirection.BUY ? order : matched;
        const sell = matched.direction === TradeDirection.SELL ? matched : order;

        const unitPrice = matched.unitPrice;
        const units = InstrumentBroker.getUnitsTraded(order, matched);
        buy.units = buy.units.minus(units);
        sell.units = sell.units.minus(units);

        InstrumentBroker.updatePositionOnTrade(
            instrument,
            buy,
            sell,
            units,
            unitPrice
        );
        return new Trade(buy.account, sell.account, units, unitPrice);
    }

    /**
     * Tells you whether a trade can be done between two orders.
     * One of the orders must be a buy, the other must be a sell.
     */
    private static tradePossible(o1: Order, o2: Order): boolean {
        if (o1.units.lte(new Big("0")) || o2.units.lte(new Big("0"))) return false;

        switch (o1.direction) {
            case TradeDirection.BUY:
                return o1.unitPrice.gte(o2.unitPrice);
            case TradeDirection.SELL:
                return o1.unitPrice.lte(o2.unitPrice);
            default:
                throw `Unrecognised trade direction: ${o1.direction}`;
        }
    }

    /**
     * Determines how many units can be traded between two matched orders.
     * @param o1 Must be a defined, NonNull Order
     * @param o2 Must be a defined, NonNull Order
     * @returns {Big} The number of units that can be traded between the two orders
     */
    private static getUnitsTraded(o1: Order, o2: Order): Big {
        const o1Units = o1.units;
        const o2Units = o2.units;
        if (o1Units.lt(o2Units)) {
            return o1Units;
        } else {
            return o2Units;
        }
    }

    private static updatePositionOnPlaceOrder(
        instrument: Instrument,
        order: Order
    ): void {
        const account: Account = order.account;
        const asset: Asset =
            order.direction === TradeDirection.BUY
                ? instrument.buyerSpends
                : instrument.sellerSpends;

        const amount: Big = order.spendAmount;

        const position = account.getAvailableAssets(asset);
        if (position.lt(amount)) {
            throw `Account cannot afford ${amount}${asset.name}, only has ${position}`;
        }

        const subAmount = new Big("0").minus(amount);
        account.adjustAssets(asset, subAmount);
    }

    private static updatePositionOnCancelOrder(
        instrument: Instrument,
        order: Order
    ): void {
        const account = order.account;
        const asset =
            order.direction === TradeDirection.BUY
                ? instrument.buyerSpends
                : instrument.sellerSpends;
        const amount = order.spendAmount;
        account.adjustAssets(asset, amount);
    }

    private static updatePositionOnBuy(
        instrument: Instrument,
        order: Order,
        actualUnits: Big,
        actualUnitPrice: Big
    ): void {
        const account = order.account;
        const gaining: Asset = instrument.buyerGains;
        const spending: Asset = instrument.buyerSpends;

        // noinspection UnnecessaryLocalVariableJS
        const gainedAmount = actualUnits;
        account.adjustAssets(gaining, gainedAmount);

        const expectedSpend = actualUnits.mul(order.unitPrice);
        const actuallySpent = actualUnits.mul(actualUnitPrice);
        const refundDue = expectedSpend.minus(actuallySpent);
        account.adjustAssets(spending, refundDue);
    }

    private static updatePositionOnTrade(
        instrument: Instrument,
        buyOrder: Order,
        sellOrder: Order,
        units: Big,
        unitPrice: Big
    ): void {
        InstrumentBroker.updatePositionOnBuy(
            instrument,
            buyOrder,
            units,
            unitPrice
        );
        InstrumentBroker.updatePositionOnSell(
            instrument,
            sellOrder,
            units,
            unitPrice
        );
    }

    private static updatePositionOnSell(
        instrument: Instrument,
        order: Order,
        actualUnits: Big,
        actualUnitPrice: Big
    ): void {
        const account = order.account;
        const gaining = instrument.sellerGains;

        // noinspection UnnecessaryLocalVariableJS
        const gainedAmount = actualUnits.mul(actualUnitPrice);
        account.adjustAssets(gaining, gainedAmount);
    }

    /**
     * Returns the list of all trades involving a given account
     */
    getTrades(account: Account): Array<Trade> {
        return this.trades.filter(
            trade => trade.buyer.id === account.id || trade.seller.id === account.id
        );
    }

    getPendingOrders(account: Account): PendingOrders {
        return new PendingOrders(
            this.getPendingBuys(account),
            this.getPendingSells(account)
        );
    }

    /**
     * Places an order on the book
     * @param order A non-null, defined Order object to add
     */
    pushOrder(order: Order): void {
        switch (order.direction) {
            case TradeDirection.BUY:
                this.buys.push(order);
                break;
            case TradeDirection.SELL:
                this.sells.push(order);
                break;
        }
    }

    getLockedAssets(account: Account): [Big, Big] {
        const pendingOrders = this.getPendingOrders(account);
        const buy = pendingOrders.buy;
        const sell = pendingOrders.sell;

        const a1 = sell
            .map(it => it.spendAmount)
            .reduce((a, b) => a.plus(b), new Big("0"));
        const a2 = buy
            .map(it => it.spendAmount)
            .reduce((a, b) => a.plus(b), new Big("0"));
        return [a1, a2];
    }

    /**
     * Matches the order param with orders from the book until no more can be made
     * then adds the order to the book if it has any remaining quantity.
     * @param order Should be a defined, non-null Order object. Otherwise, will throw error.
     */
    place(order: Order): void {
        const validDirections = [TradeDirection.BUY, TradeDirection.SELL];
        if (!validDirections.includes(order.direction))
            throw `Unrecognised TradeDirection: ${order.direction}`;

        this.selfTradeGuard(order);
        InstrumentBroker.updatePositionOnPlaceOrder(this.instrument, order);
        this.makeTrades(order);
        if (order.units.gt(new Big("0"))) {
            this.pushOrder(order);
        }
    }

    cancel(order: Order): void {
        switch (order.direction) {
            case TradeDirection.BUY:
                return this.cancelBuy(order);
            case TradeDirection.SELL:
                return this.cancelSell(order);
        }
    }

    private getPendingBuys(account: Account): Array<Order> {
        return this.buys
            .underlying()
            .filter(order => order.account.id === account.id);
    }

    private getPendingSells(account: Account): Array<Order> {
        return this.sells
            .underlying()
            .filter(order => order.account.id === account.id);
    }

    /**
     * Checks the first order on the buy and sell lists and removes them if there's no units left
     */
    private clearCompletedOrders(): void {
        const buy = this.buys.min();
        if (buy != null && buy.units.lte(new Big("0"))) {
            this.buys.delete(buy);
        }

        const sell = this.sells.min();
        if (sell != null && sell.units.lte(new Big("0"))) {
            this.sells.delete(sell);
        }
    }

    /**
     * @param order A non-null, defined Order object that we want to find a match for
     * @returns {Order} The best-priced, oldest buy/sell order (opposite direction to order parameter)
     */
    private getPotentialOrderMatch(order: Order): Order | undefined {
        switch (order.direction) {
            case TradeDirection.BUY:
                return this.sells.min();
            case TradeDirection.SELL:
                return this.buys.min();
        }
    }

    /**
     * Repeatedly match an order with orders form the book, reducing the
     * @param order Must be
     */
    private makeTrades(order: Order): void {
        let match = this.getPotentialOrderMatch(order);
        while (match != null && InstrumentBroker.tradePossible(order, match)) {
            const trade = InstrumentBroker.makeTrade(this.instrument, order, match);
            this.trades.push(trade);

            this.clearCompletedOrders();
            match = this.getPotentialOrderMatch(order);
        }
    }

    private cancelBuy(order: Order): void {
        if (!this.buys.includes(order)) throw "Order was not pending";
        this.buys.delete(order);
        InstrumentBroker.updatePositionOnCancelOrder(this.instrument, order);
    }

    private cancelSell(order: Order): void {
        if (!this.sells.includes(order)) throw "Order was not pending";
        this.sells.delete(order);
        InstrumentBroker.updatePositionOnCancelOrder(this.instrument, order);
    }

    private selfTradeGuard(order: Order): void {
        switch (order.direction) {
            case TradeDirection.BUY:
                return this.selfTradeBuyingGuard(order);
            case TradeDirection.SELL:
                return this.selfTradeSellingGuard(order);
        }
    }

    private selfTradeBuyingGuard(buy: Order): void {
        const bestSell = this.sells
            .underlying()
            .find(sell => buy.account.id === sell.account.id);

        if (bestSell != null && buy.unitPrice.gte(bestSell.unitPrice)) {
            throw `Would cause self-trade. Buy order placed @ ${buy.unitPrice}, sell exists @ ${bestSell.unitPrice}`;
        }
    }

    private selfTradeSellingGuard(sell: Order): void {
        const bestBuy = this.buys
            .underlying()
            .find(buy => buy.account.id === sell.account.id);

        if (bestBuy != null && bestBuy.unitPrice.gte(sell.unitPrice)) {
            throw `Would cause self-trade. Sell order placed @ ${sell.unitPrice}, buy exists @ ${bestBuy.unitPrice}`;
        }
    }

    getAggregatePrices(): PriceAggregate {
        const aggregateBuys: Array<PriceAggregateElement> = this.aggregateOrders(this.buys.underlying());
        const aggregateSells: Array<PriceAggregateElement> = this.aggregateOrders(this.sells.underlying());
        return new PriceAggregate(aggregateBuys, aggregateSells)
    }

    getMarketPrice(): Big {
        if (this.trades.length === 0) return Big("0");
        return this.trades[this.trades.length - 1].unitPrice;
    }

    private aggregateOrders(orders: Array<Order>): Array<PriceAggregateElement> {
        const reducer = (acc: Array<PriceAggregateElement>, order: Order) => {
            if (acc.length === 0) {
                acc.push(new PriceAggregateElement(order.unitPrice, order.units));
                return acc;
            }

            const last = acc[acc.length - 1];
            if (order.unitPrice.eq(last.unitPrice)) {
                last.units = last.units.plus(order.units);
                return acc;
            } else {
                acc.push(new PriceAggregateElement(order.unitPrice, order.units));
                return acc;
            }
        };

        return orders.reduce(reducer, []);
    }

    clear(): void {
        this.buys.underlying().length = 0;
        this.sells.underlying().length = 0;
        this.trades.length = 0;
    }
}
