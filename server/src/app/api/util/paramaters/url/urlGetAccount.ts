import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Account from "../../../../trading/account";
import {REGISTRY} from "../../../../registry";

export function urlGetAccount(broker: Broker, req: Request, res: Response): Account | null {
    const accountId: string | undefined = req.params["account"];

    if (accountId == null) {
        res.status(400);
        res.send("missing body parameter: account");
        return null
    }

    const account: Account | undefined = REGISTRY.getAccount(accountId);
    if (account == null) {
        res.status(404);
        res.send(`account id ${accountId} not found`);
        return null
    }
    return account
}
