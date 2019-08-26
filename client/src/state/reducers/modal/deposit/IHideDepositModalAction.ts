import {FuncToThunk} from "../../../../util/FuncToThunk";

export const HideDepositModalType: string = "HIDE_DEPOSIT_MODAL";

export default interface IHideDepositModalAction {
    type: typeof HideDepositModalType
}

export class HideDepositModalAction {
    static fire = () => FuncToThunk(HideDepositModalAction.create);

    private static create(): IHideDepositModalAction {
        return {
            type: HideDepositModalType,
        }
    }
}