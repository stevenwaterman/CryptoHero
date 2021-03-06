import RootReducer from "./RootReducer";
import React from "react";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {FormControl, FormControlProps} from "react-bootstrap";
import {createLogger} from "redux-logger";

const logger = createLogger({
    diff: true
});

export default createStore(
    RootReducer,
    applyMiddleware(thunk/*, logger*/)
);

export type State = ReturnType<typeof RootReducer>

export type ELEMENT =
    React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean

export type FORM_EVENT = React.FormEvent<FormControlProps & FormControl>
