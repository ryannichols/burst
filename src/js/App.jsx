
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';

import { AppActions, AppState } from 'store/AppState';

var selector = AppState.selector;
const actions = {
  ...AppActions,
}

var App = React.createClass ({
  getInitialState() {
    return { };
  },
  getModalElement(modal) {
    if(!modal) return null;

    if(modal.component) {
      return modal.component;
    }

    var Component = ModalComponents[modal.type];
    if(!Component) return null;

    return (
      <Component
        open={true}
        onClose={this.handleModalClose}
        {...modal.props} />);
  },
  handleModalClose(e) {
    var {modal} = this.props;
    e ? e.preventDefault() : null;
    this.props.closeModal();
  },
  render() {
    var {
      modal, } = this.props;
    let showModal = Boolean(modal.type != undefined || modal.component);
    return(
      <div id="app">
        <div id="content">
          { this.props.children }
        </div>
      </div>);
  }
});
App = connect(selector, actions)(App);
export { App as default };