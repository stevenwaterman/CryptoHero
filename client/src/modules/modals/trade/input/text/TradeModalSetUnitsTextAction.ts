import {State} from "../../../../RootStore";

export const TradeModalSetUnitsTextType: string = "TRADE_SET_UNITS_TEXT";

export default interface TradeModalSetUnitsTextAction {
    type: typeof TradeModalSetUnitsTextType
    payload: {
        newText: string,
    }
}

export function createTradeModalSetUnitsTextAction(state: State, newText: string): TradeModalSetUnitsTextAction {
    return {
        type: TradeModalSetUnitsTextType,
        payload: {
            newText: newText
        }
    }
}