import {State} from "../../RootStore";
import Order from "../../../models/Order";
import {ThunkDsp} from "../../../util/Thunker";
import Instrument from "../../../models/Instrument";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {SetAccountAction, SetAccountType} from "../../global/SetAccountAction";

interface IPayload {
    newTrade: Order
}

export const ConfirmTradeType: string = "TRADE_CONFIRM";

export default interface ConfirmTradeAction {
    type: typeof ConfirmTradeType
    payload: IPayload
}

export const createConfirmTradeAction = (): ThunkAction<Promise<void>, State, void, ConfirmTradeAction> => {
    return async (dispatch: ThunkDispatch<void, State, ConfirmTradeAction>, getState: () => State): Promise<void> => {
        console.log("Promise returned");
        const state = getState();
        const response: Response = await fetch("http://localhost:4000/api/orders/place", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                account: state.account.id,
                direction: state.tradeModal.buying ? "buy" : "sell",
                instrument: state.tradeModal.instrument.name,
                units: state.tradeModalInput.units,
                unitPrice: state.tradeModalInput.price,
            })
        });
        console.log("Got Response");
        console.log(response);
        const json: any = await response.json();
        console.log("Got JSON");
        console.log(json);
        const price = json["unit price"];
        const [asset1, asset2] = json.split("/");
        const isBuy = json.direction === "buy";
        const action = {
            type: ConfirmTradeType,
            payload: {
                newTrade: new Order(
                    json.accountId as string,
                    new Date(json.time as number),
                    new Instrument(asset1, asset2),
                    isBuy,
                    json.units,
                    price,
                    json.remaining,
                    json.averagePrice
                )
            }
        };
        console.log("Created Action");
        console.log(action);
        dispatch(action);
    }
};

