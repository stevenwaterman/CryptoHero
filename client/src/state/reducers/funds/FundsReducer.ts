import IDepositFundsAction, {DepositFundsType} from "./IDepositAction";
import FundsStore, {FundsActions, initialFundsStore} from "../../store/FundsStore";
import IWithdrawFundsAction, {WithdrawFundsType} from "./IWithdrawAction";

type State = FundsStore
type Actions = FundsActions

export function fundsReducer(
    state: State = initialFundsStore,
    action: Actions
): State {
    switch (action.type) {
        case DepositFundsType:
            return deposit(state, action as IDepositFundsAction);
        case WithdrawFundsType:
            return withdraw(state, action as IWithdrawFundsAction);
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

function withdraw(state: State, action: IWithdrawFundsAction): State {
    const {asset, amount} = action.payload;
    const newFunds = adjustAsset(state.availableFunds, asset, -amount);
    return {
        availableFunds: newFunds
    }
}

function deposit(state: State, action: IDepositFundsAction): State {
    const {asset, amount} = action.payload;
    const newFunds = adjustAsset(state.availableFunds, asset, amount);
    return {
        availableFunds: newFunds
    }
}

