(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/res/js/raytracer"],{

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

/***/ "./src/js/pages/RayTracer.jsx":
/*!************************************!*\
  !*** ./src/js/pages/RayTracer.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RayTracer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layout_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout.jsx */ "./src/js/layout.jsx");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var bootstrap_dist_js_bootstrap_bundle_min__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/dist/js/bootstrap.bundle.min */ "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
/* harmony import */ var bootstrap_dist_js_bootstrap_bundle_min__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_js_bootstrap_bundle_min__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _raytracer_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../raytracer/index.js */ "./src/js/raytracer/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var scenes = [{
  link: "firstSphere",
  // Keep this always first
  name: "Single Sphere"
}, {
  link: "fakeTranslucent",
  name: "Fake Translucency"
}, {
  link: "boxStacks",
  name: "Stacked Boxes"
}, {
  link: "infinite1",
  name: "Infinite Corridor"
}, {
  link: "cornellBox",
  name: "Cornell Box"
}, {
  link: "transparentTest",
  name: "Weird Transparencies"
}];
var ver = "1.2.0";

var StartPane = /*#__PURE__*/function (_React$Component) {
  _inherits(StartPane, _React$Component);

  function StartPane() {
    _classCallCheck(this, StartPane);

    return _possibleConstructorReturn(this, _getPrototypeOf(StartPane).apply(this, arguments));
  }

  _createClass(StartPane, [{
    key: "existingLink",
    value: function existingLink(obj) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#",
        className: "list-group-item list-group-item-action",
        key: obj.link,
        onClick: function onClick(e) {
          e.preventDefault();
          fetch("/raytracer/scenes/" + obj.link + ".json").then(function (response) {
            return response.text();
          }).then(function (text) {
            jquery__WEBPACK_IMPORTED_MODULE_3___default()("#inputJSON").val(text);
            jquery__WEBPACK_IMPORTED_MODULE_3___default()("#sceneTab").click();
          });
        }
      }, obj.name);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "start",
        className: "tab-pane container-fluid active"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "New Scene or Existing"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-primary",
        href: "#",
        onClick: function onClick(e) {
          e.preventDefault();
          jquery__WEBPACK_IMPORTED_MODULE_3___default()("#sceneTab").click();
        }
      }, "New Scene")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-6"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "list-group"
      }, scenes.map(this.existingLink)))));
    }
  }]);

  return StartPane;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var CameraPane = /*#__PURE__*/function (_React$Component2) {
  _inherits(CameraPane, _React$Component2);

  function CameraPane() {
    _classCallCheck(this, CameraPane);

    return _possibleConstructorReturn(this, _getPrototypeOf(CameraPane).apply(this, arguments));
  }

  _createClass(CameraPane, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "camera",
        className: "tab-pane container-fluid"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        "class": "col-6"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        "class": "col-6"
      })));
    }
  }]);

  return CameraPane;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var RayTracer = /*#__PURE__*/function (_React$Component3) {
  _inherits(RayTracer, _React$Component3);

  function RayTracer() {
    _classCallCheck(this, RayTracer);

    return _possibleConstructorReturn(this, _getPrototypeOf(RayTracer).apply(this, arguments));
  }

  _createClass(RayTracer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, " Ray Tracer - v", ver, " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, " Created by Ivan Miloslavov; based on designs by Paul Kry "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "desc"
      }, "This program allows you to try ray-tracing in the browser! Test out existing scenes or create your own."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "desc"
      }, "Based on a design and lectures by Paul Kry, as part of the course COMP 557 - Introduction to Computer Graphics, in McGill University."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "desc"
      }, "Future versions may change the UI to make scenes without JSON, attempt to include multithreading via workers or add new render technology or objects. For now, the JSON documentation is ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "docs",
        target: "_blank"
      }, "here"), "."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal fade",
        id: "badJsonModal"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-dialog"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "modal-title"
      }, "Bad JSON detected!"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "close",
        "data-dismiss": "modal"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xD7"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Your JSON was not correctly parsed. Make sure it's well formed!"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal fade",
        id: "missingJsonModal"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-dialog"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-content"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "modal-title"
      }, "Not enough JSON detected!"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "close",
        "data-dismiss": "modal"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xD7"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Your JSON might be missing mandatory keys. Make sure to follow the documentation and check the console!"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "nav nav-tabs"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "nav-link active",
        "data-toggle": "tab",
        href: "#start"
      }, "Start")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "nav-link",
        "data-toggle": "tab",
        href: "#scene",
        id: "sceneTab"
      }, "JSON")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "nav-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "nav-link",
        "data-toggle": "tab",
        href: "#render"
      }, "Render"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tab-content text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StartPane, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "scene",
        className: "tab-pane container-fluid"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "Place JSON here"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        id: "inputJSON",
        cols: "80",
        rows: "20",
        style: {
          fontFamily: "monospace"
        }
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "render",
        className: "tab-pane container-fluid"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4"
      }, "Running time (s): ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        id: "runtime"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        id: "startRender",
        className: "btn btn-success mx-auto",
        onClick: function onClick() {
          try {
            var json = jquery__WEBPACK_IMPORTED_MODULE_3___default()("#inputJSON").val();
            _raytracer_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].drawFrom(JSON.parse(json));
          } catch (err) {
            if (err.name == "SyntaxError") {
              jquery__WEBPACK_IMPORTED_MODULE_3___default()("#badJsonModal").modal("show");
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_3___default()("#missingJsonModal").modal("show");
              throw err;
            }
          }
        }
      }, "Start Render")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4"
      }, "Remaining time (s): ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        id: "remtime"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row my-5",
        id: "canvasHolder"
      }))));
    }
  }]);

  return RayTracer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



if (document.getElementById('root')) {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RayTracer, null), document.getElementById('root'));
}

window.p5 = _raytracer_index_js__WEBPACK_IMPORTED_MODULE_6__["default"];

/***/ }),

