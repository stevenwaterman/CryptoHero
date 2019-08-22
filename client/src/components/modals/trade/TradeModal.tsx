import React, {ChangeEvent} from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import {TradeModalProps} from "./TradeModalContainer";
import {formatMoney} from "../../../util/FormatMoney";

function maxMinPriceString(buying: boolean): string {
    return buying ? "Max" : "Min";
}

function buySellString(buying: boolean): string {
    return buying ? "Buy" : "Sell";
}

function descriptionLine(dirty: boolean, buying: boolean, unitPrice: number, unitsNumber: number, sourceAsset: string, targetAsset: string, sourceAmount: number, targetAmount: number): ELEMENT {
    if (dirty) {
        return <p className="text-center"><b>Edited - Click Here to Update</b></p>;
    }
    if (unitsNumber === 0) {
        return <p className="text-center"><b>Increase {buySellString(buying)} Amount</b></p>;
    }

    const [asset1, asset1Amount, asset2, asset2Amount]: [string, number, string, number] = buying ?
        [targetAsset, targetAmount, sourceAsset, sourceAmount] :
        [sourceAsset, sourceAmount, targetAsset, targetAmount];

    let action1: string;
    if (buying) {
        if (unitPrice > 0) action1 = "Buying";
        else if (unitPrice === 0) action1 = "Taking";
        else action1 = "Taking";
    } else {
        if (unitPrice > 0) action1 = "Selling";
        else if (unitPrice === 0) action1 = "Giving away";
        else action1 = "Getting rid of";
    }

    let amount1: ELEMENT = <b>{formatMoney(Math.abs(asset1Amount), 5, true)} {asset1}</b>;

    let action2: string;
    if (buying) {
        if (unitPrice > 0) action2 = ", Paying up to";
        else if (unitPrice === 0) action2 = " for free";
        else action2 = ", getting paid at least ";
    } else {
        if (unitPrice > 0) action2 = " for at least";
        else if (unitPrice === 0) action2 = " for free";
        else action2 = ", costing up to"
    }

    let amount2: ELEMENT = "";
    if (unitPrice !== 0) amount2 = <b>{formatMoney(Math.abs(asset2Amount), 5, true)} {asset2}</b>;

    return <p className="text-center">
        {action1} {amount1}{action2} {amount2}
    </p>;
}

function maxUnits(buying: boolean, unitPrice: number, sourceFundsAvailable: number, targetFundsAvailable: number): number | null {
    if (buying) {
        if (unitPrice > 0) {
            return sourceFundsAvailable / unitPrice;
        } else {
            return null
        }
    } else {
        if (unitPrice > 0) {
            return sourceFundsAvailable;
        } else {
            return Math.min(sourceFundsAvailable, targetFundsAvailable / (-unitPrice));
        }
    }
}

interface ModalState {
    maxUnits: number | null,
    price: number,
    number: number,
    percent: number | null,
    sourceAmount: number,
    targetAmount: number,
    showPrice: string,
    showNumber: string,
    showPercent: string,
    dirty: boolean
}

