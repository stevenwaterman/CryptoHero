import IShowTotalFundsModalAction from "../reducers/modal/totalFunds/IShowTotalFundsModalAction";
import IShowWithdrawModalAction from "../reducers/modal/withdraw/IShowWithdrawModalAction";
import IShowDepositModalAction from "../reducers/modal/deposit/IShowDepositModalAction";
import IShowTradeModalAction from "../reducers/modal/trade/IShowTradeModalAction";
import IShowViewTradeModalAction from "../reducers/modal/viewTrade/IShowViewTradeModalAction";
import IHideTotalFundsModalAction from "../reducers/modal/totalFunds/IHideTotalFundsModalAction";
import IHideWithdrawModalAction from "../reducers/modal/withdraw/IHideWithdrawModalAction";
import IHideDepositModalAction from "../reducers/modal/deposit/IHideDepositModalAction";
import IHideTradeModalAction from "../reducers/modal/trade/IHideTradeModalAction";
import IHideViewTradeModalAction from "../reducers/modal/viewTrade/IHideViewTradeModalAction";

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
    IShowTotalFundsModalAction
    | IShowWithdrawModalAction
    | IShowDepositModalAction
    | IShowTradeModalAction
    | IShowViewTradeModalAction
    | IHideTotalFundsModalAction
    | IHideWithdrawModalAction
    | IHideDepositModalAction
    | IHideTradeModalAction
    | IHideViewTradeModalAction