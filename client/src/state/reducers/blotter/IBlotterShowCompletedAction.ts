import {FuncToThunk} from "../../../util/FuncToThunk";

export const BlotterShowCompletedType: string = "BLOTTER_SHOW_COMPLETED";

export default interface IBlotterShowCompletedAction {
    type: typeof BlotterShowCompletedType
}

export class BlotterShowCompletedAction {
    static fire = () => FuncToThunk(BlotterShowCompletedAction.create);

    private static create(): IBlotterShowCompletedAction {
        return {
            type: BlotterShowCompletedType,
        }
    }
}