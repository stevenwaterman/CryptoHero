import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    newText: string,
}

export const SetPercentTextType: string = "TRADE_SET_PERCENT_TEXT";

export default interface ISetPercentTextAction {
    type: typeof SetPercentTextType
    payload: IPayload
}

export class SetPercentTextAction {
    static fire = (newText: string) => FuncToThunk(() => SetPercentTextAction.create(newText));

    private static create(newText: string): ISetPercentTextAction {
        return {
            type: SetPercentTextType,
            payload: {
                newText: newText
            }
        }
    }
}