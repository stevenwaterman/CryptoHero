import {State} from "../../../store/RootStore";

interface IPayload {
    totalFunds: Array<[string, number]>
}

export const ShowTotalFundsModalType: string = "SHOW_TOTAL_FUNDS_MODAL";

export default interface ShowTotalFundsModalAction {
    type: typeof ShowTotalFundsModalType;
    payload: IPayload
}

export function createShowTotalFundsModalAction(state: State): ShowTotalFundsModalAction {
    return {
        type: ShowTotalFundsModalType,
        payload: {
            totalFunds: state.funds.totalFunds
        }
    }
}