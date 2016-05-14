import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import _ from 'lodash';

import rootReducer from 'store/RootReducer';
import { history } from 'store/RouteState';


 // Lets you write ?debug_session=<name> in address bar to persist debug sessions
const debugUrl = window.location.href.match(/[?&]debug_session=([^&]+)\b/);


const logTransformer = action => {
  if(action.result) {
    action = _.assign({}, action, {type: action.type + ":" + action.result});
  }
  return action;
}

var middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development' || debugUrl) {
  middleware.push(createLogger({ 
    duration: true,
    timestamp: true,
    collapsed: true,
    actionTransformer: logTransformer,
  }));
}

const _createAppStore = compose(applyMiddleware(...middleware))(createStore);

function createAppStore(initialState = {}) {
  const store = _createAppStore(rootReducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('store', () => {
      const nextRootReducer = require('store');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export { createAppStore }
