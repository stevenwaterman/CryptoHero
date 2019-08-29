import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Instrument from "../../../../trading/instrument";
import SER from "../../serialisation/SER";
import respond from "../../serialisation/respond";

export function bodyGetInstrument(broker: Broker, req: Request, res: Response): Instrument | null {
    const instrumentString: string | undefined = req.body["instrument"];

    if (instrumentString == null) {
        respond(res, 400, "missing body parameter: instrument", SER.NO);
        return null
    }

    const instrument: Instrument | undefined = Instrument.MAP.get(instrumentString);
    if (instrument == null) {
        respond(res, 404, `instrument ${instrumentString} not found`, SER.NO);
        return null
    }
    return instrument
}
