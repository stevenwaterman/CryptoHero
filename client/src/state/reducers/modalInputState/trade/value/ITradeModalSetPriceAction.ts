import {FuncToThunk} from "../../../../../util/FuncToThunk";
import {maxTradeUnits} from "../../../../../util/MaxTradeUnits";

interface IPayload {
    price: number,
    maxUnits: number | null
}

export const TradeModalSetPriceType: string = "TRADE_SET_PRICE";

export default interface ITradeModalSetPriceAction {
    type: typeof TradeModalSetPriceType
    payload: IPayload
}

export class TradeModalSetPriceAction {
    static fire = (price: number) => FuncToThunk(state => {
        const maxUnits = maxTradeUnits(state, price);
        return TradeModalSetPriceAction.create(price, maxUnits);
    });

    private static create(price: number, maxUnits: number | null): ITradeModalSetPriceAction {
        return {
            type: TradeModalSetPriceType,
            payload: {
                price: price,
                maxUnits: maxUnits
            }
        }
    }
}