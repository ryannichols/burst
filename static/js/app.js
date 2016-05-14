webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(95);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(38);

	var _reactRouter = __webpack_require__(30);

	var _reactRouterRedux = __webpack_require__(57);

	var _Routes = __webpack_require__(142);

	var _Routes2 = _interopRequireDefault(_Routes);

	var _RouteState = __webpack_require__(50);

	var _Store = __webpack_require__(145);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var appStore = (0, _Store.createAppStore)();

	// A monitor component for Redux DevTools
	//import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
	//import DiffMonitor from 'redux-devtools-diff-monitor';

	var appHistory = (0, _reactRouterRedux.syncHistoryWithStore)(_RouteState.history, appStore);

	// Render
	_reactDom2.default.render(_react2.default.createElement(
	  _reactRedux.Provider,
	  { store: appStore },
	  _react2.default.createElement(_reactRouter.Router, { routes: _Routes2.default, history: appHistory })
	), document.getElementById('appContainer'));

/***/ },

/***/ 29:
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.history = exports.ROUTE_INIT = exports.ROUTE_CHANGED = exports.RouteState = exports.RouteActions = undefined;

	var _lodash = __webpack_require__(18);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _reactRouterRedux = __webpack_require__(57);

	var _reactRouter = __webpack_require__(30);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Expose the route action to reducers if we want it
	var ROUTE_INIT = '@@router/INIT_PATH';
	var ROUTE_CHANGED = _reactRouterRedux.LOCATION_CHANGE;

	var history = _reactRouter.browserHistory;

	/* ACTIONS */
	var RouteActions = {
	  pushPath: _reactRouterRedux.routerActions.push,
	  replacePath: _reactRouterRedux.routerActions.replace
	};

	var RouteState = {
	  /* SPEC */
	  spec: {},

	  // We use the reducer supplied by redux-router
	  reducer: _reactRouterRedux.routerReducer,

	  /* SELECTOR */
	  selector: function selector(state) {
	    return state.router;
	  }
	};
	_lodash2.default.bindAll(RouteActions, _lodash2.default.functions(RouteActions));
	exports.RouteActions = RouteActions;
	exports.RouteState = RouteState;
	exports.ROUTE_CHANGED = ROUTE_CHANGED;
	exports.ROUTE_INIT = ROUTE_INIT;
	exports.history = history;

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(157)
	  , core      = __webpack_require__(29)
	  , ctx       = __webpack_require__(155)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routerMiddleware = exports.routerActions = exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.CALL_HISTORY_METHOD = exports.routerReducer = exports.LOCATION_CHANGE = exports.syncHistoryWithStore = undefined;

	var _reducer = __webpack_require__(99);

	Object.defineProperty(exports, 'LOCATION_CHANGE', {
	  enumerable: true,
	  get: function get() {
	    return _reducer.LOCATION_CHANGE;
	  }
	});
	Object.defineProperty(exports, 'routerReducer', {
	  enumerable: true,
	  get: function get() {
	    return _reducer.routerReducer;
	  }
	});

	var _actions = __webpack_require__(98);

	Object.defineProperty(exports, 'CALL_HISTORY_METHOD', {
	  enumerable: true,
	  get: function get() {
	    return _actions.CALL_HISTORY_METHOD;
	  }
	});
	Object.defineProperty(exports, 'push', {
	  enumerable: true,
	  get: function get() {
	    return _actions.push;
	  }
	});
	Object.defineProperty(exports, 'replace', {
	  enumerable: true,
	  get: function get() {
	    return _actions.replace;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _actions.go;
	  }
	});
	Object.defineProperty(exports, 'goBack', {
	  enumerable: true,
	  get: function get() {
	    return _actions.goBack;
	  }
	});
	Object.defineProperty(exports, 'goForward', {
	  enumerable: true,
	  get: function get() {
	    return _actions.goForward;
	  }
	});
	Object.defineProperty(exports, 'routerActions', {
	  enumerable: true,
	  get: function get() {
	    return _actions.routerActions;
	  }
	});

	var _sync = __webpack_require__(196);

	var _sync2 = _interopRequireDefault(_sync);

	var _middleware = __webpack_require__(195);

	var _middleware2 = _interopRequireDefault(_middleware);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports.syncHistoryWithStore = _sync2['default'];
	exports.routerMiddleware = _middleware2['default'];

