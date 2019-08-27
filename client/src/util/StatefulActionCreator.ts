import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk"
import {State} from "../state/store/RootStore";

export function fire<P, A extends Action<any>>(dispatch: ThunkDispatch<State, void, A>, create: (state: State, param: P) => A | null): (params: P) => void {
    return (params: P) => {
        const thunkAction = actionCreator(create)(params);
        dispatch(thunkAction);
    }
}

function actionCreator<P, A extends Action<any>>(creatorFunction: (state: State, params: P) => A | null): (params: P) => ThunkAction<void, State, void, A> {
    return (params: P) => (dispatch: ThunkDispatch<State, void, A>, getState: () => State) => {
        const action: A | null = creatorFunction(getState(), params);
        if (action != null) {
            dispatch(action);
        }
    }
}

export function fireNP<A extends Action<any>>(dispatch: ThunkDispatch<State, void, A>, create: (state: State) => A | null): () => void {
    return () => {
        const thunkAction = actionCreatorNP(create)();
        dispatch(thunkAction);
    }
}

function actionCreatorNP<A extends Action<any>>(creatorFunction: (state: State) => A | null): () => ThunkAction<void, State, void, A> {
    return () => (dispatch: ThunkDispatch<State, void, A>, getState: () => State) => {
        const action: A | null = creatorFunction(getState());
        if (action != null) {
            dispatch(action);
        }
    }
}