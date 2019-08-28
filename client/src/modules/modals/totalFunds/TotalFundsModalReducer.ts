import TotalFundsModalStore, {
    initialTotalFundsModalStore,
    TotalFundsModalActions
} from "./TotalFundsModalStore";
import TotalFundsModal from "../../../components/modals/funds/TotalFundsModal";
import ShowTotalFundsModalAction, {ShowTotalFundsModalType} from "./ShowTotalFundsModalAction";

type State = TotalFundsModalStore
type Actions = TotalFundsModalActions

function showModal(state: State, action: ShowTotalFundsModalAction): State {
    return {
        ...state,
        funds: action.payload.totalFunds
    }
}

export function totalFundsModalReducer(
    state: State = initialTotalFundsModalStore,
    action: Actions
): State {
    switch (action.type) {
        case ShowTotalFundsModalType:
            return showModal(state, action as ShowTotalFundsModalAction);
        default:
            return state;
    }
}
