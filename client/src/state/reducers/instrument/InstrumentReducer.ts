import InstrumentStore, {initialInstrumentStore, InstrumentActions} from "../../store/InstrumentStore";
import IInstrumentSelectionAction, {InstrumentSelectionType} from "./IInstrumentSelectionAction";
import ISetPriceAction, {SetPriceType} from "./ISetPriceAction";
import Instrument from "../../../models/Instrument";

type State = InstrumentStore
type Actions = InstrumentActions

export function instrumentReducer(
    state: State = initialInstrumentStore,
    action: Actions
): State {
    switch (action.type) {
        case InstrumentSelectionType:
            return instrumentSelection(state, action as IInstrumentSelectionAction);
        case SetPriceType:
            return instrumentPrices(state, action as ISetPriceAction);
        default:
            return state;
    }
}

function instrumentSelection(state: State, action: IInstrumentSelectionAction): State {
    const {selected} = action.payload;
    return {
        ...state,
        selectedInstrument: selected
    }
}

function instrumentPrices(state: State, action: ISetPriceAction): State {
    const {instrument, newPrice} = action.payload;
    const newPrices: Array<[Instrument, number]> = state.prices.filter(it => it[0].name !== instrument.name);
    newPrices.push([instrument, newPrice]);
    return {
        ...state,
        prices: newPrices,
    }
}

