import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk"
import {State} from "../state/store/RootStore";

export function FuncToThunk<T extends Action<any>>(createAction: (state: State) => T): ActionCreator<ThunkAction<void, State, {}, T>>{
    return (dispatch, state) => {
        return dispatch(
            createAction(state)
        )
    }
}
