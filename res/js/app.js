(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/res/js/app"],{

/***/ "./node_modules/history/es/DOMUtils.js":
/*!*********************************************!*\
  !*** ./node_modules/history/es/DOMUtils.js ***!
  \*********************************************/
/*! exports provided: canUseDOM, addEventListener, removeEventListener, getConfirmation, supportsHistory, supportsPopStateOnHashChange, supportsGoWithoutReloadUsingHash, isExtraneousPopstateEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canUseDOM", function() { return canUseDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEventListener", function() { return addEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEventListener", function() { return removeEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfirmation", function() { return getConfirmation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsHistory", function() { return supportsHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsPopStateOnHashChange", function() { return supportsPopStateOnHashChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsGoWithoutReloadUsingHash", function() { return supportsGoWithoutReloadUsingHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isExtraneousPopstateEvent", function() { return isExtraneousPopstateEvent; });
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),

/***/ "./node_modules/history/es/LocationUtils.js":
/*!**************************************************!*\
  !*** ./node_modules/history/es/LocationUtils.js ***!
  \**************************************************/
/*! exports provided: createLocation, locationsAreEqual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLocation", function() { return createLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locationsAreEqual", function() { return locationsAreEqual; });
/* harmony import */ var resolve_pathname__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! resolve-pathname */ "./node_modules/resolve-pathname/index.js");
/* harmony import */ var value_equal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! value-equal */ "./node_modules/value-equal/index.js");
/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_2__["parsePath"])(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = Object(resolve_pathname__WEBPACK_IMPORTED_MODULE_0__["default"])(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && Object(value_equal__WEBPACK_IMPORTED_MODULE_1__["default"])(a.state, b.state);
};

/***/ }),

/***/ "./node_modules/history/es/PathUtils.js":
/*!**********************************************!*\
  !*** ./node_modules/history/es/PathUtils.js ***!
  \**********************************************/
/*! exports provided: addLeadingSlash, stripLeadingSlash, hasBasename, stripBasename, stripTrailingSlash, parsePath, createPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLeadingSlash", function() { return addLeadingSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripLeadingSlash", function() { return stripLeadingSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasBasename", function() { return hasBasename; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripBasename", function() { return stripBasename; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripTrailingSlash", function() { return stripTrailingSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return parsePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPath", function() { return createPath; });
var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),

/***/ "./node_modules/history/es/createBrowserHistory.js":
/*!*********************************************************!*\
  !*** ./node_modules/history/es/createBrowserHistory.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/history/node_modules/warning/browser.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LocationUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationUtils */ "./node_modules/history/es/LocationUtils.js");
/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
/* harmony import */ var _createTransitionManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createTransitionManager */ "./node_modules/history/es/createTransitionManager.js");
/* harmony import */ var _DOMUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DOMUtils */ "./node_modules/history/es/DOMUtils.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  invariant__WEBPACK_IMPORTED_MODULE_1___default()(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["canUseDOM"], 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["supportsHistory"])();
  var needsHashChangeListener = !Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["supportsPopStateOnHashChange"])();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils__WEBPACK_IMPORTED_MODULE_5__["getConfirmation"] : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripTrailingSlash"])(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"])(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    warning__WEBPACK_IMPORTED_MODULE_0___default()(!basename || Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["hasBasename"])(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripBasename"])(path, basename);

    return Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, key);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = Object(_createTransitionManager__WEBPACK_IMPORTED_MODULE_4__["default"])();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["isExtraneousPopstateEvent"])(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location);
  };

  var push = function push(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        warning__WEBPACK_IMPORTED_MODULE_0___default()(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        warning__WEBPACK_IMPORTED_MODULE_0___default()(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["addEventListener"])(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["addEventListener"])(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["removeEventListener"])(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["removeEventListener"])(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

/* harmony default export */ __webpack_exports__["default"] = (createBrowserHistory);

/***/ }),

/***/ "./node_modules/history/es/createHashHistory.js":
/*!******************************************************!*\
  !*** ./node_modules/history/es/createHashHistory.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/history/node_modules/warning/browser.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LocationUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationUtils */ "./node_modules/history/es/LocationUtils.js");
/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
/* harmony import */ var _createTransitionManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createTransitionManager */ "./node_modules/history/es/createTransitionManager.js");
/* harmony import */ var _DOMUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DOMUtils */ "./node_modules/history/es/DOMUtils.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripLeadingSlash"])(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripLeadingSlash"],
    decodePath: _PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"]
  },
  slash: {
    encodePath: _PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"],
    decodePath: _PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"]
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  invariant__WEBPACK_IMPORTED_MODULE_1___default()(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["canUseDOM"], 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["supportsGoWithoutReloadUsingHash"])();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils__WEBPACK_IMPORTED_MODULE_5__["getConfirmation"] : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripTrailingSlash"])(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["addLeadingSlash"])(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;


  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    warning__WEBPACK_IMPORTED_MODULE_0___default()(!basename || Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["hasBasename"])(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["stripBasename"])(path, basename);

    return Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path);
  };

  var transitionManager = Object(_createTransitionManager__WEBPACK_IMPORTED_MODULE_4__["default"])();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["locationsAreEqual"])(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location));
  };

  var push = function push(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        warning__WEBPACK_IMPORTED_MODULE_0___default()(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(Object(_PathUtils__WEBPACK_IMPORTED_MODULE_3__["createPath"])(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["addEventListener"])(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      Object(_DOMUtils__WEBPACK_IMPORTED_MODULE_5__["removeEventListener"])(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

/* harmony default export */ __webpack_exports__["default"] = (createHashHistory);

/***/ }),

/***/ "./node_modules/history/es/createMemoryHistory.js":
/*!********************************************************!*\
  !*** ./node_modules/history/es/createMemoryHistory.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/history/node_modules/warning/browser.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
/* harmony import */ var _LocationUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationUtils */ "./node_modules/history/es/LocationUtils.js");
/* harmony import */ var _createTransitionManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createTransitionManager */ "./node_modules/history/es/createTransitionManager.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var transitionManager = Object(_createTransitionManager__WEBPACK_IMPORTED_MODULE_3__["default"])();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(entry, undefined, createKey()) : Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = _PathUtils__WEBPACK_IMPORTED_MODULE_1__["createPath"];

  var push = function push(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = Object(_LocationUtils__WEBPACK_IMPORTED_MODULE_2__["createLocation"])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

/* harmony default export */ __webpack_exports__["default"] = (createMemoryHistory);

/***/ }),

/***/ "./node_modules/history/es/createTransitionManager.js":
/*!************************************************************!*\
  !*** ./node_modules/history/es/createTransitionManager.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! warning */ "./node_modules/history/node_modules/warning/browser.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_0__);


var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    warning__WEBPACK_IMPORTED_MODULE_0___default()(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          warning__WEBPACK_IMPORTED_MODULE_0___default()(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createTransitionManager);

/***/ }),

/***/ "./node_modules/history/es/index.js":
/*!******************************************!*\
  !*** ./node_modules/history/es/index.js ***!
  \******************************************/
