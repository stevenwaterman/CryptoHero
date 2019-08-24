import TradeStore, {initialTradeStore, TradeActions} from "../../store/TradeStore";
import IStartTradeAction, {StartTradeType} from "./IStartTradeAction";
import IConfirmTradeAction, {ConfirmTradeType} from "./IConfirmTradeAction";
import ISetPercentAction, {SetPercentType} from "./value/ISetPercentAction";
import ISetPriceAction, {SetPriceType} from "./value/ISetPriceAction";
import {withChanges} from "../../../util/WithChanges";
import ISetPriceTextAction, {SetPriceTextType} from "./text/ISetPriceTextAction";
import ISetUnitsTextAction, {SetUnitsTextType} from "./text/ISetUnitsTextAction";
import ISetPercentTextAction, {SetPercentTextType} from "./text/ISetPercentTextAction";
import {formatMoney} from "../../../util/FormatMoney";
import ISetUnitsAction, {SetUnitsType} from "./value/ISetUnitsAction";
import IResetPercentTextAction, {ResetPercentTextType} from "./resetText/IResetPercentTextAction";
import IResetUnitsTextAction, {ResetUnitsTextType} from "./resetText/IResetUnitsTextAction";
import IResetPriceTextAction, {ResetPriceTextType} from "./resetText/IResetPriceTextAction";

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
        case SetPercentType:
            return setPercent(state, action as ISetPercentAction);
        case SetUnitsType:
            return setUnits(state, action as ISetUnitsAction);
        case SetPriceTextType:
            return setPriceText(state, action as ISetPriceTextAction);
        case SetUnitsTextType:
            return setUnitsText(state, action as ISetUnitsTextAction);
        case SetPercentTextType:
            return setPercentText(state, action as ISetPercentTextAction);
        case SetPriceType:
            return setPrice(state, action as ISetPriceAction);
        case ResetPriceTextType:
            return resetPriceText(state, action as IResetPriceTextAction);
        case ResetPercentTextType:
            return resetPercentText(state, action as IResetPercentTextAction);
        case ResetUnitsTextType:
            return resetUnitsText(state, action as IResetUnitsTextAction);
        default:
            return state;
    }
}

function resetPriceText(state: State, action: IResetPriceTextAction) {
    const changes = {
        priceText: formatMoney(state.price, 5, false)
    };
    return withChanges(state, changes)
}

function resetPercentText(state: State, action: IResetPercentTextAction) {
    let percentText = "";
    if (state.percent != null) {
        percentText = formatMoney(state.percent, 2, false);
    }

    const changes = {
        percentText: percentText
    };
    return withChanges(state, changes);
}

function resetUnitsText(state: State, action: IResetUnitsTextAction) {
    const changes = {
        unitsText: formatMoney(state.units, 5, false)
    };
    return withChanges(state, changes)
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
    const {instrument, buying, startPrice} = action.payload;
    return {
        buying: buying,
        instrument: instrument,
        price: startPrice,
        units: 0,
        percent: 0,
        priceText: formatMoney(startPrice, 5, false),
        unitsText: "0.00000",
        percentText: "0.00"
    }
}

function setUnits(state: State, action: ISetUnitsAction) {
    const {maxUnits, units} = action.payload;
    let percent: number | null = null;
    let percentText = state.percentText;
    let unitsText = state.unitsText;

    let actualUnits = Math.max(units, 0);

    if (maxUnits != null) {
        actualUnits = Math.min(maxUnits, actualUnits);
        percent = 100 * actualUnits / maxUnits;
        percentText = formatMoney(percent, 2, false);
    }

    if (units !== actualUnits) {
        unitsText = formatMoney(actualUnits, 5, false)
    }

    const changes = {
        units: actualUnits,
        unitsText: unitsText,
        percent: percent,
        percentText: percentText
    };
    return withChanges(state, changes);
}

function setPercent(state: State, action: ISetPercentAction) {
    const {maxUnits, percent} = action.payload;
    let actualPercent = Math.min(Math.max(percent, 0), 100);
    let percentText = state.percentText;
    if (actualPercent !== percent) {
        percentText = formatMoney(actualPercent, 2, false);
    }

    const units = actualPercent * maxUnits / 100;
    const unitsText = formatMoney(units, 5, false);

    const changes = {
        unitsText: unitsText,
        units: units,
        percent: actualPercent as number | null,
        percentText: percentText
    };

    return withChanges(state, changes);
}

function setPrice(state: State, action: ISetPriceAction) {
    const {maxUnits, price} = action.payload;
    let {percent, percentText, units, unitsText} = state;
    //Units and percent go blank when setting price to be 0

    if (maxUnits != null) {
        units = Math.min(maxUnits, units);
        unitsText = formatMoney(units, 5, false);
        percent = 100 * units / maxUnits;
        percentText = formatMoney(percent, 2, false)
    } else {
        percent = null;
        percentText = "";
    }

    const changes = {
        price: price,
        percent: percent,
        percentText: percentText,
        units: units,
        unitsText: unitsText
    };
    return withChanges(state, changes);
}
