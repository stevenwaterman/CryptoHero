import {State} from "../RootStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk"
import {createSetAvailableFundsAction} from "../components/availableFunds/SetAvailableFundsAction";
import {createSetPricesAction} from "../components/instruments/SetPricesAction";
import Instrument from "../../models/Instrument";
import Order from "../../models/Order";
import {createSetOrdersAction} from "../components/blotter/SetOrdersAction";
import {Action} from "redux";
import {createSetSelectedAccountAction} from "./SetSelectedAccountAction";

export const LoadAccountType = "LOAD_ACCOUNT";

export interface LoadAccountAction {
    type: typeof LoadAccountType,
    payload: {
        accountId: string
    }
}

export const createLoadAction = (accountId: string): ThunkAction<Promise<void>, State, void, Action<any>> => {
    return async (dispatch: ThunkDispatch<State, void, Action<any>>, getState: () => State): Promise<void> => {
        const response: Response = await fetch(`http://localhost:4000/api/account/${accountId}/state`, {
            method: "GET",
            headers: {},
        });

        const accountState: any = await response.json();

        const orders: Array<Order> = accountState.orders.map((it: any) => Order.create(it));
        const funds: Map<string, number> = new Map(
            Object.entries(accountState.funds).map(([asset, price]) =>
                [asset,
                    Number.parseFloat(price as string)]
            )
        );
        const prices: Map<Instrument, number> = new Map(
            Object.entries(accountState.prices).map(([instrumentName, price]) =>
                [Instrument.fromName(instrumentName),
                    Number.parseFloat(price as string)]
            )
        );

        const state = getState();
        dispatch(createSetAvailableFundsAction(state, funds));
        dispatch(createSetPricesAction(state, prices));
        dispatch(createSetOrdersAction(state, orders));
        dispatch(createSetSelectedAccountAction(state, accountId));
    }
};