/*! exports provided: createBrowserHistory, createHashHistory, createMemoryHistory, createLocation, locationsAreEqual, parsePath, createPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createBrowserHistory */ "./node_modules/history/es/createBrowserHistory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createBrowserHistory", function() { return _createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _createHashHistory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createHashHistory */ "./node_modules/history/es/createHashHistory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createHashHistory", function() { return _createHashHistory__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _createMemoryHistory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createMemoryHistory */ "./node_modules/history/es/createMemoryHistory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMemoryHistory", function() { return _createMemoryHistory__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _LocationUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LocationUtils */ "./node_modules/history/es/LocationUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createLocation", function() { return _LocationUtils__WEBPACK_IMPORTED_MODULE_3__["createLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "locationsAreEqual", function() { return _LocationUtils__WEBPACK_IMPORTED_MODULE_3__["locationsAreEqual"]; });

/* harmony import */ var _PathUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/es/PathUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return _PathUtils__WEBPACK_IMPORTED_MODULE_4__["parsePath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPath", function() { return _PathUtils__WEBPACK_IMPORTED_MODULE_4__["createPath"]; });











/***/ }),

/***/ "./node_modules/history/node_modules/warning/browser.js":
/*!**************************************************************!*\
  !*** ./node_modules/history/node_modules/warning/browser.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (true) {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          )

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(isValidElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/resolve-pathname/index.js":
/*!************************************************!*\
  !*** ./node_modules/resolve-pathname/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);

/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler-tracing.development.js":
/*!*********************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler-tracing.development.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.12.0
 * scheduler-tracing.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:


// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.


// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


// Gather advanced timing metrics for Profiler subtrees.


// Trace which interactions trigger each commit.
var enableSchedulerTracing = true;

// Only used in www builds.
 // TODO: true? Here it might just be false.

// Only used in www builds.


// Only used in www builds.


// React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties


// These APIs will no longer be "unstable" in the upcoming 16.7 release,
// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.

var DEFAULT_THREAD_ID = 0;

// Counters used to generate unique IDs.
var interactionIDCounter = 0;
var threadIDCounter = 0;

// Set of currently traced interactions.
// Interactions "stack"–
// Meaning that newly traced interactions are appended to the previously active set.
// When an interaction goes out of scope, the previous set (if any) is restored.
exports.__interactionsRef = null;

// Listener(s) to notify when interactions begin and end.
exports.__subscriberRef = null;

if (enableSchedulerTracing) {
  exports.__interactionsRef = {
    current: new Set()
  };
  exports.__subscriberRef = {
    current: null
  };
}

function unstable_clear(callback) {
  if (!enableSchedulerTracing) {
    return callback();
  }

  var prevInteractions = exports.__interactionsRef.current;
  exports.__interactionsRef.current = new Set();

  try {
    return callback();
  } finally {
    exports.__interactionsRef.current = prevInteractions;
  }
}

function unstable_getCurrent() {
  if (!enableSchedulerTracing) {
    return null;
  } else {
    return exports.__interactionsRef.current;
  }
}

function unstable_getThreadID() {
  return ++threadIDCounter;
}

function unstable_trace(name, timestamp, callback) {
  var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;

  if (!enableSchedulerTracing) {
    return callback();
  }

  var interaction = {
    __count: 1,
    id: interactionIDCounter++,
    name: name,
    timestamp: timestamp
  };

  var prevInteractions = exports.__interactionsRef.current;

  // Traced interactions should stack/accumulate.
  // To do that, clone the current interactions.
  // The previous set will be restored upon completion.
  var interactions = new Set(prevInteractions);
  interactions.add(interaction);
  exports.__interactionsRef.current = interactions;

  var subscriber = exports.__subscriberRef.current;
  var returnValue = void 0;

  try {
    if (subscriber !== null) {
      subscriber.onInteractionTraced(interaction);
    }
  } finally {
    try {
      if (subscriber !== null) {
        subscriber.onWorkStarted(interactions, threadID);
      }
    } finally {
      try {
        returnValue = callback();
      } finally {
        exports.__interactionsRef.current = prevInteractions;

        try {
          if (subscriber !== null) {
            subscriber.onWorkStopped(interactions, threadID);
          }
        } finally {
          interaction.__count--;

          // If no async work was scheduled for this interaction,
          // Notify subscribers that it's completed.
          if (subscriber !== null && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        }
      }
    }
  }

  return returnValue;
}

function unstable_wrap(callback) {
  var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;

  if (!enableSchedulerTracing) {
    return callback;
  }

  var wrappedInteractions = exports.__interactionsRef.current;

  var subscriber = exports.__subscriberRef.current;
  if (subscriber !== null) {
    subscriber.onWorkScheduled(wrappedInteractions, threadID);
  }

  // Update the pending async work count for the current interactions.
  // Update after calling subscribers in case of error.
  wrappedInteractions.forEach(function (interaction) {
    interaction.__count++;
  });

  var hasRun = false;

  function wrapped() {
    var prevInteractions = exports.__interactionsRef.current;
    exports.__interactionsRef.current = wrappedInteractions;

    subscriber = exports.__subscriberRef.current;

    try {
      var returnValue = void 0;

      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(wrappedInteractions, threadID);
        }
      } finally {
        try {
          returnValue = callback.apply(undefined, arguments);
        } finally {
          exports.__interactionsRef.current = prevInteractions;

          if (subscriber !== null) {
            subscriber.onWorkStopped(wrappedInteractions, threadID);
          }
        }
      }

      return returnValue;
    } finally {
      if (!hasRun) {
        // We only expect a wrapped function to be executed once,
        // But in the event that it's executed more than once–
        // Only decrement the outstanding interaction counts once.
        hasRun = true;

        // Update pending async counts for all wrapped interactions.
        // If this was the last scheduled async work for any of them,
        // Mark them as completed.
        wrappedInteractions.forEach(function (interaction) {
          interaction.__count--;

          if (subscriber !== null && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        });
      }
    }
  }

  wrapped.cancel = function cancel() {
    subscriber = exports.__subscriberRef.current;

    try {
      if (subscriber !== null) {
        subscriber.onWorkCanceled(wrappedInteractions, threadID);
      }
    } finally {
      // Update pending async counts for all wrapped interactions.
      // If this was the last scheduled async work for any of them,
      // Mark them as completed.
      wrappedInteractions.forEach(function (interaction) {
        interaction.__count--;

        if (subscriber && interaction.__count === 0) {
          subscriber.onInteractionScheduledWorkCompleted(interaction);
        }
      });
    }
  };

  return wrapped;
}

var subscribers = null;
if (enableSchedulerTracing) {
  subscribers = new Set();
}

function unstable_subscribe(subscriber) {
  if (enableSchedulerTracing) {
    subscribers.add(subscriber);

    if (subscribers.size === 1) {
      exports.__subscriberRef.current = {
        onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
        onInteractionTraced: onInteractionTraced,
        onWorkCanceled: onWorkCanceled,
        onWorkScheduled: onWorkScheduled,
        onWorkStarted: onWorkStarted,
        onWorkStopped: onWorkStopped
      };
    }
  }
}

function unstable_unsubscribe(subscriber) {
  if (enableSchedulerTracing) {
    subscribers.delete(subscriber);

    if (subscribers.size === 0) {
      exports.__subscriberRef.current = null;
    }
  }
}

function onInteractionTraced(interaction) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onInteractionTraced(interaction);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onInteractionScheduledWorkCompleted(interaction) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onInteractionScheduledWorkCompleted(interaction);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkScheduled(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkScheduled(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkStarted(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkStarted(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkStopped(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkStopped(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

function onWorkCanceled(interactions, threadID) {
  var didCatchError = false;
  var caughtError = null;

  subscribers.forEach(function (subscriber) {
    try {
      subscriber.onWorkCanceled(interactions, threadID);
    } catch (error) {
      if (!didCatchError) {
        didCatchError = true;
        caughtError = error;
      }
    }
  });

  if (didCatchError) {
    throw caughtError;
  }
}

exports.unstable_clear = unstable_clear;
exports.unstable_getCurrent = unstable_getCurrent;
exports.unstable_getThreadID = unstable_getThreadID;
exports.unstable_trace = unstable_trace;
exports.unstable_wrap = unstable_wrap;
exports.unstable_subscribe = unstable_subscribe;
exports.unstable_unsubscribe = unstable_unsubscribe;
  })();
}


/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler.development.js":
/*!*************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler.development.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** @license React v0.12.0
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:


// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.


// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


// Gather advanced timing metrics for Profiler subtrees.


// Trace which interactions trigger each commit.


// Only used in www builds.
 // TODO: true? Here it might just be false.

// Only used in www builds.
var enableSchedulerDebugging = true;

// Only used in www builds.


// React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties


// These APIs will no longer be "unstable" in the upcoming 16.7 release,
// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.

/* eslint-disable no-var */

// TODO: Use symbols?
var ImmediatePriority = 1;
var UserBlockingPriority = 2;
var NormalPriority = 3;
var LowPriority = 4;
var IdlePriority = 5;

// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823;

// Times out immediately
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
var USER_BLOCKING_PRIORITY = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
var IDLE_PRIORITY = maxSigned31BitInt;

// Callbacks are stored as a circular, doubly linked list.
var firstCallbackNode = null;

var currentDidTimeout = false;
// Pausing the scheduler is useful for debugging.
var isSchedulerPaused = false;

var currentPriorityLevel = NormalPriority;
var currentEventStartTime = -1;
var currentExpirationTime = -1;

// This is set when a callback is being executed, to prevent re-entrancy.
var isExecutingCallback = false;

var isHostCallbackScheduled = false;

var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

function ensureHostCallbackIsScheduled() {
  if (isExecutingCallback) {
    // Don't schedule work yet; wait until the next time we yield.
    return;
  }
  // Schedule the host callback using the earliest expiration in the list.
  var expirationTime = firstCallbackNode.expirationTime;
  if (!isHostCallbackScheduled) {
    isHostCallbackScheduled = true;
  } else {
    // Cancel the existing host callback.
    cancelHostCallback();
  }
  requestHostCallback(flushWork, expirationTime);
}

function flushFirstCallback() {
  var flushedNode = firstCallbackNode;

  // Remove the node from the list before calling the callback. That way the
  // list is in a consistent state even if the callback throws.
  var next = firstCallbackNode.next;
  if (firstCallbackNode === next) {
    // This is the last callback in the list.
    firstCallbackNode = null;
    next = null;
  } else {
    var lastCallbackNode = firstCallbackNode.previous;
    firstCallbackNode = lastCallbackNode.next = next;
    next.previous = lastCallbackNode;
  }

  flushedNode.next = flushedNode.previous = null;

  // Now it's safe to call the callback.
  var callback = flushedNode.callback;
  var expirationTime = flushedNode.expirationTime;
  var priorityLevel = flushedNode.priorityLevel;
  var previousPriorityLevel = currentPriorityLevel;
  var previousExpirationTime = currentExpirationTime;
  currentPriorityLevel = priorityLevel;
  currentExpirationTime = expirationTime;
  var continuationCallback;
  try {
    continuationCallback = callback();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentExpirationTime = previousExpirationTime;
  }

  // A callback may return a continuation. The continuation should be scheduled
  // with the same priority and expiration as the just-finished callback.
  if (typeof continuationCallback === 'function') {
    var continuationNode = {
      callback: continuationCallback,
      priorityLevel: priorityLevel,
      expirationTime: expirationTime,
      next: null,
      previous: null
    };

    // Insert the new callback into the list, sorted by its expiration. This is
    // almost the same as the code in `scheduleCallback`, except the callback
    // is inserted into the list *before* callbacks of equal expiration instead
    // of after.
    if (firstCallbackNode === null) {
      // This is the first callback in the list.
      firstCallbackNode = continuationNode.next = continuationNode.previous = continuationNode;
    } else {
      var nextAfterContinuation = null;
      var node = firstCallbackNode;
      do {
        if (node.expirationTime >= expirationTime) {
          // This callback expires at or after the continuation. We will insert
          // the continuation *before* this callback.
          nextAfterContinuation = node;
          break;
        }
        node = node.next;
      } while (node !== firstCallbackNode);

      if (nextAfterContinuation === null) {
        // No equal or lower priority callback was found, which means the new
        // callback is the lowest priority callback in the list.
        nextAfterContinuation = firstCallbackNode;
      } else if (nextAfterContinuation === firstCallbackNode) {
        // The new callback is the highest priority callback in the list.
        firstCallbackNode = continuationNode;
        ensureHostCallbackIsScheduled();
      }

      var previous = nextAfterContinuation.previous;
      previous.next = nextAfterContinuation.previous = continuationNode;
      continuationNode.next = nextAfterContinuation;
      continuationNode.previous = previous;
    }
  }
}

function flushImmediateWork() {
  if (
  // Confirm we've exited the outer most event handler
  currentEventStartTime === -1 && firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority) {
    isExecutingCallback = true;
    try {
      do {
        flushFirstCallback();
      } while (
      // Keep flushing until there are no more immediate callbacks
      firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority);
    } finally {
      isExecutingCallback = false;
      if (firstCallbackNode !== null) {
        // There's still work remaining. Request another callback.
        ensureHostCallbackIsScheduled();
      } else {
        isHostCallbackScheduled = false;
      }
    }
  }
}

function flushWork(didTimeout) {
  // Exit right away if we're currently paused

  if (enableSchedulerDebugging && isSchedulerPaused) {
    return;
  }

  isExecutingCallback = true;
  var previousDidTimeout = currentDidTimeout;
  currentDidTimeout = didTimeout;
  try {
    if (didTimeout) {
      // Flush all the expired callbacks without yielding.
      while (firstCallbackNode !== null && !(enableSchedulerDebugging && isSchedulerPaused)) {
        // TODO Wrap i nfeature flag
        // Read the current time. Flush all the callbacks that expire at or
        // earlier than that time. Then read the current time again and repeat.
        // This optimizes for as few performance.now calls as possible.
        var currentTime = exports.unstable_now();
        if (firstCallbackNode.expirationTime <= currentTime) {
          do {
            flushFirstCallback();
          } while (firstCallbackNode !== null && firstCallbackNode.expirationTime <= currentTime && !(enableSchedulerDebugging && isSchedulerPaused));
          continue;
        }
        break;
      }
    } else {
      // Keep flushing callbacks until we run out of time in the frame.
      if (firstCallbackNode !== null) {
        do {
          if (enableSchedulerDebugging && isSchedulerPaused) {
            break;
          }
          flushFirstCallback();
        } while (firstCallbackNode !== null && !shouldYieldToHost());
      }
    }
  } finally {
    isExecutingCallback = false;
    currentDidTimeout = previousDidTimeout;
    if (firstCallbackNode !== null) {
      // There's still work remaining. Request another callback.
      ensureHostCallbackIsScheduled();
    } else {
      isHostCallbackScheduled = false;
    }
    // Before exiting, flush all the immediate work that was scheduled.
    flushImmediateWork();
  }
}

function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;
    default:
      priorityLevel = NormalPriority;
  }

  var previousPriorityLevel = currentPriorityLevel;
  var previousEventStartTime = currentEventStartTime;
  currentPriorityLevel = priorityLevel;
  currentEventStartTime = exports.unstable_now();

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
    currentEventStartTime = previousEventStartTime;

    // Before exiting, flush all the immediate work that was scheduled.
    flushImmediateWork();
  }
}

