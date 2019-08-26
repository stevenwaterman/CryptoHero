import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import NumberField from "../../../NumberField";
import {ThunkDispatch} from "redux-thunk"
import ITradeModalSetUnitsTextAction, {TradeModalSetUnitsTextAction} from "../../../../state/reducers/modalInputState/trade/text/ITradeModalSetUnitsTextAction";
import ITradeModalSetUnitsAction, {TradeModalSetUnitsAction} from "../../../../state/reducers/modalInputState/trade/value/ITradeModalSetUnitsAction";
import ITradeModalResetUnitsTextAction, {TradeModalResetUnitsTextAction} from "../../../../state/reducers/modalInputState/trade/resetText/ITradeModalResetUnitsTextAction";

type Actions = ITradeModalSetUnitsAction | ITradeModalSetUnitsTextAction | ITradeModalResetUnitsTextAction

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
        onValueChange: newUnits => dispatch(TradeModalSetUnitsAction.fire(newUnits)),
        onTextChange: newText => dispatch(TradeModalSetUnitsTextAction.fire(newText)),
        onDone: () => dispatch(TradeModalResetUnitsTextAction.fire())
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