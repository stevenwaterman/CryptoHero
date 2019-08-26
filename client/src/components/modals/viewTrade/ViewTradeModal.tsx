import {ELEMENT} from "../../../state/store/RootStore";
import React from "react";
import {formatMoney} from "../../../util/FormatMoney";
import {TotalFundsModalProps} from "./ViewTradeModalContainer";

export default class ViewTradeModal extends React.Component<TotalFundsModalProps> {
    render(): ELEMENT {
        return (
            <div className="modal fade" id="orderModal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Order Info</b></h5>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <b>ID:</b> {this.props.id}
                            </div>
                            <div>
                                <b>Time:</b> {this.props.time.toISOString()}
                            </div>
                            <div>
                                <b>Action:</b> {this.props.buying ? "BUY " : "SELL "} {this.props.instrument.name}
                            </div>
                            <div>
                                <b>Units:</b> {formatMoney(this.props.units, 5, true, true)}
                            </div>
                            <div>
                                <b>Unit Price:</b> {formatMoney(this.props.price, 5, true, true)}
                            </div>
                            <div>
                                <b>Allocated:</b> 148,087.5 BTC //TODO
                            </div>
                            <hr className="col-xs-12"/>
                            <div>
                                <b>Remaining Units:</b> 112,874.57
                            </div>
                            <div>
                                <b>Locked:</b> 111,435.41923 BTC
                            </div>
                            <div>
                                <b>Progress:</b> 24.75%
                            </div>
                            <div>
                                <b>Average Price:</b> 0.98623
                            </div>
                            <div>
                                <b>Spent:</b> 36,614.21283 BTC
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" data-dismiss="modal" type="button"
                                    onClick={this.props.onClickCancel}>Cancel Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}