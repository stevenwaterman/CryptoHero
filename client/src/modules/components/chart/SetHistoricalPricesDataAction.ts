import {State} from "../../RootStore";
import Order from "../../../models/Order";
import OrderDepthData from "../../../models/OrderDepthData";
import HistoricalPriceData from "../../../models/HistoricalPriceData";

export const SetHistoricalPricesDataType: string = "SET_HISTORICAL_PRICES_DATA";

export default interface SetHistoricalPricesDataAction {
    type: typeof SetHistoricalPricesDataType,
    payload: {
        historicalPrices: HistoricalPriceData
    }
}

export function createSetHistoricalPricesDataAction(state: State, historicalPriceData: HistoricalPriceData): SetHistoricalPricesDataAction {
    return {
        type: SetHistoricalPricesDataType,
        payload: {
            historicalPrices: historicalPriceData
        }
    }
}