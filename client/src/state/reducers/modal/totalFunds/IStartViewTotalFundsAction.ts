import {FuncToThunk} from "../../../../util/FuncToThunk";

interface IPayload {
    totalFunds: Array<[string, number]>
}

export const StartViewTotalFundsType: string = "START_VIEW_TOTAL_FUNDS";

export default interface IStartViewTotalFundsAction {
    type: typeof StartViewTotalFundsType;
    payload: IPayload
}

export class StartViewTotalFundsAction {
    static fire = () => FuncToThunk((state) => {
        //TODO this should do a web request
        const totalFunds: Array<[string, number]> = [
            ["GBP", 1000],
            ["BTC", 1000],
            ["LTC", 1000],
            ["ETH", 1000],
            ["DASH", 1000]
        ];
        return StartViewTotalFundsAction.create(totalFunds)
    });

    private static create(totalFunds: Array<[string, number]>): IStartViewTotalFundsAction {
        return {
            type: StartViewTotalFundsType,
            payload: {
                totalFunds: totalFunds
            }
        }
    }
}