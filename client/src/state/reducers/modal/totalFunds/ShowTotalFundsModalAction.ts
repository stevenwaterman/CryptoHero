import {State} from "../../../store/RootStore";

interface IPayload {
    totalFunds: Map<string, number>
}

export const ShowTotalFundsModalType: string = "SHOW_TOTAL_FUNDS_MODAL";

export default interface ShowTotalFundsModalAction {
    type: typeof ShowTotalFundsModalType;
    payload: IPayload
}

export function createShowTotalFundsModalAction(state: State): ShowTotalFundsModalAction {
    const availableFunds = state.funds.availableFunds;
    const pendingOrders = state.blotter.pending;//TODO work this out


    return {
        type: ShowTotalFundsModalType,
        payload: {
            totalFunds: state.funds.totalFunds
        }
    }
}