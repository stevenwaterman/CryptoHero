import ConfirmDepositAction from "./ConfirmDepositAction";
import ConfirmWithdrawAction from "./ConfirmWithdrawAction";
import ShowTotalFundsModalAction from "../../modals/totalFunds/ShowTotalFundsModalAction";
import CancelOrderAction from "../blotter/CancelOrderAction";
import SetAvailableFundsAction from "./SetAvailableFundsAction";

export default interface AvailableFundsStore {
    readonly availableFunds: Map<string, number>;
}

export const initialFundsStore: AvailableFundsStore = {
    availableFunds: new Map(),
};

export type FundsActions = ConfirmDepositAction | ConfirmWithdrawAction | CancelOrderAction | SetAvailableFundsAction