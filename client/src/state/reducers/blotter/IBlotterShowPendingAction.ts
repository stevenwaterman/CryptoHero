import {FuncToThunk} from "../../../util/FuncToThunk";

export const BlotterShowPendingType: string = "BLOTTER_SHOW_PENDING";

export default interface IDepositFundsAction {
    type: typeof BlotterShowPendingType
}

export class BlotterShowPendingAction {
    static fire = () => FuncToThunk(BlotterShowPendingAction.create);

    private static create(): IDepositFundsAction {
        return {
            type: BlotterShowPendingType,
        }
    }
}