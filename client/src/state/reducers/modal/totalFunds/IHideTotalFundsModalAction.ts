import {FuncToThunk} from "../../../../util/FuncToThunk";

export const HideTotalFundsModalType: string = "HIDE_TOTAL_FUNDS_MODAL";

export default interface IHideTotalFundsModalAction {
    type: typeof HideTotalFundsModalType;
}

export class HideTotalFundsModalAction {
    static fire = () => FuncToThunk(HideTotalFundsModalAction.create);

    private static create(): IHideTotalFundsModalAction {
        return {
            type: HideTotalFundsModalType,
        }
    }
}