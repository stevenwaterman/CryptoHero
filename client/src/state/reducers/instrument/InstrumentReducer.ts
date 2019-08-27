import InstrumentStore, {initialInstrumentStore, InstrumentActions} from "../../store/InstrumentStore";
import InstrumentSelectionAction, {InstrumentSelectionType} from "./InstrumentSelectionAction";
import SetPriceAction, {SetPriceType} from "./SetPriceAction";
import Instrument from "../../../models/Instrument";

type State = InstrumentStore
type Actions = InstrumentActions

export function instrumentReducer(
    state: State = initialInstrumentStore,
    action: Actions
): State {
    switch (action.type) {
        case InstrumentSelectionType:
            return instrumentSelection(state, action as InstrumentSelectionAction);
        case SetPriceType:
            return instrumentPrices(state, action as SetPriceAction);
        default:
            return state;
    }
}

function instrumentSelection(state: State, action: InstrumentSelectionAction): State {
    const {selected} = action.payload;
    return {
        ...state,
        selectedInstrument: selected
    }
}

function instrumentPrices(state: State, action: SetPriceAction): State {
    const {instrument, newPrice} = action.payload;
    const newPrices: Array<[Instrument, number]> = state.prices.filter(it => it[0].name !== instrument.name);
    newPrices.push([instrument, newPrice]);
    return {
        ...state,
        prices: newPrices,
    }
}