function unstable_wrapCallback(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function () {
    // This is a fork of runWithPriority, inlined for performance.
    var previousPriorityLevel = currentPriorityLevel;
    var previousEventStartTime = currentEventStartTime;
    currentPriorityLevel = parentPriorityLevel;
    currentEventStartTime = exports.unstable_now();

    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
      currentEventStartTime = previousEventStartTime;
      flushImmediateWork();
    }
  };
}

function unstable_scheduleCallback(callback, deprecated_options) {
  var startTime = currentEventStartTime !== -1 ? currentEventStartTime : exports.unstable_now();

  var expirationTime;
  if (typeof deprecated_options === 'object' && deprecated_options !== null && typeof deprecated_options.timeout === 'number') {
    // FIXME: Remove this branch once we lift expiration times out of React.
    expirationTime = startTime + deprecated_options.timeout;
  } else {
    switch (currentPriorityLevel) {
      case ImmediatePriority:
        expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
        break;
      case UserBlockingPriority:
        expirationTime = startTime + USER_BLOCKING_PRIORITY;
        break;
      case IdlePriority:
        expirationTime = startTime + IDLE_PRIORITY;
        break;
      case LowPriority:
        expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
        break;
      case NormalPriority:
      default:
        expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
    }
  }

  var newNode = {
    callback: callback,
    priorityLevel: currentPriorityLevel,
    expirationTime: expirationTime,
    next: null,
    previous: null
  };

  // Insert the new callback into the list, ordered first by expiration, then
  // by insertion. So the new callback is inserted any other callback with
  // equal expiration.
  if (firstCallbackNode === null) {
    // This is the first callback in the list.
    firstCallbackNode = newNode.next = newNode.previous = newNode;
    ensureHostCallbackIsScheduled();
  } else {
    var next = null;
    var node = firstCallbackNode;
    do {
      if (node.expirationTime > expirationTime) {
        // The new callback expires before this one.
        next = node;
        break;
      }
      node = node.next;
    } while (node !== firstCallbackNode);

    if (next === null) {
      // No callback with a later expiration was found, which means the new
      // callback has the latest expiration in the list.
      next = firstCallbackNode;
    } else if (next === firstCallbackNode) {
      // The new callback has the earliest expiration in the entire list.
      firstCallbackNode = newNode;
      ensureHostCallbackIsScheduled();
    }

    var previous = next.previous;
    previous.next = next.previous = newNode;
    newNode.next = next;
    newNode.previous = previous;
  }

  return newNode;
}

function unstable_pauseExecution() {
  isSchedulerPaused = true;
}

function unstable_continueExecution() {
  isSchedulerPaused = false;
  if (firstCallbackNode !== null) {
    ensureHostCallbackIsScheduled();
  }
}

function unstable_getFirstCallbackNode() {
  return firstCallbackNode;
}

function unstable_cancelCallback(callbackNode) {
  var next = callbackNode.next;
  if (next === null) {
    // Already cancelled.
    return;
  }

  if (next === callbackNode) {
    // This is the only scheduled callback. Clear the list.
    firstCallbackNode = null;
  } else {
    // Remove the callback from its position in the list.
    if (callbackNode === firstCallbackNode) {
      firstCallbackNode = next;
    }
    var previous = callbackNode.previous;
    previous.next = next;
    next.previous = previous;
  }

  callbackNode.next = callbackNode.previous = null;
}

function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel;
}

function unstable_shouldYield() {
  return !currentDidTimeout && (firstCallbackNode !== null && firstCallbackNode.expirationTime < currentExpirationTime || shouldYieldToHost());
}

// The remaining code is essentially a polyfill for requestIdleCallback. It
// works by scheduling a requestAnimationFrame, storing the time for the start
// of the frame, then scheduling a postMessage which gets scheduled after paint.
// Within the postMessage handler do as much work as possible until time + frame
// rate. By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.

// We capture a local reference to any global, in case it gets polyfilled after
// this module is initially evaluated. We want to be using a
// consistent implementation.
var localDate = Date;

// This initialization code may run even on server environments if a component
// just imports ReactDOM (e.g. for findDOMNode). Some environments might not
// have setTimeout or clearTimeout. However, we always expect them to be defined
// on the client. https://github.com/facebook/react/pull/13088
var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : undefined;
var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : undefined;

// We don't expect either of these to necessarily be defined, but we will error
// later if they are missing on the client.
var localRequestAnimationFrame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined;
var localCancelAnimationFrame = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : undefined;

// requestAnimationFrame does not run when the tab is in the background. If
// we're backgrounded we prefer for that work to happen so that the page
// continues to load in the background. So we also schedule a 'setTimeout' as
// a fallback.
// TODO: Need a better heuristic for backgrounded work.
var ANIMATION_FRAME_TIMEOUT = 100;
var rAFID;
var rAFTimeoutID;
var requestAnimationFrameWithTimeout = function (callback) {
  // schedule rAF and also a setTimeout
  rAFID = localRequestAnimationFrame(function (timestamp) {
    // cancel the setTimeout
    localClearTimeout(rAFTimeoutID);
    callback(timestamp);
  });
  rAFTimeoutID = localSetTimeout(function () {
    // cancel the requestAnimationFrame
    localCancelAnimationFrame(rAFID);
    callback(exports.unstable_now());
  }, ANIMATION_FRAME_TIMEOUT);
};

if (hasNativePerformanceNow) {
  var Performance = performance;
  exports.unstable_now = function () {
    return Performance.now();
  };
} else {
  exports.unstable_now = function () {
    return localDate.now();
  };
}

var requestHostCallback;
var cancelHostCallback;
var shouldYieldToHost;

var globalValue = null;
if (typeof window !== 'undefined') {
  globalValue = window;
} else if (typeof global !== 'undefined') {
  globalValue = global;
}

if (globalValue && globalValue._schedMock) {
  // Dynamic injection, only for testing purposes.
  var globalImpl = globalValue._schedMock;
  requestHostCallback = globalImpl[0];
  cancelHostCallback = globalImpl[1];
  shouldYieldToHost = globalImpl[2];
  exports.unstable_now = globalImpl[3];
} else if (
// If Scheduler runs in a non-DOM environment, it falls back to a naive
// implementation using setTimeout.
typeof window === 'undefined' ||
// Check if MessageChannel is supported, too.
typeof MessageChannel !== 'function') {
  // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
  // fallback to a naive implementation.
  var _callback = null;
  var _flushCallback = function (didTimeout) {
    if (_callback !== null) {
      try {
        _callback(didTimeout);
      } finally {
        _callback = null;
      }
    }
  };
  requestHostCallback = function (cb, ms) {
    if (_callback !== null) {
      // Protect against re-entrancy.
      setTimeout(requestHostCallback, 0, cb);
    } else {
      _callback = cb;
      setTimeout(_flushCallback, 0, false);
    }
  };
  cancelHostCallback = function () {
    _callback = null;
  };
  shouldYieldToHost = function () {
    return false;
  };
} else {
  if (typeof console !== 'undefined') {
    // TODO: Remove fb.me link
    if (typeof localRequestAnimationFrame !== 'function') {
      console.error("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }
    if (typeof localCancelAnimationFrame !== 'function') {
      console.error("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }
  }

  var scheduledHostCallback = null;
  var isMessageEventScheduled = false;
  var timeoutTime = -1;

  var isAnimationFrameScheduled = false;

  var isFlushingHostCallback = false;

  var frameDeadline = 0;
  // We start out assuming that we run at 30fps but then the heuristic tracking
  // will adjust this value to a faster fps if we get more frequent animation
  // frames.
  var previousFrameTime = 33;
  var activeFrameTime = 33;

  shouldYieldToHost = function () {
    return frameDeadline <= exports.unstable_now();
  };

  // We use the postMessage trick to defer idle work until after the repaint.
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = function (event) {
    isMessageEventScheduled = false;

    var prevScheduledCallback = scheduledHostCallback;
    var prevTimeoutTime = timeoutTime;
    scheduledHostCallback = null;
    timeoutTime = -1;

    var currentTime = exports.unstable_now();

    var didTimeout = false;
    if (frameDeadline - currentTime <= 0) {
      // There's no time left in this idle period. Check if the callback has
      // a timeout and whether it's been exceeded.
      if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
        // Exceeded the timeout. Invoke the callback even though there's no
        // time left.
        didTimeout = true;
      } else {
        // No timeout.
        if (!isAnimationFrameScheduled) {
          // Schedule another animation callback so we retry later.
          isAnimationFrameScheduled = true;
          requestAnimationFrameWithTimeout(animationTick);
        }
        // Exit without invoking the callback.
        scheduledHostCallback = prevScheduledCallback;
        timeoutTime = prevTimeoutTime;
        return;
      }
    }

    if (prevScheduledCallback !== null) {
      isFlushingHostCallback = true;
      try {
        prevScheduledCallback(didTimeout);
      } finally {
        isFlushingHostCallback = false;
      }
    }
  };

  var animationTick = function (rafTime) {
    if (scheduledHostCallback !== null) {
      // Eagerly schedule the next animation callback at the beginning of the
      // frame. If the scheduler queue is not empty at the end of the frame, it
      // will continue flushing inside that callback. If the queue *is* empty,
      // then it will exit immediately. Posting the callback at the start of the
      // frame ensures it's fired within the earliest possible frame. If we
      // waited until the end of the frame to post the callback, we risk the
      // browser skipping a frame and not firing the callback until the frame
      // after that.
      requestAnimationFrameWithTimeout(animationTick);
    } else {
      // No pending work. Exit.
      isAnimationFrameScheduled = false;
      return;
    }

    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
      if (nextFrameTime < 8) {
        // Defensive coding. We don't support higher frame rates than 120hz.
        // If the calculated frame time gets lower than 8, it is probably a bug.
        nextFrameTime = 8;
      }
      // If one frame goes long, then the next one can be short to catch up.
      // If two frames are short in a row, then that's an indication that we
      // actually have a higher frame rate than what we're currently optimizing.
      // We adjust our heuristic dynamically accordingly. For example, if we're
      // running on 120hz display or 90hz VR display.
      // Take the max of the two in case one of them was an anomaly due to
      // missed frame deadlines.
      activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
      previousFrameTime = nextFrameTime;
    }
    frameDeadline = rafTime + activeFrameTime;
    if (!isMessageEventScheduled) {
      isMessageEventScheduled = true;
      port.postMessage(undefined);
    }
  };

  requestHostCallback = function (callback, absoluteTimeout) {
    scheduledHostCallback = callback;
    timeoutTime = absoluteTimeout;
    if (isFlushingHostCallback || absoluteTimeout < 0) {
      // Don't wait for the next frame. Continue working ASAP, in a new event.
      port.postMessage(undefined);
    } else if (!isAnimationFrameScheduled) {
      // If rAF didn't already schedule one, we need to schedule a frame.
      // TODO: If this rAF doesn't materialize because the browser throttles, we
      // might want to still have setTimeout trigger rIC as a backup to ensure
      // that we keep performing work.
      isAnimationFrameScheduled = true;
      requestAnimationFrameWithTimeout(animationTick);
    }
  };

  cancelHostCallback = function () {
    scheduledHostCallback = null;
    isMessageEventScheduled = false;
    timeoutTime = -1;
  };
}

exports.unstable_ImmediatePriority = ImmediatePriority;
exports.unstable_UserBlockingPriority = UserBlockingPriority;
exports.unstable_NormalPriority = NormalPriority;
exports.unstable_IdlePriority = IdlePriority;
exports.unstable_LowPriority = LowPriority;
exports.unstable_runWithPriority = unstable_runWithPriority;
exports.unstable_scheduleCallback = unstable_scheduleCallback;
exports.unstable_cancelCallback = unstable_cancelCallback;
exports.unstable_wrapCallback = unstable_wrapCallback;
exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
exports.unstable_shouldYield = unstable_shouldYield;
exports.unstable_continueExecution = unstable_continueExecution;
exports.unstable_pauseExecution = unstable_pauseExecution;
exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
  })();
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/scheduler/index.js":
/*!*****************************************!*\
  !*** ./node_modules/scheduler/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/scheduler.development.js */ "./node_modules/scheduler/cjs/scheduler.development.js");
}


