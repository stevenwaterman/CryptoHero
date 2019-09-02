import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Account from "../../../../trading/account";
import {REGISTRY} from "../../../../registry";
import SER from "../../serialisation/SER";
import {respondNoSer} from "../../serialisation/respond";

export function bodyGetAccount(broker: Broker, req: Request, res: Response): Account | null {
    const accountId: string | undefined = req.body["account"];

    if (accountId == null) {
        respondNoSer(res, 400, "missing body parameter: account");
        return null;
    }

    const account: Account | undefined = REGISTRY.getAccount(accountId);
    if (account == null) {
        respondNoSer(res, 404, `account id ${accountId} not found`);
        return null
    }
    return account
}