/***/ "./src/js/raytracer/Camera.js":
/*!************************************!*\
  !*** ./src/js/raytracer/Camera.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Camera; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./src/js/raytracer/Vector3.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Camera = /*#__PURE__*/function () {
  function Camera(pos, lookAt, up) {
    _classCallCheck(this, Camera);

    this.pos = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.dir = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.lookAt = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.set(pos, lookAt, up);
    this.dof = {};
    this.setDOF(this.lookAt.copy(), this.dir.copy(), 1, 1);
  }

  _createClass(Camera, [{
    key: "set",
    value: function set(pos, lookAt, up) {
      var _this$lookAt, _this$pos;

      (_this$lookAt = this.lookAt).set.apply(_this$lookAt, _toConsumableArray(lookAt)); // Camera location


      (_this$pos = this.pos).set.apply(_this$pos, _toConsumableArray(pos)); // Viewing direction


      this.dir.set(this.lookAt).sub(this.pos).normalize(); // The "right" vector - the X coordinate of the screen will be along it

      this.right = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](up).cross(this.dir).normalize(); // The "up" vector - the Y coordinate of the screen will be along it

      this.up = this.dir.cross(this.right).normalize(); // Should already be normalized, but doing for rounding errors
    }
  }, {
    key: "setScreen",
    value: function setScreen(width, height, fovy) {
      // Screen width
      this.width = width;
      this.width2 = width / 2; // Screen height

      this.height = height;
      this.height2 = height / 2; // Field-of-view angle and aspect ratio considerations

      this.fovy = fovy;
      var tanned = Math.tan(fovy * Math.PI / 360); // Angle given in degrees; switch to radians and divide by 2
      // Vector from camera position to center of screen

      this.vToScreen = this.dir.copy().setMag(this.height2 / tanned).setSaving(false);
    } // Returns the t for a ray to hit the focus plane

  }, {
    key: "dofDistToFocus",
    value: function dofDistToFocus(ray) {
      var v = _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"].sub(this.dof.p, ray.src);
      return this.dof.n.dot(v) / this.dof.n.dot(ray.dir);
    } // Transforms the ray w.r.t. the i-th DOF sample.

  }, {
    key: "modifyRayDOF",
    value: function modifyRayDOF(dof_i, ray) {
      var p = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](); // Ray parallel to focus plane or not allowed?

      if (!ray.at(this.dofDistToFocus(ray), p)) return; // We will move our eye slightly

      ray.src.scaleAdd(this.right, this.dof.samples[dof_i][0]).scaleAdd(this.up, this.dof.samples[dof_i][1]); // We will be looking towards point p still

      ray.dir.set(p).sub(ray.src).normalize();
    }
  }, {
    key: "setDOF",
    value: function setDOF(point, normal, aperture, samples) {
      if (point) {
        this.dof.p = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](point);
      }

      if (normal) {
        this.dof.n = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](normal);
        this.dof.n.normalize();
      }

      this.dof.a = aperture;
      this.setDOFSamples(Math.max(samples, 1));
    }
  }, {
    key: "setDOFSamples",
    value: function setDOFSamples(v) {
      this.dof.samples = [[0, 0]];

      while (--v > 0) {
        this.dof.samples.push([(Math.random() - 0.5) * this.dof.a, (Math.random() - 0.5) * this.dof.a]);
      }
    }
  }, {
    key: "generateRay",
    value: function generateRay(x, y, dof_i, outR) {
      if (x < 0 || y < 0 || x > this.width || y > this.height) {
        // Removed testing || !(outR instanceof Ray)
        return false;
      }

      x -= this.width2;
      y -= this.height2;
      y = -y; // Direction composed of vector to screen + vector along screen's X and Y

      var dir = this.vToScreen.copy();
      dir.scaleAdd(this.right, x);
      dir.scaleAdd(this.up, y); // Ray origin is camera position

      outR.set(this.pos, dir);
      outR.resetBounds();
      this.modifyRayDOF(dof_i, outR);
      return true;
    }
  }]);

  return Camera;
}();



/***/ }),

/***/ "./src/js/raytracer/IR.js":
/*!********************************!*\
  !*** ./src/js/raytracer/IR.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IntersectionResult; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./src/js/raytracer/Vector3.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var IntersectionResult = /*#__PURE__*/function () {
  function IntersectionResult() {
    _classCallCheck(this, IntersectionResult);

    this.material = null;
    this.p = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0, 0, true);
    this.n = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](1, 0, 0, true);
    this.reset();
  }

  _createClass(IntersectionResult, [{
    key: "setIntersection",
    value: function setIntersection(t, p, n, m) {
      this.connects = true;
      this.t = t;
      this.p.setV(p);
      this.n.setV(n).normalize();
      this.material = m;
    }
  }, {
    key: "setOther",
    value: function setOther(other) {
      this.setIntersection(other.t, other.p, other.n, other.material);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.connects = false;
      this.t = Infinity;
    }
  }]);

  return IntersectionResult;
}();



/***/ }),

/***/ "./src/js/raytracer/Intersectables.js":
/*!********************************************!*\
  !*** ./src/js/raytracer/Intersectables.js ***!
  \********************************************/
/*! exports provided: SceneNode, MatrixTransform, Sphere, Plane, Box */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneNode", function() { return SceneNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatrixTransform", function() { return MatrixTransform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sphere", function() { return Sphere; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plane", function() { return Plane; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return Box; });
/* harmony import */ var _Rendering_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rendering.js */ "./src/js/raytracer/Rendering.js");
/* harmony import */ var _IR_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IR.js */ "./src/js/raytracer/IR.js");
/* harmony import */ var _Matrix4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Matrix4.js */ "./src/js/raytracer/Matrix4.js");
/* harmony import */ var _Ray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Ray.js */ "./src/js/raytracer/Ray.js");
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Vector3.js */ "./src/js/raytracer/Vector3.js");
function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var Intersectable = /*#__PURE__*/function () {
  function Intersectable() {
    var mat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["Material"]();

    _classCallCheck(this, Intersectable);

    this.setMaterial(mat);
  }

  _createClass(Intersectable, [{
    key: "intersects",
    value: function intersects(ray, outIR) {
      console.log("You did not implement the Intersects method for this object!");
      return false;
    }
  }, {
    key: "setMaterial",
    value: function setMaterial(mat) {
      this.material = mat;
    }
  }]);

  return Intersectable;
}();

var SceneNode = /*#__PURE__*/function (_Intersectable) {
  _inherits(SceneNode, _Intersectable);

  function SceneNode(children) {
    var _this;

    _classCallCheck(this, SceneNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SceneNode).call(this));
    _this.children = children;
    _this.count = children.length; // MULTITHREADING WARNING

    _this.localIR = new _IR_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    return _this;
  }

  _createClass(SceneNode, [{
    key: "setBounds",
    value: function setBounds(obj) {
      this.bounds = obj;
    } // Returns closest intersection across all children

  }, {
    key: "intersects",
    value: function intersects(ray, outIR) {
      // Are we intersecting bounds, if any?
      if (typeof this.bounds !== "undefined") {
        this.localIR.reset();

        if (!this.bounds.intersects(ray, this.localIR)) {
          return false;
        }
      } // Actual test inside


      var rayMax = ray.max;

      for (var i = this.count - 1; i >= 0; i--) {
        this.localIR.reset();

        if (this.children[i].intersects(ray, this.localIR)) {
          outIR.setOther(this.localIR);
          ray.setMax(outIR.t);
        }
      }

      ray.setMax(rayMax);
      return outIR.connects;
    }
  }]);

  return SceneNode;
}(Intersectable);

