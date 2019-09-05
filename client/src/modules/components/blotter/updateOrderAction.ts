import Order from "../../../models/Order";

export const UpdateOrderType: string = "UPDATE_ORDER";

export default interface UpdateOrderAction {
    type: typeof UpdateOrderType,
    payload: {
        order: Order
    }
}

export function createUpdateOrderAction(order: Order): UpdateOrderAction {
    return {
        type: UpdateOrderType,
        payload: {
            order: order
        }
    }
}