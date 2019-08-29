import Broker from "../../brokers/broker";
import {RequestHandler, Request, Response} from "express";

export function withBroker<T>(
    broker: Broker,
    func: (broker: Broker, req: Request, res: Response) => T
): RequestHandler {
    return (req: Request, res: Response) => func(broker, req, res)
}