export default class TradeModal extends React.PureComponent<TradeModalProps, ModalState> {
    constructor(props: TradeModalProps) {
        super(props);
        this.state = {
            maxUnits: maxUnits(this.props.buying, this.props.initialPrice, this.props.sourceFundsAvailable, this.props.targetFundsAvailable),
            price: this.props.initialPrice,
            number: 0,
            percent: 0,
            targetAmount: 0,
            sourceAmount: 0,

            showPrice: formatMoney(this.props.initialPrice),
            showNumber: formatMoney(0),
            showPercent: formatMoney(0, 2),

            dirty: false
        };

        this.handlePriceCommit = this.handlePriceCommit.bind(this);
        this.handleNumberCommit = this.handleNumberCommit.bind(this);
        this.handlePercentCommit = this.handlePercentCommit.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handlePercentChange = this.handlePercentChange.bind(this);
        this.clean = this.clean.bind(this);
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
                                                   htmlFor="unitPrice">{maxMinPriceString(this.props.buying)} price
                                                per {this.props.asset1}</label>
                                        </div>
                                        <div className="col-sm-8 mt-2 mt-sm-0">
                                            <div className="input-group">
                                                <input className="form-control" id="unitPrice" type="number"
                                                       step="0.00001"
                                                       value={this.state.showPrice}
                                                       onBlur={this.handlePriceCommit}
                                                       onChange={this.handlePriceChange}/>
                                                <div className="input-group-append">
                                                    <div className="input-group-text">{this.props.asset2}</div>
                                                </div>
                                            </div>

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
                                                <input className="form-control" id="unitsNumber"
                                                       max={formatMoney(this.state.maxUnits)} min="0"
                                                       type="number" step="0.00001"
                                                       value={this.state.showNumber}
                                                       onBlur={this.handleNumberCommit}
                                                       onChange={this.handleNumberChange}/>
                                                <div className="input-group-append">
                                                    <div className="input-group-text">{this.props.asset1}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-1 my-auto px-0">
                                            for
                                        </div>
                                        <div className="col-sm-4 mt-2 mt-sm-0">
                                            <div className="input-group">
                                                <input disabled={this.state.maxUnits === null} className="form-control"
                                                       id="unitsPercent" max="100" min="0"
                                                       type="number" step="0.01"
                                                       value={this.state.showPercent}
                                                       onBlur={this.handlePercentCommit}
                                                       onChange={this.handlePercentChange}/>
                                                <div className="input-group-append">
                                                    <div className="input-group-text">% {this.props.sourceAsset}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div onClick={this.clean}>
                                <hr className="col-xs-12"/>
                                {descriptionLine(
                                    this.state.dirty,
                                    this.props.buying,
                                    this.state.price,
                                    this.state.number,
                                    this.props.sourceAsset,
                                    this.props.targetAsset,
                                    this.state.sourceAmount,
                                    this.state.targetAmount
                                )}
                                <p>This amount will be immediately deducted from your available funds and may be
                                    partially
                                    refunded if trades happen at under the max price. The order can be cancelled at any
                                    time, refunding any allocated funds.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" disabled={this.state.number === 0 || this.state.dirty}
                                    data-dismiss="modal" type="button">Confirm Trade
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private updateState(buying: boolean, maxUnits: number | null, price: number, number: number, percent: number | null): void {
        let sourceAmount: number;
        let targetAmount: number;
        if (buying) {
            sourceAmount = number * price;
            targetAmount = number;
        } else {
            sourceAmount = number;
            targetAmount = number * price;
        }

        this.setState({
            maxUnits: maxUnits,
            price: price,
            number: number,
            percent: percent,
            sourceAmount: sourceAmount,
            targetAmount: targetAmount,

            showPrice: formatMoney(price),
            showNumber: formatMoney(number),
            showPercent: formatMoney(percent, 2),
            dirty: false
        })
    }

    private clean(): void {
        if (!this.state.dirty) return;

        const price = Number.parseFloat(this.state.showPrice);
        const newMaxUnits = maxUnits(this.props.buying, price, this.props.sourceFundsAvailable, this.props.targetFundsAvailable);
        const number = Math.min(newMaxUnits || Infinity, this.state.number);
        let newPercentage: number | null = null;
        if (newMaxUnits) {
            newPercentage = 100 * number / newMaxUnits;
        }

        this.updateState(this.props.buying, newMaxUnits, price, number, newPercentage)
    }

    private handlePriceChange(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            showPrice: event.target.value,
            dirty: true
        });
    }

    private handleNumberChange(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            showNumber: event.target.value,
            dirty: true
        });
    }

    private handlePercentChange(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            showPercent: event.target.value,
            dirty: true
        });
    }

    private handlePriceCommit(event: ChangeEvent<HTMLInputElement>): void {
        let inputString: string = event.target.value;
        if (!inputString) {
            inputString = "0";
        }
        const newUnitPrice = Number.parseFloat(inputString);
        if (isNaN(newUnitPrice)) return;

        const newMaxUnits = maxUnits(this.props.buying, newUnitPrice, this.props.sourceFundsAvailable, this.props.targetFundsAvailable);
        const newNumber = Math.min(newMaxUnits || Infinity, this.state.number);
        let newPercentage: number | null = null;
        if (newMaxUnits) {
            newPercentage = 100 * newNumber / newMaxUnits;
        }

        this.updateState(this.props.buying, newMaxUnits, newUnitPrice, newNumber, newPercentage)
    }

    private handleNumberCommit(event: ChangeEvent<HTMLInputElement>): void {
        let inputString: string = event.target.value;
        if (!inputString) {
            inputString = "0";
        }
        const newNumberRequested = Number.parseFloat(inputString);
        if (isNaN(newNumberRequested)) return;

        const maxUnits = this.state.maxUnits;
        let maxNumber = Math.max(newNumberRequested, 0);
        if (maxUnits !== null) {
            maxNumber = Math.min(maxNumber, maxUnits)
        }

        let newPercentage;
        if (maxUnits == null) {
            newPercentage = null;
        } else {
            newPercentage = 100 * maxNumber / maxUnits;
        }

        this.updateState(this.props.buying, this.state.maxUnits, this.state.price, maxNumber, newPercentage)
    }

    private handlePercentCommit(event: ChangeEvent<HTMLInputElement>): void {
        const maxUnits = this.state.maxUnits;
        if (maxUnits === null) {
            return;
        }

        let inputString: string = event.target.value;
        if (!inputString) {
            inputString = "0";
        }
        const newPercentageRequested = Number.parseFloat(inputString);
        if (isNaN(newPercentageRequested)) return;

        const newPercentage = Math.min(Math.max(newPercentageRequested, 0), 100);
        const newUnitsNumber = newPercentage * maxUnits / 100;

        this.updateState(this.props.buying, this.state.maxUnits, this.state.price, newUnitsNumber, newPercentage);
    }
}
