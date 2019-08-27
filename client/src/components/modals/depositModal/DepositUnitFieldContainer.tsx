import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import {ThunkDispatch} from "redux-thunk"
import NumberField from "../../NumberField";
import DepositModalSetUnitsAction, {createDepositModalSetUnitsAction} from "../../../state/reducers/modalInputState/deposit/DepositModalSetUnitsAction";
import DepositModalResetUnitsTextAction, {createDepositModalResetUnitsTextAction} from "../../../state/reducers/modalInputState/deposit/DepositModalResetUnitsTextAction";
import DepositModalSetUnitsTextAction, {createDepositModalSetUnitsTextAction} from "../../../state/reducers/modalInputState/deposit/DepositModalSetUnitsTextAction";
import {fire, fireNP} from "../../../util/Thunker";

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

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
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