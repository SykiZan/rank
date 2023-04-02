import React from 'react';
import ReactDOM from 'react-dom';
import './helpers/i18n';
import { Provider } from 'react-redux';
import { store } from './store';
import {BrowserRouter as Router} from 'react-router-dom';
import App from "./components/_APP";
import './theme/scss/index.scss'



ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
