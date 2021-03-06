import {ELEMENT} from "../../../modules/RootStore";
import React from "react";
import {ViewTradeModalProps} from "./ViewOrderModalContainer";
import {Modal} from "react-bootstrap";
import PendingBuy from "./Contents/PendingBuy";
import PendingSell from "./Contents/PendingSell";
import FinishedBuy from "./Contents/FinishedBuy";
import FinishedSell from "./Contents/FinishedSell";

export default class ViewOrderModal extends React.Component<ViewTradeModalProps> {
    render(): ELEMENT {
        const {isBuy, state} = this.props.trade;
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title><b>Order Info</b></Modal.Title>
                </Modal.Header>
                {
                    state === "pending" ?
                        (
                            isBuy ?
                                <PendingBuy {...this.props}/> :
                                <PendingSell {...this.props}/>
                        ) : (
                            isBuy ?
                                <FinishedBuy {...this.props}/> :
                                <FinishedSell {...this.props}/>
                        )
                }
            </Modal>
        );
    }
}