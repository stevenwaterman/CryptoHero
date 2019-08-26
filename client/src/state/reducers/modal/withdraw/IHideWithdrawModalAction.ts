import {FuncToThunk} from "../../../../util/FuncToThunk";

export const HideWithdrawModalType: string = "HIDE_WITHDRAW_MODAL";

export default interface IHideWithdrawModalAction {
    type: typeof HideWithdrawModalType
}

export class HideWithdrawModalAction {
    static fire = () => FuncToThunk(HideWithdrawModalAction.create);

    private static create(): IHideWithdrawModalAction {
        return {
            type: HideWithdrawModalType,
        }
    }
}