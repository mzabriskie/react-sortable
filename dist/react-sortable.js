(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactSortable"] = factory(require("React"));
	else
		root["ReactSortable"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(2);
	var Draggable = __webpack_require__(5);
	
	module.exports = React.createClass({displayName: 'exports',
	  getInitialState: function () {
	    return {
	      dragging: null
	    };
	  },
	
	  handleDraggableStart: function (e) {
	    // Purposefully not using `setState`
	    this.state.dragging = e.target;
	  },
	
	  handleDraggableStop: function () {
	    // TODO: Support animating back to origin
	    var elem = this.state.dragging;
	    elem.style.top = 0;
	    elem.style.left = 0;
	
	    // Purposefully not using `setState`
	    this.state.dragging = null;
	  },
	
	  handleDraggableDrag: function (e) {
	    var elem = this.state.dragging;
	    var prev = elem.previousElementSibling;
	    var next = elem.nextElementSibling;
	
	    // TODO: Adjust top/left after re-inserting node
	    // TODO: Handle horizontal sorting as well as vertical
	    if (prev && e.clientY < (prev.offsetTop + (prev.offsetHeight/2))) {
	      elem.parentNode.insertBefore(elem, prev);
	    }
	    else if (next && e.clientY > (next.offsetTop + (next.offsetHeight/2))) {
	      elem.parentNode.insertBefore(next, elem);
	    }
	  },
	
		render: function () {
	    var child = React.Children.only(this.props.children);
			return React.addons.cloneWithProps(child, {
	      className: 'react-sortable',
	      children: React.Children.map(child.props.children, function (item) {
	        return (
	          Draggable({
	            onStart: this.handleDraggableStart, 
	            onStop: this.handleDraggableStop, 
	            onDrag: this.handleDraggableDrag}, 
	              item
	          )
	        );
	      }.bind(this))
	    });
		}
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;
	
	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }
	
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	}
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @jsx React.DOM */
	var React = __webpack_require__(2);
	var emptyFunction = __webpack_require__(7);
	
	function createUIEvent(draggable) {
		return {
			position: {
				top: draggable.state.clientY,
				left: draggable.state.clientX
			}
		};
	}
	
	function canDragY(draggable) {
		return draggable.props.axis === 'both' ||
				draggable.props.axis === 'y';
	}
	
	function canDragX(draggable) {
		return draggable.props.axis === 'both' ||
				draggable.props.axis === 'x';
	}
	
	function isFunction(fn) {
		return typeof fn === 'function';
	}
	
	function matchesSelector(el, selector) {
		if (isFunction(el.matches)) {
			return el.matches(selector);
		} else if (isFunction(el.webkitMatchesSelector)) {
			return el.webkitMatchesSelector(selector);
		} else if (isFunction(el.mozMatchesSelector)) {
			return el.mozMatchesSelector(selector);
		} else if (isFunction(el.msMatchesSelector)) {
			return el.msMatchesSelector(selector);
		} else if (isFunction(el.oMatchesSelector)) {
			return el.oMatchesSelector(selector);
		} else if (isFunction(el.webkitMatchesSelector)) {
			return el.webkitMatchesSelector(selector);
		}
	}
	
	function addEvent(el, event, handler) {
		if (!el) { return; }
		if (el.attachEvent) {
			el.attachEvent('on' + event, handler);
		} else if (el.addEventListener) {
			el.addEventListener(event, handler, true);
		} else {
			el['on' + event] = handler;
		}
	}
	
	function removeEvent(el, event, handler) {
		if (!el) { return; }
		if (el.detachEvent) {
			el.detachEvent('on' + event, handler);
		} else if (el.removeEventListener) {
			el.removeEventListener(event, handler, true);
		} else {
			el['on' + event] = null;
		}
	}
	
	module.exports = React.createClass({
		displayName: 'Draggable',
	
		propTypes: {
			/**
			 * `axis` determines which axis the draggable can move.
			 *
			 * 'both' allows movement horizontally and vertically.
			 * 'x' limits movement to horizontal axis.
			 * 'y' limits movement to vertical axis.
			 *
			 * Defaults to 'both'.
			 */
			axis: React.PropTypes.oneOf(['both', 'x', 'y']),
	
			/**
			 * `handle` specifies a selector to be used as the handle that initiates drag.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	    	return (
			 * 	    	 	<Draggable handle=".handle">
			 * 	    	 	  <div>
			 * 	    	 	      <div className="handle">Click me to drag</div>
			 * 	    	 	      <div>This is some other content</div>
			 * 	    	 	  </div>
			 * 	    		</Draggable>
			 * 	    	);
			 * 	    }
			 * 	});
			 * ```
			 */
			handle: React.PropTypes.string,
	
			/**
			 * `cancel` specifies a selector to be used to prevent drag initialization.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return(
			 * 	            <Draggable cancel=".cancel">
			 * 	                <div>
			 * 	                	<div className="cancel">You can't drag from here</div>
			 *						<div>Dragging here works fine</div>
			 * 	                </div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			cancel: React.PropTypes.string,
	
			/**
			 * `grid` specifies the x and y that dragging should snap to.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return (
			 * 	            <Draggable grid={[25, 25]}>
			 * 	                <div>I snap to a 25 x 25 grid</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			grid: React.PropTypes.arrayOf(React.PropTypes.number),
	
			/**
			 * `start` specifies the x and y that the dragged item should start at
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return (
			 * 	            <Draggable start={{x: 25, y: 25}}>
			 * 	                <div>I start with left: 25px; top: 25px;</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			start: React.PropTypes.object,
	
			/**
			 * `zIndex` specifies the zIndex to use while dragging.
			 *
			 * Example:
			 *
			 * ```jsx
			 * 	var App = React.createClass({
			 * 	    render: function () {
			 * 	        return (
			 * 	            <Draggable zIndex={100}>
			 * 	                <div>I have a zIndex</div>
			 * 	            </Draggable>
			 * 	        );
			 * 	    }
			 * 	});
			 * ```
			 */
			zIndex: React.PropTypes.number,
	
			/**
			 * Called when dragging starts.
			 *
			 * Example:
			 *
			 * ```js
			 *	function (event, ui) {}
			 * ```
			 *
			 * `event` is the Event that was triggered.
			 * `ui` is an object:
			 *
			 * ```js
			 *	{
			 *		position: {top: 0, left: 0}
			 *	}
			 * ```
			 */
			onStart: React.PropTypes.func,
	
			/**
			 * Called while dragging.
			 *
			 * Example:
			 *
			 * ```js
			 *	function (event, ui) {}
			 * ```
			 *
			 * `event` is the Event that was triggered.
			 * `ui` is an object:
			 *
			 * ```js
			 *	{
			 *		position: {top: 0, left: 0}
			 *	}
			 * ```
			 */
			onDrag: React.PropTypes.func,
	
			/**
			 * Called when dragging stops.
			 *
			 * Example:
			 *
			 * ```js
			 *	function (event, ui) {}
			 * ```
			 *
			 * `event` is the Event that was triggered.
			 * `ui` is an object:
			 *
			 * ```js
			 *	{
			 *		position: {top: 0, left: 0}
			 *	}
			 * ```
			 */
			onStop: React.PropTypes.func,
	
			/**
			 * A workaround option which can be passed if onMouseDown needs to be accessed, since it'll always be blocked (due to that there's internal use of onMouseDown)
			 *
			 */
			onMouseDown: React.PropTypes.func
		},
	
		componentWillUnmount: function() {
			// Remove any leftover event handlers
			removeEvent(window, 'mousemove', this.handleMouseMove);
			removeEvent(window, 'mouseup', this.handleMouseUp);
		},
	
		getDefaultProps: function () {
			return {
				axis: 'both',
				handle: null,
				cancel: null,
				grid: null,
				start: {
					x: 0,
					y: 0
				},
				zIndex: NaN,
				onStart: emptyFunction,
				onDrag: emptyFunction,
				onStop: emptyFunction,
				onMouseDown: emptyFunction
			};
		},
	
		getInitialState: function () {
			return {
				// Whether or not currently dragging
				dragging: false,
	
				// Start top/left of this.getDOMNode()
				startX: 0, startY: 0,
	
				// Offset between start top/left and mouse top/left
				offsetX: 0, offsetY: 0,
	
				// Current top/left of this.getDOMNode()
				clientX: this.props.start.x, clientY: this.props.start.y
			};
		},
	
		handleMouseDown: function (e) {
			// Make it possible to attach event handlers on top of this one
			this.props.onMouseDown(e);
	
			var node = this.getDOMNode();
	
			// Short circuit if handle or cancel prop was provided and selector doesn't match
			if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
				(this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
				return;
			}
	
			// Initiate dragging
			this.setState({
				dragging: true,
				offsetX: e.clientX,
				offsetY: e.clientY,
				startX: parseInt(node.style.left, 10) || 0,
				startY: parseInt(node.style.top, 10) || 0
			});
	
			// Call event handler
			this.props.onStart(e, createUIEvent(this));
	
			// Add event handlers
			addEvent(window, 'mousemove', this.handleMouseMove);
			addEvent(window, 'mouseup', this.handleMouseUp);
		},
	
		handleMouseUp: function (e) {
			// Short circuit if not currently dragging
			if (!this.state.dragging) {
				return;
			}
	
			// Turn off dragging
			this.setState({
				dragging: false
			});
	
			// Call event handler
			this.props.onStop(e, createUIEvent(this));
	
			// Remove event handlers
			removeEvent(window, 'mousemove', this.handleMouseMove);
			removeEvent(window, 'mouseup', this.handleMouseUp);
		},
	
		handleMouseMove: function (e) {
			// Calculate top and left
			var clientX = (this.state.startX + (e.clientX - this.state.offsetX));
			var clientY = (this.state.startY + (e.clientY - this.state.offsetY));
	
			// Snap to grid if prop has been provided
			if (Array.isArray(this.props.grid)) {
				clientX = Math.abs(clientX - this.state.clientX) >= this.props.grid[0]
						? clientX
						: this.state.clientX;
	
				clientY = Math.abs(clientY - this.state.clientY) >= this.props.grid[1]
						? clientY
						: this.state.clientY;
			}
	
			// Update top and left
			this.setState({
				clientX: clientX,
				clientY: clientY
			});
	
			// Call event handler
			this.props.onDrag(e, createUIEvent(this));
		},
	
		render: function () {
			var style = {
				// Set top if vertical drag is enabled
				top: canDragY(this)
					? this.state.clientY
					: this.state.startY,
	
				// Set left if horizontal drag is enabled
				left: canDragX(this)
					? this.state.clientX
					: this.state.startX
			};
	
			// Set zIndex if currently dragging and prop has been provided
			if (this.state.dragging && !isNaN(this.props.zIndex)) {
				style.zIndex = this.props.zIndex;
			}
	
			// Reuse the child provided
			// This makes it flexible to use whatever element is wanted (div, ul, etc)
			return React.addons.cloneWithProps(React.Children.only(this.props.children), {
				style: style,
				className: 'react-draggable',
				onMouseUp: this.handleMouseUp,
				onMouseDown: this.handleMouseDown
			});
		}
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule emptyFunction
	 */
	
	var copyProperties = __webpack_require__(8);
	
	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}
	
	copyProperties(emptyFunction, {
	  thatReturns: makeEmptyFunction,
	  thatReturnsFalse: makeEmptyFunction(false),
	  thatReturnsTrue: makeEmptyFunction(true),
	  thatReturnsNull: makeEmptyFunction(null),
	  thatReturnsThis: function() { return this; },
	  thatReturnsArgument: function(arg) { return arg; }
	});
	
	module.exports = emptyFunction;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule copyProperties
	 */
	
	/**
	 * Copy properties from one or more objects (up to 5) into the first object.
	 * This is a shallow copy. It mutates the first object and also returns it.
	 *
	 * NOTE: `arguments` has a very significant performance penalty, which is why
	 * we don't support unlimited arguments.
	 */
	function copyProperties(obj, a, b, c, d, e, f) {
	  obj = obj || {};
	
	  if ("production" !== process.env.NODE_ENV) {
	    if (f) {
	      throw new Error('Too many arguments passed to copyProperties');
	    }
	  }
	
	  var args = [a, b, c, d, e];
	  var ii = 0, v;
	  while (args[ii]) {
	    v = args[ii++];
	    for (var k in v) {
	      obj[k] = v[k];
	    }
	
	    // IE ignores toString in object iteration.. See:
	    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
	    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
	        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
	      obj.toString = v.toString;
	    }
	  }
	
	  return obj;
	}
	
	module.exports = copyProperties;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }
/******/ ])
})

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kaXN0L3JlYWN0LXNvcnRhYmxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzE3NzNjMzMzZWI0N2I2NzhhMmQiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NvcnRhYmxlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtZHJhZ2dhYmxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtZHJhZ2dhYmxlL2xpYi9kcmFnZ2FibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9jb3B5UHJvcGVydGllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7OztDQ3RDQSx5Qzs7OztDQ0FBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBLEVBQUMsRTs7OztDQ3pERCxnRDs7Ozs7Q0NBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBNkI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7Ozs7O0NDOURBOzs7OztDQ0FBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGNBQWM7QUFDbkQsb0RBQW1ELFdBQVc7QUFDOUQ7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsSUFBSTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEVBQUM7Ozs7O0NDdllEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLGFBQWEsRUFBRTtBQUM5Qyx1Q0FBc0MsWUFBWTtBQUNsRCxFQUFDOztBQUVEOzs7OztDQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJSZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdFNvcnRhYmxlXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiUmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlJlYWN0U29ydGFibGVcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDMxNzczYzMzM2ViNDdiNjc4YTJkXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9zb3J0YWJsZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XG52YXIgRHJhZ2dhYmxlID0gcmVxdWlyZSgncmVhY3QtZHJhZ2dhYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkcmFnZ2luZzogbnVsbFxuICAgIH07XG4gIH0sXG5cbiAgaGFuZGxlRHJhZ2dhYmxlU3RhcnQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gUHVycG9zZWZ1bGx5IG5vdCB1c2luZyBgc2V0U3RhdGVgXG4gICAgdGhpcy5zdGF0ZS5kcmFnZ2luZyA9IGUudGFyZ2V0O1xuICB9LFxuXG4gIGhhbmRsZURyYWdnYWJsZVN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUT0RPOiBTdXBwb3J0IGFuaW1hdGluZyBiYWNrIHRvIG9yaWdpblxuICAgIHZhciBlbGVtID0gdGhpcy5zdGF0ZS5kcmFnZ2luZztcbiAgICBlbGVtLnN0eWxlLnRvcCA9IDA7XG4gICAgZWxlbS5zdHlsZS5sZWZ0ID0gMDtcblxuICAgIC8vIFB1cnBvc2VmdWxseSBub3QgdXNpbmcgYHNldFN0YXRlYFxuICAgIHRoaXMuc3RhdGUuZHJhZ2dpbmcgPSBudWxsO1xuICB9LFxuXG4gIGhhbmRsZURyYWdnYWJsZURyYWc6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGVsZW0gPSB0aGlzLnN0YXRlLmRyYWdnaW5nO1xuICAgIHZhciBwcmV2ID0gZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIHZhciBuZXh0ID0gZWxlbS5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAvLyBUT0RPOiBBZGp1c3QgdG9wL2xlZnQgYWZ0ZXIgcmUtaW5zZXJ0aW5nIG5vZGVcbiAgICAvLyBUT0RPOiBIYW5kbGUgaG9yaXpvbnRhbCBzb3J0aW5nIGFzIHdlbGwgYXMgdmVydGljYWxcbiAgICBpZiAocHJldiAmJiBlLmNsaWVudFkgPCAocHJldi5vZmZzZXRUb3AgKyAocHJldi5vZmZzZXRIZWlnaHQvMikpKSB7XG4gICAgICBlbGVtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsZW0sIHByZXYpO1xuICAgIH1cbiAgICBlbHNlIGlmIChuZXh0ICYmIGUuY2xpZW50WSA+IChuZXh0Lm9mZnNldFRvcCArIChuZXh0Lm9mZnNldEhlaWdodC8yKSkpIHtcbiAgICAgIGVsZW0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV4dCwgZWxlbSk7XG4gICAgfVxuICB9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaGlsZCA9IFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG5cdFx0cmV0dXJuIFJlYWN0LmFkZG9ucy5jbG9uZVdpdGhQcm9wcyhjaGlsZCwge1xuICAgICAgY2xhc3NOYW1lOiAncmVhY3Qtc29ydGFibGUnLFxuICAgICAgY2hpbGRyZW46IFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZC5wcm9wcy5jaGlsZHJlbiwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBEcmFnZ2FibGUoe1xuICAgICAgICAgICAgb25TdGFydDogdGhpcy5oYW5kbGVEcmFnZ2FibGVTdGFydCwgXG4gICAgICAgICAgICBvblN0b3A6IHRoaXMuaGFuZGxlRHJhZ2dhYmxlU3RvcCwgXG4gICAgICAgICAgICBvbkRyYWc6IHRoaXMuaGFuZGxlRHJhZ2dhYmxlRHJhZ30sIFxuICAgICAgICAgICAgICBpdGVtXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH0pO1xuXHR9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliL3NvcnRhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiUmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvZHJhZ2dhYmxlJyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1kcmFnZ2FibGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKiBAanN4IFJlYWN0LkRPTSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVVJRXZlbnQoZHJhZ2dhYmxlKSB7XG5cdHJldHVybiB7XG5cdFx0cG9zaXRpb246IHtcblx0XHRcdHRvcDogZHJhZ2dhYmxlLnN0YXRlLmNsaWVudFksXG5cdFx0XHRsZWZ0OiBkcmFnZ2FibGUuc3RhdGUuY2xpZW50WFxuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gY2FuRHJhZ1koZHJhZ2dhYmxlKSB7XG5cdHJldHVybiBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ2JvdGgnIHx8XG5cdFx0XHRkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ3knO1xufVxuXG5mdW5jdGlvbiBjYW5EcmFnWChkcmFnZ2FibGUpIHtcblx0cmV0dXJuIGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAnYm90aCcgfHxcblx0XHRcdGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAneCc7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZm4pIHtcblx0cmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yKGVsLCBzZWxlY3Rvcikge1xuXHRpZiAoaXNGdW5jdGlvbihlbC5tYXRjaGVzKSkge1xuXHRcdHJldHVybiBlbC5tYXRjaGVzKHNlbGVjdG9yKTtcblx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvcikpIHtcblx0XHRyZXR1cm4gZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcblx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKGVsLm1vek1hdGNoZXNTZWxlY3RvcikpIHtcblx0XHRyZXR1cm4gZWwubW96TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcblx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKGVsLm1zTWF0Y2hlc1NlbGVjdG9yKSkge1xuXHRcdHJldHVybiBlbC5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG5cdH0gZWxzZSBpZiAoaXNGdW5jdGlvbihlbC5vTWF0Y2hlc1NlbGVjdG9yKSkge1xuXHRcdHJldHVybiBlbC5vTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcblx0fSBlbHNlIGlmIChpc0Z1bmN0aW9uKGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvcikpIHtcblx0XHRyZXR1cm4gZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcblx0fVxufVxuXG5mdW5jdGlvbiBhZGRFdmVudChlbCwgZXZlbnQsIGhhbmRsZXIpIHtcblx0aWYgKCFlbCkgeyByZXR1cm47IH1cblx0aWYgKGVsLmF0dGFjaEV2ZW50KSB7XG5cdFx0ZWwuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcblx0fSBlbHNlIGlmIChlbC5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdHJ1ZSk7XG5cdH0gZWxzZSB7XG5cdFx0ZWxbJ29uJyArIGV2ZW50XSA9IGhhbmRsZXI7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWwsIGV2ZW50LCBoYW5kbGVyKSB7XG5cdGlmICghZWwpIHsgcmV0dXJuOyB9XG5cdGlmIChlbC5kZXRhY2hFdmVudCkge1xuXHRcdGVsLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG5cdH0gZWxzZSBpZiAoZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuXHRcdGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHRydWUpO1xuXHR9IGVsc2Uge1xuXHRcdGVsWydvbicgKyBldmVudF0gPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ0RyYWdnYWJsZScsXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0LyoqXG5cdFx0ICogYGF4aXNgIGRldGVybWluZXMgd2hpY2ggYXhpcyB0aGUgZHJhZ2dhYmxlIGNhbiBtb3ZlLlxuXHRcdCAqXG5cdFx0ICogJ2JvdGgnIGFsbG93cyBtb3ZlbWVudCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkuXG5cdFx0ICogJ3gnIGxpbWl0cyBtb3ZlbWVudCB0byBob3Jpem9udGFsIGF4aXMuXG5cdFx0ICogJ3knIGxpbWl0cyBtb3ZlbWVudCB0byB2ZXJ0aWNhbCBheGlzLlxuXHRcdCAqXG5cdFx0ICogRGVmYXVsdHMgdG8gJ2JvdGgnLlxuXHRcdCAqL1xuXHRcdGF4aXM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2JvdGgnLCAneCcsICd5J10pLFxuXG5cdFx0LyoqXG5cdFx0ICogYGhhbmRsZWAgc3BlY2lmaWVzIGEgc2VsZWN0b3IgdG8gYmUgdXNlZCBhcyB0aGUgaGFuZGxlIHRoYXQgaW5pdGlhdGVzIGRyYWcuXG5cdFx0ICpcblx0XHQgKiBFeGFtcGxlOlxuXHRcdCAqXG5cdFx0ICogYGBganN4XG5cdFx0ICogXHR2YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdCAqIFx0ICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXHRcdCAqIFx0ICAgIFx0cmV0dXJuIChcblx0XHQgKiBcdCAgICBcdCBcdDxEcmFnZ2FibGUgaGFuZGxlPVwiLmhhbmRsZVwiPlxuXHRcdCAqIFx0ICAgIFx0IFx0ICA8ZGl2PlxuXHRcdCAqIFx0ICAgIFx0IFx0ICAgICAgPGRpdiBjbGFzc05hbWU9XCJoYW5kbGVcIj5DbGljayBtZSB0byBkcmFnPC9kaXY+XG5cdFx0ICogXHQgICAgXHQgXHQgICAgICA8ZGl2PlRoaXMgaXMgc29tZSBvdGhlciBjb250ZW50PC9kaXY+XG5cdFx0ICogXHQgICAgXHQgXHQgIDwvZGl2PlxuXHRcdCAqIFx0ICAgIFx0XHQ8L0RyYWdnYWJsZT5cblx0XHQgKiBcdCAgICBcdCk7XG5cdFx0ICogXHQgICAgfVxuXHRcdCAqIFx0fSk7XG5cdFx0ICogYGBgXG5cdFx0ICovXG5cdFx0aGFuZGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG5cdFx0LyoqXG5cdFx0ICogYGNhbmNlbGAgc3BlY2lmaWVzIGEgc2VsZWN0b3IgdG8gYmUgdXNlZCB0byBwcmV2ZW50IGRyYWcgaW5pdGlhbGl6YXRpb24uXG5cdFx0ICpcblx0XHQgKiBFeGFtcGxlOlxuXHRcdCAqXG5cdFx0ICogYGBganN4XG5cdFx0ICogXHR2YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdCAqIFx0ICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXHRcdCAqIFx0ICAgICAgICByZXR1cm4oXG5cdFx0ICogXHQgICAgICAgICAgICA8RHJhZ2dhYmxlIGNhbmNlbD1cIi5jYW5jZWxcIj5cblx0XHQgKiBcdCAgICAgICAgICAgICAgICA8ZGl2PlxuXHRcdCAqIFx0ICAgICAgICAgICAgICAgIFx0PGRpdiBjbGFzc05hbWU9XCJjYW5jZWxcIj5Zb3UgY2FuJ3QgZHJhZyBmcm9tIGhlcmU8L2Rpdj5cblx0XHQgKlx0XHRcdFx0XHRcdDxkaXY+RHJhZ2dpbmcgaGVyZSB3b3JrcyBmaW5lPC9kaXY+XG5cdFx0ICogXHQgICAgICAgICAgICAgICAgPC9kaXY+XG5cdFx0ICogXHQgICAgICAgICAgICA8L0RyYWdnYWJsZT5cblx0XHQgKiBcdCAgICAgICAgKTtcblx0XHQgKiBcdCAgICB9XG5cdFx0ICogXHR9KTtcblx0XHQgKiBgYGBcblx0XHQgKi9cblx0XHRjYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cblx0XHQvKipcblx0XHQgKiBgZ3JpZGAgc3BlY2lmaWVzIHRoZSB4IGFuZCB5IHRoYXQgZHJhZ2dpbmcgc2hvdWxkIHNuYXAgdG8uXG5cdFx0ICpcblx0XHQgKiBFeGFtcGxlOlxuXHRcdCAqXG5cdFx0ICogYGBganN4XG5cdFx0ICogXHR2YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRcdCAqIFx0ICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXHRcdCAqIFx0ICAgICAgICByZXR1cm4gKFxuXHRcdCAqIFx0ICAgICAgICAgICAgPERyYWdnYWJsZSBncmlkPXtbMjUsIDI1XX0+XG5cdFx0ICogXHQgICAgICAgICAgICAgICAgPGRpdj5JIHNuYXAgdG8gYSAyNSB4IDI1IGdyaWQ8L2Rpdj5cblx0XHQgKiBcdCAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuXHRcdCAqIFx0ICAgICAgICApO1xuXHRcdCAqIFx0ICAgIH1cblx0XHQgKiBcdH0pO1xuXHRcdCAqIGBgYFxuXHRcdCAqL1xuXHRcdGdyaWQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5udW1iZXIpLFxuXG5cdFx0LyoqXG5cdFx0ICogYHN0YXJ0YCBzcGVjaWZpZXMgdGhlIHggYW5kIHkgdGhhdCB0aGUgZHJhZ2dlZCBpdGVtIHNob3VsZCBzdGFydCBhdFxuXHRcdCAqXG5cdFx0ICogRXhhbXBsZTpcblx0XHQgKlxuXHRcdCAqIGBgYGpzeFxuXHRcdCAqIFx0dmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0XHQgKiBcdCAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHQgKiBcdCAgICAgICAgcmV0dXJuIChcblx0XHQgKiBcdCAgICAgICAgICAgIDxEcmFnZ2FibGUgc3RhcnQ9e3t4OiAyNSwgeTogMjV9fT5cblx0XHQgKiBcdCAgICAgICAgICAgICAgICA8ZGl2Pkkgc3RhcnQgd2l0aCBsZWZ0OiAyNXB4OyB0b3A6IDI1cHg7PC9kaXY+XG5cdFx0ICogXHQgICAgICAgICAgICA8L0RyYWdnYWJsZT5cblx0XHQgKiBcdCAgICAgICAgKTtcblx0XHQgKiBcdCAgICB9XG5cdFx0ICogXHR9KTtcblx0XHQgKiBgYGBcblx0XHQgKi9cblx0XHRzdGFydDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblxuXHRcdC8qKlxuXHRcdCAqIGB6SW5kZXhgIHNwZWNpZmllcyB0aGUgekluZGV4IHRvIHVzZSB3aGlsZSBkcmFnZ2luZy5cblx0XHQgKlxuXHRcdCAqIEV4YW1wbGU6XG5cdFx0ICpcblx0XHQgKiBgYGBqc3hcblx0XHQgKiBcdHZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdFx0ICogXHQgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0ICogXHQgICAgICAgIHJldHVybiAoXG5cdFx0ICogXHQgICAgICAgICAgICA8RHJhZ2dhYmxlIHpJbmRleD17MTAwfT5cblx0XHQgKiBcdCAgICAgICAgICAgICAgICA8ZGl2PkkgaGF2ZSBhIHpJbmRleDwvZGl2PlxuXHRcdCAqIFx0ICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG5cdFx0ICogXHQgICAgICAgICk7XG5cdFx0ICogXHQgICAgfVxuXHRcdCAqIFx0fSk7XG5cdFx0ICogYGBgXG5cdFx0ICovXG5cdFx0ekluZGV4OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG5cdFx0LyoqXG5cdFx0ICogQ2FsbGVkIHdoZW4gZHJhZ2dpbmcgc3RhcnRzLlxuXHRcdCAqXG5cdFx0ICogRXhhbXBsZTpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICpcdGZ1bmN0aW9uIChldmVudCwgdWkpIHt9XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBgZXZlbnRgIGlzIHRoZSBFdmVudCB0aGF0IHdhcyB0cmlnZ2VyZWQuXG5cdFx0ICogYHVpYCBpcyBhbiBvYmplY3Q6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqXHR7XG5cdFx0ICpcdFx0cG9zaXRpb246IHt0b3A6IDAsIGxlZnQ6IDB9XG5cdFx0ICpcdH1cblx0XHQgKiBgYGBcblx0XHQgKi9cblx0XHRvblN0YXJ0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8qKlxuXHRcdCAqIENhbGxlZCB3aGlsZSBkcmFnZ2luZy5cblx0XHQgKlxuXHRcdCAqIEV4YW1wbGU6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqXHRmdW5jdGlvbiAoZXZlbnQsIHVpKSB7fVxuXHRcdCAqIGBgYFxuXHRcdCAqXG5cdFx0ICogYGV2ZW50YCBpcyB0aGUgRXZlbnQgdGhhdCB3YXMgdHJpZ2dlcmVkLlxuXHRcdCAqIGB1aWAgaXMgYW4gb2JqZWN0OlxuXHRcdCAqXG5cdFx0ICogYGBganNcblx0XHQgKlx0e1xuXHRcdCAqXHRcdHBvc2l0aW9uOiB7dG9wOiAwLCBsZWZ0OiAwfVxuXHRcdCAqXHR9XG5cdFx0ICogYGBgXG5cdFx0ICovXG5cdFx0b25EcmFnOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuXHRcdC8qKlxuXHRcdCAqIENhbGxlZCB3aGVuIGRyYWdnaW5nIHN0b3BzLlxuXHRcdCAqXG5cdFx0ICogRXhhbXBsZTpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICpcdGZ1bmN0aW9uIChldmVudCwgdWkpIHt9XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBgZXZlbnRgIGlzIHRoZSBFdmVudCB0aGF0IHdhcyB0cmlnZ2VyZWQuXG5cdFx0ICogYHVpYCBpcyBhbiBvYmplY3Q6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqXHR7XG5cdFx0ICpcdFx0cG9zaXRpb246IHt0b3A6IDAsIGxlZnQ6IDB9XG5cdFx0ICpcdH1cblx0XHQgKiBgYGBcblx0XHQgKi9cblx0XHRvblN0b3A6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG5cdFx0LyoqXG5cdFx0ICogQSB3b3JrYXJvdW5kIG9wdGlvbiB3aGljaCBjYW4gYmUgcGFzc2VkIGlmIG9uTW91c2VEb3duIG5lZWRzIHRvIGJlIGFjY2Vzc2VkLCBzaW5jZSBpdCdsbCBhbHdheXMgYmUgYmxvY2tlZCAoZHVlIHRvIHRoYXQgdGhlcmUncyBpbnRlcm5hbCB1c2Ugb2Ygb25Nb3VzZURvd24pXG5cdFx0ICpcblx0XHQgKi9cblx0XHRvbk1vdXNlRG93bjogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcblx0fSxcblxuXHRjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0Ly8gUmVtb3ZlIGFueSBsZWZ0b3ZlciBldmVudCBoYW5kbGVyc1xuXHRcdHJlbW92ZUV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcblx0XHRyZW1vdmVFdmVudCh3aW5kb3csICdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcblx0fSxcblxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YXhpczogJ2JvdGgnLFxuXHRcdFx0aGFuZGxlOiBudWxsLFxuXHRcdFx0Y2FuY2VsOiBudWxsLFxuXHRcdFx0Z3JpZDogbnVsbCxcblx0XHRcdHN0YXJ0OiB7XG5cdFx0XHRcdHg6IDAsXG5cdFx0XHRcdHk6IDBcblx0XHRcdH0sXG5cdFx0XHR6SW5kZXg6IE5hTixcblx0XHRcdG9uU3RhcnQ6IGVtcHR5RnVuY3Rpb24sXG5cdFx0XHRvbkRyYWc6IGVtcHR5RnVuY3Rpb24sXG5cdFx0XHRvblN0b3A6IGVtcHR5RnVuY3Rpb24sXG5cdFx0XHRvbk1vdXNlRG93bjogZW1wdHlGdW5jdGlvblxuXHRcdH07XG5cdH0sXG5cblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC8vIFdoZXRoZXIgb3Igbm90IGN1cnJlbnRseSBkcmFnZ2luZ1xuXHRcdFx0ZHJhZ2dpbmc6IGZhbHNlLFxuXG5cdFx0XHQvLyBTdGFydCB0b3AvbGVmdCBvZiB0aGlzLmdldERPTU5vZGUoKVxuXHRcdFx0c3RhcnRYOiAwLCBzdGFydFk6IDAsXG5cblx0XHRcdC8vIE9mZnNldCBiZXR3ZWVuIHN0YXJ0IHRvcC9sZWZ0IGFuZCBtb3VzZSB0b3AvbGVmdFxuXHRcdFx0b2Zmc2V0WDogMCwgb2Zmc2V0WTogMCxcblxuXHRcdFx0Ly8gQ3VycmVudCB0b3AvbGVmdCBvZiB0aGlzLmdldERPTU5vZGUoKVxuXHRcdFx0Y2xpZW50WDogdGhpcy5wcm9wcy5zdGFydC54LCBjbGllbnRZOiB0aGlzLnByb3BzLnN0YXJ0Lnlcblx0XHR9O1xuXHR9LFxuXG5cdGhhbmRsZU1vdXNlRG93bjogZnVuY3Rpb24gKGUpIHtcblx0XHQvLyBNYWtlIGl0IHBvc3NpYmxlIHRvIGF0dGFjaCBldmVudCBoYW5kbGVycyBvbiB0b3Agb2YgdGhpcyBvbmVcblx0XHR0aGlzLnByb3BzLm9uTW91c2VEb3duKGUpO1xuXG5cdFx0dmFyIG5vZGUgPSB0aGlzLmdldERPTU5vZGUoKTtcblxuXHRcdC8vIFNob3J0IGNpcmN1aXQgaWYgaGFuZGxlIG9yIGNhbmNlbCBwcm9wIHdhcyBwcm92aWRlZCBhbmQgc2VsZWN0b3IgZG9lc24ndCBtYXRjaFxuXHRcdGlmICgodGhpcy5wcm9wcy5oYW5kbGUgJiYgIW1hdGNoZXNTZWxlY3RvcihlLnRhcmdldCwgdGhpcy5wcm9wcy5oYW5kbGUpKSB8fFxuXHRcdFx0KHRoaXMucHJvcHMuY2FuY2VsICYmIG1hdGNoZXNTZWxlY3RvcihlLnRhcmdldCwgdGhpcy5wcm9wcy5jYW5jZWwpKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEluaXRpYXRlIGRyYWdnaW5nXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRkcmFnZ2luZzogdHJ1ZSxcblx0XHRcdG9mZnNldFg6IGUuY2xpZW50WCxcblx0XHRcdG9mZnNldFk6IGUuY2xpZW50WSxcblx0XHRcdHN0YXJ0WDogcGFyc2VJbnQobm9kZS5zdHlsZS5sZWZ0LCAxMCkgfHwgMCxcblx0XHRcdHN0YXJ0WTogcGFyc2VJbnQobm9kZS5zdHlsZS50b3AsIDEwKSB8fCAwXG5cdFx0fSk7XG5cblx0XHQvLyBDYWxsIGV2ZW50IGhhbmRsZXJcblx0XHR0aGlzLnByb3BzLm9uU3RhcnQoZSwgY3JlYXRlVUlFdmVudCh0aGlzKSk7XG5cblx0XHQvLyBBZGQgZXZlbnQgaGFuZGxlcnNcblx0XHRhZGRFdmVudCh3aW5kb3csICdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG5cdFx0YWRkRXZlbnQod2luZG93LCAnbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG5cdH0sXG5cblx0aGFuZGxlTW91c2VVcDogZnVuY3Rpb24gKGUpIHtcblx0XHQvLyBTaG9ydCBjaXJjdWl0IGlmIG5vdCBjdXJyZW50bHkgZHJhZ2dpbmdcblx0XHRpZiAoIXRoaXMuc3RhdGUuZHJhZ2dpbmcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBUdXJuIG9mZiBkcmFnZ2luZ1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0ZHJhZ2dpbmc6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHQvLyBDYWxsIGV2ZW50IGhhbmRsZXJcblx0XHR0aGlzLnByb3BzLm9uU3RvcChlLCBjcmVhdGVVSUV2ZW50KHRoaXMpKTtcblxuXHRcdC8vIFJlbW92ZSBldmVudCBoYW5kbGVyc1xuXHRcdHJlbW92ZUV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcblx0XHRyZW1vdmVFdmVudCh3aW5kb3csICdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcblx0fSxcblxuXHRoYW5kbGVNb3VzZU1vdmU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0Ly8gQ2FsY3VsYXRlIHRvcCBhbmQgbGVmdFxuXHRcdHZhciBjbGllbnRYID0gKHRoaXMuc3RhdGUuc3RhcnRYICsgKGUuY2xpZW50WCAtIHRoaXMuc3RhdGUub2Zmc2V0WCkpO1xuXHRcdHZhciBjbGllbnRZID0gKHRoaXMuc3RhdGUuc3RhcnRZICsgKGUuY2xpZW50WSAtIHRoaXMuc3RhdGUub2Zmc2V0WSkpO1xuXG5cdFx0Ly8gU25hcCB0byBncmlkIGlmIHByb3AgaGFzIGJlZW4gcHJvdmlkZWRcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmdyaWQpKSB7XG5cdFx0XHRjbGllbnRYID0gTWF0aC5hYnMoY2xpZW50WCAtIHRoaXMuc3RhdGUuY2xpZW50WCkgPj0gdGhpcy5wcm9wcy5ncmlkWzBdXG5cdFx0XHRcdFx0PyBjbGllbnRYXG5cdFx0XHRcdFx0OiB0aGlzLnN0YXRlLmNsaWVudFg7XG5cblx0XHRcdGNsaWVudFkgPSBNYXRoLmFicyhjbGllbnRZIC0gdGhpcy5zdGF0ZS5jbGllbnRZKSA+PSB0aGlzLnByb3BzLmdyaWRbMV1cblx0XHRcdFx0XHQ/IGNsaWVudFlcblx0XHRcdFx0XHQ6IHRoaXMuc3RhdGUuY2xpZW50WTtcblx0XHR9XG5cblx0XHQvLyBVcGRhdGUgdG9wIGFuZCBsZWZ0XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjbGllbnRYOiBjbGllbnRYLFxuXHRcdFx0Y2xpZW50WTogY2xpZW50WVxuXHRcdH0pO1xuXG5cdFx0Ly8gQ2FsbCBldmVudCBoYW5kbGVyXG5cdFx0dGhpcy5wcm9wcy5vbkRyYWcoZSwgY3JlYXRlVUlFdmVudCh0aGlzKSk7XG5cdH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHN0eWxlID0ge1xuXHRcdFx0Ly8gU2V0IHRvcCBpZiB2ZXJ0aWNhbCBkcmFnIGlzIGVuYWJsZWRcblx0XHRcdHRvcDogY2FuRHJhZ1kodGhpcylcblx0XHRcdFx0PyB0aGlzLnN0YXRlLmNsaWVudFlcblx0XHRcdFx0OiB0aGlzLnN0YXRlLnN0YXJ0WSxcblxuXHRcdFx0Ly8gU2V0IGxlZnQgaWYgaG9yaXpvbnRhbCBkcmFnIGlzIGVuYWJsZWRcblx0XHRcdGxlZnQ6IGNhbkRyYWdYKHRoaXMpXG5cdFx0XHRcdD8gdGhpcy5zdGF0ZS5jbGllbnRYXG5cdFx0XHRcdDogdGhpcy5zdGF0ZS5zdGFydFhcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHpJbmRleCBpZiBjdXJyZW50bHkgZHJhZ2dpbmcgYW5kIHByb3AgaGFzIGJlZW4gcHJvdmlkZWRcblx0XHRpZiAodGhpcy5zdGF0ZS5kcmFnZ2luZyAmJiAhaXNOYU4odGhpcy5wcm9wcy56SW5kZXgpKSB7XG5cdFx0XHRzdHlsZS56SW5kZXggPSB0aGlzLnByb3BzLnpJbmRleDtcblx0XHR9XG5cblx0XHQvLyBSZXVzZSB0aGUgY2hpbGQgcHJvdmlkZWRcblx0XHQvLyBUaGlzIG1ha2VzIGl0IGZsZXhpYmxlIHRvIHVzZSB3aGF0ZXZlciBlbGVtZW50IGlzIHdhbnRlZCAoZGl2LCB1bCwgZXRjKVxuXHRcdHJldHVybiBSZWFjdC5hZGRvbnMuY2xvbmVXaXRoUHJvcHMoUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKSwge1xuXHRcdFx0c3R5bGU6IHN0eWxlLFxuXHRcdFx0Y2xhc3NOYW1lOiAncmVhY3QtZHJhZ2dhYmxlJyxcblx0XHRcdG9uTW91c2VVcDogdGhpcy5oYW5kbGVNb3VzZVVwLFxuXHRcdFx0b25Nb3VzZURvd246IHRoaXMuaGFuZGxlTW91c2VEb3duXG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtZHJhZ2dhYmxlL2xpYi9kcmFnZ2FibGUuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZW1wdHlGdW5jdGlvblxuICovXG5cbnZhciBjb3B5UHJvcGVydGllcyA9IHJlcXVpcmUoXCIuL2NvcHlQcm9wZXJ0aWVzXCIpO1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge31cblxuY29weVByb3BlcnRpZXMoZW1wdHlGdW5jdGlvbiwge1xuICB0aGF0UmV0dXJuczogbWFrZUVtcHR5RnVuY3Rpb24sXG4gIHRoYXRSZXR1cm5zRmFsc2U6IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKSxcbiAgdGhhdFJldHVybnNUcnVlOiBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKSxcbiAgdGhhdFJldHVybnNOdWxsOiBtYWtlRW1wdHlGdW5jdGlvbihudWxsKSxcbiAgdGhhdFJldHVybnNUaGlzOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0sXG4gIHRoYXRSZXR1cm5zQXJndW1lbnQ6IGZ1bmN0aW9uKGFyZykgeyByZXR1cm4gYXJnOyB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2VtcHR5RnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgY29weVByb3BlcnRpZXNcbiAqL1xuXG4vKipcbiAqIENvcHkgcHJvcGVydGllcyBmcm9tIG9uZSBvciBtb3JlIG9iamVjdHMgKHVwIHRvIDUpIGludG8gdGhlIGZpcnN0IG9iamVjdC5cbiAqIFRoaXMgaXMgYSBzaGFsbG93IGNvcHkuIEl0IG11dGF0ZXMgdGhlIGZpcnN0IG9iamVjdCBhbmQgYWxzbyByZXR1cm5zIGl0LlxuICpcbiAqIE5PVEU6IGBhcmd1bWVudHNgIGhhcyBhIHZlcnkgc2lnbmlmaWNhbnQgcGVyZm9ybWFuY2UgcGVuYWx0eSwgd2hpY2ggaXMgd2h5XG4gKiB3ZSBkb24ndCBzdXBwb3J0IHVubGltaXRlZCBhcmd1bWVudHMuXG4gKi9cbmZ1bmN0aW9uIGNvcHlQcm9wZXJ0aWVzKG9iaiwgYSwgYiwgYywgZCwgZSwgZikge1xuICBvYmogPSBvYmogfHwge307XG5cbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgIGlmIChmKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RvbyBtYW55IGFyZ3VtZW50cyBwYXNzZWQgdG8gY29weVByb3BlcnRpZXMnKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlXTtcbiAgdmFyIGlpID0gMCwgdjtcbiAgd2hpbGUgKGFyZ3NbaWldKSB7XG4gICAgdiA9IGFyZ3NbaWkrK107XG4gICAgZm9yICh2YXIgayBpbiB2KSB7XG4gICAgICBvYmpba10gPSB2W2tdO1xuICAgIH1cblxuICAgIC8vIElFIGlnbm9yZXMgdG9TdHJpbmcgaW4gb2JqZWN0IGl0ZXJhdGlvbi4uIFNlZTpcbiAgICAvLyB3ZWJyZWZsZWN0aW9uLmJsb2dzcG90LmNvbS8yMDA3LzA3L3F1aWNrLWZpeC1pbnRlcm5ldC1leHBsb3Jlci1hbmQuaHRtbFxuICAgIGlmICh2Lmhhc093blByb3BlcnR5ICYmIHYuaGFzT3duUHJvcGVydHkoJ3RvU3RyaW5nJykgJiZcbiAgICAgICAgKHR5cGVvZiB2LnRvU3RyaW5nICE9ICd1bmRlZmluZWQnKSAmJiAob2JqLnRvU3RyaW5nICE9PSB2LnRvU3RyaW5nKSkge1xuICAgICAgb2JqLnRvU3RyaW5nID0gdi50b1N0cmluZztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlQcm9wZXJ0aWVzO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2NvcHlQcm9wZXJ0aWVzLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==