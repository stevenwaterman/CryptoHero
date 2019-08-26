import React, {ChangeEvent} from "react";
import {ChartCardProps} from "./ChartCardContainer";
import {ELEMENT} from "../../state/store/RootStore";

export default class ChartCard extends React.PureComponent<ChartCardProps> {
    constructor(props: ChartCardProps) {
        super(props);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    render(): ELEMENT {
        return (
            <div className="card" id="graph">
                <div className="card-header">
                    <div className="row justify-content-center">
                        <div className="col-auto my-auto">
                            <h5 className="card-title text-center my-0"><b>Graphs</b></h5>
                        </div>
                        <div className="col-auto">
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className="btn btn-primary active">
                                    <input autoComplete="off" checked name="Historical" onChange={this.onTypeChange}
                                           type="radio"/>
                                    Historical
                                </label>
                                <label className="btn btn-primary">
                                    <input autoComplete="off" name="Current" onChange={this.onTypeChange} type="radio"/>
                                    Current
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <img alt="order depth chart" className="img-fluid" src="https://i.imgur.com/mu8gmwt.png"/>
                </div>
            </div>
        )
    }

    private onTypeChange(event: ChangeEvent<HTMLInputElement>): void {
        const selected = event.target.value; //TODO this doesn't do anything
        console.log(selected);
        if (selected === "Historical") {
            this.props.onSelectHistorical();
        } else {
            this.props.onSelectCurrent();
        }
    }
}
