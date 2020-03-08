(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/res/js/orbitsim"],{

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
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

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
      if (has(typeSpecs, typeSpecName)) {
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
          );
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

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


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

/***/ "./node_modules/scheduler/cjs/scheduler-tracing.development.js":
/*!*********************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler-tracing.development.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.19.0
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

var DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.

var interactionIDCounter = 0;
var threadIDCounter = 0; // Set of currently traced interactions.
// Interactions "stack"–
// Meaning that newly traced interactions are appended to the previously active set.
// When an interaction goes out of scope, the previous set (if any) is restored.

exports.__interactionsRef = null; // Listener(s) to notify when interactions begin and end.

exports.__subscriberRef = null;

{
  exports.__interactionsRef = {
    current: new Set()
  };
  exports.__subscriberRef = {
    current: null
  };
}
function unstable_clear(callback) {

  var prevInteractions = exports.__interactionsRef.current;
  exports.__interactionsRef.current = new Set();

  try {
    return callback();
  } finally {
    exports.__interactionsRef.current = prevInteractions;
  }
}
function unstable_getCurrent() {
  {
    return exports.__interactionsRef.current;
  }
}
function unstable_getThreadID() {
  return ++threadIDCounter;
}
function unstable_trace(name, timestamp, callback) {
  var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;

  var interaction = {
    __count: 1,
    id: interactionIDCounter++,
    name: name,
    timestamp: timestamp
  };
  var prevInteractions = exports.__interactionsRef.current; // Traced interactions should stack/accumulate.
  // To do that, clone the current interactions.
  // The previous set will be restored upon completion.

  var interactions = new Set(prevInteractions);
  interactions.add(interaction);
  exports.__interactionsRef.current = interactions;
  var subscriber = exports.__subscriberRef.current;
  var returnValue;

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
          interaction.__count--; // If no async work was scheduled for this interaction,
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

  var wrappedInteractions = exports.__interactionsRef.current;
  var subscriber = exports.__subscriberRef.current;

  if (subscriber !== null) {
    subscriber.onWorkScheduled(wrappedInteractions, threadID);
  } // Update the pending async work count for the current interactions.
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
      var returnValue;

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
        hasRun = true; // Update pending async counts for all wrapped interactions.
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

{
  subscribers = new Set();
}

function unstable_subscribe(subscriber) {
  {
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
  {
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
exports.unstable_subscribe = unstable_subscribe;
exports.unstable_trace = unstable_trace;
exports.unstable_unsubscribe = unstable_unsubscribe;
exports.unstable_wrap = unstable_wrap;
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
/** @license React v0.19.0
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

var enableSchedulerDebugging = false;
var enableProfiling = true;

var requestHostCallback;
var requestHostTimeout;
var cancelHostTimeout;
var shouldYieldToHost;
var requestPaint;

if ( // If Scheduler runs in a non-DOM environment, it falls back to a naive
// implementation using setTimeout.
typeof window === 'undefined' || // Check if MessageChannel is supported, too.
typeof MessageChannel !== 'function') {
  // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
  // fallback to a naive implementation.
  var _callback = null;
  var _timeoutID = null;

  var _flushCallback = function () {
    if (_callback !== null) {
      try {
        var currentTime = exports.unstable_now();
        var hasRemainingTime = true;

        _callback(hasRemainingTime, currentTime);

        _callback = null;
      } catch (e) {
        setTimeout(_flushCallback, 0);
        throw e;
      }
    }
  };

  var initialTime = Date.now();

  exports.unstable_now = function () {
    return Date.now() - initialTime;
  };

  requestHostCallback = function (cb) {
    if (_callback !== null) {
      // Protect against re-entrancy.
      setTimeout(requestHostCallback, 0, cb);
    } else {
      _callback = cb;
      setTimeout(_flushCallback, 0);
    }
  };

  requestHostTimeout = function (cb, ms) {
    _timeoutID = setTimeout(cb, ms);
  };

  cancelHostTimeout = function () {
    clearTimeout(_timeoutID);
  };

  shouldYieldToHost = function () {
    return false;
  };

  requestPaint = exports.unstable_forceFrameRate = function () {};
} else {
  // Capture local references to native APIs, in case a polyfill overrides them.
  var performance = window.performance;
  var _Date = window.Date;
  var _setTimeout = window.setTimeout;
  var _clearTimeout = window.clearTimeout;

  if (typeof console !== 'undefined') {
    // TODO: Scheduler no longer requires these methods to be polyfilled. But
    // maybe we want to continue warning if they don't exist, to preserve the
    // option to rely on it in the future?
    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame; // TODO: Remove fb.me link

    if (typeof requestAnimationFrame !== 'function') {
      // Using console['error'] to evade Babel and ESLint
      console['error']("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }

    if (typeof cancelAnimationFrame !== 'function') {
      // Using console['error'] to evade Babel and ESLint
      console['error']("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
    }
  }

  if (typeof performance === 'object' && typeof performance.now === 'function') {
    exports.unstable_now = function () {
      return performance.now();
    };
  } else {
    var _initialTime = _Date.now();

    exports.unstable_now = function () {
      return _Date.now() - _initialTime;
    };
  }

  var isMessageLoopRunning = false;
  var scheduledHostCallback = null;
  var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
  // thread, like user events. By default, it yields multiple times per frame.
  // It does not attempt to align with frame boundaries, since most tasks don't
  // need to be frame aligned; for those that do, use requestAnimationFrame.

  var yieldInterval = 5;
  var deadline = 0; // TODO: Make this configurable

  {
    // `isInputPending` is not available. Since we have no way of knowing if
    // there's pending input, always yield at the end of the frame.
    shouldYieldToHost = function () {
      return exports.unstable_now() >= deadline;
    }; // Since we yield every frame regardless, `requestPaint` has no effect.


    requestPaint = function () {};
  }

  exports.unstable_forceFrameRate = function (fps) {
    if (fps < 0 || fps > 125) {
      // Using console['error'] to evade Babel and ESLint
      console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing framerates higher than 125 fps is not unsupported');
      return;
    }

    if (fps > 0) {
      yieldInterval = Math.floor(1000 / fps);
    } else {
      // reset the framerate
      yieldInterval = 5;
    }
  };

  var performWorkUntilDeadline = function () {
    if (scheduledHostCallback !== null) {
      var currentTime = exports.unstable_now(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync
      // cycle. This means there's always time remaining at the beginning of
      // the message event.

      deadline = currentTime + yieldInterval;
      var hasTimeRemaining = true;

      try {
        var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);

        if (!hasMoreWork) {
          isMessageLoopRunning = false;
          scheduledHostCallback = null;
        } else {
          // If there's more work, schedule the next message event at the end
          // of the preceding one.
          port.postMessage(null);
        }
      } catch (error) {
        // If a scheduler task throws, exit the current browser task so the
        // error can be observed.
        port.postMessage(null);
        throw error;
      }
    } else {
      isMessageLoopRunning = false;
    } // Yielding to the browser will give it a chance to paint, so we can
  };

  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;

  requestHostCallback = function (callback) {
    scheduledHostCallback = callback;

    if (!isMessageLoopRunning) {
      isMessageLoopRunning = true;
      port.postMessage(null);
    }
  };

  requestHostTimeout = function (callback, ms) {
    taskTimeoutID = _setTimeout(function () {
      callback(exports.unstable_now());
    }, ms);
  };

  cancelHostTimeout = function () {
    _clearTimeout(taskTimeoutID);

    taskTimeoutID = -1;
  };
}

function push(heap, node) {
  var index = heap.length;
  heap.push(node);
  siftUp(heap, node, index);
}
function peek(heap) {
  var first = heap[0];
  return first === undefined ? null : first;
}
function pop(heap) {
  var first = heap[0];

  if (first !== undefined) {
    var last = heap.pop();

    if (last !== first) {
      heap[0] = last;
      siftDown(heap, last, 0);
    }

    return first;
  } else {
    return null;
  }
}

function siftUp(heap, node, i) {
  var index = i;

  while (true) {
    var parentIndex = index - 1 >>> 1;
    var parent = heap[parentIndex];

    if (parent !== undefined && compare(parent, node) > 0) {
      // The parent is larger. Swap positions.
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      // The parent is smaller. Exit.
      return;
    }
  }
}

function siftDown(heap, node, i) {
  var index = i;
  var length = heap.length;

  while (index < length) {
    var leftIndex = (index + 1) * 2 - 1;
    var left = heap[leftIndex];
    var rightIndex = leftIndex + 1;
    var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.

    if (left !== undefined && compare(left, node) < 0) {
      if (right !== undefined && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (right !== undefined && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // Neither child is smaller. Exit.
      return;
    }
  }
}

function compare(a, b) {
  // Compare sort index first, then task id.
  var diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}

// TODO: Use symbols?
var NoPriority = 0;
var ImmediatePriority = 1;
var UserBlockingPriority = 2;
var NormalPriority = 3;
var LowPriority = 4;
var IdlePriority = 5;

var runIdCounter = 0;
var mainThreadIdCounter = 0;
var profilingStateSize = 4;
var sharedProfilingBuffer =  // $FlowFixMe Flow doesn't know about SharedArrayBuffer
typeof SharedArrayBuffer === 'function' ? new SharedArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : // $FlowFixMe Flow doesn't know about ArrayBuffer
typeof ArrayBuffer === 'function' ? new ArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : null // Don't crash the init path on IE9
;
var profilingState =  sharedProfilingBuffer !== null ? new Int32Array(sharedProfilingBuffer) : []; // We can't read this but it helps save bytes for null checks

var PRIORITY = 0;
var CURRENT_TASK_ID = 1;
var CURRENT_RUN_ID = 2;
var QUEUE_SIZE = 3;

{
  profilingState[PRIORITY] = NoPriority; // This is maintained with a counter, because the size of the priority queue
  // array might include canceled tasks.

  profilingState[QUEUE_SIZE] = 0;
  profilingState[CURRENT_TASK_ID] = 0;
} // Bytes per element is 4


var INITIAL_EVENT_LOG_SIZE = 131072;
var MAX_EVENT_LOG_SIZE = 524288; // Equivalent to 2 megabytes

var eventLogSize = 0;
var eventLogBuffer = null;
var eventLog = null;
var eventLogIndex = 0;
var TaskStartEvent = 1;
var TaskCompleteEvent = 2;
var TaskErrorEvent = 3;
var TaskCancelEvent = 4;
var TaskRunEvent = 5;
var TaskYieldEvent = 6;
var SchedulerSuspendEvent = 7;
var SchedulerResumeEvent = 8;

function logEvent(entries) {
  if (eventLog !== null) {
    var offset = eventLogIndex;
    eventLogIndex += entries.length;

    if (eventLogIndex + 1 > eventLogSize) {
      eventLogSize *= 2;

      if (eventLogSize > MAX_EVENT_LOG_SIZE) {
        // Using console['error'] to evade Babel and ESLint
        console['error']("Scheduler Profiling: Event log exceeded maximum size. Don't " + 'forget to call `stopLoggingProfilingEvents()`.');
        stopLoggingProfilingEvents();
        return;
      }

      var newEventLog = new Int32Array(eventLogSize * 4);
      newEventLog.set(eventLog);
      eventLogBuffer = newEventLog.buffer;
      eventLog = newEventLog;
    }

    eventLog.set(entries, offset);
  }
}

function startLoggingProfilingEvents() {
  eventLogSize = INITIAL_EVENT_LOG_SIZE;
  eventLogBuffer = new ArrayBuffer(eventLogSize * 4);
  eventLog = new Int32Array(eventLogBuffer);
  eventLogIndex = 0;
}
function stopLoggingProfilingEvents() {
  var buffer = eventLogBuffer;
  eventLogSize = 0;
  eventLogBuffer = null;
  eventLog = null;
  eventLogIndex = 0;
  return buffer;
}
function markTaskStart(task, ms) {
  {
    profilingState[QUEUE_SIZE]++;

    if (eventLog !== null) {
      // performance.now returns a float, representing milliseconds. When the
      // event is logged, it's coerced to an int. Convert to microseconds to
      // maintain extra degrees of precision.
      logEvent([TaskStartEvent, ms * 1000, task.id, task.priorityLevel]);
    }
  }
}
function markTaskCompleted(task, ms) {
  {
    profilingState[PRIORITY] = NoPriority;
    profilingState[CURRENT_TASK_ID] = 0;
    profilingState[QUEUE_SIZE]--;

    if (eventLog !== null) {
      logEvent([TaskCompleteEvent, ms * 1000, task.id]);
    }
  }
}
function markTaskCanceled(task, ms) {
  {
    profilingState[QUEUE_SIZE]--;

    if (eventLog !== null) {
      logEvent([TaskCancelEvent, ms * 1000, task.id]);
    }
  }
}
function markTaskErrored(task, ms) {
  {
    profilingState[PRIORITY] = NoPriority;
    profilingState[CURRENT_TASK_ID] = 0;
    profilingState[QUEUE_SIZE]--;

    if (eventLog !== null) {
      logEvent([TaskErrorEvent, ms * 1000, task.id]);
    }
  }
}
function markTaskRun(task, ms) {
  {
    runIdCounter++;
    profilingState[PRIORITY] = task.priorityLevel;
    profilingState[CURRENT_TASK_ID] = task.id;
    profilingState[CURRENT_RUN_ID] = runIdCounter;

    if (eventLog !== null) {
      logEvent([TaskRunEvent, ms * 1000, task.id, runIdCounter]);
    }
  }
}
function markTaskYield(task, ms) {
  {
    profilingState[PRIORITY] = NoPriority;
    profilingState[CURRENT_TASK_ID] = 0;
    profilingState[CURRENT_RUN_ID] = 0;

    if (eventLog !== null) {
      logEvent([TaskYieldEvent, ms * 1000, task.id, runIdCounter]);
    }
  }
}
function markSchedulerSuspended(ms) {
  {
    mainThreadIdCounter++;

    if (eventLog !== null) {
      logEvent([SchedulerSuspendEvent, ms * 1000, mainThreadIdCounter]);
    }
  }
}
function markSchedulerUnsuspended(ms) {
  {
    if (eventLog !== null) {
      logEvent([SchedulerResumeEvent, ms * 1000, mainThreadIdCounter]);
    }
  }
}

/* eslint-disable no-var */
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111

var maxSigned31BitInt = 1073741823; // Times out immediately

var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out

var USER_BLOCKING_PRIORITY = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000; // Never times out

var IDLE_PRIORITY = maxSigned31BitInt; // Tasks are stored on a min heap

var taskQueue = [];
var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.

var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
var currentTask = null;
var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.

var isPerformingWork = false;
var isHostCallbackScheduled = false;
var isHostTimeoutScheduled = false;

function advanceTimers(currentTime) {
  // Check for tasks that are no longer delayed and add them to the queue.
  var timer = peek(timerQueue);

  while (timer !== null) {
    if (timer.callback === null) {
      // Timer was cancelled.
      pop(timerQueue);
    } else if (timer.startTime <= currentTime) {
      // Timer fired. Transfer to the task queue.
      pop(timerQueue);
      timer.sortIndex = timer.expirationTime;
      push(taskQueue, timer);

      {
        markTaskStart(timer, currentTime);
        timer.isQueued = true;
      }
    } else {
      // Remaining timers are pending.
      return;
    }

    timer = peek(timerQueue);
  }
}

function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false;
  advanceTimers(currentTime);

  if (!isHostCallbackScheduled) {
    if (peek(taskQueue) !== null) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    } else {
      var firstTimer = peek(timerQueue);

      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
    }
  }
}

