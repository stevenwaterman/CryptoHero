import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import NumberField from "./NumberField";
import ISetPercentAction from "../../../../state/reducers/trade/value/ISetPercentAction";
import {ThunkDispatch} from "redux-thunk"
import ISetUnitsTextAction, {SetUnitsTextAction} from "../../../../state/reducers/trade/text/ISetUnitsTextAction";
import {SetUnitsAction} from "../../../../state/reducers/trade/value/ISetUnitsAction";
import IResetUnitsTextAction, {ResetUnitsTextAction} from "../../../../state/reducers/trade/resetText/IResetUnitsTextAction";

type Actions = ISetPercentAction | ISetUnitsTextAction | IResetUnitsTextAction

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
        onValueChange: newUnits => dispatch(SetUnitsAction.fire(newUnits)),
        onTextChange: newText => dispatch(SetUnitsTextAction.fire(newText)),
        onDone: () => dispatch(ResetUnitsTextAction.fire())
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.trade.unitsText,
        value: state.trade.units,
        append: state.trade.instrument.asset1,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)