import {connect} from "react-redux";
import InstrumentCard from "./InstrumentCard";
import {Dispatch} from "redux"
import {InstrumentActions} from "../../../state/store/InstrumentStore";
import {InstrumentSelectionAction} from "../../../state/reducers/instrument/IInstrumentSelectionAction";
import {State} from "../../../state/store/RootStore";
import Instrument from "../../../models/Instrument";
import IStartTradeAction, {StartTradeAction} from "../../../state/reducers/trade/IStartTradeAction";

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

function mapDispatchToProps(dispatch: Dispatch<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onCardClick: () => dispatch(InstrumentSelectionAction.create(ownProps.instrument)),
        onBuyClick: () => dispatch(StartTradeAction.create(true, ownProps.instrument, ownProps.price)),
        onSellClick: () => dispatch(StartTradeAction.create(false, ownProps.instrument, ownProps.price))
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