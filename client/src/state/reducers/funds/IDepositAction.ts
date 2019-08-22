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
    static create(asset: string, amount: number): IDepositFundsAction {
        return {
            type: DepositFundsType,
            payload: this.createPayload(asset, amount)
        }
    }

    static createPayload(asset: string, amount: number): IPayload {
        return {
            asset: asset,
            amount: amount
        }
    }
}