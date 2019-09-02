import {connect} from "react-redux";
import {Dispatch} from "redux"
import {State} from "../../../modules/RootStore";
import TradeModal from "./TradeModal";
import {fireNP, firePromiseNP, ThunkDsp} from "../../../util/Thunker";
import ConfirmTradeAction, {createConfirmTradeAction} from "../../../modules/modals/trade/ConfirmTradeAction";
import HideTradeModalAction, {createHideTradeModalAction} from "../../../modules/modals/trade/HideTradeModalAction";
import {createLoadAction} from "../../../modules/global/LoadAccountAction";

type Actions = ConfirmTradeAction | HideTradeModalAction

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

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onConfirm: async () => {
            await dispatch(createConfirmTradeAction())
        },
        onHide: fireNP(dispatch, createHideTradeModalAction)
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