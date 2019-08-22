import {combineReducers} from "redux";
import {instrumentReducer} from "./instrument/InstrumentReducer";

export default combineReducers({
    instruments: instrumentReducer
})