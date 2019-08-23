import {FuncToThunk} from "../../../../util/FuncToThunk";

export const ResetPercentTextType: string = "TRADE_RESET_PERCENT_TEXT";

export default interface IResetPercentTextAction {
    type: typeof ResetPercentTextType
}

export class ResetPercentTextAction {
    static fire = () => FuncToThunk(() => ResetPercentTextAction.create());

    private static create(): IResetPercentTextAction{
        return {
            type: ResetPercentTextType,
        }
    }
}