import {FuncToThunk} from "../../../../util/FuncToThunk";

export const HideTradeModalType: string = "HIDE_TRADE_MODAL";

export default interface IHideTradeModalAction {
    type: typeof HideTradeModalType
}

export class HideTradeModalAction {
    static fire = () => FuncToThunk(HideTradeModalAction.create);

    private static create(): IHideTradeModalAction {
        return {
            type: HideTradeModalType,
        }
    }
}