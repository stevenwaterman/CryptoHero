import ShowTotalFundsModalAction from "../reducers/modal/totalFunds/ShowTotalFundsModalAction";
import ShowWithdrawModalAction from "../reducers/modal/withdraw/ShowWithdrawModalAction";
import ShowDepositModalAction from "../reducers/modal/deposit/ShowDepositModalAction";
import ShowTradeModalAction from "../reducers/modal/trade/ShowTradeModalAction";
import ShowViewTradeModalAction from "../reducers/modal/viewTrade/ShowViewTradeModalAction";
import HideTotalFundsModalAction from "../reducers/modal/totalFunds/HideTotalFundsModalAction";
import HideWithdrawModalAction from "../reducers/modal/withdraw/HideWithdrawModalAction";
import HideDepositModalAction from "../reducers/modal/deposit/HideDepositModalAction";
import HideTradeModalAction from "../reducers/modal/trade/HideTradeModalAction";
import HideViewTradeModalAction from "../reducers/modal/viewTrade/HideViewTradeModalAction";

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
    ShowTotalFundsModalAction
    | ShowWithdrawModalAction
    | ShowDepositModalAction
    | ShowTradeModalAction
    | ShowViewTradeModalAction
    | HideTotalFundsModalAction
    | HideWithdrawModalAction
    | HideDepositModalAction
    | HideTradeModalAction
    | HideViewTradeModalAction