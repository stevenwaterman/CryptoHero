import {FuncToThunk} from "../../../../../util/FuncToThunk";

interface IPayload {
    newText: string,
}

export const TradeModalSetUnitsTextType: string = "TRADE_SET_UNITS_TEXT";

export default interface ITradeModalSetUnitsTextAction {
    type: typeof TradeModalSetUnitsTextType
    payload: IPayload
}

export class TradeModalSetUnitsTextAction {
    static fire = (newText: string) => FuncToThunk(() => TradeModalSetUnitsTextAction.create(newText));

    private static create(newText: string): ITradeModalSetUnitsTextAction {
        return {
            type: TradeModalSetUnitsTextType,
            payload: {
                newText: newText
            }
        }
    }
}