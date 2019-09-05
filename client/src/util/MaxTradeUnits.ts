import {State} from "../modules/RootStore";
import Big from "big.js";

export function maxTradeUnits(state: State, price: Big | undefined = undefined): Big | null {
    const buying = state.tradeModal.buying;
    if (price == null) {
        price = state.tradeModalInput.price
    }
    const sourceAsset = source(state);
    const targetAsset = target(state);
    const sourceFundsAvailable = state.funds.availableFunds.get(sourceAsset) as Big;
    const targetFundsAvailable = state.funds.availableFunds.get(targetAsset) as Big;

    if (buying) {
        if (price.gt(0)) return sourceFundsAvailable.div(price);
        else return null;
    } else {
        if (price.gt(0)) return sourceFundsAvailable;
        const negativePrice = Big(0).sub(price);
        const affordableTargetUnits = targetFundsAvailable.div(negativePrice);
        const affordableSourceUnits = sourceFundsAvailable;
        if (affordableSourceUnits.gt(affordableTargetUnits)) {
            return affordableTargetUnits;
        } else {
            return affordableSourceUnits;
        }
    }
}

function source(state: State): string {
    return state.tradeModal.buying ? state.tradeModal.instrument.asset2 : state.tradeModal.instrument.asset1
}

function target(state: State): string {
    return state.tradeModal.buying ? state.tradeModal.instrument.asset1 : state.tradeModal.instrument.asset2
}