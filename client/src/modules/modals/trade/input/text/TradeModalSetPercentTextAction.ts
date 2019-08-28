import {State} from "../../../../RootStore";

interface IPayload {
    newText: string,
}

export const TradeModalSetPercentTextType: string = "TRADE_SET_PERCENT_TEXT";

export default interface TradeModalSetPercentTextAction {
    type: typeof TradeModalSetPercentTextType
    payload: IPayload
}

export function createTradeModalSetPercentTextAction(state: State, newText: string): TradeModalSetPercentTextAction {
    return {
        type: TradeModalSetPercentTextType,
        payload: {
            newText: newText
        }
    }
}