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

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        buying: state.tradeModal.buying,
        asset1: state.tradeModal.instrument.asset1,
        asset1Amount: state.tradeModalInput.units,
        asset2: state.tradeModal.instrument.asset2,
        asset2Amount: state.tradeModalInput.units * state.tradeModalInput.price,
        price: state.tradeModalInput.price,
        units: state.tradeModalInput.units
    }
}

export default connect(
    mapStateToProps
)(DescriptionLine)
