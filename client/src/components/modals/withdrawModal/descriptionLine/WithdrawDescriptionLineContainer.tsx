import {connect} from "react-redux";
import {State} from "../../../../modules/RootStore";
import WithdrawDescriptionLine from "./WithdrawDescriptionLine";
import Big from "big.js";

interface DispatchProps {
}

interface StateProps {
    asset: string
    units: Big,
}

interface OwnProps {
}

export type WithdrawDescriptionLineProps = DispatchProps & StateProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        asset: state.withdrawModalInput.asset,
        units: state.withdrawModalInput.units,
    }
}

export default connect(
    mapStateToProps
)(WithdrawDescriptionLine)
