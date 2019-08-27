import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk"
import {State} from "../state/store/RootStore";

type Dispatch<A extends Action<any>> = ThunkDispatch<State, void, A>
type Creator<A extends Action<any>, P> = (state: State, param: P, dispatch: Dispatch<A>) => A | null;
type ThunkAct<A extends Action<any>> = ThunkAction<void, State, void, A>

export function fire<P, A extends Action<any>>(dispatch: Dispatch<A>, creator: Creator<A, P>): (params: P) => void {
    return (params: P) => {
        const thunkAction = actionCreator(creator)(params);
        dispatch(thunkAction);
    }
}

export function fireNP<A extends Action<any>>(dispatch: Dispatch<A>, creator: Creator<A, null>): () => void {
    const func = fire<null, A>(dispatch, creator);
    return () => func(null);
}

function actionCreator<P, A extends Action<any>>(creator: Creator<A, P>): (params: P) => ThunkAct<A> {
    return (params: P) => (dispatch, getState) => {
        const action = creator(getState(), params, dispatch);
        if (action != null) {
            dispatch(action);
        }
    }
}
