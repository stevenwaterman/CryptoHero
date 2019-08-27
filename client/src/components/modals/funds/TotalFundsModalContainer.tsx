import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import TotalFundsModal from "./TotalFundsModal";
import {Store} from "redux";
import HideTotalFundsModalAction, {createHideTotalFundsModalAction} from "../../../state/reducers/modal/totalFunds/HideTotalFundsModalAction";
import {ThunkDispatch} from "redux-thunk";
import {fireNP, ThunkDsp} from "../../../util/Thunker";

type Actions = HideTotalFundsModalAction

interface DispatchProps {
    onHide: () => void;
}

interface StateProps {
    totalFunds: Array<[string, number]>
    show: boolean
}

interface OwnProps {
}

export type TotalFundsModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onHide: fireNP(dispatch, createHideTotalFundsModalAction)
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        totalFunds: state.funds.totalFunds,
        show: state.modalVisibility.totalFundsVisible
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TotalFundsModal)