function flushWork(hasTimeRemaining, initialTime) {
  {
    markSchedulerUnsuspended(initialTime);
  } // We'll need a host callback the next time work is scheduled.


  isHostCallbackScheduled = false;

  if (isHostTimeoutScheduled) {
    // We scheduled a timeout but it's no longer needed. Cancel it.
    isHostTimeoutScheduled = false;
    cancelHostTimeout();
  }

  isPerformingWork = true;
  var previousPriorityLevel = currentPriorityLevel;

  try {
    if (enableProfiling) {
      try {
        return workLoop(hasTimeRemaining, initialTime);
      } catch (error) {
        if (currentTask !== null) {
          var currentTime = exports.unstable_now();
          markTaskErrored(currentTask, currentTime);
          currentTask.isQueued = false;
        }

        throw error;
      }
    } else {
      // No catch in prod codepath.
      return workLoop(hasTimeRemaining, initialTime);
    }
  } finally {
    currentTask = null;
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;

    {
      var _currentTime = exports.unstable_now();

      markSchedulerSuspended(_currentTime);
    }
  }
}

function workLoop(hasTimeRemaining, initialTime) {
  var currentTime = initialTime;
  advanceTimers(currentTime);
  currentTask = peek(taskQueue);

  while (currentTask !== null && !(enableSchedulerDebugging )) {
    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
      // This currentTask hasn't expired, and we've reached the deadline.
      break;
    }

    var callback = currentTask.callback;

    if (callback !== null) {
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel;
      var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      markTaskRun(currentTask, currentTime);
      var continuationCallback = callback(didUserCallbackTimeout);
      currentTime = exports.unstable_now();

      if (typeof continuationCallback === 'function') {
        currentTask.callback = continuationCallback;
        markTaskYield(currentTask, currentTime);
      } else {
        {
          markTaskCompleted(currentTask, currentTime);
          currentTask.isQueued = false;
        }

        if (currentTask === peek(taskQueue)) {
          pop(taskQueue);
        }
      }

      advanceTimers(currentTime);
    } else {
      pop(taskQueue);
    }

    currentTask = peek(taskQueue);
  } // Return whether there's additional work


  if (currentTask !== null) {
    return true;
  } else {
    var firstTimer = peek(timerQueue);

    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }

    return false;
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
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}

