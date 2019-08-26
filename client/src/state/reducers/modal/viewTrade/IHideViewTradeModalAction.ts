import {FuncToThunk} from "../../../../util/FuncToThunk";

export const HideViewTradeModalType: string = "HIDE_VIEW_TRADE_MODAL";

export default interface IHideViewTradeModalAction {
    type: typeof HideViewTradeModalType
}

export class HideViewTradeModalAction {
    static fire = () => FuncToThunk(HideViewTradeModalAction.create);

    private static create(): IHideViewTradeModalAction {
        return {
            type: HideViewTradeModalType,
        }
    }
}