import {FuncToThunk} from "../../../../../util/FuncToThunk";

interface IPayload {
    newText: string,
}

export const TradeModalSetPercentTextType: string = "TRADE_SET_PERCENT_TEXT";

export default interface ITradeModalSetPercentTextAction {
    type: typeof TradeModalSetPercentTextType
    payload: IPayload
}

export class TradeModalSetPercentTextAction {
    static fire = (newText: string) => FuncToThunk(() => TradeModalSetPercentTextAction.create(newText));

    private static create(newText: string): ITradeModalSetPercentTextAction {
        return {
            type: TradeModalSetPercentTextType,
            payload: {
                newText: newText
            }
        }
    }
}