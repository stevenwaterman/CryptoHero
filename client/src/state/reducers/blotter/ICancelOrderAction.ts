import {FuncToThunk} from "../../../util/FuncToThunk";
import {State} from "../../store/RootStore";

interface IPayload {
    id: string
}

export const CancelOrderType: string = "CANCEL_ORDER";

export default interface ICancelOrderAction {
    type: typeof CancelOrderType,
    payload: IPayload
}

export class CancelOrderAction {
    static fire = (state: State) => FuncToThunk(() => CancelOrderAction.create(state.viewTradeModal.id));

    private static create(id: string): ICancelOrderAction {
        return {
            type: CancelOrderType,
            payload: {
                id: id
            }
        }
    }
}