import {FuncToThunk} from "../../../util/FuncToThunk";

interface IPayload {
    pendingSelected: boolean
}

export const BlotterSetCategoryType: string = "BLOTTER_SET_CATEGORY";

export default interface IBlotterSetCategoryAction {
    type: typeof BlotterSetCategoryType
    payload: IPayload
}

export class BlotterSetCategoryAction {
    static fire = (selectPending: boolean) => FuncToThunk(() => BlotterSetCategoryAction.create(selectPending));

    private static create(pendingSelected: boolean): IBlotterSetCategoryAction {
        return {
            type: BlotterSetCategoryType,
            payload: {
                pendingSelected: pendingSelected
            }
        }
    }
}