/***/ },

/***/ 82:
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(156);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },

/***/ 98:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * This action type will be dispatched by the history actions below.
	 * If you're writing a middleware to watch for navigation events, be sure to
	 * look for actions of this type.
	 */
	var CALL_HISTORY_METHOD = exports.CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

	function updateLocation(method) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return {
	      type: CALL_HISTORY_METHOD,
	      payload: { method: method, args: args }
	    };
	  };
	}

	/**
	 * These actions correspond to the history API.
	 * The associated routerMiddleware will capture these events before they get to
	 * your reducer and reissue them as the matching function on your history.
	 */
	var push = exports.push = updateLocation('push');
	var replace = exports.replace = updateLocation('replace');
	var go = exports.go = updateLocation('go');
	var goBack = exports.goBack = updateLocation('goBack');
	var goForward = exports.goForward = updateLocation('goForward');

	var routerActions = exports.routerActions = { push: push, replace: replace, go: go, goBack: goBack, goForward: goForward };

/***/ },

/***/ 99:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.routerReducer = routerReducer;
	/**
	 * This action type will be dispatched when your history
	 * receives a location change.
	 */
	var LOCATION_CHANGE = exports.LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

	var initialState = {
	  locationBeforeTransitions: null
	};

	/**
	 * This reducer will update the state with the most recent location history
	 * has transitioned to. This may not be in sync with the router, particularly
	 * if you have asynchronously-loaded routes, so reading from and relying on
	 * this state is discouraged.
	 */
	function routerReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];

	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var type = _ref.type;
	  var payload = _ref.payload;

	  if (type === LOCATION_CHANGE) {
	    return _extends({}, state, { locationBeforeTransitions: payload });
	  }

	  return state;
	}

