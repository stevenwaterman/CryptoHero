import InstrumentStore, {initialInstrumentStore, InstrumentActions} from "../../store/InstrumentStore";
import IInstrumentSelectionAction, {InstrumentSelectionType} from "./IInstrumentSelectionAction";
import IInstrumentPricesAction, {InstrumentPricesType} from "./IInstrumentPricesAction";

type State = InstrumentStore
type Actions = InstrumentActions

export function instrumentReducer(
    state: State = initialInstrumentStore,
    action: Actions
): State {
    switch (action.type) {
        case InstrumentSelectionType:
            return instrumentSelection(state, action as IInstrumentSelectionAction);
        case InstrumentPricesType:
            return instrumentPrices(state, action as IInstrumentPricesAction);
        default:
            return state;
    }
}

function instrumentSelection(state: State, action: IInstrumentSelectionAction): State {
    const {newInstrument} = action.payload;
    return {
        prices: state.prices,
        selectedInstrument: newInstrument
    }
}

function instrumentPrices(state: State, action: IInstrumentPricesAction): State {
    const {newPrices} = action.payload;
    return {
        prices: newPrices,
        selectedInstrument: state.selectedInstrument
    }
}

