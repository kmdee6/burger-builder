import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';
import registerServiceWorker from './registerServiceWorker';

const loggingMiddleware = store => {
    return next => {
        return action => {
            console.log('[Middleware]', store.getState(), action.type);
            next(action);
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(reducer, composeEnhancers(applyMiddleware(loggingMiddleware)));
ReactDOM.render(<Provider store={reduxStore}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
