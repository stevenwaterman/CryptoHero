import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk"
import RootStore, {State} from "../state/store/RootStore";

export function fire<P, A extends Action<any>>(dispatch: ThunkDispatch<State, void, A>, create: (state: State, param: P) => A | null): (params: P) => void {
    return (params: P) => {
        const creator: ThunkAction<A | null, State, void, A> = actionCreator(create)(params);

        const action: A | null = dispatch(creator);
        if (action != null) {
            RootStore.dispatch(action)
        }
    }
}

function actionCreator<P, A extends Action<any>>(creatorFunction: (state: State, params: P) => A | null): (params: P) => ThunkAction<A | null, State, void, A> {
    return (params) => (dispatch, getState) => creatorFunction(getState(), params)
}

export function fireNP<A extends Action<any>>(dispatch: ThunkDispatch<State, void, A>, create: (state: State) => A | null): () => void {
    return () => {
        const creator: ThunkAction<A | null, State, void, A> = actionCreatorNP(create)();

        const action: A | null = dispatch(creator);
        if (action != null) {
            RootStore.dispatch(action)
        }
    }
}

function actionCreatorNP<A extends Action<any>>(creatorFunction: (state: State) => A | null): () => ThunkAction<A | null, State, void, A> {
    return () => (dispatch, getState) => creatorFunction(getState())
}