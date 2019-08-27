import ConfirmDepositAction, {ConfirmDepositType} from "./ConfirmDepositAction";
import FundsStore, {FundsActions, initialFundsStore} from "../../store/FundsStore";
import ConfirmWithdrawAction, {ConfirmWithdrawType} from "./ConfirmWithdrawAction";
import ShowTotalFundsModalAction, {ShowTotalFundsModalType} from "../modal/totalFunds/ShowTotalFundsModalAction";

type State = FundsStore
type Actions = FundsActions

export function fundsReducer(
    state: State = initialFundsStore,
    action: Actions
): State {
    switch (action.type) {
        case ConfirmDepositType:
            return deposit(state, action as ConfirmDepositAction);
        case ConfirmWithdrawType:
            return withdraw(state, action as ConfirmWithdrawAction);
        case ShowTotalFundsModalType:
            return setTotalFunds(state, action as ShowTotalFundsModalAction);
        default:
            return state;
    }
}

function adjustAsset(funds: Map<string, number>, asset: string, add: number): void {
    const current: number = funds.get(asset) as number;
    funds.set(asset, current + add);
}

function withdraw(state: State, action: ConfirmWithdrawAction): State {
    const {asset, units} = action.payload;

    const newFunds: Map<string, number> = {...state.availableFunds};
    adjustAsset(newFunds, asset, -units);

    return ({
        ...state,
        availableFunds: newFunds
    });
}

function deposit(state: State, action: ConfirmDepositAction): State {
    const {asset, units} = action.payload;

    const newFunds: Map<string, number> = {...state.availableFunds};
    adjustAsset(state.availableFunds, asset, units);

    return ({
        ...state,
        availableFunds: newFunds
    })
}

function setTotalFunds(state: State, action: ShowTotalFundsModalAction): State {
    return ({
        ...state,
        totalFunds: action.payload.totalFunds
    });
}

