import {State} from "../../store/RootStore";

interface IPayload {
    asset: string,
    units: number,
}

export const ConfirmDepositType: string = "CONFIRM_DEPOSIT";

export default interface ConfirmDepositAction {
    type: typeof ConfirmDepositType
    payload: IPayload
}

export function createConfirmDepositAction(state: State): ConfirmDepositAction {
    return {
        type: ConfirmDepositType,
        payload: {
            asset: state.depositModalInput.asset,
            units: state.depositModalInput.units
        }
    }
}