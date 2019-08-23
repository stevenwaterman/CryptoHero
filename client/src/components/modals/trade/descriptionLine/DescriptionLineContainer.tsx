import {connect} from "react-redux";
import {State} from "../../../../state/store/RootStore";
import DescriptionLine from "./DescriptionLine";

interface DispatchProps {
}

interface StateProps {
    buying: boolean

    units: number,
    price: number,

    asset1: string
    asset1Amount: number

    asset2: string,
    asset2Amount: number
}

interface OwnProps {
}

export type DescriptionLineProps = DispatchProps & StateProps & OwnProps

// noinspection JSUnusedLocalSymbols
function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        buying: state.trade.buying,
        asset1: state.trade.instrument.asset1,
        asset1Amount: state.trade.units,
        asset2: state.trade.instrument.asset2,
        asset2Amount: state.trade.units * state.trade.price,
        price: state.trade.price,
        units: state.trade.units
    }
}

export default connect(
    mapStateToProps
)(DescriptionLine)
