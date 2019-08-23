import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import {TradeModalProps} from "./TradeModalContainer";
import UnitFieldContainer from "./priceField/UnitFieldContainer";
import PriceFieldContainer from "./priceField/PriceFieldContainer";
import PercentFieldContainer from "./priceField/PercentFieldContainer";
import DescriptionLineContainer from "./descriptionLine/DescriptionLineContainer";

function maxMinPriceString(buying: boolean): string {
    return buying ? "Max" : "Min";
}

function buySellString(buying: boolean): string {
    return buying ? "Buy" : "Sell";
}

interface TradeModalState {
}

export default class TradeModal extends React.PureComponent<TradeModalProps, TradeModalState> {
    constructor(props: TradeModalProps) {
        super(props);
        this.state = {
        };
    }

    render(): ELEMENT {
        return (
            <div className="modal fade" id="tradeModal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>{this.props.sourceAsset} &rarr; {this.props.targetAsset}</b>
                            </h5>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-sm-4 my-auto px-0">
                                            <label className="text-center my-0"
                                                   htmlFor="unitPrice">{maxMinPriceString(this.props.buying)} price per {this.props.asset1}</label>
                                        </div>
                                        <div className="col-sm-8 mt-2 mt-sm-0">
                                            <PriceFieldContainer step={0.00001}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-sm-2 my-auto px-0">
                                            <label className="text-center my-0"
                                                   htmlFor="unitsNumber">{buySellString(this.props.buying)}ing</label>
                                        </div>
                                        <div className="col-sm-5 mt-2 mt-sm-0">
                                            <div className="input-group">
                                                <UnitFieldContainer step={0.00001}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-1 my-auto px-0">
                                            for
                                        </div>
                                        <div className="col-sm-4 mt-2 mt-sm-0">
                                            <PercentFieldContainer step={0.01}/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <hr className="col-xs-12"/>
                                <DescriptionLineContainer/>
                                <p>This amount will be immediately deducted from your available funds and may be
                                    partially
                                    refunded if trades happen at under the max price. The order can be cancelled at any
                                    time, refunding any allocated funds.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" disabled={this.props.units === 0}
                                    data-dismiss="modal" type="button">Confirm Trade
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
