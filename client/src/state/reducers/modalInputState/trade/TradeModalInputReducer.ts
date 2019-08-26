import IStartTradeAction, {StartTradeType} from "../../modal/trade/IStartTradeAction";
import ITradeModalSetPercentAction, {TradeModalSetPercentType} from "./value/ITradeModalSetPercentAction";
import ITradeModalSetUnitsAction, {TradeModalSetUnitsType} from "./value/ITradeModalSetUnitsAction";
import ITradeModalSetPriceTextAction, {TradeModalSetPriceTextType} from "./text/ITradeModalSetPriceTextAction";
import ITradeModalSetUnitsTextAction, {TradeModalSetUnitsTextType} from "./text/ITradeModalSetUnitsTextAction";
import ITradeModalSetPercentTextAction, {TradeModalSetPercentTextType} from "./text/ITradeModalSetPercentTextAction";
import ITradeModalSetPriceAction, {TradeModalSetPriceType} from "./value/ITradeModalSetPriceAction";
import ITradeModalResetPriceTextAction, {TradeModalResetPriceTextType} from "./resetText/ITradeModalResetPriceTextAction";
import ITradeModalResetPercentTextAction, {TradeModalResetPercentTextType} from "./resetText/ITradeModalResetPercentTextAction";
import ITradeModalResetUnitsTextAction, {TradeModalResetUnitsTextType} from "./resetText/ITradeModalResetUnitsTextAction";
import {formatInput, formatPercent} from "../../../../util/FormatMoney";
import {withChanges} from "../../../../util/WithChanges";
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
        case StartTradeType:
            return startTrade(state, action as IStartTradeAction);
        case TradeModalSetPercentType:
            return setPercent(state, action as ITradeModalSetPercentAction);
        case TradeModalSetUnitsType:
            return setUnits(state, action as ITradeModalSetUnitsAction);
        case TradeModalSetPriceTextType:
            return setPriceText(state, action as ITradeModalSetPriceTextAction);
        case TradeModalSetUnitsTextType:
            return setUnitsText(state, action as ITradeModalSetUnitsTextAction);
        case TradeModalSetPercentTextType:
            return setPercentText(state, action as ITradeModalSetPercentTextAction);
        case TradeModalSetPriceType:
            return setPrice(state, action as ITradeModalSetPriceAction);
        case TradeModalResetPriceTextType:
            return resetPriceText(state, action as ITradeModalResetPriceTextAction);
        case TradeModalResetPercentTextType:
            return resetPercentText(state, action as ITradeModalResetPercentTextAction);
        case TradeModalResetUnitsTextType:
            return resetUnitsText(state, action as ITradeModalResetUnitsTextAction);
        default:
            return state;
    }
}

function startTrade(state: State, action: IStartTradeAction): State {
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

function setUnits(state: State, action: ITradeModalSetUnitsAction): State {
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

    return withChanges(state, {
        units: actualUnits,
        unitsText: unitsText,
        percent: percent,
        percentText: percentText
    });
}

function setPercent(state: State, action: ITradeModalSetPercentAction): State {
    const {maxUnits, percent} = action.payload;
    let actualPercent = Math.min(Math.max(percent, 0), 100);
    let percentText = state.percentText;
    if (actualPercent !== percent) {
        percentText = formatPercent(actualPercent);
    }

    const units = actualPercent * maxUnits / 100;
    const unitsText = formatInput(units);

    return withChanges(state, {
        unitsText: unitsText,
        units: units,
        percent: actualPercent as number | null,
        percentText: percentText
    });
}

function setPrice(state: State, action: ITradeModalSetPriceAction): State {
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

    return withChanges(state, {
        price: price,
        percent: percent,
        percentText: percentText,
        units: units,
        unitsText: unitsText
    });
}

function resetPriceText(state: State, action: ITradeModalResetPriceTextAction): State {
    return withChanges(state, {
        priceText: formatInput(state.price)
    })
}

function resetPercentText(state: State, action: ITradeModalResetPercentTextAction): State {
    const percentText = (state.percent == null) ? "" : formatPercent(state.percent);

    return withChanges(state, {
        percentText: percentText
    });
}

function resetUnitsText(state: State, action: ITradeModalResetUnitsTextAction): State {
    return withChanges(state, {
        unitsText: formatInput(state.units)
    })
}

function setPriceText(state: State, action: ITradeModalSetPriceTextAction): State {
    return withChanges(state, {
        priceText: action.payload.newText
    })
}

function setUnitsText(state: State, action: ITradeModalSetUnitsTextAction): State {
    return withChanges(state, {
        unitsText: action.payload.newText
    });
}

function setPercentText(state: State, action: ITradeModalSetPercentTextAction): State {
    return withChanges(state, {
        percentText: action.payload.newText
    })
}