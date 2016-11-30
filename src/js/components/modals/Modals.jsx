import React, { PropTypes } from 'react';
import cx from 'classnames';

var Modal = React.createClass({
  propTypes: {
    open: PropTypes.bool,
    showBackdrop: PropTypes.bool,
    keyboard: PropTypes.bool,
    backdropClassName: PropTypes.string,
    className: PropTypes.string,
    onClose: PropTypes.func,
    onRight: PropTypes.func,
    onLeft: PropTypes.func,
  },
  getDefaultProps() {
    return {
      open: true,
      showBackdrop: false,
      keyboard: true,
      backdropClassName: 'modal-back',
      className: 'modal',
      id: null,
      onClose: () => {}
    };
  },
  _onKeyDown(e) {
    if(!this.props.open) return;

    var {onClose, onRight, onLeft} = this.props;
    var keyCode = e.keyCode;
    if(!this.props.keyboard) return;
    switch(keyCode) {
      case 27:
        onClose();
        break;
      case 39:
        onRight ? onRight(e) : null;
        break;
      case 37:
        onLeft ? onLeft(e) : null;
        break;
    }
  },
  componentDidMount() {
    if(this.props.open) {
      this.refs.modal.focus();
    }
    window.addEventListener("keydown", this._onKeyDown, true);
  },
  componentWillUnmount() {
     window.removeEventListener("keydown", this._onKeyDown, true);
  },
  handleModalClick(e) {
    // We don't wrapping parents to be receiving click events.
    e.stopPropagation();
  },
  render() {
    var { open, showBackdrop, keyboard, backdropClassName, className, children, id, ...props} = this.props;
    return (
      <div
        ref="modal"
        id={id}
        className={cx('modal', className, {hide:!open, open:open})}
        onClick={this.handleModalClick}>
        {children}
      </div>);
  },
});
export { Modal as default };