/***/ }),

/***/ "./node_modules/scheduler/tracing.js":
/*!*******************************************!*\
  !*** ./node_modules/scheduler/tracing.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/scheduler-tracing.development.js */ "./node_modules/scheduler/cjs/scheduler-tracing.development.js");
}


/***/ }),

/***/ "./node_modules/value-equal/index.js":
/*!*******************************************!*\
  !*** ./node_modules/value-equal/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);

/***/ }),

/***/ "./node_modules/warning/warning.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/warning.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/orbitsim/Classes.jsx":
/*!*************************************!*\
  !*** ./src/js/orbitsim/Classes.jsx ***!
  \*************************************/
/*! exports provided: Earth, Ribbon, Climber, Payload, Orbit, ImpactPosition, FrameTimer, UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/Earth.jsx */ "./src/js/orbitsim/Classes/Earth.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Earth", function() { return _Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes/Ribbon.jsx */ "./src/js/orbitsim/Classes/Ribbon.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ribbon", function() { return _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Classes_Climber_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Classes/Climber.jsx */ "./src/js/orbitsim/Classes/Climber.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Climber", function() { return _Classes_Climber_jsx__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Classes_Payload_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Classes/Payload.jsx */ "./src/js/orbitsim/Classes/Payload.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Payload", function() { return _Classes_Payload_jsx__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Classes_Orbit_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Classes/Orbit.jsx */ "./src/js/orbitsim/Classes/Orbit.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Orbit", function() { return _Classes_Orbit_jsx__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Classes_ImpactPosition_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Classes/ImpactPosition.jsx */ "./src/js/orbitsim/Classes/ImpactPosition.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImpactPosition", function() { return _Classes_ImpactPosition_jsx__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Classes_FrameTimer_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Classes/FrameTimer.jsx */ "./src/js/orbitsim/Classes/FrameTimer.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FrameTimer", function() { return _Classes_FrameTimer_jsx__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Classes_UI_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Classes/UI.jsx */ "./src/js/orbitsim/Classes/UI.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return _Classes_UI_jsx__WEBPACK_IMPORTED_MODULE_7__["default"]; });









/* Drawing methods implemented here so that the "business logic" is separate from "view logic" */

_Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].draw = function (p5) {
  p5.push();
  p5.scale(1, -1, 1); // Need to reinvert for the texture to be in correct direction

  p5.rotateZ(-_Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].rotation); // Rotate to orient the texture in correct direction

  p5.rotateZ(-p5.PI);
  p5.rotateX(-p5.PI / 2);
  p5.fill('lightgreen');
  p5.texture(_Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].IMAGE);
  p5.sphere(_Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS); //    p5.fill('red');
  //    p5.box(Earth.RADIUS*2, Earth.RADIUS*0.5, Earth.RADIUS*0.5);

  p5.pop();
};

_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].draw = function (p5, should_shorten) {
  p5.push();
  p5.rotateZ(_Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].rotation);
  p5.rotateZ(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LONGITUDE);
  p5.rotateX(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LATITUDE);
  var w = should_shorten ? _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].WIDTH / 10 : _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].WIDTH;
  p5.draw_wrapper(p5.createVector(0, _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LENGTH / 2 + _Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS, 0), // Center of ribbon box
  _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].COLOR, function () {
    return p5.box(w, _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LENGTH, w);
  });
  p5.draw_wrapper(p5.createVector(0, _Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].GEO_RADIUS, 0), // Center of GEO station sphere
  _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].GEO_COLOR, function () {
    return p5.sphere(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].GEO_WIDTH);
  });
  p5.draw_wrapper(p5.createVector(0, _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LENGTH + _Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS, 0), // Center of counterweight
  _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].COUNTER_COLOR, function () {
    return p5.sphere(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].COUNTER_WIDTH);
  });
  p5.pop();
};

_Classes_Climber_jsx__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.draw = function (p5) {
  p5.push();
  p5.rotateZ(_Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].rotation);
  p5.rotateZ(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LONGITUDE);
  p5.rotateX(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LATITUDE);
  p5.draw_wrapper(this.position, this.color, function () {
    return p5.box(_Classes_Climber_jsx__WEBPACK_IMPORTED_MODULE_2__["default"].SIZE);
  });
  p5.pop();
};

_Classes_Payload_jsx__WEBPACK_IMPORTED_MODULE_3__["default"].prototype.draw = function (p5) {
  var _this = this;

  p5.push();

  if (this.impacted) {
    p5.rotateZ(_Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].rotation);
  } else if (this.contained) {
    // While in climber, same as Climber.draw
    p5.rotateZ(_Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].rotation);
    p5.rotateZ(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LONGITUDE);
    p5.rotateX(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LATITUDE);
  } else {
    // Instead,use euler angles
    p5.rotateZ(this.container.eulers.longitude);
    p5.rotateX(this.container.eulers.inclination);
    p5.rotateZ(this.container.eulers.argument);
  }

  p5.draw_wrapper(this.position, this.color, function () {
    return p5.sphere(_this.impacted ? _Classes_Payload_jsx__WEBPACK_IMPORTED_MODULE_3__["default"].SIZE / 10 : _Classes_Payload_jsx__WEBPACK_IMPORTED_MODULE_3__["default"].SIZE);
  }); // Path on earth

  /*
      let closer = this.position.setMag(Earth.RADIUS);
  
      p5.draw_wrapper(closer, this.color, () => p5.sphere(Payload.SIZE));
  */

  p5.pop();
  /*
      // Momentum
      if(!this.contained) {
          let m = this.container.momentum.copy().setMag(Earth.RADIUS);
          p5.draw_wrapper(
              m, this.color, () => p5.sphere(Payload.SIZE)
          );
      }
  */
};



/***/ }),

/***/ "./src/js/orbitsim/Classes/AstronauticaProfile.jsx":
/*!*********************************************************!*\
  !*** ./src/js/orbitsim/Classes/AstronauticaProfile.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AstronauticaProfile; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Ascending profile for a climber as suggested by Stephen's doi:10.1016/j.actaastro.2008.10.003 paper.
// Also serves as "interface" for any other profiles
var AstronauticaProfile =
/*#__PURE__*/
function () {
  function AstronauticaProfile(launchTime, timeAmount, startHeight, endHeight, timeRatio) {
    _classCallCheck(this, AstronauticaProfile);

    // Default arguments : climbing time/constant velocity time ratio of 1
    if (timeRatio === undefined) timeRatio = 1; // Import the values into the object

    this.launchTime = launchTime;
    this.totalTime = timeAmount;
    this.startHeight = startHeight;
    this.endHeight = endHeight; // Calculate the maximum velocity attained via some algebraic manipulation of the given formulas
    // Note : introducing units in altitudes and times automatically gives us correct units in velocity.

    var climbToTotal = 2 + 1 / timeRatio;
    this.climbTime = timeAmount / climbToTotal;
    this.constantTime = this.climbTime * timeRatio;
    this.maxVelocity = (endHeight - startHeight) / (timeAmount * (climbToTotal - 1) / climbToTotal); // time in seconds, height in meters = speed in m/s
    //		console.log(this);
  } // Returns the time at which the profile will complete; can help with precise measurements of orbit


  _createClass(AstronauticaProfile, [{
    key: "isMoving",
    // Checks if the profile is complete
    value: function isMoving(currentTime) {
      return currentTime < this.arrivalTime;
    } // Returns the current altitude

  }, {
    key: "altitude",
    value: function altitude(currentTime) {
      // If we are done, we are done
      if (!this.isMoving(currentTime)) return this.endHeight; // Otherwise, figure out current stage (asc/const/desc)
      // Using if-return system to avoid else stacks

      currentTime -= this.launchTime; // Ascending stage

      if (currentTime < this.climbTime) {
        var _sine = Math.sin(Math.PI * currentTime / this.climbTime);

        var _delta = this.maxVelocity * 0.5 * (currentTime - this.climbTime / Math.PI * _sine);

        return this.startHeight + _delta;
      } // Constant stage


      if (currentTime < this.constantTime + this.climbTime) {
        var _delta2 = this.maxVelocity * (currentTime - this.climbTime / 2);

        return this.startHeight + _delta2;
      } // Descending stage


      var sine = Math.sin(Math.PI * (currentTime - this.constantTime) / this.climbTime);
      var delta = this.maxVelocity * 0.5 * (currentTime + this.constantTime - this.climbTime / Math.PI * sine);
      return this.startHeight + delta;
    }
  }, {
    key: "arrivalTime",
    get: function get() {
      return this.launchTime + this.totalTime;
    }
  }]);

  return AstronauticaProfile;
}();



/***/ }),

