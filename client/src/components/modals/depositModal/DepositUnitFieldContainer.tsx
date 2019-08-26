import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import {ThunkDispatch} from "redux-thunk"
import IDepositModalSetUnitsAction, {DepositModalSetUnitsAction} from "../../../state/reducers/modalInputState/deposit/IDepositModalSetUnitsAction";
import NumberField from "../../NumberField";
import IDepositModalSetUnitsTextAction, {DepositModalSetUnitsTextAction} from "../../../state/reducers/modalInputState/deposit/IDepositModalSetUnitsTextAction";
import IDepositModalResetUnitsTextAction, {DepositModalResetUnitsTextAction} from "../../../state/reducers/modalInputState/deposit/IDepositModalResetUnitsTextAction";

type Actions = IDepositModalSetUnitsAction | IDepositModalSetUnitsTextAction | IDepositModalResetUnitsTextAction

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
        onValueChange: newUnits => dispatch(DepositModalSetUnitsAction.fire(newUnits)),
        onTextChange: newText => dispatch(DepositModalSetUnitsTextAction.fire(newText)),
        onDone: () => dispatch(DepositModalResetUnitsTextAction.fire())
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.depositModalInput.unitsText,
        value: state.depositModalInput.units,
        append: state.depositModalInput.asset,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)