var MatrixTransform = /*#__PURE__*/function (_Intersectable2) {
  _inherits(MatrixTransform, _Intersectable2);

  function MatrixTransform(child, t, r, s) {
    var _this2;

    _classCallCheck(this, MatrixTransform);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(MatrixTransform).call(this));
    _this2.child = child;

    _this2.setMatrix(t, r, s); // MULTITHREADING WARNING


    _this2.localRay = new _Ray_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    return _this2;
  }

  _createClass(MatrixTransform, [{
    key: "setMatrix",
    value: function setMatrix(t, r, s) {
      this.m = new _Matrix4_js__WEBPACK_IMPORTED_MODULE_2__["default"](); // Order of operations : S * Rz * Ry * Rx * T * v?

      this.m.scale(s).rotate(_construct(_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"], _toConsumableArray(r))).translate(t); // Saving two other matrices too : inverse, and inv transpose

      this.mInv = this.m.copy().inverse();
      this.mIt = this.mInv.copy().transpose();
    }
  }, {
    key: "intersects",
    value: function intersects(ray, outIR) {
      this.localRay.setOther(ray); // M transforms the object
      // We need to transform ray with inverse to send to object

      this.mInv.transP(this.localRay.src);
      this.mInv.transV(this.localRay.dir); // If the matrix scales direction, need to modify bounds and t values!

      var scale = this.localRay.dir.mag();

      if (this.localRay.min != 1e-5) {
        this.localRay.min *= scale;
      }

      this.localRay.max *= scale; // Note the division here to make next two operations multiplications

      scale = 1 / scale;
      this.localRay.dir.mult(scale);

      if (!this.child.intersects(this.localRay, outIR)) {
        return false;
      } // Then pass the resulting point through M


      this.m.transP(outIR.p); // Resulting normal through inverse transpose

      this.mIt.transV(outIR.n); // Scale t by the proper direction value

      outIR.t *= scale;
      return true;
    }
  }]);

  return MatrixTransform;
}(Intersectable);

var Sphere = /*#__PURE__*/function (_Intersectable3) {
  _inherits(Sphere, _Intersectable3);

  function Sphere(pos, rad) {
    var _this3;

    _classCallCheck(this, Sphere);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Sphere).call(this));
    _this3.c = _construct(_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"], _toConsumableArray(pos));
    _this3.r = rad;
    return _this3;
  }

  _createClass(Sphere, [{
    key: "intersects",
    value: function intersects(ray, outIR) {
      // Follows the equation (ray.p - c + t * ray.d)^2 = r^2, solves the quadratic for t
      // Couple of constants
      // const dd = ray.dir.dot(ray.dir); // ray dir is normalized, so just no need of this variable
      var px = ray.src.x - this.c.x;
      var py = ray.src.y - this.c.y;
      var pz = ray.src.z - this.c.z;
      var qC = px * px + py * py + pz * pz - this.r * this.r;
      var dp = ray.dir.dotArr(px, py, pz); // Determinant check - if this is below 0, no intersection

      var det = dp * dp - qC;

      if (det < 0) {
        return false;
      }

      var sqrtDet = Math.sqrt(det); // Check lower value against ray bounds

      var t = -dp - sqrtDet;

      if (ray.at(t, outIR.p)) {
        outIR.setIntersection(t, outIR.p, _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"].sub(outIR.p, this.c), this.material);
        return true;
      } // Check upper value against ray bounds


      t += 2 * sqrtDet;

      if (ray.at(t, outIR.p)) {
        outIR.setIntersection(t, outIR.p, _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"].sub(outIR.p, this.c), this.material);
        return true;
      } // Neither t matches


      return false;
    }
  }]);

  return Sphere;
}(Intersectable);

var Plane = /*#__PURE__*/function (_Intersectable4) {
  _inherits(Plane, _Intersectable4);

  function Plane() {
    var _this4;

    var mat2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Plane);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Plane).call(this));

    _this4.setAltMaterial(mat2);

    return _this4;
  }

  _createClass(Plane, [{
    key: "setAltMaterial",
    value: function setAltMaterial(mat2) {
      this.mat2 = mat2;
    }
  }, {
    key: "intersects",
    value: function intersects(ray, outIR) {
      if (ray.dir.y * ray.src.y >= 0) {
        // Going away from y = 0
        return false;
      }

      var t = -ray.src.y / ray.dir.y;

      if (ray.at(t, outIR.p)) {
        var b = Math.floor(outIR.p.x) + Math.floor(outIR.p.z);
        var m = this.mat2 == null || (b % 2 + 2) % 2 < 1 ? this.material : this.mat2;
        var n = ray.src.y > 0 ? new _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"](0, 1, 0) : new _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"](0, -1, 0);
        outIR.setIntersection(t, outIR.p, n, m);
        return true;
      }

      return false;
    }
  }]);

  return Plane;
}(Intersectable);

var Box = /*#__PURE__*/function (_Intersectable5) {
  _inherits(Box, _Intersectable5);

  function Box(min, max) {
    var _this5;

    _classCallCheck(this, Box);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Box).call(this));
    _this5.min = _construct(_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"], _toConsumableArray(min));
    _this5.max = _construct(_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"], _toConsumableArray(max));
    return _this5;
  }

  _createClass(Box, [{
    key: "intersects",
    value: function intersects(ray, outIR) {
      var intervalClose = ray.min;
      var intervalFar = ray.max;
      var normalClose = null;
      var normalFar = null; // For each of the 3 slabs - if putting in a loop, need to use reduce so that the interval test can follow each coord

      for (var i = 0; i < 3; i++) {
        // Comments given as if for X - equivalent for other dims
        var d = ray.dir.at(i);
        var s = ray.src.at(i);

        if (d == 0) {
          // in the YZ plane
          if (s <= this.min.at(i) || s >= this.max.at(i)) {
            // Out of X-slab
            return false;
          } // Else, fully in x-slab, keep interval as is

        } else {
          // Low normal
          var n = -1; // GOnna divide by d, so do so only once

          d = 1 / d;
          var tMin = (this.min.at(i) - s) * d;
          var tMax = (this.max.at(i) - s) * d; // Which t is smaller

          var tLow = void 0,
              tHigh = void 0;

          if (tMin < tMax) {
            tLow = tMin;
            tHigh = tMax;
            n = 1;
          } else {
            tLow = tMax;
            tHigh = tMin;
            n = 0;
          } // Update interval and normals


          if (intervalClose < tLow) {
            intervalClose = tLow;
            normalClose = i * 2 + n;
          }

          if (intervalFar > tHigh) {
            intervalFar = tHigh;
            normalFar = i * 2 + 1 - n;
          }
        } // Have we gone inside out


        if (intervalClose >= intervalFar) {
          return false;
        }
      } // Setup the ray


      if (intervalClose > ray.min && ray.at(intervalClose, outIR.p)) {
        outIR.setIntersection(intervalClose, outIR.p, Box.normals[normalClose], this.material);
        return true;
      }

      if (intervalFar < ray.max && ray.at(intervalFar, outIR.p)) {
        outIR.setIntersection(intervalFar, outIR.p, Box.normals[normalFar], this.material);
        return true;
      }

      return false;
    }
  }]);

  return Box;
}(Intersectable);

Box.normals = [new _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"](1, 0, 0), new _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"](-1, 0, 0), new _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"](0, 1, 0), new _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"](0, -1, 0), new _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"](0, 0, 1), new _Vector3_js__WEBPACK_IMPORTED_MODULE_4__["default"](0, 0, -1)];


/***/ }),

