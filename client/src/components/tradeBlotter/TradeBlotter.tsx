import React from "react";
import {ChartCardProps} from "./TradeBlotterContainer";
import {ELEMENT} from "../../state/store/RootStore";
import TradeRow from "./row/TradeRow";
import TradeSimple from "../../models/TradeSimple";

export default class TradeBlotter extends React.PureComponent<ChartCardProps> {
    constructor(props: ChartCardProps) {
        super(props);
        this.onTradeClick = this.onTradeClick.bind(this);
    }

    render(): ELEMENT {
        return (
            <div className="card mt-3" id="trades">
                <div className="card-header">
                    <div className="row justify-content-center">
                        <div className="col-auto my-auto">
                            <h5 className="card-title text-center my-0"><b>Trades</b></h5>
                        </div>
                        <div className="col-auto">
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className="btn btn-primary active" onClick={this.props.onSelectPending}>
                                    <input autoComplete="off" name="options" type="radio"/>
                                    Pending
                                </label>
                                <label className="btn btn-primary">
                                    <input autoComplete="off" name="options" type="radio"
                                           onClick={this.props.onSelectCompleted}/>
                                    Completed
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body p- pt-0">
                    <table className="table table-borderless mb-0">
                        <thead>
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Units</th>
                            <th scope="col">Unit Price</th>
                        </tr>
                        </thead>
                        <tbody className="table-hover">
                        {this.props.trades.map((trade) =>
                            <TradeRow
                                onClick={() => this.onTradeClick(trade)}
                                trade={trade}
                                key={trade.id}
                            />)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    private onTradeClick(trade: TradeSimple): void {
        this.props.onSelectTrade(trade.id)
    }
}
