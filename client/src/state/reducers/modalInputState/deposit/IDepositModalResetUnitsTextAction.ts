import {FuncToThunk} from "../../../../util/FuncToThunk";

export const DepositModalResetUnitsTextType: string = "DEPOSIT_RESET_UNITS_TEXT";

export default interface IDepositModalResetUnitsTextAction {
    type: typeof DepositModalResetUnitsTextType
}

export class DepositModalResetUnitsTextAction {
    static fire = () => FuncToThunk(() => DepositModalResetUnitsTextAction.create());

    private static create(): IDepositModalResetUnitsTextAction {
        return {
            type: DepositModalResetUnitsTextType,
        }
    }
}