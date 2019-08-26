import Instrument from "../../../models/Instrument";
import IStartDepositAction from "../../reducers/modal/deposit/IStartDepositAction";
import IConfirmDepositAction from "../../reducers/modal/deposit/IConfirmDepositAction";

export default interface DepositModalStore {
}

export const initialDepositModalStore: DepositModalStore = {
    buying: true,
    instrument: new Instrument("GBP", "BTC"),
};

export type DepositModalActions =
    IStartDepositAction
    | IConfirmDepositAction