/***/ },

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _extends2 = __webpack_require__(149);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(38);

	var _classnames = __webpack_require__(51);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash = __webpack_require__(18);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _AppState = __webpack_require__(143);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var actions = function actions(dispatch) {
	  return (0, _extends3.default)({}, _AppState.AppActions);
	};

	var App = _react2.default.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { id: 'app' },
	      _react2.default.createElement(
	        'div',
	        { id: 'content' },
	        this.props.children
	      )
	    );
	  }
	});
	exports.default = App = (0, _reactRedux.connect)(_AppState.AppState.selector, actions)(App);
	exports.default = App;

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _is = __webpack_require__(147);

	var _is2 = _interopRequireDefault(_is);

	var _keys = __webpack_require__(148);

	var _keys2 = _interopRequireDefault(_keys);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(18);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _reactSideEffect = __webpack_require__(218);

	var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HEADER_ATTRIBUTE = "data-react-header";
	var TAG_NAMES = {
	  META: "meta",
	  LINK: "link"
	};
	var TAG_PROPERTIES = {
	  NAME: "name",
	  CHARSET: "charset",
	  HTTPEQUIV: "http-equiv",
	  REL: "rel",
	  HREF: "href",
	  PROPERTY: "property",
	  CONTENT: "content"
	};
	var getInnermostProperty = function getInnermostProperty(propsList, property) {
	  return _lodash2.default.result(_lodash2.default.find(propsList.reverse(), property), property);
	};

	var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
	  var innermostTitle = getInnermostProperty(propsList, "title");
	  var innermostTemplate = getInnermostProperty(propsList, "titleTemplate");
	  if (innermostTemplate && innermostTitle) {
	    return innermostTemplate.replace(/\%s/g, innermostTitle);
	  }
	  return innermostTitle || "";
	};
	var getBodyIdFromPropsList = function getBodyIdFromPropsList(propsList) {
	  var bodyId = getInnermostProperty(propsList, "bodyId");
	  return bodyId;
	};
	var getBodyClassesFromPropsList = function getBodyClassesFromPropsList(propsList) {
	  return propsList.filter(function (props) {
	    return props.bodyClasses && Array.isArray(props.bodyClasses);
	  }).map(function (props) {
	    return props.bodyClasses;
	  }).reduce(function (classes, list) {
	    return classes.concat(list);
	  }, []);
	};
	var getTagsFromPropsList = function getTagsFromPropsList(tagName, uniqueTagIds, propsList) {
	  // Calculate list of tags, giving priority innermost component (end of the propslist)
	  var approvedSeenTags = {};
	  var validTags = _lodash2.default.keys(TAG_PROPERTIES).map(function (key) {
	    return TAG_PROPERTIES[key];
	  });

	  var tagList = propsList.filter(function (props) {
	    return props[tagName] !== undefined;
	  }).map(function (props) {
	    return props[tagName];
	  }).reverse().reduce(function (approvedTags, instanceTags) {
	    var instanceSeenTags = {};

	    instanceTags.filter(function (tag) {
	      for (var attributeKey in tag) {
	        var value = tag[attributeKey].toLowerCase();
	        var attributeKey = attributeKey.toLowerCase();

	        if (validTags.indexOf(attributeKey) == -1) {
	          return false;
	        }
	        if (!approvedSeenTags[attributeKey]) {
	          approvedSeenTags[attributeKey] = [];
	        }
	        if (!instanceSeenTags[attributeKey]) {
	          instanceSeenTags[attributeKey] = [];
	        }

	        if (!_lodash2.default.has(approvedSeenTags[attributeKey], value)) {
	          instanceSeenTags[attributeKey].push(value);
	          return true;
	        }
	        return false;
	      }
	    }).reverse().forEach(function (tag) {
	      return approvedTags.push(tag);
	    });

	    // Update seen tags with tags from this instance
	    _lodash2.default.keys(instanceSeenTags).forEach(function (attr) {
	      approvedSeenTags[attr] = _lodash2.default.union(approvedSeenTags[attr], instanceSeenTags[attr]);
	    });
	    instanceSeenTags = {};
	    return approvedTags;
	  }, []);
	  return tagList;
	};
	var updateTitle = function updateTitle(title) {
	  document.title = title || document.title;
	};
	var updateBodyId = function updateBodyId(id) {
	  document.body.setAttribute("id", id);
	};
	var updateBodyClasses = function updateBodyClasses(classes) {
	  document.body.className = "";
	  classes.forEach(function (cl) {
	    if (!cl || cl == "") return;
	    document.body.classList.add(cl);
	  });
	};
	var updateTags = function updateTags(type, tags) {
	  var headElement = document.head || document.querySelector("head");
	  var existingTags = headElement.querySelectorAll(type + '[' + HEADER_ATTRIBUTE + ']');
	  existingTags = Array.prototype.slice.call(existingTags);
	  // Remove any duplicate tags
	  existingTags.forEach(function (tag) {
	    return tag.parentNode.removeChild(tag);
	  });

	  if (tags && tags.length) {
	    tags.forEach(function (tag) {
	      var newElement = document.createElement(type);
	      for (var attribute in tag) {
	        if (tag.hasOwnProperty(attribute)) {
	          newElement.setAttribute(attribute, tag[attribute]);
	        }
	      }
	      newElement.setAttribute(HEADER_ATTRIBUTE, "true");
	      headElement.insertBefore(newElement, headElement.firstChild);
	    });
	  }
	};
	var generateTagsAsString = function generateTagsAsString(type, tags) {
	  var html = tags.map(function (tag) {
	    var attributeHtml = (0, _keys2.default)(tag).map(function (attribute) {
	      var encodedValue = HTMLEntities.encode(tag[attribute], {
	        useNamedReferences: true
	      });
	      return attribute + '="' + encodedValue + '"';
	    }).join(" ");
	    return '<' + type + ' ' + attributeHtml + ' ' + HEADER_ATTRIBUTE + '="true" />';
	  });
	  return html.join("\n");
	};

	var reducePropsToState = function reducePropsToState(propsList) {
	  return {
	    title: getTitleFromPropsList(propsList),
	    metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.CONTENT], propsList),
	    linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
	    bodyId: getBodyIdFromPropsList(propsList),
	    bodyClasses: getBodyClassesFromPropsList(propsList)
	  };
	};
	var handleClientStateChange = function handleClientStateChange(_ref) {
	  var title = _ref.title;
	  var metaTags = _ref.metaTags;
	  var linkTags = _ref.linkTags;
	  var bodyId = _ref.bodyId;
	  var bodyClasses = _ref.bodyClasses;

	  updateTitle(title);
	  updateTags(TAG_NAMES.LINK, linkTags);
	  updateTags(TAG_NAMES.META, metaTags);
	  updateBodyId(bodyId);
	  updateBodyClasses(bodyClasses);
	};
	var mapStateOnServer = function mapStateOnServer(_ref2) {
	  var title = _ref2.title;
	  var metaTags = _ref2.metaTags;
	  var linkTags = _ref2.linkTags;
	  return {
	    title: HTMLEntities.encode(title),
	    meta: generateTagsAsString(TAG_NAMES.META, metaTags),
	    link: generateTagsAsString(TAG_NAMES.LINK, linkTags)
	  };
	};

	var DocumentMeta = _react2.default.createClass({
	  displayName: 'DocumentMeta',

	  propTypes: {
	    title: _react2.default.PropTypes.string,
	    titleTemplate: _react2.default.PropTypes.string,
	    meta: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	    link: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	    children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.array]),
	    bodyClasses: _react2.default.PropTypes.array
	  },
	  render: function render() {
	    if ((0, _is2.default)(_react2.default.Children.count(this.props.children), 1)) {
	      return _react2.default.Children.only(this.props.children);
	    } else if (_react2.default.Children.count(this.props.children) > 1) {
	      return _react2.default.createElement(
	        'span',
	        null,
	        this.props.children
	      );
	    }
	    return null;
	  }
	});
	exports.default = DocumentMeta = (0, _reactSideEffect2.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(DocumentMeta);
	exports.default = DocumentMeta;

/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(18);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _reactRouter = __webpack_require__(30);

	var _reactRedux = __webpack_require__(38);

	var _classnames = __webpack_require__(51);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _DocumentMeta = __webpack_require__(140);

	var _DocumentMeta2 = _interopRequireDefault(_DocumentMeta);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var selector = null;
	var actions = {};
	var Home = _react2.default.createClass({
	  displayName: 'Home',

	  render: function render() {
	    return _react2.default.createElement(
	      'section',
	      null,
	      _react2.default.createElement(_DocumentMeta2.default, { title: 'Page Title', bodyId: 'home' }),
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Home page'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'This is the homepage component'
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Buttons'
	        ),
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Standard Buttons'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'button',
	            { className: 'btn xs' },
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn s' },
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn m' },
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn l' },
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn xl' },
	            'Button'
	          )
	        ),
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Standard Buttons with Icons'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'button',
	            { className: 'btn xs' },
	            _react2.default.createElement('i', { className: 'icon-microphone' }),
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn s' },
	            _react2.default.createElement('i', { className: 'icon-microphone' }),
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn m' },
	            _react2.default.createElement('i', { className: 'icon-microphone' }),
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn l' },
	            _react2.default.createElement('i', { className: 'icon-microphone' }),
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn xl' },
	            _react2.default.createElement('i', { className: 'icon-microphone' }),
	            'Button'
	          )
	        ),
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Text Buttons'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'button',
	            { className: 'btn tx xs' },
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn tx s' },
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn tx m' },
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn tx l' },
	            'Button'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn tx xl' },
	            'Button'
	          )
	        ),
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Circle Buttons'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'button',
	            { className: 'btn c xs' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn c s' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn c m' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn c l' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn c xl' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          )
	        ),
	        _react2.default.createElement(
	          'h3',
	          null,
	          'Outline Buttons'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'button',
	            { className: 'btn o xs' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn o s' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn o m' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn o l' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn o xl' },
	            _react2.default.createElement('i', { className: 'icon-microphone' })
	          )
	        )
	      )
	    );
	  }
	});
	exports.default = Home = (0, _reactRedux.connect)(selector, actions)(Home);
	exports.default = Home;

