import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    asset: string
    units: number
}

export const ConfirmWithdrawType: string = "WITHDRAW_CONFIRM";

export default interface IConfirmWithdrawAction {
    type: typeof ConfirmWithdrawType
    payload: IPayload
}

export class ConfirmWithdrawAction {
    static fire = FuncToThunk((state) => ConfirmWithdrawAction.create(state.withdrawModalInput.asset, state.withdrawModalInput.units));

    private static create(asset: string, units: number): IConfirmWithdrawAction {
        return {
            type: ConfirmWithdrawType,
            payload: {
                asset: asset,
                units: units
            }
        }
    }
}