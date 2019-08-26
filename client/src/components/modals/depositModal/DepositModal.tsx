import React from "react";
import {ELEMENT} from "../../../state/store/RootStore";
import {DepositModalProps} from "./DepositModalContainer";
import UnitFieldContainer from "./DepositUnitFieldContainer";
import AssetSelectorContainer from "./DepositAssetSelectorContainer";

export default class DepositModal extends React.PureComponent<DepositModalProps> {
    render(): ELEMENT {
        return (
            <div className="modal fade" id="depositModal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Deposit Funds</b>
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
                                            Deposit
                                        </div>
                                        <div className="col-sm-auto mt-2 mt-sm-0">
                                            <UnitFieldContainer step={0.00001}/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" disabled={!this.props.canConfirm}
                                    data-dismiss="modal" type="button">Confirm Deposit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