/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(18);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _reactRouter = __webpack_require__(30);

	var _App = __webpack_require__(139);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(141);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// SCREENS


	var Routes = _react2.default.createElement(
	  _reactRouter.Route,
	  { component: _App2.default },
	  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default })
	);

	exports.default = Routes;

/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AppActions = exports.AppState = undefined;

	var _reselect = __webpack_require__(138);

	var _lodash = __webpack_require__(18);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AppActions = {
	  fetchAppData: function fetchAppData() {}
	};

	var AppState = {
	  spec: {},

	  reducer: function reducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? this.spec : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {}
	  },


	  selector: (0, _reselect.createSelector)([], function () {
	    return {};
	  })
	};
	_lodash2.default.bindAll(AppState, _lodash2.default.functions(AppState));
	_lodash2.default.bindAll(AppActions, _lodash2.default.functions(AppActions));

	exports.AppState = AppState;
	exports.AppActions = AppActions;

/***/ },

/***/ 144:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _redux = __webpack_require__(49);

	var _RouteState = __webpack_require__(50);

	var rootReducer = (0, _redux.combineReducers)({
	  routing: _RouteState.RouteState.reducer
	});
	exports.default = rootReducer;

/***/ },

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createAppStore = undefined;

	var _redux = __webpack_require__(49);

	var _reduxThunk = __webpack_require__(134);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(133);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reactRouterRedux = __webpack_require__(57);

	var _lodash = __webpack_require__(18);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _RootReducer = __webpack_require__(144);

	var _RootReducer2 = _interopRequireDefault(_RootReducer);

	var _RouteState = __webpack_require__(50);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Lets you write ?debug_session=<name> in address bar to persist debug sessions
	var debugUrl = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

	var logTransformer = function logTransformer(action) {
	  if (action.result) {
	    action = _lodash2.default.assign({}, action, { type: action.type + ":" + action.result });
	  }
	  return action;
	};

	var middleware = [_reduxThunk2.default, (0, _reactRouterRedux.routerMiddleware)(_RouteState.history)];

	if (process.env.NODE_ENV === 'development' || debugUrl) {
	  middleware.push((0, _reduxLogger2.default)({
	    duration: true,
	    timestamp: true,
	    collapsed: true,
	    actionTransformer: logTransformer
	  }));
	}

	var _createAppStore = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware))(_redux.createStore);

	function createAppStore() {
	  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var store = _createAppStore(_RootReducer2.default, initialState);
	  if (false) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('store', function () {
	      var nextRootReducer = require('store');
	      store.replaceReducer(nextRootReducer);
	    });
	  }
	  return store;
	}
	exports.createAppStore = createAppStore;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 146:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(150), __esModule: true };

