import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import RootStore from "./modules/RootStore";
import AppContainer from "./components/app/AppContainer";

import {IconDefinition, library} from "@fortawesome/fontawesome";
import {faSyncAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import {initSocket} from "./WebSockets";

library.add(...[faSyncAlt, faUserPlus] as Array<IconDefinition>);
initSocket();

ReactDOM.render(
    <Provider store={RootStore}>
        <AppContainer/>
    </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
