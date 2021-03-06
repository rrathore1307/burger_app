import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import burgerBuilder from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import createReduxMiddleware from 'redux-saga';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas';
const sagaMiddleWare = createReduxMiddleware();
const rootReducer = combineReducers({
    burgerReducer: burgerBuilder,
    orderReducer: order,
    authReducer: authReducer
})
const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            return result
        }
    }
}
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk, sagaMiddleWare)));
    sagaMiddleWare.run(watchAuth)
    sagaMiddleWare.run(watchBurgerBuilder)
    sagaMiddleWare.run(watchOrders)
    const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