function unstable_next(eventHandler) {
  var priorityLevel;

  switch (currentPriorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
      // Shift down to normal priority
      priorityLevel = NormalPriority;
      break;

    default:
      // Anything lower than normal priority should remain at the current level.
      priorityLevel = currentPriorityLevel;
      break;
  }

  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}

function unstable_wrapCallback(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function () {
    // This is a fork of runWithPriority, inlined for performance.
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;

    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
}

function timeoutForPriorityLevel(priorityLevel) {
  switch (priorityLevel) {
    case ImmediatePriority:
      return IMMEDIATE_PRIORITY_TIMEOUT;

    case UserBlockingPriority:
      return USER_BLOCKING_PRIORITY;

    case IdlePriority:
      return IDLE_PRIORITY;

    case LowPriority:
      return LOW_PRIORITY_TIMEOUT;

    case NormalPriority:
    default:
      return NORMAL_PRIORITY_TIMEOUT;
  }
}

function unstable_scheduleCallback(priorityLevel, callback, options) {
  var currentTime = exports.unstable_now();
  var startTime;
  var timeout;

  if (typeof options === 'object' && options !== null) {
    var delay = options.delay;

    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }

    timeout = typeof options.timeout === 'number' ? options.timeout : timeoutForPriorityLevel(priorityLevel);
  } else {
    timeout = timeoutForPriorityLevel(priorityLevel);
    startTime = currentTime;
  }

  var expirationTime = startTime + timeout;
  var newTask = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: startTime,
    expirationTime: expirationTime,
    sortIndex: -1
  };

  {
    newTask.isQueued = false;
  }

  if (startTime > currentTime) {
    // This is a delayed task.
    newTask.sortIndex = startTime;
    push(timerQueue, newTask);

    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // All tasks are delayed, and this is the task with the earliest delay.
      if (isHostTimeoutScheduled) {
        // Cancel an existing timeout.
        cancelHostTimeout();
      } else {
        isHostTimeoutScheduled = true;
      } // Schedule a timeout.


      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);

    {
      markTaskStart(newTask, currentTime);
      newTask.isQueued = true;
    } // Schedule a host callback, if needed. If we're already performing work,
    // wait until the next time we yield.


    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  return newTask;
}

