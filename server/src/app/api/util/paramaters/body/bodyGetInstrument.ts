import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Instrument from "../../../../trading/instrument";
import SER from "../../serialisation/SER";
import {respondNoSer} from "../../serialisation/respond";

export function bodyGetInstrument(broker: Broker, req: Request, res: Response): Instrument | null {
    const instrumentString: string | undefined = req.body["instrument"];

    if (instrumentString == null) {
        respondNoSer(res, 400, "missing body parameter: instrument");
        return null
    }

    const instrument: Instrument | undefined = Instrument.MAP.get(instrumentString);
    if (instrument == null) {
        respondNoSer(res, 404, `instrument ${instrumentString} not found`);
        return null
    }
    return instrument
}
