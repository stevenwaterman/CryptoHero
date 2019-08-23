import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import NumberField from "./NumberField";
import ISetAmountAction, {SetAmountAction} from "../../../../state/reducers/trade/value/ISetAmountAction";
import {ThunkDispatch} from "redux-thunk"
import ISetUnitsTextAction, {SetUnitsTextAction} from "../../../../state/reducers/trade/text/ISetUnitsTextAction";

type Actions = ISetAmountAction | ISetUnitsTextAction

interface DispatchProps {
    onValueChange: (newUnits: number) => void,
    onTextChange: (newText: string) => void,
}

interface StateProps {
    text: string,
    value: number,
    append: string,
    enable: boolean
}

interface OwnProps {
    step: number
}


function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: newUnits => dispatch(SetAmountAction.fireWithUnits(newUnits)),
        onTextChange: newText => dispatch(SetUnitsTextAction.fire(newText))
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.trade.unitsText,
        value: state.trade.units,
        append: state.trade.instrument.asset1,
        enable: true
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)