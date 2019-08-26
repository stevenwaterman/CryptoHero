import {FuncToThunk} from "../../../util/FuncToThunk";
import {State} from "../../store/RootStore";

interface IPayload {
    asset: string,
    amount: number,
}

export const ConfirmWithdrawType: string = "CONFIRM_WITHDRAW";

export default interface IConfirmWithdrawAction {
    type: typeof ConfirmWithdrawType
    payload: IPayload
}

export class ConfirmWithdrawAction {
    static fire = () => FuncToThunk((state: State) => ConfirmWithdrawAction.create(state.withdrawModalInput.asset, state.withdrawModalInput.units));

    private static create(asset: string, amount: number): IConfirmWithdrawAction {
        return {
            type: ConfirmWithdrawType,
            payload: {
                asset: asset,
                amount: amount
            }
        }
    }
}