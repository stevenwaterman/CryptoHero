import RootReducer from "../reducers/RootReducer";
import React from "react";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

export default createStore(
    RootReducer,
    applyMiddleware(thunk)
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