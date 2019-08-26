import IConfirmDepositAction, {ConfirmDepositType} from "./IConfirmDepositAction";
import FundsStore, {FundsActions, initialFundsStore} from "../../store/FundsStore";
import IConfirmWithdrawAction, {ConfirmWithdrawType} from "./IConfirmWithdrawAction";
import IShowTotalFundsModalAction, {ShowTotalFundsModalType} from "../modal/totalFunds/IShowTotalFundsModalAction";

type State = FundsStore
type Actions = FundsActions

export function fundsReducer(
    state: State = initialFundsStore,
    action: Actions
): State {
    switch (action.type) {
        case ConfirmDepositType:
            return deposit(state, action as IConfirmDepositAction);
        case ConfirmWithdrawType:
            return withdraw(state, action as IConfirmWithdrawAction);
        case ShowTotalFundsModalType:
            return setTotalFunds(state, action as IShowTotalFundsModalAction);
        default:
            return state;
    }
}

function adjustAsset(funds: Array<[string, number]>, asset: string, add: number): Array<[string, number]> {
    return funds.map(([checkAsset, current]) => {
        if (checkAsset === asset) {
            return [checkAsset, current + add]
        } else {
            return [checkAsset, current]
        }
    });
}

function withdraw(state: State, action: IConfirmWithdrawAction): State {
    const {asset, amount} = action.payload;
    const newFunds = adjustAsset(state.availableFunds, asset, -amount);
    return ({
        ...state,
        availableFunds: newFunds
    });
}

function deposit(state: State, action: IConfirmDepositAction): State {
    const {asset, amount} = action.payload;
    const newFunds = adjustAsset(state.availableFunds, asset, amount);
    return ({
        ...state,
        availableFunds: newFunds
    })
}

function setTotalFunds(state: State, action: IShowTotalFundsModalAction): State {
    return ({
        ...state,
        totalFunds: action.payload.totalFunds
    });
}

