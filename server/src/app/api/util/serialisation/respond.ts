import {Serialisable} from "./SER";
import {Response} from "express";


function respond<B>(this: Response, status: number, body: B, serialiser: (body: B) => Serialisable): void{
    const ser = serialiser(body);
    this.status(status).json(ser);
}

(Response as any).prototype.respond = respond;