/***/ "./src/js/raytracer/Matrix4.js":
/*!*************************************!*\
  !*** ./src/js/raytracer/Matrix4.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Matrix4; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./src/js/raytracer/Vector3.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // A 4x4 matrix class for transformations in 3D space

var Matrix4 = /*#__PURE__*/function () {
  // TODO
  function Matrix4() {
    _classCallCheck(this, Matrix4);

    this.reset();
  }

  _createClass(Matrix4, [{
    key: "set",
    value: function set(other) {
      if (other instanceof Matrix4) {
        this.m = other.m.slice(); // Clones the array 
      } else if (other instanceof Array) {
        this.m = other.slice();
      } else if (other instanceof _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        this.reset();
        this.translate(other);
      }

      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      return this.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Matrix4().set(this);
    }
  }, {
    key: "at",
    value: function at(row, col) {
      return this.m[row * 4 + col];
    }
  }, {
    key: "_multEntry",
    value: function _multEntry(other, row, col) {
      // Computes one entry for the multiplication of matrices
      //   by sumproduct of local column and other row
      var sum = 0;

      for (var i = 0; i < 4; i++) {
        sum += other.at(row, i) * this.at(i, col);
      }

      return sum;
    }
  }, {
    key: "multBy",
    value: function multBy(m) {
      if (m instanceof Array) {
        return this.multBy(new Matrix4().set(m));
      }

      var arr = [this._multEntry(m, 0, 0), this._multEntry(m, 0, 1), this._multEntry(m, 0, 2), this._multEntry(m, 0, 3), this._multEntry(m, 1, 0), this._multEntry(m, 1, 1), this._multEntry(m, 1, 2), this._multEntry(m, 1, 3), this._multEntry(m, 2, 0), this._multEntry(m, 2, 1), this._multEntry(m, 2, 2), this._multEntry(m, 2, 3), this._multEntry(m, 3, 0), this._multEntry(m, 3, 1), this._multEntry(m, 3, 2), this._multEntry(m, 3, 3)];
      this.m = arr;
      return this;
    }
  }, {
    key: "translate",
    value: function translate(v) {
      if (v instanceof _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        this.m[3] += v.x;
        this.m[7] += v.y;
        this.m[11] += v.z;
        return this;
      } else if (v instanceof Array) {
        this.m[3] += v[0];
        this.m[7] += v[1];
        this.m[11] += v[2];
        return this;
      }
    }
  }, {
    key: "scale",
    value: function scale(v) {
      var x, y, z;

      if (v instanceof Array) {
        x = v[0];
        y = v[1];
        z = v[2];
      } else {
        x = y = z = v;
      } // Actually scale


      this.m[0] *= x;
      this.m[1] *= x;
      this.m[2] *= x;
      this.m[3] *= x;
      this.m[4] *= y;
      this.m[5] *= y;
      this.m[6] *= y;
      this.m[7] *= y;
      this.m[8] *= z;
      this.m[9] *= z;
      this.m[10] *= z;
      this.m[11] *= z;
      return this;
    }
  }, {
    key: "rotateX",
    value: function rotateX(v) {
      var by = new Matrix4();
      v *= Math.PI / 180;
      var c = Math.cos(v);
      var s = Math.sin(v);
      by.m[5] = c;
      by.m[6] = -s;
      by.m[9] = s;
      by.m[10] = c;
      return this.multBy(by);
    }
  }, {
    key: "rotateY",
    value: function rotateY(v) {
      var by = new Matrix4();
      v *= Math.PI / 180;
      var c = Math.cos(v);
      var s = Math.sin(v);
      by.m[0] = c;
      by.m[2] = s;
      by.m[8] = -s;
      by.m[10] = c;
      return this.multBy(by);
    }
  }, {
    key: "rotateZ",
    value: function rotateZ(v) {
      var by = new Matrix4();
      v *= Math.PI / 180;
      var c = Math.cos(v);
      var s = Math.sin(v);
      by.m[0] = c;
      by.m[1] = -s;
      by.m[4] = s;
      by.m[5] = c;
      return this.multBy(by);
    }
  }, {
    key: "rotate",
    value: function rotate(v) {
      return this.rotateX(v.x).rotateY(v.y).rotateZ(v.z);
    }
  }, {
    key: "_swap",
    value: function _swap(a, b) {
      var temp = this.m[a];
      this.m[a] = this.m[b];
      this.m[b] = temp;
    }
  }, {
    key: "transpose",
    value: function transpose() {
      this._swap(1, 4);

      this._swap(2, 8);

      this._swap(3, 12);

      this._swap(6, 9);

      this._swap(7, 13);

      this._swap(11, 14);

      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      // Invert 3x3 R/S
      var tm = this.m;
      var arr = [tm[5] * tm[10] - tm[9] * tm[6], tm[2] * tm[9] - tm[1] * tm[10], tm[1] * tm[6] - tm[2] * tm[5], tm[6] * tm[8] - tm[4] * tm[10], tm[0] * tm[10] - tm[2] * tm[8], tm[4] * tm[2] - tm[0] * tm[6], tm[4] * tm[9] - tm[8] * tm[5], tm[8] * tm[1] - tm[0] * tm[9], tm[0] * tm[5] - tm[4] * tm[1]];
      var det = tm[0] * arr[0] + tm[1] * arr[3] + tm[2] * arr[6];
      var invdet = 1 / det;
      arr = arr.map(function (x) {
        return x * invdet;
      }); // Result has form (Inv, -Inv*t, 0, 1), where t is the translation part of the matrix

      var newT = [-(arr[0] * tm[3] + arr[1] * tm[7] + arr[2] * tm[11]), -(arr[3] * tm[3] + arr[4] * tm[7] + arr[5] * tm[11]), -(arr[6] * tm[3] + arr[7] * tm[7] + arr[8] * tm[11])];
      this.m = [arr[0], arr[1], arr[2], newT[0], arr[3], arr[4], arr[5], newT[1], arr[6], arr[7], arr[8], newT[2], 0, 0, 0, 1];
      return this;
    }
  }, {
    key: "transP",
    value: function transP(p) {
      // Modifies p to be equal to this * p, assuming p is a point (i.e. gets translated)
      var px = this.m[0] * p.x + this.m[1] * p.y + this.m[2] * p.z + this.m[3];
      var py = this.m[4] * p.x + this.m[5] * p.y + this.m[6] * p.z + this.m[7];
      var pz = this.m[8] * p.x + this.m[9] * p.y + this.m[10] * p.z + this.m[11];
      p.x = px;
      p.y = py;
      p.z = pz;

      if (p.saveMag) {
        p._saveMags();
      }

      return p;
    }
  }, {
    key: "transV",
    value: function transV(v) {
      // Modifies v to be equal to this * v, assuming v is a vector (i.e. does not get translated)
      var vx = this.m[0] * v.x + this.m[1] * v.y + this.m[2] * v.z;
      var vy = this.m[4] * v.x + this.m[5] * v.y + this.m[6] * v.z;
      var vz = this.m[8] * v.x + this.m[9] * v.y + this.m[10] * v.z;
      v.x = vx;
      v.y = vy;
      v.z = vz;

      if (v.saveMag) {
        v._saveMags();
      }

      return v;
    }
  }]);

  return Matrix4;
}();



/***/ }),

