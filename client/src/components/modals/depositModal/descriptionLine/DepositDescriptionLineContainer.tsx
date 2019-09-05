import {connect} from "react-redux";
import {State} from "../../../../modules/RootStore";
import DepositDescriptionLine from "./DepositDescriptionLine";
import Big from "big.js";

interface DispatchProps {
}

interface StateProps {
    asset: string
    units: Big,
}

interface OwnProps {
}

export type DepositDescriptionLineProps = DispatchProps & StateProps & OwnProps

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        asset: state.depositModalInput.asset,
        units: state.depositModalInput.units,
    }
}

export default connect(
    mapStateToProps
)(DepositDescriptionLine)
