import {State} from "../../RootStore";
import Order from "../../../models/Order";

export const SetBlotterPageType: string = "SET_BLOTTER_PAGE";

export default interface SetBlotterPageAction {
    type: typeof SetBlotterPageType,
    payload: {
        newPage: number
    }
}

export function createSetBlotterPageAction(newPage: number): SetBlotterPageAction {

    return {
        type: SetBlotterPageType,
        payload: {
            newPage: newPage
        }
    }
}