import ConfirmDepositAction, {ConfirmDepositType} from "./ConfirmDepositAction";
import AvailableFundsStore, {FundsActions, initialFundsStore} from "./AvailableFundsStore";
import ConfirmWithdrawAction, {ConfirmWithdrawType} from "./ConfirmWithdrawAction";
import ShowTotalFundsModalAction, {ShowTotalFundsModalType} from "../../modals/totalFunds/ShowTotalFundsModalAction";
import CancelOrderAction, {CancelOrderType} from "../blotter/CancelOrderAction";

type State = AvailableFundsStore
type Actions = FundsActions

function cancelOrder(state: State, action: CancelOrderAction): State {
    const {instrument, isBuy, remainingUnits, unitPrice} = action.payload.trade;
    const availableFunds = new Map(state.availableFunds);
    if(isBuy){
        const current = availableFunds.get(instrument.asset2) as number;
        const newFunds = current + remainingUnits * unitPrice;
        availableFunds.set(instrument.asset2, newFunds)
    } else {
        const current = availableFunds.get(instrument.asset1) as number;
        const newFunds = current + remainingUnits;
        availableFunds.set(instrument.asset1, newFunds);
    }
    return {
        ...state,
        availableFunds: availableFunds
    }
}

export function availableFundsReducer(
    state: State = initialFundsStore,
    action: Actions
): State {
    switch (action.type) {
        case ConfirmDepositType:
            return deposit(state, action as ConfirmDepositAction);
        case ConfirmWithdrawType:
            return withdraw(state, action as ConfirmWithdrawAction);
        case CancelOrderType:
            return cancelOrder(state, action as CancelOrderAction);
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

    const newFunds: Map<string, number> = new Map(state.availableFunds);
    adjustAsset(newFunds, asset, -units);

    return ({
        ...state,
        availableFunds: newFunds
    });
}

function deposit(state: State, action: ConfirmDepositAction): State {
    const {asset, units} = action.payload;

    const newFunds: Map<string, number> = new Map(state.availableFunds);
    adjustAsset(state.availableFunds, asset, units);

    return ({
        ...state,
        availableFunds: newFunds
    })
}

