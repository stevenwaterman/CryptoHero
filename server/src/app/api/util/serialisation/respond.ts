import {Serialisable} from "./SER";
import {Response} from "express";

export default function respond<B>(res: Response, status: number, body: B, serialiser: (body: B) => Serialisable): void{
    const ser = serialiser(body);
    res.status(status).json(ser);
}