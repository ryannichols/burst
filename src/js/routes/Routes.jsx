import React from 'react';
import _ from 'lodash';
import { 
  Route, 
  IndexRoute, 
  IndexRedirect, 
  Redirect } from 'react-router';



// SCREENS
import App from 'App';
import Home from 'screens/Home';


const Routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
  </Route>);

export { Routes as default };
