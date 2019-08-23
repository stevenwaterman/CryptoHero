import {FuncToThunk} from "../../../util/FuncToThunk";

interface IPayload {
    asset: string,
    amount: number,
}

export const WithdrawFundsType: string = "FUNDS_WITHDRAW";

export default interface IWithdrawFundsAction {
    type: typeof WithdrawFundsType
    payload: IPayload
}

export class WithdrawFundsAction {
    static fire = (asset: string, amount: number) => FuncToThunk(() => WithdrawFundsAction.create(asset, amount));

    private static create(asset: string, amount: number): IWithdrawFundsAction {
        return {
            type: WithdrawFundsType,
            payload: {
                asset: asset,
                amount: amount
            }
        }
    }
}