/***/ "./src/js/orbitsim/Classes/Climber.jsx":
/*!*********************************************!*\
  !*** ./src/js/orbitsim/Classes/Climber.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Climber; });
/* harmony import */ var _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Earth.jsx */ "./src/js/orbitsim/Classes/Earth.jsx");
/* harmony import */ var _Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ribbon.jsx */ "./src/js/orbitsim/Classes/Ribbon.jsx");
/* harmony import */ var _Payload_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Payload.jsx */ "./src/js/orbitsim/Classes/Payload.jsx");
/* harmony import */ var _Orbit_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Orbit.jsx */ "./src/js/orbitsim/Classes/Orbit.jsx");
/* harmony import */ var _AstronauticaProfile_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AstronauticaProfile.jsx */ "./src/js/orbitsim/Classes/AstronauticaProfile.jsx");
/* harmony import */ var _helpers_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers.jsx */ "./src/js/orbitsim/helpers.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var Climber =
/*#__PURE__*/
function () {
  _createClass(Climber, null, [{
    key: "ACTIVE_COLOR",
    // Constants
    get: function get() {
      return [255, 0, 0, 200];
    } // Color of the selected climber

  }, {
    key: "INACTIVE_COLOR",
    get: function get() {
      return [128, 128, 128, 100];
    } // Color of any unselected climbers

  }, {
    key: "SIZE",
    get: function get() {
      return 2000000;
    } // Size of the visible box of the climbers, units : m, not real value
    // Constructor

  }]);

  function Climber(height) {
    _classCallCheck(this, Climber);

    this.height = height || 0; // The height at which this climber is, units : m

    this.active = true; // Whether this climber is selected

    this.payload = new _Payload_jsx__WEBPACK_IMPORTED_MODULE_2__["default"](this); // The carried payload, starting off inside the climber

    this.profile = null; // The climbing profile
  } // Return a 3D vector relative to the ribbon's frame of reference


  _createClass(Climber, [{
    key: "launch",
    // Launch the climber towards a destination
    value: function launch(launchTime, timeAmount, startHeight, endHeight) {
      this.profile = new _AstronauticaProfile_jsx__WEBPACK_IMPORTED_MODULE_4__["default"](launchTime, timeAmount, startHeight, endHeight);
    }
  }, {
    key: "update",
    value: function update(timer) {
      // If we have a setting of where to go
      if (this.profile != null) {
        // And we haven't reached, go there
        if (this.profile.isMoving(timer.total)) {
          this.height = this.profile.altitude(timer.total);
        } // If we reached, one-time release
        else if (this.payload.contained) {
            console.log("Payload released!");
            this.release(this.profile.arrivalTime);
            this.profile = null;
          }
      }
    } // Release the contained payload

  }, {
    key: "release",
    value: function release(releaseTime) {
      // Velocity : tangential to future orbit, in direction of rotation
      var vel = _helpers_jsx__WEBPACK_IMPORTED_MODULE_5__["p5"].Vector.cross(_helpers_jsx__WEBPACK_IMPORTED_MODULE_5__["p5"].prototype.createVector(0, 0, 1), this.true_position).setMag(_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].OMEGA * this.position.y); // Same as true_position.mag()

      this.payload.container = new _Orbit_jsx__WEBPACK_IMPORTED_MODULE_3__["default"](this.true_position, vel, releaseTime);
      this.payload.contained = false;
    }
  }, {
    key: "position",
    get: function get() {
      return _helpers_jsx__WEBPACK_IMPORTED_MODULE_5__["p5"].prototype.createVector(0, this.height + _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS, 0);
    } // Return the vector relative to standard coordinates, i.e. with rotations TODO

  }, {
    key: "true_position",
    get: function get() {
      return this.position.copy().rotateX(_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LATITUDE).rotateZ(_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].rotation).rotateZ(_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LONGITUDE);
    } // The current color of the climber, depending on selected status

  }, {
    key: "color",
    get: function get() {
      return this.active ? Climber.ACTIVE_COLOR : Climber.INACTIVE_COLOR;
    } // Checks if the climber still contains the payload or has it been released.

  }, {
    key: "has_payload",
    get: function get() {
      return this.payload.contained;
    }
  }]);

  return Climber;
}();



/***/ }),

/***/ "./src/js/orbitsim/Classes/Earth.jsx":
/*!*******************************************!*\
  !*** ./src/js/orbitsim/Classes/Earth.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Earth; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TAU = Math.PI * 2;

var Earth =
/*#__PURE__*/
function () {
  function Earth() {
    _classCallCheck(this, Earth);
  }

  _createClass(Earth, null, [{
    key: "update",
    value: function update(timer) {
      Earth.rotation = Earth.OMEGA * timer.total % TAU;
    }
  }, {
    key: "G",
    // Constants
    get: function get() {
      return 6.67384e-11;
    } // Gravitational constant, units : m^3 / kg / s^2

  }, {
    key: "MASS",
    get: function get() {
      return 5.97219e24;
    } // Mass of the Earth, units : kg

  }, {
    key: "PERIOD",
    get: function get() {
      return 86164.1;
    } // Rotational period of the Earth, units : s

  }, {
    key: "MU",
    get: function get() {
      return Earth.G * Earth.MASS;
    } // Gravitational parameter of the Earth, units : m^3 / s^2

  }, {
    key: "OMEGA",
    get: function get() {
      return 2 * Math.PI / Earth.PERIOD;
    } // Angular velocity of Earth's rotation, units : rad / s

  }, {
    key: "GEO_RADIUS",
    get: function get() {
      return 42164000;
    } // Radius of the geostationary orbit, units : m

  }, {
    key: "RADIUS",
    get: function get() {
      return 6378137;
    } // Radius of the Earth, units : m

  }, {
    key: "CRITHEIGHT",
    get: function get() {
      // Starting at this height, the resulting orbit will be hyperbolic, units : m 
      return Math.cbrt(2 * Earth.MU / Math.pow(Earth.OMEGA, 2)) - Earth.RADIUS;
    }
  }, {
    key: "IMAGE",
    get: function get() {
      return Earth._img;
    },
    set: function set(img) {
      Earth._img = img;
    }
  }, {
    key: "SOI",
    get: function get() {
      // Height of the sphere of influence of Earth's gravity, units : m, pulled from Wiki
      return 0.924e9;
    }
  }]);

  return Earth;
}();


Earth.rotation = 0;

/***/ }),

/***/ "./src/js/orbitsim/Classes/FrameTimer.jsx":
/*!************************************************!*\
  !*** ./src/js/orbitsim/Classes/FrameTimer.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FrameTimer; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// A helper class : keeps track of frame timings, since default time methods only give you current time
var FrameTimer =
/*#__PURE__*/
function () {
  function FrameTimer() {
    _classCallCheck(this, FrameTimer);

    this.totalTime = 0;
    this.previousTime = 0;
    this.lastFrame = undefined;
    this.running = false;
    this.scale = 1;
  }

  _createClass(FrameTimer, [{
    key: "update",
    value: function update(current) {
      this.lastFrame = current - this.previousTime;

      if (this.running) {
        this.totalTime += this.scaledFrame;
      }

      this.previousTime = current;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.running = !this.running;
    }
  }, {
    key: "total",
    get: function get() {
      return this.totalTime;
    }
  }, {
    key: "frame",
    get: function get() {
      return this.lastFrame;
    }
  }, {
    key: "scaledFrame",
    get: function get() {
      return this.scale * this.lastFrame;
    }
  }]);

  return FrameTimer;
}();



/***/ }),

/***/ "./src/js/orbitsim/Classes/ImpactPosition.jsx":
/*!****************************************************!*\
  !*** ./src/js/orbitsim/Classes/ImpactPosition.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImpactPosition; });
/* harmony import */ var _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Earth.jsx */ "./src/js/orbitsim/Classes/Earth.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ImpactPosition =
/*#__PURE__*/
function () {
  function ImpactPosition(orbit) {
    _classCallCheck(this, ImpactPosition);

    // Could potentially add binary search on orbit true anomaly for precision first
    // Put in terms of Earth
    var pos = orbit.true_position.rotateZ(-_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].rotation).setMag(_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS);
    this.position = pos;
  }

  _createClass(ImpactPosition, [{
    key: "true_position",
    get: function get() {
      return this.position.copy().rotateZ(_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].rotation);
    }
  }]);

  return ImpactPosition;
}();



/***/ }),

/***/ "./src/js/orbitsim/Classes/Orbit.jsx":
/*!*******************************************!*\
  !*** ./src/js/orbitsim/Classes/Orbit.jsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Orbit; });
/* harmony import */ var _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Earth.jsx */ "./src/js/orbitsim/Classes/Earth.jsx");
/* harmony import */ var _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers.jsx */ "./src/js/orbitsim/helpers.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Orbit =
/*#__PURE__*/
function () {
  _createClass(Orbit, null, [{
    key: "EPSILON",
    // Constants
    get: function get() {
      return 0.0001;
    } // Constructor

  }]);

  function Orbit(pos, vel, time) {
    _classCallCheck(this, Orbit);

    this.epoch = {
      pos: pos,
      vel: vel,
      time: time // System at time zero/epoch : position and velocity at launch and time of launch

    };
    this._position = pos.copy();
    this.setup();
  }

  _createClass(Orbit, [{
    key: "setup",
    value: function setup() {
      // Eccentricity and SemiMajor define shape of ellipse
      this.momentum = _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].Vector.cross(this.epoch.pos, this.epoch.vel); // CCW axis

      this.eccentricity = _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].Vector.cross(this.epoch.vel, this.momentum).div(_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].MU).sub(this.epoch.pos.copy().normalize()); // parallel to pos

      this.semi_latus = this.momentum.magSq() / _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].MU;
      this.semi_major = this.semi_latus / (1 - Math.pow(this.e, 2));
      this.period = _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].prototype.TAU * Math.sqrt(Object(_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["sgn"])(this.semi_major) * Math.pow(this.semi_major, 3) / _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].MU); // Period does not exactly make sense for hyperbolic but result still needed in calculations
      // The euler angles determine the position of the orbit.

      var asc_node = _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].Vector.units.z.cross(this.momentum).normalize(); // unit sphere vector pointing to asc node

      var longitude = asc_node.heading(); // Angle in x-y plane of the ascending node vector, i.e. longitude!

      var inclination = _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].Vector.units.z.angleBetween(this.momentum);
      var argument = undefined;
      if (asc_node.equals(_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].prototype.createVector())) // i.e. if momentum is parallel to z axis
        argument = Object(_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["sgn"])(this.momentum.z) * this.eccentricity.heading();else argument = Object(_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["sgn"])(this.eccentricity.z) * asc_node.angleBetween(this.eccentricity);
      this.eulers = {
        longitude: longitude,
        inclination: inclination,
        argument: argument
      }; // Let's also create a p5.matrix for multiplications

      var matrix = _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].Matrix.identity();
      matrix.rotateZ(-this.eulers.argument);
      matrix.rotateX(-this.eulers.inclination);
      matrix.rotateZ(-this.eulers.longitude);
      this.matrix = matrix.mat4; // Mean anomaly at epoch places the object along the orbit (kinda like a constant of integration)

      if (this.elliptical) {
        var true_at_epoch = Object(_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["sgn"])(this.epoch.pos.dot(this.epoch.vel)) * this.eccentricity.angleBetween(this.epoch.pos); // WRT the periapsis

        var ecc_at_epoch = Math.atan2(Math.sqrt(1 - Math.pow(this.e, 2)) * Math.sin(true_at_epoch), this.e + Math.cos(true_at_epoch));
        this.mean_at_epoch = ecc_at_epoch - this.e * Math.sin(ecc_at_epoch);
      } else {
        this.mean_at_epoch = 0; // We start at periapsis for any hyperbolic orbit
      }

      this.flight_time = 0; // Setup argument; gets recalculated from this position henceforth

      this.last_true_anomaly = Math.PI;
    }
  }, {
    key: "update",
    value: function update(timer) {
      var _this = this;

      // Orbits that left SOI no longer update, even if not hyperbolic (i.e. close to parabolic ellipticals)
      if (this.left_earth || !timer.running) return;
      this.flight_time = timer.total - this.epoch.time; // Mean anomaly - "fraction" of orbit passed

      var mean_anomaly = (this.mean_at_epoch + this.flight_time * _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].prototype.TAU / this.period) % _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].prototype.TAU; // Tau / period is the mean motion
      // Eccentric anomaly - using Newton-Ralphson

      var true_anomaly;

      if (this.elliptical) {
        var fun_of_eccentric = function fun_of_eccentric(E) {
          return E - _this.e * Math.sin(E) - mean_anomaly;
        };

        var derivative = function derivative(E) {
          return 1 - _this.e * Math.cos(E);
        };

        var ecc_anomaly = Object(_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["newton"])(fun_of_eccentric, derivative, this.last_true_anomaly, Orbit.EPSILON); // True anomaly - angle between periapsis and current position as polar in f.o.r. of orbit

        true_anomaly = 2 * Math.atan2(Math.sqrt(1 + this.e) * Math.sin(ecc_anomaly / 2), Math.sqrt(1 - this.e) * Math.cos(ecc_anomaly / 2));
      } else {
        // Similar to above, but with hyperbolic trig
        var _fun_of_eccentric = function _fun_of_eccentric(E) {
          return _this.e * Math.sinh(E) - E - mean_anomaly;
        };

        var _derivative = function _derivative(E) {
          return _this.e * Math.cosh(E) - 1;
        };

        var _ecc_anomaly = Object(_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["newton"])(_fun_of_eccentric, _derivative, this.last_true_anomaly, Orbit.EPSILON); // True anomaly - angle between periapsis and current position as polar in f.o.r. of orbit


        true_anomaly = 2 * Math.atan2(Math.sqrt(this.e + 1) * Math.sinh(_ecc_anomaly / 2), Math.sqrt(this.e - 1) * Math.cosh(_ecc_anomaly / 2));
      }

      this.last_true_anomaly = true_anomaly; // Get the altitude from SLR and true

      var altitude = this.semi_latus / (1 + this.e * Math.cos(true_anomaly)); // For now, draw in x direction on its own - need to rotate with eulers

      this._position = _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].prototype.createVector(altitude, 0, 0).rotateZ(true_anomaly);
    }
  }, {
    key: "e",
    get: function get() {
      return this.eccentricity.mag();
    }
  }, {
    key: "elliptical",
    get: function get() {
      return this.semi_major > 0;
    }
  }, {
    key: "left_earth",
    get: function get() {
      return this.position.mag() > _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].SOI;
    }
  }, {
    key: "position",
    get: function get() {
      return this._position.copy();
    }
  }, {
    key: "true_position",
    get: function get() {
      var pos = this.position;
      var vector = _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].prototype.createVector(this.matrix[0] * pos.x + this.matrix[1] * pos.y + this.matrix[2] * pos.z, this.matrix[4] * pos.x + this.matrix[5] * pos.y + this.matrix[6] * pos.z, this.matrix[8] * pos.x + this.matrix[9] * pos.y + this.matrix[10] * pos.z);
      return vector;
    }
  }, {
    key: "altitude",
    get: function get() {
      return this.position.mag() - _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS;
    }
  }, {
    key: "dayPeriod",
    get: function get() {
      return this.period / _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].PERIOD;
    }
  }]);

  return Orbit;
}();



