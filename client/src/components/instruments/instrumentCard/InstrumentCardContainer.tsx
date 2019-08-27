import {connect} from "react-redux";
import InstrumentCard from "./InstrumentCard";
import {Store} from "redux"
import Instrument from "../../../models/Instrument";
import {ThunkDispatch} from "redux-thunk"
import InstrumentSelectionAction, {createInstrumentSelectionAction} from "../../../state/reducers/instrument/InstrumentSelectionAction";
import ShowTradeModalAction, {createShowTradeModalAction} from "../../../state/reducers/modal/trade/ShowTradeModalAction";
import {fire} from "../../../util/Thunker";
import {State} from "../../../state/store/RootStore";

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

function mapDispatchToProps(dispatch: ThunkDispatch<Store, void, Actions>, ownProps: OwnProps): DispatchProps {
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