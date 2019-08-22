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
    static create(asset: string, amount: number): IWithdrawFundsAction {
        return {
            type: WithdrawFundsType,
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