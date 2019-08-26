import {FuncToThunk} from "../../../../../util/FuncToThunk";

interface IPayload {
    newText: string,
}

export const TradeModalSetPriceTextType: string = "TRADE_SET_PRICE_TEXT";

export default interface ITradeModalSetPriceTextAction {
    type: typeof TradeModalSetPriceTextType
    payload: IPayload
}

export class TradeModalSetPriceTextAction {
    static fire = (newText: string) => FuncToThunk(() => TradeModalSetPriceTextAction.create(newText));

    private static create(newText: string): ITradeModalSetPriceTextAction {
        return {
            type: TradeModalSetPriceTextType,
            payload: {
                newText: newText
            }
        }
    }
}