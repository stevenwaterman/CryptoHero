import RootReducer from "../reducers/RootReducer";
import React from "react";

export type AppState = ReturnType<typeof RootReducer>
export type ELEMENT =
    React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean