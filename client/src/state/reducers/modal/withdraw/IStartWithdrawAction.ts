import {FuncToThunk} from "../../../../util/FuncToThunk";

export const StartWithdrawType: string = "WITHDRAW_START";

export default interface IStartWithdrawAction {
    type: typeof StartWithdrawType
}

export class StartWithdrawAction {
    static fire = () => FuncToThunk(StartWithdrawAction.create);

    private static create(): IStartWithdrawAction {
        return {
            type: StartWithdrawType,
        }
    }
}