function unstable_pauseExecution() {
}

function unstable_continueExecution() {

  if (!isHostCallbackScheduled && !isPerformingWork) {
    isHostCallbackScheduled = true;
    requestHostCallback(flushWork);
  }
}

function unstable_getFirstCallbackNode() {
  return peek(taskQueue);
}

function unstable_cancelCallback(task) {
  {
    if (task.isQueued) {
      var currentTime = exports.unstable_now();
      markTaskCanceled(task, currentTime);
      task.isQueued = false;
    }
  } // Null out the callback to indicate the task has been canceled. (Can't
  // remove from the queue because you can't remove arbitrary nodes from an
  // array based heap, only the first one.)


  task.callback = null;
}

function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel;
}

function unstable_shouldYield() {
  var currentTime = exports.unstable_now();
  advanceTimers(currentTime);
  var firstTask = peek(taskQueue);
  return firstTask !== currentTask && currentTask !== null && firstTask !== null && firstTask.callback !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();
}

var unstable_requestPaint = requestPaint;
var unstable_Profiling =  {
  startLoggingProfilingEvents: startLoggingProfilingEvents,
  stopLoggingProfilingEvents: stopLoggingProfilingEvents,
  sharedProfilingBuffer: sharedProfilingBuffer
} ;

exports.unstable_IdlePriority = IdlePriority;
exports.unstable_ImmediatePriority = ImmediatePriority;
exports.unstable_LowPriority = LowPriority;
exports.unstable_NormalPriority = NormalPriority;
exports.unstable_Profiling = unstable_Profiling;
exports.unstable_UserBlockingPriority = UserBlockingPriority;
exports.unstable_cancelCallback = unstable_cancelCallback;
exports.unstable_continueExecution = unstable_continueExecution;
exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
exports.unstable_next = unstable_next;
exports.unstable_pauseExecution = unstable_pauseExecution;
exports.unstable_requestPaint = unstable_requestPaint;
exports.unstable_runWithPriority = unstable_runWithPriority;
exports.unstable_scheduleCallback = unstable_scheduleCallback;
exports.unstable_shouldYield = unstable_shouldYield;
exports.unstable_wrapCallback = unstable_wrapCallback;
  })();
}


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

