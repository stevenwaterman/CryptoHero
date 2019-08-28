import ShowTotalFundsModalAction from "./totalFunds/ShowTotalFundsModalAction";
import ShowWithdrawModalAction from "./withdraw/ShowWithdrawModalAction";
import ShowDepositModalAction from "./deposit/ShowDepositModalAction";
import ShowTradeModalAction from "./trade/ShowTradeModalAction";
import ShowViewTradeModalAction from "./viewTrade/ShowViewTradeModalAction";
import HideTotalFundsModalAction from "./totalFunds/HideTotalFundsModalAction";
import HideWithdrawModalAction from "./withdraw/HideWithdrawModalAction";
import HideDepositModalAction from "./deposit/HideDepositModalAction";
import HideTradeModalAction from "./trade/HideTradeModalAction";
import HideViewTradeModalAction from "./viewTrade/HideViewTradeModalAction";

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