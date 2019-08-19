import {Request, Response} from "express";
import Broker from "../../brokers/broker";
import Instrument from "../../trading/instrument";

export function getInstrument(broker: Broker, req: Request, res: Response): Instrument | null {
    const instrumentString: string | undefined = req.body["intrument"];

    if (instrumentString == null) {
        res.status(400);
        res.send("missing body parameter: instrument");
        return null
    }

    const instrument: Instrument | undefined = Instrument.MAP.get(instrumentString);
    if (instrument == null) {
        res.status(404);
        res.send(`instrument ${instrument} not found`);
        return null
    }
    return instrument
}
