import Broker from "../../brokers/broker";
import {Request, Response} from "express";

export function withBroker<T>(
    broker: Broker,
    func: (broker: Broker, req: Request, res: Response) => T
): (req: Request, res: Response) => T {
    return (req: Request, res: Response) => func(broker, req, res)
}