/***/ "./src/js/raytracer/Ray.js":
/*!*********************************!*\
  !*** ./src/js/raytracer/Ray.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ray; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./src/js/raytracer/Vector3.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Ray = /*#__PURE__*/function () {
  function Ray(src, dir) {
    _classCallCheck(this, Ray);

    if (typeof src === "undefined") {
      this.src = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
      this.dir = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    } else {
      this.src = src.copy();
      this.dir = dir.copy();
    }

    this.resetBounds();
    this.influence = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](1, 1, 1);
  }

  _createClass(Ray, [{
    key: "set",
    value: function set(src, dir) {
      this.src.setV(src);
      this.dir.setV(dir);
      this.dir.normalize();
    }
  }, {
    key: "setOther",
    value: function setOther(other) {
      this.src.setV(other.src);
      this.dir.setV(other.dir);
      this.setBounds(other.min, other.max);
      this.influence.setV(other.influence);
    }
  }, {
    key: "addInfluence",
    value: function addInfluence(color) {
      this.influence.multWise(color);
    }
  }, {
    key: "copy",
    value: function copy() {
      var outp = new Ray(this.src, this.dir);
      outp.setBounds(this.min, this.max);
      return outp;
    }
  }, {
    key: "setMin",
    value: function setMin(min) {
      this.min = Math.max(0, min);
    }
  }, {
    key: "setMax",
    value: function setMax(max) {
      this.max = Math.max(this.min, max);
    }
  }, {
    key: "setBounds",
    value: function setBounds(min, max) {
      this.setMin(min);
      this.setMax(max);
    }
  }, {
    key: "setDepth",
    value: function setDepth(depth) {
      this.depth = depth;
    }
  }, {
    key: "resetBounds",
    value: function resetBounds() {
      this.setBounds(1e-5, Infinity);
    }
  }, {
    key: "at",
    value: function at(t, outV) {
      if (!(outV instanceof _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]) || t < this.min || t > this.max) {
        return false;
      }

      outV.setV(this.dir).mult(t).add(this.src);
      return true;
    }
  }, {
    key: "toString",
    value: function toString() {
      return src.toString() + " " + dir.toString();
    }
  }]);

  return Ray;
}();



/***/ }),

/***/ "./src/js/raytracer/Rendering.js":
/*!***************************************!*\
  !*** ./src/js/raytracer/Rendering.js ***!
  \***************************************/
/*! exports provided: MyColor, Material, PointLight, AreaLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyColor", function() { return MyColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return Material; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointLight", function() { return PointLight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaLight", function() { return AreaLight; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./src/js/raytracer/Vector3.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var MyColor = /*#__PURE__*/function (_Vector) {
  _inherits(MyColor, _Vector);

  function MyColor(arr) {
    var _this;

    _classCallCheck(this, MyColor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MyColor).call(this));

    if (typeof arr === "undefined" || arr == 0) {// Nothing; stay at 0
    } else if (arr instanceof Array) {
      var _this2;

      (_this2 = _this).setRGB255.apply(_this2, _toConsumableArray(arr));
    } else {
      _this.setRGB255(arr, arr, arr);
    }

    return _this;
  }

  _createClass(MyColor, [{
    key: "copy",
    value: function copy() {
      return new MyColor().setV(this);
    }
  }, {
    key: "setRGB255",
    value: function setRGB255(r, g, b) {
      return this.setRGB(r / 255.0, g / 255.0, b / 255.0);
    }
  }, {
    key: "setRGB",
    value: function setRGB(r, g, b) {
      return this.set(r, g, b, false);
    }
  }, {
    key: "limit",
    value: function limit() {
      if (this.x > 1) {
        this.x = 1;
      }

      if (this.y > 1) {
        this.y = 1;
      }

      if (this.z > 1) {
        this.z = 1;
      }
    }
  }, {
    key: "getFinal",
    value: function getFinal() {
      this.limit();
      return [this.x * 255, this.y * 255, this.z * 255];
    }
  }]);

  return MyColor;
}(_Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

var Material = /*#__PURE__*/function () {
  function Material(c) {
    _classCallCheck(this, Material);

    this.setDiffuse(c);
    this.specularEnabled = false;
    this.reflectEnabled = false;
    this.transparentEnabled = false;
  }

  _createClass(Material, [{
    key: "setDiffuse",
    value: function setDiffuse(c) {
      this.diffuse = new MyColor(c);
    }
  }, {
    key: "setSpecular",
    value: function setSpecular(exp) {
      var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
      this.specularEnabled = true;
      this.specular = new MyColor(c);
      this.specExp = exp;
    }
  }, {
    key: "setReflect",
    value: function setReflect() {
      var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 255;
      this.reflectEnabled = true;
      this.reflect = new MyColor(c);
    }
  }, {
    key: "setOpacity",
    value: function setOpacity() {
      var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 255;
      this.transparentEnabled = true;
      this.opaqueColor = new MyColor(c);
      this.transColor = this.opaqueColor.copy();
      this.transColor.x = 1 - this.transColor.x;
      this.transColor.y = 1 - this.transColor.y;
      this.transColor.z = 1 - this.transColor.z;
    }
  }]);

  return Material;
}();

var PointLight = /*#__PURE__*/function () {
  function PointLight(pos, c) {
    _classCallCheck(this, PointLight);

    this.pos = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](pos);
    this.c = new MyColor(c);
    this.maxSamples = 1;
  }

  _createClass(PointLight, [{
    key: "randomSample",
    value: function randomSample() {
      return this.pos;
    }
  }]);

  return PointLight;
}();

var AreaLight = /*#__PURE__*/function () {
  function AreaLight(tri, c, maxSamples) {
    _classCallCheck(this, AreaLight);

    this.tri = [new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](tri[0]), new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](tri[1]), new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"](tri[2])];
    this.c = new MyColor(c);
    this.maxSamples = maxSamples || 10;
  }

  _createClass(AreaLight, [{
    key: "randomSample",
    value: function randomSample() {
      // Random point in triangle
      var d1 = Math.random(),
          d2 = Math.random();
      var d1r = Math.sqrt(d1);
      var p = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
      p.scaleAdd(this.tri[0], 1 - d1r).scaleAdd(this.tri[1], d1r * (1 - d2)).scaleAdd(this.tri[2], d1r * d2);
      return p;
    }
  }]);

  return AreaLight;
}();

MyColor.BLACK = new MyColor();
MyColor.WHITE = new MyColor(255);


/***/ }),

