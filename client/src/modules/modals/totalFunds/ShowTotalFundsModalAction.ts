import {State} from "../../RootStore";
import Order from "../../../models/Order";
import Big from "big.js";

export const ShowTotalFundsModalType: string = "SHOW_TOTAL_FUNDS_MODAL";

export default interface ShowTotalFundsModalAction {
    type: typeof ShowTotalFundsModalType;
    payload: {
        totalFunds: Map<string, Big>
    }
}

export function createShowTotalFundsModalAction(state: State): ShowTotalFundsModalAction {
    const totalFunds: Map<string, Big> =
        state.blotter.orders
            .reduce(
                (funds: Map<string, Big>, order: Order) => {
                    const asset1Amount = order.remainingUnits;
                    const asset2Amount = order.remainingUnits.mul(order.unitPrice);

                    if (order.isBuy) {
                        if (asset2Amount.gt(0)) {
                            const asset2Current = funds.get(order.instrument.asset2) as Big;
                            const asset2New = asset2Current.plus(asset2Amount);
                            funds.set(order.instrument.asset2, asset2New);
                        }
                    } else {
                        const asset1Current = funds.get(order.instrument.asset1) as Big;
                        const asset1New = asset1Current.plus(asset1Amount);
                        funds.set(order.instrument.asset1, asset1New);
                        if (asset2Amount.lt(0)) {
                            const asset2Current = funds.get(order.instrument.asset2) as Big;
                            const asset2New = asset2Current.sub(asset2Amount);
                            funds.set(order.instrument.asset2, asset2New);
                        }
                    }
                    return funds;
                }, new Map(state.funds.availableFunds)
            );
    return {
        type: ShowTotalFundsModalType,
        payload: {
            totalFunds: totalFunds
        }
    }
}