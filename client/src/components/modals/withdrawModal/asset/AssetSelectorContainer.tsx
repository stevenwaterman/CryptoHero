import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import AssetSelector from "./AssetSelector";
import {ThunkDispatch} from "redux-thunk";
import IWithdrawModalSetAssetAction, {WithdrawModalSetAssetAction} from "../../../../state/reducers/modalInputState/withdraw/value/IWithdrawModalSetAssetAction";

type Actions = IWithdrawModalSetAssetAction

interface DispatchProps {
    onValueChange: (newAsset: string) => void,
}

interface StateProps {
    assets: Array<string>,
    selected: string
}

interface OwnProps {
}

export type AssetSelectorProps = DispatchProps & StateProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<State, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onValueChange: newAsset => dispatch(WithdrawModalSetAssetAction.fire(newAsset)),
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        selected: state.withdrawModalInput.asset,
        assets: state.funds.availableFunds.map(it => it[0])
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetSelector)
