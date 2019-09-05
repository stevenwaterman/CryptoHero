import Account from "./trading/account";
import Order from "./trading/order";
import Trade from "./trading/trade";

class Registry {
    readonly accounts: Map<string, Account> = new Map<string, Account>();
    private readonly orders: Map<string, Order> = new Map<string, Order>();
    private readonly trades: Map<string, Trade> = new Map<string, Trade>();

    constructor() {
    }

    clear(): void {
        this.accounts.clear();
        this.orders.clear();
        this.trades.clear();
    }

    getAccount(id: string): Account | undefined {
        return this.accounts.get(id);
    }

    getOrder(id: string): Order | undefined {
        return this.orders.get(id);
    }

    getTrade(id: string): Trade | undefined {
        return this.trades.get(id);
    }

    registerAccount(account: Account): void {
        this.accounts.set(account.id, account);
    }

    registerOrder(order: Order): void {
        this.orders.set(order.id, order);
    }

    registerTrade(trade: Trade): void {
        this.trades.set(trade.id, trade);
    }
}

export const REGISTRY = new Registry();
