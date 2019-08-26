import Instrument from "../../../models/Instrument";
import IStartWithdrawAction from "../../reducers/modal/withdraw/IStartWithdrawAction";
import IConfirmWithdrawAction from "../../reducers/modal/withdraw/IConfirmWithdrawAction";

export default interface WithdrawModalStore {
}

export const initialWithdrawModalStore: WithdrawModalStore = {
    buying: true,
    instrument: new Instrument("GBP", "BTC"),
};

export type WithdrawModalActions =
    IStartWithdrawAction
    | IConfirmWithdrawAction
