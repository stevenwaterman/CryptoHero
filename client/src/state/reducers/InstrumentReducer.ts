import {InstrumentActions, InstrumentStore} from "../store/InstrumentStore";
import InstrumentSelectionActionInterface, {InstrumentSelectionType} from "../actions/InstrumentSelectionActionInterface";
import InstrumentPricesActionInterface, {InstrumentPricesType} from "../actions/InstrumentPricesActionInterface";

type State = InstrumentStore
type Action = InstrumentActions

const initialState: State = {
    prices: [
        ["GBP/BTC", "1.3"],
        ["GBP/LTC", "1.2"]
    ],
    selectedInstrument: "GBP/BTC"
};

export function instrumentReducer(
    state: State = initialState,
    action: Action
): State {
    switch (action.type) {
        case InstrumentSelectionType:
            return instrumentSelection(state, <InstrumentSelectionActionInterface>action);
        case InstrumentPricesType:
            return instrumentPrices(state, <InstrumentPricesActionInterface>action);
        default:
            return state;
    }
}

function instrumentSelection(state: State, action: InstrumentSelectionActionInterface): State {
    return {
        prices: state.prices,
        selectedInstrument: action.payload.newInstrument
    }
}

function instrumentPrices(state: State, action: InstrumentPricesActionInterface): State {
    return {
        prices: action.payload.newPrices,
        selectedInstrument: state.selectedInstrument
    }
}

