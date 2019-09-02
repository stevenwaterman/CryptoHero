import {connect} from "react-redux";
import {State} from "../../../modules/RootStore";
import AssetSelector from "../../AssetSelector";
import {fire, ThunkDsp} from "../../../util/Thunker";
import DepositModalSetAssetAction, {createDepositModalSetAssetAction} from "../../../modules/modals/deposit/input/DepositModalSetAssetAction";

type Actions = DepositModalSetAssetAction

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
        onValueChange: fire(dispatch, createDepositModalSetAssetAction),
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    const assets = Array.from(state.funds.availableFunds.keys());
    return {
        selectedAsset: state.depositModalInput.asset,
        assets: assets
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSelector)