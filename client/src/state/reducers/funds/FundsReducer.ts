import IDepositFundsAction, {DepositFundsType} from "./IDepositAction";
import FundsStore, {FundsActions, initialFundsStore} from "../../store/FundsStore";
import IWithdrawFundsAction, {WithdrawFundsType} from "./IWithdrawAction";
import {withChanges} from "../../../util/WithChanges";
import IStartViewTotalFundsAction, {StartViewTotalFundsType} from "../modal/totalFunds/IStartViewTotalFundsAction";

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
        case StartViewTotalFundsType:
            return setTotalFunds(state, action as IStartViewTotalFundsAction);
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
    return withChanges(state, {
        availableFunds: newFunds
    });
}

function deposit(state: State, action: IDepositFundsAction): State {
    const {asset, amount} = action.payload;
    const newFunds = adjustAsset(state.availableFunds, asset, amount);
    return withChanges(state, {
        availableFunds: newFunds
    })
}

function setTotalFunds(state: State, action: IStartViewTotalFundsAction): State {
    return withChanges(state, {
        totalFunds: action.payload.totalFunds
    });
}

