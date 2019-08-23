import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import TotalFundsModal from "./TotalFundsModal";


interface DispatchProps {
}

interface StateProps {
    totalFunds: Array<[string, number]>
}

interface OwnProps {
}

export type TotalFundsModalProps = StateProps & DispatchProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        totalFunds: state.funds.availableFunds
    }
}

export default connect(
    mapStateToProps,
)(TotalFundsModal)