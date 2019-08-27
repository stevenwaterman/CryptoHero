import ShowTradeModalAction, {ShowTradeModalType} from "../../modal/trade/ShowTradeModalAction";
import TradeModalSetPercentAction, {TradeModalSetPercentType} from "./value/TradeModalSetPercentAction";
import TradeModalSetUnitsAction, {TradeModalSetUnitsType} from "./value/TradeModalSetUnitsAction";
import TradeModalSetPriceTextAction, {TradeModalSetPriceTextType} from "./text/TradeModalSetPriceTextAction";
import TradeModalSetUnitsTextAction, {TradeModalSetUnitsTextType} from "./text/TradeModalSetUnitsTextAction";
import TradeModalSetPercentTextAction, {TradeModalSetPercentTextType} from "./text/TradeModalSetPercentTextAction";
import TradeModalSetPriceAction, {TradeModalSetPriceType} from "./value/TradeModalSetPriceAction";
import TradeModalResetPriceTextAction, {TradeModalResetPriceTextType} from "./resetText/TradeModalResetPriceTextAction";
import TradeModalResetPercentTextAction, {TradeModalResetPercentTextType} from "./resetText/TradeModalResetPercentTextAction";
import TradeModalResetUnitsTextAction, {TradeModalResetUnitsTextType} from "./resetText/TradeModalResetUnitsTextAction";
import {formatInput, formatPercent} from "../../../../util/FormatMoney";
import TradeModalInputStore, {
    initialTradeModalInputStore,
    TradeModalInputActions
} from "../../../store/modalInputState/TradeModalInputStore";

type State = TradeModalInputStore
type Actions = TradeModalInputActions

export function tradeModalInputReducer(
    state: State = initialTradeModalInputStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowTradeModalType:
            return startTrade(state, action as ShowTradeModalAction);
        case TradeModalSetPercentType:
            return setPercent(state, action as TradeModalSetPercentAction);
        case TradeModalSetUnitsType:
            return setUnits(state, action as TradeModalSetUnitsAction);
        case TradeModalSetPriceTextType:
            return setPriceText(state, action as TradeModalSetPriceTextAction);
        case TradeModalSetUnitsTextType:
            return setUnitsText(state, action as TradeModalSetUnitsTextAction);
        case TradeModalSetPercentTextType:
            return setPercentText(state, action as TradeModalSetPercentTextAction);
        case TradeModalSetPriceType:
            return setPrice(state, action as TradeModalSetPriceAction);
        case TradeModalResetPriceTextType:
            return resetPriceText(state, action as TradeModalResetPriceTextAction);
        case TradeModalResetPercentTextType:
            return resetPercentText(state, action as TradeModalResetPercentTextAction);
        case TradeModalResetUnitsTextType:
            return resetUnitsText(state, action as TradeModalResetUnitsTextAction);
        default:
            return state;
    }
}

function startTrade(state: State, action: ShowTradeModalAction): State {
    const {startPrice} = action.payload;
    return {
        price: startPrice,
        units: 0,
        percent: 0,
        priceText: formatInput(startPrice),
        unitsText: "0.00000",
        percentText: "0.00"
    }
}

function setUnits(state: State, action: TradeModalSetUnitsAction): State {
    const {maxUnits, units} = action.payload;
    let percent: number | null = null;
    let percentText = state.percentText;
    let unitsText = state.unitsText;

    let actualUnits = Math.max(units, 0);

    if (maxUnits != null) {
        actualUnits = Math.min(maxUnits, actualUnits);
        percent = 100 * actualUnits / maxUnits;
        percentText = formatPercent(percent);
    }

    if (units !== actualUnits) {
        unitsText = formatInput(actualUnits)
    }

    return ({
        ...state,
        units: actualUnits,
        unitsText: unitsText,
        percent: percent,
        percentText: percentText
    });
}

function setPercent(state: State, action: TradeModalSetPercentAction): State {
    const {maxUnits, percent} = action.payload;
    let actualPercent = Math.min(Math.max(percent, 0), 100);
    let percentText = state.percentText;
    if (actualPercent !== percent) {
        percentText = formatPercent(actualPercent);
    }

    const units = actualPercent * maxUnits / 100;
    const unitsText = formatInput(units);

    return ({
        ...state,
        unitsText: unitsText,
        units: units,
        percent: actualPercent as number | null,
        percentText: percentText
    });
}

function setPrice(state: State, action: TradeModalSetPriceAction): State {
    const {maxUnits, price} = action.payload;
    let {percent, percentText, units, unitsText} = state;
    //Units and percent go blank when setting price to be 0

    if (maxUnits != null) {
        units = Math.min(maxUnits, units);
        unitsText = formatInput(units);
        percent = 100 * units / maxUnits;
        percentText = formatPercent(percent)
    } else {
        percent = null;
        percentText = "";
    }

    return ({
        ...state,
        price: price,
        percent: percent,
        percentText: percentText,
        units: units,
        unitsText: unitsText
    });
}

function resetPriceText(state: State, action: TradeModalResetPriceTextAction): State {
    return ({
        ...state,
        priceText: formatInput(state.price)
    })
}

function resetPercentText(state: State, action: TradeModalResetPercentTextAction): State {
    const percentText = (state.percent == null) ? "" : formatPercent(state.percent);

    return ({
        ...state,
        percentText: percentText
    });
}

function resetUnitsText(state: State, action: TradeModalResetUnitsTextAction): State {
    return ({
        ...state,
        unitsText: formatInput(state.units)
    })
}

function setPriceText(state: State, action: TradeModalSetPriceTextAction): State {
    return ({
        ...state,
        priceText: action.payload.newText
    })
}

function setUnitsText(state: State, action: TradeModalSetUnitsTextAction): State {
    return ({
        ...state,
        unitsText: action.payload.newText
    });
}

function setPercentText(state: State, action: TradeModalSetPercentTextAction): State {
    return ({
        ...state,
        percentText: action.payload.newText
    })
}