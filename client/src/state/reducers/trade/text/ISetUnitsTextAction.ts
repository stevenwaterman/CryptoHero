import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    newText: string,
}

export const SetUnitsTextType: string = "TRADE_SET_UNITS_TEXT";

export default interface ISetUnitsTextAction {
    type: typeof SetUnitsTextType
    payload: IPayload
}

export class SetUnitsTextAction {
    static fire = (newText: string) => FuncToThunk(() => SetUnitsTextAction.create(newText));

    private static create(newText: string): ISetUnitsTextAction {
        return {
            type: SetUnitsTextType,
            payload: {
                newText: newText
            }
        }
    }
}