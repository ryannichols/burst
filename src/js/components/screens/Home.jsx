import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Link, State } from 'react-router';
import { connect } from 'react-redux';
import cx from 'classnames';

import DocumentMeta from 'DocumentMeta';

var selector = null;
var actions = {
}
var Home = React.createClass({
  render: function() {
    return (
      <section>
        <DocumentMeta title="Page Title" bodyId="home" />
        <h2>Home page</h2>
        <p>This is the homepage component</p>
        <div>
          <h2>Buttons</h2>

          <h3>Standard Buttons</h3>
          <div className="row">
            <button className="btn xs">Button</button>
            <button className="btn s">Button</button>
            <button className="btn m">Button</button>
            <button className="btn l">Button</button>
            <button className="btn xl">Button</button>
          </div>

          <h3>Standard Buttons with Icons</h3>
          <div className="row">
            <button className="btn xs"><i className="icon-microphone"></i>Button</button>
            <button className="btn s"><i className="icon-microphone"></i>Button</button>
            <button className="btn m"><i className="icon-microphone"></i>Button</button>
            <button className="btn l"><i className="icon-microphone"></i>Button</button>
            <button className="btn xl"><i className="icon-microphone"></i>Button</button>
          </div>

          <h3>Text Buttons</h3>
          <div className="row">
            <button className="btn tx xs">Button</button>
            <button className="btn tx s">Button</button>
            <button className="btn tx m">Button</button>
            <button className="btn tx l">Button</button>
            <button className="btn tx xl">Button</button>
          </div>

          <h3>Circle Buttons</h3>
          <div className="row">
            <button className="btn c xs"><i className="icon-microphone"></i></button>
            <button className="btn c s"><i className="icon-microphone"></i></button>
            <button className="btn c m"><i className="icon-microphone"></i></button>
            <button className="btn c l"><i className="icon-microphone"></i></button>
            <button className="btn c xl"><i className="icon-microphone"></i></button>
          </div>

          <h3>Outline Buttons</h3>
          <div className="row">
            <button className="btn o xs"><i className="icon-microphone"></i></button>
            <button className="btn o s"><i className="icon-microphone"></i></button>
            <button className="btn o m"><i className="icon-microphone"></i></button>
            <button className="btn o l"><i className="icon-microphone"></i></button>
            <button className="btn o xl"><i className="icon-microphone"></i></button>
          </div>

        </div>
      </section>);
  }
});
Home = connect(selector, actions)(Home);
export { Home as default };
