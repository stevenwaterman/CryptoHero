import SortedList from "./sortedList";
import Trade from "../trading/trade";
import {buyComparator, sellComparator} from "./comparators";
import {Big} from "big.js";
import Instrument from "../trading/instrument";
import Order from "../trading/order";
import TradeDirection from "../trading/tradeDirection";
import Account from "../trading/account";
import PriceAggregate, {PriceAggregateElement} from "./priceAggregate";
import {OrderState} from "../trading/orderState";



/**
 * The matcher accepts orders and matches them to create trades
 */
export default class InstrumentBroker {
    private readonly buys: SortedList<Order> = new SortedList(buyComparator);
    private readonly sells: SortedList<Order> = new SortedList(sellComparator);
    private lastPrice: Big = new Big("0");

    private static sortOrders(order: Order, matched: Order): [Order, Order] {
        const buy = order.direction === TradeDirection.BUY ? order : matched;
        const sell = matched.direction === TradeDirection.SELL ? matched : order;
        return [buy, sell]
    }

    /**
     * Performs a tradeModal on two matched orders. Adjusts the units of the two orders.
     * @param order The new order. Must be defined + not null
     * @param matched The old order from the book. Must be define + not null
     * @returns {Trade} The tradeModal produced from matching the orders.
     */
    private static makeTrade(
        order: Order,
        matched: Order
    ): void {
        const [buy, sell] = InstrumentBroker.sortOrders(order, matched);
        const unitPrice = matched.unitPrice;
        const units = InstrumentBroker.getUnitsTraded(order, matched);
        const trade = new Trade(buy.account, sell.account, units, unitPrice);
        buy.trades.push(trade);
        sell.trades.push(trade);
        InstrumentBroker.updateStateIfComplete(order);
        InstrumentBroker.updateStateIfComplete(matched);
        InstrumentBroker.updatePositionOnTrade(buy, sell, units, unitPrice);
    }

    /**
     * Tells you whether a tradeModal can be done between two orders.
     * One of the orders must be a buy, the other must be a sell.
     */
    private static tradePossible(order: Order, matched: Order): boolean {
        const [buy, sell] = InstrumentBroker.sortOrders(order, matched);
        return buy.unitPrice.gte(sell.unitPrice);
    }

    /**
     * Determines how many units can be traded between two matched orders.
     * @param o1 Must be a defined, NonNull Order
     * @param o2 Must be a defined, NonNull Order
     * @returns {Big} The number of units that can be traded between the two orders
     */
    private static getUnitsTraded(o1: Order, o2: Order): Big {
        const o1Units = o1.getRemainingUnits();
        const o2Units = o2.getRemainingUnits();
        if (o1Units.lt(o2Units)) {
            return o1Units;
        } else {
            return o2Units;
        }
    }

    private static updatePositionOnPlaceOrder(
        {account, spentAsset: assetToLock, originallyLocked: amountToLock}: Order
    ): void {
        const position = account.getAvailableAssets(assetToLock);
        if (position.lt(amountToLock)) {
            throw `Account cannot afford ${amountToLock}${assetToLock.name}, only has ${position}`;
        }

        const negativeAdjustment = new Big("0").minus(amountToLock);
        account.adjustAssets(assetToLock, negativeAdjustment);
    }

    private static updatePositionOnCancelOrder(
        {account, spentAsset: assetToUnlock, originallyLocked, ...rest}: Order
    ): void {

        const fractionRemaining: Big = rest.getRemainingFraction();
        const amountToUnlock: Big = originallyLocked.mul(fractionRemaining);
        account.adjustAssets(assetToUnlock, amountToUnlock);
    }

    private static updatePositionOnBuy(
        {account, gainedAsset, unitPrice}: Order,
        actualUnits: Big,
        actualUnitPrice: Big
    ): void {
        account.adjustAssets(gainedAsset, actualUnits);

        const expectedSpend = actualUnits.mul(unitPrice);
        const actuallySpent = actualUnits.mul(actualUnitPrice);
        const refundDue = expectedSpend.minus(actuallySpent);
        account.adjustAssets(gainedAsset, refundDue);
    }

