import {State} from "../../store/RootStore";

interface IPayload {
    id: string
}

export const CancelOrderType: string = "CANCEL_ORDER";

export default interface CancelOrderAction {
    type: typeof CancelOrderType,
    payload: IPayload
}

export function createCancelOrderAction(state: State): CancelOrderAction {
    return {
        type: CancelOrderType,
        payload: {
            id: state.viewTradeModal.trade.id
        }
    }
}