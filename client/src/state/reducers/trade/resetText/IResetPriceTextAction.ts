import {FuncToThunk} from "../../../../util/FuncToThunk";

export const ResetPriceTextType: string = "TRADE_RESET_PRICE_TEXT";

export default interface IResetPriceTextAction {
    type: typeof ResetPriceTextType
}

export class ResetPriceTextAction {
    static fire = () => FuncToThunk(() => ResetPriceTextAction.create());

    private static create(): IResetPriceTextAction {
        return {
            type: ResetPriceTextType,
        }
    }
}