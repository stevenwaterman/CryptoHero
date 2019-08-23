import {FuncToThunk} from "../../../util/FuncToThunk";

interface IPayload {
    asset: string,
    amount: number,
}

export const DepositFundsType: string = "FUNDS_DEPOSIT";

export default interface IDepositFundsAction {
    type: typeof DepositFundsType
    payload: IPayload
}

export class DepositFundsAction {
    static fire = (asset: string, amount: number) => FuncToThunk(() => DepositFundsAction.create(asset, amount));

    private static create(asset: string, amount: number): IDepositFundsAction {
        return {
            type: DepositFundsType,
            payload: {
                asset: asset,
                amount: amount
            }
        }
    }
}