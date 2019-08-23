import {FuncToThunk} from "../../../util/FuncToThunk";

interface IPayload {
}

export const ConfirmTradeType: string = "TRADE_CONFIRM";

export default interface IConfirmTradeAction {
    type: typeof ConfirmTradeType
    payload: IPayload
}

export class ConfirmTradeAction {
    static fire = FuncToThunk(() => ConfirmTradeAction.create());
    private static create(): IConfirmTradeAction {
        return {
            type: ConfirmTradeType,
            payload: {}
        }
    }
}