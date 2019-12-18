import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './app/store/reducers';
import reduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxPromise)),
);

const appRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => appRedux);
