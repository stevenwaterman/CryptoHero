import {FuncToThunk} from "../../../../util/FuncToThunk";
import {ThunkAction} from "redux-thunk";
import {State} from "../../../store/RootStore";
import {maxTradeUnits} from "./MaxTradeUnits";

interface IPayload {
    newPrice: number,
    newPercent: number | null
}

export const SetPriceType: string = "TRADE_SET_PRICE";

export default interface ISetPriceAction {
    type: typeof SetPriceType
    payload: IPayload
}

export class SetPriceAction {
    static fire(newPrice: number): ThunkAction<void, State, void, ISetPriceAction> {
        return ((dispatch, getState: () => State) => {
            const state: State = getState();
            const maximumUnits = maxTradeUnits(state, newPrice);

            let newPercent = null;
            if (maximumUnits !== null) {
                newPercent = 100 * state.trade.units / maximumUnits
            }

            const action = SetPriceAction.create(newPrice, newPercent);
            dispatch(action);
        })
    }

    private static create(newPrice: number, newPercent: number | null): ISetPriceAction{
        return {
            type: SetPriceType,
            payload: {
                newPrice: newPrice,
                newPercent: newPercent
            }
        }
    }
}