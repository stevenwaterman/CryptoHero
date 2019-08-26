import {FuncToThunk} from "../../../../../util/FuncToThunk";

export const TradeModalResetPriceTextType: string = "TRADE_RESET_PRICE_TEXT";

export default interface ITradeModalResetPriceTextAction {
    type: typeof TradeModalResetPriceTextType
}

export class TradeModalResetPriceTextAction {
    static fire = () => FuncToThunk(() => TradeModalResetPriceTextAction.create());

    private static create(): ITradeModalResetPriceTextAction {
        return {
            type: TradeModalResetPriceTextType,
        }
    }
}