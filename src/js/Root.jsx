
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'


// A monitor component for Redux DevTools
//import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
//import DiffMonitor from 'redux-devtools-diff-monitor';

import Routes from 'routes/Routes';
import { history } from 'store/RouteState';
import { createAppStore } from 'store/Store';

var appStore = createAppStore();
var appHistory = syncHistoryWithStore(history, appStore);

// Render
ReactDOM.render(
  <Provider store={appStore}>
    <Router routes={Routes} history={appHistory} />
  </Provider>,
  document.getElementById('appContainer'));