/***/ "./src/js/raytracer/Scene.js":
/*!***********************************!*\
  !*** ./src/js/raytracer/Scene.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scene; });
/* harmony import */ var _Rendering_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rendering.js */ "./src/js/raytracer/Rendering.js");
/* harmony import */ var _Ray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ray.js */ "./src/js/raytracer/Ray.js");
/* harmony import */ var _IR_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IR.js */ "./src/js/raytracer/IR.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Scene = /*#__PURE__*/function () {
  function Scene() {
    _classCallCheck(this, Scene);

    this.materials = {};
    this.lights = [];
    this.setAmbient([0, 0, 0]);
    this.setBG([0, 0, 0]);
    this.setSamples(1);
    this.reflDepth = 0; // Special stuff for interactive loading

    this.lastX = 0;
    this.lastY = 0;
    this.numPixel = 0; // MULTITHREADING WARNING

    this.shadowIR = new _IR_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.pixelColor = new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"]();
  }

  _createClass(Scene, [{
    key: "setSamples",
    value: function setSamples(v) {
      this.samples = [[0.5, 0.5]];

      while (--v > 0) {
        this.samples.push([Math.random(), Math.random()]);
      }
    }
  }, {
    key: "setCamera",
    value: function setCamera(cam) {
      this.cam = cam;
    }
  }, {
    key: "setRootNode",
    value: function setRootNode(root) {
      this.root = root;
    }
  }, {
    key: "setBG",
    value: function setBG(c) {
      this.bg = new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"](c);
    }
  }, {
    key: "setAmbient",
    value: function setAmbient(c) {
      this.ambient = new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"](c);
    }
  }, {
    key: "addLight",
    value: function addLight(l) {
      this.lights.push(l);
    }
  }, {
    key: "addMaterial",
    value: function addMaterial(mat) {
      this.materials[mat.name] = mat;
    }
  }, {
    key: "lighting",
    value: function lighting(ray, IR) {
      var shadowRay = new _Ray_js__WEBPACK_IMPORTED_MODULE_1__["default"](); // Compute reflection ray

      var reflV = ray.dir.reflect(IR.n);
      reflV.mult(-1); // Now points away from surface

      var lll = new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"]();
      var transColor = new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"](); // Transparency - color controls pass-through ray, 1 - color is the rest.

      if (IR.material.transparentEnabled && ray.depth > 0) {
        // Send through-ray
        var transRay = new _Ray_js__WEBPACK_IMPORTED_MODULE_1__["default"](IR.p, ray.dir);
        var transIR = new _IR_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
        transRay.setDepth(ray.depth - 1);
        transColor.add(IR.material.transColor);
        transRay.addInfluence(IR.material.transColor);
        var onlyTrans = transColor.x == 1 && transColor.y == 1 && transColor.z == 1;
        transColor.multWise(this.getColor(transRay, transIR));

        if (onlyTrans) {
          return transColor.getFinal();
        }
      } // Reflective 


      if (IR.material.reflectEnabled && ray.depth > 0) {
        var reflRay = new _Ray_js__WEBPACK_IMPORTED_MODULE_1__["default"](IR.p, reflV);
        var reflIR = new _IR_js__WEBPACK_IMPORTED_MODULE_2__["default"](); // Need a new here due to recursion

        reflRay.setDepth(ray.depth - 1);
        reflRay.addInfluence(IR.material.reflect);
        lll.add(this.getColor(reflRay, reflIR));
        lll.multWise(IR.material.reflect);
      } else {
        // Ambient light
        lll.add(IR.material.diffuse);
        lll.multWise(this.ambient);
      } // For each light


      this.lights.forEach(function (l) {
        // for each light sample
        var thisLight = new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"]();
        var tempLight = new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"]();
        var lightFilter = new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"]();

        for (var lSample = 0; lSample < l.maxSamples; lSample++) {
          // Get light vector
          var dv = l.randomSample().copy().sub(IR.p);
          var dvm = dv.mag();

          if (dvm != 1) {
            dv.div(dvm);
          } // Test shadow ray


          shadowRay.set(IR.p, dv);
          shadowRay.setBounds(1e-5, dvm);
          this.shadowIR.reset();
          var inShadow = false;
          lightFilter.setV(_Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"].WHITE);

          while (this.root.intersects(shadowRay, this.shadowIR)) {
            if (this.shadowIR.material.transparentEnabled) {
              lightFilter.multWise(this.shadowIR.material.transColor);
              shadowRay.setMin(this.shadowIR.t + 1e-5);
              this.shadowIR.reset();
            } else {
              inShadow = true;
              break;
            }
          }

          if (inShadow) continue; // Diffuse

          var angleCoef = Math.max(0, IR.n.dot(dv));

          if (angleCoef <= 0) {
            continue;
          }

          tempLight.setV(IR.material.diffuse);
          tempLight.mult(angleCoef);
          tempLight.multWise(lightFilter);
          thisLight.add(tempLight); // Specular

          if (IR.material.specularEnabled) {
            angleCoef = Math.max(0, reflV.dot(dv));

            if (angleCoef <= 0) {
              continue;
            }

            tempLight.setV(IR.material.specular);
            tempLight.mult(Math.pow(angleCoef, IR.material.specExp));
            tempLight.multWise(lightFilter);
            thisLight.add(tempLight);
          }
        }

        thisLight.multWise(l.c);
        thisLight.div(l.maxSamples);
        lll.add(thisLight);
      }, this); // Transparency - complete

      if (IR.material.transparentEnabled && ray.depth > 0) {
        lll.multWise(IR.material.opaqueColor);
        lll.add(transColor);
      }

      var c = lll.getFinal();
      return c;
    }
  }, {
    key: "getColor",
    value: function getColor(ray, IR) {
      // If this ray's influence is too low, just skip and return black.
      if (ray.influence.x < 0.01 && ray.influence.y < 0.01 && ray.influence.z < 0.01) {
        return _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"].BLACK;
      }

      IR.reset();

      if (this.root.intersects(ray, IR)) {
        // Find value for that pixel
        return new _Rendering_js__WEBPACK_IMPORTED_MODULE_0__["MyColor"](this.lighting(ray, IR));
      } else {
        // If we don't intersect, default background color
        return this.bg;
      }
    }
  }, {
    key: "getPixel",
    value: function getPixel(x, y, ray, IR) {
      this.pixelColor.set(0, 0, 0, false);
      var dofn = this.cam.dof.samples.length;
      var sn = this.samples.length;

      for (var i = 0; i < sn; i++) {
        // Generate the ray for this pixel
        var dx = this.samples[i][0];
        var dy = this.samples[i][1]; // Add DOF generation

        for (var j = 0; j < dofn; j++) {
          if (!this.cam.generateRay(x + dx, y + dy, j, ray)) {
            console.log("Problem in the code - could not generate camera ray!");
            return;
          }

          ray.setDepth(this.reflDepth);
          this.pixelColor.add(this.getColor(ray, IR));
        }
      }

      this.pixelColor.div(sn * dofn);
      return this.pixelColor.getFinal();
    }
  }, {
    key: "draw",
    value: function draw(timeLimit, sketch) {
      var ray = new _Ray_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
      var IR = new _IR_js__WEBPACK_IMPORTED_MODULE_2__["default"](); // Load the pixels into the back buffer

      sketch.loadPixels(); // console.log("Current dims: " + this.cam.width + "x" + this.cam.height + " pixels");
      // Prepare the interactive loop

      var deadline = sketch.millis() + timeLimit;
      var x = this.lastX;
      var y = this.lastY; // Interactive loop - can only go until time limit

      while (sketch.millis() < deadline) {
        sketch.set(x, y, sketch.color(this.getPixel(x, y, ray, IR)));
        x++;
        this.numPixel++;

        if (x == this.cam.width) {
          x = 0;
          y++;

          if (y == this.cam.height) {
            // Put those pixels into main buffer/canvas
            sketch.updatePixels(); // We finished drawing

            return true;
          }
        }
      } // Put those pixels into main buffer/canvas


      sketch.updatePixels(); // Not yet finished drawing, save state

      this.lastX = x;
      this.lastY = y;
      return false;
    }
  }]);

  return Scene;
}();



/***/ }),

