import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Account from "../../../../trading/account";
import {REGISTRY} from "../../../../registry";
import SER from "../../serialisation/SER";
import respond from "../../serialisation/respond";

export function bodyGetAccount(broker: Broker, req: Request, res: Response): Account | null {
    const accountId: string | undefined = req.body["account"];

    if (accountId == null) {
        respond(res, 400, "missing body parameter: account", SER.NO);
        return null;
    }

    const account: Account | undefined = REGISTRY.getAccount(accountId);
    if (account == null) {
        respond(res, 404, `account id ${accountId} not found`, SER.NO);
        return null
    }
    return account
}
