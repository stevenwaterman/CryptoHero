import IStartWithdrawAction from "../../reducers/modal/withdraw/IStartWithdrawAction";
import IConfirmWithdrawAction from "../../reducers/modal/withdraw/IConfirmWithdrawAction";

export default interface WithdrawModalStore {
}

export const initialWithdrawModalStore: WithdrawModalStore = {
};

export type WithdrawModalActions =
    IStartWithdrawAction
    | IConfirmWithdrawAction