/***/ }),

/***/ "./src/js/orbitsim/Classes/Payload.jsx":
/*!*********************************************!*\
  !*** ./src/js/orbitsim/Classes/Payload.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Payload; });
/* harmony import */ var _ImpactPosition_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImpactPosition.jsx */ "./src/js/orbitsim/Classes/ImpactPosition.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Payload =
/*#__PURE__*/
function () {
  _createClass(Payload, null, [{
    key: "ACTIVE_COLOR",
    // Constants
    get: function get() {
      return 'yellow';
    }
  }, {
    key: "INACTIVE_COLOR",
    get: function get() {
      return 'cyan';
    }
  }, {
    key: "IMPACT_COLOR",
    get: function get() {
      return '#ff8d00';
    }
  }, {
    key: "SIZE",
    get: function get() {
      return 700000;
    } // Size of the payload sphere, units : m, not real value
    // Constructor

  }]);

  function Payload(climber) {
    _classCallCheck(this, Payload);

    this.container = climber;
    this.active = true;
    this.contained = true;
    this.impacted = false;
  }

  _createClass(Payload, [{
    key: "update",
    // Update only the orbit, since climbers get updated on their own.
    value: function update(timer) {
      if (!this.contained && !this.impacted) {
        this.container.update(timer);

        if (this.container.altitude < 0) {
          this.impacted = true; // Extract the long/lat and change container to "ImpactPosition"?

          this.container = new _ImpactPosition_jsx__WEBPACK_IMPORTED_MODULE_0__["default"](this.container);
        }
      }
    }
  }, {
    key: "position",
    get: function get() {
      return this.container.position;
    }
  }, {
    key: "true_position",
    get: function get() {
      return this.container.true_position;
    }
  }, {
    key: "color",
    get: function get() {
      return this.impacted ? Payload.IMPACT_COLOR : this.active ? Payload.ACTIVE_COLOR : Payload.INACTIVE_COLOR;
    }
  }]);

  return Payload;
}();



/***/ }),

/***/ "./src/js/orbitsim/Classes/Ribbon.jsx":
/*!********************************************!*\
  !*** ./src/js/orbitsim/Classes/Ribbon.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ribbon; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ribbon =
/*#__PURE__*/
function () {
  function Ribbon() {
    _classCallCheck(this, Ribbon);
  }

  _createClass(Ribbon, null, [{
    key: "LENGTH",
    // Constants
    get: function get() {
      return 100000000;
    } // Length of the space tether, units : m

  }, {
    key: "WIDTH",
    get: function get() {
      return 300000;
    } // Width of the space tether, units : m. Not real value, instead one that is visible

  }, {
    key: "COLOR",
    get: function get() {
      return 'lightgrey';
    }
  }, {
    key: "GEO_WIDTH",
    get: function get() {
      return 500000;
    } // Radius of the sphere indicating the geostationary station, units : m

  }, {
    key: "GEO_COLOR",
    get: function get() {
      return '#6D5086';
    }
  }, {
    key: "COUNTER_WIDTH",
    get: function get() {
      return 1000000;
    } // Radius of the sphere indicating the counterweight, units : m

  }, {
    key: "COUNTER_COLOR",
    get: function get() {
      return '#22339F';
    }
  }, {
    key: "LONGITUDE",
    get: function get() {
      return Math.PI * 90 / 180;
    }
  }, {
    key: "LATITUDE",
    get: function get() {
      return Math.PI * 5 / 180;
    }
  }]);

  return Ribbon;
}();



/***/ }),

/***/ "./src/js/orbitsim/Classes/UI.jsx":
/*!****************************************!*\
  !*** ./src/js/orbitsim/Classes/UI.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UI; });
/* harmony import */ var _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Earth.jsx */ "./src/js/orbitsim/Classes/Earth.jsx");
/* harmony import */ var _Climber_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Climber.jsx */ "./src/js/orbitsim/Classes/Climber.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // A helper class : maintains the GUI.

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, null, [{
    key: "update",
    value: function update(timer) {
      if (!timer.running) return;
      if (UI.timeOutput) UI.timeOutput.html("Current time: " + (timer.total / _Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].PERIOD).toFixed(2) + " days");
    }
  }, {
    key: "setup",
    value: function setup(p5, timer) {
      // Set up the UI
      UI.timeOutput = p5.createSpan();
      UI.timeOutput.position(20, 20);
      UI.timeOutput.style("color", "white");
      var playButton = p5.createButton('Play');
      playButton.position(20, 50);
      playButton.mouseClicked(function () {
        timer.toggle();
        this.elt.textContent = timer.running ? "Pause" : "Play";
      });
      var launchButton = p5.createButton('Launch');
      launchButton.position(80, 50);
      launchButton.mouseClicked(function () {
        return _Climber_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LIST[0].release(timer.total);
      });
      var climberPanel = p5.select("#climber-panel");
      var createClimber = p5.createButton("Add a Climber");
      createClimber.parent(climberPanel);
      createClimber.mouseClicked(function () {
        return _Climber_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].add();
      });
    }
  }]);

  return UI;
}();



/***/ }),

/***/ "./src/js/orbitsim/React/ClimberPanel.jsx":
/*!************************************************!*\
  !*** ./src/js/orbitsim/React/ClimberPanel.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClimberPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }



var ClimberPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(ClimberPanel, _Component);

  function ClimberPanel(props) {
    var _this;

    _classCallCheck(this, ClimberPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClimberPanel).call(this, props)); // Keep controlled input state

    _this.state = {
      height: 35000,
      tta: 10.00
    }; // Testing this method out?

    _this.handleTTAChange = _this.handleTTAChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleHeightChange = _this.handleHeightChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ClimberPanel, [{
    key: "handleHeightChange",
    value: function handleHeightChange(event) {
      this.setState({
        height: event.target.value
      });
    }
  }, {
    key: "handleTTAChange",
    value: function handleTTAChange(event) {
      this.setState({
        tta: event.target.value
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      this.props.onLaunch(this.state.height, this.state.tta);
    }
  }, {
    key: "render",
    value: function render() {
      var isActive = this.props.active !== null;
      var active = isActive ? this.props.climbers[this.props.active] : null;
      var maxWidthStyle = {
        maxWidth: "70%"
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card h-xl-100",
        id: "climber-panel"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-header"
      }, "Climbers"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-3 px-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "prev-climber",
        className: "btn btn-secondary",
        onClick: this.props.onLeft
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-arrow-left"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-3 px-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "add-climber",
        className: "btn btn-success",
        onClick: this.props.onAdd
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-plus"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-3 px-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "delete-climber",
        className: "btn btn-danger",
        onClick: this.props.onDelete
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-minus"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-3 px-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "next-climber",
        className: "btn btn-secondary",
        onClick: this.props.onRight
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-arrow-right"
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4 px-0 text-left"
      }, "Height (km):"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-8 px-0 text-right"
      }, isActive ? Math.round(active.height / 1000) : "N/A")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4 px-0 text-left"
      }, "Target (km):"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-8 px-0 text-right"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "number",
        min: "0",
        max: "100000",
        value: this.state.height,
        style: maxWidthStyle,
        onChange: this.handleHeightChange
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4 px-0 text-left"
      }, "TTA (days):"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-8 px-0 text-right"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "number",
        min: "0",
        step: "0.01",
        value: this.state.tta,
        style: maxWidthStyle,
        onChange: this.handleTTAChange
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "track-climber",
        className: "btn btn-info btn-sm w-100",
        onClick: this.props.onTrack
      }, " Track ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "launch-climber",
        className: "btn btn-warning btn-sm w-100",
        onClick: this.handleSubmit
      }, " Launch ")))));
    }
  }]);

  return ClimberPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/orbitsim/React/OrbitSim.jsx":
/*!********************************************!*\
  !*** ./src/js/orbitsim/React/OrbitSim.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OrbitSim; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ClimberPanel_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClimberPanel.jsx */ "./src/js/orbitsim/React/ClimberPanel.jsx");
/* harmony import */ var _PayloadPanel_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PayloadPanel.jsx */ "./src/js/orbitsim/React/PayloadPanel.jsx");
/* harmony import */ var _SimulationPanel_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SimulationPanel.jsx */ "./src/js/orbitsim/React/SimulationPanel.jsx");
/* harmony import */ var _Classes_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Classes.jsx */ "./src/js/orbitsim/Classes.jsx");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }







