import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import {ThunkDispatch} from "redux-thunk"
import NumberField from "../../NumberField";
import DepositModalSetUnitsAction, {createDepositModalSetUnitsAction} from "../../../modules/modals/deposit/input/DepositModalSetUnitsAction";
import DepositModalResetUnitsTextAction, {createDepositModalResetUnitsTextAction} from "../../../modules/modals/deposit/input/DepositModalResetUnitsTextAction";
import DepositModalSetUnitsTextAction, {createDepositModalSetUnitsTextAction} from "../../../modules/modals/deposit/input/DepositModalSetUnitsTextAction";
import {fire, fireNP, ThunkDsp} from "../../../util/Thunker";

type Actions = DepositModalSetUnitsAction | DepositModalSetUnitsTextAction | DepositModalResetUnitsTextAction

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

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: fire(dispatch, createDepositModalSetUnitsAction),
        onTextChange: fire(dispatch, createDepositModalSetUnitsTextAction),
        onDone: fireNP(dispatch, createDepositModalResetUnitsTextAction)
    }
}

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