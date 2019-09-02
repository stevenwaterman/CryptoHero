import {Serialisable} from "./SER";
import {Response} from "express";

export function respond<B>(res: Response, status: number, body: B, serialiser: (body: B) => Serialisable): void{
    const ser = serialiser(body);
    res.status(status).json(ser);
}

export function respondNoSer(res: Response, status: number, serialisable: Serialisable): void{
    res.status(status).json(serialisable);
}