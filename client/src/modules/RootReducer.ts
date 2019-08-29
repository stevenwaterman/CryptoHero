import {combineReducers} from "redux";
import {instrumentReducer} from "./components/instruments/InstrumentReducer";
import {tradeModalReducer} from "./modals/trade/TradeModalReducer";
import {availableFundsReducer} from "./components/availableFunds/AvailableFundsReducer";
import {tradeModalInputReducer} from "./modals/trade/input/TradeModalInputReducer";
import {withdrawModalInputReducer} from "./modals/withdraw/input/WithdrawModalInputReducer";
import {depositModalInputReducer} from "./modals/deposit/input/DepositModalInputReducer";
import {blotterReducer} from "./components/blotter/BlotterReducer";
import {modalVisibilityReducer} from "./modals/ModalVisibilityReducer";
import {viewOrderModalReducer} from "./modals/viewOrder/ViewOrderModalReducer";
import {chartReducer} from "./components/chart/ChartReducer";
import {totalFundsModalReducer} from "./modals/totalFunds/TotalFundsModalReducer";
import {accountReducer} from "./global/AccountReducer";

export default combineReducers({
    modalVisibility: modalVisibilityReducer,
    instruments: instrumentReducer,
    funds: availableFundsReducer,
    blotter: blotterReducer,
    chart: chartReducer,
    account: accountReducer,

    tradeModal: tradeModalReducer,
    tradeModalInput: tradeModalInputReducer,

    withdrawModalInput: withdrawModalInputReducer,
    depositModalInput: depositModalInputReducer,

    viewOrderModal: viewOrderModalReducer,
    totalFundsModal: totalFundsModalReducer
})