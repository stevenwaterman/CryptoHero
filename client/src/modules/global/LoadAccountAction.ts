import {State} from "../RootStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk"
import {createSetAvailableFundsAction} from "../components/availableFunds/SetAvailableFundsAction";
import {createSetPricesAction} from "../components/instruments/SetPricesAction";
import Instrument from "../../models/Instrument";
import Order from "../../models/Order";
import {createSetOrdersAction} from "../components/blotter/SetOrdersAction";
import {Action} from "redux";
import {createSetSelectedAccountAction} from "./SetSelectedAccountAction";
import {createSetOrderDepthDataAction} from "../components/chart/SetOrderDepthDataAction";
import {createSetPriceHistoryAction} from "../components/chart/SetPriceHistoryAction";
import {IOrderDepth, OrderDepth} from "../../models/OrderDepth";
import {createIPriceHistory, PriceHistory} from "../../models/PriceHistory";
import Big, {BigSource} from "big.js";

export const LoadAccountType = "LOAD_ACCOUNT";

export interface LoadAccountAction {
    type: typeof LoadAccountType,
    payload: {
        accountId: string
    }
}

export const createLoadAction = (accountId: string): ThunkAction<Promise<void>, State, void, Action<any>> => {
    return async (dispatch: ThunkDispatch<State, void, Action<any>>, getState: () => State): Promise<void> => {
        await inner(accountId, dispatch, getState())
    }
};

export const createReloadAction = (): ThunkAction<Promise<void>, State, void, Action<any>> => {
    return async (dispatch: ThunkDispatch<State, void, Action<any>>, getState: () => State): Promise<void> => {
        const state = getState();
        await inner(state.account.selectedId, dispatch, state)
    }
};

async function inner(accountId: string, dispatch: ThunkDispatch<State, void, Action<any>>, state: State): Promise<void> {
    const response: Response = await fetch(`http://localhost:4000/api/account/${accountId}/state`, {
        method: "GET",
        headers: {},
    });

    const accountState: any = await response.json();

    const orders: Array<Order> = accountState.orders.map((it: any) => Order.create(it));
    const funds: Map<string, Big> = new Map(
        Object.entries(accountState.funds).map(([asset, price]) =>
            [asset,
                Big(price as BigSource)]
        )
    );
    const prices: Map<Instrument, Big> = new Map(
        Object.entries(accountState.prices).map(([instrumentName, price]) =>
            [Instrument.fromName(instrumentName),
                Big(price as BigSource)]
        )
    );

    const orderDepth: OrderDepth = new Map(
        Object.entries(accountState.orderDepth)
            .map(([instrument, priceAggregate]: [string, any]) =>
                [
                    instrument,
                    IOrderDepth.fromServer(priceAggregate)
                ]
            )
    );

    const priceHistory: PriceHistory = new Map(
        Object.entries(accountState.priceHistory)
            .map(([instrument, priceHistory]: [string, any]) =>
                [
                    instrument,
                    createIPriceHistory(priceHistory)
                ]
            )
    );

    dispatch(createSetSelectedAccountAction(state, accountId));
    dispatch(createSetAvailableFundsAction(state, funds));
    dispatch(createSetPricesAction(state, prices));
    dispatch(createSetOrdersAction(state, orders));
    dispatch(createSetOrderDepthDataAction(state, orderDepth));
    dispatch(createSetPriceHistoryAction(state, priceHistory));
}