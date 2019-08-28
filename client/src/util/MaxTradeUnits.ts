import {State} from "../modules/RootStore";

export function maxTradeUnits(state: State, price: number | undefined = undefined): number | null {
    const buying = state.tradeModal.buying;
    if (price == null) {
        price = state.tradeModalInput.price
    }
    const sourceAsset = source(state);
    const targetAsset = target(state);
    const sourceFundsAvailable = state.funds.availableFunds.get(sourceAsset) as number;
    const targetFundsAvailable = state.funds.availableFunds.get(targetAsset) as number;

    if (buying) {
        if (price > 0) return sourceFundsAvailable / price;
        else return null;
    } else {
        if (price > 0) return sourceFundsAvailable;
        else return Math.min(sourceFundsAvailable, targetFundsAvailable / (-price));
    }
}

function source(state: State): string {
    return state.tradeModal.buying ? state.tradeModal.instrument.asset2 : state.tradeModal.instrument.asset1
}

function target(state: State): string {
    return state.tradeModal.buying ? state.tradeModal.instrument.asset1 : state.tradeModal.instrument.asset2
}