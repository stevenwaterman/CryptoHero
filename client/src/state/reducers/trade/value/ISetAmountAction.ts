import {ThunkAction} from "redux-thunk";
import {State} from "../../../store/RootStore";
import {maxTradeUnits} from "./MaxTradeUnits";

interface IPayload {
    editingUnits: boolean,
    units: number,
    percent: number | null
}

export const SetAmountType: string = "TRADE_SET_AMOUNT";

export default interface ISetAmountAction {
    type: typeof SetAmountType
    payload: IPayload
}

export class SetAmountAction {
    static fireWithPercent(newPercent: number): ThunkAction<void, State, void, ISetAmountAction> {
        return ((dispatch, getState: () => State) => {
            const state: State = getState();
            const maximumUnits = maxTradeUnits(state);
            if (maximumUnits === null) {
                return;
            }

            const newUnits = newPercent * maximumUnits / 100;

            const action = SetAmountAction.create(false, newUnits, newPercent);
            dispatch(action);
        })
    }

    static fireWithUnits(newUnits: number): ThunkAction<void, State, void, ISetAmountAction> {
        return ((dispatch, getState: () => State) => {
            const state: State = getState();
            const maximumUnits = maxTradeUnits(state);

            let newPercent = null;
            if (maximumUnits !== null) {
                newPercent = 100 * newUnits / maximumUnits;
            }

            const action = SetAmountAction.create(true, newUnits, newPercent);
            dispatch(action);
        })
    }

    private static create(editingUnits: boolean, newUnits: number, newPercent: number | null){
        return {
            type: SetAmountType,
            payload: {
                editingUnits: editingUnits,
                units: newUnits,
                percent: newPercent
            }
        }
    }
}