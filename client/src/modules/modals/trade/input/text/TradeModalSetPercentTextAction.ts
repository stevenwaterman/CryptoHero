import {State} from "../../../../RootStore";

export const TradeModalSetPercentTextType: string = "TRADE_SET_PERCENT_TEXT";

export default interface TradeModalSetPercentTextAction {
    type: typeof TradeModalSetPercentTextType
    payload: {
        newText: string,
    }
}

export function createTradeModalSetPercentTextAction(state: State, newText: string): TradeModalSetPercentTextAction {
    return {
        type: TradeModalSetPercentTextType,
        payload: {
            newText: newText
        }
    }
}