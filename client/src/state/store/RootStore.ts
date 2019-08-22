import RootReducer from "../reducers/RootReducer";
import React from "react";

export type State = ReturnType<typeof RootReducer>
export type ELEMENT =
    React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean