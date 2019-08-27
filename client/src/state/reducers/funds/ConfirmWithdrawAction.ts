import {State} from "../../store/RootStore";

interface IPayload {
    asset: string,
    units: number,
}

export const ConfirmWithdrawType: string = "CONFIRM_WITHDRAW";

export default interface ConfirmWithdrawAction {
    type: typeof ConfirmWithdrawType
    payload: IPayload
}

export function createConfirmWithdrawAction(state: State): ConfirmWithdrawAction {
    return {
        type: ConfirmWithdrawType,
        payload: {
            asset: state.withdrawModalInput.asset,
            units: state.withdrawModalInput.units
        }
    }
}