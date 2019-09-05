import React from "react";
import {SocketReceiverProps} from "./SocketManagerContainer";
import {ELEMENT} from "../../modules/RootStore";
import {getSocket} from "../../WebSockets";
import Instrument from "../../models/Instrument";
import {IOrderDepth} from "../../models/OrderDepth";
import Order from "../../models/Order";
import Big from "big.js";

export default class SocketManager extends React.Component<SocketReceiverProps> {
    componentDidMount(): void {
        const socket = getSocket();

        const {setInstrumentPrice, orderDepthDelta, setAccountListenerId, setAssetFunds, updateOrder} = this.props;
        socket.on("market price", (data: any) => {
            const instrument: Instrument = Instrument.fromName(data.instrument);
            const time: number = data.time;
            const price: Big = Big(data.price);
            setInstrumentPrice(instrument, price, time);
        });

        socket.on("order depth", (data: any) => {
            const instrument = Instrument.fromName(data.instrument);
            const delta = IOrderDepth.fromServer(data.delta);
            orderDepthDelta(instrument, delta);
        });

        socket.on("account listener id", (data: [string, string, string]) => {
            setAccountListenerId(data);
        });

        socket.on("update funds", (data: any) => {
            const asset = data.asset;
            const newAmount = Big(data.newAmount);
            setAssetFunds(asset, newAmount);
        });

        socket.on("update order", (data: any) => {
            const order = Order.create(data);
            updateOrder(order);
        });
    }

    render(): ELEMENT {
        return <></>
    }
}