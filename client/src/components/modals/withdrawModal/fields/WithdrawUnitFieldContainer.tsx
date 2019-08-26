import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import {ThunkDispatch} from "redux-thunk"
import IWithdrawModalSetUnitsTextAction, {WithdrawModalSetUnitsTextAction} from "../../../../state/reducers/modalInputState/withdraw/text/IWithdrawModalSetUnitsTextAction";
import IWithdrawModalSetUnitsAction, {WithdrawModalSetUnitsAction} from "../../../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetUnitsAction";
import NumberField from "../../../NumberField";
import IWithdrawModalResetUnitsTextAction, {WithdrawModalResetUnitsTextAction} from "../../../../state/reducers/modalInputState/withdraw/resetText/IWithdrawModalResetUnitsTextAction";

type Actions = IWithdrawModalSetUnitsAction | IWithdrawModalSetUnitsTextAction | IWithdrawModalResetUnitsTextAction

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
        onValueChange: newUnits => dispatch(WithdrawModalSetUnitsAction.fire(newUnits)),
        onTextChange: newText => dispatch(WithdrawModalSetUnitsTextAction.fire(newText)),
        onDone: () => dispatch(WithdrawModalResetUnitsTextAction.fire())
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        text: state.withdrawModalInput.unitsText,
        value: state.withdrawModalInput.units,
        append: state.withdrawModalInput.asset,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NumberField)