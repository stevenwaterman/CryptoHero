import ShowTotalFundsModalAction from "./totalFunds/ShowTotalFundsModalAction";
import ShowWithdrawModalAction from "./withdraw/ShowWithdrawModalAction";
import ShowDepositModalAction from "./deposit/ShowDepositModalAction";
import ShowTradeModalAction from "./trade/ShowTradeModalAction";
import ShowViewOrderModalAction from "./viewOrder/ShowViewOrderModalAction";
import HideTotalFundsModalAction from "./totalFunds/HideTotalFundsModalAction";
import HideWithdrawModalAction from "./withdraw/HideWithdrawModalAction";
import HideDepositModalAction from "./deposit/HideDepositModalAction";
import HideTradeModalAction from "./trade/HideTradeModalAction";
import HideViewOrderModalAction from "./viewOrder/HideViewOrderModalAction";

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
    | ShowViewOrderModalAction
    | HideTotalFundsModalAction
    | HideWithdrawModalAction
    | HideDepositModalAction
    | HideTradeModalAction
    | HideViewOrderModalAction