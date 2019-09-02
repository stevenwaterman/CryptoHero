import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import AssetSelector from "../../AssetSelector";
import WithdrawModalSetAssetAction, {createWithdrawModalSetAssetAction} from "../../../modules/modals/withdraw/input/value/WithdrawModalSetAssetAction";
import {fire, ThunkDsp} from "../../../util/Thunker";

type Actions = WithdrawModalSetAssetAction

interface DispatchProps {
    onValueChange: (newAsset: string) => void,
}

interface StateProps {
    assets: Array<string>,
    selectedAsset: string
}

interface OwnProps {
}

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: fire(dispatch, createWithdrawModalSetAssetAction),
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const assets = Array.from(state.funds.availableFunds.keys());
    return {
        selectedAsset: state.withdrawModalInput.asset,
        assets: assets
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSelector)
