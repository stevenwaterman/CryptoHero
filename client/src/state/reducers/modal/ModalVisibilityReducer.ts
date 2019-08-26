import ModalVisibilityStore, {
    initialModalVisibilityStore,
    ModalVisibilityActions
} from "../../store/ModalVisibilityStore";
import IShowTotalFundsModalAction, {ShowTotalFundsModalType} from "./totalFunds/IShowTotalFundsModalAction";
import IShowWithdrawModalAction, {ShowWithdrawModalType} from "./withdraw/IShowWithdrawModalAction";
import IShowDepositModalAction, {ShowDepositModalType} from "./deposit/IShowDepositModalAction";
import IShowTradeModalAction, {ShowTradeModalType} from "./trade/IShowTradeModalAction";
import IShowViewTradeModalAction, {ShowViewTradeModalType} from "./viewTrade/IShowViewTradeModalAction";
import {HideDepositModalType} from "./deposit/IHideDepositModalAction";
import {HideWithdrawModalType} from "./withdraw/IHideWithdrawModalAction";
import {HideTotalFundsModalType} from "./totalFunds/IHideTotalFundsModalAction";
import {HideViewTradeModalType} from "./viewTrade/IHideViewTradeModalAction";
import {HideTradeModalType} from "./trade/IHideTradeModalAction";

type State = ModalVisibilityStore
type Actions = ModalVisibilityActions

function showTotalFunds(state: State, action: IShowTotalFundsModalAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: true,
        tradeVisible: false,
        viewTradeVisible: false,
        withdrawVisible: false
    }
}

function showWithdraw(state: State, action: IShowWithdrawModalAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: false,
        tradeVisible: false,
        viewTradeVisible: false,
        withdrawVisible: true
    }
}

function showDeposit(state: State, action: IShowDepositModalAction): State {
    return {
        depositVisible: true,
        totalFundsVisible: false,
        tradeVisible: false,
        viewTradeVisible: false,
        withdrawVisible: false
    }
}

function showTrade(state: State, action: IShowTradeModalAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: false,
        tradeVisible: true,
        viewTradeVisible: false,
        withdrawVisible: false
    };
}

function showViewTrade(state: State, action: IShowViewTradeModalAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: false,
        tradeVisible: false,
        viewTradeVisible: true,
        withdrawVisible: false
    };
}

const allHidden: State = {
    depositVisible: false,
    totalFundsVisible: false,
    tradeVisible: false,
    viewTradeVisible: false,
    withdrawVisible: false
};

export function modalVisibilityReducer(
    state: State = initialModalVisibilityStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowTotalFundsModalType:
            return showTotalFunds(state, action as IShowTotalFundsModalAction);
        case ShowWithdrawModalType:
            return showWithdraw(state, action as IShowWithdrawModalAction);
        case ShowDepositModalType:
            return showDeposit(state, action as IShowDepositModalAction);
        case ShowTradeModalType:
            return showTrade(state, action as IShowTradeModalAction);
        case ShowViewTradeModalType:
            return showViewTrade(state, action as IShowViewTradeModalAction);

        case HideDepositModalType:
        case HideWithdrawModalType:
        case HideTotalFundsModalType:
        case HideViewTradeModalType:
        case HideTradeModalType:
            return allHidden;
        default:
            return state;
    }
}
