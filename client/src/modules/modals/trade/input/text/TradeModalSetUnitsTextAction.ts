import {State} from "../../../../RootStore";

interface IPayload {
    newText: string,
}

export const TradeModalSetUnitsTextType: string = "TRADE_SET_UNITS_TEXT";

export default interface TradeModalSetUnitsTextAction {
    type: typeof TradeModalSetUnitsTextType
    payload: IPayload
}

export function createTradeModalSetUnitsTextAction(state: State, newText: string): TradeModalSetUnitsTextAction {
    return {
        type: TradeModalSetUnitsTextType,
        payload: {
            newText: newText
        }
    }
}