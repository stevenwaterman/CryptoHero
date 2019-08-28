import InstrumentStore, {initialInstrumentStore, InstrumentActions} from "./InstrumentStore";
import InstrumentSelectionAction, {InstrumentSelectionType} from "./InstrumentSelectionAction";
import SetInstrumentPriceAction, {SetInstrumentPriceType} from "./SetInstrumentPriceAction";
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
        case SetInstrumentPriceType:
            return instrumentPrices(state, action as SetInstrumentPriceAction);
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

function instrumentPrices(state: State, action: SetInstrumentPriceAction): State {
    const {instrument, newPrice} = action.payload;
    const newPrices = new Map(state.prices);
    newPrices.set(instrument, newPrice);
    return {
        ...state,
        prices: newPrices,
    }
}