/***/ "./src/js/raytracer/SceneLoader.js":
/*!*****************************************!*\
  !*** ./src/js/raytracer/SceneLoader.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SceneLoader; });
/* harmony import */ var _Camera_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Camera.js */ "./src/js/raytracer/Camera.js");
/* harmony import */ var _Scene_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scene.js */ "./src/js/raytracer/Scene.js");
/* harmony import */ var _Rendering_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Rendering.js */ "./src/js/raytracer/Rendering.js");
/* harmony import */ var _Intersectables_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Intersectables.js */ "./src/js/raytracer/Intersectables.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var SceneLoader = /*#__PURE__*/function () {
  function SceneLoader(json) {
    _classCallCheck(this, SceneLoader);

    this.scene = new _Scene_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.refMap = {}; // Object names to objects

    this.loadScene(json);
  }

  _createClass(SceneLoader, [{
    key: "loadCamera",
    value: function loadCamera(json) {
      var cam = new _Camera_js__WEBPACK_IMPORTED_MODULE_0__["default"](json.pos, json.lookAt, json.up);
      cam.setScreen(json.screen.w, json.screen.h, json.fovy);

      if (typeof json.dof !== "undefined") {
        cam.setDOF(json.dof.point, json.dof.normal, json.dof.aperture, json.dof.samples);
      }

      return cam;
    }
  }, {
    key: "loadMaterial",
    value: function loadMaterial(json) {
      // If material is just a reference, try and get it
      if (typeof json === "string") {
        if (this.scene.materials[json] === "undefined") {
          throw "Material reference to non-existent material!";
        } else {
          return this.scene.materials[json];
        }
      } // Load material from scratch


      var mat = new _Rendering_js__WEBPACK_IMPORTED_MODULE_2__["Material"](json.diffuse);

      if (typeof json.name !== "undefined") {
        mat.name = json.name;
      }

      if (typeof json.specExp !== "undefined") {
        mat.setSpecular(json.specExp, json.specular);
      }

      if (typeof json.reflect !== "undefined") {
        if (json.reflect === true) {
          mat.setReflect();
        } else {
          mat.setReflect(json.reflect);
        }
      }

      if (typeof json.opacity !== "undefined") {
        mat.setOpacity(json.opacity);
      }

      return mat;
    }
  }, {
    key: "loadLight",
    value: function loadLight(json) {
      var _json$type;

      var c = json.color;

      switch ((_json$type = json.type) === null || _json$type === void 0 ? void 0 : _json$type.toLowerCase()) {
        case "area":
          return new _Rendering_js__WEBPACK_IMPORTED_MODULE_2__["AreaLight"](json.tri, c, json.samples);

        default:
          return new _Rendering_js__WEBPACK_IMPORTED_MODULE_2__["PointLight"](json.pos, c);
      }
    }
  }, {
    key: "loadInter",
    value: function loadInter(json) {
      // If we just state a reference, check the map.
      if (typeof json === "string") {
        if (this.refMap[json] === "undefined") {
          throw "Object reference to non-existent object!";
        } else {
          return this.refMap[json];
        }
      }

      var outp = null;

      switch (json.type.toLowerCase()) {
        case "plane":
          outp = this.loadPlane(json);
          break;

        case "node":
          outp = this.loadNode(json);
          break;

        case "sphere":
          outp = this.loadSphere(json);
          break;

        case "box":
          outp = this.loadBox(json);
          break;

        case "transform":
          outp = this.loadTransform(json);
          break;

        default:
          throw "You did not implement a loader for this object";
      } // Default material


      if (outp !== null && typeof json.material !== "undefined") {
        outp.setMaterial(this.loadMaterial(json.material));
      } // Name?


      if (outp !== null && typeof json.name !== "undefined") {
        outp.name = json.name;
        this.refMap[outp.name] = outp;
      }

      return outp;
    }
  }, {
    key: "loadNode",
    value: function loadNode(json) {
      var children = [];

      for (var i in json.children) {
        children.push(this.loadInter(json.children[i]));
      }

      var node = new _Intersectables_js__WEBPACK_IMPORTED_MODULE_3__["SceneNode"](children);

      if (typeof json.bounds !== "undefined") {
        node.setBounds(this.loadInter(json.bounds));
      }

      return node;
    }
  }, {
    key: "loadPlane",
    value: function loadPlane(json) {
      var mat2 = null;

      if (typeof json.mat2 !== "undefined") {
        mat2 = this.loadMaterial(json.mat2);
      }

      return new _Intersectables_js__WEBPACK_IMPORTED_MODULE_3__["Plane"](mat2);
    }
  }, {
    key: "loadSphere",
    value: function loadSphere(json) {
      return new _Intersectables_js__WEBPACK_IMPORTED_MODULE_3__["Sphere"](json.pos || [0, 0, 0], json.radius || 1);
    }
  }, {
    key: "loadBox",
    value: function loadBox(json) {
      return new _Intersectables_js__WEBPACK_IMPORTED_MODULE_3__["Box"](json.min, json.max);
    }
  }, {
    key: "loadTransform",
    value: function loadTransform(json) {
      var child = this.loadInter(json.child);
      var t = json.translate;
      var r = typeof json.rotate === "undefined" ? [0, 0, 0] : json.rotate;
      var s = typeof json.scale === "undefined" ? 1 : json.scale;
      return new _Intersectables_js__WEBPACK_IMPORTED_MODULE_3__["MatrixTransform"](child, t, r, s);
    }
  }, {
    key: "loadScene",
    value: function loadScene(json) {
      // Simple properties        
      if (typeof json.samples !== "undefined") {
        this.scene.setSamples(json.samples);
      }

      if (typeof json.reflDepth !== "undefined") {
        this.scene.reflDepth = json.reflDepth;
      }

      if (typeof json.ambient !== "undefined") {
        this.scene.setAmbient(json.ambient);
      }

      if (typeof json.bg !== "undefined") {
        this.scene.setBG(json.bg);
      } // Harder properties


      if (typeof json.lights !== "undefined") {
        for (var i in json.lights) {
          this.scene.addLight(this.loadLight(json.lights[i]));
        }
      }

      if (typeof json.materials !== "undefined") {
        for (var _i in json.materials) {
          this.scene.addMaterial(this.loadMaterial(json.materials[_i]));
        }
      }

      this.scene.setCamera(this.loadCamera(json.camera)); // Scene graph

      this.scene.setRootNode(this.loadInter(json.root));
    }
  }]);

  return SceneLoader;
}();



/***/ }),

