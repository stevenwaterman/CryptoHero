import ConfirmDepositAction from "./ConfirmDepositAction";
import ConfirmWithdrawAction from "./ConfirmWithdrawAction";
import CancelOrderAction from "../blotter/CancelOrderAction";
import SetAvailableFundsAction from "./SetAvailableFundsAction";
import Big from "big.js";

export default interface AvailableFundsStore {
    readonly availableFunds: Map<string, Big>;
}

export const initialFundsStore: AvailableFundsStore = {
    availableFunds: new Map(),
};

export type FundsActions = ConfirmDepositAction | ConfirmWithdrawAction | CancelOrderAction | SetAvailableFundsAction