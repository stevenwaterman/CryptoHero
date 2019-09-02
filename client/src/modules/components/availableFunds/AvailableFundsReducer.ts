import ConfirmDepositAction, {ConfirmDepositType} from "./ConfirmDepositAction";
import AvailableFundsStore, {FundsActions, initialFundsStore} from "./AvailableFundsStore";
import ConfirmWithdrawAction, {ConfirmWithdrawType} from "./ConfirmWithdrawAction";
import CancelOrderAction, {CancelOrderType} from "../blotter/CancelOrderAction";
import SetAvailableFundsAction, {SetAvailableFundsType} from "./SetAvailableFundsAction";

type StateSlice = AvailableFundsStore
type Actions = FundsActions

export function availableFundsReducer(
    state: StateSlice = initialFundsStore,
    action: Actions
): StateSlice {
    switch (action.type) {
        case ConfirmDepositType:
            return deposit(state, action as ConfirmDepositAction);
        case ConfirmWithdrawType:
            return withdraw(state, action as ConfirmWithdrawAction);
        case CancelOrderType:
            return cancelOrder(state, action as CancelOrderAction);
        case SetAvailableFundsType:
            return setAvailableFunds(state, action as SetAvailableFundsAction);
        default:
            return state;
    }
}

function setAvailableFunds(state: StateSlice, action: SetAvailableFundsAction): StateSlice {
    return {
        ...state,
        availableFunds: action.payload.funds
    };
}

function cancelOrder(state: StateSlice, action: CancelOrderAction): StateSlice {
    const {instrument, isBuy, remainingUnits, unitPrice} = action.payload.order;
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

function adjustAsset(funds: Map<string, number>, asset: string, add: number): void {
    const current: number = funds.get(asset) as number;
    funds.set(asset, current + add);
}

function withdraw(state: StateSlice, action: ConfirmWithdrawAction): StateSlice {
    const {asset, units} = action.payload;

    const newFunds: Map<string, number> = new Map(state.availableFunds);
    adjustAsset(newFunds, asset, -units);

    return ({
        ...state,
        availableFunds: newFunds
    });
}

function deposit(state: StateSlice, action: ConfirmDepositAction): StateSlice {
    const {asset, units} = action.payload;

    const newFunds: Map<string, number> = new Map(state.availableFunds);
    adjustAsset(state.availableFunds, asset, units);

    return ({
        ...state,
        availableFunds: newFunds
    })
}