/***/ },

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ },

/***/ 148:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(152), __esModule: true };

/***/ },

/***/ 149:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(146)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(163);
	module.exports = __webpack_require__(29).Object.assign;

/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(164);
	module.exports = __webpack_require__(29).Object.is;

/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(165);
	module.exports = __webpack_require__(29).Object.keys;

/***/ },

/***/ 153:
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ 154:
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },

/***/ 155:
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(153);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },

/***/ 156:
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },

/***/ 157:
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(154);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },

/***/ 159:
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(159)
	  , toObject = __webpack_require__(83)
	  , IObject  = __webpack_require__(158);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(82)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(52)
	  , core    = __webpack_require__(29)
	  , fails   = __webpack_require__(82);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },

/***/ 162:
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(52);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(160)});

/***/ },

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(52);
	$export($export.S, 'Object', {is: __webpack_require__(162)});

/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(83);

	__webpack_require__(161)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = routerMiddleware;

	var _actions = __webpack_require__(98);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
	 * provided history object. This will prevent these actions from reaching your
	 * reducer or any middleware that comes after this one.
	 */
	function routerMiddleware(history) {
	  return function () {
	    return function (next) {
	      return function (action) {
	        if (action.type !== _actions.CALL_HISTORY_METHOD) {
	          return next(action);
	        }

	        var _action$payload = action.payload;
	        var method = _action$payload.method;
	        var args = _action$payload.args;

	        history[method].apply(history, _toConsumableArray(args));
	      };
	    };
	  };
	}

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = syncHistoryWithStore;

	var _reducer = __webpack_require__(99);

	var defaultSelectLocationState = function defaultSelectLocationState(state) {
	  return state.routing;
	};

	/**
	 * This function synchronizes your history state with the Redux store.
	 * Location changes flow from history to the store. An enhanced history is
	 * returned with a listen method that responds to store updates for location.
	 *
	 * When this history is provided to the router, this means the location data
	 * will flow like this:
	 * history.push -> store.dispatch -> enhancedHistory.listen -> router
	 * This ensures that when the store state changes due to a replay or other
	 * event, the router will be updated appropriately and can transition to the
	 * correct router state.
	 */
	function syncHistoryWithStore(history, store) {
	  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  var _ref$selectLocationSt = _ref.selectLocationState;
	  var selectLocationState = _ref$selectLocationSt === undefined ? defaultSelectLocationState : _ref$selectLocationSt;
	  var _ref$adjustUrlOnRepla = _ref.adjustUrlOnReplay;
	  var adjustUrlOnReplay = _ref$adjustUrlOnRepla === undefined ? true : _ref$adjustUrlOnRepla;

	  // Ensure that the reducer is mounted on the store and functioning properly.
	  if (typeof selectLocationState(store.getState()) === 'undefined') {
	    throw new Error('Expected the routing state to be available either as `state.routing` ' + 'or as the custom expression you can specify as `selectLocationState` ' + 'in the `syncHistoryWithStore()` options. ' + 'Ensure you have added the `routerReducer` to your store\'s ' + 'reducers via `combineReducers` or whatever method you use to isolate ' + 'your reducers.');
	  }

	  var initialLocation = void 0;
	  var currentLocation = void 0;
	  var isTimeTraveling = void 0;
	  var unsubscribeFromStore = void 0;
	  var unsubscribeFromHistory = void 0;

	  // What does the store say about current location?
	  var getLocationInStore = function getLocationInStore(useInitialIfEmpty) {
	    var locationState = selectLocationState(store.getState());
	    return locationState.locationBeforeTransitions || (useInitialIfEmpty ? initialLocation : undefined);
	  };

	  // If the store is replayed, update the URL in the browser to match.
	  if (adjustUrlOnReplay) {
	    var handleStoreChange = function handleStoreChange() {
	      var locationInStore = getLocationInStore(true);
	      if (currentLocation === locationInStore) {
	        return;
	      }

	      // Update address bar to reflect store state
	      isTimeTraveling = true;
	      currentLocation = locationInStore;
	      history.transitionTo(_extends({}, locationInStore, {
	        action: 'PUSH'
	      }));
	      isTimeTraveling = false;
	    };

	    unsubscribeFromStore = store.subscribe(handleStoreChange);
	    handleStoreChange();
	  }

	  // Whenever location changes, dispatch an action to get it in the store
	  var handleLocationChange = function handleLocationChange(location) {
	    // ... unless we just caused that location change
	    if (isTimeTraveling) {
	      return;
	    }

	    // Remember where we are
	    currentLocation = location;

	    // Are we being called for the first time?
	    if (!initialLocation) {
	      // Remember as a fallback in case state is reset
	      initialLocation = location;

	      // Respect persisted location, if any
	      if (getLocationInStore()) {
	        return;
	      }
	    }

	    // Tell the store to update by dispatching an action
	    store.dispatch({
	      type: _reducer.LOCATION_CHANGE,
	      payload: location
	    });
	  };
	  unsubscribeFromHistory = history.listen(handleLocationChange);

	  // The enhanced history uses store as source of truth
	  return _extends({}, history, {
	    // The listeners are subscribed to the store instead of history

	    listen: function listen(listener) {
	      // Copy of last location.
	      var lastPublishedLocation = getLocationInStore(true);

	      // Keep track of whether we unsubscribed, as Redux store
	      // only applies changes in subscriptions on next dispatch
	      var unsubscribed = false;
	      var unsubscribeFromStore = store.subscribe(function () {
	        var currentLocation = getLocationInStore(true);
	        if (currentLocation === lastPublishedLocation) {
	          return;
	        }
	        lastPublishedLocation = currentLocation;
	        if (!unsubscribed) {
	          listener(lastPublishedLocation);
	        }
	      });

	      // History listeners expect a synchronous call. Make the first call to the
	      // listener after subscribing to the store, in case the listener causes a
	      // location change (e.g. when it redirects)
	      listener(lastPublishedLocation);

	      // Let user unsubscribe later
	      return function () {
	        unsubscribed = true;
	        unsubscribeFromStore();
	      };
	    },


	    // It also provides a way to destroy internal listeners
	    unsubscribe: function unsubscribe() {
	      if (adjustUrlOnReplay) {
	        unsubscribeFromStore();
	      }
	      unsubscribeFromHistory();
	    }
	  });
	}

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _fbjsLibExecutionEnvironment = __webpack_require__(219);

	var _fbjsLibExecutionEnvironment2 = _interopRequireDefault(_fbjsLibExecutionEnvironment);

	var _fbjsLibShallowEqual = __webpack_require__(220);

	var _fbjsLibShallowEqual2 = _interopRequireDefault(_fbjsLibShallowEqual);

	module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
	  if (typeof reducePropsToState !== 'function') {
	    throw new Error('Expected reducePropsToState to be a function.');
	  }
	  if (typeof handleStateChangeOnClient !== 'function') {
	    throw new Error('Expected handleStateChangeOnClient to be a function.');
	  }
	  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
	    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
	  }

	  function getDisplayName(WrappedComponent) {
	    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	  }

	  return function wrap(WrappedComponent) {
	    if (typeof WrappedComponent !== 'function') {
	      throw new Error('Expected WrappedComponent to be a React component.');
	    }

	    var mountedInstances = [];
	    var state = undefined;

	    function emitChange() {
	      state = reducePropsToState(mountedInstances.map(function (instance) {
	        return instance.props;
	      }));

	      if (SideEffect.canUseDOM) {
	        handleStateChangeOnClient(state);
	      } else if (mapStateOnServer) {
	        state = mapStateOnServer(state);
	      }
	    }

	    var SideEffect = (function (_Component) {
	      _inherits(SideEffect, _Component);

	      function SideEffect() {
	        _classCallCheck(this, SideEffect);

	        _Component.apply(this, arguments);
	      }

	      SideEffect.peek = function peek() {
	        return state;
	      };

	      SideEffect.rewind = function rewind() {
	        if (SideEffect.canUseDOM) {
	          throw new Error('You may ony call rewind() on the server. Call peek() to read the current state.');
	        }

	        var recordedState = state;
	        state = undefined;
	        mountedInstances = [];
	        return recordedState;
	      };

	      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	        return !_fbjsLibShallowEqual2['default'](nextProps, this.props);
	      };

	      SideEffect.prototype.componentWillMount = function componentWillMount() {
	        mountedInstances.push(this);
	        emitChange();
	      };

	      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
	        emitChange();
	      };

	      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
	        var index = mountedInstances.indexOf(this);
	        mountedInstances.splice(index, 1);
	        emitChange();
	      };

	      SideEffect.prototype.render = function render() {
	        return _react2['default'].createElement(WrappedComponent, this.props);
	      };

	      _createClass(SideEffect, null, [{
	        key: 'displayName',

	        // Try to use displayName of wrapped component
	        value: 'SideEffect(' + getDisplayName(WrappedComponent) + ')',

	        // Expose canUseDOM so tests can monkeypatch it
	        enumerable: true
	      }, {
	        key: 'canUseDOM',
	        value: _fbjsLibExecutionEnvironment2['default'].canUseDOM,
	        enumerable: true
	      }]);

	      return SideEffect;
	    })(_react.Component);

	    return SideEffect;
	  };
	};

/***/ },

/***/ 219:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },

/***/ 220:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * 
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ }

});