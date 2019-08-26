import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    asset: string
    units: number
}

export const ConfirmDepositType: string = "DEPOSIT_CONFIRM";

export default interface IConfirmDepositAction {
    type: typeof ConfirmDepositType
    payload: IPayload
}

export class ConfirmDepositAction {
    static fire = FuncToThunk((state) => ConfirmDepositAction.create(state.depositModalInput.asset, state.depositModalInput.units));

    private static create(asset: string, units: number): IConfirmDepositAction {
        return {
            type: ConfirmDepositType,
            payload: {
                asset: asset,
                units: units
            }
        }
    }
}