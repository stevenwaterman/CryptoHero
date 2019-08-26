import {FuncToThunk} from "../../../util/FuncToThunk";
import {State} from "../../store/RootStore";

interface IPayload {
    asset: string,
    amount: number,
}

export const ConfirmDepositType: string = "CONFIRM_DEPOSIT";

export default interface IConfirmDepositAction {
    type: typeof ConfirmDepositType
    payload: IPayload
}

export class ConfirmDepositAction {
    static fire = () => FuncToThunk((state: State) => ConfirmDepositAction.create(state.depositModalInput.asset, state.depositModalInput.units));

    private static create(asset: string, amount: number): IConfirmDepositAction {
        return {
            type: ConfirmDepositType,
            payload: {
                asset: asset,
                amount: amount
            }
        }
    }
}