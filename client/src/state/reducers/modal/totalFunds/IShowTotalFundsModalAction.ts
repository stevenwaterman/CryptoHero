import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    totalFunds: Array<[string, number]>
}

export const ShowTotalFundsModalType: string = "SHOW_TOTAL_FUNDS_MODAL";

export default interface IShowTotalFundsModalAction {
    type: typeof ShowTotalFundsModalType;
    payload: IPayload
}

export class ShowTotalFundsModalAction {
    static fire = () => FuncToThunk(() => {
        //TODO this should do a web request
        const totalFunds: Array<[string, number]> = [
            ["GBP", 1000],
            ["BTC", 1000],
            ["LTC", 1000],
            ["ETH", 1000],
            ["DASH", 1000]
        ];
        return ShowTotalFundsModalAction.create(totalFunds)
    });

    private static create(totalFunds: Array<[string, number]>): IShowTotalFundsModalAction {
        return {
            type: ShowTotalFundsModalType,
            payload: {
                totalFunds: totalFunds
            }
        }
    }
}