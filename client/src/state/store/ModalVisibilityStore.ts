import IStartViewTotalFundsAction from "../reducers/modal/totalFunds/IStartViewTotalFundsAction";
import IStartWithdrawAction from "../reducers/modal/withdraw/IStartWithdrawAction";
import IStartDepositAction from "../reducers/modal/deposit/IStartDepositAction";
import IStartTradeAction from "../reducers/modal/trade/IStartTradeAction";
import IStartViewTradeAction from "../reducers/modal/viewTrade/IStartViewTradeAction";

export default interface ModalVisibilityStore {
    readonly totalFundsVisible: boolean;
    readonly withdrawVisible: boolean;
    readonly depositVisible: boolean;
    readonly tradeVisible: boolean;
    readonly viewTradeVisible: boolean;
}

export const initialModalVisibilityStore: ModalVisibilityStore = {
    depositVisible: false,
    totalFundsVisible: false,
    tradeVisible: false,
    viewTradeVisible: false,
    withdrawVisible: false
};

export type ModalVisibilityActions =
    IStartViewTotalFundsAction
    | IStartWithdrawAction
    | IStartDepositAction
    | IStartTradeAction
    | IStartViewTradeAction