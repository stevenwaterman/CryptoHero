import {ELEMENT} from "../../../state/store/RootStore";
import React from "react";
import {formatMoney} from "../../../util/FormatMoney";
import {TotalFundsModalProps} from "./TotalFundsModalContainer";

function generateColumns(funds: Array<[string, number]>): Array<any> {
    return funds.map(generateOneColumn);
}

function generateOneColumn([asset, price]: [string, number]): ELEMENT {
    return (
        <div className="col-lg-6" key={asset}>
            <div className="row">
                <div className="col-6 pr-1">
                    <b>{asset}:</b>
                </div>
                <div className="col-6 pl-1 text-right">
                    {formatMoney(price, 2)}
                </div>
            </div>
        </div>
    )
}

export default class TotalFundsModal extends React.Component<TotalFundsModalProps> {
    render(): ELEMENT {
        return (
            <div className="modal fade" id="totalFunds" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Total Funds</b></h5>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>If you cancelled all pending orders, you would have:</p>
                            <div className="row py-2 px-2">
                                {generateColumns(this.props.totalFunds)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}