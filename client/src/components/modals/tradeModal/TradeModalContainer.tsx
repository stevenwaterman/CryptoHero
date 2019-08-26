import {connect} from "react-redux";
import {Dispatch} from "redux"
import {State} from "../../../state/store/RootStore";
import IConfirmTradeAction, {ConfirmTradeAction} from "../../../state/reducers/modal/trade/IConfirmTradeAction";
import TradeModal from "./TradeModal";
import IHideTradeModalAction, {HideTradeModalAction} from "../../../state/reducers/modal/trade/IHideTradeModalAction";

type Actions = IConfirmTradeAction | IHideTradeModalAction

interface DispatchProps {
    onConfirm: () => void,
    onHide: () => void,
}

interface StateProps {
    show: boolean,
    buying: boolean
    canConfirm: boolean,
    asset1: string,
    sourceAsset: string,
    targetAsset: string,
}

interface OwnProps {
}

export type TradeModalProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: Dispatch<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: () => ConfirmTradeAction.fire,
        onHide: () => HideTradeModalAction.fire
    }
}

function source(state: State): string {
    return state.tradeModal.buying ? state.tradeModal.instrument.asset2 : state.tradeModal.instrument.asset1
}

function target(state: State): string {
    return state.tradeModal.buying ? state.tradeModal.instrument.asset1 : state.tradeModal.instrument.asset2
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        show: state.modalVisibility.tradeVisible,
        buying: state.tradeModal.buying,
        canConfirm: state.tradeModalInput.units > 0,
        asset1: state.tradeModal.instrument.asset1,
        sourceAsset: source(state),
        targetAsset: target(state),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeModal)