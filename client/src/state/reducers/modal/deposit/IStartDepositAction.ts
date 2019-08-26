import {FuncToThunk} from "../../../../util/FuncToThunk";

export const StartDepositType: string = "DEPOSIT_START";

export default interface IStartDepositAction {
    type: typeof StartDepositType
}

export class StartDepositAction {
    static fire = () => FuncToThunk(StartDepositAction.create);

    private static create(): IStartDepositAction {
        return {
            type: StartDepositType,
        }
    }
}