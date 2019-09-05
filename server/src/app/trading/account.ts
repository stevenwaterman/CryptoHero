import {Big} from "big.js";
import uuidv4 from "uuid/v4";
import Asset from "./asset";
import * as Immutable from "immutable";
import {REGISTRY} from "../registry";
import Order from "./order";
import Room from "../websockets/Room";
import * as AccountPayloads from "../websockets/AccountPayloads"

export default class Account {
    id: string = uuidv4();

    /**
     * The amount left to place on new orders
     */
    private readonly availableAssets: Map<Asset, Big> = new Map<Asset, Big>(
        Asset.ALL.map((asset: Asset) => [asset, Big(0)])
    );

    private readonly orders: Array<Order> = [];

    getOrders(): Array<Order> {
        return this.orders;
    }

    addOrder(order: Order): void {
        this.orders.push(order);

        const changedOrderRoom = this.changedOrderRoom;
        const self = this;
        order.tradeAddedRoom.join(payload => changedOrderRoom.fire({
                self: self,
                changedOrder: payload.self
            })
        );

        order.cancelledRoom.join(payload => changedOrderRoom.fire({
            self: self,
            changedOrder: payload.self
        }));

        this.newOrderRoom.fire({
            self: this,
            newOrder: order
        });
    }

    readonly newOrderRoom = new Room<AccountPayloads.NewOrder>();
    readonly changedOrderRoom = new Room<AccountPayloads.OrderChanged>();
    readonly availableFundsRoom = new Room<AccountPayloads.FundsChanged>();

    constructor() {
        REGISTRY.registerAccount(this);
    }

    adjustAssets(asset: Asset, addUnits: Big): void {
        const newAmount = this.getAvailableAssets(asset).plus(addUnits);
        this.availableAssets.set(
            asset,
            newAmount
        );
        this.availableFundsRoom.fire({
            self: this,
            asset: asset,
            newAmount: newAmount
        })
    }

    getAllAvailableAssets(): Immutable.Map<Asset, Big> {
        return Immutable.Map<Asset, Big>().withMutations(map => {
            this.availableAssets.forEach((amount, asset) => {
                map.set(asset, amount);
            })
        });
    }

    getAvailableAssets(asset: Asset): Big {
        return this.availableAssets.get(asset) as Big;
    }
}
