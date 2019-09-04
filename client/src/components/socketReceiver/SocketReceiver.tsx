import React from "react";
import {SocketReceiverProps} from "./SocketReceiverContainer";
import {ELEMENT} from "../../modules/RootStore";
import {getSocket} from "../../WebSockets";
import Instrument from "../../models/Instrument";
import {IOrderDepth} from "../../models/OrderDepth";

export default class SocketReceiver extends React.Component<SocketReceiverProps> {
    componentDidMount(): void {
        const socket = getSocket();

        const {setInstrumentPrice, orderDepthDelta} = this.props;
        socket.on("market price", (data: any) => {
            const instrument: Instrument = Instrument.fromName(data.instrument);
            const time: number = data.time;
            const price: number = Number.parseFloat(data.price);
            setInstrumentPrice(instrument, price, time);
            console.log("market price");
        });

        socket.on("order depth", (data: any) => {
            const instrument = Instrument.fromName(data.instrument);
            const delta = IOrderDepth.fromServer(data.delta);
            orderDepthDelta(instrument, delta);
            console.log("Order Depth");
        });
    }

    render(): ELEMENT {
        return <></>
    }
}