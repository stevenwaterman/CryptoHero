import {State} from "../../../store/RootStore";
import Trade from "../../../../models/Trade";

interface IPayload {
    totalFunds: Map<string, number>
}

export const ShowTotalFundsModalType: string = "SHOW_TOTAL_FUNDS_MODAL";

export default interface ShowTotalFundsModalAction {
    type: typeof ShowTotalFundsModalType;
    payload: IPayload
}

export function createShowTotalFundsModalAction(state: State): ShowTotalFundsModalAction {
    const totalFunds: Map<string, number> = new Map(state.funds.availableFunds);
    const pendingOrders: Array<Trade> = state.blotter.pending;
    pendingOrders.forEach(({instrument, isBuy, remainingUnits, unitPrice}) => {
        const lockedAsset = isBuy ? instrument.asset2 : instrument.asset1;
        const lockedAmount = isBuy ? remainingUnits * unitPrice : remainingUnits;
        const currentTotal = totalFunds.get(lockedAsset) as number;
        const newTotal = currentTotal + lockedAmount;
        totalFunds.set(lockedAsset, newTotal)
    });

    return {
        type: ShowTotalFundsModalType,
        payload: {
            totalFunds: totalFunds
        }
    }
}