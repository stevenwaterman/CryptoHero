import SortedList from "./sortedList";
import {buyComparator, sellComparator, TradeDirection} from "./order";
import Trade from "./trade";

export default class Matcher{
    #buys = new SortedList(buyComparator);
    #sells = new SortedList(sellComparator);
    #trades = [];

    constructor(){ };

    place(order){
        const validDirections = [TradeDirection.BUY, TradeDirection.SELL];
        const direction = order.direction;
        if(validDirections.includes(order.direction)) throw `Unrecognised TradeDirection: ${order.direction}`;

        this.#makeTrades(order);

        if(order.units > 0){
            if(direction === TradeDirection.BUY){
                this.#buys.push(order);
            } else if(direction === TradeDirection.SELL){
                this.#sells.push(order);
            }
        }
    };

    getTrades = (account) => this.#trades.filter((trade) => trade.buyer === account || trade.seller === account);

    #makeTrades(){
        while(this.#canMakeTrade()){
            const trade = this.#makeTrade();
            this.#trades.push(trade);
            this.#clearCompletedOrders();
        }
    };

    #canMakeTrade(){
        const buy = this.#buys.min();
        const sell = this.#sells.min();
        if(!buy || !sell) return false;

        return buy.unitPrice >= sell.unitPrice;
    };

    #makeTrade(){
        const buy = this.#buys.min();
        const buyUnits = buy.units;

        const sell = this.#sells.min();
        const sellUnits = sell.units;

        const actualUnits = Math.min(buyUnits, sellUnits);
        buy.units -= actualUnits;
        sell.units -= actualUnits;

        return new Trade(buy.account, sell.account, actualUnits, buy.unitPrice);
    };

    #clearCompletedOrders() {
       const buy = this.#buys.min();
       if(buy.units <= 0){
           this.#buys.delete(buy);
       }

       const sell = this.#sells.min();
       if(sell.units <= 0){
           this.#sells.delete(sell);
       }
    }
}