/***/ "./src/js/raytracer/Vector3.js":
/*!*************************************!*\
  !*** ./src/js/raytracer/Vector3.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vector3; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector3 = /*#__PURE__*/function () {
  function Vector3(x, y, z, saveMag) {
    _classCallCheck(this, Vector3);

    if (typeof x === "undefined") {
      // Empty constructor - simple init.
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.saveMag = false;
    } else {
      this.set(x, y, z, saveMag);
    }
  }

  _createClass(Vector3, [{
    key: "setSaving",
    value: function setSaving(b) {
      if (b) {
        this._saveMags();
      } else {
        this.saveMag = false;
      }

      return this;
    }
  }, {
    key: "setV",
    value: function setV(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      this.saveMag = v.saveMag;

      if (this.saveMag) {
        this._mag = v._mag;
        this._magSq = v._magSq;
      }

      return this;
    }
  }, {
    key: "set",
    value: function set(x, y, z, saveMag) {
      if (x instanceof Vector3) {
        return this.setV(x);
      } else if (x instanceof Array) {
        // Set the values
        this.x = x[0] || 0;
        this.y = x[1] || 0;
        this.z = x[2] || 0; // Reset saveMag

        this.saveMag = false;
      } else {
        // Set the values
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0; // Reset saveMag

        saveMag = typeof saveMag === "boolean" ? saveMag : this.saveMag || false;
        this.saveMag = false;
      }

      if (saveMag) {
        this._saveMags();
      }

      return this;
    }
  }, {
    key: "_saveMags",
    value: function _saveMags() {
      this.saveMag = false;
      this._magSq = this.magSq();
      this._mag = this.mag();
      this.saveMag = true;
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Vector3().setV(this);
    }
  }, {
    key: "dot",
    value: function dot(other) {
      return this.x * other.x + this.y * other.y + this.z * other.z;
    }
  }, {
    key: "dotArr",
    value: function dotArr(x, y, z) {
      return this.x * x + this.y * y + this.z * z;
    }
  }, {
    key: "magSq",
    value: function magSq() {
      if (this.saveMag && typeof this._magSq !== "undefined") {
        return this._magSq;
      }

      return this.dot(this);
    }
  }, {
    key: "mag",
    value: function mag() {
      if (this.saveMag && typeof this._mag !== "undefined") {
        return this._mag;
      }

      return Math.sqrt(this.magSq());
    }
  }, {
    key: "setMag",
    value: function setMag(m) {
      var mag = this.mag();
      this.saveMag = false;
      this.mult(m / mag); // Save mag from the given

      this.saveMag = true;
      this._mag = m;
      this._magSq = m * m;
      return this;
    }
  }, {
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;

      if (this.saveMag) {
        this._saveMags();
      }

      return this;
    }
  }, {
    key: "scaleAdd",
    value: function scaleAdd(v, t) {
      this.x += v.x * t;
      this.y += v.y * t;
      this.z += v.z * t;

      if (this.saveMag) {
        this._saveMags();
      }

      return this;
    }
  }, {
    key: "sub",
    value: function sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;

      if (this.saveMag) {
        this._saveMags();
      }

      return this;
    }
  }, {
    key: "mult",
    value: function mult(v) {
      this.x *= v;
      this.y *= v;
      this.z *= v;

      if (this.saveMag) {
        this._magSq *= v * v;
        this._mag *= v;
      }

      return this;
    }
  }, {
    key: "multWise",
    value: function multWise(other) {
      this.x *= other.x;
      this.y *= other.y;
      this.z *= other.z;

      if (this.saveMag) {
        this._saveMags();
      }

      return this;
    }
  }, {
    key: "div",
    value: function div(v) {
      return this.mult(1 / v);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      if (this.magSq() != 1) {
        var mag = this.mag();
        this.saveMag = false;
        this.div(mag);
        this.saveMag = true;
        this._mag = 1;
        this._magSq = 1;
      }

      return this;
    }
  }, {
    key: "reflect",
    value: function reflect(n) {
      var dot = 2 * this.dot(n);
      return n.copy().mult(dot).sub(this);
    } // Rotates this (assumed normalized) vector towards another (n) vector

  }, {
    key: "rotateTowards",
    value: function rotateTowards(other, theta) {
      var up = this.cross(other);
      var ninety = up.cross(this).normalize();
      var outv = this.copy().setMag(Math.cos(theta)).scaleAdd(ninety, Math.sin(theta));
      return outv;
    }
  }, {
    key: "refract",
    value: function refract(normal, index_now, index_in) {
      var s = this.cross(normal).mag(); // Sin of angle between; sin's reflection means we don't have to inverse the normal.

      var s2 = s * index_now / index_in;

      if (s2 >= 1) {
        // Total internal reflection
        return null; // Could return this.reflect(normal);
      }

      var new_theta = Math.asin(s2);
      return normal.copy().mult(-1).rotateTowards(this, new_theta);
    }
  }, {
    key: "cross",
    value: function cross(v) {
      var x = this.y * v.z - this.z * v.y;
      var y = this.z * v.x - this.x * v.z;
      var z = this.x * v.y - this.y * v.x;
      return new Vector3(x, y, z);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    }
  }, {
    key: "at",
    value: function at(coord) {
      switch (coord) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        case 2:
          return this.z;
      }
    }
  }, {
    key: "setAt",
    value: function setAt(coord, val) {
      switch (coord) {
        case 0:
          this.x = val;
          break;

        case 1:
          this.y = val;
          break;

        case 2:
          this.z = val;
          break;
      }
    }
  }]);

  return Vector3;
}();



Vector3.sub = function (v1, v2) {
  return v1.copy().sub(v2);
};

Vector3.mult = function (v, k) {
  return v.copy().mult(k);
};

/***/ }),

/***/ "./src/js/raytracer/index.js":
/*!***********************************!*\
  !*** ./src/js/raytracer/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ "./node_modules/p5/lib/p5.js");
/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SceneLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SceneLoader.js */ "./src/js/raytracer/SceneLoader.js");



function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

var s = new p5__WEBPACK_IMPORTED_MODULE_0___default.a(function (sketch) {
  sketch.preload = function () {
    sketch.json = sketch.loadJSON("/raytracer/scenes/emptyScene.json");
  };

  sketch.setup = function () {
    sketch.scene = new _SceneLoader_js__WEBPACK_IMPORTED_MODULE_1__["default"](sketch.json).scene;
    console.log(sketch.scene); // P5 settings

    sketch.startTime = sketch.millis();
    var canvas = sketch.createCanvas(sketch.scene.cam.width, sketch.scene.cam.height);
    canvas["class"]("mx-auto");
    sketch.frameRate(30); // Load the pixels into the back buffer

    sketch.loadPixels();
  };

  sketch.draw = function () {
    if (sketch.scene.draw(1000 / 40, sketch)) {
      // Roughly 40 FPS limit on ray-tracing, around 30 with overheads
      console.log("Completed drawing in " + (sketch.millis() - sketch.startTime) + " ms.");
      sketch.noLoop();
    }

    var totalTime = (sketch.millis() - sketch.startTime) / 1000;
    sketch.select("#runtime").html(totalTime.toFixed(1));
    sketch.select("#remtime").html((totalTime * (sketch.scene.cam.width * sketch.scene.cam.height / sketch.scene.numPixel - 1)).toFixed(1));
  };

  sketch.drawFrom = function (json) {
    sketch.noLoop();
    delete sketch.scene;
    sketch.scene = new _SceneLoader_js__WEBPACK_IMPORTED_MODULE_1__["default"](json).scene;
    sketch.startTime = sketch.millis();
    sketch.resizeCanvas(sketch.scene.cam.width, sketch.scene.cam.height);
    sketch.loop();
  };

  sketch.loadAndDraw = function (jsonURL) {
    sketch.loadJSON(jsonURL, sketch.drawFrom);
  };
}, "canvasHolder");
/* harmony default export */ __webpack_exports__["default"] = (s);

/***/ }),

/***/ 2:
/*!******************************************!*\
  !*** multi ./src/js/pages/RayTracer.jsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Ivan M\Desktop\CODING\github.io\src\js\pages\RayTracer.jsx */"./src/js/pages/RayTracer.jsx");


/***/ })

},[[2,"/res/js/manifest","/res/js/vendor"]]]);