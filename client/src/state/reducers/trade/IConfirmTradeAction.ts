interface IPayload {
}

export const ConfirmTradeType: string = "TRADE_CONFIRM";

export default interface IConfirmTradeAction {
    type: typeof ConfirmTradeType
    payload: IPayload
}

export class ConfirmTradeAction {
    static create(): IConfirmTradeAction {
        return {
            type: ConfirmTradeType,
            payload: this.createPayload()
        }
    }

    static createPayload(): IPayload {
        return {}
    }
}