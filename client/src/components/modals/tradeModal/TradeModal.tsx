import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import {TradeModalProps} from "./TradeModalContainer";
import UnitFieldContainer from "./fields/TraeUnitFieldContainer";
import PriceFieldContainer from "./fields/TradePriceFieldContainer";
import PercentFieldContainer from "./fields/TradePercentFieldContainer";
import DescriptionLineContainer from "./descriptionLine/DescriptionLineContainer";

function maxMinPriceString(buying: boolean): string {
    return buying ? "Max" : "Min";
}

function buySellString(buying: boolean): string {
    return buying ? "Buy" : "Sell";
}

export default class TradeModal extends React.PureComponent<TradeModalProps> {
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
                                        <div className="col-sm-3 my-auto px-0">
                                            {maxMinPriceString(this.props.buying)} price
                                        </div>
                                        <div className="col-sm-9 mt-2 mt-sm-0">
                                            <PriceFieldContainer step={0.00001}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-sm-1 my-auto px-0">
                                            {buySellString(this.props.buying)}
                                        </div>
                                        <div className="col-sm-5 mt-2 mt-sm-0">
                                            <UnitFieldContainer step={0.00001}/>
                                        </div>
                                        <div className="col-sm-1 my-auto px-0 text-center">
                                            for
                                        </div>
                                        <div className="col-sm-5 mt-2 mt-sm-0">
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
                            <button className="btn btn-danger" disabled={!this.props.canConfirm}
                                    data-dismiss="modal" type="button">Confirm Trade
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
