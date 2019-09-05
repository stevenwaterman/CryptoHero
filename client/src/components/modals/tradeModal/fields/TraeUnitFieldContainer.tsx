import {connect} from "react-redux";
import {State} from "../../../../modules/RootStore";
import NumberField from "../../../NumberField";
import TradeModalSetUnitsTextAction, {createTradeModalSetUnitsTextAction,} from "../../../../modules/modals/trade/input/text/TradeModalSetUnitsTextAction";
import TradeModalSetUnitsAction, {createTradeModalSetUnitsAction,} from "../../../../modules/modals/trade/input/value/TradeModalSetUnitsAction";
import TradeModalResetUnitsTextAction, {createTradeModalResetUnitsTextAction,} from "../../../../modules/modals/trade/input/resetText/TradeModalResetUnitsTextAction";
import {fire, fireNP, ThunkDsp} from "../../../../util/Thunker";
import Big from "big.js";

type Actions = TradeModalSetUnitsAction | TradeModalSetUnitsTextAction | TradeModalResetUnitsTextAction

interface DispatchProps {
    onValueChange: (newUnits: Big) => void,
    onTextChange: (newText: string) => void,
    onDone: () => void,
}

interface StateProps {
    text: string,
    value: Big,
    append: string,
}

interface OwnProps {
    step: number
}


function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: fire(dispatch, createTradeModalSetUnitsAction),
        onTextChange: fire(dispatch, createTradeModalSetUnitsTextAction),
        onDone: fireNP(dispatch, createTradeModalResetUnitsTextAction)
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.tradeModalInput.unitsText,
        value: state.tradeModalInput.units,
        append: state.tradeModal.instrument.asset1,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)