/***/ "./src/js/layout.jsx":
/*!***************************!*\
  !*** ./src/js/layout.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Layout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Layout(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "react-root"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    className: "navbar bg-dark navbar-dark fixed-top navbar-expand-md"
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
  }, "Space Elevator")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "nav-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "nav-link",
    href: "/raytracer"
  }, "Ray Tracer")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container-fluid",
    style: {
      marginTop: "80px"
    }
  }, props.children));
}

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

_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].draw = function (p5, camera_pos, further_shorter) {
  p5.push();
  p5.rotateZ(_Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].rotation);
  p5.rotateZ(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LONGITUDE);
  p5.rotateX(_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LATITUDE); // Make Ribbon wider if camera is too far from the ribbon

  var dist_to_bot = _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].true_bottom.dist(camera_pos);
  var dist_to_top = _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].true_top.dist(camera_pos);
  var max_dist = Math.max(dist_to_bot, dist_to_top) / 300000000; // Randomly found decent factor

  if (further_shorter) max_dist /= 10;
  var w = _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].WIDTH * max_dist;
  p5.draw_wrapper(p5.createVector(0, (_Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LENGTH + _Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS) / 2, 0), // Center of ribbon box
  _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].COLOR, function () {
    return p5.cylinder(w, _Classes_Ribbon_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].LENGTH + _Classes_Earth_jsx__WEBPACK_IMPORTED_MODULE_0__["default"].RADIUS);
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
    p5.rotateZ(this.container.eulers.argument); // Draw the orbit as little marks as long as we look from above

    if (!this.impacted && p5.getTracked() == null) {
      var l = this.container.marks.length * 2; // max size - half the payload

      this.container.marks.forEach(function (e, idx) {
        return p5.draw_wrapper(e, 'orange', function () {
          return p5.sphere(_Classes_Payload_jsx__WEBPACK_IMPORTED_MODULE_3__["default"].SIZE * idx / l);
        });
      });
    }
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
var AstronauticaProfile = /*#__PURE__*/function () {
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








var Climber = /*#__PURE__*/function () {
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

var Earth = /*#__PURE__*/function () {
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
      // True value : 0.924e9. In tests, at this height, drawing no longer happens
      return 2.5e9;
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
var FrameTimer = /*#__PURE__*/function () {
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



var ImpactPosition = /*#__PURE__*/function () {
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




var Orbit = /*#__PURE__*/function () {
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
      time: time
    }; // System at time zero/epoch : position and velocity at launch and time of launch

    this._position = pos.copy();
    this.marks = [];
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

      var mean_anomaly = this.mean_at_epoch + this.flight_time * _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].prototype.TAU / this.period; // Tau / period is the mean motion
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

      var altitude = this.altitudeAt(true_anomaly); // For now, draw in x direction on its own - need to rotate with eulers

      this._position = _helpers_jsx__WEBPACK_IMPORTED_MODULE_1__["p5"].prototype.createVector(altitude, 0, 0).rotateZ(true_anomaly); // Save a couple of marks

      if (this.marks.length == Orbit.NUM_MARKS) this.marks.shift();
      this.marks.push(this.position);
    }
  }, {
    key: "altitudeAt",
    value: function altitudeAt(true_anomaly) {
      return this.semi_latus / (1 + this.e * Math.cos(true_anomaly));
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


Orbit.NUM_MARKS = 100; // 100 marks per orbit

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



var Payload = /*#__PURE__*/function () {
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
/* harmony import */ var _helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.jsx */ "./src/js/orbitsim/helpers.jsx");
/* harmony import */ var _Earth_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Earth.jsx */ "./src/js/orbitsim/Classes/Earth.jsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Ribbon = /*#__PURE__*/function () {
  function Ribbon() {
    _classCallCheck(this, Ribbon);
  }

  _createClass(Ribbon, null, [{
    key: "setLonLat",
    value: function setLonLat(longitude, latitude) {
      var toRad = Math.PI / 180;
      this._longitude = toRad * (180 + longitude);
      this._latitude = toRad * latitude;
    }
  }, {
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
      return this._longitude;
    }
  }, {
    key: "LATITUDE",
    get: function get() {
      return this._latitude;
    }
  }, {
    key: "true_bottom",
    get: function get() {
      var v = _helpers_jsx__WEBPACK_IMPORTED_MODULE_0__["p5"].prototype.createVector(0, _Earth_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].RADIUS, 0);
      return v.rotateX(this.LATITUDE).rotateZ(_Earth_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].rotation).rotateZ(this.LONGITUDE);
    }
  }, {
    key: "true_top",
    get: function get() {
      var v = _helpers_jsx__WEBPACK_IMPORTED_MODULE_0__["p5"].prototype.createVector(0, _Earth_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].RADIUS + this.LENGTH, 0);
      return v.rotateX(this.LATITUDE).rotateZ(_Earth_jsx__WEBPACK_IMPORTED_MODULE_1__["default"].rotation).rotateZ(this.LONGITUDE);
    }
  }]);

  return Ribbon;
}();


