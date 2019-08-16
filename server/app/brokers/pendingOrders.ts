import Order from "../trading/order";

export default class PendingOrders {
  readonly buy: Array<Order>;
  readonly sell: Array<Order>;
  constructor(buys: Array<Order>, sells: Array<Order>) {
    this.buy = buys;
    this.sell = sells;
  }
}
