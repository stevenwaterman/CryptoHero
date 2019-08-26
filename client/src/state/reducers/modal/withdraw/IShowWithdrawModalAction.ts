import {FuncToThunk} from "../../../../util/FuncToThunk";

export const ShowWithdrawModalType: string = "SHOW_WITHDRAW_MODAL";

export default interface IShowWithdrawModalAction {
    type: typeof ShowWithdrawModalType
}

export class ShowWithdrawModalAction {
    static fire = () => FuncToThunk(ShowWithdrawModalAction.create);

    private static create(): IShowWithdrawModalAction {
        return {
            type: ShowWithdrawModalType,
        }
    }
}