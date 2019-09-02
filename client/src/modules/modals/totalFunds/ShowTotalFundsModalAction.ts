import {State} from "../../RootStore";
import Order from "../../../models/Order";

interface IPayload {
    totalFunds: Map<string, number>
}

export const ShowTotalFundsModalType: string = "SHOW_TOTAL_FUNDS_MODAL";

export default interface ShowTotalFundsModalAction {
    type: typeof ShowTotalFundsModalType;
    payload: IPayload
}

export function createShowTotalFundsModalAction(state: State): ShowTotalFundsModalAction {
    const totalFunds: Map<string, number> =
        state.blotter.orders
            .reduce((funds: Map<string, number>, order: Order) => {
                const asset1Amount = order.remainingUnits;
                const asset2Amount = order.remainingUnits * order.unitPrice;

                if (order.isBuy) {
                    if (asset2Amount > 0) {
                        const asset2Current = funds.get(order.instrument.asset2) as number;
                        const asset2New = asset2Current + asset2Amount;
                        funds.set(order.instrument.asset2, asset2New);
                    }
                } else {
                    const asset1Current = funds.get(order.instrument.asset1) as number;
                    const asset1New = asset1Current + asset1Amount;
                    funds.set(order.instrument.asset1, asset1New);
                    if (asset2Amount < 0) {
                        const asset2Current = funds.get(order.instrument.asset2) as number;
                        const asset2New = asset2Current - asset2Amount;
                        funds.set(order.instrument.asset2, asset2New);
                    }
                }

                return funds;
            }, state.funds.availableFunds);

    return {
        type: ShowTotalFundsModalType,
        payload: {
            totalFunds: totalFunds
        }
    }
}