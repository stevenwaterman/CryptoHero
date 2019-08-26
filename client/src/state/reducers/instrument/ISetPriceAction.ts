import Instrument from "../../../models/Instrument";
import {FuncToThunk} from "../../../util/FuncToThunk";

interface IPayload {
    instrument: Instrument,
    newPrice: number
}

export const SetPriceType: string = "SET_PRICE";

export default interface ISetPriceAction {
    type: typeof SetPriceType
    payload: IPayload
}

export class SetPriceAction {
    static fire = (instrument: Instrument, newPrice: number) => FuncToThunk(() => SetPriceAction.create(instrument, newPrice));

    private static create(instrument: Instrument, newPrice: number): ISetPriceAction {
        return {
            type: SetPriceType,
            payload: {
                instrument: instrument,
                newPrice: newPrice
            }
        }
    }
}