var OrbitSim =
/*#__PURE__*/
function (_Component) {
  _inherits(OrbitSim, _Component);

  function OrbitSim(props) {
    var _this;

    _classCallCheck(this, OrbitSim);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrbitSim).call(this, props));

    _this.props.register(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.state = {
      running: false,
      climbers: [],
      payloads: [],
      active_climber: null,
      active_payload: null,
      time_scale: 5.0
    };
    return _this;
  }

  _createClass(OrbitSim, [{
    key: "onPlayPause",
    value: function onPlayPause() {
      this.setState(function (state, props) {
        props.p5.toggleTimer();
        return {
          running: !state.running
        };
      });
    }
  }, {
    key: "onScaleAdjust",
    value: function onScaleAdjust(event) {
      var v = event.target.value;
      this.setState(function (state, props) {
        props.p5.updateTimeScale(v);
        return {
          time_scale: v
        };
      });
    }
  }, {
    key: "onClimberAdd",
    value: function onClimberAdd() {
      this.setState(function (state, props) {
        // Create new climber
        var new_c = new _Classes_jsx__WEBPACK_IMPORTED_MODULE_4__["Climber"](0); // Deactivate all the activeness

        state.climbers.forEach(function (c) {
          return c.active = false;
        });
        state.payloads.forEach(function (p) {
          return p.active = false;
        }); // Recreate "immutable" arrays

        var new_cl = state.climbers.concat(new_c);
        var new_pl = state.payloads.concat(new_c.payload); // Send them over

        props.p5.climbers = new_cl;
        props.p5.payloads = new_pl;
        return {
          climbers: new_cl,
          payloads: new_pl,
          active_climber: new_cl.length - 1,
          active_payload: new_pl.length - 1
        };
      });
    }
  }, {
    key: "onClimberDelete",
    value: function onClimberDelete() {
      this.setState(function (state, props) {
        var result = {};
        if (state.active_climber === null) return result; // Check if we need to delete payload
        // Still in climber, let's delete it

        if (state.climbers[state.active_climber].payload.contained) {
          state.payloads[state.active_payload].active = false; // Find index of the payload contained in the active climber

          var idx = state.payloads.indexOf(state.climbers[state.active_climber].payload);
          state.payloads.splice(idx, 1);
          result.payloads = state.payloads; // Change active payload

          result.active_payload = result.payloads.length == 0 ? null : state.active_payload == result.payloads.length ? 0 : state.active_payload;
          if (result.payloads.length > 0) result.payloads[result.active_payload].active = true; // Update p5

          props.p5.payloads = result.payloads;
        } // Delete active climber itself


        state.climbers.splice(state.active_climber, 1);
        result.climbers = state.climbers;
        result.active_climber = result.climbers.length == 0 ? null : state.active_climber == result.climbers.length ? 0 : state.active_climber;
        if (result.climbers.length > 0) result.climbers[result.active_climber].active = true;
        props.p5.climbers = result.climbers;
        return result;
      });
    }
  }, {
    key: "onClimberLeft",
    value: function onClimberLeft() {
      this.setState(function (state, props) {
        if (state.active_climber === null || state.active_climber === 0) return {};
        state.climbers[state.active_climber].active = false;
        var new_c = state.active_climber - 1;
        state.climbers[new_c].active = true;
        return {
          active_climber: new_c,
          climbers: state.climbers
        };
      });
    }
  }, {
    key: "onClimberRight",
    value: function onClimberRight() {
      this.setState(function (state, props) {
        if (state.active_climber === null || state.active_climber == state.climbers.length - 1) return {};
        state.climbers[state.active_climber].active = false;
        var new_c = state.active_climber + 1;
        state.climbers[new_c].active = true;
        return {
          active_climber: new_c,
          climbers: state.climbers
        };
      });
    }
  }, {
    key: "onClimberLaunch",
    value: function onClimberLaunch(height, tta) {
      if (this.state.active_climber != null) this.props.p5.launch(this.state.active_climber, height, tta);
    }
  }, {
    key: "onClimberTrack",
    value: function onClimberTrack() {
      if (this.state.active_climber != null) this.props.p5.track("c" + this.state.active_climber);
    }
  }, {
    key: "onUntrack",
    value: function onUntrack() {
      this.props.p5.track();
    }
  }, {
    key: "onPayloadTrack",
    value: function onPayloadTrack() {
      if (this.state.active_payload != null) this.props.p5.track("p" + this.state.active_payload);
    }
  }, {
    key: "onPayloadLeft",
    value: function onPayloadLeft() {
      this.setState(function (state, props) {
        if (state.active_payload === null || state.active_payload == 0) return {};
        state.payloads[state.active_payload].active = false;
        var new_c = state.active_payload - 1;
        state.payloads[new_c].active = true;
        return {
          active_payload: new_c,
          payloads: state.payloads
        };
      });
    }
  }, {
    key: "onPayloadRight",
    value: function onPayloadRight() {
      this.setState(function (state, props) {
        if (state.active_payload === null || state.active_payload == state.payloads.length - 1) return {};
        state.payloads[state.active_payload].active = false;
        var new_c = state.active_payload + 1;
        state.payloads[new_c].active = true;
        return {
          active_payload: new_c,
          payloads: state.payloads
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var running = this.state.running;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-fluid text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col text-left"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, " Space Elevator Operator v4 "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, " Created by Ivan Miloslavov and Stephen Cohen "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "desc"
      }, "This program presents the orbits that satellites delivered by a Space Elevator would take when released from various launch altitudes along the tether. To start, press the play button and adjust the rate of time lapse. You can create a new climber in the Climbers panel and send a payload to the launch altitude of your choice in however many days of transit you desire. Send as many climbers as you wish."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "desc"
      }, "If you have questions or ideas for improvment, as well as if you have found bugs, feel free to email Ivan at MiloslavovIvan[at]gmail[dot]com . If you want to know more about the Space Elevator, visit the ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        target: "_blank",
        href: "http://www.isec.org"
      }, "International Space Elevator Consortium"), " website."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-xl-10 vh-xl-100"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "py-2 h-100"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SimulationPanel_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
        running: running,
        onPlayPause: this.onPlayPause.bind(this),
        onScaleAdjust: this.onScaleAdjust.bind(this),
        onUntrack: this.onUntrack.bind(this),
        time: this.props.p5.timeInDays(),
        scale: this.state.time_scale,
        tracking: this.props.p5.getTracked()
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-xl-2 h-xl-100"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "py-2 h-xl-50"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ClimberPanel_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        climbers: this.state.climbers,
        active: this.state.active_climber,
        onAdd: this.onClimberAdd.bind(this),
        onDelete: this.onClimberDelete.bind(this),
        onLeft: this.onClimberLeft.bind(this),
        onRight: this.onClimberRight.bind(this),
        onLaunch: this.onClimberLaunch.bind(this),
        onTrack: this.onClimberTrack.bind(this)
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "py-2 h-xl-50"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PayloadPanel_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        payloads: this.state.payloads,
        active: this.state.active_payload,
        onLeft: this.onPayloadLeft.bind(this),
        onRight: this.onPayloadRight.bind(this),
        onTrack: this.onPayloadTrack.bind(this)
      })))));
    }
  }]);

  return OrbitSim;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/orbitsim/React/PayloadPanel.jsx":
/*!************************************************!*\
  !*** ./src/js/orbitsim/React/PayloadPanel.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PayloadPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var PayloadPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(PayloadPanel, _Component);

  function PayloadPanel() {
    _classCallCheck(this, PayloadPanel);

    return _possibleConstructorReturn(this, _getPrototypeOf(PayloadPanel).apply(this, arguments));
  }

  _createClass(PayloadPanel, [{
    key: "render",
    value: function render() {
      var isActive = this.props.active !== null;
      var active = isActive ? this.props.payloads[this.props.active] : null;
      var contained = isActive && active.contained;
      var impacted = isActive && active.impacted;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card h-xl-100",
        id: "payload-panel"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-header"
      }, "Payloads"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-3 px-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "prev-payload",
        className: "btn btn-secondary",
        onClick: this.props.onLeft
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-arrow-left"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "track-climber",
        className: "btn btn-info w-100",
        onClick: this.props.onTrack
      }, " Track ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-3 px-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "next-payload",
        className: "btn btn-secondary",
        onClick: this.props.onRight
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-arrow-right"
      })))), active ? impacted ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 px-0"
      }, "Payload destroyed")) : contained ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-left small"
      }, "Height (km):"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-right"
      }, Math.round(active.container.height / 1000))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-left small"
      }, "Semi-major (km):"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-right"
      }, Math.round(active.container.semi_major / 1000))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-left small"
      }, "Eccentricity:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-right"
      }, active.container.e.toFixed(4))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-left small"
      }, "Period (days):"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-right"
      }, active.container.dayPeriod.toFixed(2))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-left small"
      }, "Altitude (km):"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6 px-0 text-right"
      }, (active.container.altitude / 1000).toFixed(2)))) : null));
    }
  }]);

  return PayloadPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/orbitsim/React/SimulationPanel.jsx":
/*!***************************************************!*\
  !*** ./src/js/orbitsim/React/SimulationPanel.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimulatorPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var SimulatorPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(SimulatorPanel, _Component);

  function SimulatorPanel() {
    _classCallCheck(this, SimulatorPanel);

    return _possibleConstructorReturn(this, _getPrototypeOf(SimulatorPanel).apply(this, arguments));
  }

  _createClass(SimulatorPanel, [{
    key: "render",
    value: function render() {
      var button_style = {
        position: "absolute",
        left: "50%",
        top: "10px",
        marginLeft: "-20px"
      };
      var time_style = {
        position: "absolute",
        left: "15px",
        top: "15px",
        color: "white",
        textAlign: "left"
      };
      var untrack_style = {
        position: "absolute",
        right: "15px",
        top: "10px"
      };
      var running = this.props.running;
      var tracking = this.props.tracking === null ? "Nothing" : this.props.tracking[0] == 'c' ? "Climber " + this.props.tracking.substr(1) : "Payload " + this.props.tracking.substr(1);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card h-100",
        id: "sim_card"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#sim_card"
      }, "Simulation")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-body",
        id: "sketch-holder",
        style: {
          position: "relative",
          padding: 0,
          height: "calc(100% - 50px)"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: time_style
      }, "Elapsed time: ", this.props.time, " days", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Time scale :", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "number",
        min: "1",
        max: "10",
        step: "0.1",
        value: this.props.scale,
        style: {
          marginLeft: "5px",
          marginRight: "5px"
        },
        onChange: this.props.onScaleAdjust
      }), "hours/s", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Currently tracking ", tracking), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary",
        style: button_style,
        onClick: this.props.onPlayPause
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas " + (running ? "fa-pause" : "fa-play")
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary",
        style: untrack_style,
        onClick: this.props.onUntrack
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-camera"
      }))));
    }
  }]);

  return SimulatorPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/js/orbitsim/helpers.jsx":
/*!*************************************!*\
  !*** ./src/js/orbitsim/helpers.jsx ***!
  \*************************************/
