import Instrument from "../../../models/Instrument";
import IStartViewTradeAction from "../../reducers/modal/viewTrade/IStartViewTradeAction";

export default interface ViewTradeModalStore {
    readonly id: string,
    readonly time: Date,
    readonly buying: boolean,
    readonly instrument: Instrument,
    readonly units: number,
    readonly price: number,

    readonly remaining: number,
    readonly averagePrice: number | null,
}

export const initialViewTradeModalStore: ViewTradeModalStore = {
    id: "",
    time: new Date(),
    averagePrice: 0,
    buying: false,
    instrument: new Instrument("BTC", "GBP"),
    price: 0,
    remaining: 0,
    units: 0
};

export type ViewTradeModalActions =
    IStartViewTradeAction
