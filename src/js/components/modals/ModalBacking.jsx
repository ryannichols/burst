import React, { PropTypes } from 'react';
import ReactTransitionEvents from 'utils/ReactTransitionEvents';
import LayeredComponentMixin from 'react-layer-mixin';
import cx from 'classnames';

import { Utils } from 'utils/Utils';
import { AppActions } from 'store/AppState';


var ModalBacking = React.createClass({
  _root: null,
  contextTypes: {
    store: PropTypes.object.isRequired,
  },
  mixins: [],
  propTypes: {
    open: PropTypes.bool,
    showClose: PropTypes.bool,
    showArrows: PropTypes.bool,
    className: PropTypes.string,
    backdropClassName: PropTypes.string,
    isEditing: PropTypes.bool,
  },
  getDefaultProps() {
    return {
      open: false,
      showClose: true,
      showArrows: false,
      backdropClassName: 'modal-back',
    };
  },
  getInitialState() {
    return {
      opened: false,
    }
  },
  componentWillReceiveProps(nextProps) {
    var {open} = this.props;
    if(nextProps.open && !open) {
      this.setState({opened:true});
    }
  },
  componentDidMount() {
    ReactTransitionEvents.addEndEventListener(this._root, this.handleAnimationEnd);
  },
  componentWillUnmount() {
    ReactTransitionEvents.removeEndEventListener(this._root, this.handleAnimationEnd)
  },
  handleAnimationEnd(e) {
    var { currentTarget } = e;

    if(currentTarget != this._root)
      return;

    e.stopPropagation();

    if(currentTarget.classList.contains('close')) {
      currentTarget.classList.remove('close', 'open');
      this.setState({opened:false});
    }
  },
  handleCloseClick(e) {
    // capture entire click events
    e.stopPropagation();
    this.context.store.dispatch(AppActions.closeModal());
  },
  render() {
    var {open, showClose, showArrows, onLeft, onRight, className, backdropClassName, children} = this.props;
    var {opened} = this.state;
    return (
      <div
        id="modalBack"
        ref={e => { this._root = e }}
        className={cx(backdropClassName, className, {open:open, close:opened && !open})} >
        {children}
        <button
          id="modalClose"
          className="btn i c reverse icon-x"
          onClick={this.handleCloseClick}><i></i></button>
        { showArrows
          ? <button
              className="btn i icon-left"
              onClick={onLeft}><i></i></button>
          : null }
        { showArrows
          ? <button
              className="btn i icon-right"
              onClick={onRight}><i></i></button>
          : null }
      </div>);
  },
});
export { ModalBacking as default }