import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction, {WithdrawModalSetAssetAction} from "../../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";
import AssetSelector from "../../AssetSelector";

type Actions = IWithdrawModalSetAssetAction

interface DispatchProps {
    onValueChange: (newAsset: string) => void,
}

interface StateProps {
    assets: Array<string>,
    selectedAsset: string
}

interface OwnProps {
}

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: newAsset => dispatch(WithdrawModalSetAssetAction.fire(newAsset)),
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        selectedAsset: state.withdrawModalInput.asset,
        assets: state.funds.availableFunds.map(it => it[0])
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSelector)