/*! exports provided: p5, sgn, newton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sgn", function() { return sgn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newton", function() { return newton; });
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ "./node_modules/p5/lib/p5.js");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "p5", function() { return p5__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var p5_lib_addons_p5_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! p5/lib/addons/p5.dom */ "./node_modules/p5/lib/addons/p5.dom.js");
/* harmony import */ var p5_lib_addons_p5_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(p5_lib_addons_p5_dom__WEBPACK_IMPORTED_MODULE_1__);



p5__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.translateV = function translateV(v) {
  return this.translate(v.x, v.y, v.z);
};

p5__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.draw_wrapper = function draw_wrapper(pos, clr, fn) {
  this.push();
  this.translateV(pos);
  this.fill(clr);
  fn();
  this.pop();
};

p5__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.cameraV = function cameraV(eye, center, up) {
  this.camera(eye.x, eye.y, eye.z, center.x, center.y, center.z, up.x, up.y, up.z);
};

p5__WEBPACK_IMPORTED_MODULE_0___default.a.Vector.prototype.rotateZ = function (rad) {
  var c = Math.cos(rad);
  var s = Math.sin(rad);
  var x_p = this.x;
  var y_p = this.y;
  this.x = c * x_p - s * y_p;
  this.y = s * x_p + c * y_p;
  return this;
};

p5__WEBPACK_IMPORTED_MODULE_0___default.a.Vector.prototype.rotateX = function (rad) {
  var c = Math.cos(rad);
  var s = Math.sin(rad);
  var y_p = this.y;
  var z_p = this.z;
  this.y = c * y_p - s * z_p;
  this.z = s * y_p + c * z_p;
  return this;
};

p5__WEBPACK_IMPORTED_MODULE_0___default.a.Vector.units = {
  x: new p5__WEBPACK_IMPORTED_MODULE_0___default.a.Vector(1, 0, 0),
  y: new p5__WEBPACK_IMPORTED_MODULE_0___default.a.Vector(0, 1, 0),
  z: new p5__WEBPACK_IMPORTED_MODULE_0___default.a.Vector(0, 0, 1)
};

function sgn(v) {
  return v > 0 ? 1 : -1;
} // Finds a zero of f near x_0 assuming "niceness" of f


function newton(f, der, x_0) {
  var eps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.0001;
  var iterations = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1000;
  var x = x_0;
  var x_prev = x_0 + 2 * eps;
  var idx = 0;

  while (idx < iterations && Math.abs(x_prev - x) > eps) {
    x_prev = x;
    x = x - f(x) / der(x);
    idx++;
  }

  return x;
} // Returns a unit sphere vector corresponding to given longitude and latitude
// Lat : +90 N to -90 S, modifies y
// Lon : +180 E to -180 W, rotates in x-z plane


function lonlat_to_unit(lon, lat) {
  // Lon : angle in x-z plane
  return p5__WEBPACK_IMPORTED_MODULE_0___default.a.Vector.fromAngles(lon, 90 - lat);
}

p5__WEBPACK_IMPORTED_MODULE_0___default.a.Vector.prototype.addMag = function (v) {
  return this.setMag(this.mag() + v);
};



/***/ }),

/***/ "./src/js/orbitsim/index.jsx":
/*!***********************************!*\
  !*** ./src/js/orbitsim/index.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.jsx */ "./src/js/orbitsim/helpers.jsx");
/* harmony import */ var _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes.jsx */ "./src/js/orbitsim/Classes.jsx");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _React_OrbitSim_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./React/OrbitSim.jsx */ "./src/js/orbitsim/React/OrbitSim.jsx");






var reactTop;

function reactRegister(react) {
  reactTop = react;
}

var s = new _helpers_jsx__WEBPACK_IMPORTED_MODULE_0__["p5"](function (p5) {
  var hours_per_second; // Time scale : x simulated hours in a real time second, currently not used

  var sizeScale; // Space scale : made so all can be drawn

  var timer = new _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["FrameTimer"]();
  var tracked = null;
  var ZERO_V = p5.createVector(0, 0, 0);
  p5.climbers = [];
  p5.payloads = [];

  p5.preload = function preload() {
    _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Earth"].IMAGE = p5.loadImage("res/images/Albedo.jpg");
    /* Add public/ for prod */
  };

  p5.setup = function setup() {
    var canvas = this.createCanvas(this.windowWidth, this.windowHeight, this.WEBGL);
    canvas.parent('sketch-holder');
    canvas.id('sim-canvas');
    sizeScale = this.min(this.windowWidth, this.windowHeight) * 0.4 / _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Ribbon"].LENGTH; // General setup

    this.angleMode(this.RADIANS);
    this.noStroke();
    this.noFill(); // Main scale

    this.windowResized();
    this.updateTimeScale(5);
  };

  p5.updateTimeScale = function (hps) {
    timer.scale = 86.4 * hps / 24;
  };

  function update() {
    // Update the master timer
    timer.update(p5.millis()); // Update the positions of objects

    _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Earth"].update(timer);
    p5.climbers.forEach(function (c) {
      return c.update(timer);
    });
    p5.payloads.forEach(function (p) {
      return p.update(timer);
    });
  }

  function handleCamera(idx, climbing_track) {
    if (tracked === null) {
      p5.camera(0, 0, p5.height / 2.0 / p5.tan(p5.PI * 30.0 / 180.0), 0, 0, 0, 0, -1, 0);
      p5.perspective();
    } else {
      if (climbing_track) {
        // Climber or payload in climber
        var pos = (tracked[0] == 'c' ? p5.climbers[idx] : p5.payloads[idx]).true_position.copy();
        pos.addMag(_Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Payload"].SIZE).mult(sizeScale);
        pos.y *= -1;
        var up = p5.createVector(0, 0, -1);
        p5.cameraV(pos, ZERO_V, up);
        p5.perspective(p5.PI / 3, p5.width / p5.height, _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Payload"].SIZE * sizeScale); // Near plane starts at true location
      } else if (p5.payloads[idx].impacted) {
        // On ground
        var _pos = p5.payloads[idx].true_position.copy().addMag(_Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Earth"].RADIUS * 0.5);

        _pos.mult(sizeScale);

        _pos.y *= -1;

        var _up = p5.createVector(0, 0, -1);

        p5.cameraV(_pos, ZERO_V, _up);
        p5.perspective(p5.PI / 3, p5.width / p5.height, 0.01);
      } else {
        // Released payload
        var _pos2 = p5.payloads[idx].true_position.copy();

        _pos2.mult(sizeScale);

        _pos2.y *= -1;

        var _up2 = p5.payloads[idx].container.momentum.copy();

        _up2.x *= -1;
        _up2.z *= -1; //let up = p5.createVector(0, 0, -1);

        p5.cameraV(_pos2, ZERO_V, _up2);
        p5.perspective(p5.PI / 3, p5.width / p5.height, 5.5);
      }
    }
  }

  p5.draw = function draw() {
    // What is being tracked
    var idx = tracked !== null ? parseInt(tracked.substr(1)) : null; // Is the tracked object currently climbing

    var climbing_track = tracked !== null && (tracked[0] == 'c' || tracked[0] == 'p' && p5.payloads[idx].contained); // What is the ID of the payload that is tracked during climbing?

    var climbing_pid = climbing_track ? tracked[0] == 'p' ? idx // We're tracking that payload
    : // Need to find ID of payload that is inside this climber
    p5.payloads.indexOf(p5.climbers[idx].payload) : null; // What is the ID of the climber that is tracked during climbing?

    var climbing_cid = climbing_track ? tracked[0] == 'c' ? idx // We're tracking that climber
    : // Need to find ID of climber that has this payload
    p5.climbers.indexOf(p5.payloads[idx].container) : null;
    update();
    handleCamera(idx, climbing_track); // Draw the UI

    reactTop.forceUpdate(); // Wipe the buffers by drawing a background

    p5.background(10); // Set up the default transformation : rotation due to earth and scale

    p5.scale(sizeScale, -sizeScale, sizeScale); // -y so that +y points up

    _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Earth"].draw(p5);
    _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Ribbon"].draw(p5, tracked !== null);
    p5.climbers.forEach(function (c, index) {
      return index !== climbing_cid && c.draw(p5);
    });
    p5.payloads.forEach(function (p, index) {
      return index !== climbing_pid && p.draw(p5);
    });
  };

  p5.windowResized = function windowResized() {
    var parent = jquery__WEBPACK_IMPORTED_MODULE_2___default()("#sketch-holder"); // -6 : compensation for auto stretching??

    sizeScale = this.min(parent.width(), parent.height() - 6) * 0.4 / _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Ribbon"].LENGTH;
    this.resizeCanvas(parent.width(), parent.height() - 6);
  };

  p5.toggleTimer = function () {
    timer.toggle();
  };

  p5.timeInDays = function () {
    return (timer.total / _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Earth"].PERIOD).toFixed(2);
  };

  p5.launch = function (c_idx, height, tta) {
    // Let's use indices just in case the copy is not deep?
    // We receive height in km (need m) and tta in days (need s)
    var climber = p5.climbers[c_idx];
    climber.launch(timer.total, tta * _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Earth"].PERIOD, climber.height, height * 1000);
  };

  p5.track = function (str) {
    if (str == undefined) tracked = null;else tracked = str;
  };

  p5.getTracked = function () {
    return tracked;
  };
}); // Due to some classes requiring p5 math, need to pass as static down

_Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Climber"].p5 = s;
_Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Orbit"].p5 = s;
_Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Payload"].p5 = s;
var orbitSimReact = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_React_OrbitSim_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
  p5: s,
  register: reactRegister
});
/* harmony default export */ __webpack_exports__["default"] = (orbitSimReact);
/*
if (document.getElementById('root')) {
	ReactDOM.render(orbitSimReact, document.getElementById('root'));
}
*/

/***/ }),

/***/ "./src/js/pages/Home.jsx":
/*!*******************************!*\
  !*** ./src/js/pages/Home.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
function Home() {
  return React.createElement("div", {
    className: "row"
  }, React.createElement("div", {
    className: "col-12"
  }, "Welcome home!"));
}

/***/ }),

/***/ "./src/js/router.jsx":
/*!***************************!*\
  !*** ./src/js/router.jsx ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var _orbitsim_index_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./orbitsim/index.jsx */ "./src/js/orbitsim/index.jsx");
/* harmony import */ var _pages_Home_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/Home.jsx */ "./src/js/pages/Home.jsx");






react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  id: "react-root"
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
  className: "navbar bg-dark navbar-dark fixed-top"
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  className: "navbar-brand",
  href: "#"
}, "Ivan M"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
  className: "navbar-nav"
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
  className: "nav-item"
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  className: "nav-link",
  href: "/"
}, "Home")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
  className: "nav-item"
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
  className: "nav-link",
  href: "/orbitsim"
}, "Space Elevator")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  className: "container-fluid"
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__["Route"], {
  exact: true,
  path: "/",
  component: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_Home_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], null)
}), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__["Route"], {
  exact: true,
  path: "/orbitsim",
  component: _orbitsim_index_jsx__WEBPACK_IMPORTED_MODULE_4__["default"]
})))), document.getElementById('root'));

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi ./src/js/router.jsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Ivan M\Desktop\CODING\github.io\src\js\router.jsx */"./src/js/router.jsx");


/***/ })

},[[0,"/res/js/manifest","/res/js/vendor"]]]);