import React, { PropTypes } from 'react';
import _ from 'lodash';

/*
  This makes it convenient to wrap async responses that will attempt to setState, with something that can be 
  canceled before unmounting. This is only necessary if we try to setState (or do other operations) on a ReactComponent in the callbacks
  for async actions.
  Example: (Note the use of .promise first.)
  return this.addCancelable(doSomeAction(params))
    .promise
    .then(r => this.setState({success:true})) 
    .catch(r => this.setState({success:false}))
  To cancel a cancelable you can call myAction.cancel(). This will shortcut any 'then' or 'catch' callbacks.
*/

const makeCancelable = (promise) => {
  let hasCanceled_ = false;
  return {
    promise: new Promise(
      (resolve, reject) => promise
        .then(r => !hasCanceled_ ? resolve(r) : null)
        .catch(r => !hasCanceled_ ? reject(r) : null)
    ),
    cancel() {
      hasCanceled_ = true;
    },
  };
};

const CancelableMixin = {
  _cancelables: [],
  componentWillUnmount() {
    _.forEach(this._cancelables, c => c ? c.cancel() : null);
  },
  addCancelable(promise) {
    var c = makeCancelable(promise);
    this._cancelables.push(c);
    return c;
  },
}
export { CancelableMixin as default, makeCancelable };
