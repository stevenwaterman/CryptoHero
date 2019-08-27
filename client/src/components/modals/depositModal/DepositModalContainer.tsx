import {connect} from "react-redux";
import {Store} from "redux"
import {State} from "../../../state/store/RootStore";
import DepositModal from "./DepositModal";
import {ThunkDispatch} from "redux-thunk";
import ConfirmDepositAction, {createConfirmDepositAction} from "../../../state/reducers/funds/ConfirmDepositAction";
import HideDepositModalAction, {createHideDepositModalAction} from "../../../state/reducers/modal/deposit/HideDepositModalAction";
import {fireNP} from "../../../util/StatefulActionCreator";

type Actions = ConfirmDepositAction | HideDepositModalAction

interface DispatchProps {
    onConfirm: () => void,
    onHide: () => void,
}

interface StateProps {
    canConfirm: boolean
    show: boolean
}

interface OwnProps {
}

export type DepositModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<Store, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: fireNP(dispatch, createConfirmDepositAction),
        onHide: fireNP(dispatch, createHideDepositModalAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        canConfirm: state.depositModalInput.units > 0,
        show: state.modalVisibility.depositVisible
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DepositModal)