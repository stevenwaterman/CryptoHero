import {FuncToThunk} from "../../../../util/FuncToThunk";

export const ResetUnitsTextType: string = "TRADE_RESET_UNITS_TEXT";

export default interface IResetUnitsTextAction {
    type: typeof ResetUnitsTextType
}

export class ResetUnitsTextAction {
    static fire = () => FuncToThunk(() => ResetUnitsTextAction.create());

    private static create(): IResetUnitsTextAction{
        return {
            type: ResetUnitsTextType,
        }
    }
}