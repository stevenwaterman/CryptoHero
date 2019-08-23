import {FuncToThunk} from "../../../../util/FuncToThunk";
import {maxTradeUnits} from "./MaxTradeUnits";

interface IPayload {
    price: number,
    maxUnits: number | null
}

export const SetPriceType: string = "TRADE_SET_PRICE";

export default interface ISetPriceAction {
    type: typeof SetPriceType
    payload: IPayload
}

export class SetPriceAction {
    static fire = (price: number) => FuncToThunk(state => {
        const maxUnits = maxTradeUnits(state, price);
        return SetPriceAction.create(price, maxUnits);
    });

    private static create(price: number, maxUnits: number | null): ISetPriceAction{
        return {
            type: SetPriceType,
            payload: {
                price: price,
                maxUnits: maxUnits
            }
        }
    }
}