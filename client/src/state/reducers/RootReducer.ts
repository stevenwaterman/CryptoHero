import {combineReducers} from "redux";
import {instrumentReducer} from "./InstrumentReducer";

export default combineReducers({
    instruments: instrumentReducer
})