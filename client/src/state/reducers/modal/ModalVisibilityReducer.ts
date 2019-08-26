import ModalVisibilityStore, {
    initialModalVisibilityStore,
    ModalVisibilityActions
} from "../../store/ModalVisibilityStore";
import IStartViewTotalFundsAction, {StartViewTotalFundsType} from "./totalFunds/IStartViewTotalFundsAction";
import IStartWithdrawAction, {StartWithdrawType} from "./withdraw/IStartWithdrawAction";
import IStartDepositAction, {StartDepositType} from "./deposit/IStartDepositAction";
import IStartTradeAction, {StartTradeType} from "./trade/IStartTradeAction";
import IStartViewTradeAction, {StartViewTradeType} from "./viewTrade/IStartViewTradeAction";

type State = ModalVisibilityStore
type Actions = ModalVisibilityActions

function showTotalFunds(state: State, action: IStartViewTotalFundsAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: true,
        tradeVisible: false,
        viewTradeVisible: false,
        withdrawVisible: false
    }
}

function showWithdraw(state: State, action: IStartWithdrawAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: false,
        tradeVisible: false,
        viewTradeVisible: false,
        withdrawVisible: true
    }
}

function showDeposit(state: State, action: IStartDepositAction): State {
    return {
        depositVisible: true,
        totalFundsVisible: false,
        tradeVisible: false,
        viewTradeVisible: false,
        withdrawVisible: false
    }
}

function showTrade(state: State, action: IStartTradeAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: false,
        tradeVisible: true,
        viewTradeVisible: false,
        withdrawVisible: false
    };
}

function showViewTrade(state: State, action: IStartViewTradeAction): State {
    return {
        depositVisible: false,
        totalFundsVisible: false,
        tradeVisible: false,
        viewTradeVisible: true,
        withdrawVisible: false
    };
}

export function modalVisibilityReducer(
    state: State = initialModalVisibilityStore,
    action: Actions
): State {
    switch (action.type) {
        case StartViewTotalFundsType:
            return showTotalFunds(state, action as IStartViewTotalFundsAction);
        case StartWithdrawType:
            return showWithdraw(state, action as IStartWithdrawAction);
        case StartDepositType:
            return showDeposit(state, action as IStartDepositAction);
        case StartTradeType:
            return showTrade(state, action as IStartTradeAction);
        case StartViewTradeType:
            return showViewTrade(state, action as IStartViewTradeAction);
        default:
            return state;
    }
}
