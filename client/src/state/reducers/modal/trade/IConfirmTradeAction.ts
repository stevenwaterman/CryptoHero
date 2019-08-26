import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    price: number,
    units: number
}

export const ConfirmTradeType: string = "TRADE_CONFIRM";

export default interface IConfirmTradeAction {
    type: typeof ConfirmTradeType
    payload: IPayload
}

export class ConfirmTradeAction {
    static fire = FuncToThunk((state) => ConfirmTradeAction.create(state.tradeModalInput.price, state.tradeModalInput.units));

    private static create(price: number, units: number): IConfirmTradeAction {
        return {
            type: ConfirmTradeType,
            payload: {
                price: price,
                units: units
            }
        }
    }
}