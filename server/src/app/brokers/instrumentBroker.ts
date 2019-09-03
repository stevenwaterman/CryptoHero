import SortedList from "./sortedList";
import Trade from "../trading/trade";
import {buyComparator, sellComparator} from "./comparators";
import {Big} from "big.js";
import Order from "../trading/order";
import TradeDirection from "../trading/tradeDirection";
import PriceAggregate, {PriceAggregateElement} from "./priceAggregate";
import {OrderState} from "../trading/orderState";
import account from "../trading/account";
import PricePoint from "./PricePoint";


/**
 * The matcher accepts orders and matches them to create trades
 */
export default class InstrumentBroker {
    private readonly buys: SortedList<Order> = new SortedList(buyComparator);
    private readonly sells: SortedList<Order> = new SortedList(sellComparator);
    private lastPrice: Big = new Big("0");
    private priceHistory: Array<PricePoint> = [];

    private static sortOrders(order: Order, matched: Order): [Order, Order] {
        const buy = order.direction === TradeDirection.BUY ? order : matched;
        const sell = matched.direction === TradeDirection.SELL ? matched : order;
        return [buy, sell]
    }

    /**
     * Performs a trade on two matched orders. Adjusts the units of the two orders.
     * @param order The new order. Must be defined + not null
     * @param matched The old order from the book. Must be define + not null
     * @returns {Big} The price that the trade executed at
     */
    private static makeTrade(
        order: Order,
        matched: Order
    ): Big {
        const [buy, sell] = InstrumentBroker.sortOrders(order, matched);
        const unitPrice = matched.unitPrice;
        const units = InstrumentBroker.getUnitsTraded(order, matched);
        const trade = new Trade(buy.account, sell.account, units, unitPrice);
        buy.trades.push(trade);
        sell.trades.push(trade);
        InstrumentBroker.updateStateIfComplete(order);
        InstrumentBroker.updateStateIfComplete(matched);
        InstrumentBroker.updatePositionOnTrade(buy, sell, units, unitPrice);
        return unitPrice;
    }

    /**
     * Tells you whether a trade can be done between two orders.
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
        {account, spentAsset, gainedAsset, originalExpectedAmount, direction, originallyLocked: amountToLock}: Order
    ): void {
        const spentAssetPosition = account.getAvailableAssets(spentAsset);
        if (spentAssetPosition.lt(amountToLock)) {
            throw `Account cannot afford ${amountToLock}${spentAsset.name}, only has ${spentAssetPosition}`;
        }

        if(direction === TradeDirection.SELL && originalExpectedAmount.lt(new Big("0"))){
            //Selling at negative price
            const gainedAssetPosition = account.getAvailableAssets(gainedAsset);
            const gainedAssetSpend = new Big("0").sub(originalExpectedAmount);
            if (gainedAssetPosition.lt(gainedAssetSpend)) {
                throw `Account cannot afford ${gainedAssetSpend}${gainedAsset.name}, only has ${gainedAssetPosition}`;
            }
            account.adjustAssets(gainedAsset, originalExpectedAmount);
        }


        const negativeAdjustment = new Big("0").minus(amountToLock);
        account.adjustAssets(spentAsset, negativeAdjustment);
    }

    private static updatePositionOnCancelOrder(
        {account, spentAsset,gainedAsset,originalExpectedAmount, direction,originallyLocked, ...rest}: Order
    ): void {

        const fractionRemaining: Big = rest.getRemainingFraction();
        const amountOfSpentAssetToUnlock: Big = originallyLocked.mul(fractionRemaining);
        account.adjustAssets(spentAsset, amountOfSpentAssetToUnlock);

        if(direction === TradeDirection.SELL && originalExpectedAmount.lt(new Big("0"))){
            //Selling at negative price
            const amountOfGainedAssetToUnlock: Big = originalExpectedAmount.mul(fractionRemaining);
            const negative = new Big("0").sub(amountOfGainedAssetToUnlock);
            account.adjustAssets(gainedAsset, negative);
        }
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
        {account, gainedAsset, unitPrice, spentAsset}: Order,
        actualUnits: Big,
        actualUnitPrice: Big
    ): void {
        if(actualUnitPrice.gt(new Big("0"))){
            //Selling for positive price, no assets were locked
            const gainedAmount = actualUnits.mul(actualUnitPrice);
            account.adjustAssets(gainedAsset, gainedAmount);
        } else if(actualUnitPrice.lt(new Big("0"))){
            //Selling for negative price, if they sold for more than expect then some refund needed
            const expectedGain = actualUnits.mul(unitPrice); //Negative number
            const actualGain = actualUnits.mul(actualUnitPrice); //Negative number, higher (closer to 0) than expectedGain
            const refundDue = expectedGain.minus(actualGain); // (-e) - (-a) = +delta
            account.adjustAssets(gainedAsset, refundDue);
        } else{
            //Selling for 0, so no need to adjust assets
        }
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

    getPriceHistory(): Array<PricePoint>{
        return this.priceHistory;
    }

    /**
     * Matches the order param with orders from the book until no more can be made
     * then adds the order to the book if it has any remaining quantity.
     * @param order Should be a defined, non-null Order object. Otherwise, will throw error.
     */
    place(order: Order): void {
        this.selfTradeGuard(order);
        InstrumentBroker.updatePositionOnPlaceOrder(order);
        this.makeTrades(order);
        if (order.getRemainingUnits().gt(new Big("0"))) {
            this.pushOrder(order);
        }
        order.account.orders.push(order);
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
        while (order.state === OrderState.PENDING && match != null && InstrumentBroker.tradePossible(order, match)) {
            this.lastPrice = InstrumentBroker.makeTrade(order, match);
            this.priceHistory.push(new PricePoint(new Date().getTime(), this.lastPrice));
            this.clearCompletedOrders();
            match = this.getPotentialOrderMatch(order);
        }
    }

    private cancelBuy(order: Order): void {
        if (!this.buys.includes(order)) throw "Order was not pending";
        order.state = OrderState.CANCELLED;
        this.buys.delete(order);
        InstrumentBroker.updatePositionOnCancelOrder(order);
    }

    private cancelSell(order: Order): void {
        if (!this.sells.includes(order)) throw "Order was not pending";
        order.state = OrderState.CANCELLED;
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
                acc.push(new PriceAggregateElement(order.unitPrice, last.units.plus(order.getRemainingUnits())));
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
