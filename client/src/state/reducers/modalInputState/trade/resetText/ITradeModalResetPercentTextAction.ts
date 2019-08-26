import {FuncToThunk} from "../../../../../util/FuncToThunk";

export const TradeModalResetPercentTextType: string = "TRADE_RESET_PERCENT_TEXT";

export default interface ITradeModalResetPercentTextAction {
    type: typeof TradeModalResetPercentTextType
}

export class TradeModalResetPercentTextAction {
    static fire = () => FuncToThunk(() => TradeModalResetPercentTextAction.create());

    private static create(): ITradeModalResetPercentTextAction {
        return {
            type: TradeModalResetPercentTextType,
        }
    }
}