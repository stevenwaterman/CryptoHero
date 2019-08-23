import React from "react";
import {formatMoney} from "../../util/FormatMoney";
import {AvailableFundsProps} from "./AvailableFundsContainer";
import {ELEMENT} from "../../state/store/RootStore";

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

export default class AvailableFunds extends React.PureComponent<AvailableFundsProps> {
    render(): ELEMENT {
        return (
            <div className="card" id="position">
                <div className="card-header my-auto">
                    <h5 className="card-title text-center my-0"><b>Available Funds</b></h5>
                </div>
                <div className="row py-2 px-2">
                    {generateColumns(this.props.availableFunds)}
                </div>
                <button className="btn btn-primary" data-target="#totalFunds" data-toggle="modal" type="button">
                    Total Funds
                </button>
                <div className="row pt-2">
                    <div className="col-sm-6">
                        <button className="btn btn-primary btn-block pr-sm-1" data-target="#withdrawModal"
                                data-toggle="modal"
                                type="button">
                            Withdraw
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <button className="btn btn-primary btn-block pl-sm-1" data-target="#depositModal"
                                data-toggle="modal"
                                type="button">
                            Deposit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
