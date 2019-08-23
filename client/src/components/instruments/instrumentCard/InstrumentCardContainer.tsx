import {connect} from "react-redux";
import InstrumentCard from "./InstrumentCard";
import {Store} from "redux"
import {InstrumentActions} from "../../../state/store/InstrumentStore";
import {InstrumentSelectionAction} from "../../../state/reducers/instrument/IInstrumentSelectionAction";
import {State} from "../../../state/store/RootStore";
import Instrument from "../../../models/Instrument";
import IStartTradeAction, {StartTradeAction} from "../../../state/reducers/trade/IStartTradeAction";
import {ThunkDispatch} from "redux-thunk"

type Actions = InstrumentActions | IStartTradeAction

interface DispatchProps {
    onCardClick: () => void,
    onBuyClick: () => void,
    onSellClick: () => void
}

interface StateProps {
}

interface OwnProps {
    instrument: Instrument,
    price: number,
    selected: boolean,
}

export type InstrumentCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDispatch<Store, void, Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onCardClick: () => dispatch(InstrumentSelectionAction.fire(ownProps.instrument)),
        onBuyClick: () => dispatch(StartTradeAction.fire(true, ownProps.instrument)),
        onSellClick: () => dispatch(StartTradeAction.fire(false, ownProps.instrument))
    }
}

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentCard)