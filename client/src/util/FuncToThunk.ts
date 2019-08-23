import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk"
import {State} from "../state/store/RootStore";

export function FuncToThunk<T extends Action<any>>(createAction: (state: State) => T | null): ActionCreator<ThunkAction<void, State, {}, T>>{
    return (dispatch, getState) => {
        const state = getState();
        const action = createAction(state);
        if(action == null){
            return;
        } else {
            return dispatch(action)
        }
    }
}
