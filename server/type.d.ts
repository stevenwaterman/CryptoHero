import {Serialisable} from "./src/app/api/util/serialisation/SER";
declare global {
    namespace Express {
        export interface Response {
            respond<B>(this: Response, status: number, body: B, serialiser: (body: B) => Serialisable | Array<Serialisable>): void;
        }
    }
}
