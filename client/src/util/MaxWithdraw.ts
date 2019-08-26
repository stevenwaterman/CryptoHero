import {State} from "../state/store/RootStore";
import {fundsAvailable} from "./FundsAvailable";

export function maxWithdraw(state: State): number {
    return fundsAvailable(state.funds.availableFunds, state.withdrawModalInput.asset)
}
