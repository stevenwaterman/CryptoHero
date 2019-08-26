import {FuncToThunk} from "../../../../util/FuncToThunk";

export const ShowDepositModalType: string = "SHOW_DEPOSIT_MODAL";

export default interface IShowDepositModalAction {
    type: typeof ShowDepositModalType
}

export class ShowDepositModalAction {
    static fire = () => FuncToThunk(ShowDepositModalAction.create);

    private static create(): IShowDepositModalAction {
        return {
            type: ShowDepositModalType,
        }
    }
}