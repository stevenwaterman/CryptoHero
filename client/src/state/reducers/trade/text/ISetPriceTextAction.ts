import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    newText: string,
}

export const SetPriceTextType: string = "TRADE_SET_PRICE_TEXT";

export default interface ISetPriceTextAction {
    type: typeof SetPriceTextType
    payload: IPayload
}

export class SetPriceTextAction {
    static fire = (newText: string) => FuncToThunk(() => SetPriceTextAction.create(newText));

    private static create(newText: string): ISetPriceTextAction {
        return {
            type: SetPriceTextType,
            payload: {
                newText: newText
            }
        }
    }
}