Ribbon.setLonLat(-90, 0);

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

var UI = /*#__PURE__*/function () {
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
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var ClimberPanel = /*#__PURE__*/function (_Component) {
  _inherits(ClimberPanel, _Component);

  function ClimberPanel(props) {
    var _this;

    _classCallCheck(this, ClimberPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClimberPanel).call(this, props)); // Keep controlled input state

    _this.state = {
      height: 35000,
      tta: 10.00
    }; // Testing this method out?

    _this.handleTTAChange = _this.handleTTAChange.bind(_assertThisInitialized(_this));
    _this.handleHeightChange = _this.handleHeightChange.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ClimberPanel, [{
    key: "handleHeightChange",
    value: function handleHeightChange(event) {
      this.setState({
        height: Math.max(Math.min(event.target.value, 100000), 5000)
      });
    }
  }, {
    key: "handleTTAChange",
    value: function handleTTAChange(event) {
      this.setState({
        tta: Math.max(0.01, event.target.value)
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
        min: "5000",
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
        min: "0.01",
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
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var OrbitSim = /*#__PURE__*/function (_Component) {
  _inherits(OrbitSim, _Component);

  function OrbitSim(props) {
    var _this;

    _classCallCheck(this, OrbitSim);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OrbitSim).call(this, props));

    _this.props.register(_assertThisInitialized(_this));

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
      if (this.state.active_climber != null) {
        this.props.p5.track("c" + this.state.active_climber);
      }
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, " Space Elevator Operator v4.1 "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, " Created by Ivan Miloslavov and Stephen Cohen "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "desc"
      }, "This program presents the orbits that satellites delivered by a Space Elevator would take when released from various launch altitudes along the tether. To start, press the play button and adjust the rate of time lapse. You can create a new climber in the Climbers panel and send a payload to the launch altitude of your choice in however many days of transit you desire. Send as many climbers as you wish."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "desc"
      }, "If you have questions or ideas for improvment, as well as if you have found bugs, feel free to email Ivan at MiloslavovIvan[at]gmail[dot]com . If you want to know more about the Space Elevator, visit the ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        target: "_blank",
        href: "http://www.isec.org"
      }, "International Space Elevator Consortium"), " website."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "desc"
      }, "Music : Local Forecast - Elevator version, by Kevin Macleod (incompetech.com)"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var PayloadPanel = /*#__PURE__*/function (_Component) {
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
      var left_earth = isActive && !active.contained && active.container.left_earth;
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
      })))), !active ? null : impacted ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 px-0"
      }, "Payload destroyed")) : left_earth ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row py-2 px-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 px-0"
      }, "Payload left Earth's SOI")) : contained ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
      }, (active.container.altitude / 1000).toFixed(2))))));
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
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var SimulatorPanel = /*#__PURE__*/function (_Component) {
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
/* harmony import */ var p5_lib_addons_p5_sound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! p5/lib/addons/p5.sound */ "./node_modules/p5/lib/addons/p5.sound.js");
/* harmony import */ var p5_lib_addons_p5_sound__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(p5_lib_addons_p5_sound__WEBPACK_IMPORTED_MODULE_2__);




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
  p5.elevator_music = null;
  p5.climbers = [];
  p5.payloads = [];

  p5.preload = function preload() {
    _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Earth"].IMAGE = p5.loadImage("/res/images/Albedo.jpg");
    /* Add public/ for prod */

    p5.elevator_music = p5.loadSound("/res/sound/elevator.mp3");
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
    p5.elevator_music.setLoop(true);
    p5.elevator_music.playMode('untilDone');
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
    var pos;

    if (tracked === null) {
      pos = p5.createVector(0, 0, p5.height / 2.0 / p5.tan(p5.PI * 30.0 / 180.0));
      p5.camera(pos.x, pos.y, pos.z, 0, 0, 0, 0, -1, 0);
      p5.perspective();
    } else {
      if (climbing_track) {
        // Climber or payload in climber
        pos = (tracked[0] == 'c' ? p5.climbers[idx] : p5.payloads[idx]).true_position.copy();
        pos.addMag(_Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Payload"].SIZE).mult(sizeScale);
        pos.y *= -1;
        var up = p5.createVector(0, 0, -1);
        p5.cameraV(pos, ZERO_V, up); // Near plane starts at true location

        p5.perspective(p5.PI / 3, p5.width / p5.height, _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Payload"].SIZE * sizeScale);
      } else if (p5.payloads[idx].impacted) {
        // On ground
        pos = p5.payloads[idx].true_position.copy().addMag(_Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Earth"].RADIUS * 0.5);
        pos.mult(sizeScale);
        pos.y *= -1;

        var _up = p5.createVector(0, 0, -1);

        p5.cameraV(pos, ZERO_V, _up);
        p5.perspective(p5.PI / 3, p5.width / p5.height, 0.01);
      } else {
        // Released payload
        pos = p5.payloads[idx].true_position.copy();
        pos.mult(sizeScale);
        pos.y *= -1;

        var _up2 = p5.payloads[idx].container.momentum.copy();

        _up2.x *= -1;
        _up2.z *= -1;
        p5.cameraV(pos, ZERO_V, _up2);
        p5.perspective(p5.PI / 3, p5.width / p5.height, _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Payload"].SIZE * sizeScale);
      }
    }

    return pos;
  }

  p5.draw = function draw() {
    update(); // What is being tracked

    var idx = tracked !== null ? parseInt(tracked.substr(1)) : null; // Is the tracked object currently climbing

    var climbing_track = tracked !== null && (tracked[0] == 'c' && p5.climbers[idx] != null || tracked[0] == 'p' && p5.payloads[idx].contained); // What is the ID of the payload that is tracked during climbing?

    var climbing_pid = climbing_track ? tracked[0] == 'p' ? idx // We're tracking that payload
    : // Need to find ID of payload that is inside this climber
    p5.payloads.indexOf(p5.climbers[idx].payload) : null; // What is the ID of the climber that is tracked during climbing?

    var climbing_cid = climbing_track ? tracked[0] == 'c' ? idx // We're tracking that climber
    : // Need to find ID of climber that has this payload
    p5.climbers.indexOf(p5.payloads[idx].container) : null;
    var camera_pos = handleCamera(idx, climbing_track).div(sizeScale);
    camera_pos.y *= -1; // Draw the UI

    reactTop.forceUpdate(); // Wipe the buffers by drawing a background

    p5.background(10); // Set up the default transformation : rotation due to earth and scale

    p5.scale(sizeScale, -sizeScale, sizeScale); // -y so that +y points up

    _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Earth"].draw(p5);
    _Classes_jsx__WEBPACK_IMPORTED_MODULE_1__["Ribbon"].draw(p5, camera_pos, climbing_track);
    p5.climbers.forEach(function (c, index) {
      return !(climbing_track && index == climbing_cid) && c.draw(p5);
    });
    p5.payloads.forEach(function (p, index) {
      return !(climbing_track && index == climbing_pid) && p.draw(p5);
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
    if (str == undefined) tracked = null;else tracked = str; // What is being tracked

    var idx = tracked !== null ? parseInt(tracked.substr(1)) : null; // Is the tracked object currently climbing

    var climbing_track = tracked !== null && (tracked[0] == 'c' && p5.climbers[idx] != null || tracked[0] == 'p' && p5.payloads[idx].contained); // Elevator music update

    if (climbing_track) {
      p5.elevator_music.play();
    } else {
      p5.elevator_music.pause();
    }
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

/***/ "./src/js/pages/OrbitSim.jsx":
/*!***********************************!*\
  !*** ./src/js/pages/OrbitSim.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OrbitSim; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layout_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout.jsx */ "./src/js/layout.jsx");
/* harmony import */ var _orbitsim_index_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../orbitsim/index.jsx */ "./src/js/orbitsim/index.jsx");




function OrbitSim() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, _orbitsim_index_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])));
}

if (document.getElementById('root')) {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(OrbitSim, null), document.getElementById('root'));
}

/***/ }),

/***/ 1:
/*!*****************************************!*\
  !*** multi ./src/js/pages/OrbitSim.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Ivan M\Desktop\CODING\github.io\src\js\pages\OrbitSim.jsx */"./src/js/pages/OrbitSim.jsx");


/***/ })

},[[1,"/res/js/manifest","/res/js/vendor"]]]);