import {Request, Response} from "express";
import BitcoinExchangeServer from "../bitcoinExchangeServer";
import Broker from "../../brokers/broker";
import {withBroker} from "../util/withBroker";
import {urlGetAccount} from "../util/paramaters/url/urlGetAccount";
import Asset from "../../trading/asset";
import Big from "big.js";
import {Map} from "immutable";
import {urlGetAsset} from "../util/paramaters/url/urlGetAsset";
import {bodyGetUnits} from "../util/paramaters/body/bodyGetUnits";
import Account from "../../trading/account";

export function setupAccountsEndpoints(server: BitcoinExchangeServer): void {
    const app = server.app;
    const broker = server.broker;

    app.post("/api/account/create", withBroker(broker, createAccount));

    app.get("/api/account/:account/assets/available", withBroker(broker, getAvailableAssets));
    app.get("/api/account/:account/assets/total", withBroker(broker, getTotalAssets));

    app.get("/api/account/:account/assets/:asset/available", withBroker(broker, assetGetAvailable));
    app.get("/api/account/:account/assets/:asset/total", withBroker(broker, assetGetTotal));
    app.post("/api/account/:account/assets/:asset/deposit", withBroker(broker, assetDeposit));
    app.post("/api/account/:account/assets/:asset/withdraw", withBroker(broker, assetWithdraw));
}

function createAccount(broker: Broker, req: Request, res: Response): void {
    const account = new Account();

    const out = {
        "account": account.id
    };
    res.status(200);
    res.json(out);
}

function getAvailableAssets(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;
    const assets: Map<Asset, Big> = account.getAllAvailableAssets();

    const serialisable = assets
        .mapKeys((key) => key.name)
        .map((val) => val.toString())
        .toObject();
    res.status(200);
    res.json(serialisable);
}

function getTotalAssets(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;
    const available: Map<Asset, Big> = account.getAllAvailableAssets();
    const locked: Map<Asset, Big> = broker.getLockedAssets(account);
    const total: Map<Asset, Big> = available.mergeWith((oldVal, newVal) => oldVal.plus(newVal), locked);

    const serialisable = total
        .mapKeys(key => key.name)
        .map(val => val.toString())
        .toObject();
    res.status(200);
    res.json(serialisable);
}

function assetGetAvailable(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const asset = urlGetAsset(broker, req, res);
    if (asset == null) return;

    const amount: Big = account.getAvailableAssets(asset);

    const serialisable = amount.toString();
    res.status(200);
    res.send(serialisable);
}

function assetGetTotal(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const asset = urlGetAsset(broker, req, res);
    if (asset == null) return;

    const available = account.getAvailableAssets(asset);
    const lockedAssets: Map<Asset, Big> = broker.getLockedAssets(account);
    const locked = <Big>lockedAssets.get(asset);
    const total: Big = available.plus(locked);

    const serialisable = total.toString();
    res.status(200);
    res.send(serialisable);
}

function assetDeposit(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const asset = urlGetAsset(broker, req, res);
    if (asset == null) return;

    const units = bodyGetUnits(broker, req, res);
    if (units == null) return;
    if (units.lte(new Big("0"))) {
        res.status(400);
        res.send(`Amount must be positive, was ${units}`);
        return;
    }

    account.adjustAssets(asset, units);

    res.status(200);
    res.send("Successful");
}

function assetWithdraw(broker: Broker, req: Request, res: Response): void {
    const account = urlGetAccount(broker, req, res);
    if (account == null) return;

    const asset = urlGetAsset(broker, req, res);
    if (asset == null) return;

    const units = bodyGetUnits(broker, req, res);
    if (units == null) return;
    if (units.lte(new Big("0"))) {
        res.status(400);
        res.send(`Amount must be positive, was ${units}`);
        return;
    }

    const available = account.getAvailableAssets(asset);
    if (available.lt(units)) {
        res.status(400);
        res.send("Invalid funds");
        return;
    }

    const adjustment = new Big("0").minus(units);
    account.adjustAssets(asset, adjustment);

    res.status(200);
    res.send("Successful");
}