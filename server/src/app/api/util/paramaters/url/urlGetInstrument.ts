import {Request, Response} from "express";
import Broker from "../../../../brokers/broker";
import Instrument from "../../../../trading/instrument";
import SER from "../../serialisation/SER";
import {respondNoSer} from "../../serialisation/respond";

export function urlGetInstrument(broker: Broker, req: Request, res: Response): Instrument | null {
    const instrumentString: string | undefined = req.params["instrument"];

    if (instrumentString == null) {
        respondNoSer(res, 400, "missing url parameter: instrument");
        return null
    }

    const instrument: Instrument | undefined = Instrument.MAP.get(instrumentString);
    if (instrument == null) {
        respondNoSer(res, 404, `instrument ${instrument} not found`);
        return null
    }
    return instrument
}
