import {FuncToThunk} from "../../../../../util/FuncToThunk";

export const TradeModalResetUnitsTextType: string = "TRADE_RESET_UNITS_TEXT";

export default interface ITradeModalResetUnitsTextAction {
    type: typeof TradeModalResetUnitsTextType
}

export class TradeModalResetUnitsTextAction {
    static fire = () => FuncToThunk(() => TradeModalResetUnitsTextAction.create());

    private static create(): ITradeModalResetUnitsTextAction {
        return {
            type: TradeModalResetUnitsTextType,
        }
    }
}