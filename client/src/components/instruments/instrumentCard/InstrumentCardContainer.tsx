import {connect} from "react-redux";
import InstrumentCard from "./InstrumentCard";
import {Store} from "redux"
import Instrument from "../../../models/Instrument";
import {ThunkDispatch} from "redux-thunk"
import InstrumentSelectionAction, {createInstrumentSelectionAction} from "../../../modules/components/instruments/InstrumentSelectionAction";
import ShowTradeModalAction, {createShowTradeModalAction} from "../../../modules/modals/trade/ShowTradeModalAction";
import {fire, ThunkDsp} from "../../../util/Thunker";
import {State} from "../../../modules/RootStore";

type Actions = InstrumentSelectionAction | ShowTradeModalAction

interface DispatchProps {
    onCardClick: (instrument: Instrument) => void,
    onTradeClick: ([buy, instrument]: [boolean, Instrument]) => void,
}

interface StateProps {
}

interface OwnProps {
    instrument: Instrument,
    price: number,
    selected: boolean,
}

export type InstrumentCardProps = StateProps & DispatchProps & OwnProps

function mapDispatchToProps(dispatch: ThunkDsp<Actions>, ownProps: OwnProps): DispatchProps {
    return {
        onCardClick: fire(dispatch, createInstrumentSelectionAction),
        onTradeClick: fire(dispatch, createShowTradeModalAction),
    }
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentCard)