import ModalVisibilityStore, {
    initialModalVisibilityStore,
    ModalVisibilityActions
} from "../../store/ModalVisibilityStore";
import ShowTotalFundsModalAction, {ShowTotalFundsModalType} from "./totalFunds/ShowTotalFundsModalAction";
import ShowWithdrawModalAction, {ShowWithdrawModalType} from "./withdraw/ShowWithdrawModalAction";
import ShowDepositModalAction, {ShowDepositModalType} from "./deposit/ShowDepositModalAction";
import ShowTradeModalAction, {ShowTradeModalType} from "./trade/ShowTradeModalAction";
import ShowViewTradeModalAction, {ShowViewTradeModalType} from "./viewTrade/ShowViewTradeModalAction";
import {HideDepositModalType} from "./deposit/HideDepositModalAction";
import {HideWithdrawModalType} from "./withdraw/HideWithdrawModalAction";
import {HideTotalFundsModalType} from "./totalFunds/HideTotalFundsModalAction";
import {HideViewTradeModalType} from "./viewTrade/HideViewTradeModalAction";
import {HideTradeModalType} from "./trade/HideTradeModalAction";
import ConfirmTradeAction, {ConfirmTradeType} from "./trade/ConfirmTradeAction";
import {ConfirmDepositType} from "../funds/ConfirmDepositAction";
import ConfirmWithdrawAction, {ConfirmWithdrawType} from "../funds/ConfirmWithdrawAction";
import {CancelOrderType} from "../blotter/CancelOrderAction";

type State = ModalVisibilityStore
type Actions = ModalVisibilityActions

function showTotalFunds(state: State, action: ShowTotalFundsModalAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: true,
        tradeVisible: false,
        viewTradeVisible: false,
        withdrawVisible: false
    }
}

function showWithdraw(state: State, action: ShowWithdrawModalAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: false,
        tradeVisible: false,
        viewTradeVisible: false,
        withdrawVisible: true
    }
}

function showDeposit(state: State, action: ShowDepositModalAction): State {
    return {
        depositVisible: true,
        totalFundsVisible: false,
        tradeVisible: false,
        viewTradeVisible: false,
        withdrawVisible: false
    }
}

function showTrade(state: State, action: ShowTradeModalAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: false,
        tradeVisible: true,
        viewTradeVisible: false,
        withdrawVisible: false
    };
}

function showViewTrade(state: State, action: ShowViewTradeModalAction): State {
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
            return showTotalFunds(state, action as ShowTotalFundsModalAction);
        case ShowWithdrawModalType:
            return showWithdraw(state, action as ShowWithdrawModalAction);
        case ShowDepositModalType:
            return showDeposit(state, action as ShowDepositModalAction);
        case ShowTradeModalType:
            return showTrade(state, action as ShowTradeModalAction);
        case ShowViewTradeModalType:
            return showViewTrade(state, action as ShowViewTradeModalAction);

        case HideDepositModalType:
        case HideWithdrawModalType:
        case HideTotalFundsModalType:
        case HideViewTradeModalType:
        case HideTradeModalType:
        case ConfirmTradeType:
        case ConfirmDepositType:
        case ConfirmWithdrawType:
        case CancelOrderType:
            return allHidden;
        default:
            return state;
    }
}
