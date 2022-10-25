//#region react imports

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
//import { BrowserRouter as Router } from 'react-router-dom';

//#endregion react imports

//#region application imports

import * as serviceWorker from './serviceWorker';
import './index.scss';
import { AppRootContainer } from './app/root/app-root.container';
import { globalStore } from './app/shared';
import ScrollTopComponent from './app/root/scroll-top.component';

//#endregion application imports

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={globalStore}>
        <React.StrictMode>
            <Router history={history}>
                <ScrollTopComponent>

                    <AppRootContainer history={history} />
                </ScrollTopComponent>

            </Router>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
