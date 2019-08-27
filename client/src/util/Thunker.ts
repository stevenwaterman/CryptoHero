import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk"
import {State} from "../state/store/RootStore";

export type ThunkDsp<A extends Action<any>> = ThunkDispatch<State, void, A>
export type ActCreator<A extends Action<any>, P> = (state: State, param: P, dispatch: ThunkDsp<A>) => A | null;
export type ThunkAct<A extends Action<any>> = ThunkAction<void, State, void, A>

export function fire<P, A extends Action<any>>(dispatch: ThunkDsp<A>, creator: ActCreator<A, P>): (params: P) => void {
    return (params: P) => {
        const thunkAction = actionCreator(creator)(params);
        dispatch(thunkAction);
    }
}

export function fireNP<A extends Action<any>>(dispatch: ThunkDsp<A>, creator: ActCreator<A, null>): () => void {
    const func = fire<null, A>(dispatch, creator);
    return () => func(null);
}

function actionCreator<P, A extends Action<any>>(creator: ActCreator<A, P>): (params: P) => ThunkAct<A> {
    return (params: P) => (dispatch, getState) => {
        const action = creator(getState(), params, dispatch);
        if (action != null) {
            dispatch(action);
        }
    }
}
