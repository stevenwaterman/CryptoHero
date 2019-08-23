import TradeStore, {initialTradeStore, TradeActions} from "../../store/TradeStore";
import IStartTradeAction, {StartTradeType} from "./IStartTradeAction";
import IConfirmTradeAction, {ConfirmTradeType} from "./IConfirmTradeAction";
import ISetAmountAction, {SetAmountType} from "./value/ISetAmountAction";
import ISetPriceAction, {SetPriceType} from "./value/ISetPriceAction";
import {withChanges} from "../../../util/WithChanges";
import ISetPriceTextAction, {SetPriceTextType} from "./text/ISetPriceTextAction";
import ISetUnitsTextAction, {SetUnitsTextType} from "./text/ISetUnitsTextAction";
import ISetPercentTextAction, {SetPercentTextType} from "./text/ISetPercentTextAction";
import {formatMoney} from "../../../util/FormatMoney";

type State = TradeStore
type Actions = TradeActions

export function tradeReducer(
    state: State = initialTradeStore,
    action: Actions
): State {
    switch (action.type) {
        case StartTradeType:
            return startTrade(state, action as IStartTradeAction);
        case ConfirmTradeType:
            return confirmTrade(state, action as IConfirmTradeAction);
        case SetAmountType:
            return setAmount(state, action as ISetAmountAction);
        case SetPriceTextType:
            return setPriceText(state, action as ISetPriceTextAction);
        case SetUnitsTextType:
            return setUnitsText(state, action as ISetUnitsTextAction);
        case SetPercentTextType:
            return setPercentText(state, action as ISetPercentTextAction);
        case SetPriceType:
            return setPrice(state, action as ISetPriceAction);
        default:
            return state;
    }
}

function setPriceText(state: State, action: ISetPriceTextAction): State {
    const changes = {
        priceText: action.payload.newText
    };
    return withChanges(state, changes)
}

function setUnitsText(state: State, action: ISetPriceTextAction): State {
    const changes = {
        unitsText: action.payload.newText
    };
    return withChanges(state, changes)
}

function setPercentText(state: State, action: ISetPriceTextAction): State {
    const changes = {
        percentText: action.payload.newText
    };
    return withChanges(state, changes)
}

function confirmTrade(state: State, action: IConfirmTradeAction): State {
    //TODO
    return state;
}

function startTrade(state: State, action: IStartTradeAction): State {
    const {instrument, buying} = action.payload;
    return {
        buying: buying,
        instrument: instrument,
        price: 0, //TODO use global state to set this
        units: 0,
        percent: 0,
        priceText: "0",
        unitsText: "0",
        percentText: "0"
    }
}

function setAmount(state: State, action: ISetAmountAction) {
    const {editingUnits, units, percent} = action.payload;
    const changes = {
        unitsText: editingUnits ? state.unitsText : formatMoney(units, 5, false),
        percentText: editingUnits ? formatMoney(percent, 2, false) : state.percentText,
        units: units,
        percent: percent
    };

    return withChanges(state, changes);
}

function setPrice(state: State, action: ISetPriceAction) {
    const {newPrice, newPercent} = action.payload;
    const changes = {
        price: newPrice,
        percent: newPercent,
        percentText: formatMoney(newPercent, 2, false)
    };
    return withChanges(state, changes);
}
