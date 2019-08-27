import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import NumberField from "../../../NumberField";
import {ThunkDispatch} from "redux-thunk"
import TradeModalSetUnitsTextAction, {createTradeModalSetUnitsTextAction,} from "../../../../state/reducers/modalInputState/trade/text/TradeModalSetUnitsTextAction";
import TradeModalSetUnitsAction, {createTradeModalSetUnitsAction,} from "../../../../state/reducers/modalInputState/trade/value/TradeModalSetUnitsAction";
import TradeModalResetUnitsTextAction, {createTradeModalResetUnitsTextAction,} from "../../../../state/reducers/modalInputState/trade/resetText/TradeModalResetUnitsTextAction";
import {fire, fireNP} from "../../../../util/Thunker";

type Actions = TradeModalSetUnitsAction | TradeModalSetUnitsTextAction | TradeModalResetUnitsTextAction

interface DispatchProps {
    onValueChange: (newUnits: number) => void,
    onTextChange: (newText: string) => void,
    onDone: () => void,
}

interface StateProps {
    text: string,
    value: number,
    append: string,
}

interface OwnProps {
    step: number
}


function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
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