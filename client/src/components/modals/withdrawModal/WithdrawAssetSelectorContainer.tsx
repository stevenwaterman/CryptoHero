import {connect} from "react-redux";
import {State} from "../../../state/store/RootStore";
import {ThunkDispatch} from "redux-thunk";
import AssetSelector from "../../AssetSelector";
import WithdrawModalSetAssetAction, {createWithdrawModalSetAssetAction} from "../../../state/reducers/modalInputState/withdraw/value/WithdrawModalSetAssetAction";
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
    return {
        selectedAsset: state.withdrawModalInput.asset,
        assets: state.funds.availableFunds.map(it => it[0])
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSelector)
