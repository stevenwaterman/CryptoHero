import InstrumentStore, {initialInstrumentStore, InstrumentActions} from "./InstrumentStore";
import InstrumentSelectionAction, {InstrumentSelectionType} from "./InstrumentSelectionAction";
import SetInstrumentPriceAction, {SetInstrumentPriceType} from "./SetInstrumentPriceAction";
import Instrument from "../../../models/Instrument";
import SetPricesAction, {SetPricesType} from "./SetPricesAction";
import Big from "big.js";

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
            return instrumentPrice(state, action as SetInstrumentPriceAction);
        case SetPricesType:
            return setPrices(state, action as SetPricesAction);
        default:
            return state;
    }
}

function setPrices(state: State, action: SetPricesAction): State {
    let selected: Instrument = state.selectedInstrument;
    const newInstruments: Array<Instrument> = Array.from(action.payload.prices.keys()).sort(Instrument.comparator);
    if (!newInstruments.map(it => it.name).includes(selected.name)) {
        if (newInstruments.length > 0) {
            selected = newInstruments[0];
        } else {
            selected = new Instrument("NA", "NA");
        }
    }
    const prices: Array<[string, Big]> = Array.from(action.payload.prices).map(([instrument, price]) => [instrument.name, price]);

    return {
        selectedInstrument: selected,
        prices: new Map(prices),
        instrumentList: newInstruments,
    };
}

function instrumentSelection(state: State, action: InstrumentSelectionAction): State {
    const {selected} = action.payload;
    return {
        ...state,
        selectedInstrument: selected
    }
}

function instrumentPrice(state: State, action: SetInstrumentPriceAction): State {
    const {instrument, newPrice} = action.payload;
    const newPrices = new Map(state.prices);
    newPrices.set(instrument.name, newPrice);
    return {
        ...state,
        prices: newPrices,
    }
}

