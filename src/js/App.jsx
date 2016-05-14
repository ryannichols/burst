
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import { AppActions, AppState } from 'store/AppState';

const actions = (dispatch) => {
  return {
    ...AppActions,
  }
}

var App = React.createClass ({
  getInitialState() {
    return { };
  },
  render() {
    return(
      <div id="app">
        <div id="content">
          { this.props.children }
        </div>
      </div>);
  }
});
App = connect(AppState.selector, actions)(App);
export { App as default };