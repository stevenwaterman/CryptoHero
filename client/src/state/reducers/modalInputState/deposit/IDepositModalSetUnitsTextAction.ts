import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    newText: string,
}

export const DepositModalSetUnitsTextType: string = "DEPOSIT_SET_UNITS_TEXT";

export default interface IDepositModalSetUnitsTextAction {
    type: typeof DepositModalSetUnitsTextType
    payload: IPayload
}

export class DepositModalSetUnitsTextAction {
    static fire = (newText: string) => FuncToThunk(() => DepositModalSetUnitsTextAction.create(newText));

    private static create(newText: string): IDepositModalSetUnitsTextAction {
        return {
            type: DepositModalSetUnitsTextType,
            payload: {
                newText: newText
            }
        }
    }
}