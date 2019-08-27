import {State} from "../../../store/RootStore";

interface IPayload {
    price: number,
    units: number
}

export const ConfirmTradeType: string = "TRADE_CONFIRM";

export default interface ConfirmTradeAction {
    type: typeof ConfirmTradeType
    payload: IPayload
}

export function createConfirmTradeAction(state: State): ConfirmTradeAction {
    return {
        type: ConfirmTradeType,
        payload: {
            price: state.tradeModalInput.price,
            units: state.tradeModalInput.units
        }
    }
}