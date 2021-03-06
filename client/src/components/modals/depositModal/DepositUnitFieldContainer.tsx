import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import NumberField from "../../NumberField";
import {fire, fireNP, ThunkDsp} from "../../../util/Thunker";
import DepositModalSetUnitsAction, {createDepositModalSetUnitsAction} from "../../../modules/modals/deposit/input/DepositModalSetUnitsAction";
import DepositModalResetUnitsTextAction, {createDepositModalResetUnitsTextAction} from "../../../modules/modals/deposit/input/DepositModalResetUnitsTextAction";
import DepositModalSetUnitsTextAction, {createDepositModalSetUnitsTextAction} from "../../../modules/modals/deposit/input/DepositModalSetUnitsTextAction";
import Big from "big.js";

type Actions = DepositModalSetUnitsAction | DepositModalSetUnitsTextAction | DepositModalResetUnitsTextAction

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