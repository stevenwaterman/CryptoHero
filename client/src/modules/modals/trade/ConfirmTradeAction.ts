import {State} from "../../RootStore";
import Order from "../../../models/Order";
import {ThunkDsp} from "../../../util/Thunker";
import Instrument from "../../../models/Instrument";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {LoadAccountAction, LoadAccountType} from "../../global/LoadAccountAction";
import {Action} from "redux";

interface IPayload {
    newOrder: Order
}

export const ConfirmTradeType: string = "TRADE_CONFIRM";

export default interface ConfirmTradeAction {
    type: typeof ConfirmTradeType
    payload: IPayload
}

export const createConfirmTradeAction = (): ThunkAction<Promise<void>, State, void, Action<any>> => {
    return async (dispatch: ThunkDispatch<void, State, Action<any>>, getState: () => State): Promise<void> => {
        const state = getState();
        const response: Response = await fetch("http://localhost:4000/api/orders/place", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                account: state.account.selectedId,
                direction: state.tradeModal.buying ? "buy" : "sell",
                instrument: state.tradeModal.instrument.name,
                units: state.tradeModalInput.units,
                unitPrice: state.tradeModalInput.price,
            })
        });
        const json: any = await response.json();
        const price = json["unit price"];
        const instrument = Instrument.fromName(json.instrument);
        const isBuy = json.direction === "buy";
        const action = {
            type: ConfirmTradeType,
            payload: {
                newTrade: new Order(
                    json.accountId as string,
                    new Date(json.time as number),
                    instrument,
                    isBuy,
                    json.units,
                    price,
                    json.remaining,
                    json.averagePrice
                )
            }
        };
        dispatch(action);
    }
};

