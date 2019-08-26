import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import {WithdrawModalProps} from "./WithdrawModalContainer";
import UnitFieldContainer from "./fields/WithdrawUnitFieldContainer";
import PercentFieldContainer from "./fields/WithdrawPercentFieldContainer";
import AssetSelectorContainer from "./asset/AssetSelectorContainer";

export default class WithdrawModal extends React.PureComponent<WithdrawModalProps> {
    render(): ELEMENT {
        return (
            <div className="modal fade" id="withdrawModal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Withdraw Funds</b>
                            </h5>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-sm-2 my-auto px-0">
                                            <label>Asset:</label>
                                        </div>
                                        <div className="col-sm-auto">
                                            <AssetSelectorContainer/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-sm-2 my-auto px-0">
                                            Withdraw
                                        </div>
                                        <div className="col-sm-5 mt-2 mt-sm-0">
                                            <div className="input-group">
                                                <UnitFieldContainer step={0.00001}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-1 my-auto px-0 text-center">
                                            =
                                        </div>
                                        <div className="col-sm-4 mt-2 mt-sm-0">
                                            <PercentFieldContainer step={0.01}/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" disabled={!this.props.canConfirm}
                                    data-dismiss="modal" type="button">Confirm Withdrawal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
