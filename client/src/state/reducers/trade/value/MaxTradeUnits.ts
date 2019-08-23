import {State} from "../../../store/RootStore";

export function maxTradeUnits(state: State, price: number | undefined = undefined): number | null {
    const buying = state.trade.buying;
    if(price == null){
        price = state.trade.price
    }
    const sourceAsset = source(state);
    const targetAsset = target(state);
    const sourceFundsAvailable = fundsAvailable(state.funds.availableFunds, sourceAsset);
    const targetFundsAvailable = fundsAvailable(state.funds.availableFunds, targetAsset);

    if (buying) {
        if (price > 0) return sourceFundsAvailable / price;
        else return null;
    } else {
        if (price > 0) return sourceFundsAvailable;
        else return Math.min(sourceFundsAvailable, targetFundsAvailable / (-price));
    }
}

function fundsAvailable(funds: Array<[string, number]>, asset: string): number {
    const [_, amount] = funds.find(([check]) => check === asset) as [string, number];
    return amount;
}

function source(state: State): string {
    return state.trade.buying ? state.trade.instrument.asset2 : state.trade.instrument.asset1
}

function target(state: State): string {
    return state.trade.buying ? state.trade.instrument.asset1 : state.trade.instrument.asset2
}