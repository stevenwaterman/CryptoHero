import Instrument from "../../../models/Instrument";
import {FuncToThunk} from "../../../util/FuncToThunk";

interface IPayload {
    buying: boolean,
    instrument: Instrument,
}

export const StartTradeType: string = "TRADE_START";

export default interface IStartTradeAction {
    type: typeof StartTradeType
    payload: IPayload
}

export class StartTradeAction {
    static fire = (buying: boolean, instrument: Instrument) => FuncToThunk(() => StartTradeAction.create(buying, instrument));

    private static create(buying: boolean, instrument: Instrument): IStartTradeAction {
        return {
            type: StartTradeType,
            payload: {
                buying: buying,
                instrument: instrument,
            }
        }
    }
}