    private static updatePositionOnTrade(
        buyOrder: Order,
        sellOrder: Order,
        units: Big,
        unitPrice: Big
    ): void {
        InstrumentBroker.updatePositionOnBuy(buyOrder, units, unitPrice);
        InstrumentBroker.updatePositionOnSell(sellOrder, units, unitPrice);
    }

    private static updatePositionOnSell(
        {account, gainedAsset}: Order,
        actualUnits: Big,
        actualUnitPrice: Big
    ): void {
        const gainedAmount = actualUnits.mul(actualUnitPrice);
        account.adjustAssets(gainedAsset, gainedAmount);
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
        InstrumentBroker.updatePositionOnPlaceOrder(order);
        this.makeTrades(order);
        if (order.getRemainingUnits().gt(new Big("0"))) {
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

    /**
     * Checks the first order on the buy and sell lists and removes them if there's no units left
     */
    private clearCompletedOrders(): void {
        const shouldDelete = (order: Order) => order.state === OrderState.COMPLETE;
        this.buys.deleteFirstIf(shouldDelete);
        this.sells.deleteFirstIf(shouldDelete);
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
            InstrumentBroker.makeTrade(order, match);
            this.clearCompletedOrders();
            match = this.getPotentialOrderMatch(order);
        }
    }

    private cancelBuy(order: Order): void {
        if (!this.buys.includes(order)) throw "Order was not pending";
        this.buys.delete(order);
        InstrumentBroker.updatePositionOnCancelOrder(order);
    }

    private cancelSell(order: Order): void {
        if (!this.sells.includes(order)) throw "Order was not pending";
        this.sells.delete(order);
        InstrumentBroker.updatePositionOnCancelOrder(order);
    }

    private selfTradeGuard(order: Order): void {
        switch (order.direction) {
            case TradeDirection.BUY:
                return this.selfTradeBuyingGuard(order);
            case TradeDirection.SELL:
                return this.selfTradeSellingGuard(order);
        }
    }

    getMarketPrice(): Big {
        return this.lastPrice;
    }

    private selfTradeBuyingGuard(buy: Order): void {
        const bestSell = this.sells
            .underlying()
            .find(sell => buy.account.id === sell.account.id);

        if (bestSell != null && buy.unitPrice.gte(bestSell.unitPrice)) {
            throw `Would cause self-trade. Buy order placed @ ${buy.unitPrice}, sell exists @ ${bestSell.unitPrice}`;
        }
    }

    getAggregatePrices(): PriceAggregate {
        const aggregateBuys: Array<PriceAggregateElement> = this.aggregateOrders(this.buys.underlying());
        const aggregateSells: Array<PriceAggregateElement> = this.aggregateOrders(this.sells.underlying());
        return new PriceAggregate(aggregateBuys, aggregateSells)
    }

    private selfTradeSellingGuard(sell: Order): void {
        const bestBuy = this.buys
            .underlying()
            .find(buy => buy.account.id === sell.account.id);

        if (bestBuy != null && bestBuy.unitPrice.gte(sell.unitPrice)) {
            throw `Would cause self-trade. Sell order placed @ ${sell.unitPrice}, buy exists @ ${bestBuy.unitPrice}`;
        }
    }

    private aggregateOrders(orders: Array<Order>): Array<PriceAggregateElement> {
        const reducer = (acc: Array<PriceAggregateElement>, order: Order) => {
            if (acc.length === 0) {
                acc.push(new PriceAggregateElement(order.unitPrice, order.getRemainingUnits()));
                return acc;
            }

            const last = acc[acc.length - 1];
            if (order.unitPrice.eq(last.unitPrice)) {
                last.units = last.units.plus(order.getRemainingUnits());
                return acc;
            } else {
                acc.push(new PriceAggregateElement(order.unitPrice, order.getRemainingUnits()));
                return acc;
            }
        };

        return orders.reduce(reducer, []);
    }

    clear(): void {
        this.buys.underlying().length = 0;
        this.sells.underlying().length = 0;
    }

    private static updateStateIfComplete(order: Order): void {
        const remaining = order.getRemainingUnits();
        if(remaining.eq(new Big("0"))){
            order.state = OrderState.COMPLETE;
        }
    }
}
