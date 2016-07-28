/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (!Object.values) __webpack_require__(1).shim();
	__webpack_require__(28);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(199);
	__webpack_require__(239);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var define = __webpack_require__(2);

	var implementation = __webpack_require__(6);
	var getPolyfill = __webpack_require__(26);
	var shim = __webpack_require__(27);

	define(implementation, {
		getPolyfill: getPolyfill,
		implementation: implementation,
		shim: shim
	});

	module.exports = implementation;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var keys = __webpack_require__(3);
	var foreach = __webpack_require__(5);
	var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol()) === 'symbol';

	var toStr = Object.prototype.toString;

	var isFunction = function isFunction(fn) {
		return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
	};

	var arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {
		var obj = {};
		try {
			Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
			/* eslint-disable no-unused-vars, no-restricted-syntax */
			for (var _ in obj) {
				return false;
			}
			/* eslint-enable no-unused-vars, no-restricted-syntax */
			return obj.x === obj;
		} catch (e) {
			/* this is IE 8. */
			return false;
		}
	};
	var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

	var defineProperty = function defineProperty(object, name, value, predicate) {
		if (name in object && (!isFunction(predicate) || !predicate())) {
			return;
		}
		if (supportsDescriptors) {
			Object.defineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value;
		}
	};

	var defineProperties = function defineProperties(object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols) {
			props = props.concat(Object.getOwnPropertySymbols(map));
		}
		foreach(props, function (name) {
			defineProperty(object, name, map[name], predicates[name]);
		});
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;

	module.exports = defineProperties;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es5-shim

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(4);
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
	var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = function () {
		/* global window */
		if (typeof window === 'undefined') {
			return false;
		}
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && _typeof(window[k]) === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}();
	var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	var keysShim = function keys(object) {
		var isObject = object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = function () {
				// Safari 5.0 bug
				return (Object.keys(arguments) || '').length === 2;
			}(1, 2);
			if (!keysWorksWithArguments) {
				var originalKeys = Object.keys;
				Object.keys = function keys(object) {
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					} else {
						return originalKeys(object);
					}
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var toStr = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' && value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;

	module.exports = function forEach(obj, fn, ctx) {
	    if (toString.call(fn) !== '[object Function]') {
	        throw new TypeError('iterator must be a function');
	    }
	    var l = obj.length;
	    if (l === +l) {
	        for (var i = 0; i < l; i++) {
	            fn.call(ctx, obj[i], i, obj);
	        }
	    } else {
	        for (var k in obj) {
	            if (hasOwn.call(obj, k)) {
	                fn.call(ctx, obj[k], k, obj);
	            }
	        }
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ES = __webpack_require__(7);
	var has = __webpack_require__(25);
	var bind = __webpack_require__(20);
	var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);

	module.exports = function values(O) {
		var obj = ES.RequireObjectCoercible(O);
		var vals = [];
		for (var key in obj) {
			if (has(obj, key) && isEnumerable(obj, key)) {
				vals.push(obj[key]);
			}
		}
		return vals;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var ES6 = __webpack_require__(8);
	var assign = __webpack_require__(11);

	var ES7 = assign(ES6, {
		// https://github.com/tc39/ecma262/pull/60
		SameValueNonNumber: function SameValueNonNumber(x, y) {
			if (typeof x === 'number' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== (typeof y === 'undefined' ? 'undefined' : _typeof(y))) {
				throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
			}
			return this.SameValue(x, y);
		}
	});

	module.exports = ES7;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol';
	var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;

	var $isNaN = __webpack_require__(9);
	var $isFinite = __webpack_require__(10);
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

	var assign = __webpack_require__(11);
	var sign = __webpack_require__(12);
	var mod = __webpack_require__(13);
	var isPrimitive = __webpack_require__(14);
	var toPrimitive = __webpack_require__(15);
	var parseInteger = parseInt;
	var bind = __webpack_require__(20);
	var strSlice = bind.call(Function.call, String.prototype.slice);
	var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
	var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
	var nonWS = ['', '​', '￾'].join('');
	var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
	var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
	var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
	var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

	// whitespace from: http://es5.github.io/#x15.5.4.20
	// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
	var ws = ['\t\n\u000b\f\r   ᠎    ', '         　\u2028', '\u2029﻿'].join('');
	var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
	var replace = bind.call(Function.call, String.prototype.replace);
	var trim = function trim(value) {
		return replace(value, trimRegex, '');
	};

	var ES5 = __webpack_require__(22);

	var hasRegExpMatcher = __webpack_require__(24);

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
	var ES6 = assign(assign({}, ES5), {

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
		Call: function Call(F, V) {
			var args = arguments.length > 2 ? arguments[2] : [];
			if (!this.IsCallable(F)) {
				throw new TypeError(F + ' is not a function');
			}
			return F.apply(V, args);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
		ToPrimitive: toPrimitive,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
		// ToBoolean: ES5.ToBoolean,

		// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
		ToNumber: function ToNumber(argument) {
			var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
			if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol') {
				throw new TypeError('Cannot convert a Symbol value to a number');
			}
			if (typeof value === 'string') {
				if (isBinary(value)) {
					return this.ToNumber(parseInteger(strSlice(value, 2), 2));
				} else if (isOctal(value)) {
					return this.ToNumber(parseInteger(strSlice(value, 2), 8));
				} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
					return NaN;
				} else {
					var trimmed = trim(value);
					if (trimmed !== value) {
						return this.ToNumber(trimmed);
					}
				}
			}
			return Number(value);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
		// ToInteger: ES5.ToNumber,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
		// ToInt32: ES5.ToInt32,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
		// ToUint32: ES5.ToUint32,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
		ToInt16: function ToInt16(argument) {
			var int16bit = this.ToUint16(argument);
			return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
		// ToUint16: ES5.ToUint16,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
		ToInt8: function ToInt8(argument) {
			var int8bit = this.ToUint8(argument);
			return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
		ToUint8: function ToUint8(argument) {
			var number = this.ToNumber(argument);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) {
				return 0;
			}
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x100);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
		ToUint8Clamp: function ToUint8Clamp(argument) {
			var number = this.ToNumber(argument);
			if ($isNaN(number) || number <= 0) {
				return 0;
			}
			if (number >= 0xFF) {
				return 0xFF;
			}
			var f = Math.floor(argument);
			if (f + 0.5 < number) {
				return f + 1;
			}
			if (number < f + 0.5) {
				return f;
			}
			if (f % 2 !== 0) {
				return f + 1;
			}
			return f;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
		ToString: function ToString(argument) {
			if ((typeof argument === 'undefined' ? 'undefined' : _typeof(argument)) === 'symbol') {
				throw new TypeError('Cannot convert a Symbol value to a string');
			}
			return String(argument);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
		ToObject: function ToObject(value) {
			this.RequireObjectCoercible(value);
			return Object(value);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
		ToPropertyKey: function ToPropertyKey(argument) {
			var key = this.ToPrimitive(argument, String);
			return (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
		ToLength: function ToLength(argument) {
			var len = this.ToInteger(argument);
			if (len <= 0) {
				return 0;
			} // includes converting -0 to +0
			if (len > MAX_SAFE_INTEGER) {
				return MAX_SAFE_INTEGER;
			}
			return len;
		},

		// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
		CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
			if (toStr.call(argument) !== '[object String]') {
				throw new TypeError('must be a string');
			}
			if (argument === '-0') {
				return -0;
			}
			var n = this.ToNumber(argument);
			if (this.SameValue(this.ToString(n), argument)) {
				return n;
			}
			return void 0;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
		RequireObjectCoercible: ES5.CheckObjectCoercible,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
		IsArray: Array.isArray || function IsArray(argument) {
			return toStr.call(argument) === '[object Array]';
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
		// IsCallable: ES5.IsCallable,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
		IsConstructor: function IsConstructor(argument) {
			return this.IsCallable(argument); // unfortunately there's no way to truly check this without try/catch `new argument`
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
		IsExtensible: function IsExtensible(obj) {
			if (!Object.preventExtensions) {
				return true;
			}
			if (isPrimitive(obj)) {
				return false;
			}
			return Object.isExtensible(obj);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
		IsInteger: function IsInteger(argument) {
			if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
				return false;
			}
			var abs = Math.abs(argument);
			return Math.floor(abs) === abs;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
		IsPropertyKey: function IsPropertyKey(argument) {
			return typeof argument === 'string' || (typeof argument === 'undefined' ? 'undefined' : _typeof(argument)) === 'symbol';
		},

		// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
		IsRegExp: function IsRegExp(argument) {
			if (!argument || (typeof argument === 'undefined' ? 'undefined' : _typeof(argument)) !== 'object') {
				return false;
			}
			if (hasSymbols) {
				var isRegExp = argument[Symbol.match];
				if (typeof isRegExp !== 'undefined') {
					return ES5.ToBoolean(isRegExp);
				}
			}
			return hasRegExpMatcher(argument);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
		// SameValue: ES5.SameValue,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
		SameValueZero: function SameValueZero(x, y) {
			return x === y || $isNaN(x) && $isNaN(y);
		}
	});

	delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

	module.exports = ES6;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	module.exports = Number.isNaN || function isNaN(a) {
		return a !== a;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var $isNaN = Number.isNaN || function (a) {
	  return a !== a;
	};

	module.exports = Number.isFinite || function (x) {
	  return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var has = Object.prototype.hasOwnProperty;
	module.exports = Object.assign || function assign(target, source) {
		for (var key in source) {
			if (has.call(source, key)) {
				target[key] = source[key];
			}
		}
		return target;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function sign(number) {
		return number >= 0 ? 1 : -1;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function mod(number, modulo) {
		var remain = number % modulo;
		return Math.floor(remain >= 0 ? remain : remain + modulo);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = function isPrimitive(value) {
		return value === null || typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol';

	var isPrimitive = __webpack_require__(16);
	var isCallable = __webpack_require__(17);
	var isDate = __webpack_require__(18);
	var isSymbol = __webpack_require__(19);

	var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
		if (typeof O === 'undefined' || O === null) {
			throw new TypeError('Cannot call method on ' + O);
		}
		if (typeof hint !== 'string' || hint !== 'number' && hint !== 'string') {
			throw new TypeError('hint must be "string" or "number"');
		}
		var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
		var method, result, i;
		for (i = 0; i < methodNames.length; ++i) {
			method = O[methodNames[i]];
			if (isCallable(method)) {
				result = method.call(O);
				if (isPrimitive(result)) {
					return result;
				}
			}
		}
		throw new TypeError('No default value');
	};

	var GetMethod = function GetMethod(O, P) {
		var func = O[P];
		if (func !== null && typeof func !== 'undefined') {
			if (!isCallable(func)) {
				throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
			}
			return func;
		}
	};

	// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
	module.exports = function ToPrimitive(input, PreferredType) {
		if (isPrimitive(input)) {
			return input;
		}
		var hint = 'default';
		if (arguments.length > 1) {
			if (PreferredType === String) {
				hint = 'string';
			} else if (PreferredType === Number) {
				hint = 'number';
			}
		}

		var exoticToPrim;
		if (hasSymbols) {
			if (Symbol.toPrimitive) {
				exoticToPrim = GetMethod(input, Symbol.toPrimitive);
			} else if (isSymbol(input)) {
				exoticToPrim = Symbol.prototype.valueOf;
			}
		}
		if (typeof exoticToPrim !== 'undefined') {
			var result = exoticToPrim.call(input, hint);
			if (isPrimitive(result)) {
				return result;
			}
			throw new TypeError('unable to convert exotic object to primitive');
		}
		if (hint === 'default' && (isDate(input) || isSymbol(input))) {
			hint = 'string';
		}
		return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	module.exports = function isPrimitive(value) {
		return value === null || typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var fnToStr = Function.prototype.toString;

	var constructorRegex = /^\s*class /;
	var isES6ClassFn = function isES6ClassFn(value) {
		try {
			var fnStr = fnToStr.call(value);
			var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
			var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
			var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
			return constructorRegex.test(spaceStripped);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionObject(value) {
		try {
			if (isES6ClassFn(value)) {
				return false;
			}
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

	module.exports = function isCallable(value) {
		if (!value) {
			return false;
		}
		if (typeof value !== 'function' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
			return false;
		}
		if (hasToStringTag) {
			return tryFunctionObject(value);
		}
		if (isES6ClassFn(value)) {
			return false;
		}
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var getDay = Date.prototype.getDay;
	var tryDateObject = function tryDateObject(value) {
		try {
			getDay.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};

	var toStr = Object.prototype.toString;
	var dateClass = '[object Date]';
	var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

	module.exports = function isDateObject(value) {
		if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || value === null) {
			return false;
		}
		return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && _typeof(Symbol()) === 'symbol';

	if (hasSymbols) {
		var symToStr = Symbol.prototype.toString;
		var symStringRegex = /^Symbol\(.*\)$/;
		var isSymbolObject = function isSymbolObject(value) {
			if (_typeof(value.valueOf()) !== 'symbol') {
				return false;
			}
			return symStringRegex.test(symToStr.call(value));
		};
		module.exports = function isSymbol(value) {
			if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol') {
				return true;
			}
			if (toStr.call(value) !== '[object Symbol]') {
				return false;
			}
			try {
				return isSymbolObject(value);
			} catch (e) {
				return false;
			}
		};
	} else {
		module.exports = function isSymbol(value) {
			// this environment does not support Symbols.
			return false;
		};
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var implementation = __webpack_require__(21);

	module.exports = Function.prototype.bind || implementation;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function binder() {
	        if (this instanceof bound) {
	            var result = target.apply(this, args.concat(slice.call(arguments)));
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(that, args.concat(slice.call(arguments)));
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $isNaN = __webpack_require__(9);
	var $isFinite = __webpack_require__(10);

	var sign = __webpack_require__(12);
	var mod = __webpack_require__(13);

	var IsCallable = __webpack_require__(17);
	var toPrimitive = __webpack_require__(23);

	// https://es5.github.io/#x9
	var ES5 = {
		ToPrimitive: toPrimitive,

		ToBoolean: function ToBoolean(value) {
			return Boolean(value);
		},
		ToNumber: function ToNumber(value) {
			return Number(value);
		},
		ToInteger: function ToInteger(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number)) {
				return 0;
			}
			if (number === 0 || !$isFinite(number)) {
				return number;
			}
			return sign(number) * Math.floor(Math.abs(number));
		},
		ToInt32: function ToInt32(x) {
			return this.ToNumber(x) >> 0;
		},
		ToUint32: function ToUint32(x) {
			return this.ToNumber(x) >>> 0;
		},
		ToUint16: function ToUint16(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) {
				return 0;
			}
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x10000);
		},
		ToString: function ToString(value) {
			return String(value);
		},
		ToObject: function ToObject(value) {
			this.CheckObjectCoercible(value);
			return Object(value);
		},
		CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
			/* jshint eqnull:true */
			if (value == null) {
				throw new TypeError(optMessage || 'Cannot call method on ' + value);
			}
			return value;
		},
		IsCallable: IsCallable,
		SameValue: function SameValue(x, y) {
			if (x === y) {
				// 0 === -0, but they are not identical.
				if (x === 0) {
					return 1 / x === 1 / y;
				}
				return true;
			}
			return $isNaN(x) && $isNaN(y);
		}
	};

	module.exports = ES5;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toStr = Object.prototype.toString;

	var isPrimitive = __webpack_require__(16);

	var isCallable = __webpack_require__(17);

	// https://es5.github.io/#x8.12
	var ES5internalSlots = {
		'[[DefaultValue]]': function DefaultValue(O, hint) {
			var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

			if (actualHint === String || actualHint === Number) {
				var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
				var value, i;
				for (i = 0; i < methods.length; ++i) {
					if (isCallable(O[methods[i]])) {
						value = O[methods[i]]();
						if (isPrimitive(value)) {
							return value;
						}
					}
				}
				throw new TypeError('No default value');
			}
			throw new TypeError('invalid [[DefaultValue]] hint supplied');
		}
	};

	// https://es5.github.io/#x9
	module.exports = function ToPrimitive(input, PreferredType) {
		if (isPrimitive(input)) {
			return input;
		}
		return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var regexExec = RegExp.prototype.exec;
	var tryRegexExec = function tryRegexExec(value) {
		try {
			regexExec.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var regexClass = '[object RegExp]';
	var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

	module.exports = function isRegex(value) {
		if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
			return false;
		}
		return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(20);

	module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var implementation = __webpack_require__(6);

	module.exports = function getPolyfill() {
		return typeof Object.values === 'function' ? Object.values : implementation;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPolyfill = __webpack_require__(26);
	var define = __webpack_require__(2);

	module.exports = function shimValues() {
		var polyfill = getPolyfill();
		define(Object, { values: polyfill }, { values: function values() {
				return Object.values !== polyfill;
			} });
		return polyfill;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var noop6 = __webpack_require__(29);

	(function () {
	    var NAME_FIELD = "name";

	    if (typeof noop6.name === "string") {
	        return;
	    }

	    Object.defineProperty(Function.prototype, NAME_FIELD, {
	        get: function get() {
	            var name = this.toString().trim().match(/^function\s*([^\s(]+)/)[1];
	            Object.defineProperty(this, NAME_FIELD, { value: name });
	            return name;
	        }
	    });
	})();

	/**
	 * functionName
	 * Get the function name.
	 *
	 * @name functionName
	 * @function
	 * @param {Function} input The input function.
	 * @returns {String} The function name.
	 */
	module.exports = function functionName(input) {
	    return input.name;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	Copyright (C) 2013-2015 by Andrea Giammarchi - @WebReflection

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	*/
	(function (window) {
	  'use strict';
	  /* jshint loopfunc: true, noempty: false*/
	  // http://www.w3.org/TR/dom/#element

	  function createDocumentFragment() {
	    return document.createDocumentFragment();
	  }

	  function createElement(nodeName) {
	    return document.createElement(nodeName);
	  }

	  function enoughArguments(length, name) {
	    if (!length) throw new Error('Failed to construct ' + name + ': 1 argument required, but only 0 present.');
	  }

	  function mutationMacro(nodes) {
	    if (nodes.length === 1) {
	      return textNodeIfString(nodes[0]);
	    }
	    for (var fragment = createDocumentFragment(), list = slice.call(nodes), i = 0; i < nodes.length; i++) {
	      fragment.appendChild(textNodeIfString(list[i]));
	    }
	    return fragment;
	  }

	  function textNodeIfString(node) {
	    return typeof node === 'string' ? document.createTextNode(node) : node;
	  }

	  for (var head, property, TemporaryPrototype, TemporaryTokenList, wrapVerifyToken, document = window.document, hOP = Object.prototype.hasOwnProperty, defineProperty = Object.defineProperty || function (object, property, descriptor) {
	    if (hOP.call(descriptor, 'value')) {
	      object[property] = descriptor.value;
	    } else {
	      if (hOP.call(descriptor, 'get')) object.__defineGetter__(property, descriptor.get);
	      if (hOP.call(descriptor, 'set')) object.__defineSetter__(property, descriptor.set);
	    }
	    return object;
	  }, indexOf = [].indexOf || function indexOf(value) {
	    var length = this.length;
	    while (length--) {
	      if (this[length] === value) {
	        break;
	      }
	    }
	    return length;
	  },
	  // http://www.w3.org/TR/domcore/#domtokenlist
	  verifyToken = function verifyToken(token) {
	    if (!token) {
	      throw 'SyntaxError';
	    } else if (spaces.test(token)) {
	      throw 'InvalidCharacterError';
	    }
	    return token;
	  }, DOMTokenList = function DOMTokenList(node) {
	    var noClassName = typeof node.className === 'undefined',
	        className = noClassName ? node.getAttribute('class') || '' : node.className,
	        isSVG = noClassName || (typeof className === 'undefined' ? 'undefined' : _typeof(className)) === 'object',
	        value = (isSVG ? noClassName ? className : className.baseVal : className).replace(trim, '');
	    if (value.length) {
	      properties.push.apply(this, value.split(spaces));
	    }
	    this._isSVG = isSVG;
	    this._ = node;
	  }, classListDescriptor = {
	    get: function get() {
	      return new DOMTokenList(this);
	    },
	    set: function set() {}
	  }, uid = 'dom4-tmp-'.concat(Math.random() * +new Date()).replace('.', '-'), trim = /^\s+|\s+$/g, spaces = /\s+/, SPACE = '\x20', CLASS_LIST = 'classList', toggle = function toggle(token, force) {
	    if (this.contains(token)) {
	      if (!force) {
	        // force is not true (either false or omitted)
	        this.remove(token);
	      }
	    } else if (force === undefined || force) {
	      force = true;
	      this.add(token);
	    }
	    return !!force;
	  }, DocumentFragmentPrototype = window.DocumentFragment && DocumentFragment.prototype, Node = window.Node, NodePrototype = (Node || Element).prototype, CharacterData = window.CharacterData || Node, CharacterDataPrototype = CharacterData && CharacterData.prototype, DocumentType = window.DocumentType, DocumentTypePrototype = DocumentType && DocumentType.prototype, ElementPrototype = (window.Element || Node || window.HTMLElement).prototype, HTMLSelectElement = window.HTMLSelectElement || createElement('select').constructor, selectRemove = HTMLSelectElement.prototype.remove, ShadowRoot = window.ShadowRoot, SVGElement = window.SVGElement,
	  // normalizes multiple ids as CSS query
	  idSpaceFinder = / /g, idSpaceReplacer = '\\ ', createQueryMethod = function createQueryMethod(methodName) {
	    var createArray = methodName === 'querySelectorAll';
	    return function (css) {
	      var a,
	          i,
	          id,
	          query,
	          nl,
	          selectors,
	          node = this.parentNode;
	      if (node) {
	        for (id = this.getAttribute('id') || uid, query = id === uid ? id : id.replace(idSpaceFinder, idSpaceReplacer), selectors = css.split(','), i = 0; i < selectors.length; i++) {
	          selectors[i] = '#' + query + ' ' + selectors[i];
	        }
	        css = selectors.join(',');
	      }
	      if (id === uid) this.setAttribute('id', id);
	      nl = (node || this)[methodName](css);
	      if (id === uid) this.removeAttribute('id');
	      // return a list
	      if (createArray) {
	        i = nl.length;
	        a = new Array(i);
	        while (i--) {
	          a[i] = nl[i];
	        }
	      }
	      // return node or null
	      else {
	          a = nl;
	        }
	      return a;
	    };
	  }, addQueryAndAll = function addQueryAndAll(where) {
	    if (!('query' in where)) {
	      where.query = ElementPrototype.query;
	    }
	    if (!('queryAll' in where)) {
	      where.queryAll = ElementPrototype.queryAll;
	    }
	  }, properties = ['matches', ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.khtmlMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.msMatchesSelector || ElementPrototype.oMatchesSelector || function matches(selector) {
	    var parentNode = this.parentNode;
	    return !!parentNode && -1 < indexOf.call(parentNode.querySelectorAll(selector), this);
	  }, 'closest', function closest(selector) {
	    var parentNode = this,
	        matches;
	    while (
	    // document has no .matches
	    (matches = parentNode && parentNode.matches) && !parentNode.matches(selector)) {
	      parentNode = parentNode.parentNode;
	    }
	    return matches ? parentNode : null;
	  }, 'prepend', function prepend() {
	    var firstChild = this.firstChild,
	        node = mutationMacro(arguments);
	    if (firstChild) {
	      this.insertBefore(node, firstChild);
	    } else {
	      this.appendChild(node);
	    }
	  }, 'append', function append() {
	    this.appendChild(mutationMacro(arguments));
	  }, 'before', function before() {
	    var parentNode = this.parentNode;
	    if (parentNode) {
	      parentNode.insertBefore(mutationMacro(arguments), this);
	    }
	  }, 'after', function after() {
	    var parentNode = this.parentNode,
	        nextSibling = this.nextSibling,
	        node = mutationMacro(arguments);
	    if (parentNode) {
	      if (nextSibling) {
	        parentNode.insertBefore(node, nextSibling);
	      } else {
	        parentNode.appendChild(node);
	      }
	    }
	  },
	  // WARNING - DEPRECATED - use .replaceWith() instead
	  'replace', function replace() {
	    this.replaceWith.apply(this, arguments);
	  }, 'replaceWith', function replaceWith() {
	    var parentNode = this.parentNode;
	    if (parentNode) {
	      parentNode.replaceChild(mutationMacro(arguments), this);
	    }
	  }, 'remove', function remove() {
	    var parentNode = this.parentNode;
	    if (parentNode) {
	      parentNode.removeChild(this);
	    }
	  }, 'query', createQueryMethod('querySelector'), 'queryAll', createQueryMethod('querySelectorAll')], slice = properties.slice, i = properties.length; i; i -= 2) {
	    property = properties[i - 2];
	    if (!(property in ElementPrototype)) {
	      ElementPrototype[property] = properties[i - 1];
	    }
	    if (property === 'remove') {
	      // see https://github.com/WebReflection/dom4/issues/19
	      HTMLSelectElement.prototype[property] = function () {
	        return 0 < arguments.length ? selectRemove.apply(this, arguments) : ElementPrototype.remove.call(this);
	      };
	    }
	    // see https://github.com/WebReflection/dom4/issues/18
	    if (/^(?:before|after|replace|replaceWith|remove)$/.test(property)) {
	      if (CharacterData && !(property in CharacterDataPrototype)) {
	        CharacterDataPrototype[property] = properties[i - 1];
	      }
	      if (DocumentType && !(property in DocumentTypePrototype)) {
	        DocumentTypePrototype[property] = properties[i - 1];
	      }
	    }
	    // see https://github.com/WebReflection/dom4/pull/26
	    if (/^(?:append|prepend)$/.test(property)) {
	      if (DocumentFragmentPrototype) {
	        if (!(property in DocumentFragmentPrototype)) {
	          DocumentFragmentPrototype[property] = properties[i - 1];
	        }
	      } else {
	        try {
	          createDocumentFragment().constructor.prototype[property] = properties[i - 1];
	        } catch (o_O) {}
	      }
	    }
	  }

	  // bring query and queryAll to the document too
	  addQueryAndAll(document);

	  // brings query and queryAll to fragments as well
	  if (DocumentFragmentPrototype) {
	    addQueryAndAll(DocumentFragmentPrototype);
	  } else {
	    try {
	      addQueryAndAll(createDocumentFragment().constructor.prototype);
	    } catch (o_O) {}
	  }

	  // bring query and queryAll to the ShadowRoot too
	  if (ShadowRoot) {
	    addQueryAndAll(ShadowRoot.prototype);
	  }

	  // most likely an IE9 only issue
	  // see https://github.com/WebReflection/dom4/issues/6
	  if (!createElement('a').matches('a')) {
	    ElementPrototype[property] = function (matches) {
	      return function (selector) {
	        return matches.call(this.parentNode ? this : createDocumentFragment().appendChild(this), selector);
	      };
	    }(ElementPrototype[property]);
	  }

	  // used to fix both old webkit and SVG
	  DOMTokenList.prototype = {
	    length: 0,
	    add: function add() {
	      for (var j = 0, token; j < arguments.length; j++) {
	        token = arguments[j];
	        if (!this.contains(token)) {
	          properties.push.call(this, property);
	        }
	      }
	      if (this._isSVG) {
	        this._.setAttribute('class', '' + this);
	      } else {
	        this._.className = '' + this;
	      }
	    },
	    contains: function (indexOf) {
	      return function contains(token) {
	        i = indexOf.call(this, property = verifyToken(token));
	        return -1 < i;
	      };
	    }([].indexOf || function (token) {
	      i = this.length;
	      while (i-- && this[i] !== token) {}
	      return i;
	    }),
	    item: function item(i) {
	      return this[i] || null;
	    },
	    remove: function remove() {
	      for (var j = 0, token; j < arguments.length; j++) {
	        token = arguments[j];
	        if (this.contains(token)) {
	          properties.splice.call(this, i, 1);
	        }
	      }
	      if (this._isSVG) {
	        this._.setAttribute('class', '' + this);
	      } else {
	        this._.className = '' + this;
	      }
	    },
	    toggle: toggle,
	    toString: function toString() {
	      return properties.join.call(this, SPACE);
	    }
	  };

	  if (SVGElement && !(CLASS_LIST in SVGElement.prototype)) {
	    defineProperty(SVGElement.prototype, CLASS_LIST, classListDescriptor);
	  }

	  // http://www.w3.org/TR/dom/#domtokenlist
	  // iOS 5.1 has completely screwed this property
	  // classList in ElementPrototype is false
	  // but it's actually there as getter
	  if (!(CLASS_LIST in document.documentElement)) {
	    defineProperty(ElementPrototype, CLASS_LIST, classListDescriptor);
	  } else {
	    // iOS 5.1 and Nokia ASHA do not support multiple add or remove
	    // trying to detect and fix that in here
	    TemporaryTokenList = createElement('div')[CLASS_LIST];
	    TemporaryTokenList.add('a', 'b', 'a');
	    if ('a\x20b' != TemporaryTokenList) {
	      // no other way to reach original methods in iOS 5.1
	      TemporaryPrototype = TemporaryTokenList.constructor.prototype;
	      if (!('add' in TemporaryPrototype)) {
	        // ASHA double fails in here
	        TemporaryPrototype = window.TemporaryTokenList.prototype;
	      }
	      wrapVerifyToken = function wrapVerifyToken(original) {
	        return function () {
	          var i = 0;
	          while (i < arguments.length) {
	            original.call(this, arguments[i++]);
	          }
	        };
	      };
	      TemporaryPrototype.add = wrapVerifyToken(TemporaryPrototype.add);
	      TemporaryPrototype.remove = wrapVerifyToken(TemporaryPrototype.remove);
	      // toggle is broken too ^_^ ... let's fix it
	      TemporaryPrototype.toggle = toggle;
	    }
	  }

	  if (!('contains' in NodePrototype)) {
	    defineProperty(NodePrototype, 'contains', {
	      value: function value(el) {
	        while (el && el !== this) {
	          el = el.parentNode;
	        }return this === el;
	      }
	    });
	  }

	  if (!('head' in document)) {
	    defineProperty(document, 'head', {
	      get: function get() {
	        return head || (head = document.getElementsByTagName('head')[0]);
	      }
	    });
	  }

	  // requestAnimationFrame partial polyfill
	  (function () {
	    for (var raf, rAF = window.requestAnimationFrame, cAF = window.cancelAnimationFrame, prefixes = ['o', 'ms', 'moz', 'webkit'], i = prefixes.length; !cAF && i--;) {
	      rAF = rAF || window[prefixes[i] + 'RequestAnimationFrame'];
	      cAF = window[prefixes[i] + 'CancelAnimationFrame'] || window[prefixes[i] + 'CancelRequestAnimationFrame'];
	    }
	    if (!cAF) {
	      // some FF apparently implemented rAF but no cAF
	      if (rAF) {
	        raf = rAF;
	        rAF = function rAF(callback) {
	          var goOn = true;
	          raf(function () {
	            if (goOn) callback.apply(this, arguments);
	          });
	          return function () {
	            goOn = false;
	          };
	        };
	        cAF = function cAF(id) {
	          id();
	        };
	      } else {
	        rAF = function rAF(callback) {
	          return setTimeout(callback, 15, 15);
	        };
	        cAF = function cAF(id) {
	          clearTimeout(id);
	        };
	      }
	    }
	    window.requestAnimationFrame = rAF;
	    window.cancelAnimationFrame = cAF;
	  })();

	  // http://www.w3.org/TR/dom/#customevent
	  try {
	    new window.CustomEvent('?');
	  } catch (o_O) {
	    window.CustomEvent = function (eventName, defaultInitDict) {

	      // the infamous substitute
	      function CustomEvent(type, eventInitDict) {
	        /*jshint eqnull:true */
	        var event = document.createEvent(eventName);
	        if (typeof type != 'string') {
	          throw new Error('An event name must be provided');
	        }
	        if (eventName == 'Event') {
	          event.initCustomEvent = initCustomEvent;
	        }
	        if (eventInitDict == null) {
	          eventInitDict = defaultInitDict;
	        }
	        event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
	        return event;
	      }

	      // attached at runtime
	      function initCustomEvent(type, bubbles, cancelable, detail) {
	        /*jshint validthis:true*/
	        this.initEvent(type, bubbles, cancelable);
	        this.detail = detail;
	      }

	      // that's it
	      return CustomEvent;
	    }(
	    // is this IE9 or IE10 ?
	    // where CustomEvent is there
	    // but not usable as construtor ?
	    window.CustomEvent ?
	    // use the CustomEvent interface in such case
	    'CustomEvent' : 'Event',
	    // otherwise the common compatible one
	    {
	      bubbles: false,
	      cancelable: false,
	      detail: null
	    });
	  }

	  // window.Event as constructor
	  try {
	    new Event('_');
	  } catch (o_O) {
	    /* jshint -W022 */
	    o_O = function ($Event) {
	      function Event(type, init) {
	        enoughArguments(arguments.length, 'Event');
	        var out = document.createEvent('Event');
	        if (!init) init = {};
	        out.initEvent(type, !!init.bubbles, !!init.cancelable);
	        return out;
	      }
	      Event.prototype = $Event.prototype;
	      return Event;
	    }(window.Event || function Event() {});
	    defineProperty(window, 'Event', { value: o_O });
	    // Android 4 gotcha
	    if (Event !== o_O) Event = o_O;
	  }

	  // window.KeyboardEvent as constructor
	  try {
	    new KeyboardEvent('_', {});
	  } catch (o_O) {
	    /* jshint -W022 */
	    o_O = function ($KeyboardEvent) {
	      // code inspired by https://gist.github.com/termi/4654819
	      var initType = 0,
	          defaults = {
	        char: '',
	        key: '',
	        location: 0,
	        ctrlKey: false,
	        shiftKey: false,
	        altKey: false,
	        metaKey: false,
	        altGraphKey: false,
	        repeat: false,
	        locale: navigator.language,
	        detail: 0,
	        bubbles: false,
	        cancelable: false,
	        keyCode: 0,
	        charCode: 0,
	        which: 0
	      },
	          eventType;
	      try {
	        var e = document.createEvent('KeyboardEvent');
	        e.initKeyboardEvent('keyup', false, false, window, '+', 3, true, false, true, false, false);
	        initType = (e.keyIdentifier || e.key) == '+' && (e.keyLocation || e.location) == 3 && (e.ctrlKey ? e.altKey ? 1 : 3 : e.shiftKey ? 2 : 4) || 9;
	      } catch (o_O) {}
	      eventType = 0 < initType ? 'KeyboardEvent' : 'Event';

	      function getModifier(init) {
	        for (var out = [], keys = ['ctrlKey', 'Control', 'shiftKey', 'Shift', 'altKey', 'Alt', 'metaKey', 'Meta', 'altGraphKey', 'AltGraph'], i = 0; i < keys.length; i += 2) {
	          if (init[keys[i]]) out.push(keys[i + 1]);
	        }
	        return out.join(' ');
	      }

	      function withDefaults(target, source) {
	        for (var key in source) {
	          if (source.hasOwnProperty(key) && !source.hasOwnProperty.call(target, key)) target[key] = source[key];
	        }
	        return target;
	      }

	      function withInitValues(key, out, init) {
	        try {
	          out[key] = init[key];
	        } catch (o_O) {}
	      }

	      function KeyboardEvent(type, init) {
	        enoughArguments(arguments.length, 'KeyboardEvent');
	        init = withDefaults(init || {}, defaults);
	        var out = document.createEvent(eventType),
	            ctrlKey = init.ctrlKey,
	            shiftKey = init.shiftKey,
	            altKey = init.altKey,
	            metaKey = init.metaKey,
	            altGraphKey = init.altGraphKey,
	            modifiers = initType > 3 ? getModifier(init) : null,
	            key = String(init.key),
	            chr = String(init.char),
	            location = init.location,
	            keyCode = init.keyCode || (init.keyCode = key) && key.charCodeAt(0) || 0,
	            charCode = init.charCode || (init.charCode = chr) && chr.charCodeAt(0) || 0,
	            bubbles = init.bubbles,
	            cancelable = init.cancelable,
	            repeat = init.repeat,
	            locale = init.locale,
	            view = init.view || window,
	            args;
	        if (!init.which) init.which = init.keyCode;
	        if ('initKeyEvent' in out) {
	          out.initKeyEvent(type, bubbles, cancelable, view, ctrlKey, altKey, shiftKey, metaKey, keyCode, charCode);
	        } else if (0 < initType && 'initKeyboardEvent' in out) {
	          args = [type, bubbles, cancelable, view];
	          switch (initType) {
	            case 1:
	              args.push(key, location, ctrlKey, shiftKey, altKey, metaKey, altGraphKey);
	              break;
	            case 2:
	              args.push(ctrlKey, altKey, shiftKey, metaKey, keyCode, charCode);
	              break;
	            case 3:
	              args.push(key, location, ctrlKey, altKey, shiftKey, metaKey, altGraphKey);
	              break;
	            case 4:
	              args.push(key, location, modifiers, repeat, locale);
	              break;
	            default:
	              args.push(char, key, location, modifiers, repeat, locale);
	          }
	          out.initKeyboardEvent.apply(out, args);
	        } else {
	          out.initEvent(type, bubbles, cancelable);
	        }
	        for (key in out) {
	          if (defaults.hasOwnProperty(key) && out[key] !== init[key]) {
	            withInitValues(key, out, init);
	          }
	        }
	        return out;
	      }
	      KeyboardEvent.prototype = $KeyboardEvent.prototype;
	      return KeyboardEvent;
	    }(window.KeyboardEvent || function KeyboardEvent() {});
	    defineProperty(window, 'KeyboardEvent', { value: o_O });
	    // Android 4 gotcha
	    if (KeyboardEvent !== o_O) KeyboardEvent = o_O;
	  }

	  // window.MouseEvent as constructor
	  try {
	    new MouseEvent('_', {});
	  } catch (o_O) {
	    /* jshint -W022 */
	    o_O = function ($MouseEvent) {
	      function MouseEvent(type, init) {
	        enoughArguments(arguments.length, 'MouseEvent');
	        var out = document.createEvent('MouseEvent');
	        if (!init) init = {};
	        out.initMouseEvent(type, !!init.bubbles, !!init.cancelable, init.view || window, init.detail || 1, init.screenX || 0, init.screenY || 0, init.clientX || 0, init.clientY || 0, !!init.ctrlKey, !!init.altKey, !!init.shiftKey, !!init.metaKey, init.button || 0, init.relatedTarget || null);
	        return out;
	      }
	      MouseEvent.prototype = $MouseEvent.prototype;
	      return MouseEvent;
	    }(window.MouseEvent || function MouseEvent() {});
	    defineProperty(window, 'MouseEvent', { value: o_O });
	    // Android 4 gotcha
	    if (MouseEvent !== o_O) MouseEvent = o_O;
	  }
	})(window);(function (global) {
	  'use strict';

	  // a WeakMap fallback for DOM nodes only used as key

	  var DOMMap = global.WeakMap || function () {

	    var counter = 0,
	        dispatched = false,
	        drop = false,
	        value;

	    function dispatch(key, ce, shouldDrop) {
	      drop = shouldDrop;
	      dispatched = false;
	      value = undefined;
	      key.dispatchEvent(ce);
	    }

	    function Handler(value) {
	      this.value = value;
	    }

	    Handler.prototype.handleEvent = function handleEvent(e) {
	      dispatched = true;
	      if (drop) {
	        e.currentTarget.removeEventListener(e.type, this, false);
	      } else {
	        value = this.value;
	      }
	    };

	    function DOMMap() {
	      counter++; // make id clashing highly improbable
	      this.__ce__ = new Event('@DOMMap:' + counter + Math.random());
	    }

	    DOMMap.prototype = {
	      'constructor': DOMMap,
	      'delete': function del(key) {
	        return dispatch(key, this.__ce__, true), dispatched;
	      },
	      'get': function get(key) {
	        dispatch(key, this.__ce__, false);
	        var v = value;
	        value = undefined;
	        return v;
	      },
	      'has': function has(key) {
	        return dispatch(key, this.__ce__, false), dispatched;
	      },
	      'set': function set(key, value) {
	        dispatch(key, this.__ce__, true);
	        key.addEventListener(this.__ce__.type, new Handler(value), false);
	        return this;
	      }
	    };

	    return DOMMap;
	  }();

	  function Dict() {}
	  Dict.prototype = (Object.create || Object)(null);

	  // https://dom.spec.whatwg.org/#interface-eventtarget

	  function createEventListener(type, callback, options) {
	    function eventListener(e) {
	      if (eventListener.once) {
	        e.currentTarget.removeEventListener(e.type, callback, eventListener);
	        eventListener.removed = true;
	      }
	      if (eventListener.passive) {
	        e.preventDefault = createEventListener.preventDefault;
	      }
	      if (typeof eventListener.callback === 'function') {
	        /* jshint validthis: true */
	        eventListener.callback.call(this, e);
	      } else if (eventListener.callback) {
	        eventListener.callback.handleEvent(e);
	      }
	      if (eventListener.passive) {
	        delete e.preventDefault;
	      }
	    }
	    eventListener.type = type;
	    eventListener.callback = callback;
	    eventListener.capture = !!options.capture;
	    eventListener.passive = !!options.passive;
	    eventListener.once = !!options.once;
	    // currently pointless but specs say to use it, so ...
	    eventListener.removed = false;
	    return eventListener;
	  }

	  createEventListener.preventDefault = function preventDefault() {};

	  var Event = global.CustomEvent,
	      hOP = Object.prototype.hasOwnProperty,
	      dE = global.dispatchEvent,
	      aEL = global.addEventListener,
	      rEL = global.removeEventListener,
	      counter = 0,
	      increment = function increment() {
	    counter++;
	  },
	      indexOf = [].indexOf || function indexOf(value) {
	    var length = this.length;
	    while (length--) {
	      if (this[length] === value) {
	        break;
	      }
	    }
	    return length;
	  },
	      getListenerKey = function getListenerKey(options) {
	    return ''.concat(options.capture ? '1' : '0', options.passive ? '1' : '0', options.once ? '1' : '0');
	  },
	      augment,
	      proto;

	  try {
	    aEL('_', increment, { once: true });
	    dE(new Event('_'));
	    dE(new Event('_'));
	    rEL('_', increment, { once: true });
	  } catch (o_O) {}

	  if (counter !== 1) {
	    (function () {
	      var dm = new DOMMap();
	      function createAEL(aEL) {
	        return function addEventListener(type, handler, options) {
	          if (options && typeof options !== 'boolean') {
	            var info = dm.get(this),
	                key = getListenerKey(options),
	                i,
	                tmp,
	                wrap;
	            if (!info) dm.set(this, info = new Dict());
	            if (!(type in info)) info[type] = {
	              handler: [],
	              wrap: []
	            };
	            tmp = info[type];
	            i = indexOf.call(tmp.handler, handler);
	            if (i < 0) {
	              i = tmp.handler.push(handler) - 1;
	              tmp.wrap[i] = wrap = new Dict();
	            } else {
	              wrap = tmp.wrap[i];
	            }
	            if (!(key in wrap)) {
	              wrap[key] = createEventListener(type, handler, options);
	              aEL.call(this, type, wrap[key], wrap[key].capture);
	            }
	          } else {
	            aEL.call(this, type, handler, options);
	          }
	        };
	      }
	      function createREL(rEL) {
	        return function removeEventListener(type, handler, options) {
	          if (options && typeof options !== 'boolean') {
	            var info = dm.get(this),
	                key,
	                i,
	                tmp,
	                wrap;
	            if (info && type in info) {
	              tmp = info[type];
	              i = indexOf.call(tmp.handler, handler);
	              if (-1 < i) {
	                key = getListenerKey(options);
	                wrap = tmp.wrap[i];
	                if (key in wrap) {
	                  rEL.call(this, type, wrap[key], wrap[key].capture);
	                  delete wrap[key];
	                  // return if there are other wraps
	                  for (key in wrap) {
	                    return;
	                  } // otherwise remove all the things
	                  tmp.handler.splice(i, 1);
	                  tmp.wrap.splice(i, 1);
	                  // if there are no other handlers
	                  if (tmp.handler.length === 0)
	                    // drop the info[type] entirely
	                    delete info[type];
	                }
	              }
	            }
	          } else {
	            rEL.call(this, type, handler, options);
	          }
	        };
	      }

	      augment = function augment(Constructor) {
	        if (!Constructor) return;
	        var proto = Constructor.prototype;
	        proto.addEventListener = createAEL(proto.addEventListener);
	        proto.removeEventListener = createREL(proto.removeEventListener);
	      };

	      if (global.EventTarget) {
	        augment(EventTarget);
	      } else {
	        augment(global.Text);
	        augment(global.Element || global.HTMLElement);
	        augment(global.HTMLDocument);
	        augment(global.Window || { prototype: global });
	        augment(global.XMLHttpRequest);
	      }
	    })();
	  }
	})(self);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _DOMTransform = __webpack_require__(32);

	var _DOMTransform2 = _interopRequireDefault(_DOMTransform);

	var _fromXML = __webpack_require__(35);

	var _fromXML2 = _interopRequireDefault(_fromXML);

	var _documentskip = __webpack_require__(36);

	var _documentskip2 = _interopRequireDefault(_documentskip);

	var _whitespacefilter = __webpack_require__(37);

	var _whitespacefilter2 = _interopRequireDefault(_whitespacefilter);

	var _commentfilter = __webpack_require__(38);

	var _commentfilter2 = _interopRequireDefault(_commentfilter);

	var _all = __webpack_require__(39);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var scope = document.body;

	_all.components.forEach(function (Component) {
	  return Component.attachTo(scope);
	});

	_all.templates.push(_documentskip2.default, _whitespacefilter2.default, _commentfilter2.default);

	var xml = __webpack_require__(198);
	var showcase = _DOMTransform2.default.transform((0, _fromXML2.default)(xml), _all.templates);

	scope.append(showcase);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fromDOM = __webpack_require__(33);

	var _fromDOM2 = _interopRequireDefault(_fromDOM);

	var _toDOM = __webpack_require__(34);

	var _toDOM2 = _interopRequireDefault(_toDOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class DOMTransform
	 */

	var DOMTransform = function () {
	    function DOMTransform() {
	        var _this = this;

	        _classCallCheck(this, DOMTransform);

	        this.nodes = {
	            element: function element(_element, params) {
	                var transform = _this.elements[_element.element] || _this.elements[''];
	                if (!_element.attributes) _element.attributes = {};
	                return transform.call(_this, _element, params);
	            },
	            text: function text(_text) {
	                return _text;
	            },
	            comment: function comment(_comment) {
	                return _comment;
	            },
	            document: function document(_document) {
	                return _document;
	            },
	            doctype: function doctype(_doctype) {
	                return _doctype;
	            }
	        };
	        this.elements = {
	            '': function _(_ref, params) {
	                var element = _ref.element;
	                var attributes = _ref.attributes;
	                var content = _ref.content;
	                return {
	                    element: element,
	                    attributes: attributes,
	                    content: _this.apply(content, params)
	                };
	            }
	        };
	    }

	    /**
	     * Registers node template
	     * @param {String} name Transform name
	     * @param {Function} transform Transform function
	     */


	    _createClass(DOMTransform, [{
	        key: 'node',
	        value: function node(name, transform) {
	            this.nodes[name] = transform;
	        }

	        /**
	         * Registers element template
	         * @param {String} name Template name
	         * @param {Function} transform Transform function
	         */

	    }, {
	        key: 'element',
	        value: function element(name, transform) {
	            this.elements[name] = transform;
	        }

	        /**
	         * Applies registered templates to DON-tree
	         * @param {Object|Array} object Root input DON-tree object
	         * @param {Object} [params] Additional parameters
	         * @returns {Object|Array} don Root resulting DON-tree object
	         */

	    }, {
	        key: 'apply',
	        value: function apply(object, params) {
	            if (!object) {
	                return null;
	            } else if (Array.isArray(object)) {
	                var result = [];
	                for (var i = 0; i < object.length; i++) {
	                    var item = void 0;
	                    if (item = this.apply(object[i], params)) result.push(item);
	                }
	                return result;
	            } else {
	                var name = typeof object === 'string' ? 'text' : object.element ? 'element' : object.node,
	                    transform = this.nodes[name];
	                if (transform) return transform.call(this, object, params);
	            }
	            throw Error('Match failed');
	        }

	        /**
	         * Applies registered templates to given DOM/DON-tree and builds a new DOM-tree
	         * @param {Node|Object} input Root input DOM/DON-tree node/object
	         * @returns {Node} Resulting DOM-tree root node
	         */

	    }, {
	        key: 'transform',
	        value: function transform(input) {
	            return (0, _toDOM2.default)(this.apply(input instanceof Node ? (0, _fromDOM2.default)(input) : input));
	        }

	        /**
	         * Registers all given templates
	         * @param {Array} templates The array of template registering functions
	         */

	    }, {
	        key: 'templates',
	        value: function templates() {
	            var _this2 = this;

	            for (var _len = arguments.length, _templates = Array(_len), _key = 0; _key < _len; _key++) {
	                _templates[_key] = arguments[_key];
	            }

	            _templates.forEach(function (template) {
	                return template(_this2);
	            });
	        }

	        /**
	         * Applies given templates to given DOM/DON-tree and builds a new DOM-tree
	         * @param {Node|Object} input Root input DOM/DON-tree node/object
	         * @param {Array} templates The array of template registering functions
	         * @returns {Node} Resulting DOM-tree root node
	         */

	    }], [{
	        key: 'transform',
	        value: function transform(input, templates) {
	            var domTransform = new DOMTransform();
	            domTransform.templates.apply(domTransform, _toConsumableArray(templates));
	            return domTransform.transform(input);
	        }
	    }]);

	    return DOMTransform;
	}();

	exports.default = DOMTransform;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Converts DOM-tree to DON-tree
	 * @param {Node} node root DOM-node
	 * @returns {Object} Document object notaion
	 */
	var fromDOM = function fromDOM(node) {
	    switch (node.nodeType) {
	        case ELEMENT_NODE:
	            return {
	                node: 'element',
	                element: node.tagName,
	                attributes: reduce.call(node.attributes, function (res, attr) {
	                    res[attr.name] = attr.value;
	                    return res;
	                }, {}),
	                content: processChildNodes(node)
	            };
	        case TEXT_NODE:
	            return {
	                node: 'text',
	                content: node.textContent
	            };
	        case COMMENT_NODE:
	            return {
	                node: 'comment',
	                content: node.textContent
	            };
	        case DOCUMENT_NODE:
	            return {
	                node: 'document',
	                content: processChildNodes(node)
	            };
	        case DOCUMENT_TYPE_NODE:
	            return {
	                node: 'doctype',
	                name: node.name
	            };
	        default:
	            throw Error('Unsupported node');
	    }
	};

	var map = Array.prototype.map;
	var reduce = Array.prototype.reduce;

	var processChildNodes = function processChildNodes(node) {
	    return map.call(node.childNodes, function (child) {
	        return fromDOM(child);
	    });
	};

	var _Node = Node;
	var ELEMENT_NODE = _Node.ELEMENT_NODE;
	var TEXT_NODE = _Node.TEXT_NODE;
	var COMMENT_NODE = _Node.COMMENT_NODE;
	var DOCUMENT_NODE = _Node.DOCUMENT_NODE;
	var DOCUMENT_TYPE_NODE = _Node.DOCUMENT_TYPE_NODE;
	exports.default = fromDOM;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Converts DON-tree to DOM-tree
	 * @param {Object} object — source DON-tree root object
	 * @returns {Node} resulting DOM-tree root node
	 */
	var toDOM = function toDOM(object) {
	    if (Array.isArray(object)) {
	        return object.map(function (item) {
	            return toDOM(item);
	        });
	    }
	    if (typeof object === 'string') {
	        object = { node: 'text', content: object };
	    }
	    if (!object.node && object.element) {
	        object.node = 'element';
	    }
	    switch (object.node) {
	        case 'element':
	            var element = document.createElement(object.element);
	            var attributes = object.attributes;
	            var content = object.content;
	            if (attributes) {
	                Object.keys(attributes).forEach(function (name) {
	                    var value = attributes[name];
	                    if (typeof value === 'string') element.setAttribute(name, value);
	                });
	            }
	            if (content) processContent.call(element, content);
	            return element;
	        case 'text':
	            return document.createTextNode(object.content);
	        case 'comment':
	            return document.createComment(object.content);
	        case 'document':
	            return object.type === 'html' ? document.implementation.createHTMLDocument(object.title) : document.implementation.createDocument(object.namespaceURI || null, object.qualifiedNameStr, object.documentType || null);
	        case 'doctype':
	            return document.implementation.createDocumentType(object.name, object.publicId, object.systemId);
	        default:
	            throw Error('Unsupported node');
	    }
	};

	var processContent = function processContent(content) {
	    var _this = this;

	    return Array.isArray(content) ? content.forEach(function (item) {
	        return processContent.call(_this, item);
	    }) : this.appendChild(toDOM(content));
	};

	exports.default = toDOM;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fromDOM = __webpack_require__(33);

	var _fromDOM2 = _interopRequireDefault(_fromDOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Converts XML-string to DON-tree
	 * @param {String} xml
	 * @returns {Object} Document object notation
	 */
	var fromXML = function fromXML(xml) {
	  var document = parser.parseFromString(xml, 'application/xml');
	  return (0, _fromDOM2.default)(document);
	};

	var parser = new DOMParser();

	exports.default = fromXML;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.node('document', function (_ref) {
	        var content = _ref.content;

	        return this.apply(content[0]);
	    });
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.node('text', function (text) {
	        return (/^(\n\s*)+$/.test(text.content) ? null : text
	        );
	    });
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.node('comment', function () {
	        return null;
	    });
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var components = exports.components = [__webpack_require__(40), __webpack_require__(43), __webpack_require__(44), __webpack_require__(47), __webpack_require__(48), __webpack_require__(50), __webpack_require__(52), __webpack_require__(53), __webpack_require__(54), __webpack_require__(55), __webpack_require__(56), __webpack_require__(57), __webpack_require__(161), __webpack_require__(162), __webpack_require__(171), __webpack_require__(172), __webpack_require__(174), __webpack_require__(164)].map(function (module) {
	    return module.default;
	});

	var templates = exports.templates = [__webpack_require__(176), __webpack_require__(168), __webpack_require__(177), __webpack_require__(178), __webpack_require__(179), __webpack_require__(180), __webpack_require__(182), __webpack_require__(183), __webpack_require__(184), __webpack_require__(185), __webpack_require__(186), __webpack_require__(167), __webpack_require__(187), __webpack_require__(188), __webpack_require__(189), __webpack_require__(190), __webpack_require__(191), __webpack_require__(192), __webpack_require__(193), __webpack_require__(194), __webpack_require__(195), __webpack_require__(196), __webpack_require__(197), __webpack_require__(170)].map(function (module) {
	    return module.default;
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://www.w3.org/TR/wai-aria-1.1/#button
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://www.w3.org/TR/wai-aria-practices/#button
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Button = function (_Instance) {
	    _inherits(Button, _Instance);

	    function Button(element) {
	        _classCallCheck(this, Button);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this, element));

	        _this.on('keydown', _this.onKeyDown);
	        _this.on('keyup', _this.onKeyUp);
	        return _this;
	    }

	    _createClass(Button, [{
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var keyCode = event.keyCode;
	            if (keyCode === _keyCodes.ENTER) this.emit('click');
	            if (keyCode === _keyCodes.SPACE) {
	                event.preventDefault();
	                event.repeat || this.element.classList.add('active');
	            }
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(_ref) {
	            var keyCode = _ref.keyCode;

	            if (keyCode === _keyCodes.SPACE) {
	                this.element.classList.remove('active');
	                this.emit('click');
	            }
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(event) {
	            if (this.disabled === 'true') {
	                event.stopImmediatePropagation();
	                return;
	            }
	            if (this.pressed) {
	                this.pressed = String(this.pressed === 'false');
	                this.emit('change');
	            }
	            if (this.expanded) {
	                this.expanded = String(this.expanded === 'false');
	            }
	            if (this.type === 'submit') {
	                var form = this.element.closest('form');
	                if (form) form.dispatchEvent(new Event('submit', {
	                    bubbles: true,
	                    cancelable: true
	                }));
	            }
	            if (this.type === 'details') {
	                var element = this.element;
	                var details = document.getElementById(this.controls);
	                details.hidden = !details.hidden;
	                if (element.classList.contains('autohide')) {
	                    element.parentElement.removeChild(element);
	                }
	            }
	        }
	    }, {
	        key: 'focus',
	        value: function focus() {
	            this.element.focus();
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return _get(Object.getPrototypeOf(Button.prototype), 'disabled', this);
	        },
	        set: function set(disabled) {
	            _set(Object.getPrototypeOf(Button.prototype), 'disabled', disabled, this);
	            if (disabled === 'true') this.element.removeAttribute('tabindex');else this.element.tabIndex = 0;
	        }
	    }, {
	        key: 'pressed',
	        get: function get() {
	            return this.element.getAttribute('aria-pressed') || '';
	        },
	        set: function set(pressed) {
	            this.element.setAttribute('aria-pressed', pressed);
	        }
	    }, {
	        key: 'controls',
	        get: function get() {
	            return this.element.getAttribute('aria-controls') || '';
	        }
	    }, {
	        key: 'expanded',
	        get: function get() {
	            return this.element.getAttribute('aria-expanded') || '';
	        },
	        set: function set(expanded) {
	            this.element.setAttribute('aria-expanded', expanded);
	        }
	    }, {
	        key: 'text',
	        get: function get() {
	            return this.element.textContent;
	        },
	        set: function set(text) {
	            this.element.textContent = text;
	        }
	    }, {
	        key: 'type',
	        get: function get() {
	            return this.element.dataset.type;
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.element.dataset.value;
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('focus', function (_ref2) {
	                var target = _ref2.target;
	                return _this2.getInstance(target);
	            }, true);
	            node.addEventListener('click', function (event) {
	                var button = _this2.closestInstance(event.target);
	                if (button) button.onClick(event);
	            }, true);
	        }
	    }]);

	    return Button;
	}(_Instance3.default);

	exports.default = Button;

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * base concept
	 * https://www.w3.org/TR/wai-aria-1.1/#roletype
	 * https://www.w3.org/TR/dom/#element
	 *
	 * id
	 * https://www.w3.org/TR/wai-aria-1.1/#valuetype_idref
	 * https://www.w3.org/TR/html5/dom.html#the-id-attribute
	 *
	 * hidden
	 * https://www.w3.org/TR/wai-aria-1.1/#aria-hidden
	 * https://www.w3.org/TR/wai-aria-1.1/#dfn-hidden
	 * https://www.w3.org/TR/html5/editing.html#the-hidden-attribute
	 *
	 * disabled
	 * https://www.w3.org/TR/wai-aria-1.1/#aria-disabled
	 * https://www.w3.org/TR/html5/forms.html#attr-fe-disabled
	 *
	 * events
	 * https://www.w3.org/TR/dom/#events
	 */

	Object.defineProperty(Element.prototype, 'instance', {
	    enumerable: true,
	    writable: true,
	    value: null
	});

	var map = Array.prototype.map;

	var Instance = function () {
	    /**
	     * The base instance from which all other instances in this taxonomy inherit
	     * @param {Element} element root element node
	     */

	    function Instance(element) {
	        _classCallCheck(this, Instance);

	        element.instance = this;
	        this.element = element;
	    }

	    /**
	     * Get unique identifier
	     * @returns {String}
	     */


	    _createClass(Instance, [{
	        key: 'on',


	        /**
	         * Add event listener
	         * @param {String} type event type
	         * @param {Function} listener event listener
	         * @param {Object} [context] event listener context
	         * @returns {Instance} this
	         */
	        value: function on(type, listener, context) {
	            this.element.addEventListener(type, listener.bind(context || this));
	            return this;
	        }

	        /**
	         * Dispatch an event
	         * @param {String} type event type;
	         * @returns {Instance} this
	         */

	    }, {
	        key: 'emit',
	        value: function emit(type) {
	            this.element.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
	            return this;
	        }

	        /**
	         * Find the first descendant instance of the specified class
	         * @param {Instance} Class target instance class
	         * @param {Function} [filter] function
	         * @returns {Instance|null}
	         */

	    }, {
	        key: 'find',
	        value: function find(Class, filter) {
	            return filter ? this.findAll(Class, filter)[0] || null : Class.getInstance(this.element.querySelector('[data-instance=' + Class.name + ']'));
	        }

	        /**
	         * Find all descendant instances of the specified class
	         * @param {Instance} Class target instance class
	         * @param {Function} [filter] function
	         * @returns {Array} array of found instances
	         */

	    }, {
	        key: 'findAll',
	        value: function findAll(Class, filter) {
	            var result = map.call(this.element.querySelectorAll('[data-instance=' + Class.name + ']'), function (element) {
	                return Class.getInstance(element);
	            });
	            return filter ? result.filter(filter) : result;
	        }

	        /**
	         * Find the nearest ancestor instance of the specified class
	         * @param {Instance} Class target instance class
	         * @param {Function} [filter] function
	         * @returns {Instance} found instance
	         */

	    }, {
	        key: 'closest',
	        value: function closest(Class, filter) {
	            var instance = this;
	            do {
	                instance = Class.getInstance(instance.element.parentElement.closest('[data-instance=' + Class.name + ']'));
	            } while (instance && filter && !filter(instance));
	            return instance;
	        }

	        /**
	         * Create if needed and return the instance of the specified element
	         * @param {Element} element root element node of target instance
	         * @returns {Instance|null}
	         */

	    }, {
	        key: 'id',
	        get: function get() {
	            return this.element.id || '';
	        }

	        /**
	         * Get hidden state
	         * @returns {String}
	         */

	    }, {
	        key: 'hidden',
	        get: function get() {
	            return String(this.element.hidden);
	        }

	        /**
	         * Set hidden state
	         * @param {String} hidden state
	         */
	        ,
	        set: function set(hidden) {
	            this.element.hidden = hidden === 'true';
	        }

	        /**
	         * Get disabled state
	         * @returns {String}
	         */

	    }, {
	        key: 'disabled',
	        get: function get() {
	            return this.element.getAttribute('aria-disabled') || 'false';
	        }

	        /**
	         * Set disabled state
	         * @param {String} disabled state
	         */
	        ,
	        set: function set(disabled) {
	            this.element.setAttribute('aria-disabled', disabled);
	        }
	    }], [{
	        key: 'getInstance',
	        value: function getInstance(element) {
	            return element && element.dataset && element.dataset.instance === this.name ? element.instance || new this(element) : null;
	        }

	        /**
	         * Create if needed and return the nearest ancestor instance of the specified element
	         * @param {Element} element node inside target instance
	         * @returns {Instance|null}
	         */

	    }, {
	        key: 'closestInstance',
	        value: function closestInstance(element) {
	            return this.getInstance(element.closest('[data-instance=' + this.name + ']'));
	        }

	        /**
	         * Delegate an event listener to the document node
	         * @param {String} type event type
	         * @param {Function} listener event listener
	         * @param {Object} [context] event listener context
	         */

	    }, {
	        key: 'on',
	        value: function on(type, listener, context) {
	            var _this = this;

	            document.addEventListener(type, function (event) {
	                var instance = (context || _this).closestInstance(event.target);
	                if (instance) listener.call(instance, event);
	            }, true);
	        }
	    }]);

	    return Instance;
	}();

	exports.default = Instance;

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BACKSPACE = exports.BACKSPACE = 8;
	var TAB = exports.TAB = 9;
	var ENTER = exports.ENTER = 13;
	var ESCAPE = exports.ESCAPE = 27;
	var SPACE = exports.SPACE = 32;
	var ARROWS = exports.ARROWS = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
	var DIGITS = exports.DIGITS = Array.from(new Array(10)).map(function (v, i) {
	  return i + 48;
	});
	var LETTERS = exports.LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce(function (res, letter, i) {
	  return res[letter] = i + 65, res;
	}, {});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CheckBox = function (_Instance) {
	    _inherits(CheckBox, _Instance);

	    function CheckBox(element) {
	        _classCallCheck(this, CheckBox);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckBox).call(this, element));

	        _this.input = _this.getInput();
	        _this.on('click', _this.onClick);
	        _this.on('keydown', _this.onKeyDown);
	        _this.on('keyup', _this.onKeyUp);
	        return _this;
	    }

	    _createClass(CheckBox, [{
	        key: 'getInput',
	        value: function getInput() {
	            var element = this.element;
	            var input = element.querySelector('input');
	            if (!input) {
	                var dataset = element.dataset;
	                input = document.createElement('input');
	                input.type = 'hidden';
	                input.name = dataset.name || '';
	                input.value = dataset.value || '';
	                if (this.checked === 'true') element.appendChild(input);
	            }
	            return input;
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            if (event.keyCode === _keyCodes.SPACE && !event.repeat) {
	                event.preventDefault();
	                this.element.classList.add('active');
	            }
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(_ref) {
	            var keyCode = _ref.keyCode;

	            if (keyCode === _keyCodes.SPACE) {
	                this.element.classList.remove('active');
	                this.emit('click');
	            }
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(event) {
	            if (this.disabled === 'true') event.stopImmediatePropagation();else {
	                this.checked = String(this.checked === 'false');
	                this.emit('change');
	            }
	        }
	    }, {
	        key: 'focus',
	        value: function focus() {
	            this.element.focus();
	        }
	    }, {
	        key: 'checked',
	        get: function get() {
	            return this.element.getAttribute('aria-checked') || 'false';
	        },
	        set: function set(checked) {
	            var element = this.element;
	            var input = this.input;

	            element.setAttribute('aria-checked', checked);
	            if (checked === 'true') element.appendChild(input);else element.removeChild(input);
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return _get(Object.getPrototypeOf(CheckBox.prototype), 'disabled', this);
	        },
	        set: function set(disabled) {
	            var element = this.element;
	            element.setAttribute('aria-disabled', disabled);
	            if (this.input.disabled = disabled === 'true') element.removeAttribute('tabindex');else element.tabIndex = 0;
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.input.value;
	        },
	        set: function set(value) {
	            this.input.value = value;
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('focus', function (_ref2) {
	                var target = _ref2.target;
	                return _this2.getInstance(target);
	            }, true);
	        }
	    }]);

	    return CheckBox;
	}(_Instance3.default);

	exports.default = CheckBox;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _MenuItem = __webpack_require__(45);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Menu = function (_Instance) {
	    _inherits(Menu, _Instance);

	    function Menu() {
	        _classCallCheck(this, Menu);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).apply(this, arguments));
	    }

	    _createClass(Menu, [{
	        key: 'items',
	        get: function get() {
	            return this.findAll(_MenuItem2.default);
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            _MenuItem2.default.attachTo(node);
	        }
	    }]);

	    return Menu;
	}(_Instance3.default);

	exports.default = Menu;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Menu = __webpack_require__(44);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Dialog = __webpack_require__(46);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuItem = function (_Instance) {
	    _inherits(MenuItem, _Instance);

	    function MenuItem(element) {
	        _classCallCheck(this, MenuItem);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuItem).call(this, element));

	        _this.menu = _this.closest(_Menu2.default);
	        _this.on('keydown', _this.onKeyDown);
	        _this.on('keyup', _this.onKeyUp);
	        _this.on('mouseleave', _this.onMouseLeave);
	        _this.on('click', _this.onClick);
	        return _this;
	    }

	    _createClass(MenuItem, [{
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var element = this.element;
	            var keyCode = event.keyCode;
	            if (keyCode === _keyCodes.ARROWS.UP || keyCode === _keyCodes.ARROWS.DOWN) {
	                event.preventDefault();
	                this.onArrowKeyDown(event);
	            } else if (keyCode === _keyCodes.SPACE && !event.repeat) {
	                event.preventDefault();
	                element.classList.add('active');
	            } else if (keyCode === _keyCodes.ENTER) {
	                if (!element.href) this.emit('click');
	            }
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(_ref) {
	            var keyCode = _ref.keyCode;

	            if (keyCode === _keyCodes.SPACE) {
	                var element = this.element;
	                element.classList.remove('active');
	                this.emit('click');
	                if (element.href) window.location.href = element.href;
	            }
	        }
	    }, {
	        key: 'onArrowKeyDown',
	        value: function onArrowKeyDown(_ref2) {
	            var keyCode = _ref2.keyCode;

	            var items = this.menu.items;
	            var direction = keyCode === _keyCodes.ARROWS.UP ? -1 : 1;
	            var index = items.indexOf(this) + direction;
	            if (index === items.length) index = 0;
	            if (index < 0) index = items.length - 1;
	            items[index].element.focus();
	        }
	    }, {
	        key: 'onMouseEnter',
	        value: function onMouseEnter() {
	            this.focus();
	        }
	    }, {
	        key: 'onMouseLeave',
	        value: function onMouseLeave() {
	            this.element.blur();
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick() {
	            if (this.type === 'dialog') {
	                var dialog = _Dialog2.default.getInstance(document.getElementById(this.controls));
	                dialog.trigger = this;
	                dialog.hidden = 'false';
	            }
	        }
	    }, {
	        key: 'focus',
	        value: function focus() {
	            this.element.focus();
	        }
	    }, {
	        key: 'type',
	        get: function get() {
	            return this.element.dataset.type || '';
	        }
	    }, {
	        key: 'controls',
	        get: function get() {
	            return this.element.getAttribute('aria-controls') || '';
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('mouseenter', function (event) {
	                var menuItem = _this2.getInstance(event.target);
	                if (menuItem) menuItem.onMouseEnter(event);
	            }, true);
	        }
	    }]);

	    return MenuItem;
	}(_Instance3.default);

	exports.default = MenuItem;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dialog = function (_Instance) {
	    _inherits(Dialog, _Instance);

	    function Dialog(element) {
	        _classCallCheck(this, Dialog);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog).call(this, element));

	        _this.trigger = null;
	        _this.on('click', _this.onClick);
	        _this.on('keydown', _this.onKeyDown);
	        if (_this.modal === 'true') _this.createBackdrop();
	        _this.onDocumentClick = _this.onDocumentClick.bind(_this);
	        _this.onDocumentFocus = _this.onDocumentFocus.bind(_this);
	        return _this;
	    }

	    _createClass(Dialog, [{
	        key: 'createBackdrop',
	        value: function createBackdrop() {
	            var element = this.element;
	            var backdrop = this.backdrop = document.createElement('div');
	            var div = document.createElement('div');
	            backdrop.className = 'backdrop';
	            backdrop.hidden = true;
	            element.hidden = false;
	            div.appendChild(element);
	            backdrop.appendChild(div);
	            document.body.appendChild(backdrop);
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(_ref) {
	            var target = _ref.target;

	            var dataset = target.dataset;
	            if (dataset.instance === 'Button' && dataset.type === 'close') this.hidden = 'true';
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var keyCode = event.keyCode;
	            if (keyCode === _keyCodes.ESCAPE && this.assertive === 'false') {
	                this.hidden = 'true';
	                if (this.trigger) this.trigger.focus();
	            }
	            if (keyCode === _keyCodes.TAB) this.onTabKeyDown(event);
	        }
	    }, {
	        key: 'onTabKeyDown',
	        value: function onTabKeyDown(event) {
	            var widgets = this.widgets;
	            var lastWidget = widgets[widgets.length - 1];
	            if (event.shiftKey && this.modal === 'true' && event.target === widgets[0]) {
	                event.preventDefault();
	                lastWidget.focus();
	            }
	            if (!event.shiftKey && event.target === lastWidget) {
	                event.preventDefault();
	                if (this.modal === 'true') widgets[0].focus();else if (this.trigger) this.trigger.focus();
	            }
	        }
	    }, {
	        key: 'onDocumentFocus',
	        value: function onDocumentFocus(_ref2) {
	            var target = _ref2.target;

	            if (!this.element.contains(target)) this.widgets[0].focus();
	        }
	    }, {
	        key: 'onDocumentClick',
	        value: function onDocumentClick(_ref3) {
	            var target = _ref3.target;

	            if (!this.element.contains(target) && !(this.trigger && this.trigger.element.contains(target))) {
	                this.hidden = 'true';
	            }
	        }
	    }, {
	        key: 'modal',
	        get: function get() {
	            return this.element.getAttribute('aria-modal') || 'false';
	        }
	    }, {
	        key: 'widgets',
	        get: function get() {
	            var iterator = document.createNodeIterator(this.element, NodeFilter.SHOW_ELEMENT, function (node) {
	                return node.tabIndex > -1 && !node.disabled ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
	            });
	            var widgets = [];
	            var node = void 0;
	            while (node = iterator.nextNode()) {
	                widgets.push(node);
	            }return widgets;
	        }
	    }, {
	        key: 'hidden',
	        get: function get() {
	            return String((this.backdrop || this.element).hidden);
	        },
	        set: function set(hidden) {
	            if (hidden !== this.hidden) {
	                if ((this.backdrop || this.element).hidden = hidden === 'true') {
	                    if (this.trigger) {
	                        this.trigger.expanded = 'false';
	                        this.trigger.focus();
	                        this.trigger = null;
	                    }
	                    if (this.assertive === 'false') document.removeEventListener('click', this.onDocumentClick);else if (this.modal === 'true') {
	                        document.removeEventListener('focus', this.onDocumentFocus, true);
	                    }
	                } else {
	                    if (this.assertive === 'false') document.addEventListener('click', this.onDocumentClick);
	                    if (this.modal === 'true') {
	                        if (this.assertive === 'true') {
	                            document.addEventListener('focus', this.onDocumentFocus, true);
	                        }
	                        var widgets = this.widgets;
	                        if (widgets.length) widgets[0].focus();
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'assertive',
	        get: function get() {
	            return this.element.dataset.assertive || 'false';
	        }
	    }]);

	    return Dialog;
	}(_Instance3.default);

	exports.default = Dialog;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Button2 = __webpack_require__(40);

	var _Button3 = _interopRequireDefault(_Button2);

	var _Menu = __webpack_require__(44);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuButton = function (_Button) {
	    _inherits(MenuButton, _Button);

	    function MenuButton(element) {
	        _classCallCheck(this, MenuButton);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuButton).call(this, element));

	        _this.menu = _Menu2.default.getInstance(document.getElementById(_this.controls));
	        _this.menu.on('keydown', _this.onMenuKeyDown, _this);
	        _this.menu.on('mouseleave', _this.onMenuMouseLeave, _this);
	        _this.onDocumentClick = _this.onDocumentClick.bind(_this);
	        _this.onDocumentFocus = _this.onDocumentFocus.bind(_this);
	        return _this;
	    }

	    _createClass(MenuButton, [{
	        key: 'onDocumentClick',
	        value: function onDocumentClick(_ref) {
	            var target = _ref.target;

	            if (!this.element.contains(target) && !this.menu.element.contains(target)) {
	                this.expanded = 'false';
	            }
	        }
	    }, {
	        key: 'onDocumentFocus',
	        value: function onDocumentFocus(_ref2) {
	            var target = _ref2.target;

	            if (target !== this.element && !this.menu.element.contains(target)) {
	                this.expanded = 'false';
	            }
	        }
	    }, {
	        key: 'onMenuKeyDown',
	        value: function onMenuKeyDown(_ref3) {
	            var keyCode = _ref3.keyCode;

	            if (keyCode === _keyCodes.ESCAPE) {
	                this.expanded = 'false';
	                this.focus();
	            }
	        }
	    }, {
	        key: 'onMenuMouseLeave',
	        value: function onMenuMouseLeave() {
	            // this.focus(); // FIXME
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            _get(Object.getPrototypeOf(MenuButton.prototype), 'onKeyDown', this).call(this, event);
	            var keyCode = event.keyCode;
	            if (keyCode === _keyCodes.ARROWS.DOWN || keyCode === _keyCodes.ARROWS.UP) {
	                if (this.expanded === 'false') this.expanded = 'true';
	                var items = this.menu.items;
	                items[keyCode === _keyCodes.ARROWS.DOWN ? 0 : items.length - 1].focus();
	                event.preventDefault();
	            }
	            if (keyCode === _keyCodes.ESCAPE) this.expanded = 'false';
	        }
	    }, {
	        key: 'expanded',
	        get: function get() {
	            return _get(Object.getPrototypeOf(MenuButton.prototype), 'expanded', this);
	        },
	        set: function set(expanded) {
	            _set(Object.getPrototypeOf(MenuButton.prototype), 'expanded', expanded, this);
	            this.menu.hidden = String(expanded === 'false');
	            if (expanded === 'true') {
	                document.addEventListener('click', this.onDocumentClick);
	                document.addEventListener('focus', this.onDocumentFocus, true);
	            } else {
	                document.removeEventListener('click', this.onDocumentClick);
	                document.removeEventListener('focus', this.onDocumentFocus, true);
	            }
	        }
	    }]);

	    return MenuButton;
	}(_Button3.default);

	exports.default = MenuButton;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Radio = __webpack_require__(49);

	var _Radio2 = _interopRequireDefault(_Radio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RadioGroup = function (_Instance) {
	    _inherits(RadioGroup, _Instance);

	    function RadioGroup(element) {
	        _classCallCheck(this, RadioGroup);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RadioGroup).call(this, element));

	        _this.input = element.querySelector('input') || document.createElement('input');
	        return _this;
	    }

	    _createClass(RadioGroup, [{
	        key: 'uncheck',
	        value: function uncheck() {
	            this.radios.forEach(function (radio) {
	                return radio.checked = 'false';
	            });
	        }
	    }, {
	        key: 'radios',
	        get: function get() {
	            return this.findAll(_Radio2.default);
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return _get(Object.getPrototypeOf(RadioGroup.prototype), 'disabled', this);
	        },
	        set: function set(value) {
	            var element = this.element;
	            var radios = this.radios;
	            var disabled = String(value);

	            if (this.input.disabled = disabled === 'true') {
	                element.setAttribute('aria-disabled', 'true');
	                radios.forEach(function (_ref) {
	                    var element = _ref.element;
	                    return element.removeAttribute('tabindex');
	                });
	            } else {
	                element.removeAttribute('aria-disabled');
	                var checked = void 0;
	                radios.forEach(function (radio) {
	                    radio.element.tabIndex = -1;
	                    if (radio.checked === 'true') checked = radio;
	                });
	                if (checked) checked.element.tabIndex = 0;else radios[0].element.tabIndex = 0;
	            }
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.input.value;
	        },
	        set: function set(value) {
	            this.input.value = value;
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            _Radio2.default.attachTo(node);
	        }
	    }]);

	    return RadioGroup;
	}(_Instance3.default);

	exports.default = RadioGroup;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _RadioGroup = __webpack_require__(48);

	var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ARROW_CODES = Object.values(_keyCodes.ARROWS);

	var Radio = function (_Instance) {
	    _inherits(Radio, _Instance);

	    function Radio(element) {
	        _classCallCheck(this, Radio);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Radio).call(this, element));

	        _this.group = _this.closest(_RadioGroup2.default);
	        _this.on('click', _this.onClick);
	        _this.on('keydown', _this.onKeyDown);
	        _this.on('keyup', _this.onKeyUp);
	        return _this;
	    }

	    _createClass(Radio, [{
	        key: 'onClick',
	        value: function onClick(event) {
	            if (this.disabled === 'true') event.stopImmediatePropagation();else {
	                this.group.uncheck();
	                this.checked = 'true';
	            }
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var keyCode = event.keyCode;
	            if (ARROW_CODES.includes(keyCode)) {
	                event.preventDefault();
	                this.onArrowKeyDown(event);
	            }
	            if (keyCode === _keyCodes.SPACE && !event.repeat) {
	                event.preventDefault();
	                this.element.classList.add('active');
	            }
	            if (keyCode === _keyCodes.ENTER) this.submitForm();
	        }
	    }, {
	        key: 'submitForm',
	        value: function submitForm() {
	            var form = this.element.closest('form');
	            if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(_ref) {
	            var keyCode = _ref.keyCode;

	            if (keyCode === _keyCodes.SPACE) {
	                var element = this.element;
	                element.classList.remove('active');
	                element.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
	            }
	        }
	    }, {
	        key: 'onArrowKeyDown',
	        value: function onArrowKeyDown(_ref2) {
	            var keyCode = _ref2.keyCode;

	            var group = this.group;
	            var radios = group.radios;
	            var direction = keyCode === _keyCodes.ARROWS.LEFT || keyCode === _keyCodes.ARROWS.UP ? -1 : 1;
	            var index = radios.indexOf(this) + direction;

	            if (index === radios.length) index = 0;
	            if (index < 0) index = radios.length - 1;

	            group.uncheck();
	            radios[index].checked = 'true';
	            radios[index].element.focus();
	        }
	    }, {
	        key: 'checked',
	        get: function get() {
	            return this.element.getAttribute('aria-checked') || 'false';
	        },
	        set: function set(checked) {
	            var element = this.element;
	            element.setAttribute('aria-checked', checked);
	            element.tabIndex = checked === 'true' ? 0 : -1;
	            this.group.value = this.value;
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return this.group.disabled === 'true' ? 'true' : _get(Object.getPrototypeOf(Radio.prototype), 'disabled', this);
	        },
	        set: function set(disabled) {
	            var element = this.element;
	            if (disabled === 'true') {
	                element.setAttribute('aria-disabled', 'true');
	                element.removeAttribute('tabindex');
	            } else {
	                element.removeAttribute('aria-disabled');
	                element.tabIndex = -1;
	            }
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.element.dataset.value;
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('focus', function (_ref3) {
	                var target = _ref3.target;
	                return _this2.getInstance(target);
	            }, true);
	        }
	    }]);

	    return Radio;
	}(_Instance3.default);

	exports.default = Radio;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Option = __webpack_require__(51);

	var _Option2 = _interopRequireDefault(_Option);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ARROW_CODES = Object.values(_keyCodes.ARROWS);

	var ListBox = function (_Instance) {
	    _inherits(ListBox, _Instance);

	    function ListBox(element) {
	        _classCallCheck(this, ListBox);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListBox).call(this, element));

	        _this.input = element.querySelector('input') || document.createElement('input');
	        _this.box = element.querySelector('.box');
	        _this.box.addEventListener('focus', function () {
	            return element.focus();
	        });
	        _this.on('keydown', _this.onKeyDown);
	        _this.on('keyup', _this.onKeyUp);
	        return _this;
	    }

	    _createClass(ListBox, [{
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var keyCode = event.keyCode;
	            if (ARROW_CODES.includes(keyCode)) {
	                event.preventDefault();
	                this.onArrowKeyDown(event);
	            }
	            if (keyCode === _keyCodes.SPACE) {
	                event.preventDefault();
	                this.onSpaceKeyDown(event);
	            }
	        }
	    }, {
	        key: 'onArrowKeyDown',
	        value: function onArrowKeyDown(_ref) {
	            var keyCode = _ref.keyCode;
	            var shiftKey = _ref.shiftKey;

	            var options = this.options;
	            var selectedOptions = this.selectedOptions;
	            var direction = keyCode === _keyCodes.ARROWS.LEFT || keyCode === _keyCodes.ARROWS.UP ? -1 : 1;
	            var selectedOption = selectedOptions[direction < 0 ? 0 : selectedOptions.length - 1];
	            var nextIndex = options.indexOf(selectedOption) + direction;

	            if (this.multiselectable === 'false') {
	                if (nextIndex === options.length) nextIndex = 0;
	                if (nextIndex < 0) nextIndex = options.length - 1;
	                this.options.forEach(function (option) {
	                    return option.selected = 'false';
	                });
	                options[nextIndex].selected = 'true';
	                this.scrollToSelected();
	            } /* else if(nextIndex >= 0 && nextIndex < options.length) {
	                 if(!shiftKey) this.options.forEach(option => option.selected = 'false');
	                 options[nextIndex].selected = 'true';
	                 this.scrollToSelected();
	              }*/
	        }
	    }, {
	        key: 'scrollToSelected',
	        value: function scrollToSelected() {
	            var box = this.box;
	            var option = this.selectedOption.element;
	            if (option.offsetTop < box.scrollTop || option.offsetTop + option.clientHeight > box.scrollTop + box.clientHeight) {
	                box.scrollTop = option.offsetTop + Math.floor((option.clientHeight - box.clientHeight) / 2);
	            }
	        }
	    }, {
	        key: 'onSpaceKeyDown',
	        value: function onSpaceKeyDown(_ref2) {
	            var repeat = _ref2.repeat;

	            if (!repeat) this.selectedOptions.forEach(function (option) {
	                return option.element.classList.add('active');
	            });
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(event) {
	            if (event.keyCode === _keyCodes.SPACE) this.onSpaceKeyUp(event);
	        }
	    }, {
	        key: 'onSpaceKeyUp',
	        value: function onSpaceKeyUp() {
	            if (this.find(_Option2.default, function (_ref3) {
	                var checked = _ref3.checked;
	                return checked;
	            })) {
	                this.checkedOptions = this.checkedOption === this.selectedOption ? [] : this.selectedOptions;
	            }
	            this.selectedOptions.forEach(function (option) {
	                return option.element.classList.remove('active');
	            });
	        }
	    }, {
	        key: 'onFocus',
	        value: function onFocus() {
	            if (!this.selectedOptions.length) this.options[0].selected = 'true';
	        }
	    }, {
	        key: 'options',
	        get: function get() {
	            return this.findAll(_Option2.default);
	        }
	    }, {
	        key: 'selectedOptions',
	        get: function get() {
	            return this.findAll(_Option2.default, function (_ref4) {
	                var selected = _ref4.selected;
	                return selected === 'true';
	            });
	        }
	    }, {
	        key: 'selectedOption',
	        get: function get() {
	            return this.selectedOptions[0];
	        }
	    }, {
	        key: 'checkedOptions',
	        get: function get() {
	            return this.findAll(_Option2.default, function (_ref5) {
	                var checked = _ref5.checked;
	                return checked === 'true';
	            });
	        },
	        set: function set(options) {
	            var value = this.value;
	            this.checkedOptions.forEach(function (option) {
	                return option.checked = 'false';
	            });
	            options.forEach(function (option) {
	                return option.checked = 'true';
	            });
	            /*
	            if(this.value !== value) {
	                this.emit('change');
	            }
	            */
	            this.emit('change');
	        }
	    }, {
	        key: 'checkedOption',
	        get: function get() {
	            return this.checkedOptions[0];
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.input.value;
	        },
	        set: function set(value) {
	            this.input.value = value;
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return this.element.getAttribute('aria-disabled') || 'false';
	        },
	        set: function set(disabled) {
	            var element = this.element;
	            if (this.input.disabled = disabled === 'true') {
	                element.setAttribute('aria-disabled', 'true');
	                element.removeAttribute('tabindex');
	            } else {
	                element.removeAttribute('aria-disabled');
	                element.tabIndex = 0;
	            }
	        }
	    }, {
	        key: 'multiselectable',
	        get: function get() {
	            return this.element.getAttribute('aria-multiselectable') || 'false';
	        }
	    }, {
	        key: 'activedescendant',
	        set: function set(id) {
	            this.element.setAttribute('aria-activedescendant', id);
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('focus', function (event) {
	                var listbox = _this2.getInstance(event.target);
	                if (listbox) listbox.onFocus(event);
	            }, true);
	            _Option2.default.attachTo(node);
	        }
	    }]);

	    return ListBox;
	}(_Instance3.default);

	exports.default = ListBox;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _ListBox = __webpack_require__(50);

	var _ListBox2 = _interopRequireDefault(_ListBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Option = function (_Instance) {
	    _inherits(Option, _Instance);

	    function Option(element) {
	        _classCallCheck(this, Option);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Option).call(this, element));

	        element.id || _this.generateId();
	        _this.listbox = _this.closest(_ListBox2.default);
	        _this.on('click', _this.onClick);
	        _this.on('mouseenter', _this.onMouseEnter);
	        return _this;
	    }

	    _createClass(Option, [{
	        key: 'generateId',
	        value: function generateId() {
	            var id = void 0;
	            do {
	                id = 'option' + Math.floor(Math.random() * 1e10);
	            } while (document.getElementById(id));
	            this.element.id = id;
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(event) {
	            if (this.disabled === 'true') event.stopImmediatePropagation();else if (this.checked) this.listbox.checkedOptions = this.checked === 'false' ? [this] : [];
	        }
	    }, {
	        key: 'onMouseEnter',
	        value: function onMouseEnter(_ref) {
	            var buttons = _ref.buttons;

	            if (buttons === 1 && this.multiselectable === 'true') {
	                this.selected = 'true';
	            }
	        }
	    }, {
	        key: 'onMouseDown',
	        value: function onMouseDown() {
	            if (this.disabled !== 'true') {
	                this.listbox.options.forEach(function (option) {
	                    return option.selected = 'false';
	                });
	                this.selected = 'true';
	            }
	        }
	    }, {
	        key: 'selected',
	        get: function get() {
	            return this.element.getAttribute('aria-selected') || '';
	        },
	        set: function set(selected) {
	            if (selected === 'true') {
	                /*const selectedOption = this.listbox.selectedOption;
	                if(selectedOption) selectedOption.selected = 'false';*/
	                this.listbox.activedescendant = this.element.id;
	                if (!this.checked) this.listbox.value = this.value;
	            }
	            this.element.setAttribute('aria-selected', selected);
	        }
	    }, {
	        key: 'checked',
	        get: function get() {
	            return this.element.getAttribute('aria-checked') || '';
	        },
	        set: function set(checked) {
	            this.element.setAttribute('aria-checked', checked);
	            this.listbox.value = this.value;
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return this.listbox.disabled || this.element.getAttribute('aria-disabled') || '';
	        },
	        set: function set(disabled) {
	            this.element.setAttribute('aria-disabled', disabled);
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.element.dataset.value;
	        }
	    }, {
	        key: 'text',
	        get: function get() {
	            return this.element.textContent;
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('mousedown', function (event) {
	                var option = _this2.getInstance(event.target);
	                if (option) option.onMouseDown(event);
	            }, true);
	        }
	    }]);

	    return Option;
	}(_Instance3.default);

	exports.default = Option;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Button = __webpack_require__(40);

	var _Button2 = _interopRequireDefault(_Button);

	var _ListBox = __webpack_require__(50);

	var _ListBox2 = _interopRequireDefault(_ListBox);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ARROW_CODES = Object.values(_keyCodes.ARROWS);

	var SelectBox = function (_Instance) {
	    _inherits(SelectBox, _Instance);

	    function SelectBox(element) {
	        _classCallCheck(this, SelectBox);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectBox).call(this, element));

	        _this.listbox = _this.find(_ListBox2.default);
	        _this.button = _this.find(_Button2.default);

	        _this.on('click', _this.onClick);
	        _this.on('keydown', _this.onKeyDown);
	        _this.on('keyup', _this.onKeyUp);

	        _this.listbox.on('change', _this.onListBoxChange, _this);

	        _this.onDocumentClick = _this.onDocumentClick.bind(_this);
	        _this.onDocumentFocus = _this.onDocumentFocus.bind(_this);
	        return _this;
	    }

	    _createClass(SelectBox, [{
	        key: 'onDocumentFocus',
	        value: function onDocumentFocus(_ref) {
	            var target = _ref.target;

	            if (!this.element.contains(target)) this.expanded = 'false';
	        }
	    }, {
	        key: 'onDocumentClick',
	        value: function onDocumentClick(_ref2) {
	            var target = _ref2.target;

	            if (!this.element.contains(target)) this.expanded = 'false';
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var keyCode = event.keyCode;
	            if (keyCode === _keyCodes.SPACE && !event.repeat) {
	                event.preventDefault();
	                this.onSpaceKeyDown(event);
	            }
	            if (ARROW_CODES.includes(keyCode)) {
	                event.preventDefault();
	                if (this.expanded === 'false') this.expanded = 'true';else this.listbox.onArrowKeyDown(event);
	            }
	            if (keyCode === _keyCodes.ESCAPE) this.expanded = 'false';
	        }
	    }, {
	        key: 'onSpaceKeyDown',
	        value: function onSpaceKeyDown(event) {
	            if (this.expanded === 'true') this.listbox.onSpaceKeyDown(event);else this.element.classList.add('active');
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(event) {
	            if (event.keyCode === _keyCodes.SPACE) {
	                if (this.expanded === 'true') {
	                    this.listbox.onSpaceKeyUp(event);
	                    this.expanded = 'false';
	                } else {
	                    this.element.classList.remove('active');
	                    this.emit('click');
	                }
	            }
	        }
	    }, {
	        key: 'onListBoxChange',
	        value: function onListBoxChange() {
	            this.button.text = (this.listbox.checkedOption || this.emptyoption).text;
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick() {
	            this.expanded = String(this.expanded === 'false');
	            this.element.focus();
	        }
	    }, {
	        key: 'expanded',
	        get: function get() {
	            return this.element.getAttribute('aria-expanded') || 'false';
	        },
	        set: function set(expanded) {
	            this.element.setAttribute('aria-expanded', expanded);
	            if (expanded === 'true') {
	                var listbox = this.listbox;
	                if (!listbox.selectedOption) listbox.options[0].selected = 'true';
	                document.addEventListener('click', this.onDocumentClick);
	                document.addEventListener('focus', this.onDocumentFocus, true);
	            } else {
	                document.removeEventListener('click', this.onDocumentClick);
	                document.removeEventListener('focus', this.onDocumentFocus, true);
	            }
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.listbox.value;
	        },
	        set: function set(value) {
	            this.listbox.value = value;
	        }
	    }, {
	        key: 'emptyoption',
	        get: function get() {
	            return JSON.parse(this.element.dataset.emptyoption);
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('focus', function (_ref3) {
	                var target = _ref3.target;
	                return _this2.getInstance(target);
	            }, true);
	        }
	    }]);

	    return SelectBox;
	}(_Instance3.default);

	exports.default = SelectBox;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Button = __webpack_require__(40);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//import { DISABLED, FOCUS } from 'tools/classnames';

	var DISABLED = 'disabled';
	var FOCUS = 'focus';

	var TextBox = function (_Instance) {
	    _inherits(TextBox, _Instance);

	    function TextBox(element) {
	        _classCallCheck(this, TextBox);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextBox).call(this, element));

	        _this.input = element.querySelector('input,textarea');
	        _this.input.addEventListener('blur', _this.onInputBlur.bind(_this));
	        _this.input.addEventListener('input', _this.onInputInput.bind(_this));
	        if (_this.hasclear === 'true') {
	            _this.clearbutton = _this.find(_Button2.default, function (button) {
	                return button.type === 'clear';
	            });
	        }
	        return _this;
	    }

	    _createClass(TextBox, [{
	        key: 'onClick',
	        value: function onClick(event) {
	            var button = _Button2.default.getInstance(event.target);
	            if (button) this.onButtonClick(event, button);
	        }
	    }, {
	        key: 'onInputInput',
	        value: function onInputInput() {
	            this.input.setAttribute('value', this.value);
	            if (this.hasclear === 'true') this.clearbutton.hidden = String(!this.value);
	        }
	    }, {
	        key: 'onButtonClick',
	        value: function onButtonClick(event, button) {
	            if (button.type === 'clear') this.clear();
	        }
	    }, {
	        key: 'onInputFocus',
	        value: function onInputFocus() {
	            this.element.classList.add(FOCUS);
	        }
	    }, {
	        key: 'onInputBlur',
	        value: function onInputBlur() {
	            this.element.classList.remove(FOCUS);
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.value = '';
	            this.clearbutton.hidden = 'true';
	        }
	    }, {
	        key: 'focus',
	        value: function focus() {
	            this.input.focus();
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return String(this.input.disabled);
	        },
	        set: function set(disabled) {
	            if (this.input.disabled = disabled === 'true') this.element.classList.add(DISABLED);else this.element.classList.remove(DISABLED);
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.input.value;
	        },
	        set: function set(value) {
	            this.input.value = value;
	            this.input.setAttribute('value', value);
	            if (this.hasclear === 'true') this.clearbutton.hidden = String(!value);
	        }
	    }, {
	        key: 'hasclear',
	        get: function get() {
	            return String(this.element.classList.contains('hasclear'));
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('focus', function (event) {
	                var target = event.target;
	                var tagName = target.tagName;
	                if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
	                    var instance = _this2.closestInstance(target);
	                    if (instance) instance.onInputFocus(event);
	                }
	            }, true);
	            node.addEventListener('click', function (event) {
	                var instance = _this2.closestInstance(event.target);
	                if (instance) instance.onClick(event);
	            });
	        }
	    }]);

	    return TextBox;
	}(_Instance3.default);

	exports.default = TextBox;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _TextBox2 = __webpack_require__(53);

	var _TextBox3 = _interopRequireDefault(_TextBox2);

	var _Button = __webpack_require__(40);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PasswordBox = function (_TextBox) {
	    _inherits(PasswordBox, _TextBox);

	    function PasswordBox() {
	        _classCallCheck(this, PasswordBox);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(PasswordBox).apply(this, arguments));
	    }

	    _createClass(PasswordBox, [{
	        key: 'onInputInput',
	        value: function onInputInput(event) {
	            _get(Object.getPrototypeOf(PasswordBox.prototype), 'onInputInput', this).call(this, event);
	            this.find(_Button2.default, function (button) {
	                return button.type === 'watch';
	            }).hidden = String(!this.value);
	        }
	    }, {
	        key: 'onButtonClick',
	        value: function onButtonClick(event, button) {
	            _get(Object.getPrototypeOf(PasswordBox.prototype), 'onButtonClick', this).call(this, event, button);
	            if (button.type === 'watch') this.watchmode = String(this.watchmode === 'false');
	        }
	    }, {
	        key: 'watchmode',
	        get: function get() {
	            return this.element.dataset.watchmode || 'false';
	        },
	        set: function set(watchmode) {
	            this.element.dataset.watchmode = watchmode;
	            this.input.type = watchmode === 'true' ? 'text' : 'password';
	        }
	    }]);

	    return PasswordBox;
	}(_TextBox3.default);

	exports.default = PasswordBox;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _TextBox2 = __webpack_require__(53);

	var _TextBox3 = _interopRequireDefault(_TextBox2);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NumberBox = function (_TextBox) {
	    _inherits(NumberBox, _TextBox);

	    function NumberBox(element) {
	        _classCallCheck(this, NumberBox);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumberBox).call(this, element));

	        element.addEventListener('focus', _this.onFocus.bind(_this), true);
	        _this.input.addEventListener('keydown', _this.onInputKeyDown.bind(_this));
	        return _this;
	    }

	    _createClass(NumberBox, [{
	        key: 'onButtonClick',
	        value: function onButtonClick(event, button) {
	            _get(Object.getPrototypeOf(NumberBox.prototype), 'onButtonClick', this).call(this, event, button);
	            if (button.type === 'shift') {
	                this.shiftValue(Number(button.value));
	                this.focus();
	            }
	        }
	    }, {
	        key: 'onFocus',
	        value: function onFocus() {
	            this.disabled === 'true' || this.element.classList.add('focus');
	        }
	    }, {
	        key: 'onInputInput',
	        value: function onInputInput(event) {
	            this.invalid = String(isNaN(Number(this.value)));
	        }
	    }, {
	        key: 'onInputKeyDown',
	        value: function onInputKeyDown(event) {
	            var keyCode = event.keyCode;
	            if (keyCode === _keyCodes.ARROWS.UP || keyCode === _keyCodes.ARROWS.DOWN) {
	                this.shiftValue(keyCode === _keyCodes.ARROWS.UP ? 1 : -1);
	                event.preventDefault();
	            }
	        }
	    }, {
	        key: 'shiftValue',
	        value: function shiftValue(step) {
	            var value = Number(this.value);
	            if (isNaN(value)) this.invalid = 'true';else this.value = String(value + step);
	        }
	    }, {
	        key: 'invalid',
	        get: function get() {
	            return this.element.getAttribute('aria-invalid') || 'false';
	        },
	        set: function set(invalid) {
	            this.element.setAttribute('aria-invalid', invalid);
	        }
	    }]);

	    return NumberBox;
	}(_TextBox3.default);

	exports.default = NumberBox;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _TextBox2 = __webpack_require__(53);

	var _TextBox3 = _interopRequireDefault(_TextBox2);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SearchBox = function (_TextBox) {
	    _inherits(SearchBox, _TextBox);

	    function SearchBox(element) {
	        _classCallCheck(this, SearchBox);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchBox).call(this, element));

	        _this.on('keydown', _this.onKeyDown);
	        return _this;
	    }

	    _createClass(SearchBox, [{
	        key: 'onKeyDown',
	        value: function onKeyDown(_ref) {
	            var keyCode = _ref.keyCode;

	            if (keyCode === _keyCodes.ESCAPE) {
	                this.value = '';
	                this.clear.hidden = true;
	            }
	        }
	    }]);

	    return SearchBox;
	}(_TextBox3.default);

	exports.default = SearchBox;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _NumberBox2 = __webpack_require__(55);

	var _NumberBox3 = _interopRequireDefault(_NumberBox2);

	var _moment = __webpack_require__(58);

	var _moment2 = _interopRequireDefault(_moment);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DIGIT_CODES = Object.values(_keyCodes.DIGITS);
	var SEMISPACE = ' ';
	var FORMAT = ['HH', ':', 'mm'].join(SEMISPACE);

	var TimeBox = function (_NumberBox) {
	    _inherits(TimeBox, _NumberBox);

	    function TimeBox(element) {
	        _classCallCheck(this, TimeBox);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimeBox).call(this, element));

	        _this.enterInProgress = false;
	        _this.input.addEventListener('click', _this.onInputClick.bind(_this));
	        return _this;
	    }

	    _createClass(TimeBox, [{
	        key: 'onInputFocus',
	        value: function onInputFocus(event) {
	            var _this2 = this;

	            _get(Object.getPrototypeOf(TimeBox.prototype), 'onInputFocus', this).call(this, event);
	            setTimeout(function () {
	                return _this2.range = _this2.range || 'hours';
	            }, 0);
	        }
	    }, {
	        key: 'onInputClick',
	        value: function onInputClick() {
	            this.range = this.input.selectionStart < 4 ? 'hours' : 'minutes';
	        }
	    }, {
	        key: 'onInputKeyDown',
	        value: function onInputKeyDown(event) {
	            _get(Object.getPrototypeOf(TimeBox.prototype), 'onInputKeyDown', this).call(this, event);
	            var keyCode = event.keyCode;
	            if (DIGIT_CODES.includes(keyCode)) this.onDigitKeyDown(event);
	            if (keyCode === _keyCodes.ARROWS.LEFT || keyCode === _keyCodes.ARROWS.RIGHT) {
	                this.range = keyCode === _keyCodes.ARROWS.LEFT ? 'hours' : 'minutes';
	                event.preventDefault();
	            }
	            if (keyCode === _keyCodes.BACKSPACE) {
	                this.value = '-- : --';
	                this.range = this.range;
	            }
	        }
	    }, {
	        key: 'onDigitKeyDown',
	        value: function onDigitKeyDown(_ref) {
	            var keyCode = _ref.keyCode;

	            var value = keyCode - _keyCodes.DIGITS[0];
	            if (this.range === 'hours') this.onHoursEnter(value);else this.onMinutesEnter(value);
	        }
	    }, {
	        key: 'onHoursEnter',
	        value: function onHoursEnter(value) {
	            var time = this.time;
	            if (this.enterInProgress) {
	                value = parseInt(parseInt(time.hours(), 10) + String(value), 10);
	                this.value = time.hours(Math.min(value, 23)).format(FORMAT);
	                this.range = 'minutes';
	            } else {
	                this.value = time.hours(value).format(FORMAT);
	                if (value < 3) {
	                    this.range = 'hours';
	                    this.enterInProgress = true;
	                } else this.range = 'minutes';
	            }
	        }
	    }, {
	        key: 'onMinutesEnter',
	        value: function onMinutesEnter(value) {
	            var time = this.time;
	            if (this.enterInProgress) {
	                value = parseInt(parseInt(time.minutes(), 10) + String(value), 10);
	                this.value = time.minutes(Math.min(value, 59)).format(FORMAT);
	                this.range = 'minutes';
	            } else {
	                this.value = time.minutes(value).format(FORMAT);
	                this.range = 'minutes';
	                if (value < 6) this.enterInProgress = true;
	            }
	        }
	    }, {
	        key: 'shiftValue',
	        value: function shiftValue(step) {
	            var time = this.time;
	            var range = this.range;
	            this.value = time[range](time[range]() + step).format(FORMAT);
	            this.range = range;
	        }
	    }, {
	        key: 'range',
	        get: function get() {
	            return this.element.dataset.range || 'hours';
	        },
	        set: function set(range) {
	            this.element.dataset.range = range;
	            if (range === 'hours') this.input.setSelectionRange(0, 2);else this.input.setSelectionRange(5, 7);
	            this.enterInProgress = false;
	        }
	    }, {
	        key: 'time',
	        get: function get() {
	            return (0, _moment2.default)(this.value.replace(/-/g, '0'), FORMAT);
	        }
	    }]);

	    return TimeBox;
	}(_NumberBox3.default);

	exports.default = TimeBox;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;}; //! moment.js
	//! version : 2.13.0
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	;(function(global,factory){( false?'undefined':_typeof(exports))==='object'&&typeof module!=='undefined'?module.exports=factory(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):global.moment=factory();})(undefined,function(){'use strict';var hookCallback;function utils_hooks__hooks(){return hookCallback.apply(null,arguments);} // This is done to register the method called with moment()
	// without creating circular dependencies.
	function setHookCallback(callback){hookCallback=callback;}function isArray(input){return input instanceof Array||Object.prototype.toString.call(input)==='[object Array]';}function isDate(input){return input instanceof Date||Object.prototype.toString.call(input)==='[object Date]';}function map(arr,fn){var res=[],i;for(i=0;i<arr.length;++i){res.push(fn(arr[i],i));}return res;}function hasOwnProp(a,b){return Object.prototype.hasOwnProperty.call(a,b);}function extend(a,b){for(var i in b){if(hasOwnProp(b,i)){a[i]=b[i];}}if(hasOwnProp(b,'toString')){a.toString=b.toString;}if(hasOwnProp(b,'valueOf')){a.valueOf=b.valueOf;}return a;}function create_utc__createUTC(input,format,locale,strict){return createLocalOrUTC(input,format,locale,strict,true).utc();}function defaultParsingFlags(){ // We need to deep clone this object.
	return {empty:false,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:false,invalidMonth:null,invalidFormat:false,userInvalidated:false,iso:false,parsedDateParts:[],meridiem:null};}function getParsingFlags(m){if(m._pf==null){m._pf=defaultParsingFlags();}return m._pf;}var some;if(Array.prototype.some){some=Array.prototype.some;}else {some=function some(fun){var t=Object(this);var len=t.length>>>0;for(var i=0;i<len;i++){if(i in t&&fun.call(this,t[i],i,t)){return true;}}return false;};}function valid__isValid(m){if(m._isValid==null){var flags=getParsingFlags(m);var parsedParts=some.call(flags.parsedDateParts,function(i){return i!=null;});m._isValid=!isNaN(m._d.getTime())&&flags.overflow<0&&!flags.empty&&!flags.invalidMonth&&!flags.invalidWeekday&&!flags.nullInput&&!flags.invalidFormat&&!flags.userInvalidated&&(!flags.meridiem||flags.meridiem&&parsedParts);if(m._strict){m._isValid=m._isValid&&flags.charsLeftOver===0&&flags.unusedTokens.length===0&&flags.bigHour===undefined;}}return m._isValid;}function valid__createInvalid(flags){var m=create_utc__createUTC(NaN);if(flags!=null){extend(getParsingFlags(m),flags);}else {getParsingFlags(m).userInvalidated=true;}return m;}function isUndefined(input){return input===void 0;} // Plugins that add properties should also add the key here (null value),
	// so we can properly clone ourselves.
	var momentProperties=utils_hooks__hooks.momentProperties=[];function copyConfig(to,from){var i,prop,val;if(!isUndefined(from._isAMomentObject)){to._isAMomentObject=from._isAMomentObject;}if(!isUndefined(from._i)){to._i=from._i;}if(!isUndefined(from._f)){to._f=from._f;}if(!isUndefined(from._l)){to._l=from._l;}if(!isUndefined(from._strict)){to._strict=from._strict;}if(!isUndefined(from._tzm)){to._tzm=from._tzm;}if(!isUndefined(from._isUTC)){to._isUTC=from._isUTC;}if(!isUndefined(from._offset)){to._offset=from._offset;}if(!isUndefined(from._pf)){to._pf=getParsingFlags(from);}if(!isUndefined(from._locale)){to._locale=from._locale;}if(momentProperties.length>0){for(i in momentProperties){prop=momentProperties[i];val=from[prop];if(!isUndefined(val)){to[prop]=val;}}}return to;}var updateInProgress=false; // Moment prototype object
	function Moment(config){copyConfig(this,config);this._d=new Date(config._d!=null?config._d.getTime():NaN); // Prevent infinite loop in case updateOffset creates new moment
	// objects.
	if(updateInProgress===false){updateInProgress=true;utils_hooks__hooks.updateOffset(this);updateInProgress=false;}}function isMoment(obj){return obj instanceof Moment||obj!=null&&obj._isAMomentObject!=null;}function absFloor(number){if(number<0){return Math.ceil(number);}else {return Math.floor(number);}}function toInt(argumentForCoercion){var coercedNumber=+argumentForCoercion,value=0;if(coercedNumber!==0&&isFinite(coercedNumber)){value=absFloor(coercedNumber);}return value;} // compare two arrays, return the number of differences
	function compareArrays(array1,array2,dontConvert){var len=Math.min(array1.length,array2.length),lengthDiff=Math.abs(array1.length-array2.length),diffs=0,i;for(i=0;i<len;i++){if(dontConvert&&array1[i]!==array2[i]||!dontConvert&&toInt(array1[i])!==toInt(array2[i])){diffs++;}}return diffs+lengthDiff;}function warn(msg){if(utils_hooks__hooks.suppressDeprecationWarnings===false&&typeof console!=='undefined'&&console.warn){console.warn('Deprecation warning: '+msg);}}function deprecate(msg,fn){var firstTime=true;return extend(function(){if(utils_hooks__hooks.deprecationHandler!=null){utils_hooks__hooks.deprecationHandler(null,msg);}if(firstTime){warn(msg+'\nArguments: '+Array.prototype.slice.call(arguments).join(', ')+'\n'+new Error().stack);firstTime=false;}return fn.apply(this,arguments);},fn);}var deprecations={};function deprecateSimple(name,msg){if(utils_hooks__hooks.deprecationHandler!=null){utils_hooks__hooks.deprecationHandler(name,msg);}if(!deprecations[name]){warn(msg);deprecations[name]=true;}}utils_hooks__hooks.suppressDeprecationWarnings=false;utils_hooks__hooks.deprecationHandler=null;function isFunction(input){return input instanceof Function||Object.prototype.toString.call(input)==='[object Function]';}function isObject(input){return Object.prototype.toString.call(input)==='[object Object]';}function locale_set__set(config){var prop,i;for(i in config){prop=config[i];if(isFunction(prop)){this[i]=prop;}else {this['_'+i]=prop;}}this._config=config; // Lenient ordinal parsing accepts just a number in addition to
	// number + (possibly) stuff coming from _ordinalParseLenient.
	this._ordinalParseLenient=new RegExp(this._ordinalParse.source+'|'+/\d{1,2}/.source);}function mergeConfigs(parentConfig,childConfig){var res=extend({},parentConfig),prop;for(prop in childConfig){if(hasOwnProp(childConfig,prop)){if(isObject(parentConfig[prop])&&isObject(childConfig[prop])){res[prop]={};extend(res[prop],parentConfig[prop]);extend(res[prop],childConfig[prop]);}else if(childConfig[prop]!=null){res[prop]=childConfig[prop];}else {delete res[prop];}}}return res;}function Locale(config){if(config!=null){this.set(config);}}var keys;if(Object.keys){keys=Object.keys;}else {keys=function keys(obj){var i,res=[];for(i in obj){if(hasOwnProp(obj,i)){res.push(i);}}return res;};} // internal storage for locale config files
	var locales={};var globalLocale;function normalizeLocale(key){return key?key.toLowerCase().replace('_','-'):key;} // pick the locale from the array
	// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	function chooseLocale(names){var i=0,j,next,locale,split;while(i<names.length){split=normalizeLocale(names[i]).split('-');j=split.length;next=normalizeLocale(names[i+1]);next=next?next.split('-'):null;while(j>0){locale=loadLocale(split.slice(0,j).join('-'));if(locale){return locale;}if(next&&next.length>=j&&compareArrays(split,next,true)>=j-1){ //the next array item is better than a shallower substring of this one
	break;}j--;}i++;}return null;}function loadLocale(name){var oldLocale=null; // TODO: Find a better way to register and load all the locales in Node
	if(!locales[name]&&typeof module!=='undefined'&&module&&module.exports){try{oldLocale=globalLocale._abbr;__webpack_require__(60)("./"+name); // because defineLocale currently also sets the global locale, we
	// want to undo that for lazy loaded locales
	locale_locales__getSetGlobalLocale(oldLocale);}catch(e){}}return locales[name];} // This function will load locale and then set the global locale.  If
	// no arguments are passed in, it will simply return the current global
	// locale key.
	function locale_locales__getSetGlobalLocale(key,values){var data;if(key){if(isUndefined(values)){data=locale_locales__getLocale(key);}else {data=defineLocale(key,values);}if(data){ // moment.duration._locale = moment._locale = data;
	globalLocale=data;}}return globalLocale._abbr;}function defineLocale(name,config){if(config!==null){config.abbr=name;if(locales[name]!=null){deprecateSimple('defineLocaleOverride','use moment.updateLocale(localeName, config) to change '+'an existing locale. moment.defineLocale(localeName, '+'config) should only be used for creating a new locale');config=mergeConfigs(locales[name]._config,config);}else if(config.parentLocale!=null){if(locales[config.parentLocale]!=null){config=mergeConfigs(locales[config.parentLocale]._config,config);}else { // treat as if there is no base config
	deprecateSimple('parentLocaleUndefined','specified parentLocale is not defined yet');}}locales[name]=new Locale(config); // backwards compat for now: also set the locale
	locale_locales__getSetGlobalLocale(name);return locales[name];}else { // useful for testing
	delete locales[name];return null;}}function updateLocale(name,config){if(config!=null){var locale;if(locales[name]!=null){config=mergeConfigs(locales[name]._config,config);}locale=new Locale(config);locale.parentLocale=locales[name];locales[name]=locale; // backwards compat for now: also set the locale
	locale_locales__getSetGlobalLocale(name);}else { // pass null for config to unupdate, useful for tests
	if(locales[name]!=null){if(locales[name].parentLocale!=null){locales[name]=locales[name].parentLocale;}else if(locales[name]!=null){delete locales[name];}}}return locales[name];} // returns locale data
	function locale_locales__getLocale(key){var locale;if(key&&key._locale&&key._locale._abbr){key=key._locale._abbr;}if(!key){return globalLocale;}if(!isArray(key)){ //short-circuit everything else
	locale=loadLocale(key);if(locale){return locale;}key=[key];}return chooseLocale(key);}function locale_locales__listLocales(){return keys(locales);}var aliases={};function addUnitAlias(unit,shorthand){var lowerCase=unit.toLowerCase();aliases[lowerCase]=aliases[lowerCase+'s']=aliases[shorthand]=unit;}function normalizeUnits(units){return typeof units==='string'?aliases[units]||aliases[units.toLowerCase()]:undefined;}function normalizeObjectUnits(inputObject){var normalizedInput={},normalizedProp,prop;for(prop in inputObject){if(hasOwnProp(inputObject,prop)){normalizedProp=normalizeUnits(prop);if(normalizedProp){normalizedInput[normalizedProp]=inputObject[prop];}}}return normalizedInput;}function makeGetSet(unit,keepTime){return function(value){if(value!=null){get_set__set(this,unit,value);utils_hooks__hooks.updateOffset(this,keepTime);return this;}else {return get_set__get(this,unit);}};}function get_set__get(mom,unit){return mom.isValid()?mom._d['get'+(mom._isUTC?'UTC':'')+unit]():NaN;}function get_set__set(mom,unit,value){if(mom.isValid()){mom._d['set'+(mom._isUTC?'UTC':'')+unit](value);}} // MOMENTS
	function getSet(units,value){var unit;if((typeof units==='undefined'?'undefined':_typeof(units))==='object'){for(unit in units){this.set(unit,units[unit]);}}else {units=normalizeUnits(units);if(isFunction(this[units])){return this[units](value);}}return this;}function zeroFill(number,targetLength,forceSign){var absNumber=''+Math.abs(number),zerosToFill=targetLength-absNumber.length,sign=number>=0;return (sign?forceSign?'+':'':'-')+Math.pow(10,Math.max(0,zerosToFill)).toString().substr(1)+absNumber;}var formattingTokens=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;var localFormattingTokens=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;var formatFunctions={};var formatTokenFunctions={}; // token:    'M'
	// padded:   ['MM', 2]
	// ordinal:  'Mo'
	// callback: function () { this.month() + 1 }
	function addFormatToken(token,padded,ordinal,callback){var func=callback;if(typeof callback==='string'){func=function func(){return this[callback]();};}if(token){formatTokenFunctions[token]=func;}if(padded){formatTokenFunctions[padded[0]]=function(){return zeroFill(func.apply(this,arguments),padded[1],padded[2]);};}if(ordinal){formatTokenFunctions[ordinal]=function(){return this.localeData().ordinal(func.apply(this,arguments),token);};}}function removeFormattingTokens(input){if(input.match(/\[[\s\S]/)){return input.replace(/^\[|\]$/g,'');}return input.replace(/\\/g,'');}function makeFormatFunction(format){var array=format.match(formattingTokens),i,length;for(i=0,length=array.length;i<length;i++){if(formatTokenFunctions[array[i]]){array[i]=formatTokenFunctions[array[i]];}else {array[i]=removeFormattingTokens(array[i]);}}return function(mom){var output='',i;for(i=0;i<length;i++){output+=array[i] instanceof Function?array[i].call(mom,format):array[i];}return output;};} // format date using native date object
	function formatMoment(m,format){if(!m.isValid()){return m.localeData().invalidDate();}format=expandFormat(format,m.localeData());formatFunctions[format]=formatFunctions[format]||makeFormatFunction(format);return formatFunctions[format](m);}function expandFormat(format,locale){var i=5;function replaceLongDateFormatTokens(input){return locale.longDateFormat(input)||input;}localFormattingTokens.lastIndex=0;while(i>=0&&localFormattingTokens.test(format)){format=format.replace(localFormattingTokens,replaceLongDateFormatTokens);localFormattingTokens.lastIndex=0;i-=1;}return format;}var match1=/\d/; //       0 - 9
	var match2=/\d\d/; //      00 - 99
	var match3=/\d{3}/; //     000 - 999
	var match4=/\d{4}/; //    0000 - 9999
	var match6=/[+-]?\d{6}/; // -999999 - 999999
	var match1to2=/\d\d?/; //       0 - 99
	var match3to4=/\d\d\d\d?/; //     999 - 9999
	var match5to6=/\d\d\d\d\d\d?/; //   99999 - 999999
	var match1to3=/\d{1,3}/; //       0 - 999
	var match1to4=/\d{1,4}/; //       0 - 9999
	var match1to6=/[+-]?\d{1,6}/; // -999999 - 999999
	var matchUnsigned=/\d+/; //       0 - inf
	var matchSigned=/[+-]?\d+/; //    -inf - inf
	var matchOffset=/Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	var matchShortOffset=/Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z
	var matchTimestamp=/[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
	// any word (or two) characters or numbers including two/three word month in arabic.
	// includes scottish gaelic two word and hyphenated months
	var matchWord=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;var regexes={};function addRegexToken(token,regex,strictRegex){regexes[token]=isFunction(regex)?regex:function(isStrict,localeData){return isStrict&&strictRegex?strictRegex:regex;};}function getParseRegexForToken(token,config){if(!hasOwnProp(regexes,token)){return new RegExp(unescapeFormat(token));}return regexes[token](config._strict,config._locale);} // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	function unescapeFormat(s){return regexEscape(s.replace('\\','').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(matched,p1,p2,p3,p4){return p1||p2||p3||p4;}));}function regexEscape(s){return s.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');}var tokens={};function addParseToken(token,callback){var i,func=callback;if(typeof token==='string'){token=[token];}if(typeof callback==='number'){func=function func(input,array){array[callback]=toInt(input);};}for(i=0;i<token.length;i++){tokens[token[i]]=func;}}function addWeekParseToken(token,callback){addParseToken(token,function(input,array,config,token){config._w=config._w||{};callback(input,config._w,config,token);});}function addTimeToArrayFromToken(token,input,config){if(input!=null&&hasOwnProp(tokens,token)){tokens[token](input,config._a,config,token);}}var YEAR=0;var MONTH=1;var DATE=2;var HOUR=3;var MINUTE=4;var SECOND=5;var MILLISECOND=6;var WEEK=7;var WEEKDAY=8;var indexOf;if(Array.prototype.indexOf){indexOf=Array.prototype.indexOf;}else {indexOf=function indexOf(o){ // I know
	var i;for(i=0;i<this.length;++i){if(this[i]===o){return i;}}return -1;};}function daysInMonth(year,month){return new Date(Date.UTC(year,month+1,0)).getUTCDate();} // FORMATTING
	addFormatToken('M',['MM',2],'Mo',function(){return this.month()+1;});addFormatToken('MMM',0,0,function(format){return this.localeData().monthsShort(this,format);});addFormatToken('MMMM',0,0,function(format){return this.localeData().months(this,format);}); // ALIASES
	addUnitAlias('month','M'); // PARSING
	addRegexToken('M',match1to2);addRegexToken('MM',match1to2,match2);addRegexToken('MMM',function(isStrict,locale){return locale.monthsShortRegex(isStrict);});addRegexToken('MMMM',function(isStrict,locale){return locale.monthsRegex(isStrict);});addParseToken(['M','MM'],function(input,array){array[MONTH]=toInt(input)-1;});addParseToken(['MMM','MMMM'],function(input,array,config,token){var month=config._locale.monthsParse(input,token,config._strict); // if we didn't find a month name, mark the date as invalid.
	if(month!=null){array[MONTH]=month;}else {getParsingFlags(config).invalidMonth=input;}}); // LOCALES
	var MONTHS_IN_FORMAT=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;var defaultLocaleMonths='January_February_March_April_May_June_July_August_September_October_November_December'.split('_');function localeMonths(m,format){return isArray(this._months)?this._months[m.month()]:this._months[MONTHS_IN_FORMAT.test(format)?'format':'standalone'][m.month()];}var defaultLocaleMonthsShort='Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');function localeMonthsShort(m,format){return isArray(this._monthsShort)?this._monthsShort[m.month()]:this._monthsShort[MONTHS_IN_FORMAT.test(format)?'format':'standalone'][m.month()];}function units_month__handleStrictParse(monthName,format,strict){var i,ii,mom,llc=monthName.toLocaleLowerCase();if(!this._monthsParse){ // this is not used
	this._monthsParse=[];this._longMonthsParse=[];this._shortMonthsParse=[];for(i=0;i<12;++i){mom=create_utc__createUTC([2000,i]);this._shortMonthsParse[i]=this.monthsShort(mom,'').toLocaleLowerCase();this._longMonthsParse[i]=this.months(mom,'').toLocaleLowerCase();}}if(strict){if(format==='MMM'){ii=indexOf.call(this._shortMonthsParse,llc);return ii!==-1?ii:null;}else {ii=indexOf.call(this._longMonthsParse,llc);return ii!==-1?ii:null;}}else {if(format==='MMM'){ii=indexOf.call(this._shortMonthsParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._longMonthsParse,llc);return ii!==-1?ii:null;}else {ii=indexOf.call(this._longMonthsParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._shortMonthsParse,llc);return ii!==-1?ii:null;}}}function localeMonthsParse(monthName,format,strict){var i,mom,regex;if(this._monthsParseExact){return units_month__handleStrictParse.call(this,monthName,format,strict);}if(!this._monthsParse){this._monthsParse=[];this._longMonthsParse=[];this._shortMonthsParse=[];} // TODO: add sorting
	// Sorting makes sure if one month (or abbr) is a prefix of another
	// see sorting in computeMonthsParse
	for(i=0;i<12;i++){ // make the regex if we don't have it already
	mom=create_utc__createUTC([2000,i]);if(strict&&!this._longMonthsParse[i]){this._longMonthsParse[i]=new RegExp('^'+this.months(mom,'').replace('.','')+'$','i');this._shortMonthsParse[i]=new RegExp('^'+this.monthsShort(mom,'').replace('.','')+'$','i');}if(!strict&&!this._monthsParse[i]){regex='^'+this.months(mom,'')+'|^'+this.monthsShort(mom,'');this._monthsParse[i]=new RegExp(regex.replace('.',''),'i');} // test the regex
	if(strict&&format==='MMMM'&&this._longMonthsParse[i].test(monthName)){return i;}else if(strict&&format==='MMM'&&this._shortMonthsParse[i].test(monthName)){return i;}else if(!strict&&this._monthsParse[i].test(monthName)){return i;}}} // MOMENTS
	function setMonth(mom,value){var dayOfMonth;if(!mom.isValid()){ // No op
	return mom;}if(typeof value==='string'){if(/^\d+$/.test(value)){value=toInt(value);}else {value=mom.localeData().monthsParse(value); // TODO: Another silent failure?
	if(typeof value!=='number'){return mom;}}}dayOfMonth=Math.min(mom.date(),daysInMonth(mom.year(),value));mom._d['set'+(mom._isUTC?'UTC':'')+'Month'](value,dayOfMonth);return mom;}function getSetMonth(value){if(value!=null){setMonth(this,value);utils_hooks__hooks.updateOffset(this,true);return this;}else {return get_set__get(this,'Month');}}function getDaysInMonth(){return daysInMonth(this.year(),this.month());}var defaultMonthsShortRegex=matchWord;function monthsShortRegex(isStrict){if(this._monthsParseExact){if(!hasOwnProp(this,'_monthsRegex')){computeMonthsParse.call(this);}if(isStrict){return this._monthsShortStrictRegex;}else {return this._monthsShortRegex;}}else {return this._monthsShortStrictRegex&&isStrict?this._monthsShortStrictRegex:this._monthsShortRegex;}}var defaultMonthsRegex=matchWord;function monthsRegex(isStrict){if(this._monthsParseExact){if(!hasOwnProp(this,'_monthsRegex')){computeMonthsParse.call(this);}if(isStrict){return this._monthsStrictRegex;}else {return this._monthsRegex;}}else {return this._monthsStrictRegex&&isStrict?this._monthsStrictRegex:this._monthsRegex;}}function computeMonthsParse(){function cmpLenRev(a,b){return b.length-a.length;}var shortPieces=[],longPieces=[],mixedPieces=[],i,mom;for(i=0;i<12;i++){ // make the regex if we don't have it already
	mom=create_utc__createUTC([2000,i]);shortPieces.push(this.monthsShort(mom,''));longPieces.push(this.months(mom,''));mixedPieces.push(this.months(mom,''));mixedPieces.push(this.monthsShort(mom,''));} // Sorting makes sure if one month (or abbr) is a prefix of another it
	// will match the longer piece.
	shortPieces.sort(cmpLenRev);longPieces.sort(cmpLenRev);mixedPieces.sort(cmpLenRev);for(i=0;i<12;i++){shortPieces[i]=regexEscape(shortPieces[i]);longPieces[i]=regexEscape(longPieces[i]);mixedPieces[i]=regexEscape(mixedPieces[i]);}this._monthsRegex=new RegExp('^('+mixedPieces.join('|')+')','i');this._monthsShortRegex=this._monthsRegex;this._monthsStrictRegex=new RegExp('^('+longPieces.join('|')+')','i');this._monthsShortStrictRegex=new RegExp('^('+shortPieces.join('|')+')','i');}function checkOverflow(m){var overflow;var a=m._a;if(a&&getParsingFlags(m).overflow===-2){overflow=a[MONTH]<0||a[MONTH]>11?MONTH:a[DATE]<1||a[DATE]>daysInMonth(a[YEAR],a[MONTH])?DATE:a[HOUR]<0||a[HOUR]>24||a[HOUR]===24&&(a[MINUTE]!==0||a[SECOND]!==0||a[MILLISECOND]!==0)?HOUR:a[MINUTE]<0||a[MINUTE]>59?MINUTE:a[SECOND]<0||a[SECOND]>59?SECOND:a[MILLISECOND]<0||a[MILLISECOND]>999?MILLISECOND:-1;if(getParsingFlags(m)._overflowDayOfYear&&(overflow<YEAR||overflow>DATE)){overflow=DATE;}if(getParsingFlags(m)._overflowWeeks&&overflow===-1){overflow=WEEK;}if(getParsingFlags(m)._overflowWeekday&&overflow===-1){overflow=WEEKDAY;}getParsingFlags(m).overflow=overflow;}return m;} // iso 8601 regex
	// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	var extendedIsoRegex=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;var basicIsoRegex=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;var tzRegex=/Z|[+-]\d\d(?::?\d\d)?/;var isoDates=[['YYYYYY-MM-DD',/[+-]\d{6}-\d\d-\d\d/],['YYYY-MM-DD',/\d{4}-\d\d-\d\d/],['GGGG-[W]WW-E',/\d{4}-W\d\d-\d/],['GGGG-[W]WW',/\d{4}-W\d\d/,false],['YYYY-DDD',/\d{4}-\d{3}/],['YYYY-MM',/\d{4}-\d\d/,false],['YYYYYYMMDD',/[+-]\d{10}/],['YYYYMMDD',/\d{8}/], // YYYYMM is NOT allowed by the standard
	['GGGG[W]WWE',/\d{4}W\d{3}/],['GGGG[W]WW',/\d{4}W\d{2}/,false],['YYYYDDD',/\d{7}/]]; // iso time formats and regexes
	var isoTimes=[['HH:mm:ss.SSSS',/\d\d:\d\d:\d\d\.\d+/],['HH:mm:ss,SSSS',/\d\d:\d\d:\d\d,\d+/],['HH:mm:ss',/\d\d:\d\d:\d\d/],['HH:mm',/\d\d:\d\d/],['HHmmss.SSSS',/\d\d\d\d\d\d\.\d+/],['HHmmss,SSSS',/\d\d\d\d\d\d,\d+/],['HHmmss',/\d\d\d\d\d\d/],['HHmm',/\d\d\d\d/],['HH',/\d\d/]];var aspNetJsonRegex=/^\/?Date\((\-?\d+)/i; // date from iso format
	function configFromISO(config){var i,l,string=config._i,match=extendedIsoRegex.exec(string)||basicIsoRegex.exec(string),allowTime,dateFormat,timeFormat,tzFormat;if(match){getParsingFlags(config).iso=true;for(i=0,l=isoDates.length;i<l;i++){if(isoDates[i][1].exec(match[1])){dateFormat=isoDates[i][0];allowTime=isoDates[i][2]!==false;break;}}if(dateFormat==null){config._isValid=false;return;}if(match[3]){for(i=0,l=isoTimes.length;i<l;i++){if(isoTimes[i][1].exec(match[3])){ // match[2] should be 'T' or space
	timeFormat=(match[2]||' ')+isoTimes[i][0];break;}}if(timeFormat==null){config._isValid=false;return;}}if(!allowTime&&timeFormat!=null){config._isValid=false;return;}if(match[4]){if(tzRegex.exec(match[4])){tzFormat='Z';}else {config._isValid=false;return;}}config._f=dateFormat+(timeFormat||'')+(tzFormat||'');configFromStringAndFormat(config);}else {config._isValid=false;}} // date from iso format or fallback
	function configFromString(config){var matched=aspNetJsonRegex.exec(config._i);if(matched!==null){config._d=new Date(+matched[1]);return;}configFromISO(config);if(config._isValid===false){delete config._isValid;utils_hooks__hooks.createFromInputFallback(config);}}utils_hooks__hooks.createFromInputFallback=deprecate('moment construction falls back to js Date. This is '+'discouraged and will be removed in upcoming major '+'release. Please refer to '+'https://github.com/moment/moment/issues/1407 for more info.',function(config){config._d=new Date(config._i+(config._useUTC?' UTC':''));});function createDate(y,m,d,h,M,s,ms){ //can't just apply() to create a date:
	//http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	var date=new Date(y,m,d,h,M,s,ms); //the date constructor remaps years 0-99 to 1900-1999
	if(y<100&&y>=0&&isFinite(date.getFullYear())){date.setFullYear(y);}return date;}function createUTCDate(y){var date=new Date(Date.UTC.apply(null,arguments)); //the Date.UTC function remaps years 0-99 to 1900-1999
	if(y<100&&y>=0&&isFinite(date.getUTCFullYear())){date.setUTCFullYear(y);}return date;} // FORMATTING
	addFormatToken('Y',0,0,function(){var y=this.year();return y<=9999?''+y:'+'+y;});addFormatToken(0,['YY',2],0,function(){return this.year()%100;});addFormatToken(0,['YYYY',4],0,'year');addFormatToken(0,['YYYYY',5],0,'year');addFormatToken(0,['YYYYYY',6,true],0,'year'); // ALIASES
	addUnitAlias('year','y'); // PARSING
	addRegexToken('Y',matchSigned);addRegexToken('YY',match1to2,match2);addRegexToken('YYYY',match1to4,match4);addRegexToken('YYYYY',match1to6,match6);addRegexToken('YYYYYY',match1to6,match6);addParseToken(['YYYYY','YYYYYY'],YEAR);addParseToken('YYYY',function(input,array){array[YEAR]=input.length===2?utils_hooks__hooks.parseTwoDigitYear(input):toInt(input);});addParseToken('YY',function(input,array){array[YEAR]=utils_hooks__hooks.parseTwoDigitYear(input);});addParseToken('Y',function(input,array){array[YEAR]=parseInt(input,10);}); // HELPERS
	function daysInYear(year){return isLeapYear(year)?366:365;}function isLeapYear(year){return year%4===0&&year%100!==0||year%400===0;} // HOOKS
	utils_hooks__hooks.parseTwoDigitYear=function(input){return toInt(input)+(toInt(input)>68?1900:2000);}; // MOMENTS
	var getSetYear=makeGetSet('FullYear',true);function getIsLeapYear(){return isLeapYear(this.year());} // start-of-first-week - start-of-year
	function firstWeekOffset(year,dow,doy){var  // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	fwd=7+dow-doy, // first-week day local weekday -- which local weekday is fwd
	fwdlw=(7+createUTCDate(year,0,fwd).getUTCDay()-dow)%7;return -fwdlw+fwd-1;} //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	function dayOfYearFromWeeks(year,week,weekday,dow,doy){var localWeekday=(7+weekday-dow)%7,weekOffset=firstWeekOffset(year,dow,doy),dayOfYear=1+7*(week-1)+localWeekday+weekOffset,resYear,resDayOfYear;if(dayOfYear<=0){resYear=year-1;resDayOfYear=daysInYear(resYear)+dayOfYear;}else if(dayOfYear>daysInYear(year)){resYear=year+1;resDayOfYear=dayOfYear-daysInYear(year);}else {resYear=year;resDayOfYear=dayOfYear;}return {year:resYear,dayOfYear:resDayOfYear};}function weekOfYear(mom,dow,doy){var weekOffset=firstWeekOffset(mom.year(),dow,doy),week=Math.floor((mom.dayOfYear()-weekOffset-1)/7)+1,resWeek,resYear;if(week<1){resYear=mom.year()-1;resWeek=week+weeksInYear(resYear,dow,doy);}else if(week>weeksInYear(mom.year(),dow,doy)){resWeek=week-weeksInYear(mom.year(),dow,doy);resYear=mom.year()+1;}else {resYear=mom.year();resWeek=week;}return {week:resWeek,year:resYear};}function weeksInYear(year,dow,doy){var weekOffset=firstWeekOffset(year,dow,doy),weekOffsetNext=firstWeekOffset(year+1,dow,doy);return (daysInYear(year)-weekOffset+weekOffsetNext)/7;} // Pick the first defined of two or three arguments.
	function defaults(a,b,c){if(a!=null){return a;}if(b!=null){return b;}return c;}function currentDateArray(config){ // hooks is actually the exported moment object
	var nowValue=new Date(utils_hooks__hooks.now());if(config._useUTC){return [nowValue.getUTCFullYear(),nowValue.getUTCMonth(),nowValue.getUTCDate()];}return [nowValue.getFullYear(),nowValue.getMonth(),nowValue.getDate()];} // convert an array to a date.
	// the array should mirror the parameters below
	// note: all values past the year are optional and will default to the lowest possible value.
	// [year, month, day , hour, minute, second, millisecond]
	function configFromArray(config){var i,date,input=[],currentDate,yearToUse;if(config._d){return;}currentDate=currentDateArray(config); //compute day of the year from weeks and weekdays
	if(config._w&&config._a[DATE]==null&&config._a[MONTH]==null){dayOfYearFromWeekInfo(config);} //if the day of the year is set, figure out what it is
	if(config._dayOfYear){yearToUse=defaults(config._a[YEAR],currentDate[YEAR]);if(config._dayOfYear>daysInYear(yearToUse)){getParsingFlags(config)._overflowDayOfYear=true;}date=createUTCDate(yearToUse,0,config._dayOfYear);config._a[MONTH]=date.getUTCMonth();config._a[DATE]=date.getUTCDate();} // Default to current date.
	// * if no year, month, day of month are given, default to today
	// * if day of month is given, default month and year
	// * if month is given, default only year
	// * if year is given, don't default anything
	for(i=0;i<3&&config._a[i]==null;++i){config._a[i]=input[i]=currentDate[i];} // Zero out whatever was not defaulted, including time
	for(;i<7;i++){config._a[i]=input[i]=config._a[i]==null?i===2?1:0:config._a[i];} // Check for 24:00:00.000
	if(config._a[HOUR]===24&&config._a[MINUTE]===0&&config._a[SECOND]===0&&config._a[MILLISECOND]===0){config._nextDay=true;config._a[HOUR]=0;}config._d=(config._useUTC?createUTCDate:createDate).apply(null,input); // Apply timezone offset from input. The actual utcOffset can be changed
	// with parseZone.
	if(config._tzm!=null){config._d.setUTCMinutes(config._d.getUTCMinutes()-config._tzm);}if(config._nextDay){config._a[HOUR]=24;}}function dayOfYearFromWeekInfo(config){var w,weekYear,week,weekday,dow,doy,temp,weekdayOverflow;w=config._w;if(w.GG!=null||w.W!=null||w.E!=null){dow=1;doy=4; // TODO: We need to take the current isoWeekYear, but that depends on
	// how we interpret now (local, utc, fixed offset). So create
	// a now version of current config (take local/utc/offset flags, and
	// create now).
	weekYear=defaults(w.GG,config._a[YEAR],weekOfYear(local__createLocal(),1,4).year);week=defaults(w.W,1);weekday=defaults(w.E,1);if(weekday<1||weekday>7){weekdayOverflow=true;}}else {dow=config._locale._week.dow;doy=config._locale._week.doy;weekYear=defaults(w.gg,config._a[YEAR],weekOfYear(local__createLocal(),dow,doy).year);week=defaults(w.w,1);if(w.d!=null){ // weekday -- low day numbers are considered next week
	weekday=w.d;if(weekday<0||weekday>6){weekdayOverflow=true;}}else if(w.e!=null){ // local weekday -- counting starts from begining of week
	weekday=w.e+dow;if(w.e<0||w.e>6){weekdayOverflow=true;}}else { // default to begining of week
	weekday=dow;}}if(week<1||week>weeksInYear(weekYear,dow,doy)){getParsingFlags(config)._overflowWeeks=true;}else if(weekdayOverflow!=null){getParsingFlags(config)._overflowWeekday=true;}else {temp=dayOfYearFromWeeks(weekYear,week,weekday,dow,doy);config._a[YEAR]=temp.year;config._dayOfYear=temp.dayOfYear;}} // constant that refers to the ISO standard
	utils_hooks__hooks.ISO_8601=function(){}; // date from string and format string
	function configFromStringAndFormat(config){ // TODO: Move this to another part of the creation flow to prevent circular deps
	if(config._f===utils_hooks__hooks.ISO_8601){configFromISO(config);return;}config._a=[];getParsingFlags(config).empty=true; // This array is used to make a Date, either with `new Date` or `Date.UTC`
	var string=''+config._i,i,parsedInput,tokens,token,skipped,stringLength=string.length,totalParsedInputLength=0;tokens=expandFormat(config._f,config._locale).match(formattingTokens)||[];for(i=0;i<tokens.length;i++){token=tokens[i];parsedInput=(string.match(getParseRegexForToken(token,config))||[])[0]; // console.log('token', token, 'parsedInput', parsedInput,
	//         'regex', getParseRegexForToken(token, config));
	if(parsedInput){skipped=string.substr(0,string.indexOf(parsedInput));if(skipped.length>0){getParsingFlags(config).unusedInput.push(skipped);}string=string.slice(string.indexOf(parsedInput)+parsedInput.length);totalParsedInputLength+=parsedInput.length;} // don't parse if it's not a known token
	if(formatTokenFunctions[token]){if(parsedInput){getParsingFlags(config).empty=false;}else {getParsingFlags(config).unusedTokens.push(token);}addTimeToArrayFromToken(token,parsedInput,config);}else if(config._strict&&!parsedInput){getParsingFlags(config).unusedTokens.push(token);}} // add remaining unparsed input length to the string
	getParsingFlags(config).charsLeftOver=stringLength-totalParsedInputLength;if(string.length>0){getParsingFlags(config).unusedInput.push(string);} // clear _12h flag if hour is <= 12
	if(getParsingFlags(config).bigHour===true&&config._a[HOUR]<=12&&config._a[HOUR]>0){getParsingFlags(config).bigHour=undefined;}getParsingFlags(config).parsedDateParts=config._a.slice(0);getParsingFlags(config).meridiem=config._meridiem; // handle meridiem
	config._a[HOUR]=meridiemFixWrap(config._locale,config._a[HOUR],config._meridiem);configFromArray(config);checkOverflow(config);}function meridiemFixWrap(locale,hour,meridiem){var isPm;if(meridiem==null){ // nothing to do
	return hour;}if(locale.meridiemHour!=null){return locale.meridiemHour(hour,meridiem);}else if(locale.isPM!=null){ // Fallback
	isPm=locale.isPM(meridiem);if(isPm&&hour<12){hour+=12;}if(!isPm&&hour===12){hour=0;}return hour;}else { // this is not supposed to happen
	return hour;}} // date from string and array of format strings
	function configFromStringAndArray(config){var tempConfig,bestMoment,scoreToBeat,i,currentScore;if(config._f.length===0){getParsingFlags(config).invalidFormat=true;config._d=new Date(NaN);return;}for(i=0;i<config._f.length;i++){currentScore=0;tempConfig=copyConfig({},config);if(config._useUTC!=null){tempConfig._useUTC=config._useUTC;}tempConfig._f=config._f[i];configFromStringAndFormat(tempConfig);if(!valid__isValid(tempConfig)){continue;} // if there is any input that was not parsed add a penalty for that format
	currentScore+=getParsingFlags(tempConfig).charsLeftOver; //or tokens
	currentScore+=getParsingFlags(tempConfig).unusedTokens.length*10;getParsingFlags(tempConfig).score=currentScore;if(scoreToBeat==null||currentScore<scoreToBeat){scoreToBeat=currentScore;bestMoment=tempConfig;}}extend(config,bestMoment||tempConfig);}function configFromObject(config){if(config._d){return;}var i=normalizeObjectUnits(config._i);config._a=map([i.year,i.month,i.day||i.date,i.hour,i.minute,i.second,i.millisecond],function(obj){return obj&&parseInt(obj,10);});configFromArray(config);}function createFromConfig(config){var res=new Moment(checkOverflow(prepareConfig(config)));if(res._nextDay){ // Adding is smart enough around DST
	res.add(1,'d');res._nextDay=undefined;}return res;}function prepareConfig(config){var input=config._i,format=config._f;config._locale=config._locale||locale_locales__getLocale(config._l);if(input===null||format===undefined&&input===''){return valid__createInvalid({nullInput:true});}if(typeof input==='string'){config._i=input=config._locale.preparse(input);}if(isMoment(input)){return new Moment(checkOverflow(input));}else if(isArray(format)){configFromStringAndArray(config);}else if(format){configFromStringAndFormat(config);}else if(isDate(input)){config._d=input;}else {configFromInput(config);}if(!valid__isValid(config)){config._d=null;}return config;}function configFromInput(config){var input=config._i;if(input===undefined){config._d=new Date(utils_hooks__hooks.now());}else if(isDate(input)){config._d=new Date(input.valueOf());}else if(typeof input==='string'){configFromString(config);}else if(isArray(input)){config._a=map(input.slice(0),function(obj){return parseInt(obj,10);});configFromArray(config);}else if((typeof input==='undefined'?'undefined':_typeof(input))==='object'){configFromObject(config);}else if(typeof input==='number'){ // from milliseconds
	config._d=new Date(input);}else {utils_hooks__hooks.createFromInputFallback(config);}}function createLocalOrUTC(input,format,locale,strict,isUTC){var c={};if(typeof locale==='boolean'){strict=locale;locale=undefined;} // object construction must be done this way.
	// https://github.com/moment/moment/issues/1423
	c._isAMomentObject=true;c._useUTC=c._isUTC=isUTC;c._l=locale;c._i=input;c._f=format;c._strict=strict;return createFromConfig(c);}function local__createLocal(input,format,locale,strict){return createLocalOrUTC(input,format,locale,strict,false);}var prototypeMin=deprecate('moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',function(){var other=local__createLocal.apply(null,arguments);if(this.isValid()&&other.isValid()){return other<this?this:other;}else {return valid__createInvalid();}});var prototypeMax=deprecate('moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',function(){var other=local__createLocal.apply(null,arguments);if(this.isValid()&&other.isValid()){return other>this?this:other;}else {return valid__createInvalid();}}); // Pick a moment m from moments so that m[fn](other) is true for all
	// other. This relies on the function fn to be transitive.
	//
	// moments should either be an array of moment objects or an array, whose
	// first element is an array of moment objects.
	function pickBy(fn,moments){var res,i;if(moments.length===1&&isArray(moments[0])){moments=moments[0];}if(!moments.length){return local__createLocal();}res=moments[0];for(i=1;i<moments.length;++i){if(!moments[i].isValid()||moments[i][fn](res)){res=moments[i];}}return res;} // TODO: Use [].sort instead?
	function min(){var args=[].slice.call(arguments,0);return pickBy('isBefore',args);}function max(){var args=[].slice.call(arguments,0);return pickBy('isAfter',args);}var now=function now(){return Date.now?Date.now():+new Date();};function Duration(duration){var normalizedInput=normalizeObjectUnits(duration),years=normalizedInput.year||0,quarters=normalizedInput.quarter||0,months=normalizedInput.month||0,weeks=normalizedInput.week||0,days=normalizedInput.day||0,hours=normalizedInput.hour||0,minutes=normalizedInput.minute||0,seconds=normalizedInput.second||0,milliseconds=normalizedInput.millisecond||0; // representation for dateAddRemove
	this._milliseconds=+milliseconds+seconds*1e3+ // 1000
	minutes*6e4+ // 1000 * 60
	hours*1000*60*60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	// Because of dateAddRemove treats 24 hours as different from a
	// day when working around DST, we need to store them separately
	this._days=+days+weeks*7; // It is impossible translate months into days without knowing
	// which months you are are talking about, so we have to store
	// it separately.
	this._months=+months+quarters*3+years*12;this._data={};this._locale=locale_locales__getLocale();this._bubble();}function isDuration(obj){return obj instanceof Duration;} // FORMATTING
	function offset(token,separator){addFormatToken(token,0,0,function(){var offset=this.utcOffset();var sign='+';if(offset<0){offset=-offset;sign='-';}return sign+zeroFill(~ ~(offset/60),2)+separator+zeroFill(~ ~offset%60,2);});}offset('Z',':');offset('ZZ',''); // PARSING
	addRegexToken('Z',matchShortOffset);addRegexToken('ZZ',matchShortOffset);addParseToken(['Z','ZZ'],function(input,array,config){config._useUTC=true;config._tzm=offsetFromString(matchShortOffset,input);}); // HELPERS
	// timezone chunker
	// '+10:00' > ['10',  '00']
	// '-1530'  > ['-15', '30']
	var chunkOffset=/([\+\-]|\d\d)/gi;function offsetFromString(matcher,string){var matches=(string||'').match(matcher)||[];var chunk=matches[matches.length-1]||[];var parts=(chunk+'').match(chunkOffset)||['-',0,0];var minutes=+(parts[1]*60)+toInt(parts[2]);return parts[0]==='+'?minutes:-minutes;} // Return a moment from input, that is local/utc/zone equivalent to model.
	function cloneWithOffset(input,model){var res,diff;if(model._isUTC){res=model.clone();diff=(isMoment(input)||isDate(input)?input.valueOf():local__createLocal(input).valueOf())-res.valueOf(); // Use low-level api, because this fn is low-level api.
	res._d.setTime(res._d.valueOf()+diff);utils_hooks__hooks.updateOffset(res,false);return res;}else {return local__createLocal(input).local();}}function getDateOffset(m){ // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	// https://github.com/moment/moment/pull/1871
	return -Math.round(m._d.getTimezoneOffset()/15)*15;} // HOOKS
	// This function will be called whenever a moment is mutated.
	// It is intended to keep the offset in sync with the timezone.
	utils_hooks__hooks.updateOffset=function(){}; // MOMENTS
	// keepLocalTime = true means only change the timezone, without
	// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	// +0200, so we adjust the time as needed, to be valid.
	//
	// Keeping the time actually adds/subtracts (one hour)
	// from the actual represented time. That is why we call updateOffset
	// a second time. In case it wants us to change the offset again
	// _changeInProgress == true case, then we have to adjust, because
	// there is no such time in the given timezone.
	function getSetOffset(input,keepLocalTime){var offset=this._offset||0,localAdjust;if(!this.isValid()){return input!=null?this:NaN;}if(input!=null){if(typeof input==='string'){input=offsetFromString(matchShortOffset,input);}else if(Math.abs(input)<16){input=input*60;}if(!this._isUTC&&keepLocalTime){localAdjust=getDateOffset(this);}this._offset=input;this._isUTC=true;if(localAdjust!=null){this.add(localAdjust,'m');}if(offset!==input){if(!keepLocalTime||this._changeInProgress){add_subtract__addSubtract(this,create__createDuration(input-offset,'m'),1,false);}else if(!this._changeInProgress){this._changeInProgress=true;utils_hooks__hooks.updateOffset(this,true);this._changeInProgress=null;}}return this;}else {return this._isUTC?offset:getDateOffset(this);}}function getSetZone(input,keepLocalTime){if(input!=null){if(typeof input!=='string'){input=-input;}this.utcOffset(input,keepLocalTime);return this;}else {return -this.utcOffset();}}function setOffsetToUTC(keepLocalTime){return this.utcOffset(0,keepLocalTime);}function setOffsetToLocal(keepLocalTime){if(this._isUTC){this.utcOffset(0,keepLocalTime);this._isUTC=false;if(keepLocalTime){this.subtract(getDateOffset(this),'m');}}return this;}function setOffsetToParsedOffset(){if(this._tzm){this.utcOffset(this._tzm);}else if(typeof this._i==='string'){this.utcOffset(offsetFromString(matchOffset,this._i));}return this;}function hasAlignedHourOffset(input){if(!this.isValid()){return false;}input=input?local__createLocal(input).utcOffset():0;return (this.utcOffset()-input)%60===0;}function isDaylightSavingTime(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset();}function isDaylightSavingTimeShifted(){if(!isUndefined(this._isDSTShifted)){return this._isDSTShifted;}var c={};copyConfig(c,this);c=prepareConfig(c);if(c._a){var other=c._isUTC?create_utc__createUTC(c._a):local__createLocal(c._a);this._isDSTShifted=this.isValid()&&compareArrays(c._a,other.toArray())>0;}else {this._isDSTShifted=false;}return this._isDSTShifted;}function isLocal(){return this.isValid()?!this._isUTC:false;}function isUtcOffset(){return this.isValid()?this._isUTC:false;}function isUtc(){return this.isValid()?this._isUTC&&this._offset===0:false;} // ASP.NET json date format regex
	var aspNetRegex=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/; // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	// and further modified to allow for strings containing both week and day
	var isoRegex=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;function create__createDuration(input,key){var duration=input, // matching against regexp is expensive, do it on demand
	match=null,sign,ret,diffRes;if(isDuration(input)){duration={ms:input._milliseconds,d:input._days,M:input._months};}else if(typeof input==='number'){duration={};if(key){duration[key]=input;}else {duration.milliseconds=input;}}else if(!!(match=aspNetRegex.exec(input))){sign=match[1]==='-'?-1:1;duration={y:0,d:toInt(match[DATE])*sign,h:toInt(match[HOUR])*sign,m:toInt(match[MINUTE])*sign,s:toInt(match[SECOND])*sign,ms:toInt(match[MILLISECOND])*sign};}else if(!!(match=isoRegex.exec(input))){sign=match[1]==='-'?-1:1;duration={y:parseIso(match[2],sign),M:parseIso(match[3],sign),w:parseIso(match[4],sign),d:parseIso(match[5],sign),h:parseIso(match[6],sign),m:parseIso(match[7],sign),s:parseIso(match[8],sign)};}else if(duration==null){ // checks for null or undefined
	duration={};}else if((typeof duration==='undefined'?'undefined':_typeof(duration))==='object'&&('from' in duration||'to' in duration)){diffRes=momentsDifference(local__createLocal(duration.from),local__createLocal(duration.to));duration={};duration.ms=diffRes.milliseconds;duration.M=diffRes.months;}ret=new Duration(duration);if(isDuration(input)&&hasOwnProp(input,'_locale')){ret._locale=input._locale;}return ret;}create__createDuration.fn=Duration.prototype;function parseIso(inp,sign){ // We'd normally use ~~inp for this, but unfortunately it also
	// converts floats to ints.
	// inp may be undefined, so careful calling replace on it.
	var res=inp&&parseFloat(inp.replace(',','.')); // apply sign while we're at it
	return (isNaN(res)?0:res)*sign;}function positiveMomentsDifference(base,other){var res={milliseconds:0,months:0};res.months=other.month()-base.month()+(other.year()-base.year())*12;if(base.clone().add(res.months,'M').isAfter(other)){--res.months;}res.milliseconds=+other-+base.clone().add(res.months,'M');return res;}function momentsDifference(base,other){var res;if(!(base.isValid()&&other.isValid())){return {milliseconds:0,months:0};}other=cloneWithOffset(other,base);if(base.isBefore(other)){res=positiveMomentsDifference(base,other);}else {res=positiveMomentsDifference(other,base);res.milliseconds=-res.milliseconds;res.months=-res.months;}return res;}function absRound(number){if(number<0){return Math.round(-1*number)*-1;}else {return Math.round(number);}} // TODO: remove 'name' arg after deprecation is removed
	function createAdder(direction,name){return function(val,period){var dur,tmp; //invert the arguments, but complain about it
	if(period!==null&&!isNaN(+period)){deprecateSimple(name,'moment().'+name+'(period, number) is deprecated. Please use moment().'+name+'(number, period).');tmp=val;val=period;period=tmp;}val=typeof val==='string'?+val:val;dur=create__createDuration(val,period);add_subtract__addSubtract(this,dur,direction);return this;};}function add_subtract__addSubtract(mom,duration,isAdding,updateOffset){var milliseconds=duration._milliseconds,days=absRound(duration._days),months=absRound(duration._months);if(!mom.isValid()){ // No op
	return;}updateOffset=updateOffset==null?true:updateOffset;if(milliseconds){mom._d.setTime(mom._d.valueOf()+milliseconds*isAdding);}if(days){get_set__set(mom,'Date',get_set__get(mom,'Date')+days*isAdding);}if(months){setMonth(mom,get_set__get(mom,'Month')+months*isAdding);}if(updateOffset){utils_hooks__hooks.updateOffset(mom,days||months);}}var add_subtract__add=createAdder(1,'add');var add_subtract__subtract=createAdder(-1,'subtract');function moment_calendar__calendar(time,formats){ // We want to compare the start of today, vs this.
	// Getting start-of-today depends on whether we're local/utc/offset or not.
	var now=time||local__createLocal(),sod=cloneWithOffset(now,this).startOf('day'),diff=this.diff(sod,'days',true),format=diff<-6?'sameElse':diff<-1?'lastWeek':diff<0?'lastDay':diff<1?'sameDay':diff<2?'nextDay':diff<7?'nextWeek':'sameElse';var output=formats&&(isFunction(formats[format])?formats[format]():formats[format]);return this.format(output||this.localeData().calendar(format,this,local__createLocal(now)));}function clone(){return new Moment(this);}function isAfter(input,units){var localInput=isMoment(input)?input:local__createLocal(input);if(!(this.isValid()&&localInput.isValid())){return false;}units=normalizeUnits(!isUndefined(units)?units:'millisecond');if(units==='millisecond'){return this.valueOf()>localInput.valueOf();}else {return localInput.valueOf()<this.clone().startOf(units).valueOf();}}function isBefore(input,units){var localInput=isMoment(input)?input:local__createLocal(input);if(!(this.isValid()&&localInput.isValid())){return false;}units=normalizeUnits(!isUndefined(units)?units:'millisecond');if(units==='millisecond'){return this.valueOf()<localInput.valueOf();}else {return this.clone().endOf(units).valueOf()<localInput.valueOf();}}function isBetween(from,to,units,inclusivity){inclusivity=inclusivity||'()';return (inclusivity[0]==='('?this.isAfter(from,units):!this.isBefore(from,units))&&(inclusivity[1]===')'?this.isBefore(to,units):!this.isAfter(to,units));}function isSame(input,units){var localInput=isMoment(input)?input:local__createLocal(input),inputMs;if(!(this.isValid()&&localInput.isValid())){return false;}units=normalizeUnits(units||'millisecond');if(units==='millisecond'){return this.valueOf()===localInput.valueOf();}else {inputMs=localInput.valueOf();return this.clone().startOf(units).valueOf()<=inputMs&&inputMs<=this.clone().endOf(units).valueOf();}}function isSameOrAfter(input,units){return this.isSame(input,units)||this.isAfter(input,units);}function isSameOrBefore(input,units){return this.isSame(input,units)||this.isBefore(input,units);}function diff(input,units,asFloat){var that,zoneDelta,delta,output;if(!this.isValid()){return NaN;}that=cloneWithOffset(input,this);if(!that.isValid()){return NaN;}zoneDelta=(that.utcOffset()-this.utcOffset())*6e4;units=normalizeUnits(units);if(units==='year'||units==='month'||units==='quarter'){output=monthDiff(this,that);if(units==='quarter'){output=output/3;}else if(units==='year'){output=output/12;}}else {delta=this-that;output=units==='second'?delta/1e3: // 1000
	units==='minute'?delta/6e4: // 1000 * 60
	units==='hour'?delta/36e5: // 1000 * 60 * 60
	units==='day'?(delta-zoneDelta)/864e5: // 1000 * 60 * 60 * 24, negate dst
	units==='week'?(delta-zoneDelta)/6048e5: // 1000 * 60 * 60 * 24 * 7, negate dst
	delta;}return asFloat?output:absFloor(output);}function monthDiff(a,b){ // difference in months
	var wholeMonthDiff=(b.year()-a.year())*12+(b.month()-a.month()), // b is in (anchor - 1 month, anchor + 1 month)
	anchor=a.clone().add(wholeMonthDiff,'months'),anchor2,adjust;if(b-anchor<0){anchor2=a.clone().add(wholeMonthDiff-1,'months'); // linear across the month
	adjust=(b-anchor)/(anchor-anchor2);}else {anchor2=a.clone().add(wholeMonthDiff+1,'months'); // linear across the month
	adjust=(b-anchor)/(anchor2-anchor);} //check for negative zero, return zero if negative zero
	return -(wholeMonthDiff+adjust)||0;}utils_hooks__hooks.defaultFormat='YYYY-MM-DDTHH:mm:ssZ';utils_hooks__hooks.defaultFormatUtc='YYYY-MM-DDTHH:mm:ss[Z]';function toString(){return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');}function moment_format__toISOString(){var m=this.clone().utc();if(0<m.year()&&m.year()<=9999){if(isFunction(Date.prototype.toISOString)){ // native implementation is ~50x faster, use it when we can
	return this.toDate().toISOString();}else {return formatMoment(m,'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');}}else {return formatMoment(m,'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');}}function format(inputString){if(!inputString){inputString=this.isUtc()?utils_hooks__hooks.defaultFormatUtc:utils_hooks__hooks.defaultFormat;}var output=formatMoment(this,inputString);return this.localeData().postformat(output);}function from(time,withoutSuffix){if(this.isValid()&&(isMoment(time)&&time.isValid()||local__createLocal(time).isValid())){return create__createDuration({to:this,from:time}).locale(this.locale()).humanize(!withoutSuffix);}else {return this.localeData().invalidDate();}}function fromNow(withoutSuffix){return this.from(local__createLocal(),withoutSuffix);}function to(time,withoutSuffix){if(this.isValid()&&(isMoment(time)&&time.isValid()||local__createLocal(time).isValid())){return create__createDuration({from:this,to:time}).locale(this.locale()).humanize(!withoutSuffix);}else {return this.localeData().invalidDate();}}function toNow(withoutSuffix){return this.to(local__createLocal(),withoutSuffix);} // If passed a locale key, it will set the locale for this
	// instance.  Otherwise, it will return the locale configuration
	// variables for this instance.
	function locale(key){var newLocaleData;if(key===undefined){return this._locale._abbr;}else {newLocaleData=locale_locales__getLocale(key);if(newLocaleData!=null){this._locale=newLocaleData;}return this;}}var lang=deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',function(key){if(key===undefined){return this.localeData();}else {return this.locale(key);}});function localeData(){return this._locale;}function startOf(units){units=normalizeUnits(units); // the following switch intentionally omits break keywords
	// to utilize falling through the cases.
	switch(units){case 'year':this.month(0); /* falls through */case 'quarter':case 'month':this.date(1); /* falls through */case 'week':case 'isoWeek':case 'day':case 'date':this.hours(0); /* falls through */case 'hour':this.minutes(0); /* falls through */case 'minute':this.seconds(0); /* falls through */case 'second':this.milliseconds(0);} // weeks are a special case
	if(units==='week'){this.weekday(0);}if(units==='isoWeek'){this.isoWeekday(1);} // quarters are also special
	if(units==='quarter'){this.month(Math.floor(this.month()/3)*3);}return this;}function endOf(units){units=normalizeUnits(units);if(units===undefined||units==='millisecond'){return this;} // 'date' is an alias for 'day', so it should be considered as such.
	if(units==='date'){units='day';}return this.startOf(units).add(1,units==='isoWeek'?'week':units).subtract(1,'ms');}function to_type__valueOf(){return this._d.valueOf()-(this._offset||0)*60000;}function unix(){return Math.floor(this.valueOf()/1000);}function toDate(){return this._offset?new Date(this.valueOf()):this._d;}function toArray(){var m=this;return [m.year(),m.month(),m.date(),m.hour(),m.minute(),m.second(),m.millisecond()];}function toObject(){var m=this;return {years:m.year(),months:m.month(),date:m.date(),hours:m.hours(),minutes:m.minutes(),seconds:m.seconds(),milliseconds:m.milliseconds()};}function toJSON(){ // new Date(NaN).toJSON() === null
	return this.isValid()?this.toISOString():null;}function moment_valid__isValid(){return valid__isValid(this);}function parsingFlags(){return extend({},getParsingFlags(this));}function invalidAt(){return getParsingFlags(this).overflow;}function creationData(){return {input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict};} // FORMATTING
	addFormatToken(0,['gg',2],0,function(){return this.weekYear()%100;});addFormatToken(0,['GG',2],0,function(){return this.isoWeekYear()%100;});function addWeekYearFormatToken(token,getter){addFormatToken(0,[token,token.length],0,getter);}addWeekYearFormatToken('gggg','weekYear');addWeekYearFormatToken('ggggg','weekYear');addWeekYearFormatToken('GGGG','isoWeekYear');addWeekYearFormatToken('GGGGG','isoWeekYear'); // ALIASES
	addUnitAlias('weekYear','gg');addUnitAlias('isoWeekYear','GG'); // PARSING
	addRegexToken('G',matchSigned);addRegexToken('g',matchSigned);addRegexToken('GG',match1to2,match2);addRegexToken('gg',match1to2,match2);addRegexToken('GGGG',match1to4,match4);addRegexToken('gggg',match1to4,match4);addRegexToken('GGGGG',match1to6,match6);addRegexToken('ggggg',match1to6,match6);addWeekParseToken(['gggg','ggggg','GGGG','GGGGG'],function(input,week,config,token){week[token.substr(0,2)]=toInt(input);});addWeekParseToken(['gg','GG'],function(input,week,config,token){week[token]=utils_hooks__hooks.parseTwoDigitYear(input);}); // MOMENTS
	function getSetWeekYear(input){return getSetWeekYearHelper.call(this,input,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy);}function getSetISOWeekYear(input){return getSetWeekYearHelper.call(this,input,this.isoWeek(),this.isoWeekday(),1,4);}function getISOWeeksInYear(){return weeksInYear(this.year(),1,4);}function getWeeksInYear(){var weekInfo=this.localeData()._week;return weeksInYear(this.year(),weekInfo.dow,weekInfo.doy);}function getSetWeekYearHelper(input,week,weekday,dow,doy){var weeksTarget;if(input==null){return weekOfYear(this,dow,doy).year;}else {weeksTarget=weeksInYear(input,dow,doy);if(week>weeksTarget){week=weeksTarget;}return setWeekAll.call(this,input,week,weekday,dow,doy);}}function setWeekAll(weekYear,week,weekday,dow,doy){var dayOfYearData=dayOfYearFromWeeks(weekYear,week,weekday,dow,doy),date=createUTCDate(dayOfYearData.year,0,dayOfYearData.dayOfYear);this.year(date.getUTCFullYear());this.month(date.getUTCMonth());this.date(date.getUTCDate());return this;} // FORMATTING
	addFormatToken('Q',0,'Qo','quarter'); // ALIASES
	addUnitAlias('quarter','Q'); // PARSING
	addRegexToken('Q',match1);addParseToken('Q',function(input,array){array[MONTH]=(toInt(input)-1)*3;}); // MOMENTS
	function getSetQuarter(input){return input==null?Math.ceil((this.month()+1)/3):this.month((input-1)*3+this.month()%3);} // FORMATTING
	addFormatToken('w',['ww',2],'wo','week');addFormatToken('W',['WW',2],'Wo','isoWeek'); // ALIASES
	addUnitAlias('week','w');addUnitAlias('isoWeek','W'); // PARSING
	addRegexToken('w',match1to2);addRegexToken('ww',match1to2,match2);addRegexToken('W',match1to2);addRegexToken('WW',match1to2,match2);addWeekParseToken(['w','ww','W','WW'],function(input,week,config,token){week[token.substr(0,1)]=toInt(input);}); // HELPERS
	// LOCALES
	function localeWeek(mom){return weekOfYear(mom,this._week.dow,this._week.doy).week;}var defaultLocaleWeek={dow:0, // Sunday is the first day of the week.
	doy:6 // The week that contains Jan 1st is the first week of the year.
	};function localeFirstDayOfWeek(){return this._week.dow;}function localeFirstDayOfYear(){return this._week.doy;} // MOMENTS
	function getSetWeek(input){var week=this.localeData().week(this);return input==null?week:this.add((input-week)*7,'d');}function getSetISOWeek(input){var week=weekOfYear(this,1,4).week;return input==null?week:this.add((input-week)*7,'d');} // FORMATTING
	addFormatToken('D',['DD',2],'Do','date'); // ALIASES
	addUnitAlias('date','D'); // PARSING
	addRegexToken('D',match1to2);addRegexToken('DD',match1to2,match2);addRegexToken('Do',function(isStrict,locale){return isStrict?locale._ordinalParse:locale._ordinalParseLenient;});addParseToken(['D','DD'],DATE);addParseToken('Do',function(input,array){array[DATE]=toInt(input.match(match1to2)[0],10);}); // MOMENTS
	var getSetDayOfMonth=makeGetSet('Date',true); // FORMATTING
	addFormatToken('d',0,'do','day');addFormatToken('dd',0,0,function(format){return this.localeData().weekdaysMin(this,format);});addFormatToken('ddd',0,0,function(format){return this.localeData().weekdaysShort(this,format);});addFormatToken('dddd',0,0,function(format){return this.localeData().weekdays(this,format);});addFormatToken('e',0,0,'weekday');addFormatToken('E',0,0,'isoWeekday'); // ALIASES
	addUnitAlias('day','d');addUnitAlias('weekday','e');addUnitAlias('isoWeekday','E'); // PARSING
	addRegexToken('d',match1to2);addRegexToken('e',match1to2);addRegexToken('E',match1to2);addRegexToken('dd',function(isStrict,locale){return locale.weekdaysMinRegex(isStrict);});addRegexToken('ddd',function(isStrict,locale){return locale.weekdaysShortRegex(isStrict);});addRegexToken('dddd',function(isStrict,locale){return locale.weekdaysRegex(isStrict);});addWeekParseToken(['dd','ddd','dddd'],function(input,week,config,token){var weekday=config._locale.weekdaysParse(input,token,config._strict); // if we didn't get a weekday name, mark the date as invalid
	if(weekday!=null){week.d=weekday;}else {getParsingFlags(config).invalidWeekday=input;}});addWeekParseToken(['d','e','E'],function(input,week,config,token){week[token]=toInt(input);}); // HELPERS
	function parseWeekday(input,locale){if(typeof input!=='string'){return input;}if(!isNaN(input)){return parseInt(input,10);}input=locale.weekdaysParse(input);if(typeof input==='number'){return input;}return null;} // LOCALES
	var defaultLocaleWeekdays='Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');function localeWeekdays(m,format){return isArray(this._weekdays)?this._weekdays[m.day()]:this._weekdays[this._weekdays.isFormat.test(format)?'format':'standalone'][m.day()];}var defaultLocaleWeekdaysShort='Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');function localeWeekdaysShort(m){return this._weekdaysShort[m.day()];}var defaultLocaleWeekdaysMin='Su_Mo_Tu_We_Th_Fr_Sa'.split('_');function localeWeekdaysMin(m){return this._weekdaysMin[m.day()];}function day_of_week__handleStrictParse(weekdayName,format,strict){var i,ii,mom,llc=weekdayName.toLocaleLowerCase();if(!this._weekdaysParse){this._weekdaysParse=[];this._shortWeekdaysParse=[];this._minWeekdaysParse=[];for(i=0;i<7;++i){mom=create_utc__createUTC([2000,1]).day(i);this._minWeekdaysParse[i]=this.weekdaysMin(mom,'').toLocaleLowerCase();this._shortWeekdaysParse[i]=this.weekdaysShort(mom,'').toLocaleLowerCase();this._weekdaysParse[i]=this.weekdays(mom,'').toLocaleLowerCase();}}if(strict){if(format==='dddd'){ii=indexOf.call(this._weekdaysParse,llc);return ii!==-1?ii:null;}else if(format==='ddd'){ii=indexOf.call(this._shortWeekdaysParse,llc);return ii!==-1?ii:null;}else {ii=indexOf.call(this._minWeekdaysParse,llc);return ii!==-1?ii:null;}}else {if(format==='dddd'){ii=indexOf.call(this._weekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._shortWeekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._minWeekdaysParse,llc);return ii!==-1?ii:null;}else if(format==='ddd'){ii=indexOf.call(this._shortWeekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._weekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._minWeekdaysParse,llc);return ii!==-1?ii:null;}else {ii=indexOf.call(this._minWeekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._weekdaysParse,llc);if(ii!==-1){return ii;}ii=indexOf.call(this._shortWeekdaysParse,llc);return ii!==-1?ii:null;}}}function localeWeekdaysParse(weekdayName,format,strict){var i,mom,regex;if(this._weekdaysParseExact){return day_of_week__handleStrictParse.call(this,weekdayName,format,strict);}if(!this._weekdaysParse){this._weekdaysParse=[];this._minWeekdaysParse=[];this._shortWeekdaysParse=[];this._fullWeekdaysParse=[];}for(i=0;i<7;i++){ // make the regex if we don't have it already
	mom=create_utc__createUTC([2000,1]).day(i);if(strict&&!this._fullWeekdaysParse[i]){this._fullWeekdaysParse[i]=new RegExp('^'+this.weekdays(mom,'').replace('.','\.?')+'$','i');this._shortWeekdaysParse[i]=new RegExp('^'+this.weekdaysShort(mom,'').replace('.','\.?')+'$','i');this._minWeekdaysParse[i]=new RegExp('^'+this.weekdaysMin(mom,'').replace('.','\.?')+'$','i');}if(!this._weekdaysParse[i]){regex='^'+this.weekdays(mom,'')+'|^'+this.weekdaysShort(mom,'')+'|^'+this.weekdaysMin(mom,'');this._weekdaysParse[i]=new RegExp(regex.replace('.',''),'i');} // test the regex
	if(strict&&format==='dddd'&&this._fullWeekdaysParse[i].test(weekdayName)){return i;}else if(strict&&format==='ddd'&&this._shortWeekdaysParse[i].test(weekdayName)){return i;}else if(strict&&format==='dd'&&this._minWeekdaysParse[i].test(weekdayName)){return i;}else if(!strict&&this._weekdaysParse[i].test(weekdayName)){return i;}}} // MOMENTS
	function getSetDayOfWeek(input){if(!this.isValid()){return input!=null?this:NaN;}var day=this._isUTC?this._d.getUTCDay():this._d.getDay();if(input!=null){input=parseWeekday(input,this.localeData());return this.add(input-day,'d');}else {return day;}}function getSetLocaleDayOfWeek(input){if(!this.isValid()){return input!=null?this:NaN;}var weekday=(this.day()+7-this.localeData()._week.dow)%7;return input==null?weekday:this.add(input-weekday,'d');}function getSetISODayOfWeek(input){if(!this.isValid()){return input!=null?this:NaN;} // behaves the same as moment#day except
	// as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	// as a setter, sunday should belong to the previous week.
	return input==null?this.day()||7:this.day(this.day()%7?input:input-7);}var defaultWeekdaysRegex=matchWord;function weekdaysRegex(isStrict){if(this._weekdaysParseExact){if(!hasOwnProp(this,'_weekdaysRegex')){computeWeekdaysParse.call(this);}if(isStrict){return this._weekdaysStrictRegex;}else {return this._weekdaysRegex;}}else {return this._weekdaysStrictRegex&&isStrict?this._weekdaysStrictRegex:this._weekdaysRegex;}}var defaultWeekdaysShortRegex=matchWord;function weekdaysShortRegex(isStrict){if(this._weekdaysParseExact){if(!hasOwnProp(this,'_weekdaysRegex')){computeWeekdaysParse.call(this);}if(isStrict){return this._weekdaysShortStrictRegex;}else {return this._weekdaysShortRegex;}}else {return this._weekdaysShortStrictRegex&&isStrict?this._weekdaysShortStrictRegex:this._weekdaysShortRegex;}}var defaultWeekdaysMinRegex=matchWord;function weekdaysMinRegex(isStrict){if(this._weekdaysParseExact){if(!hasOwnProp(this,'_weekdaysRegex')){computeWeekdaysParse.call(this);}if(isStrict){return this._weekdaysMinStrictRegex;}else {return this._weekdaysMinRegex;}}else {return this._weekdaysMinStrictRegex&&isStrict?this._weekdaysMinStrictRegex:this._weekdaysMinRegex;}}function computeWeekdaysParse(){function cmpLenRev(a,b){return b.length-a.length;}var minPieces=[],shortPieces=[],longPieces=[],mixedPieces=[],i,mom,minp,shortp,longp;for(i=0;i<7;i++){ // make the regex if we don't have it already
	mom=create_utc__createUTC([2000,1]).day(i);minp=this.weekdaysMin(mom,'');shortp=this.weekdaysShort(mom,'');longp=this.weekdays(mom,'');minPieces.push(minp);shortPieces.push(shortp);longPieces.push(longp);mixedPieces.push(minp);mixedPieces.push(shortp);mixedPieces.push(longp);} // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	// will match the longer piece.
	minPieces.sort(cmpLenRev);shortPieces.sort(cmpLenRev);longPieces.sort(cmpLenRev);mixedPieces.sort(cmpLenRev);for(i=0;i<7;i++){shortPieces[i]=regexEscape(shortPieces[i]);longPieces[i]=regexEscape(longPieces[i]);mixedPieces[i]=regexEscape(mixedPieces[i]);}this._weekdaysRegex=new RegExp('^('+mixedPieces.join('|')+')','i');this._weekdaysShortRegex=this._weekdaysRegex;this._weekdaysMinRegex=this._weekdaysRegex;this._weekdaysStrictRegex=new RegExp('^('+longPieces.join('|')+')','i');this._weekdaysShortStrictRegex=new RegExp('^('+shortPieces.join('|')+')','i');this._weekdaysMinStrictRegex=new RegExp('^('+minPieces.join('|')+')','i');} // FORMATTING
	addFormatToken('DDD',['DDDD',3],'DDDo','dayOfYear'); // ALIASES
	addUnitAlias('dayOfYear','DDD'); // PARSING
	addRegexToken('DDD',match1to3);addRegexToken('DDDD',match3);addParseToken(['DDD','DDDD'],function(input,array,config){config._dayOfYear=toInt(input);}); // HELPERS
	// MOMENTS
	function getSetDayOfYear(input){var dayOfYear=Math.round((this.clone().startOf('day')-this.clone().startOf('year'))/864e5)+1;return input==null?dayOfYear:this.add(input-dayOfYear,'d');} // FORMATTING
	function hFormat(){return this.hours()%12||12;}function kFormat(){return this.hours()||24;}addFormatToken('H',['HH',2],0,'hour');addFormatToken('h',['hh',2],0,hFormat);addFormatToken('k',['kk',2],0,kFormat);addFormatToken('hmm',0,0,function(){return ''+hFormat.apply(this)+zeroFill(this.minutes(),2);});addFormatToken('hmmss',0,0,function(){return ''+hFormat.apply(this)+zeroFill(this.minutes(),2)+zeroFill(this.seconds(),2);});addFormatToken('Hmm',0,0,function(){return ''+this.hours()+zeroFill(this.minutes(),2);});addFormatToken('Hmmss',0,0,function(){return ''+this.hours()+zeroFill(this.minutes(),2)+zeroFill(this.seconds(),2);});function meridiem(token,lowercase){addFormatToken(token,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),lowercase);});}meridiem('a',true);meridiem('A',false); // ALIASES
	addUnitAlias('hour','h'); // PARSING
	function matchMeridiem(isStrict,locale){return locale._meridiemParse;}addRegexToken('a',matchMeridiem);addRegexToken('A',matchMeridiem);addRegexToken('H',match1to2);addRegexToken('h',match1to2);addRegexToken('HH',match1to2,match2);addRegexToken('hh',match1to2,match2);addRegexToken('hmm',match3to4);addRegexToken('hmmss',match5to6);addRegexToken('Hmm',match3to4);addRegexToken('Hmmss',match5to6);addParseToken(['H','HH'],HOUR);addParseToken(['a','A'],function(input,array,config){config._isPm=config._locale.isPM(input);config._meridiem=input;});addParseToken(['h','hh'],function(input,array,config){array[HOUR]=toInt(input);getParsingFlags(config).bigHour=true;});addParseToken('hmm',function(input,array,config){var pos=input.length-2;array[HOUR]=toInt(input.substr(0,pos));array[MINUTE]=toInt(input.substr(pos));getParsingFlags(config).bigHour=true;});addParseToken('hmmss',function(input,array,config){var pos1=input.length-4;var pos2=input.length-2;array[HOUR]=toInt(input.substr(0,pos1));array[MINUTE]=toInt(input.substr(pos1,2));array[SECOND]=toInt(input.substr(pos2));getParsingFlags(config).bigHour=true;});addParseToken('Hmm',function(input,array,config){var pos=input.length-2;array[HOUR]=toInt(input.substr(0,pos));array[MINUTE]=toInt(input.substr(pos));});addParseToken('Hmmss',function(input,array,config){var pos1=input.length-4;var pos2=input.length-2;array[HOUR]=toInt(input.substr(0,pos1));array[MINUTE]=toInt(input.substr(pos1,2));array[SECOND]=toInt(input.substr(pos2));}); // LOCALES
	function localeIsPM(input){ // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	// Using charAt should be more compatible.
	return (input+'').toLowerCase().charAt(0)==='p';}var defaultLocaleMeridiemParse=/[ap]\.?m?\.?/i;function localeMeridiem(hours,minutes,isLower){if(hours>11){return isLower?'pm':'PM';}else {return isLower?'am':'AM';}} // MOMENTS
	// Setting the hour should keep the time, because the user explicitly
	// specified which hour he wants. So trying to maintain the same hour (in
	// a new timezone) makes sense. Adding/subtracting hours does not follow
	// this rule.
	var getSetHour=makeGetSet('Hours',true); // FORMATTING
	addFormatToken('m',['mm',2],0,'minute'); // ALIASES
	addUnitAlias('minute','m'); // PARSING
	addRegexToken('m',match1to2);addRegexToken('mm',match1to2,match2);addParseToken(['m','mm'],MINUTE); // MOMENTS
	var getSetMinute=makeGetSet('Minutes',false); // FORMATTING
	addFormatToken('s',['ss',2],0,'second'); // ALIASES
	addUnitAlias('second','s'); // PARSING
	addRegexToken('s',match1to2);addRegexToken('ss',match1to2,match2);addParseToken(['s','ss'],SECOND); // MOMENTS
	var getSetSecond=makeGetSet('Seconds',false); // FORMATTING
	addFormatToken('S',0,0,function(){return ~ ~(this.millisecond()/100);});addFormatToken(0,['SS',2],0,function(){return ~ ~(this.millisecond()/10);});addFormatToken(0,['SSS',3],0,'millisecond');addFormatToken(0,['SSSS',4],0,function(){return this.millisecond()*10;});addFormatToken(0,['SSSSS',5],0,function(){return this.millisecond()*100;});addFormatToken(0,['SSSSSS',6],0,function(){return this.millisecond()*1000;});addFormatToken(0,['SSSSSSS',7],0,function(){return this.millisecond()*10000;});addFormatToken(0,['SSSSSSSS',8],0,function(){return this.millisecond()*100000;});addFormatToken(0,['SSSSSSSSS',9],0,function(){return this.millisecond()*1000000;}); // ALIASES
	addUnitAlias('millisecond','ms'); // PARSING
	addRegexToken('S',match1to3,match1);addRegexToken('SS',match1to3,match2);addRegexToken('SSS',match1to3,match3);var token;for(token='SSSS';token.length<=9;token+='S'){addRegexToken(token,matchUnsigned);}function parseMs(input,array){array[MILLISECOND]=toInt(('0.'+input)*1000);}for(token='S';token.length<=9;token+='S'){addParseToken(token,parseMs);} // MOMENTS
	var getSetMillisecond=makeGetSet('Milliseconds',false); // FORMATTING
	addFormatToken('z',0,0,'zoneAbbr');addFormatToken('zz',0,0,'zoneName'); // MOMENTS
	function getZoneAbbr(){return this._isUTC?'UTC':'';}function getZoneName(){return this._isUTC?'Coordinated Universal Time':'';}var momentPrototype__proto=Moment.prototype;momentPrototype__proto.add=add_subtract__add;momentPrototype__proto.calendar=moment_calendar__calendar;momentPrototype__proto.clone=clone;momentPrototype__proto.diff=diff;momentPrototype__proto.endOf=endOf;momentPrototype__proto.format=format;momentPrototype__proto.from=from;momentPrototype__proto.fromNow=fromNow;momentPrototype__proto.to=to;momentPrototype__proto.toNow=toNow;momentPrototype__proto.get=getSet;momentPrototype__proto.invalidAt=invalidAt;momentPrototype__proto.isAfter=isAfter;momentPrototype__proto.isBefore=isBefore;momentPrototype__proto.isBetween=isBetween;momentPrototype__proto.isSame=isSame;momentPrototype__proto.isSameOrAfter=isSameOrAfter;momentPrototype__proto.isSameOrBefore=isSameOrBefore;momentPrototype__proto.isValid=moment_valid__isValid;momentPrototype__proto.lang=lang;momentPrototype__proto.locale=locale;momentPrototype__proto.localeData=localeData;momentPrototype__proto.max=prototypeMax;momentPrototype__proto.min=prototypeMin;momentPrototype__proto.parsingFlags=parsingFlags;momentPrototype__proto.set=getSet;momentPrototype__proto.startOf=startOf;momentPrototype__proto.subtract=add_subtract__subtract;momentPrototype__proto.toArray=toArray;momentPrototype__proto.toObject=toObject;momentPrototype__proto.toDate=toDate;momentPrototype__proto.toISOString=moment_format__toISOString;momentPrototype__proto.toJSON=toJSON;momentPrototype__proto.toString=toString;momentPrototype__proto.unix=unix;momentPrototype__proto.valueOf=to_type__valueOf;momentPrototype__proto.creationData=creationData; // Year
	momentPrototype__proto.year=getSetYear;momentPrototype__proto.isLeapYear=getIsLeapYear; // Week Year
	momentPrototype__proto.weekYear=getSetWeekYear;momentPrototype__proto.isoWeekYear=getSetISOWeekYear; // Quarter
	momentPrototype__proto.quarter=momentPrototype__proto.quarters=getSetQuarter; // Month
	momentPrototype__proto.month=getSetMonth;momentPrototype__proto.daysInMonth=getDaysInMonth; // Week
	momentPrototype__proto.week=momentPrototype__proto.weeks=getSetWeek;momentPrototype__proto.isoWeek=momentPrototype__proto.isoWeeks=getSetISOWeek;momentPrototype__proto.weeksInYear=getWeeksInYear;momentPrototype__proto.isoWeeksInYear=getISOWeeksInYear; // Day
	momentPrototype__proto.date=getSetDayOfMonth;momentPrototype__proto.day=momentPrototype__proto.days=getSetDayOfWeek;momentPrototype__proto.weekday=getSetLocaleDayOfWeek;momentPrototype__proto.isoWeekday=getSetISODayOfWeek;momentPrototype__proto.dayOfYear=getSetDayOfYear; // Hour
	momentPrototype__proto.hour=momentPrototype__proto.hours=getSetHour; // Minute
	momentPrototype__proto.minute=momentPrototype__proto.minutes=getSetMinute; // Second
	momentPrototype__proto.second=momentPrototype__proto.seconds=getSetSecond; // Millisecond
	momentPrototype__proto.millisecond=momentPrototype__proto.milliseconds=getSetMillisecond; // Offset
	momentPrototype__proto.utcOffset=getSetOffset;momentPrototype__proto.utc=setOffsetToUTC;momentPrototype__proto.local=setOffsetToLocal;momentPrototype__proto.parseZone=setOffsetToParsedOffset;momentPrototype__proto.hasAlignedHourOffset=hasAlignedHourOffset;momentPrototype__proto.isDST=isDaylightSavingTime;momentPrototype__proto.isDSTShifted=isDaylightSavingTimeShifted;momentPrototype__proto.isLocal=isLocal;momentPrototype__proto.isUtcOffset=isUtcOffset;momentPrototype__proto.isUtc=isUtc;momentPrototype__proto.isUTC=isUtc; // Timezone
	momentPrototype__proto.zoneAbbr=getZoneAbbr;momentPrototype__proto.zoneName=getZoneName; // Deprecations
	momentPrototype__proto.dates=deprecate('dates accessor is deprecated. Use date instead.',getSetDayOfMonth);momentPrototype__proto.months=deprecate('months accessor is deprecated. Use month instead',getSetMonth);momentPrototype__proto.years=deprecate('years accessor is deprecated. Use year instead',getSetYear);momentPrototype__proto.zone=deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779',getSetZone);var momentPrototype=momentPrototype__proto;function moment__createUnix(input){return local__createLocal(input*1000);}function moment__createInZone(){return local__createLocal.apply(null,arguments).parseZone();}var defaultCalendar={sameDay:'[Today at] LT',nextDay:'[Tomorrow at] LT',nextWeek:'dddd [at] LT',lastDay:'[Yesterday at] LT',lastWeek:'[Last] dddd [at] LT',sameElse:'L'};function locale_calendar__calendar(key,mom,now){var output=this._calendar[key];return isFunction(output)?output.call(mom,now):output;}var defaultLongDateFormat={LTS:'h:mm:ss A',LT:'h:mm A',L:'MM/DD/YYYY',LL:'MMMM D, YYYY',LLL:'MMMM D, YYYY h:mm A',LLLL:'dddd, MMMM D, YYYY h:mm A'};function longDateFormat(key){var format=this._longDateFormat[key],formatUpper=this._longDateFormat[key.toUpperCase()];if(format||!formatUpper){return format;}this._longDateFormat[key]=formatUpper.replace(/MMMM|MM|DD|dddd/g,function(val){return val.slice(1);});return this._longDateFormat[key];}var defaultInvalidDate='Invalid date';function invalidDate(){return this._invalidDate;}var defaultOrdinal='%d';var defaultOrdinalParse=/\d{1,2}/;function ordinal(number){return this._ordinal.replace('%d',number);}function preParsePostFormat(string){return string;}var defaultRelativeTime={future:'in %s',past:'%s ago',s:'a few seconds',m:'a minute',mm:'%d minutes',h:'an hour',hh:'%d hours',d:'a day',dd:'%d days',M:'a month',MM:'%d months',y:'a year',yy:'%d years'};function relative__relativeTime(number,withoutSuffix,string,isFuture){var output=this._relativeTime[string];return isFunction(output)?output(number,withoutSuffix,string,isFuture):output.replace(/%d/i,number);}function pastFuture(diff,output){var format=this._relativeTime[diff>0?'future':'past'];return isFunction(format)?format(output):format.replace(/%s/i,output);}var prototype__proto=Locale.prototype;prototype__proto._calendar=defaultCalendar;prototype__proto.calendar=locale_calendar__calendar;prototype__proto._longDateFormat=defaultLongDateFormat;prototype__proto.longDateFormat=longDateFormat;prototype__proto._invalidDate=defaultInvalidDate;prototype__proto.invalidDate=invalidDate;prototype__proto._ordinal=defaultOrdinal;prototype__proto.ordinal=ordinal;prototype__proto._ordinalParse=defaultOrdinalParse;prototype__proto.preparse=preParsePostFormat;prototype__proto.postformat=preParsePostFormat;prototype__proto._relativeTime=defaultRelativeTime;prototype__proto.relativeTime=relative__relativeTime;prototype__proto.pastFuture=pastFuture;prototype__proto.set=locale_set__set; // Month
	prototype__proto.months=localeMonths;prototype__proto._months=defaultLocaleMonths;prototype__proto.monthsShort=localeMonthsShort;prototype__proto._monthsShort=defaultLocaleMonthsShort;prototype__proto.monthsParse=localeMonthsParse;prototype__proto._monthsRegex=defaultMonthsRegex;prototype__proto.monthsRegex=monthsRegex;prototype__proto._monthsShortRegex=defaultMonthsShortRegex;prototype__proto.monthsShortRegex=monthsShortRegex; // Week
	prototype__proto.week=localeWeek;prototype__proto._week=defaultLocaleWeek;prototype__proto.firstDayOfYear=localeFirstDayOfYear;prototype__proto.firstDayOfWeek=localeFirstDayOfWeek; // Day of Week
	prototype__proto.weekdays=localeWeekdays;prototype__proto._weekdays=defaultLocaleWeekdays;prototype__proto.weekdaysMin=localeWeekdaysMin;prototype__proto._weekdaysMin=defaultLocaleWeekdaysMin;prototype__proto.weekdaysShort=localeWeekdaysShort;prototype__proto._weekdaysShort=defaultLocaleWeekdaysShort;prototype__proto.weekdaysParse=localeWeekdaysParse;prototype__proto._weekdaysRegex=defaultWeekdaysRegex;prototype__proto.weekdaysRegex=weekdaysRegex;prototype__proto._weekdaysShortRegex=defaultWeekdaysShortRegex;prototype__proto.weekdaysShortRegex=weekdaysShortRegex;prototype__proto._weekdaysMinRegex=defaultWeekdaysMinRegex;prototype__proto.weekdaysMinRegex=weekdaysMinRegex; // Hours
	prototype__proto.isPM=localeIsPM;prototype__proto._meridiemParse=defaultLocaleMeridiemParse;prototype__proto.meridiem=localeMeridiem;function lists__get(format,index,field,setter){var locale=locale_locales__getLocale();var utc=create_utc__createUTC().set(setter,index);return locale[field](utc,format);}function listMonthsImpl(format,index,field){if(typeof format==='number'){index=format;format=undefined;}format=format||'';if(index!=null){return lists__get(format,index,field,'month');}var i;var out=[];for(i=0;i<12;i++){out[i]=lists__get(format,i,field,'month');}return out;} // ()
	// (5)
	// (fmt, 5)
	// (fmt)
	// (true)
	// (true, 5)
	// (true, fmt, 5)
	// (true, fmt)
	function listWeekdaysImpl(localeSorted,format,index,field){if(typeof localeSorted==='boolean'){if(typeof format==='number'){index=format;format=undefined;}format=format||'';}else {format=localeSorted;index=format;localeSorted=false;if(typeof format==='number'){index=format;format=undefined;}format=format||'';}var locale=locale_locales__getLocale(),shift=localeSorted?locale._week.dow:0;if(index!=null){return lists__get(format,(index+shift)%7,field,'day');}var i;var out=[];for(i=0;i<7;i++){out[i]=lists__get(format,(i+shift)%7,field,'day');}return out;}function lists__listMonths(format,index){return listMonthsImpl(format,index,'months');}function lists__listMonthsShort(format,index){return listMonthsImpl(format,index,'monthsShort');}function lists__listWeekdays(localeSorted,format,index){return listWeekdaysImpl(localeSorted,format,index,'weekdays');}function lists__listWeekdaysShort(localeSorted,format,index){return listWeekdaysImpl(localeSorted,format,index,'weekdaysShort');}function lists__listWeekdaysMin(localeSorted,format,index){return listWeekdaysImpl(localeSorted,format,index,'weekdaysMin');}locale_locales__getSetGlobalLocale('en',{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function ordinal(number){var b=number%10,output=toInt(number%100/10)===1?'th':b===1?'st':b===2?'nd':b===3?'rd':'th';return number+output;}}); // Side effect imports
	utils_hooks__hooks.lang=deprecate('moment.lang is deprecated. Use moment.locale instead.',locale_locales__getSetGlobalLocale);utils_hooks__hooks.langData=deprecate('moment.langData is deprecated. Use moment.localeData instead.',locale_locales__getLocale);var mathAbs=Math.abs;function duration_abs__abs(){var data=this._data;this._milliseconds=mathAbs(this._milliseconds);this._days=mathAbs(this._days);this._months=mathAbs(this._months);data.milliseconds=mathAbs(data.milliseconds);data.seconds=mathAbs(data.seconds);data.minutes=mathAbs(data.minutes);data.hours=mathAbs(data.hours);data.months=mathAbs(data.months);data.years=mathAbs(data.years);return this;}function duration_add_subtract__addSubtract(duration,input,value,direction){var other=create__createDuration(input,value);duration._milliseconds+=direction*other._milliseconds;duration._days+=direction*other._days;duration._months+=direction*other._months;return duration._bubble();} // supports only 2.0-style add(1, 's') or add(duration)
	function duration_add_subtract__add(input,value){return duration_add_subtract__addSubtract(this,input,value,1);} // supports only 2.0-style subtract(1, 's') or subtract(duration)
	function duration_add_subtract__subtract(input,value){return duration_add_subtract__addSubtract(this,input,value,-1);}function absCeil(number){if(number<0){return Math.floor(number);}else {return Math.ceil(number);}}function bubble(){var milliseconds=this._milliseconds;var days=this._days;var months=this._months;var data=this._data;var seconds,minutes,hours,years,monthsFromDays; // if we have a mix of positive and negative values, bubble down first
	// check: https://github.com/moment/moment/issues/2166
	if(!(milliseconds>=0&&days>=0&&months>=0||milliseconds<=0&&days<=0&&months<=0)){milliseconds+=absCeil(monthsToDays(months)+days)*864e5;days=0;months=0;} // The following code bubbles up values, see the tests for
	// examples of what that means.
	data.milliseconds=milliseconds%1000;seconds=absFloor(milliseconds/1000);data.seconds=seconds%60;minutes=absFloor(seconds/60);data.minutes=minutes%60;hours=absFloor(minutes/60);data.hours=hours%24;days+=absFloor(hours/24); // convert days to months
	monthsFromDays=absFloor(daysToMonths(days));months+=monthsFromDays;days-=absCeil(monthsToDays(monthsFromDays)); // 12 months -> 1 year
	years=absFloor(months/12);months%=12;data.days=days;data.months=months;data.years=years;return this;}function daysToMonths(days){ // 400 years have 146097 days (taking into account leap year rules)
	// 400 years have 12 months === 4800
	return days*4800/146097;}function monthsToDays(months){ // the reverse of daysToMonths
	return months*146097/4800;}function as(units){var days;var months;var milliseconds=this._milliseconds;units=normalizeUnits(units);if(units==='month'||units==='year'){days=this._days+milliseconds/864e5;months=this._months+daysToMonths(days);return units==='month'?months:months/12;}else { // handle milliseconds separately because of floating point math errors (issue #1867)
	days=this._days+Math.round(monthsToDays(this._months));switch(units){case 'week':return days/7+milliseconds/6048e5;case 'day':return days+milliseconds/864e5;case 'hour':return days*24+milliseconds/36e5;case 'minute':return days*1440+milliseconds/6e4;case 'second':return days*86400+milliseconds/1000; // Math.floor prevents floating point math errors here
	case 'millisecond':return Math.floor(days*864e5)+milliseconds;default:throw new Error('Unknown unit '+units);}}} // TODO: Use this.as('ms')?
	function duration_as__valueOf(){return this._milliseconds+this._days*864e5+this._months%12*2592e6+toInt(this._months/12)*31536e6;}function makeAs(alias){return function(){return this.as(alias);};}var asMilliseconds=makeAs('ms');var asSeconds=makeAs('s');var asMinutes=makeAs('m');var asHours=makeAs('h');var asDays=makeAs('d');var asWeeks=makeAs('w');var asMonths=makeAs('M');var asYears=makeAs('y');function duration_get__get(units){units=normalizeUnits(units);return this[units+'s']();}function makeGetter(name){return function(){return this._data[name];};}var milliseconds=makeGetter('milliseconds');var seconds=makeGetter('seconds');var minutes=makeGetter('minutes');var hours=makeGetter('hours');var days=makeGetter('days');var months=makeGetter('months');var years=makeGetter('years');function weeks(){return absFloor(this.days()/7);}var round=Math.round;var thresholds={s:45, // seconds to minute
	m:45, // minutes to hour
	h:22, // hours to day
	d:26, // days to month
	M:11 // months to year
	}; // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	function substituteTimeAgo(string,number,withoutSuffix,isFuture,locale){return locale.relativeTime(number||1,!!withoutSuffix,string,isFuture);}function duration_humanize__relativeTime(posNegDuration,withoutSuffix,locale){var duration=create__createDuration(posNegDuration).abs();var seconds=round(duration.as('s'));var minutes=round(duration.as('m'));var hours=round(duration.as('h'));var days=round(duration.as('d'));var months=round(duration.as('M'));var years=round(duration.as('y'));var a=seconds<thresholds.s&&['s',seconds]||minutes<=1&&['m']||minutes<thresholds.m&&['mm',minutes]||hours<=1&&['h']||hours<thresholds.h&&['hh',hours]||days<=1&&['d']||days<thresholds.d&&['dd',days]||months<=1&&['M']||months<thresholds.M&&['MM',months]||years<=1&&['y']||['yy',years];a[2]=withoutSuffix;a[3]=+posNegDuration>0;a[4]=locale;return substituteTimeAgo.apply(null,a);} // This function allows you to set a threshold for relative time strings
	function duration_humanize__getSetRelativeTimeThreshold(threshold,limit){if(thresholds[threshold]===undefined){return false;}if(limit===undefined){return thresholds[threshold];}thresholds[threshold]=limit;return true;}function humanize(withSuffix){var locale=this.localeData();var output=duration_humanize__relativeTime(this,!withSuffix,locale);if(withSuffix){output=locale.pastFuture(+this,output);}return locale.postformat(output);}var iso_string__abs=Math.abs;function iso_string__toISOString(){ // for ISO strings we do not use the normal bubbling rules:
	//  * milliseconds bubble up until they become hours
	//  * days do not bubble at all
	//  * months bubble up until they become years
	// This is because there is no context-free conversion between hours and days
	// (think of clock changes)
	// and also not between days and months (28-31 days per month)
	var seconds=iso_string__abs(this._milliseconds)/1000;var days=iso_string__abs(this._days);var months=iso_string__abs(this._months);var minutes,hours,years; // 3600 seconds -> 60 minutes -> 1 hour
	minutes=absFloor(seconds/60);hours=absFloor(minutes/60);seconds%=60;minutes%=60; // 12 months -> 1 year
	years=absFloor(months/12);months%=12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	var Y=years;var M=months;var D=days;var h=hours;var m=minutes;var s=seconds;var total=this.asSeconds();if(!total){ // this is the same as C#'s (Noda) and python (isodate)...
	// but not other JS (goog.date)
	return 'P0D';}return (total<0?'-':'')+'P'+(Y?Y+'Y':'')+(M?M+'M':'')+(D?D+'D':'')+(h||m||s?'T':'')+(h?h+'H':'')+(m?m+'M':'')+(s?s+'S':'');}var duration_prototype__proto=Duration.prototype;duration_prototype__proto.abs=duration_abs__abs;duration_prototype__proto.add=duration_add_subtract__add;duration_prototype__proto.subtract=duration_add_subtract__subtract;duration_prototype__proto.as=as;duration_prototype__proto.asMilliseconds=asMilliseconds;duration_prototype__proto.asSeconds=asSeconds;duration_prototype__proto.asMinutes=asMinutes;duration_prototype__proto.asHours=asHours;duration_prototype__proto.asDays=asDays;duration_prototype__proto.asWeeks=asWeeks;duration_prototype__proto.asMonths=asMonths;duration_prototype__proto.asYears=asYears;duration_prototype__proto.valueOf=duration_as__valueOf;duration_prototype__proto._bubble=bubble;duration_prototype__proto.get=duration_get__get;duration_prototype__proto.milliseconds=milliseconds;duration_prototype__proto.seconds=seconds;duration_prototype__proto.minutes=minutes;duration_prototype__proto.hours=hours;duration_prototype__proto.days=days;duration_prototype__proto.weeks=weeks;duration_prototype__proto.months=months;duration_prototype__proto.years=years;duration_prototype__proto.humanize=humanize;duration_prototype__proto.toISOString=iso_string__toISOString;duration_prototype__proto.toString=iso_string__toISOString;duration_prototype__proto.toJSON=iso_string__toISOString;duration_prototype__proto.locale=locale;duration_prototype__proto.localeData=localeData; // Deprecations
	duration_prototype__proto.toIsoString=deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',iso_string__toISOString);duration_prototype__proto.lang=lang; // Side effect imports
	// FORMATTING
	addFormatToken('X',0,0,'unix');addFormatToken('x',0,0,'valueOf'); // PARSING
	addRegexToken('x',matchSigned);addRegexToken('X',matchTimestamp);addParseToken('X',function(input,array,config){config._d=new Date(parseFloat(input,10)*1000);});addParseToken('x',function(input,array,config){config._d=new Date(toInt(input));}); // Side effect imports
	utils_hooks__hooks.version='2.13.0';setHookCallback(local__createLocal);utils_hooks__hooks.fn=momentPrototype;utils_hooks__hooks.min=min;utils_hooks__hooks.max=max;utils_hooks__hooks.now=now;utils_hooks__hooks.utc=create_utc__createUTC;utils_hooks__hooks.unix=moment__createUnix;utils_hooks__hooks.months=lists__listMonths;utils_hooks__hooks.isDate=isDate;utils_hooks__hooks.locale=locale_locales__getSetGlobalLocale;utils_hooks__hooks.invalid=valid__createInvalid;utils_hooks__hooks.duration=create__createDuration;utils_hooks__hooks.isMoment=isMoment;utils_hooks__hooks.weekdays=lists__listWeekdays;utils_hooks__hooks.parseZone=moment__createInZone;utils_hooks__hooks.localeData=locale_locales__getLocale;utils_hooks__hooks.isDuration=isDuration;utils_hooks__hooks.monthsShort=lists__listMonthsShort;utils_hooks__hooks.weekdaysMin=lists__listWeekdaysMin;utils_hooks__hooks.defineLocale=defineLocale;utils_hooks__hooks.updateLocale=updateLocale;utils_hooks__hooks.locales=locale_locales__listLocales;utils_hooks__hooks.weekdaysShort=lists__listWeekdaysShort;utils_hooks__hooks.normalizeUnits=normalizeUnits;utils_hooks__hooks.relativeTimeThreshold=duration_humanize__getSetRelativeTimeThreshold;utils_hooks__hooks.prototype=momentPrototype;var _moment=utils_hooks__hooks;return _moment;});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 61,
		"./af.js": 61,
		"./ar": 62,
		"./ar-ma": 63,
		"./ar-ma.js": 63,
		"./ar-sa": 64,
		"./ar-sa.js": 64,
		"./ar-tn": 65,
		"./ar-tn.js": 65,
		"./ar.js": 62,
		"./az": 66,
		"./az.js": 66,
		"./be": 67,
		"./be.js": 67,
		"./bg": 68,
		"./bg.js": 68,
		"./bn": 69,
		"./bn.js": 69,
		"./bo": 70,
		"./bo.js": 70,
		"./br": 71,
		"./br.js": 71,
		"./bs": 72,
		"./bs.js": 72,
		"./ca": 73,
		"./ca.js": 73,
		"./cs": 74,
		"./cs.js": 74,
		"./cv": 75,
		"./cv.js": 75,
		"./cy": 76,
		"./cy.js": 76,
		"./da": 77,
		"./da.js": 77,
		"./de": 78,
		"./de-at": 79,
		"./de-at.js": 79,
		"./de.js": 78,
		"./dv": 80,
		"./dv.js": 80,
		"./el": 81,
		"./el.js": 81,
		"./en-au": 82,
		"./en-au.js": 82,
		"./en-ca": 83,
		"./en-ca.js": 83,
		"./en-gb": 84,
		"./en-gb.js": 84,
		"./en-ie": 85,
		"./en-ie.js": 85,
		"./en-nz": 86,
		"./en-nz.js": 86,
		"./eo": 87,
		"./eo.js": 87,
		"./es": 88,
		"./es.js": 88,
		"./et": 89,
		"./et.js": 89,
		"./eu": 90,
		"./eu.js": 90,
		"./fa": 91,
		"./fa.js": 91,
		"./fi": 92,
		"./fi.js": 92,
		"./fo": 93,
		"./fo.js": 93,
		"./fr": 94,
		"./fr-ca": 95,
		"./fr-ca.js": 95,
		"./fr-ch": 96,
		"./fr-ch.js": 96,
		"./fr.js": 94,
		"./fy": 97,
		"./fy.js": 97,
		"./gd": 98,
		"./gd.js": 98,
		"./gl": 99,
		"./gl.js": 99,
		"./he": 100,
		"./he.js": 100,
		"./hi": 101,
		"./hi.js": 101,
		"./hr": 102,
		"./hr.js": 102,
		"./hu": 103,
		"./hu.js": 103,
		"./hy-am": 104,
		"./hy-am.js": 104,
		"./id": 105,
		"./id.js": 105,
		"./is": 106,
		"./is.js": 106,
		"./it": 107,
		"./it.js": 107,
		"./ja": 108,
		"./ja.js": 108,
		"./jv": 109,
		"./jv.js": 109,
		"./ka": 110,
		"./ka.js": 110,
		"./kk": 111,
		"./kk.js": 111,
		"./km": 112,
		"./km.js": 112,
		"./ko": 113,
		"./ko.js": 113,
		"./ky": 114,
		"./ky.js": 114,
		"./lb": 115,
		"./lb.js": 115,
		"./lo": 116,
		"./lo.js": 116,
		"./lt": 117,
		"./lt.js": 117,
		"./lv": 118,
		"./lv.js": 118,
		"./me": 119,
		"./me.js": 119,
		"./mk": 120,
		"./mk.js": 120,
		"./ml": 121,
		"./ml.js": 121,
		"./mr": 122,
		"./mr.js": 122,
		"./ms": 123,
		"./ms-my": 124,
		"./ms-my.js": 124,
		"./ms.js": 123,
		"./my": 125,
		"./my.js": 125,
		"./nb": 126,
		"./nb.js": 126,
		"./ne": 127,
		"./ne.js": 127,
		"./nl": 128,
		"./nl.js": 128,
		"./nn": 129,
		"./nn.js": 129,
		"./pa-in": 130,
		"./pa-in.js": 130,
		"./pl": 131,
		"./pl.js": 131,
		"./pt": 132,
		"./pt-br": 133,
		"./pt-br.js": 133,
		"./pt.js": 132,
		"./ro": 134,
		"./ro.js": 134,
		"./ru": 135,
		"./ru.js": 135,
		"./se": 136,
		"./se.js": 136,
		"./si": 137,
		"./si.js": 137,
		"./sk": 138,
		"./sk.js": 138,
		"./sl": 139,
		"./sl.js": 139,
		"./sq": 140,
		"./sq.js": 140,
		"./sr": 141,
		"./sr-cyrl": 142,
		"./sr-cyrl.js": 142,
		"./sr.js": 141,
		"./ss": 143,
		"./ss.js": 143,
		"./sv": 144,
		"./sv.js": 144,
		"./sw": 145,
		"./sw.js": 145,
		"./ta": 146,
		"./ta.js": 146,
		"./te": 147,
		"./te.js": 147,
		"./th": 148,
		"./th.js": 148,
		"./tl-ph": 149,
		"./tl-ph.js": 149,
		"./tlh": 150,
		"./tlh.js": 150,
		"./tr": 151,
		"./tr.js": 151,
		"./tzl": 152,
		"./tzl.js": 152,
		"./tzm": 153,
		"./tzm-latn": 154,
		"./tzm-latn.js": 154,
		"./tzm.js": 153,
		"./uk": 155,
		"./uk.js": 155,
		"./uz": 156,
		"./uz.js": 156,
		"./vi": 157,
		"./vi.js": 157,
		"./x-pseudo": 158,
		"./x-pseudo.js": 158,
		"./zh-cn": 159,
		"./zh-cn.js": 159,
		"./zh-tw": 160,
		"./zh-tw.js": 160
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 60;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : afrikaans (af)
	//! author : Werner Mollentze : https://github.com/wernerm

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var af = moment.defineLocale('af', {
	        months: 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
	        weekdays: 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
	        weekdaysShort: 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
	        weekdaysMin: 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
	        meridiemParse: /vm|nm/i,
	        isPM: function isPM(input) {
	            return (/^nm$/i.test(input)
	            );
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'vm' : 'VM';
	            } else {
	                return isLower ? 'nm' : 'NM';
	            }
	        },
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Vandag om] LT',
	            nextDay: '[Môre om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[Gister om] LT',
	            lastWeek: '[Laas] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'oor %s',
	            past: '%s gelede',
	            s: '\'n paar sekondes',
	            m: '\'n minuut',
	            mm: '%d minute',
	            h: '\'n uur',
	            hh: '%d ure',
	            d: '\'n dag',
	            dd: '%d dae',
	            M: '\'n maand',
	            MM: '%d maande',
	            y: '\'n jaar',
	            yy: '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal: function ordinal(number) {
	            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
	        },
	        week: {
	            dow: 1, // Maandag is die eerste dag van die week.
	            doy: 4 // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
	        }
	    });

	    return af;
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! Locale: Arabic (ar)
	//! Author: Abdel Said: https://github.com/abdelsaid
	//! Changes in months, weekdays: Ahmed Elkhatib
	//! Native plural forms: forabi https://github.com/forabi

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    },
	        numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    },
	        pluralForm = function pluralForm(n) {
	        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	    },
	        plurals = {
	        s: ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	        m: ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	        h: ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	        d: ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	        M: ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	        y: ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	    },
	        pluralize = function pluralize(u) {
	        return function (number, withoutSuffix, string, isFuture) {
	            var f = pluralForm(number),
	                str = plurals[u][pluralForm(number)];
	            if (f === 2) {
	                str = str[withoutSuffix ? 0 : 1];
	            }
	            return str.replace(/%d/i, number);
	        };
	    },
	        months = ['كانون الثاني يناير', 'شباط فبراير', 'آذار مارس', 'نيسان أبريل', 'أيار مايو', 'حزيران يونيو', 'تموز يوليو', 'آب أغسطس', 'أيلول سبتمبر', 'تشرين الأول أكتوبر', 'تشرين الثاني نوفمبر', 'كانون الأول ديسمبر'];

	    var ar = moment.defineLocale('ar', {
	        months: months,
	        monthsShort: months,
	        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'D/‏M/‏YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM: function isPM(input) {
	            return 'م' === input;
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar: {
	            sameDay: '[اليوم عند الساعة] LT',
	            nextDay: '[غدًا عند الساعة] LT',
	            nextWeek: 'dddd [عند الساعة] LT',
	            lastDay: '[أمس عند الساعة] LT',
	            lastWeek: 'dddd [عند الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'بعد %s',
	            past: 'منذ %s',
	            s: pluralize('s'),
	            m: pluralize('m'),
	            mm: pluralize('m'),
	            h: pluralize('h'),
	            hh: pluralize('h'),
	            d: pluralize('d'),
	            dd: pluralize('d'),
	            M: pluralize('M'),
	            MM: pluralize('M'),
	            y: pluralize('y'),
	            yy: pluralize('y')
	        },
	        preparse: function preparse(string) {
	            return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week: {
	            dow: 6, // Saturday is the first day of the week.
	            doy: 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar;
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Moroccan Arabic (ar-ma)
	//! author : ElFadili Yassine : https://github.com/ElFadiliY
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ar_ma = moment.defineLocale('ar-ma', {
	        months: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        monthsShort: 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	        weekdays: 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort: 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'في %s',
	            past: 'منذ %s',
	            s: 'ثوان',
	            m: 'دقيقة',
	            mm: '%d دقائق',
	            h: 'ساعة',
	            hh: '%d ساعات',
	            d: 'يوم',
	            dd: '%d أيام',
	            M: 'شهر',
	            MM: '%d أشهر',
	            y: 'سنة',
	            yy: '%d سنوات'
	        },
	        week: {
	            dow: 6, // Saturday is the first day of the week.
	            doy: 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar_ma;
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Arabic Saudi Arabia (ar-sa)
	//! author : Suhail Alkowaileet : https://github.com/xsoh

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '١',
	        '2': '٢',
	        '3': '٣',
	        '4': '٤',
	        '5': '٥',
	        '6': '٦',
	        '7': '٧',
	        '8': '٨',
	        '9': '٩',
	        '0': '٠'
	    },
	        numberMap = {
	        '١': '1',
	        '٢': '2',
	        '٣': '3',
	        '٤': '4',
	        '٥': '5',
	        '٦': '6',
	        '٧': '7',
	        '٨': '8',
	        '٩': '9',
	        '٠': '0'
	    };

	    var ar_sa = moment.defineLocale('ar-sa', {
	        months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ص|م/,
	        isPM: function isPM(input) {
	            return 'م' === input;
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ص';
	            } else {
	                return 'م';
	            }
	        },
	        calendar: {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'في %s',
	            past: 'منذ %s',
	            s: 'ثوان',
	            m: 'دقيقة',
	            mm: '%d دقائق',
	            h: 'ساعة',
	            hh: '%d ساعات',
	            d: 'يوم',
	            dd: '%d أيام',
	            M: 'شهر',
	            MM: '%d أشهر',
	            y: 'سنة',
	            yy: '%d سنوات'
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        week: {
	            dow: 6, // Saturday is the first day of the week.
	            doy: 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ar_sa;
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale  : Tunisian Arabic (ar-tn)

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ar_tn = moment.defineLocale('ar-tn', {
	        months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[اليوم على الساعة] LT',
	            nextDay: '[غدا على الساعة] LT',
	            nextWeek: 'dddd [على الساعة] LT',
	            lastDay: '[أمس على الساعة] LT',
	            lastWeek: 'dddd [على الساعة] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'في %s',
	            past: 'منذ %s',
	            s: 'ثوان',
	            m: 'دقيقة',
	            mm: '%d دقائق',
	            h: 'ساعة',
	            hh: '%d ساعات',
	            d: 'يوم',
	            dd: '%d أيام',
	            M: 'شهر',
	            MM: '%d أشهر',
	            y: 'سنة',
	            yy: '%d سنوات'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ar_tn;
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : azerbaijani (az)
	//! author : topchiyev : https://github.com/topchiyev

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var suffixes = {
	        1: '-inci',
	        5: '-inci',
	        8: '-inci',
	        70: '-inci',
	        80: '-inci',
	        2: '-nci',
	        7: '-nci',
	        20: '-nci',
	        50: '-nci',
	        3: '-üncü',
	        4: '-üncü',
	        100: '-üncü',
	        6: '-ncı',
	        9: '-uncu',
	        10: '-uncu',
	        30: '-uncu',
	        60: '-ıncı',
	        90: '-ıncı'
	    };

	    var az = moment.defineLocale('az', {
	        months: 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
	        monthsShort: 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
	        weekdays: 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
	        weekdaysShort: 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
	        weekdaysMin: 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[bugün saat] LT',
	            nextDay: '[sabah saat] LT',
	            nextWeek: '[gələn həftə] dddd [saat] LT',
	            lastDay: '[dünən] LT',
	            lastWeek: '[keçən həftə] dddd [saat] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s sonra',
	            past: '%s əvvəl',
	            s: 'birneçə saniyyə',
	            m: 'bir dəqiqə',
	            mm: '%d dəqiqə',
	            h: 'bir saat',
	            hh: '%d saat',
	            d: 'bir gün',
	            dd: '%d gün',
	            M: 'bir ay',
	            MM: '%d ay',
	            y: 'bir il',
	            yy: '%d il'
	        },
	        meridiemParse: /gecə|səhər|gündüz|axşam/,
	        isPM: function isPM(input) {
	            return (/^(gündüz|axşam)$/.test(input)
	            );
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'gecə';
	            } else if (hour < 12) {
	                return 'səhər';
	            } else if (hour < 17) {
	                return 'gündüz';
	            } else {
	                return 'axşam';
	            }
	        },
	        ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
	        ordinal: function ordinal(number) {
	            if (number === 0) {
	                // special case for zero
	                return number + '-ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return az;
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : belarusian (be)
	//! author : Dmitry Demidov : https://github.com/demidov91
	//! author: Praleska: http://praleska.pro/
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
	            'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
	            'dd': 'дзень_дні_дзён',
	            'MM': 'месяц_месяцы_месяцаў',
	            'yy': 'год_гады_гадоў'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвіліна' : 'хвіліну';
	        } else if (key === 'h') {
	            return withoutSuffix ? 'гадзіна' : 'гадзіну';
	        } else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }

	    var be = moment.defineLocale('be', {
	        months: {
	            format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
	            standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
	        },
	        monthsShort: 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
	        weekdays: {
	            format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
	            standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
	        },
	        weekdaysShort: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        weekdaysMin: 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY г.',
	            LLL: 'D MMMM YYYY г., HH:mm',
	            LLLL: 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar: {
	            sameDay: '[Сёння ў] LT',
	            nextDay: '[Заўтра ў] LT',
	            lastDay: '[Учора ў] LT',
	            nextWeek: function nextWeek() {
	                return '[У] dddd [ў] LT';
	            },
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[У мінулую] dddd [ў] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[У мінулы] dddd [ў] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'праз %s',
	            past: '%s таму',
	            s: 'некалькі секунд',
	            m: relativeTimeWithPlural,
	            mm: relativeTimeWithPlural,
	            h: relativeTimeWithPlural,
	            hh: relativeTimeWithPlural,
	            d: 'дзень',
	            dd: relativeTimeWithPlural,
	            M: 'месяц',
	            MM: relativeTimeWithPlural,
	            y: 'год',
	            yy: relativeTimeWithPlural
	        },
	        meridiemParse: /ночы|раніцы|дня|вечара/,
	        isPM: function isPM(input) {
	            return (/^(дня|вечара)$/.test(input)
	            );
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночы';
	            } else if (hour < 12) {
	                return 'раніцы';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечара';
	            }
	        },
	        ordinalParse: /\d{1,2}-(і|ы|га)/,
	        ordinal: function ordinal(number, period) {
	            switch (period) {
	                case 'M':
	                case 'd':
	                case 'DDD':
	                case 'w':
	                case 'W':
	                    return (number % 10 === 2 || number % 10 === 3) && number % 100 !== 12 && number % 100 !== 13 ? number + '-і' : number + '-ы';
	                case 'D':
	                    return number + '-га';
	                default:
	                    return number;
	            }
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return be;
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : bulgarian (bg)
	//! author : Krasen Borisov : https://github.com/kraz

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var bg = moment.defineLocale('bg', {
	        months: 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort: 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays: 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
	        weekdaysShort: 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
	        weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'D.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY H:mm',
	            LLLL: 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[Днес в] LT',
	            nextDay: '[Утре в] LT',
	            nextWeek: 'dddd [в] LT',
	            lastDay: '[Вчера в] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                    case 6:
	                        return '[В изминалата] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[В изминалия] dddd [в] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'след %s',
	            past: 'преди %s',
	            s: 'няколко секунди',
	            m: 'минута',
	            mm: '%d минути',
	            h: 'час',
	            hh: '%d часа',
	            d: 'ден',
	            dd: '%d дни',
	            M: 'месец',
	            MM: '%d месеца',
	            y: 'година',
	            yy: '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal: function ordinal(number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bg;
	});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Bengali (bn)
	//! author : Kaushik Gandhi : https://github.com/kaushikgandhi

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '১',
	        '2': '২',
	        '3': '৩',
	        '4': '৪',
	        '5': '৫',
	        '6': '৬',
	        '7': '৭',
	        '8': '৮',
	        '9': '৯',
	        '0': '০'
	    },
	        numberMap = {
	        '১': '1',
	        '২': '2',
	        '৩': '3',
	        '৪': '4',
	        '৫': '5',
	        '৬': '6',
	        '৭': '7',
	        '৮': '8',
	        '৯': '9',
	        '০': '0'
	    };

	    var bn = moment.defineLocale('bn', {
	        months: 'জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
	        monthsShort: 'জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্'.split('_'),
	        weekdays: 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রবার_শনিবার'.split('_'),
	        weekdaysShort: 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্র_শনি'.split('_'),
	        weekdaysMin: 'রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি'.split('_'),
	        longDateFormat: {
	            LT: 'A h:mm সময়',
	            LTS: 'A h:mm:ss সময়',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY, A h:mm সময়',
	            LLLL: 'dddd, D MMMM YYYY, A h:mm সময়'
	        },
	        calendar: {
	            sameDay: '[আজ] LT',
	            nextDay: '[আগামীকাল] LT',
	            nextWeek: 'dddd, LT',
	            lastDay: '[গতকাল] LT',
	            lastWeek: '[গত] dddd, LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s পরে',
	            past: '%s আগে',
	            s: 'কয়েক সেকেন্ড',
	            m: 'এক মিনিট',
	            mm: '%d মিনিট',
	            h: 'এক ঘন্টা',
	            hh: '%d ঘন্টা',
	            d: 'এক দিন',
	            dd: '%d দিন',
	            M: 'এক মাস',
	            MM: '%d মাস',
	            y: 'এক বছর',
	            yy: '%d বছর'
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'রাত' && hour >= 4 || meridiem === 'দুপুর' && hour < 5 || meridiem === 'বিকাল') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'রাত';
	            } else if (hour < 10) {
	                return 'সকাল';
	            } else if (hour < 17) {
	                return 'দুপুর';
	            } else if (hour < 20) {
	                return 'বিকাল';
	            } else {
	                return 'রাত';
	            }
	        },
	        week: {
	            dow: 0, // Sunday is the first day of the week.
	            doy: 6 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bn;
	});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : tibetan (bo)
	//! author : Thupten N. Chakrishar : https://github.com/vajradog

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '༡',
	        '2': '༢',
	        '3': '༣',
	        '4': '༤',
	        '5': '༥',
	        '6': '༦',
	        '7': '༧',
	        '8': '༨',
	        '9': '༩',
	        '0': '༠'
	    },
	        numberMap = {
	        '༡': '1',
	        '༢': '2',
	        '༣': '3',
	        '༤': '4',
	        '༥': '5',
	        '༦': '6',
	        '༧': '7',
	        '༨': '8',
	        '༩': '9',
	        '༠': '0'
	    };

	    var bo = moment.defineLocale('bo', {
	        months: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        monthsShort: 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	        weekdays: 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
	        weekdaysShort: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        weekdaysMin: 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	        longDateFormat: {
	            LT: 'A h:mm',
	            LTS: 'A h:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY, A h:mm',
	            LLLL: 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar: {
	            sameDay: '[དི་རིང] LT',
	            nextDay: '[སང་ཉིན] LT',
	            nextWeek: '[བདུན་ཕྲག་རྗེས་མ], LT',
	            lastDay: '[ཁ་སང] LT',
	            lastWeek: '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s ལ་',
	            past: '%s སྔན་ལ',
	            s: 'ལམ་སང',
	            m: 'སྐར་མ་གཅིག',
	            mm: '%d སྐར་མ',
	            h: 'ཆུ་ཚོད་གཅིག',
	            hh: '%d ཆུ་ཚོད',
	            d: 'ཉིན་གཅིག',
	            dd: '%d ཉིན་',
	            M: 'ཟླ་བ་གཅིག',
	            MM: '%d ཟླ་བ',
	            y: 'ལོ་གཅིག',
	            yy: '%d ལོ'
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'མཚན་མོ' && hour >= 4 || meridiem === 'ཉིན་གུང' && hour < 5 || meridiem === 'དགོང་དག') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'མཚན་མོ';
	            } else if (hour < 10) {
	                return 'ཞོགས་ཀས';
	            } else if (hour < 17) {
	                return 'ཉིན་གུང';
	            } else if (hour < 20) {
	                return 'དགོང་དག';
	            } else {
	                return 'མཚན་མོ';
	            }
	        },
	        week: {
	            dow: 0, // Sunday is the first day of the week.
	            doy: 6 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bo;
	});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : breton (br)
	//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function relativeTimeWithMutation(number, withoutSuffix, key) {
	        var format = {
	            'mm': 'munutenn',
	            'MM': 'miz',
	            'dd': 'devezh'
	        };
	        return number + ' ' + mutation(format[key], number);
	    }
	    function specialMutationForYears(number) {
	        switch (lastNumber(number)) {
	            case 1:
	            case 3:
	            case 4:
	            case 5:
	            case 9:
	                return number + ' bloaz';
	            default:
	                return number + ' vloaz';
	        }
	    }
	    function lastNumber(number) {
	        if (number > 9) {
	            return lastNumber(number % 10);
	        }
	        return number;
	    }
	    function mutation(text, number) {
	        if (number === 2) {
	            return softMutation(text);
	        }
	        return text;
	    }
	    function softMutation(text) {
	        var mutationTable = {
	            'm': 'v',
	            'b': 'v',
	            'd': 'z'
	        };
	        if (mutationTable[text.charAt(0)] === undefined) {
	            return text;
	        }
	        return mutationTable[text.charAt(0)] + text.substring(1);
	    }

	    var br = moment.defineLocale('br', {
	        months: 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
	        monthsShort: 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
	        weekdays: 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
	        weekdaysShort: 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
	        weekdaysMin: 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'h[e]mm A',
	            LTS: 'h[e]mm:ss A',
	            L: 'DD/MM/YYYY',
	            LL: 'D [a viz] MMMM YYYY',
	            LLL: 'D [a viz] MMMM YYYY h[e]mm A',
	            LLLL: 'dddd, D [a viz] MMMM YYYY h[e]mm A'
	        },
	        calendar: {
	            sameDay: '[Hiziv da] LT',
	            nextDay: '[Warc\'hoazh da] LT',
	            nextWeek: 'dddd [da] LT',
	            lastDay: '[Dec\'h da] LT',
	            lastWeek: 'dddd [paset da] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'a-benn %s',
	            past: '%s \'zo',
	            s: 'un nebeud segondennoù',
	            m: 'ur vunutenn',
	            mm: relativeTimeWithMutation,
	            h: 'un eur',
	            hh: '%d eur',
	            d: 'un devezh',
	            dd: relativeTimeWithMutation,
	            M: 'ur miz',
	            MM: relativeTimeWithMutation,
	            y: 'ur bloaz',
	            yy: specialMutationForYears
	        },
	        ordinalParse: /\d{1,2}(añ|vet)/,
	        ordinal: function ordinal(number) {
	            var output = number === 1 ? 'añ' : 'vet';
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return br;
	});

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : bosnian (bs)
	//! author : Nedim Cholich : https://github.com/frontyard
	//! based on (hr) translation by Bojan Marković

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	            case 'm':
	                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	            case 'mm':
	                if (number === 1) {
	                    result += 'minuta';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'minute';
	                } else {
	                    result += 'minuta';
	                }
	                return result;
	            case 'h':
	                return withoutSuffix ? 'jedan sat' : 'jednog sata';
	            case 'hh':
	                if (number === 1) {
	                    result += 'sat';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'sata';
	                } else {
	                    result += 'sati';
	                }
	                return result;
	            case 'dd':
	                if (number === 1) {
	                    result += 'dan';
	                } else {
	                    result += 'dana';
	                }
	                return result;
	            case 'MM':
	                if (number === 1) {
	                    result += 'mjesec';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'mjeseca';
	                } else {
	                    result += 'mjeseci';
	                }
	                return result;
	            case 'yy':
	                if (number === 1) {
	                    result += 'godina';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'godine';
	                } else {
	                    result += 'godina';
	                }
	                return result;
	        }
	    }

	    var bs = moment.defineLocale('bs', {
	        months: 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sutra u] LT',
	            nextWeek: function nextWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[u] [nedjelju] [u] LT';
	                    case 3:
	                        return '[u] [srijedu] [u] LT';
	                    case 6:
	                        return '[u] [subotu] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[u] dddd [u] LT';
	                }
	            },
	            lastDay: '[jučer u] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                        return '[prošlu] dddd [u] LT';
	                    case 6:
	                        return '[prošle] [subote] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'za %s',
	            past: 'prije %s',
	            s: 'par sekundi',
	            m: translate,
	            mm: translate,
	            h: translate,
	            hh: translate,
	            d: 'dan',
	            dd: translate,
	            M: 'mjesec',
	            MM: translate,
	            y: 'godinu',
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return bs;
	});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : catalan (ca)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ca = moment.defineLocale('ca', {
	        months: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
	        monthsShort: 'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
	        weekdaysShort: 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
	        weekdaysMin: 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY H:mm',
	            LLLL: 'dddd D MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: function sameDay() {
	                return '[avui a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
	            },
	            nextDay: function nextDay() {
	                return '[demà a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
	            },
	            nextWeek: function nextWeek() {
	                return 'dddd [a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
	            },
	            lastDay: function lastDay() {
	                return '[ahir a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
	            },
	            lastWeek: function lastWeek() {
	                return '[el] dddd [passat a ' + (this.hours() !== 1 ? 'les' : 'la') + '] LT';
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'en %s',
	            past: 'fa %s',
	            s: 'uns segons',
	            m: 'un minut',
	            mm: '%d minuts',
	            h: 'una hora',
	            hh: '%d hores',
	            d: 'un dia',
	            dd: '%d dies',
	            M: 'un mes',
	            MM: '%d mesos',
	            y: 'un any',
	            yy: '%d anys'
	        },
	        ordinalParse: /\d{1,2}(r|n|t|è|a)/,
	        ordinal: function ordinal(number, period) {
	            var output = number === 1 ? 'r' : number === 2 ? 'n' : number === 3 ? 'r' : number === 4 ? 't' : 'è';
	            if (period === 'w' || period === 'W') {
	                output = 'a';
	            }
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ca;
	});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : czech (cs)
	//! author : petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_'),
	        monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
	    function plural(n) {
	        return n > 1 && n < 5 && ~ ~(n / 10) !== 1;
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	            case 's':
	                // a few seconds / in a few seconds / a few seconds ago
	                return withoutSuffix || isFuture ? 'pár sekund' : 'pár sekundami';
	            case 'm':
	                // a minute / in a minute / a minute ago
	                return withoutSuffix ? 'minuta' : isFuture ? 'minutu' : 'minutou';
	            case 'mm':
	                // 9 minutes / in 9 minutes / 9 minutes ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'minuty' : 'minut');
	                } else {
	                    return result + 'minutami';
	                }
	                break;
	            case 'h':
	                // an hour / in an hour / an hour ago
	                return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';
	            case 'hh':
	                // 9 hours / in 9 hours / 9 hours ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'hodiny' : 'hodin');
	                } else {
	                    return result + 'hodinami';
	                }
	                break;
	            case 'd':
	                // a day / in a day / a day ago
	                return withoutSuffix || isFuture ? 'den' : 'dnem';
	            case 'dd':
	                // 9 days / in 9 days / 9 days ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'dny' : 'dní');
	                } else {
	                    return result + 'dny';
	                }
	                break;
	            case 'M':
	                // a month / in a month / a month ago
	                return withoutSuffix || isFuture ? 'měsíc' : 'měsícem';
	            case 'MM':
	                // 9 months / in 9 months / 9 months ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'měsíce' : 'měsíců');
	                } else {
	                    return result + 'měsíci';
	                }
	                break;
	            case 'y':
	                // a year / in a year / a year ago
	                return withoutSuffix || isFuture ? 'rok' : 'rokem';
	            case 'yy':
	                // 9 years / in 9 years / 9 years ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'roky' : 'let');
	                } else {
	                    return result + 'lety';
	                }
	                break;
	        }
	    }

	    var cs = moment.defineLocale('cs', {
	        months: months,
	        monthsShort: monthsShort,
	        monthsParse: function (months, monthsShort) {
	            var i,
	                _monthsParse = [];
	            for (i = 0; i < 12; i++) {
	                // use custom parser to solve problem with July (červenec)
	                _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
	            }
	            return _monthsParse;
	        }(months, monthsShort),
	        shortMonthsParse: function (monthsShort) {
	            var i,
	                _shortMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
	            }
	            return _shortMonthsParse;
	        }(monthsShort),
	        longMonthsParse: function (months) {
	            var i,
	                _longMonthsParse = [];
	            for (i = 0; i < 12; i++) {
	                _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
	            }
	            return _longMonthsParse;
	        }(months),
	        weekdays: 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
	        weekdaysShort: 'ne_po_út_st_čt_pá_so'.split('_'),
	        weekdaysMin: 'ne_po_út_st_čt_pá_so'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[dnes v] LT',
	            nextDay: '[zítra v] LT',
	            nextWeek: function nextWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[v neděli v] LT';
	                    case 1:
	                    case 2:
	                        return '[v] dddd [v] LT';
	                    case 3:
	                        return '[ve středu v] LT';
	                    case 4:
	                        return '[ve čtvrtek v] LT';
	                    case 5:
	                        return '[v pátek v] LT';
	                    case 6:
	                        return '[v sobotu v] LT';
	                }
	            },
	            lastDay: '[včera v] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[minulou neděli v] LT';
	                    case 1:
	                    case 2:
	                        return '[minulé] dddd [v] LT';
	                    case 3:
	                        return '[minulou středu v] LT';
	                    case 4:
	                    case 5:
	                        return '[minulý] dddd [v] LT';
	                    case 6:
	                        return '[minulou sobotu v] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'za %s',
	            past: 'před %s',
	            s: translate,
	            m: translate,
	            mm: translate,
	            h: translate,
	            hh: translate,
	            d: translate,
	            dd: translate,
	            M: translate,
	            MM: translate,
	            y: translate,
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return cs;
	});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : chuvash (cv)
	//! author : Anatoly Mironov : https://github.com/mirontoli

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var cv = moment.defineLocale('cv', {
	        months: 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
	        monthsShort: 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
	        weekdays: 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
	        weekdaysShort: 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
	        weekdaysMin: 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD-MM-YYYY',
	            LL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
	            LLL: 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
	            LLLL: 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
	        },
	        calendar: {
	            sameDay: '[Паян] LT [сехетре]',
	            nextDay: '[Ыран] LT [сехетре]',
	            lastDay: '[Ӗнер] LT [сехетре]',
	            nextWeek: '[Ҫитес] dddd LT [сехетре]',
	            lastWeek: '[Иртнӗ] dddd LT [сехетре]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: function future(output) {
	                var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
	                return output + affix;
	            },
	            past: '%s каялла',
	            s: 'пӗр-ик ҫеккунт',
	            m: 'пӗр минут',
	            mm: '%d минут',
	            h: 'пӗр сехет',
	            hh: '%d сехет',
	            d: 'пӗр кун',
	            dd: '%d кун',
	            M: 'пӗр уйӑх',
	            MM: '%d уйӑх',
	            y: 'пӗр ҫул',
	            yy: '%d ҫул'
	        },
	        ordinalParse: /\d{1,2}-мӗш/,
	        ordinal: '%d-мӗш',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return cv;
	});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Welsh (cy)
	//! author : Robert Allen

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var cy = moment.defineLocale('cy', {
	        months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
	        monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
	        weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
	        weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
	        weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
	        weekdaysParseExact: true,
	        // time formats are the same as en-gb
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Heddiw am] LT',
	            nextDay: '[Yfory am] LT',
	            nextWeek: 'dddd [am] LT',
	            lastDay: '[Ddoe am] LT',
	            lastWeek: 'dddd [diwethaf am] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'mewn %s',
	            past: '%s yn ôl',
	            s: 'ychydig eiliadau',
	            m: 'munud',
	            mm: '%d munud',
	            h: 'awr',
	            hh: '%d awr',
	            d: 'diwrnod',
	            dd: '%d diwrnod',
	            M: 'mis',
	            MM: '%d mis',
	            y: 'blwyddyn',
	            yy: '%d flynedd'
	        },
	        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
	        // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
	        ordinal: function ordinal(number) {
	            var b = number,
	                output = '',
	                lookup = ['', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
	            'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
	            ];
	            if (b > 20) {
	                if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
	                    output = 'fed'; // not 30ain, 70ain or 90ain
	                } else {
	                        output = 'ain';
	                    }
	            } else if (b > 0) {
	                output = lookup[b];
	            }
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return cy;
	});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : danish (da)
	//! author : Ulrik Nielsen : https://github.com/mrbase

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var da = moment.defineLocale('da', {
	        months: 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
	        monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort: 'søn_man_tir_ons_tor_fre_lør'.split('_'),
	        weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY HH:mm',
	            LLLL: 'dddd [d.] D. MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[I dag kl.] LT',
	            nextDay: '[I morgen kl.] LT',
	            nextWeek: 'dddd [kl.] LT',
	            lastDay: '[I går kl.] LT',
	            lastWeek: '[sidste] dddd [kl] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'om %s',
	            past: '%s siden',
	            s: 'få sekunder',
	            m: 'et minut',
	            mm: '%d minutter',
	            h: 'en time',
	            hh: '%d timer',
	            d: 'en dag',
	            dd: '%d dage',
	            M: 'en måned',
	            MM: '%d måneder',
	            y: 'et år',
	            yy: '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return da;
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : german (de)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }

	    var de = moment.defineLocale('de', {
	        months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort: 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY HH:mm',
	            LLLL: 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime: {
	            future: 'in %s',
	            past: 'vor %s',
	            s: 'ein paar Sekunden',
	            m: processRelativeTime,
	            mm: '%d Minuten',
	            h: processRelativeTime,
	            hh: '%d Stunden',
	            d: processRelativeTime,
	            dd: processRelativeTime,
	            M: processRelativeTime,
	            MM: processRelativeTime,
	            y: processRelativeTime,
	            yy: processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return de;
	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : austrian german (de-at)
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Martin Groller : https://github.com/MadMG
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eine Minute', 'einer Minute'],
	            'h': ['eine Stunde', 'einer Stunde'],
	            'd': ['ein Tag', 'einem Tag'],
	            'dd': [number + ' Tage', number + ' Tagen'],
	            'M': ['ein Monat', 'einem Monat'],
	            'MM': [number + ' Monate', number + ' Monaten'],
	            'y': ['ein Jahr', 'einem Jahr'],
	            'yy': [number + ' Jahre', number + ' Jahren']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }

	    var de_at = moment.defineLocale('de-at', {
	        months: 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort: 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	        weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	        weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY HH:mm',
	            LLLL: 'dddd, D. MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[heute um] LT [Uhr]',
	            sameElse: 'L',
	            nextDay: '[morgen um] LT [Uhr]',
	            nextWeek: 'dddd [um] LT [Uhr]',
	            lastDay: '[gestern um] LT [Uhr]',
	            lastWeek: '[letzten] dddd [um] LT [Uhr]'
	        },
	        relativeTime: {
	            future: 'in %s',
	            past: 'vor %s',
	            s: 'ein paar Sekunden',
	            m: processRelativeTime,
	            mm: '%d Minuten',
	            h: processRelativeTime,
	            hh: '%d Stunden',
	            d: processRelativeTime,
	            dd: processRelativeTime,
	            M: processRelativeTime,
	            MM: processRelativeTime,
	            y: processRelativeTime,
	            yy: processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return de_at;
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : dhivehi (dv)
	//! author : Jawish Hameed : https://github.com/jawish

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var months = ['ޖެނުއަރީ', 'ފެބްރުއަރީ', 'މާރިޗު', 'އޭޕްރީލު', 'މޭ', 'ޖޫން', 'ޖުލައި', 'އޯގަސްޓު', 'ސެޕްޓެމްބަރު', 'އޮކްޓޯބަރު', 'ނޮވެމްބަރު', 'ޑިސެމްބަރު'],
	        weekdays = ['އާދިއްތަ', 'ހޯމަ', 'އަންގާރަ', 'ބުދަ', 'ބުރާސްފަތި', 'ހުކުރު', 'ހޮނިހިރު'];

	    var dv = moment.defineLocale('dv', {
	        months: months,
	        monthsShort: months,
	        weekdays: weekdays,
	        weekdaysShort: weekdays,
	        weekdaysMin: 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
	        longDateFormat: {

	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'D/M/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /މކ|މފ/,
	        isPM: function isPM(input) {
	            return 'މފ' === input;
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 12) {
	                return 'މކ';
	            } else {
	                return 'މފ';
	            }
	        },
	        calendar: {
	            sameDay: '[މިއަދު] LT',
	            nextDay: '[މާދަމާ] LT',
	            nextWeek: 'dddd LT',
	            lastDay: '[އިއްޔެ] LT',
	            lastWeek: '[ފާއިތުވި] dddd LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'ތެރޭގައި %s',
	            past: 'ކުރިން %s',
	            s: 'ސިކުންތުކޮޅެއް',
	            m: 'މިނިޓެއް',
	            mm: 'މިނިޓު %d',
	            h: 'ގަޑިއިރެއް',
	            hh: 'ގަޑިއިރު %d',
	            d: 'ދުވަހެއް',
	            dd: 'ދުވަސް %d',
	            M: 'މަހެއް',
	            MM: 'މަސް %d',
	            y: 'އަހަރެއް',
	            yy: 'އަހަރު %d'
	        },
	        preparse: function preparse(string) {
	            return string.replace(/،/g, ',');
	        },
	        postformat: function postformat(string) {
	            return string.replace(/,/g, '،');
	        },
	        week: {
	            dow: 7, // Sunday is the first day of the week.
	            doy: 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return dv;
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : modern greek (el)
	//! author : Aggelos Karalias : https://github.com/mehiel

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function isFunction(input) {
	        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	    }

	    var el = moment.defineLocale('el', {
	        monthsNominativeEl: 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
	        monthsGenitiveEl: 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
	        months: function months(momentToFormat, format) {
	            if (/D/.test(format.substring(0, format.indexOf('MMMM')))) {
	                // if there is a day number before 'MMMM'
	                return this._monthsGenitiveEl[momentToFormat.month()];
	            } else {
	                return this._monthsNominativeEl[momentToFormat.month()];
	            }
	        },
	        monthsShort: 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
	        weekdays: 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
	        weekdaysShort: 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
	        weekdaysMin: 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'μμ' : 'ΜΜ';
	            } else {
	                return isLower ? 'πμ' : 'ΠΜ';
	            }
	        },
	        isPM: function isPM(input) {
	            return (input + '').toLowerCase()[0] === 'μ';
	        },
	        meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
	        longDateFormat: {
	            LT: 'h:mm A',
	            LTS: 'h:mm:ss A',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY h:mm A',
	            LLLL: 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendarEl: {
	            sameDay: '[Σήμερα {}] LT',
	            nextDay: '[Αύριο {}] LT',
	            nextWeek: 'dddd [{}] LT',
	            lastDay: '[Χθες {}] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 6:
	                        return '[το προηγούμενο] dddd [{}] LT';
	                    default:
	                        return '[την προηγούμενη] dddd [{}] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        calendar: function calendar(key, mom) {
	            var output = this._calendarEl[key],
	                hours = mom && mom.hours();
	            if (isFunction(output)) {
	                output = output.apply(mom);
	            }
	            return output.replace('{}', hours % 12 === 1 ? 'στη' : 'στις');
	        },
	        relativeTime: {
	            future: 'σε %s',
	            past: '%s πριν',
	            s: 'λίγα δευτερόλεπτα',
	            m: 'ένα λεπτό',
	            mm: '%d λεπτά',
	            h: 'μία ώρα',
	            hh: '%d ώρες',
	            d: 'μία μέρα',
	            dd: '%d μέρες',
	            M: 'ένας μήνας',
	            MM: '%d μήνες',
	            y: 'ένας χρόνος',
	            yy: '%d χρόνια'
	        },
	        ordinalParse: /\d{1,2}η/,
	        ordinal: '%dη',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4st is the first week of the year.
	        }
	    });

	    return el;
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : australian english (en-au)

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var en_au = moment.defineLocale('en-au', {
	        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat: {
	            LT: 'h:mm A',
	            LTS: 'h:mm:ss A',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY h:mm A',
	            LLLL: 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar: {
	            sameDay: '[Today at] LT',
	            nextDay: '[Tomorrow at] LT',
	            nextWeek: 'dddd [at] LT',
	            lastDay: '[Yesterday at] LT',
	            lastWeek: '[Last] dddd [at] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'in %s',
	            past: '%s ago',
	            s: 'a few seconds',
	            m: 'a minute',
	            mm: '%d minutes',
	            h: 'an hour',
	            hh: '%d hours',
	            d: 'a day',
	            dd: '%d days',
	            M: 'a month',
	            MM: '%d months',
	            y: 'a year',
	            yy: '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal: function ordinal(number) {
	            var b = number % 10,
	                output = ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_au;
	});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : canadian english (en-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var en_ca = moment.defineLocale('en-ca', {
	        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat: {
	            LT: 'h:mm A',
	            LTS: 'h:mm:ss A',
	            L: 'YYYY-MM-DD',
	            LL: 'MMMM D, YYYY',
	            LLL: 'MMMM D, YYYY h:mm A',
	            LLLL: 'dddd, MMMM D, YYYY h:mm A'
	        },
	        calendar: {
	            sameDay: '[Today at] LT',
	            nextDay: '[Tomorrow at] LT',
	            nextWeek: 'dddd [at] LT',
	            lastDay: '[Yesterday at] LT',
	            lastWeek: '[Last] dddd [at] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'in %s',
	            past: '%s ago',
	            s: 'a few seconds',
	            m: 'a minute',
	            mm: '%d minutes',
	            h: 'an hour',
	            hh: '%d hours',
	            d: 'a day',
	            dd: '%d days',
	            M: 'a month',
	            MM: '%d months',
	            y: 'a year',
	            yy: '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal: function ordinal(number) {
	            var b = number % 10,
	                output = ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	            return number + output;
	        }
	    });

	    return en_ca;
	});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : great britain english (en-gb)
	//! author : Chris Gedrim : https://github.com/chrisgedrim

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var en_gb = moment.defineLocale('en-gb', {
	        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Today at] LT',
	            nextDay: '[Tomorrow at] LT',
	            nextWeek: 'dddd [at] LT',
	            lastDay: '[Yesterday at] LT',
	            lastWeek: '[Last] dddd [at] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'in %s',
	            past: '%s ago',
	            s: 'a few seconds',
	            m: 'a minute',
	            mm: '%d minutes',
	            h: 'an hour',
	            hh: '%d hours',
	            d: 'a day',
	            dd: '%d days',
	            M: 'a month',
	            MM: '%d months',
	            y: 'a year',
	            yy: '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal: function ordinal(number) {
	            var b = number % 10,
	                output = ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_gb;
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Irish english (en-ie)
	//! author : Chris Cartlidge : https://github.com/chriscartlidge

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var en_ie = moment.defineLocale('en-ie', {
	        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD-MM-YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Today at] LT',
	            nextDay: '[Tomorrow at] LT',
	            nextWeek: 'dddd [at] LT',
	            lastDay: '[Yesterday at] LT',
	            lastWeek: '[Last] dddd [at] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'in %s',
	            past: '%s ago',
	            s: 'a few seconds',
	            m: 'a minute',
	            mm: '%d minutes',
	            h: 'an hour',
	            hh: '%d hours',
	            d: 'a day',
	            dd: '%d days',
	            M: 'a month',
	            MM: '%d months',
	            y: 'a year',
	            yy: '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal: function ordinal(number) {
	            var b = number % 10,
	                output = ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_ie;
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : New Zealand english (en-nz)

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var en_nz = moment.defineLocale('en-nz', {
	        months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	        monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        longDateFormat: {
	            LT: 'h:mm A',
	            LTS: 'h:mm:ss A',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY h:mm A',
	            LLLL: 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar: {
	            sameDay: '[Today at] LT',
	            nextDay: '[Tomorrow at] LT',
	            nextWeek: 'dddd [at] LT',
	            lastDay: '[Yesterday at] LT',
	            lastWeek: '[Last] dddd [at] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'in %s',
	            past: '%s ago',
	            s: 'a few seconds',
	            m: 'a minute',
	            mm: '%d minutes',
	            h: 'an hour',
	            hh: '%d hours',
	            d: 'a day',
	            dd: '%d days',
	            M: 'a month',
	            MM: '%d months',
	            y: 'a year',
	            yy: '%d years'
	        },
	        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	        ordinal: function ordinal(number) {
	            var b = number % 10,
	                output = ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return en_nz;
	});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : esperanto (eo)
	//! author : Colin Dean : https://github.com/colindean
	//! komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
	//!          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var eo = moment.defineLocale('eo', {
	        months: 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
	        monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
	        weekdays: 'Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato'.split('_'),
	        weekdaysShort: 'Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab'.split('_'),
	        weekdaysMin: 'Di_Lu_Ma_Me_Ĵa_Ve_Sa'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'YYYY-MM-DD',
	            LL: 'D[-an de] MMMM, YYYY',
	            LLL: 'D[-an de] MMMM, YYYY HH:mm',
	            LLLL: 'dddd, [la] D[-an de] MMMM, YYYY HH:mm'
	        },
	        meridiemParse: /[ap]\.t\.m/i,
	        isPM: function isPM(input) {
	            return input.charAt(0).toLowerCase() === 'p';
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'p.t.m.' : 'P.T.M.';
	            } else {
	                return isLower ? 'a.t.m.' : 'A.T.M.';
	            }
	        },
	        calendar: {
	            sameDay: '[Hodiaŭ je] LT',
	            nextDay: '[Morgaŭ je] LT',
	            nextWeek: 'dddd [je] LT',
	            lastDay: '[Hieraŭ je] LT',
	            lastWeek: '[pasinta] dddd [je] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'je %s',
	            past: 'antaŭ %s',
	            s: 'sekundoj',
	            m: 'minuto',
	            mm: '%d minutoj',
	            h: 'horo',
	            hh: '%d horoj',
	            d: 'tago', //ne 'diurno', ĉar estas uzita por proksimumo
	            dd: '%d tagoj',
	            M: 'monato',
	            MM: '%d monatoj',
	            y: 'jaro',
	            yy: '%d jaroj'
	        },
	        ordinalParse: /\d{1,2}a/,
	        ordinal: '%da',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return eo;
	});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : spanish (es)
	//! author : Julio Napurí : https://github.com/julionc

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
	        _monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

	    var es = moment.defineLocale('es', {
	        months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	        monthsShort: function monthsShort(m, format) {
	            if (/-MMM-/.test(format)) {
	                return _monthsShort[m.month()];
	            } else {
	                return monthsShortDot[m.month()];
	            }
	        },
	        monthsParseExact: true,
	        weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	        weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	        weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D [de] MMMM [de] YYYY',
	            LLL: 'D [de] MMMM [de] YYYY H:mm',
	            LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
	        },
	        calendar: {
	            sameDay: function sameDay() {
	                return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
	            },
	            nextDay: function nextDay() {
	                return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
	            },
	            nextWeek: function nextWeek() {
	                return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
	            },
	            lastDay: function lastDay() {
	                return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
	            },
	            lastWeek: function lastWeek() {
	                return '[el] dddd [pasado a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'en %s',
	            past: 'hace %s',
	            s: 'unos segundos',
	            m: 'un minuto',
	            mm: '%d minutos',
	            h: 'una hora',
	            hh: '%d horas',
	            d: 'un día',
	            dd: '%d días',
	            M: 'un mes',
	            MM: '%d meses',
	            y: 'un año',
	            yy: '%d años'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal: '%dº',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return es;
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : estonian (et)
	//! author : Henry Kehlmann : https://github.com/madhenry
	//! improvements : Illimar Tambek : https://github.com/ragulka

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's': ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
	            'm': ['ühe minuti', 'üks minut'],
	            'mm': [number + ' minuti', number + ' minutit'],
	            'h': ['ühe tunni', 'tund aega', 'üks tund'],
	            'hh': [number + ' tunni', number + ' tundi'],
	            'd': ['ühe päeva', 'üks päev'],
	            'M': ['kuu aja', 'kuu aega', 'üks kuu'],
	            'MM': [number + ' kuu', number + ' kuud'],
	            'y': ['ühe aasta', 'aasta', 'üks aasta'],
	            'yy': [number + ' aasta', number + ' aastat']
	        };
	        if (withoutSuffix) {
	            return format[key][2] ? format[key][2] : format[key][1];
	        }
	        return isFuture ? format[key][0] : format[key][1];
	    }

	    var et = moment.defineLocale('et', {
	        months: 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
	        monthsShort: 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
	        weekdays: 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
	        weekdaysShort: 'P_E_T_K_N_R_L'.split('_'),
	        weekdaysMin: 'P_E_T_K_N_R_L'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[Täna,] LT',
	            nextDay: '[Homme,] LT',
	            nextWeek: '[Järgmine] dddd LT',
	            lastDay: '[Eile,] LT',
	            lastWeek: '[Eelmine] dddd LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s pärast',
	            past: '%s tagasi',
	            s: processRelativeTime,
	            m: processRelativeTime,
	            mm: processRelativeTime,
	            h: processRelativeTime,
	            hh: processRelativeTime,
	            d: processRelativeTime,
	            dd: '%d päeva',
	            M: processRelativeTime,
	            MM: processRelativeTime,
	            y: processRelativeTime,
	            yy: processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return et;
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : euskara (eu)
	//! author : Eneko Illarramendi : https://github.com/eillarra

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var eu = moment.defineLocale('eu', {
	        months: 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
	        monthsShort: 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
	        weekdaysShort: 'ig._al._ar._az._og._ol._lr.'.split('_'),
	        weekdaysMin: 'ig_al_ar_az_og_ol_lr'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'YYYY-MM-DD',
	            LL: 'YYYY[ko] MMMM[ren] D[a]',
	            LLL: 'YYYY[ko] MMMM[ren] D[a] HH:mm',
	            LLLL: 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
	            l: 'YYYY-M-D',
	            ll: 'YYYY[ko] MMM D[a]',
	            lll: 'YYYY[ko] MMM D[a] HH:mm',
	            llll: 'ddd, YYYY[ko] MMM D[a] HH:mm'
	        },
	        calendar: {
	            sameDay: '[gaur] LT[etan]',
	            nextDay: '[bihar] LT[etan]',
	            nextWeek: 'dddd LT[etan]',
	            lastDay: '[atzo] LT[etan]',
	            lastWeek: '[aurreko] dddd LT[etan]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s barru',
	            past: 'duela %s',
	            s: 'segundo batzuk',
	            m: 'minutu bat',
	            mm: '%d minutu',
	            h: 'ordu bat',
	            hh: '%d ordu',
	            d: 'egun bat',
	            dd: '%d egun',
	            M: 'hilabete bat',
	            MM: '%d hilabete',
	            y: 'urte bat',
	            yy: '%d urte'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return eu;
	});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Persian (fa)
	//! author : Ebrahim Byagowi : https://github.com/ebraminio

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '۱',
	        '2': '۲',
	        '3': '۳',
	        '4': '۴',
	        '5': '۵',
	        '6': '۶',
	        '7': '۷',
	        '8': '۸',
	        '9': '۹',
	        '0': '۰'
	    },
	        numberMap = {
	        '۱': '1',
	        '۲': '2',
	        '۳': '3',
	        '۴': '4',
	        '۵': '5',
	        '۶': '6',
	        '۷': '7',
	        '۸': '8',
	        '۹': '9',
	        '۰': '0'
	    };

	    var fa = moment.defineLocale('fa', {
	        months: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        monthsShort: 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	        weekdays: 'یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
	        weekdaysShort: 'یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
	        weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /قبل از ظهر|بعد از ظهر/,
	        isPM: function isPM(input) {
	            return (/بعد از ظهر/.test(input)
	            );
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 12) {
	                return 'قبل از ظهر';
	            } else {
	                return 'بعد از ظهر';
	            }
	        },
	        calendar: {
	            sameDay: '[امروز ساعت] LT',
	            nextDay: '[فردا ساعت] LT',
	            nextWeek: 'dddd [ساعت] LT',
	            lastDay: '[دیروز ساعت] LT',
	            lastWeek: 'dddd [پیش] [ساعت] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'در %s',
	            past: '%s پیش',
	            s: 'چندین ثانیه',
	            m: 'یک دقیقه',
	            mm: '%d دقیقه',
	            h: 'یک ساعت',
	            hh: '%d ساعت',
	            d: 'یک روز',
	            dd: '%d روز',
	            M: 'یک ماه',
	            MM: '%d ماه',
	            y: 'یک سال',
	            yy: '%d سال'
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[۰-۹]/g, function (match) {
	                return numberMap[match];
	            }).replace(/،/g, ',');
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            }).replace(/,/g, '،');
	        },
	        ordinalParse: /\d{1,2}م/,
	        ordinal: '%dم',
	        week: {
	            dow: 6, // Saturday is the first day of the week.
	            doy: 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return fa;
	});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : finnish (fi)
	//! author : Tarmo Aidantausta : https://github.com/bleadof

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
	        numbersFuture = ['nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden', numbersPast[7], numbersPast[8], numbersPast[9]];
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = '';
	        switch (key) {
	            case 's':
	                return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
	            case 'm':
	                return isFuture ? 'minuutin' : 'minuutti';
	            case 'mm':
	                result = isFuture ? 'minuutin' : 'minuuttia';
	                break;
	            case 'h':
	                return isFuture ? 'tunnin' : 'tunti';
	            case 'hh':
	                result = isFuture ? 'tunnin' : 'tuntia';
	                break;
	            case 'd':
	                return isFuture ? 'päivän' : 'päivä';
	            case 'dd':
	                result = isFuture ? 'päivän' : 'päivää';
	                break;
	            case 'M':
	                return isFuture ? 'kuukauden' : 'kuukausi';
	            case 'MM':
	                result = isFuture ? 'kuukauden' : 'kuukautta';
	                break;
	            case 'y':
	                return isFuture ? 'vuoden' : 'vuosi';
	            case 'yy':
	                result = isFuture ? 'vuoden' : 'vuotta';
	                break;
	        }
	        result = verbalNumber(number, isFuture) + ' ' + result;
	        return result;
	    }
	    function verbalNumber(number, isFuture) {
	        return number < 10 ? isFuture ? numbersFuture[number] : numbersPast[number] : number;
	    }

	    var fi = moment.defineLocale('fi', {
	        months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
	        monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
	        weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
	        weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
	        weekdaysMin: 'su_ma_ti_ke_to_pe_la'.split('_'),
	        longDateFormat: {
	            LT: 'HH.mm',
	            LTS: 'HH.mm.ss',
	            L: 'DD.MM.YYYY',
	            LL: 'Do MMMM[ta] YYYY',
	            LLL: 'Do MMMM[ta] YYYY, [klo] HH.mm',
	            LLLL: 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
	            l: 'D.M.YYYY',
	            ll: 'Do MMM YYYY',
	            lll: 'Do MMM YYYY, [klo] HH.mm',
	            llll: 'ddd, Do MMM YYYY, [klo] HH.mm'
	        },
	        calendar: {
	            sameDay: '[tänään] [klo] LT',
	            nextDay: '[huomenna] [klo] LT',
	            nextWeek: 'dddd [klo] LT',
	            lastDay: '[eilen] [klo] LT',
	            lastWeek: '[viime] dddd[na] [klo] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s päästä',
	            past: '%s sitten',
	            s: translate,
	            m: translate,
	            mm: translate,
	            h: translate,
	            hh: translate,
	            d: translate,
	            dd: translate,
	            M: translate,
	            MM: translate,
	            y: translate,
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fi;
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : faroese (fo)
	//! author : Ragnar Johannesen : https://github.com/ragnar123

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var fo = moment.defineLocale('fo', {
	        months: 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays: 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
	        weekdaysShort: 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
	        weekdaysMin: 'su_má_tý_mi_hó_fr_le'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D. MMMM, YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Í dag kl.] LT',
	            nextDay: '[Í morgin kl.] LT',
	            nextWeek: 'dddd [kl.] LT',
	            lastDay: '[Í gjár kl.] LT',
	            lastWeek: '[síðstu] dddd [kl] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'um %s',
	            past: '%s síðani',
	            s: 'fá sekund',
	            m: 'ein minutt',
	            mm: '%d minuttir',
	            h: 'ein tími',
	            hh: '%d tímar',
	            d: 'ein dagur',
	            dd: '%d dagar',
	            M: 'ein mánaði',
	            MM: '%d mánaðir',
	            y: 'eitt ár',
	            yy: '%d ár'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fo;
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : french (fr)
	//! author : John Fischer : https://github.com/jfroffice

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var fr = moment.defineLocale('fr', {
	        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'dans %s',
	            past: 'il y a %s',
	            s: 'quelques secondes',
	            m: 'une minute',
	            mm: '%d minutes',
	            h: 'une heure',
	            hh: '%d heures',
	            d: 'un jour',
	            dd: '%d jours',
	            M: 'un mois',
	            MM: '%d mois',
	            y: 'un an',
	            yy: '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|)/,
	        ordinal: function ordinal(number) {
	            return number + (number === 1 ? 'er' : '');
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fr;
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : canadian french (fr-ca)
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var fr_ca = moment.defineLocale('fr-ca', {
	        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'YYYY-MM-DD',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'dans %s',
	            past: 'il y a %s',
	            s: 'quelques secondes',
	            m: 'une minute',
	            mm: '%d minutes',
	            h: 'une heure',
	            hh: '%d heures',
	            d: 'un jour',
	            dd: '%d jours',
	            M: 'un mois',
	            MM: '%d mois',
	            y: 'un an',
	            yy: '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal: function ordinal(number) {
	            return number + (number === 1 ? 'er' : 'e');
	        }
	    });

	    return fr_ca;
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : swiss french (fr)
	//! author : Gaspard Bucher : https://github.com/gaspard

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var fr_ch = moment.defineLocale('fr-ch', {
	        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Aujourd\'hui à] LT',
	            nextDay: '[Demain à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[Hier à] LT',
	            lastWeek: 'dddd [dernier à] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'dans %s',
	            past: 'il y a %s',
	            s: 'quelques secondes',
	            m: 'une minute',
	            mm: '%d minutes',
	            h: 'une heure',
	            hh: '%d heures',
	            d: 'un jour',
	            dd: '%d jours',
	            M: 'un mois',
	            MM: '%d mois',
	            y: 'un an',
	            yy: '%d ans'
	        },
	        ordinalParse: /\d{1,2}(er|e)/,
	        ordinal: function ordinal(number) {
	            return number + (number === 1 ? 'er' : 'e');
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fr_ch;
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : frisian (fy)
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

	    var fy = moment.defineLocale('fy', {
	        months: 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
	        monthsShort: function monthsShort(m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        monthsParseExact: true,
	        weekdays: 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
	        weekdaysShort: 'si._mo._ti._wo._to._fr._so.'.split('_'),
	        weekdaysMin: 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD-MM-YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[hjoed om] LT',
	            nextDay: '[moarn om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[juster om] LT',
	            lastWeek: '[ôfrûne] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'oer %s',
	            past: '%s lyn',
	            s: 'in pear sekonden',
	            m: 'ien minút',
	            mm: '%d minuten',
	            h: 'ien oere',
	            hh: '%d oeren',
	            d: 'ien dei',
	            dd: '%d dagen',
	            M: 'ien moanne',
	            MM: '%d moannen',
	            y: 'ien jier',
	            yy: '%d jierren'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal: function ordinal(number) {
	            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return fy;
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : great britain scottish gealic (gd)
	//! author : Jon Ashdown : https://github.com/jonashdown

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var months = ['Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'];

	    var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

	    var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

	    var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

	    var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

	    var gd = moment.defineLocale('gd', {
	        months: months,
	        monthsShort: monthsShort,
	        monthsParseExact: true,
	        weekdays: weekdays,
	        weekdaysShort: weekdaysShort,
	        weekdaysMin: weekdaysMin,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[An-diugh aig] LT',
	            nextDay: '[A-màireach aig] LT',
	            nextWeek: 'dddd [aig] LT',
	            lastDay: '[An-dè aig] LT',
	            lastWeek: 'dddd [seo chaidh] [aig] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'ann an %s',
	            past: 'bho chionn %s',
	            s: 'beagan diogan',
	            m: 'mionaid',
	            mm: '%d mionaidean',
	            h: 'uair',
	            hh: '%d uairean',
	            d: 'latha',
	            dd: '%d latha',
	            M: 'mìos',
	            MM: '%d mìosan',
	            y: 'bliadhna',
	            yy: '%d bliadhna'
	        },
	        ordinalParse: /\d{1,2}(d|na|mh)/,
	        ordinal: function ordinal(number) {
	            var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return gd;
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : galician (gl)
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var gl = moment.defineLocale('gl', {
	        months: 'Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro'.split('_'),
	        monthsShort: 'Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado'.split('_'),
	        weekdaysShort: 'Dom._Lun._Mar._Mér._Xov._Ven._Sáb.'.split('_'),
	        weekdaysMin: 'Do_Lu_Ma_Mé_Xo_Ve_Sá'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY H:mm',
	            LLLL: 'dddd D MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: function sameDay() {
	                return '[hoxe ' + (this.hours() !== 1 ? 'ás' : 'á') + '] LT';
	            },
	            nextDay: function nextDay() {
	                return '[mañá ' + (this.hours() !== 1 ? 'ás' : 'á') + '] LT';
	            },
	            nextWeek: function nextWeek() {
	                return 'dddd [' + (this.hours() !== 1 ? 'ás' : 'a') + '] LT';
	            },
	            lastDay: function lastDay() {
	                return '[onte ' + (this.hours() !== 1 ? 'á' : 'a') + '] LT';
	            },
	            lastWeek: function lastWeek() {
	                return '[o] dddd [pasado ' + (this.hours() !== 1 ? 'ás' : 'a') + '] LT';
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: function future(str) {
	                if (str === 'uns segundos') {
	                    return 'nuns segundos';
	                }
	                return 'en ' + str;
	            },
	            past: 'hai %s',
	            s: 'uns segundos',
	            m: 'un minuto',
	            mm: '%d minutos',
	            h: 'unha hora',
	            hh: '%d horas',
	            d: 'un día',
	            dd: '%d días',
	            M: 'un mes',
	            MM: '%d meses',
	            y: 'un ano',
	            yy: '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal: '%dº',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return gl;
	});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Hebrew (he)
	//! author : Tomer Cohen : https://github.com/tomer
	//! author : Moshe Simantov : https://github.com/DevelopmentIL
	//! author : Tal Ater : https://github.com/TalAter

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var he = moment.defineLocale('he', {
	        months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
	        monthsShort: 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
	        weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
	        weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
	        weekdaysMin: 'א_ב_ג_ד_ה_ו_ש'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D [ב]MMMM YYYY',
	            LLL: 'D [ב]MMMM YYYY HH:mm',
	            LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
	            l: 'D/M/YYYY',
	            ll: 'D MMM YYYY',
	            lll: 'D MMM YYYY HH:mm',
	            llll: 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[היום ב־]LT',
	            nextDay: '[מחר ב־]LT',
	            nextWeek: 'dddd [בשעה] LT',
	            lastDay: '[אתמול ב־]LT',
	            lastWeek: '[ביום] dddd [האחרון בשעה] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'בעוד %s',
	            past: 'לפני %s',
	            s: 'מספר שניות',
	            m: 'דקה',
	            mm: '%d דקות',
	            h: 'שעה',
	            hh: function hh(number) {
	                if (number === 2) {
	                    return 'שעתיים';
	                }
	                return number + ' שעות';
	            },
	            d: 'יום',
	            dd: function dd(number) {
	                if (number === 2) {
	                    return 'יומיים';
	                }
	                return number + ' ימים';
	            },
	            M: 'חודש',
	            MM: function MM(number) {
	                if (number === 2) {
	                    return 'חודשיים';
	                }
	                return number + ' חודשים';
	            },
	            y: 'שנה',
	            yy: function yy(number) {
	                if (number === 2) {
	                    return 'שנתיים';
	                } else if (number % 10 === 0 && number !== 10) {
	                    return number + ' שנה';
	                }
	                return number + ' שנים';
	            }
	        },
	        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
	        isPM: function isPM(input) {
	            return (/^(אחה"צ|אחרי הצהריים|בערב)$/.test(input)
	            );
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 5) {
	                return 'לפנות בוקר';
	            } else if (hour < 10) {
	                return 'בבוקר';
	            } else if (hour < 12) {
	                return isLower ? 'לפנה"צ' : 'לפני הצהריים';
	            } else if (hour < 18) {
	                return isLower ? 'אחה"צ' : 'אחרי הצהריים';
	            } else {
	                return 'בערב';
	            }
	        }
	    });

	    return he;
	});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : hindi (hi)
	//! author : Mayank Singhal : https://github.com/mayanksinghal

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	        numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    var hi = moment.defineLocale('hi', {
	        months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
	        monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat: {
	            LT: 'A h:mm बजे',
	            LTS: 'A h:mm:ss बजे',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY, A h:mm बजे',
	            LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
	        },
	        calendar: {
	            sameDay: '[आज] LT',
	            nextDay: '[कल] LT',
	            nextWeek: 'dddd, LT',
	            lastDay: '[कल] LT',
	            lastWeek: '[पिछले] dddd, LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s में',
	            past: '%s पहले',
	            s: 'कुछ ही क्षण',
	            m: 'एक मिनट',
	            mm: '%d मिनट',
	            h: 'एक घंटा',
	            hh: '%d घंटे',
	            d: 'एक दिन',
	            dd: '%d दिन',
	            M: 'एक महीने',
	            MM: '%d महीने',
	            y: 'एक वर्ष',
	            yy: '%d वर्ष'
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Hindi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
	        meridiemParse: /रात|सुबह|दोपहर|शाम/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सुबह') {
	                return hour;
	            } else if (meridiem === 'दोपहर') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'शाम') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात';
	            } else if (hour < 10) {
	                return 'सुबह';
	            } else if (hour < 17) {
	                return 'दोपहर';
	            } else if (hour < 20) {
	                return 'शाम';
	            } else {
	                return 'रात';
	            }
	        },
	        week: {
	            dow: 0, // Sunday is the first day of the week.
	            doy: 6 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hi;
	});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : hrvatski (hr)
	//! author : Bojan Marković : https://github.com/bmarkovic

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	            case 'm':
	                return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	            case 'mm':
	                if (number === 1) {
	                    result += 'minuta';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'minute';
	                } else {
	                    result += 'minuta';
	                }
	                return result;
	            case 'h':
	                return withoutSuffix ? 'jedan sat' : 'jednog sata';
	            case 'hh':
	                if (number === 1) {
	                    result += 'sat';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'sata';
	                } else {
	                    result += 'sati';
	                }
	                return result;
	            case 'dd':
	                if (number === 1) {
	                    result += 'dan';
	                } else {
	                    result += 'dana';
	                }
	                return result;
	            case 'MM':
	                if (number === 1) {
	                    result += 'mjesec';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'mjeseca';
	                } else {
	                    result += 'mjeseci';
	                }
	                return result;
	            case 'yy':
	                if (number === 1) {
	                    result += 'godina';
	                } else if (number === 2 || number === 3 || number === 4) {
	                    result += 'godine';
	                } else {
	                    result += 'godina';
	                }
	                return result;
	        }
	    }

	    var hr = moment.defineLocale('hr', {
	        months: {
	            format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
	            standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
	        },
	        monthsShort: 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sutra u] LT',
	            nextWeek: function nextWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[u] [nedjelju] [u] LT';
	                    case 3:
	                        return '[u] [srijedu] [u] LT';
	                    case 6:
	                        return '[u] [subotu] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[u] dddd [u] LT';
	                }
	            },
	            lastDay: '[jučer u] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                        return '[prošlu] dddd [u] LT';
	                    case 6:
	                        return '[prošle] [subote] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[prošli] dddd [u] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'za %s',
	            past: 'prije %s',
	            s: 'par sekundi',
	            m: translate,
	            mm: translate,
	            h: translate,
	            hh: translate,
	            d: 'dan',
	            dd: translate,
	            M: 'mjesec',
	            MM: translate,
	            y: 'godinu',
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hr;
	});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : hungarian (hu)
	//! author : Adam Brunner : https://github.com/adambrunner

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
	    function translate(number, withoutSuffix, key, isFuture) {
	        var num = number,
	            suffix;
	        switch (key) {
	            case 's':
	                return isFuture || withoutSuffix ? 'néhány másodperc' : 'néhány másodperce';
	            case 'm':
	                return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
	            case 'mm':
	                return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
	            case 'h':
	                return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
	            case 'hh':
	                return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
	            case 'd':
	                return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
	            case 'dd':
	                return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
	            case 'M':
	                return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	            case 'MM':
	                return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	            case 'y':
	                return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
	            case 'yy':
	                return num + (isFuture || withoutSuffix ? ' év' : ' éve');
	        }
	        return '';
	    }
	    function week(isFuture) {
	        return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
	    }

	    var hu = moment.defineLocale('hu', {
	        months: 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
	        monthsShort: 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
	        weekdays: 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
	        weekdaysShort: 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
	        weekdaysMin: 'v_h_k_sze_cs_p_szo'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'YYYY.MM.DD.',
	            LL: 'YYYY. MMMM D.',
	            LLL: 'YYYY. MMMM D. H:mm',
	            LLLL: 'YYYY. MMMM D., dddd H:mm'
	        },
	        meridiemParse: /de|du/i,
	        isPM: function isPM(input) {
	            return input.charAt(1).toLowerCase() === 'u';
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower === true ? 'de' : 'DE';
	            } else {
	                return isLower === true ? 'du' : 'DU';
	            }
	        },
	        calendar: {
	            sameDay: '[ma] LT[-kor]',
	            nextDay: '[holnap] LT[-kor]',
	            nextWeek: function nextWeek() {
	                return week.call(this, true);
	            },
	            lastDay: '[tegnap] LT[-kor]',
	            lastWeek: function lastWeek() {
	                return week.call(this, false);
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s múlva',
	            past: '%s',
	            s: translate,
	            m: translate,
	            mm: translate,
	            h: translate,
	            hh: translate,
	            d: translate,
	            dd: translate,
	            M: translate,
	            MM: translate,
	            y: translate,
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hu;
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Armenian (hy-am)
	//! author : Armendarabyan : https://github.com/armendarabyan

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var hy_am = moment.defineLocale('hy-am', {
	        months: {
	            format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
	            standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
	        },
	        monthsShort: 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
	        weekdays: 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
	        weekdaysShort: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        weekdaysMin: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY թ.',
	            LLL: 'D MMMM YYYY թ., HH:mm',
	            LLLL: 'dddd, D MMMM YYYY թ., HH:mm'
	        },
	        calendar: {
	            sameDay: '[այսօր] LT',
	            nextDay: '[վաղը] LT',
	            lastDay: '[երեկ] LT',
	            nextWeek: function nextWeek() {
	                return 'dddd [օրը ժամը] LT';
	            },
	            lastWeek: function lastWeek() {
	                return '[անցած] dddd [օրը ժամը] LT';
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s հետո',
	            past: '%s առաջ',
	            s: 'մի քանի վայրկյան',
	            m: 'րոպե',
	            mm: '%d րոպե',
	            h: 'ժամ',
	            hh: '%d ժամ',
	            d: 'օր',
	            dd: '%d օր',
	            M: 'ամիս',
	            MM: '%d ամիս',
	            y: 'տարի',
	            yy: '%d տարի'
	        },
	        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
	        isPM: function isPM(input) {
	            return (/^(ցերեկվա|երեկոյան)$/.test(input)
	            );
	        },
	        meridiem: function meridiem(hour) {
	            if (hour < 4) {
	                return 'գիշերվա';
	            } else if (hour < 12) {
	                return 'առավոտվա';
	            } else if (hour < 17) {
	                return 'ցերեկվա';
	            } else {
	                return 'երեկոյան';
	            }
	        },
	        ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
	        ordinal: function ordinal(number, period) {
	            switch (period) {
	                case 'DDD':
	                case 'w':
	                case 'W':
	                case 'DDDo':
	                    if (number === 1) {
	                        return number + '-ին';
	                    }
	                    return number + '-րդ';
	                default:
	                    return number;
	            }
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return hy_am;
	});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Bahasa Indonesia (id)
	//! author : Mohammad Satrio Utomo : https://github.com/tyok
	//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var id = moment.defineLocale('id', {
	        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
	        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
	        weekdays: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
	        weekdaysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
	        weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat: {
	            LT: 'HH.mm',
	            LTS: 'HH.mm.ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY [pukul] HH.mm',
	            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|siang|sore|malam/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'siang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sore' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'siang';
	            } else if (hours < 19) {
	                return 'sore';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar: {
	            sameDay: '[Hari ini pukul] LT',
	            nextDay: '[Besok pukul] LT',
	            nextWeek: 'dddd [pukul] LT',
	            lastDay: '[Kemarin pukul] LT',
	            lastWeek: 'dddd [lalu pukul] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'dalam %s',
	            past: '%s yang lalu',
	            s: 'beberapa detik',
	            m: 'semenit',
	            mm: '%d menit',
	            h: 'sejam',
	            hh: '%d jam',
	            d: 'sehari',
	            dd: '%d hari',
	            M: 'sebulan',
	            MM: '%d bulan',
	            y: 'setahun',
	            yy: '%d tahun'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return id;
	});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : icelandic (is)
	//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function plural(n) {
	        if (n % 100 === 11) {
	            return true;
	        } else if (n % 10 === 1) {
	            return false;
	        }
	        return true;
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	            case 's':
	                return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
	            case 'm':
	                return withoutSuffix ? 'mínúta' : 'mínútu';
	            case 'mm':
	                if (plural(number)) {
	                    return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
	                } else if (withoutSuffix) {
	                    return result + 'mínúta';
	                }
	                return result + 'mínútu';
	            case 'hh':
	                if (plural(number)) {
	                    return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
	                }
	                return result + 'klukkustund';
	            case 'd':
	                if (withoutSuffix) {
	                    return 'dagur';
	                }
	                return isFuture ? 'dag' : 'degi';
	            case 'dd':
	                if (plural(number)) {
	                    if (withoutSuffix) {
	                        return result + 'dagar';
	                    }
	                    return result + (isFuture ? 'daga' : 'dögum');
	                } else if (withoutSuffix) {
	                    return result + 'dagur';
	                }
	                return result + (isFuture ? 'dag' : 'degi');
	            case 'M':
	                if (withoutSuffix) {
	                    return 'mánuður';
	                }
	                return isFuture ? 'mánuð' : 'mánuði';
	            case 'MM':
	                if (plural(number)) {
	                    if (withoutSuffix) {
	                        return result + 'mánuðir';
	                    }
	                    return result + (isFuture ? 'mánuði' : 'mánuðum');
	                } else if (withoutSuffix) {
	                    return result + 'mánuður';
	                }
	                return result + (isFuture ? 'mánuð' : 'mánuði');
	            case 'y':
	                return withoutSuffix || isFuture ? 'ár' : 'ári';
	            case 'yy':
	                if (plural(number)) {
	                    return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
	                }
	                return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
	        }
	    }

	    var is = moment.defineLocale('is', {
	        months: 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
	        monthsShort: 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
	        weekdays: 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
	        weekdaysShort: 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
	        weekdaysMin: 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY [kl.] H:mm',
	            LLLL: 'dddd, D. MMMM YYYY [kl.] H:mm'
	        },
	        calendar: {
	            sameDay: '[í dag kl.] LT',
	            nextDay: '[á morgun kl.] LT',
	            nextWeek: 'dddd [kl.] LT',
	            lastDay: '[í gær kl.] LT',
	            lastWeek: '[síðasta] dddd [kl.] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'eftir %s',
	            past: 'fyrir %s síðan',
	            s: translate,
	            m: translate,
	            mm: translate,
	            h: 'klukkustund',
	            hh: translate,
	            d: translate,
	            dd: translate,
	            M: translate,
	            MM: translate,
	            y: translate,
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return is;
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : italian (it)
	//! author : Lorenzo : https://github.com/aliem
	//! author: Mattia Larentis: https://github.com/nostalgiaz

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var it = moment.defineLocale('it', {
	        months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
	        monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
	        weekdays: 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
	        weekdaysShort: 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
	        weekdaysMin: 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Oggi alle] LT',
	            nextDay: '[Domani alle] LT',
	            nextWeek: 'dddd [alle] LT',
	            lastDay: '[Ieri alle] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[la scorsa] dddd [alle] LT';
	                    default:
	                        return '[lo scorso] dddd [alle] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: function future(s) {
	                return (/^[0-9].+$/.test(s) ? 'tra' : 'in') + ' ' + s;
	            },
	            past: '%s fa',
	            s: 'alcuni secondi',
	            m: 'un minuto',
	            mm: '%d minuti',
	            h: 'un\'ora',
	            hh: '%d ore',
	            d: 'un giorno',
	            dd: '%d giorni',
	            M: 'un mese',
	            MM: '%d mesi',
	            y: 'un anno',
	            yy: '%d anni'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal: '%dº',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return it;
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : japanese (ja)
	//! author : LI Long : https://github.com/baryon

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ja = moment.defineLocale('ja', {
	        months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
	        weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
	        weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
	        longDateFormat: {
	            LT: 'Ah時m分',
	            LTS: 'Ah時m分s秒',
	            L: 'YYYY/MM/DD',
	            LL: 'YYYY年M月D日',
	            LLL: 'YYYY年M月D日Ah時m分',
	            LLLL: 'YYYY年M月D日Ah時m分 dddd'
	        },
	        meridiemParse: /午前|午後/i,
	        isPM: function isPM(input) {
	            return input === '午後';
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 12) {
	                return '午前';
	            } else {
	                return '午後';
	            }
	        },
	        calendar: {
	            sameDay: '[今日] LT',
	            nextDay: '[明日] LT',
	            nextWeek: '[来週]dddd LT',
	            lastDay: '[昨日] LT',
	            lastWeek: '[前週]dddd LT',
	            sameElse: 'L'
	        },
	        ordinalParse: /\d{1,2}日/,
	        ordinal: function ordinal(number, period) {
	            switch (period) {
	                case 'd':
	                case 'D':
	                case 'DDD':
	                    return number + '日';
	                default:
	                    return number;
	            }
	        },
	        relativeTime: {
	            future: '%s後',
	            past: '%s前',
	            s: '数秒',
	            m: '1分',
	            mm: '%d分',
	            h: '1時間',
	            hh: '%d時間',
	            d: '1日',
	            dd: '%d日',
	            M: '1ヶ月',
	            MM: '%dヶ月',
	            y: '1年',
	            yy: '%d年'
	        }
	    });

	    return ja;
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Boso Jowo (jv)
	//! author : Rony Lantip : https://github.com/lantip
	//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var jv = moment.defineLocale('jv', {
	        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
	        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
	        weekdays: 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
	        weekdaysShort: 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
	        weekdaysMin: 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
	        longDateFormat: {
	            LT: 'HH.mm',
	            LTS: 'HH.mm.ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY [pukul] HH.mm',
	            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /enjing|siyang|sonten|ndalu/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'enjing') {
	                return hour;
	            } else if (meridiem === 'siyang') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'enjing';
	            } else if (hours < 15) {
	                return 'siyang';
	            } else if (hours < 19) {
	                return 'sonten';
	            } else {
	                return 'ndalu';
	            }
	        },
	        calendar: {
	            sameDay: '[Dinten puniko pukul] LT',
	            nextDay: '[Mbenjang pukul] LT',
	            nextWeek: 'dddd [pukul] LT',
	            lastDay: '[Kala wingi pukul] LT',
	            lastWeek: 'dddd [kepengker pukul] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'wonten ing %s',
	            past: '%s ingkang kepengker',
	            s: 'sawetawis detik',
	            m: 'setunggal menit',
	            mm: '%d menit',
	            h: 'setunggal jam',
	            hh: '%d jam',
	            d: 'sedinten',
	            dd: '%d dinten',
	            M: 'sewulan',
	            MM: '%d wulan',
	            y: 'setaun',
	            yy: '%d taun'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return jv;
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Georgian (ka)
	//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ka = moment.defineLocale('ka', {
	        months: {
	            standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
	            format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
	        },
	        monthsShort: 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
	        weekdays: {
	            standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
	            format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
	            isFormat: /(წინა|შემდეგ)/
	        },
	        weekdaysShort: 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
	        weekdaysMin: 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
	        longDateFormat: {
	            LT: 'h:mm A',
	            LTS: 'h:mm:ss A',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY h:mm A',
	            LLLL: 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar: {
	            sameDay: '[დღეს] LT[-ზე]',
	            nextDay: '[ხვალ] LT[-ზე]',
	            lastDay: '[გუშინ] LT[-ზე]',
	            nextWeek: '[შემდეგ] dddd LT[-ზე]',
	            lastWeek: '[წინა] dddd LT-ზე',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: function future(s) {
	                return (/(წამი|წუთი|საათი|წელი)/.test(s) ? s.replace(/ი$/, 'ში') : s + 'ში'
	                );
	            },
	            past: function past(s) {
	                if (/(წამი|წუთი|საათი|დღე|თვე)/.test(s)) {
	                    return s.replace(/(ი|ე)$/, 'ის წინ');
	                }
	                if (/წელი/.test(s)) {
	                    return s.replace(/წელი$/, 'წლის წინ');
	                }
	            },
	            s: 'რამდენიმე წამი',
	            m: 'წუთი',
	            mm: '%d წუთი',
	            h: 'საათი',
	            hh: '%d საათი',
	            d: 'დღე',
	            dd: '%d დღე',
	            M: 'თვე',
	            MM: '%d თვე',
	            y: 'წელი',
	            yy: '%d წელი'
	        },
	        ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
	        ordinal: function ordinal(number) {
	            if (number === 0) {
	                return number;
	            }
	            if (number === 1) {
	                return number + '-ლი';
	            }
	            if (number < 20 || number <= 100 && number % 20 === 0 || number % 100 === 0) {
	                return 'მე-' + number;
	            }
	            return number + '-ე';
	        },
	        week: {
	            dow: 1,
	            doy: 7
	        }
	    });

	    return ka;
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : kazakh (kk)
	//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var suffixes = {
	        0: '-ші',
	        1: '-ші',
	        2: '-ші',
	        3: '-ші',
	        4: '-ші',
	        5: '-ші',
	        6: '-шы',
	        7: '-ші',
	        8: '-ші',
	        9: '-шы',
	        10: '-шы',
	        20: '-шы',
	        30: '-шы',
	        40: '-шы',
	        50: '-ші',
	        60: '-шы',
	        70: '-ші',
	        80: '-ші',
	        90: '-шы',
	        100: '-ші'
	    };

	    var kk = moment.defineLocale('kk', {
	        months: 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
	        monthsShort: 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
	        weekdays: 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
	        weekdaysShort: 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
	        weekdaysMin: 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Бүгін сағат] LT',
	            nextDay: '[Ертең сағат] LT',
	            nextWeek: 'dddd [сағат] LT',
	            lastDay: '[Кеше сағат] LT',
	            lastWeek: '[Өткен аптаның] dddd [сағат] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s ішінде',
	            past: '%s бұрын',
	            s: 'бірнеше секунд',
	            m: 'бір минут',
	            mm: '%d минут',
	            h: 'бір сағат',
	            hh: '%d сағат',
	            d: 'бір күн',
	            dd: '%d күн',
	            M: 'бір ай',
	            MM: '%d ай',
	            y: 'бір жыл',
	            yy: '%d жыл'
	        },
	        ordinalParse: /\d{1,2}-(ші|шы)/,
	        ordinal: function ordinal(number) {
	            var a = number % 10,
	                b = number >= 100 ? 100 : null;
	            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return kk;
	});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : khmer (km)
	//! author : Kruy Vanna : https://github.com/kruyvanna

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var km = moment.defineLocale('km', {
	        months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	        weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
	            nextDay: '[ស្អែក ម៉ោង] LT',
	            nextWeek: 'dddd [ម៉ោង] LT',
	            lastDay: '[ម្សិលមិញ ម៉ោង] LT',
	            lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%sទៀត',
	            past: '%sមុន',
	            s: 'ប៉ុន្មានវិនាទី',
	            m: 'មួយនាទី',
	            mm: '%d នាទី',
	            h: 'មួយម៉ោង',
	            hh: '%d ម៉ោង',
	            d: 'មួយថ្ងៃ',
	            dd: '%d ថ្ងៃ',
	            M: 'មួយខែ',
	            MM: '%d ខែ',
	            y: 'មួយឆ្នាំ',
	            yy: '%d ឆ្នាំ'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return km;
	});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : korean (ko)
	//!
	//! authors
	//!
	//! - Kyungwook, Park : https://github.com/kyungw00k
	//! - Jeeeyul Lee <jeeeyul@gmail.com>

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ko = moment.defineLocale('ko', {
	        months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	        weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
	        weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
	        weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
	        longDateFormat: {
	            LT: 'A h시 m분',
	            LTS: 'A h시 m분 s초',
	            L: 'YYYY.MM.DD',
	            LL: 'YYYY년 MMMM D일',
	            LLL: 'YYYY년 MMMM D일 A h시 m분',
	            LLLL: 'YYYY년 MMMM D일 dddd A h시 m분'
	        },
	        calendar: {
	            sameDay: '오늘 LT',
	            nextDay: '내일 LT',
	            nextWeek: 'dddd LT',
	            lastDay: '어제 LT',
	            lastWeek: '지난주 dddd LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s 후',
	            past: '%s 전',
	            s: '몇 초',
	            ss: '%d초',
	            m: '일분',
	            mm: '%d분',
	            h: '한 시간',
	            hh: '%d시간',
	            d: '하루',
	            dd: '%d일',
	            M: '한 달',
	            MM: '%d달',
	            y: '일 년',
	            yy: '%d년'
	        },
	        ordinalParse: /\d{1,2}일/,
	        ordinal: '%d일',
	        meridiemParse: /오전|오후/,
	        isPM: function isPM(token) {
	            return token === '오후';
	        },
	        meridiem: function meridiem(hour, minute, isUpper) {
	            return hour < 12 ? '오전' : '오후';
	        }
	    });

	    return ko;
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : kyrgyz (ky)
	//! author : Chyngyz Arystan uulu : https://github.com/chyngyz

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var suffixes = {
	        0: '-чү',
	        1: '-чи',
	        2: '-чи',
	        3: '-чү',
	        4: '-чү',
	        5: '-чи',
	        6: '-чы',
	        7: '-чи',
	        8: '-чи',
	        9: '-чу',
	        10: '-чу',
	        20: '-чы',
	        30: '-чу',
	        40: '-чы',
	        50: '-чү',
	        60: '-чы',
	        70: '-чи',
	        80: '-чи',
	        90: '-чу',
	        100: '-чү'
	    };

	    var ky = moment.defineLocale('ky', {
	        months: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
	        monthsShort: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays: 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
	        weekdaysShort: 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
	        weekdaysMin: 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Бүгүн саат] LT',
	            nextDay: '[Эртең саат] LT',
	            nextWeek: 'dddd [саат] LT',
	            lastDay: '[Кече саат] LT',
	            lastWeek: '[Өткен аптанын] dddd [күнү] [саат] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s ичинде',
	            past: '%s мурун',
	            s: 'бирнече секунд',
	            m: 'бир мүнөт',
	            mm: '%d мүнөт',
	            h: 'бир саат',
	            hh: '%d саат',
	            d: 'бир күн',
	            dd: '%d күн',
	            M: 'бир ай',
	            MM: '%d ай',
	            y: 'бир жыл',
	            yy: '%d жыл'
	        },
	        ordinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
	        ordinal: function ordinal(number) {
	            var a = number % 10,
	                b = number >= 100 ? 100 : null;
	            return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ky;
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Luxembourgish (lb)
	//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            'm': ['eng Minutt', 'enger Minutt'],
	            'h': ['eng Stonn', 'enger Stonn'],
	            'd': ['een Dag', 'engem Dag'],
	            'M': ['ee Mount', 'engem Mount'],
	            'y': ['ee Joer', 'engem Joer']
	        };
	        return withoutSuffix ? format[key][0] : format[key][1];
	    }
	    function processFutureTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'a ' + string;
	        }
	        return 'an ' + string;
	    }
	    function processPastTime(string) {
	        var number = string.substr(0, string.indexOf(' '));
	        if (eifelerRegelAppliesToNumber(number)) {
	            return 'viru ' + string;
	        }
	        return 'virun ' + string;
	    }
	    /**
	     * Returns true if the word before the given number loses the '-n' ending.
	     * e.g. 'an 10 Deeg' but 'a 5 Deeg'
	     *
	     * @param number {integer}
	     * @returns {boolean}
	     */
	    function eifelerRegelAppliesToNumber(number) {
	        number = parseInt(number, 10);
	        if (isNaN(number)) {
	            return false;
	        }
	        if (number < 0) {
	            // Negative Number --> always true
	            return true;
	        } else if (number < 10) {
	            // Only 1 digit
	            if (4 <= number && number <= 7) {
	                return true;
	            }
	            return false;
	        } else if (number < 100) {
	            // 2 digits
	            var lastDigit = number % 10,
	                firstDigit = number / 10;
	            if (lastDigit === 0) {
	                return eifelerRegelAppliesToNumber(firstDigit);
	            }
	            return eifelerRegelAppliesToNumber(lastDigit);
	        } else if (number < 10000) {
	            // 3 or 4 digits --> recursively check first digit
	            while (number >= 10) {
	                number = number / 10;
	            }
	            return eifelerRegelAppliesToNumber(number);
	        } else {
	            // Anything larger than 4 digits: recursively check first n-3 digits
	            number = number / 1000;
	            return eifelerRegelAppliesToNumber(number);
	        }
	    }

	    var lb = moment.defineLocale('lb', {
	        months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	        monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
	        weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
	        weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm [Auer]',
	            LTS: 'H:mm:ss [Auer]',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm [Auer]',
	            LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
	        },
	        calendar: {
	            sameDay: '[Haut um] LT',
	            sameElse: 'L',
	            nextDay: '[Muer um] LT',
	            nextWeek: 'dddd [um] LT',
	            lastDay: '[Gëschter um] LT',
	            lastWeek: function lastWeek() {
	                // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
	                switch (this.day()) {
	                    case 2:
	                    case 4:
	                        return '[Leschten] dddd [um] LT';
	                    default:
	                        return '[Leschte] dddd [um] LT';
	                }
	            }
	        },
	        relativeTime: {
	            future: processFutureTime,
	            past: processPastTime,
	            s: 'e puer Sekonnen',
	            m: processRelativeTime,
	            mm: '%d Minutten',
	            h: processRelativeTime,
	            hh: '%d Stonnen',
	            d: processRelativeTime,
	            dd: '%d Deeg',
	            M: processRelativeTime,
	            MM: '%d Méint',
	            y: processRelativeTime,
	            yy: '%d Joer'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lb;
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : lao (lo)
	//! author : Ryan Hart : https://github.com/ryanhart2

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var lo = moment.defineLocale('lo', {
	        months: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        monthsShort: 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	        weekdays: 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysShort: 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	        weekdaysMin: 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'ວັນdddd D MMMM YYYY HH:mm'
	        },
	        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
	        isPM: function isPM(input) {
	            return input === 'ຕອນແລງ';
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ຕອນເຊົ້າ';
	            } else {
	                return 'ຕອນແລງ';
	            }
	        },
	        calendar: {
	            sameDay: '[ມື້ນີ້ເວລາ] LT',
	            nextDay: '[ມື້ອື່ນເວລາ] LT',
	            nextWeek: '[ວັນ]dddd[ໜ້າເວລາ] LT',
	            lastDay: '[ມື້ວານນີ້ເວລາ] LT',
	            lastWeek: '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'ອີກ %s',
	            past: '%sຜ່ານມາ',
	            s: 'ບໍ່ເທົ່າໃດວິນາທີ',
	            m: '1 ນາທີ',
	            mm: '%d ນາທີ',
	            h: '1 ຊົ່ວໂມງ',
	            hh: '%d ຊົ່ວໂມງ',
	            d: '1 ມື້',
	            dd: '%d ມື້',
	            M: '1 ເດືອນ',
	            MM: '%d ເດືອນ',
	            y: '1 ປີ',
	            yy: '%d ປີ'
	        },
	        ordinalParse: /(ທີ່)\d{1,2}/,
	        ordinal: function ordinal(number) {
	            return 'ທີ່' + number;
	        }
	    });

	    return lo;
	});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Lithuanian (lt)
	//! author : Mindaugas Mozūras : https://github.com/mmozuras

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var units = {
	        'm': 'minutė_minutės_minutę',
	        'mm': 'minutės_minučių_minutes',
	        'h': 'valanda_valandos_valandą',
	        'hh': 'valandos_valandų_valandas',
	        'd': 'diena_dienos_dieną',
	        'dd': 'dienos_dienų_dienas',
	        'M': 'mėnuo_mėnesio_mėnesį',
	        'MM': 'mėnesiai_mėnesių_mėnesius',
	        'y': 'metai_metų_metus',
	        'yy': 'metai_metų_metus'
	    };
	    function translateSeconds(number, withoutSuffix, key, isFuture) {
	        if (withoutSuffix) {
	            return 'kelios sekundės';
	        } else {
	            return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
	        }
	    }
	    function translateSingular(number, withoutSuffix, key, isFuture) {
	        return withoutSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
	    }
	    function special(number) {
	        return number % 10 === 0 || number > 10 && number < 20;
	    }
	    function forms(key) {
	        return units[key].split('_');
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        if (number === 1) {
	            return result + translateSingular(number, withoutSuffix, key[0], isFuture);
	        } else if (withoutSuffix) {
	            return result + (special(number) ? forms(key)[1] : forms(key)[0]);
	        } else {
	            if (isFuture) {
	                return result + forms(key)[1];
	            } else {
	                return result + (special(number) ? forms(key)[1] : forms(key)[2]);
	            }
	        }
	    }
	    var lt = moment.defineLocale('lt', {
	        months: {
	            format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
	            standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_')
	        },
	        monthsShort: 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
	        weekdays: {
	            format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
	            standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
	            isFormat: /dddd HH:mm/
	        },
	        weekdaysShort: 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
	        weekdaysMin: 'S_P_A_T_K_Pn_Š'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'YYYY-MM-DD',
	            LL: 'YYYY [m.] MMMM D [d.]',
	            LLL: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            LLLL: 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
	            l: 'YYYY-MM-DD',
	            ll: 'YYYY [m.] MMMM D [d.]',
	            lll: 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	            llll: 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
	        },
	        calendar: {
	            sameDay: '[Šiandien] LT',
	            nextDay: '[Rytoj] LT',
	            nextWeek: 'dddd LT',
	            lastDay: '[Vakar] LT',
	            lastWeek: '[Praėjusį] dddd LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'po %s',
	            past: 'prieš %s',
	            s: translateSeconds,
	            m: translateSingular,
	            mm: translate,
	            h: translateSingular,
	            hh: translate,
	            d: translateSingular,
	            dd: translate,
	            M: translateSingular,
	            MM: translate,
	            y: translateSingular,
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}-oji/,
	        ordinal: function ordinal(number) {
	            return number + '-oji';
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lt;
	});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : latvian (lv)
	//! author : Kristaps Karlsons : https://github.com/skakri
	//! author : Jānis Elmeris : https://github.com/JanisE

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var units = {
	        'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	        'h': 'stundas_stundām_stunda_stundas'.split('_'),
	        'hh': 'stundas_stundām_stunda_stundas'.split('_'),
	        'd': 'dienas_dienām_diena_dienas'.split('_'),
	        'dd': 'dienas_dienām_diena_dienas'.split('_'),
	        'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	        'y': 'gada_gadiem_gads_gadi'.split('_'),
	        'yy': 'gada_gadiem_gads_gadi'.split('_')
	    };
	    /**
	     * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
	     */
	    function format(forms, number, withoutSuffix) {
	        if (withoutSuffix) {
	            // E.g. "21 minūte", "3 minūtes".
	            return number % 10 === 1 && number !== 11 ? forms[2] : forms[3];
	        } else {
	            // E.g. "21 minūtes" as in "pēc 21 minūtes".
	            // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
	            return number % 10 === 1 && number !== 11 ? forms[0] : forms[1];
	        }
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        return number + ' ' + format(units[key], number, withoutSuffix);
	    }
	    function relativeTimeWithSingular(number, withoutSuffix, key) {
	        return format(units[key], number, withoutSuffix);
	    }
	    function relativeSeconds(number, withoutSuffix) {
	        return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
	    }

	    var lv = moment.defineLocale('lv', {
	        months: 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
	        monthsShort: 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
	        weekdays: 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
	        weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY.',
	            LL: 'YYYY. [gada] D. MMMM',
	            LLL: 'YYYY. [gada] D. MMMM, HH:mm',
	            LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
	        },
	        calendar: {
	            sameDay: '[Šodien pulksten] LT',
	            nextDay: '[Rīt pulksten] LT',
	            nextWeek: 'dddd [pulksten] LT',
	            lastDay: '[Vakar pulksten] LT',
	            lastWeek: '[Pagājušā] dddd [pulksten] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'pēc %s',
	            past: 'pirms %s',
	            s: relativeSeconds,
	            m: relativeTimeWithSingular,
	            mm: relativeTimeWithPlural,
	            h: relativeTimeWithSingular,
	            hh: relativeTimeWithPlural,
	            d: relativeTimeWithSingular,
	            dd: relativeTimeWithPlural,
	            M: relativeTimeWithSingular,
	            MM: relativeTimeWithPlural,
	            y: relativeTimeWithSingular,
	            yy: relativeTimeWithPlural
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return lv;
	});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Montenegrin (me)
	//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jednog minuta'],
	            mm: ['minut', 'minuta', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mjesec', 'mjeseca', 'mjeseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function correctGrammaticalCase(number, wordKey) {
	            return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
	        },
	        translate: function translate(number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var me = moment.defineLocale('me', {
	        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sjutra u] LT',

	            nextWeek: function nextWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[u] [nedjelju] [u] LT';
	                    case 3:
	                        return '[u] [srijedu] [u] LT';
	                    case 6:
	                        return '[u] [subotu] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[u] dddd [u] LT';
	                }
	            },
	            lastDay: '[juče u] LT',
	            lastWeek: function lastWeek() {
	                var lastWeekDays = ['[prošle] [nedjelje] [u] LT', '[prošlog] [ponedjeljka] [u] LT', '[prošlog] [utorka] [u] LT', '[prošle] [srijede] [u] LT', '[prošlog] [četvrtka] [u] LT', '[prošlog] [petka] [u] LT', '[prošle] [subote] [u] LT'];
	                return lastWeekDays[this.day()];
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'za %s',
	            past: 'prije %s',
	            s: 'nekoliko sekundi',
	            m: translator.translate,
	            mm: translator.translate,
	            h: translator.translate,
	            hh: translator.translate,
	            d: 'dan',
	            dd: translator.translate,
	            M: 'mjesec',
	            MM: translator.translate,
	            y: 'godinu',
	            yy: translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return me;
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : macedonian (mk)
	//! author : Borislav Mickov : https://github.com/B0k0

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var mk = moment.defineLocale('mk', {
	        months: 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
	        monthsShort: 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
	        weekdays: 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
	        weekdaysShort: 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
	        weekdaysMin: 'нe_пo_вт_ср_че_пе_сa'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'D.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY H:mm',
	            LLLL: 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[Денес во] LT',
	            nextDay: '[Утре во] LT',
	            nextWeek: '[Во] dddd [во] LT',
	            lastDay: '[Вчера во] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                    case 6:
	                        return '[Изминатата] dddd [во] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[Изминатиот] dddd [во] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'после %s',
	            past: 'пред %s',
	            s: 'неколку секунди',
	            m: 'минута',
	            mm: '%d минути',
	            h: 'час',
	            hh: '%d часа',
	            d: 'ден',
	            dd: '%d дена',
	            M: 'месец',
	            MM: '%d месеци',
	            y: 'година',
	            yy: '%d години'
	        },
	        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	        ordinal: function ordinal(number) {
	            var lastDigit = number % 10,
	                last2Digits = number % 100;
	            if (number === 0) {
	                return number + '-ев';
	            } else if (last2Digits === 0) {
	                return number + '-ен';
	            } else if (last2Digits > 10 && last2Digits < 20) {
	                return number + '-ти';
	            } else if (lastDigit === 1) {
	                return number + '-ви';
	            } else if (lastDigit === 2) {
	                return number + '-ри';
	            } else if (lastDigit === 7 || lastDigit === 8) {
	                return number + '-ми';
	            } else {
	                return number + '-ти';
	            }
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return mk;
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : malayalam (ml)
	//! author : Floyd Pink : https://github.com/floydpink

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ml = moment.defineLocale('ml', {
	        months: 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
	        monthsShort: 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
	        weekdaysShort: 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
	        weekdaysMin: 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
	        longDateFormat: {
	            LT: 'A h:mm -നു',
	            LTS: 'A h:mm:ss -നു',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY, A h:mm -നു',
	            LLLL: 'dddd, D MMMM YYYY, A h:mm -നു'
	        },
	        calendar: {
	            sameDay: '[ഇന്ന്] LT',
	            nextDay: '[നാളെ] LT',
	            nextWeek: 'dddd, LT',
	            lastDay: '[ഇന്നലെ] LT',
	            lastWeek: '[കഴിഞ്ഞ] dddd, LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s കഴിഞ്ഞ്',
	            past: '%s മുൻപ്',
	            s: 'അൽപ നിമിഷങ്ങൾ',
	            m: 'ഒരു മിനിറ്റ്',
	            mm: '%d മിനിറ്റ്',
	            h: 'ഒരു മണിക്കൂർ',
	            hh: '%d മണിക്കൂർ',
	            d: 'ഒരു ദിവസം',
	            dd: '%d ദിവസം',
	            M: 'ഒരു മാസം',
	            MM: '%d മാസം',
	            y: 'ഒരു വർഷം',
	            yy: '%d വർഷം'
	        },
	        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'രാത്രി' && hour >= 4 || meridiem === 'ഉച്ച കഴിഞ്ഞ്' || meridiem === 'വൈകുന്നേരം') {
	                return hour + 12;
	            } else {
	                return hour;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'രാത്രി';
	            } else if (hour < 12) {
	                return 'രാവിലെ';
	            } else if (hour < 17) {
	                return 'ഉച്ച കഴിഞ്ഞ്';
	            } else if (hour < 20) {
	                return 'വൈകുന്നേരം';
	            } else {
	                return 'രാത്രി';
	            }
	        }
	    });

	    return ml;
	});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Marathi (mr)
	//! author : Harshad Kale : https://github.com/kalehv
	//! author : Vivek Athalye : https://github.com/vnathalye

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	        numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    function relativeTimeMr(number, withoutSuffix, string, isFuture) {
	        var output = '';
	        if (withoutSuffix) {
	            switch (string) {
	                case 's':
	                    output = 'काही सेकंद';break;
	                case 'm':
	                    output = 'एक मिनिट';break;
	                case 'mm':
	                    output = '%d मिनिटे';break;
	                case 'h':
	                    output = 'एक तास';break;
	                case 'hh':
	                    output = '%d तास';break;
	                case 'd':
	                    output = 'एक दिवस';break;
	                case 'dd':
	                    output = '%d दिवस';break;
	                case 'M':
	                    output = 'एक महिना';break;
	                case 'MM':
	                    output = '%d महिने';break;
	                case 'y':
	                    output = 'एक वर्ष';break;
	                case 'yy':
	                    output = '%d वर्षे';break;
	            }
	        } else {
	            switch (string) {
	                case 's':
	                    output = 'काही सेकंदां';break;
	                case 'm':
	                    output = 'एका मिनिटा';break;
	                case 'mm':
	                    output = '%d मिनिटां';break;
	                case 'h':
	                    output = 'एका तासा';break;
	                case 'hh':
	                    output = '%d तासां';break;
	                case 'd':
	                    output = 'एका दिवसा';break;
	                case 'dd':
	                    output = '%d दिवसां';break;
	                case 'M':
	                    output = 'एका महिन्या';break;
	                case 'MM':
	                    output = '%d महिन्यां';break;
	                case 'y':
	                    output = 'एका वर्षा';break;
	                case 'yy':
	                    output = '%d वर्षां';break;
	            }
	        }
	        return output.replace(/%d/i, number);
	    }

	    var mr = moment.defineLocale('mr', {
	        months: 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
	        monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	        weekdaysShort: 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
	        weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
	        longDateFormat: {
	            LT: 'A h:mm वाजता',
	            LTS: 'A h:mm:ss वाजता',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY, A h:mm वाजता',
	            LLLL: 'dddd, D MMMM YYYY, A h:mm वाजता'
	        },
	        calendar: {
	            sameDay: '[आज] LT',
	            nextDay: '[उद्या] LT',
	            nextWeek: 'dddd, LT',
	            lastDay: '[काल] LT',
	            lastWeek: '[मागील] dddd, LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%sमध्ये',
	            past: '%sपूर्वी',
	            s: relativeTimeMr,
	            m: relativeTimeMr,
	            mm: relativeTimeMr,
	            h: relativeTimeMr,
	            hh: relativeTimeMr,
	            d: relativeTimeMr,
	            dd: relativeTimeMr,
	            M: relativeTimeMr,
	            MM: relativeTimeMr,
	            y: relativeTimeMr,
	            yy: relativeTimeMr
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'रात्री') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'सकाळी') {
	                return hour;
	            } else if (meridiem === 'दुपारी') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'सायंकाळी') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'रात्री';
	            } else if (hour < 10) {
	                return 'सकाळी';
	            } else if (hour < 17) {
	                return 'दुपारी';
	            } else if (hour < 20) {
	                return 'सायंकाळी';
	            } else {
	                return 'रात्री';
	            }
	        },
	        week: {
	            dow: 0, // Sunday is the first day of the week.
	            doy: 6 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return mr;
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Bahasa Malaysia (ms-MY)
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ms = moment.defineLocale('ms', {
	        months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat: {
	            LT: 'HH.mm',
	            LTS: 'HH.mm.ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY [pukul] HH.mm',
	            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar: {
	            sameDay: '[Hari ini pukul] LT',
	            nextDay: '[Esok pukul] LT',
	            nextWeek: 'dddd [pukul] LT',
	            lastDay: '[Kelmarin pukul] LT',
	            lastWeek: 'dddd [lepas pukul] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'dalam %s',
	            past: '%s yang lepas',
	            s: 'beberapa saat',
	            m: 'seminit',
	            mm: '%d minit',
	            h: 'sejam',
	            hh: '%d jam',
	            d: 'sehari',
	            dd: '%d hari',
	            M: 'sebulan',
	            MM: '%d bulan',
	            y: 'setahun',
	            yy: '%d tahun'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ms;
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Bahasa Malaysia (ms-MY)
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ms_my = moment.defineLocale('ms-my', {
	        months: 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	        monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	        weekdays: 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	        weekdaysShort: 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	        weekdaysMin: 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	        longDateFormat: {
	            LT: 'HH.mm',
	            LTS: 'HH.mm.ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY [pukul] HH.mm',
	            LLLL: 'dddd, D MMMM YYYY [pukul] HH.mm'
	        },
	        meridiemParse: /pagi|tengahari|petang|malam/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'pagi') {
	                return hour;
	            } else if (meridiem === 'tengahari') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'petang' || meridiem === 'malam') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'pagi';
	            } else if (hours < 15) {
	                return 'tengahari';
	            } else if (hours < 19) {
	                return 'petang';
	            } else {
	                return 'malam';
	            }
	        },
	        calendar: {
	            sameDay: '[Hari ini pukul] LT',
	            nextDay: '[Esok pukul] LT',
	            nextWeek: 'dddd [pukul] LT',
	            lastDay: '[Kelmarin pukul] LT',
	            lastWeek: 'dddd [lepas pukul] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'dalam %s',
	            past: '%s yang lepas',
	            s: 'beberapa saat',
	            m: 'seminit',
	            mm: '%d minit',
	            h: 'sejam',
	            hh: '%d jam',
	            d: 'sehari',
	            dd: '%d hari',
	            M: 'sebulan',
	            MM: '%d bulan',
	            y: 'setahun',
	            yy: '%d tahun'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ms_my;
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Burmese (my)
	//! author : Squar team, mysquar.com

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '၁',
	        '2': '၂',
	        '3': '၃',
	        '4': '၄',
	        '5': '၅',
	        '6': '၆',
	        '7': '၇',
	        '8': '၈',
	        '9': '၉',
	        '0': '၀'
	    },
	        numberMap = {
	        '၁': '1',
	        '၂': '2',
	        '၃': '3',
	        '၄': '4',
	        '၅': '5',
	        '၆': '6',
	        '၇': '7',
	        '၈': '8',
	        '၉': '9',
	        '၀': '0'
	    };

	    var my = moment.defineLocale('my', {
	        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
	        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
	        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
	        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ယနေ.] LT [မှာ]',
	            nextDay: '[မနက်ဖြန်] LT [မှာ]',
	            nextWeek: 'dddd LT [မှာ]',
	            lastDay: '[မနေ.က] LT [မှာ]',
	            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'လာမည့် %s မှာ',
	            past: 'လွန်ခဲ့သော %s က',
	            s: 'စက္ကန်.အနည်းငယ်',
	            m: 'တစ်မိနစ်',
	            mm: '%d မိနစ်',
	            h: 'တစ်နာရီ',
	            hh: '%d နာရီ',
	            d: 'တစ်ရက်',
	            dd: '%d ရက်',
	            M: 'တစ်လ',
	            MM: '%d လ',
	            y: 'တစ်နှစ်',
	            yy: '%d နှစ်'
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return my;
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : norwegian bokmål (nb)
	//! authors : Espen Hovlandsdal : https://github.com/rexxars
	//!           Sigurd Gartmann : https://github.com/sigurdga

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var nb = moment.defineLocale('nb', {
	        months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort: 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	        weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
	        weekdaysMin: 'sø_ma_ti_on_to_fr_lø'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY [kl.] HH:mm',
	            LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar: {
	            sameDay: '[i dag kl.] LT',
	            nextDay: '[i morgen kl.] LT',
	            nextWeek: 'dddd [kl.] LT',
	            lastDay: '[i går kl.] LT',
	            lastWeek: '[forrige] dddd [kl.] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'om %s',
	            past: '%s siden',
	            s: 'noen sekunder',
	            m: 'ett minutt',
	            mm: '%d minutter',
	            h: 'en time',
	            hh: '%d timer',
	            d: 'en dag',
	            dd: '%d dager',
	            M: 'en måned',
	            MM: '%d måneder',
	            y: 'ett år',
	            yy: '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nb;
	});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : nepali/nepalese
	//! author : suvash : https://github.com/suvash

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '१',
	        '2': '२',
	        '3': '३',
	        '4': '४',
	        '5': '५',
	        '6': '६',
	        '7': '७',
	        '8': '८',
	        '9': '९',
	        '0': '०'
	    },
	        numberMap = {
	        '१': '1',
	        '२': '2',
	        '३': '3',
	        '४': '4',
	        '५': '5',
	        '६': '6',
	        '७': '7',
	        '८': '8',
	        '९': '9',
	        '०': '0'
	    };

	    var ne = moment.defineLocale('ne', {
	        months: 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
	        monthsShort: 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
	        weekdaysShort: 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
	        weekdaysMin: 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'Aको h:mm बजे',
	            LTS: 'Aको h:mm:ss बजे',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY, Aको h:mm बजे',
	            LLLL: 'dddd, D MMMM YYYY, Aको h:mm बजे'
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[१२३४५६७८९०]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'राति') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'बिहान') {
	                return hour;
	            } else if (meridiem === 'दिउँसो') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'साँझ') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 3) {
	                return 'राति';
	            } else if (hour < 12) {
	                return 'बिहान';
	            } else if (hour < 16) {
	                return 'दिउँसो';
	            } else if (hour < 20) {
	                return 'साँझ';
	            } else {
	                return 'राति';
	            }
	        },
	        calendar: {
	            sameDay: '[आज] LT',
	            nextDay: '[भोलि] LT',
	            nextWeek: '[आउँदो] dddd[,] LT',
	            lastDay: '[हिजो] LT',
	            lastWeek: '[गएको] dddd[,] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%sमा',
	            past: '%s अगाडि',
	            s: 'केही क्षण',
	            m: 'एक मिनेट',
	            mm: '%d मिनेट',
	            h: 'एक घण्टा',
	            hh: '%d घण्टा',
	            d: 'एक दिन',
	            dd: '%d दिन',
	            M: 'एक महिना',
	            MM: '%d महिना',
	            y: 'एक बर्ष',
	            yy: '%d बर्ष'
	        },
	        week: {
	            dow: 0, // Sunday is the first day of the week.
	            doy: 6 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ne;
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : dutch (nl)
	//! author : Joris Röling : https://github.com/jjupiter

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	        monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

	    var nl = moment.defineLocale('nl', {
	        months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	        monthsShort: function monthsShort(m, format) {
	            if (/-MMM-/.test(format)) {
	                return monthsShortWithoutDots[m.month()];
	            } else {
	                return monthsShortWithDots[m.month()];
	            }
	        },
	        monthsParseExact: true,
	        weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	        weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
	        weekdaysMin: 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD-MM-YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[vandaag om] LT',
	            nextDay: '[morgen om] LT',
	            nextWeek: 'dddd [om] LT',
	            lastDay: '[gisteren om] LT',
	            lastWeek: '[afgelopen] dddd [om] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'over %s',
	            past: '%s geleden',
	            s: 'een paar seconden',
	            m: 'één minuut',
	            mm: '%d minuten',
	            h: 'één uur',
	            hh: '%d uur',
	            d: 'één dag',
	            dd: '%d dagen',
	            M: 'één maand',
	            MM: '%d maanden',
	            y: 'één jaar',
	            yy: '%d jaar'
	        },
	        ordinalParse: /\d{1,2}(ste|de)/,
	        ordinal: function ordinal(number) {
	            return number + (number === 1 || number === 8 || number >= 20 ? 'ste' : 'de');
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nl;
	});

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : norwegian nynorsk (nn)
	//! author : https://github.com/mechuwind

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var nn = moment.defineLocale('nn', {
	        months: 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	        monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	        weekdays: 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
	        weekdaysShort: 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
	        weekdaysMin: 'su_må_ty_on_to_fr_lø'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY [kl.] H:mm',
	            LLLL: 'dddd D. MMMM YYYY [kl.] HH:mm'
	        },
	        calendar: {
	            sameDay: '[I dag klokka] LT',
	            nextDay: '[I morgon klokka] LT',
	            nextWeek: 'dddd [klokka] LT',
	            lastDay: '[I går klokka] LT',
	            lastWeek: '[Føregåande] dddd [klokka] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'om %s',
	            past: '%s sidan',
	            s: 'nokre sekund',
	            m: 'eit minutt',
	            mm: '%d minutt',
	            h: 'ein time',
	            hh: '%d timar',
	            d: 'ein dag',
	            dd: '%d dagar',
	            M: 'ein månad',
	            MM: '%d månader',
	            y: 'eit år',
	            yy: '%d år'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return nn;
	});

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : punjabi india (pa-in)
	//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '੧',
	        '2': '੨',
	        '3': '੩',
	        '4': '੪',
	        '5': '੫',
	        '6': '੬',
	        '7': '੭',
	        '8': '੮',
	        '9': '੯',
	        '0': '੦'
	    },
	        numberMap = {
	        '੧': '1',
	        '੨': '2',
	        '੩': '3',
	        '੪': '4',
	        '੫': '5',
	        '੬': '6',
	        '੭': '7',
	        '੮': '8',
	        '੯': '9',
	        '੦': '0'
	    };

	    var pa_in = moment.defineLocale('pa-in', {
	        // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
	        months: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        monthsShort: 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	        weekdays: 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
	        weekdaysShort: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        weekdaysMin: 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	        longDateFormat: {
	            LT: 'A h:mm ਵਜੇ',
	            LTS: 'A h:mm:ss ਵਜੇ',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY, A h:mm ਵਜੇ',
	            LLLL: 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
	        },
	        calendar: {
	            sameDay: '[ਅਜ] LT',
	            nextDay: '[ਕਲ] LT',
	            nextWeek: 'dddd, LT',
	            lastDay: '[ਕਲ] LT',
	            lastWeek: '[ਪਿਛਲੇ] dddd, LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s ਵਿੱਚ',
	            past: '%s ਪਿਛਲੇ',
	            s: 'ਕੁਝ ਸਕਿੰਟ',
	            m: 'ਇਕ ਮਿੰਟ',
	            mm: '%d ਮਿੰਟ',
	            h: 'ਇੱਕ ਘੰਟਾ',
	            hh: '%d ਘੰਟੇ',
	            d: 'ਇੱਕ ਦਿਨ',
	            dd: '%d ਦਿਨ',
	            M: 'ਇੱਕ ਮਹੀਨਾ',
	            MM: '%d ਮਹੀਨੇ',
	            y: 'ਇੱਕ ਸਾਲ',
	            yy: '%d ਸਾਲ'
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
	        // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
	        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'ਰਾਤ') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ਸਵੇਰ') {
	                return hour;
	            } else if (meridiem === 'ਦੁਪਹਿਰ') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'ਸ਼ਾਮ') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ਰਾਤ';
	            } else if (hour < 10) {
	                return 'ਸਵੇਰ';
	            } else if (hour < 17) {
	                return 'ਦੁਪਹਿਰ';
	            } else if (hour < 20) {
	                return 'ਸ਼ਾਮ';
	            } else {
	                return 'ਰਾਤ';
	            }
	        },
	        week: {
	            dow: 0, // Sunday is the first day of the week.
	            doy: 6 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return pa_in;
	});

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : polish (pl)
	//! author : Rafal Hirsz : https://github.com/evoL

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_'),
	        monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
	    function plural(n) {
	        return n % 10 < 5 && n % 10 > 1 && ~ ~(n / 10) % 10 !== 1;
	    }
	    function translate(number, withoutSuffix, key) {
	        var result = number + ' ';
	        switch (key) {
	            case 'm':
	                return withoutSuffix ? 'minuta' : 'minutę';
	            case 'mm':
	                return result + (plural(number) ? 'minuty' : 'minut');
	            case 'h':
	                return withoutSuffix ? 'godzina' : 'godzinę';
	            case 'hh':
	                return result + (plural(number) ? 'godziny' : 'godzin');
	            case 'MM':
	                return result + (plural(number) ? 'miesiące' : 'miesięcy');
	            case 'yy':
	                return result + (plural(number) ? 'lata' : 'lat');
	        }
	    }

	    var pl = moment.defineLocale('pl', {
	        months: function months(momentToFormat, format) {
	            if (format === '') {
	                // Hack: if format empty we know this is used to generate
	                // RegExp by moment. Give then back both valid forms of months
	                // in RegExp ready format.
	                return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
	            } else if (/D MMMM/.test(format)) {
	                return monthsSubjective[momentToFormat.month()];
	            } else {
	                return monthsNominative[momentToFormat.month()];
	            }
	        },
	        monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
	        weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
	        weekdaysShort: 'nie_pon_wt_śr_czw_pt_sb'.split('_'),
	        weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Dziś o] LT',
	            nextDay: '[Jutro o] LT',
	            nextWeek: '[W] dddd [o] LT',
	            lastDay: '[Wczoraj o] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[W zeszłą niedzielę o] LT';
	                    case 3:
	                        return '[W zeszłą środę o] LT';
	                    case 6:
	                        return '[W zeszłą sobotę o] LT';
	                    default:
	                        return '[W zeszły] dddd [o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'za %s',
	            past: '%s temu',
	            s: 'kilka sekund',
	            m: translate,
	            mm: translate,
	            h: translate,
	            hh: translate,
	            d: '1 dzień',
	            dd: '%d dni',
	            M: 'miesiąc',
	            MM: translate,
	            y: 'rok',
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return pl;
	});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : portuguese (pt)
	//! author : Jefferson : https://github.com/jalex79

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var pt = moment.defineLocale('pt', {
	        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays: 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
	        weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin: 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D [de] MMMM [de] YYYY',
	            LLL: 'D [de] MMMM [de] YYYY HH:mm',
	            LLLL: 'dddd, D [de] MMMM [de] YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function lastWeek() {
	                return this.day() === 0 || this.day() === 6 ? '[Último] dddd [às] LT' : // Saturday + Sunday
	                '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'em %s',
	            past: 'há %s',
	            s: 'segundos',
	            m: 'um minuto',
	            mm: '%d minutos',
	            h: 'uma hora',
	            hh: '%d horas',
	            d: 'um dia',
	            dd: '%d dias',
	            M: 'um mês',
	            MM: '%d meses',
	            y: 'um ano',
	            yy: '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal: '%dº',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return pt;
	});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : brazilian portuguese (pt-br)
	//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var pt_br = moment.defineLocale('pt-br', {
	        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	        weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
	        weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	        weekdaysMin: 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D [de] MMMM [de] YYYY',
	            LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
	            LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
	        },
	        calendar: {
	            sameDay: '[Hoje às] LT',
	            nextDay: '[Amanhã às] LT',
	            nextWeek: 'dddd [às] LT',
	            lastDay: '[Ontem às] LT',
	            lastWeek: function lastWeek() {
	                return this.day() === 0 || this.day() === 6 ? '[Último] dddd [às] LT' : // Saturday + Sunday
	                '[Última] dddd [às] LT'; // Monday - Friday
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'em %s',
	            past: '%s atrás',
	            s: 'poucos segundos',
	            m: 'um minuto',
	            mm: '%d minutos',
	            h: 'uma hora',
	            hh: '%d horas',
	            d: 'um dia',
	            dd: '%d dias',
	            M: 'um mês',
	            MM: '%d meses',
	            y: 'um ano',
	            yy: '%d anos'
	        },
	        ordinalParse: /\d{1,2}º/,
	        ordinal: '%dº'
	    });

	    return pt_br;
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : romanian (ro)
	//! author : Vlad Gurdiga : https://github.com/gurdiga
	//! author : Valentin Agachi : https://github.com/avaly

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': 'minute',
	            'hh': 'ore',
	            'dd': 'zile',
	            'MM': 'luni',
	            'yy': 'ani'
	        },
	            separator = ' ';
	        if (number % 100 >= 20 || number >= 100 && number % 100 === 0) {
	            separator = ' de ';
	        }
	        return number + separator + format[key];
	    }

	    var ro = moment.defineLocale('ro', {
	        months: 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
	        monthsShort: 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
	        weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
	        weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY H:mm',
	            LLLL: 'dddd, D MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[azi la] LT',
	            nextDay: '[mâine la] LT',
	            nextWeek: 'dddd [la] LT',
	            lastDay: '[ieri la] LT',
	            lastWeek: '[fosta] dddd [la] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'peste %s',
	            past: '%s în urmă',
	            s: 'câteva secunde',
	            m: 'un minut',
	            mm: relativeTimeWithPlural,
	            h: 'o oră',
	            hh: relativeTimeWithPlural,
	            d: 'o zi',
	            dd: relativeTimeWithPlural,
	            M: 'o lună',
	            MM: relativeTimeWithPlural,
	            y: 'un an',
	            yy: relativeTimeWithPlural
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ro;
	});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : russian (ru)
	//! author : Viktorminator : https://github.com/Viktorminator
	//! Author : Menelion Elensúle : https://github.com/Oire
	//! author : Коренберг Марк : https://github.com/socketpair

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
	            'hh': 'час_часа_часов',
	            'dd': 'день_дня_дней',
	            'MM': 'месяц_месяца_месяцев',
	            'yy': 'год_года_лет'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'минута' : 'минуту';
	        } else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

	    // http://new.gramota.ru/spravka/rules/139-prop : § 103
	    // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
	    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
	    var ru = moment.defineLocale('ru', {
	        months: {
	            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
	            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
	        },
	        monthsShort: {
	            // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
	            format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
	            standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
	        },
	        weekdays: {
	            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
	            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
	            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
	        },
	        weekdaysShort: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	        monthsParse: monthsParse,
	        longMonthsParse: monthsParse,
	        shortMonthsParse: monthsParse,
	        monthsRegex: /^(сентябр[яь]|октябр[яь]|декабр[яь]|феврал[яь]|январ[яь]|апрел[яь]|августа?|ноябр[яь]|сент\.|февр\.|нояб\.|июнь|янв.|июль|дек.|авг.|апр.|марта|мар[.т]|окт.|июн[яь]|июл[яь]|ма[яй])/i,
	        monthsShortRegex: /^(сентябр[яь]|октябр[яь]|декабр[яь]|феврал[яь]|январ[яь]|апрел[яь]|августа?|ноябр[яь]|сент\.|февр\.|нояб\.|июнь|янв.|июль|дек.|авг.|апр.|марта|мар[.т]|окт.|июн[яь]|июл[яь]|ма[яй])/i,
	        monthsStrictRegex: /^(сентябр[яь]|октябр[яь]|декабр[яь]|феврал[яь]|январ[яь]|апрел[яь]|августа?|ноябр[яь]|марта?|июн[яь]|июл[яь]|ма[яй])/i,
	        monthsShortStrictRegex: /^(нояб\.|февр\.|сент\.|июль|янв\.|июн[яь]|мар[.т]|авг\.|апр\.|окт\.|дек\.|ма[яй])/i,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY г.',
	            LLL: 'D MMMM YYYY г., HH:mm',
	            LLLL: 'dddd, D MMMM YYYY г., HH:mm'
	        },
	        calendar: {
	            sameDay: '[Сегодня в] LT',
	            nextDay: '[Завтра в] LT',
	            lastDay: '[Вчера в] LT',
	            nextWeek: function nextWeek(now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                        case 0:
	                            return '[В следующее] dddd [в] LT';
	                        case 1:
	                        case 2:
	                        case 4:
	                            return '[В следующий] dddd [в] LT';
	                        case 3:
	                        case 5:
	                        case 6:
	                            return '[В следующую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            lastWeek: function lastWeek(now) {
	                if (now.week() !== this.week()) {
	                    switch (this.day()) {
	                        case 0:
	                            return '[В прошлое] dddd [в] LT';
	                        case 1:
	                        case 2:
	                        case 4:
	                            return '[В прошлый] dddd [в] LT';
	                        case 3:
	                        case 5:
	                        case 6:
	                            return '[В прошлую] dddd [в] LT';
	                    }
	                } else {
	                    if (this.day() === 2) {
	                        return '[Во] dddd [в] LT';
	                    } else {
	                        return '[В] dddd [в] LT';
	                    }
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'через %s',
	            past: '%s назад',
	            s: 'несколько секунд',
	            m: relativeTimeWithPlural,
	            mm: relativeTimeWithPlural,
	            h: 'час',
	            hh: relativeTimeWithPlural,
	            d: 'день',
	            dd: relativeTimeWithPlural,
	            M: 'месяц',
	            MM: relativeTimeWithPlural,
	            y: 'год',
	            yy: relativeTimeWithPlural
	        },
	        meridiemParse: /ночи|утра|дня|вечера/i,
	        isPM: function isPM(input) {
	            return (/^(дня|вечера)$/.test(input)
	            );
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночи';
	            } else if (hour < 12) {
	                return 'утра';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечера';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го|я)/,
	        ordinal: function ordinal(number, period) {
	            switch (period) {
	                case 'M':
	                case 'd':
	                case 'DDD':
	                    return number + '-й';
	                case 'D':
	                    return number + '-го';
	                case 'w':
	                case 'W':
	                    return number + '-я';
	                default:
	                    return number;
	            }
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ru;
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Northern Sami (se)
	//! authors : Bård Rolstad Henriksen : https://github.com/karamell

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var se = moment.defineLocale('se', {
	        months: 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
	        monthsShort: 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
	        weekdays: 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
	        weekdaysShort: 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
	        weekdaysMin: 's_v_m_g_d_b_L'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'MMMM D. [b.] YYYY',
	            LLL: 'MMMM D. [b.] YYYY [ti.] HH:mm',
	            LLLL: 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
	        },
	        calendar: {
	            sameDay: '[otne ti] LT',
	            nextDay: '[ihttin ti] LT',
	            nextWeek: 'dddd [ti] LT',
	            lastDay: '[ikte ti] LT',
	            lastWeek: '[ovddit] dddd [ti] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s geažes',
	            past: 'maŋit %s',
	            s: 'moadde sekunddat',
	            m: 'okta minuhta',
	            mm: '%d minuhtat',
	            h: 'okta diimmu',
	            hh: '%d diimmut',
	            d: 'okta beaivi',
	            dd: '%d beaivvit',
	            M: 'okta mánnu',
	            MM: '%d mánut',
	            y: 'okta jahki',
	            yy: '%d jagit'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return se;
	});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Sinhalese (si)
	//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    /*jshint -W100*/

	    var si = moment.defineLocale('si', {
	        months: 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
	        monthsShort: 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
	        weekdays: 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
	        weekdaysShort: 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
	        weekdaysMin: 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'a h:mm',
	            LTS: 'a h:mm:ss',
	            L: 'YYYY/MM/DD',
	            LL: 'YYYY MMMM D',
	            LLL: 'YYYY MMMM D, a h:mm',
	            LLLL: 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
	        },
	        calendar: {
	            sameDay: '[අද] LT[ට]',
	            nextDay: '[හෙට] LT[ට]',
	            nextWeek: 'dddd LT[ට]',
	            lastDay: '[ඊයේ] LT[ට]',
	            lastWeek: '[පසුගිය] dddd LT[ට]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%sකින්',
	            past: '%sකට පෙර',
	            s: 'තත්පර කිහිපය',
	            m: 'මිනිත්තුව',
	            mm: 'මිනිත්තු %d',
	            h: 'පැය',
	            hh: 'පැය %d',
	            d: 'දිනය',
	            dd: 'දින %d',
	            M: 'මාසය',
	            MM: 'මාස %d',
	            y: 'වසර',
	            yy: 'වසර %d'
	        },
	        ordinalParse: /\d{1,2} වැනි/,
	        ordinal: function ordinal(number) {
	            return number + ' වැනි';
	        },
	        meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
	        isPM: function isPM(input) {
	            return input === 'ප.ව.' || input === 'පස් වරු';
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'ප.ව.' : 'පස් වරු';
	            } else {
	                return isLower ? 'පෙ.ව.' : 'පෙර වරු';
	            }
	        }
	    });

	    return si;
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : slovak (sk)
	//! author : Martin Minka : https://github.com/k2s
	//! based on work of petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
	        monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
	    function plural(n) {
	        return n > 1 && n < 5;
	    }
	    function translate(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	            case 's':
	                // a few seconds / in a few seconds / a few seconds ago
	                return withoutSuffix || isFuture ? 'pár sekúnd' : 'pár sekundami';
	            case 'm':
	                // a minute / in a minute / a minute ago
	                return withoutSuffix ? 'minúta' : isFuture ? 'minútu' : 'minútou';
	            case 'mm':
	                // 9 minutes / in 9 minutes / 9 minutes ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'minúty' : 'minút');
	                } else {
	                    return result + 'minútami';
	                }
	                break;
	            case 'h':
	                // an hour / in an hour / an hour ago
	                return withoutSuffix ? 'hodina' : isFuture ? 'hodinu' : 'hodinou';
	            case 'hh':
	                // 9 hours / in 9 hours / 9 hours ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'hodiny' : 'hodín');
	                } else {
	                    return result + 'hodinami';
	                }
	                break;
	            case 'd':
	                // a day / in a day / a day ago
	                return withoutSuffix || isFuture ? 'deň' : 'dňom';
	            case 'dd':
	                // 9 days / in 9 days / 9 days ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'dni' : 'dní');
	                } else {
	                    return result + 'dňami';
	                }
	                break;
	            case 'M':
	                // a month / in a month / a month ago
	                return withoutSuffix || isFuture ? 'mesiac' : 'mesiacom';
	            case 'MM':
	                // 9 months / in 9 months / 9 months ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'mesiace' : 'mesiacov');
	                } else {
	                    return result + 'mesiacmi';
	                }
	                break;
	            case 'y':
	                // a year / in a year / a year ago
	                return withoutSuffix || isFuture ? 'rok' : 'rokom';
	            case 'yy':
	                // 9 years / in 9 years / 9 years ago
	                if (withoutSuffix || isFuture) {
	                    return result + (plural(number) ? 'roky' : 'rokov');
	                } else {
	                    return result + 'rokmi';
	                }
	                break;
	        }
	    }

	    var sk = moment.defineLocale('sk', {
	        months: months,
	        monthsShort: monthsShort,
	        weekdays: 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
	        weekdaysShort: 'ne_po_ut_st_št_pi_so'.split('_'),
	        weekdaysMin: 'ne_po_ut_st_št_pi_so'.split('_'),
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[dnes o] LT',
	            nextDay: '[zajtra o] LT',
	            nextWeek: function nextWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[v nedeľu o] LT';
	                    case 1:
	                    case 2:
	                        return '[v] dddd [o] LT';
	                    case 3:
	                        return '[v stredu o] LT';
	                    case 4:
	                        return '[vo štvrtok o] LT';
	                    case 5:
	                        return '[v piatok o] LT';
	                    case 6:
	                        return '[v sobotu o] LT';
	                }
	            },
	            lastDay: '[včera o] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[minulú nedeľu o] LT';
	                    case 1:
	                    case 2:
	                        return '[minulý] dddd [o] LT';
	                    case 3:
	                        return '[minulú stredu o] LT';
	                    case 4:
	                    case 5:
	                        return '[minulý] dddd [o] LT';
	                    case 6:
	                        return '[minulú sobotu o] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'za %s',
	            past: 'pred %s',
	            s: translate,
	            m: translate,
	            mm: translate,
	            h: translate,
	            hh: translate,
	            d: translate,
	            dd: translate,
	            M: translate,
	            MM: translate,
	            y: translate,
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sk;
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : slovenian (sl)
	//! author : Robert Sedovšek : https://github.com/sedovsek

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var result = number + ' ';
	        switch (key) {
	            case 's':
	                return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
	            case 'm':
	                return withoutSuffix ? 'ena minuta' : 'eno minuto';
	            case 'mm':
	                if (number === 1) {
	                    result += withoutSuffix ? 'minuta' : 'minuto';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
	                } else if (number < 5) {
	                    result += withoutSuffix || isFuture ? 'minute' : 'minutami';
	                } else {
	                    result += withoutSuffix || isFuture ? 'minut' : 'minutami';
	                }
	                return result;
	            case 'h':
	                return withoutSuffix ? 'ena ura' : 'eno uro';
	            case 'hh':
	                if (number === 1) {
	                    result += withoutSuffix ? 'ura' : 'uro';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'uri' : 'urama';
	                } else if (number < 5) {
	                    result += withoutSuffix || isFuture ? 'ure' : 'urami';
	                } else {
	                    result += withoutSuffix || isFuture ? 'ur' : 'urami';
	                }
	                return result;
	            case 'd':
	                return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
	            case 'dd':
	                if (number === 1) {
	                    result += withoutSuffix || isFuture ? 'dan' : 'dnem';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
	                } else {
	                    result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
	                }
	                return result;
	            case 'M':
	                return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
	            case 'MM':
	                if (number === 1) {
	                    result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
	                } else if (number < 5) {
	                    result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
	                } else {
	                    result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
	                }
	                return result;
	            case 'y':
	                return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
	            case 'yy':
	                if (number === 1) {
	                    result += withoutSuffix || isFuture ? 'leto' : 'letom';
	                } else if (number === 2) {
	                    result += withoutSuffix || isFuture ? 'leti' : 'letoma';
	                } else if (number < 5) {
	                    result += withoutSuffix || isFuture ? 'leta' : 'leti';
	                } else {
	                    result += withoutSuffix || isFuture ? 'let' : 'leti';
	                }
	                return result;
	        }
	    }

	    var sl = moment.defineLocale('sl', {
	        months: 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
	        weekdaysShort: 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
	        weekdaysMin: 'ne_po_to_sr_če_pe_so'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danes ob] LT',
	            nextDay: '[jutri ob] LT',

	            nextWeek: function nextWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[v] [nedeljo] [ob] LT';
	                    case 3:
	                        return '[v] [sredo] [ob] LT';
	                    case 6:
	                        return '[v] [soboto] [ob] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[v] dddd [ob] LT';
	                }
	            },
	            lastDay: '[včeraj ob] LT',
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[prejšnjo] [nedeljo] [ob] LT';
	                    case 3:
	                        return '[prejšnjo] [sredo] [ob] LT';
	                    case 6:
	                        return '[prejšnjo] [soboto] [ob] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[prejšnji] dddd [ob] LT';
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'čez %s',
	            past: 'pred %s',
	            s: processRelativeTime,
	            m: processRelativeTime,
	            mm: processRelativeTime,
	            h: processRelativeTime,
	            hh: processRelativeTime,
	            d: processRelativeTime,
	            dd: processRelativeTime,
	            M: processRelativeTime,
	            MM: processRelativeTime,
	            y: processRelativeTime,
	            yy: processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sl;
	});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Albanian (sq)
	//! author : Flakërim Ismani : https://github.com/flakerimi
	//! author: Menelion Elensúle: https://github.com/Oire (tests)
	//! author : Oerd Cukalla : https://github.com/oerd (fixes)

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var sq = moment.defineLocale('sq', {
	        months: 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
	        monthsShort: 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
	        weekdays: 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
	        weekdaysShort: 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
	        weekdaysMin: 'D_H_Ma_Më_E_P_Sh'.split('_'),
	        weekdaysParseExact: true,
	        meridiemParse: /PD|MD/,
	        isPM: function isPM(input) {
	            return input.charAt(0) === 'M';
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            return hours < 12 ? 'PD' : 'MD';
	        },
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Sot në] LT',
	            nextDay: '[Nesër në] LT',
	            nextWeek: 'dddd [në] LT',
	            lastDay: '[Dje në] LT',
	            lastWeek: 'dddd [e kaluar në] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'në %s',
	            past: '%s më parë',
	            s: 'disa sekonda',
	            m: 'një minutë',
	            mm: '%d minuta',
	            h: 'një orë',
	            hh: '%d orë',
	            d: 'një ditë',
	            dd: '%d ditë',
	            M: 'një muaj',
	            MM: '%d muaj',
	            y: 'një vit',
	            yy: '%d vite'
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sq;
	});

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Serbian-latin (sr)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var translator = {
	        words: { //Different grammatical cases
	            m: ['jedan minut', 'jedne minute'],
	            mm: ['minut', 'minute', 'minuta'],
	            h: ['jedan sat', 'jednog sata'],
	            hh: ['sat', 'sata', 'sati'],
	            dd: ['dan', 'dana', 'dana'],
	            MM: ['mesec', 'meseca', 'meseci'],
	            yy: ['godina', 'godine', 'godina']
	        },
	        correctGrammaticalCase: function correctGrammaticalCase(number, wordKey) {
	            return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
	        },
	        translate: function translate(number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var sr = moment.defineLocale('sr', {
	        months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	        monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
	        weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
	        weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[danas u] LT',
	            nextDay: '[sutra u] LT',
	            nextWeek: function nextWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[u] [nedelju] [u] LT';
	                    case 3:
	                        return '[u] [sredu] [u] LT';
	                    case 6:
	                        return '[u] [subotu] [u] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[u] dddd [u] LT';
	                }
	            },
	            lastDay: '[juče u] LT',
	            lastWeek: function lastWeek() {
	                var lastWeekDays = ['[prošle] [nedelje] [u] LT', '[prošlog] [ponedeljka] [u] LT', '[prošlog] [utorka] [u] LT', '[prošle] [srede] [u] LT', '[prošlog] [četvrtka] [u] LT', '[prošlog] [petka] [u] LT', '[prošle] [subote] [u] LT'];
	                return lastWeekDays[this.day()];
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'za %s',
	            past: 'pre %s',
	            s: 'nekoliko sekundi',
	            m: translator.translate,
	            mm: translator.translate,
	            h: translator.translate,
	            hh: translator.translate,
	            d: 'dan',
	            dd: translator.translate,
	            M: 'mesec',
	            MM: translator.translate,
	            y: 'godinu',
	            yy: translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sr;
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Serbian-cyrillic (sr-cyrl)
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var translator = {
	        words: { //Different grammatical cases
	            m: ['један минут', 'једне минуте'],
	            mm: ['минут', 'минуте', 'минута'],
	            h: ['један сат', 'једног сата'],
	            hh: ['сат', 'сата', 'сати'],
	            dd: ['дан', 'дана', 'дана'],
	            MM: ['месец', 'месеца', 'месеци'],
	            yy: ['година', 'године', 'година']
	        },
	        correctGrammaticalCase: function correctGrammaticalCase(number, wordKey) {
	            return number === 1 ? wordKey[0] : number >= 2 && number <= 4 ? wordKey[1] : wordKey[2];
	        },
	        translate: function translate(number, withoutSuffix, key) {
	            var wordKey = translator.words[key];
	            if (key.length === 1) {
	                return withoutSuffix ? wordKey[0] : wordKey[1];
	            } else {
	                return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	            }
	        }
	    };

	    var sr_cyrl = moment.defineLocale('sr-cyrl', {
	        months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
	        monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
	        weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
	        weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H:mm',
	            LTS: 'H:mm:ss',
	            L: 'DD. MM. YYYY',
	            LL: 'D. MMMM YYYY',
	            LLL: 'D. MMMM YYYY H:mm',
	            LLLL: 'dddd, D. MMMM YYYY H:mm'
	        },
	        calendar: {
	            sameDay: '[данас у] LT',
	            nextDay: '[сутра у] LT',
	            nextWeek: function nextWeek() {
	                switch (this.day()) {
	                    case 0:
	                        return '[у] [недељу] [у] LT';
	                    case 3:
	                        return '[у] [среду] [у] LT';
	                    case 6:
	                        return '[у] [суботу] [у] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                    case 5:
	                        return '[у] dddd [у] LT';
	                }
	            },
	            lastDay: '[јуче у] LT',
	            lastWeek: function lastWeek() {
	                var lastWeekDays = ['[прошле] [недеље] [у] LT', '[прошлог] [понедељка] [у] LT', '[прошлог] [уторка] [у] LT', '[прошле] [среде] [у] LT', '[прошлог] [четвртка] [у] LT', '[прошлог] [петка] [у] LT', '[прошле] [суботе] [у] LT'];
	                return lastWeekDays[this.day()];
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'за %s',
	            past: 'пре %s',
	            s: 'неколико секунди',
	            m: translator.translate,
	            mm: translator.translate,
	            h: translator.translate,
	            hh: translator.translate,
	            d: 'дан',
	            dd: translator.translate,
	            M: 'месец',
	            MM: translator.translate,
	            y: 'годину',
	            yy: translator.translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sr_cyrl;
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : siSwati (ss)
	//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var ss = moment.defineLocale('ss', {
	        months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
	        monthsShort: 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
	        weekdays: 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
	        weekdaysShort: 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
	        weekdaysMin: 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'h:mm A',
	            LTS: 'h:mm:ss A',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY h:mm A',
	            LLLL: 'dddd, D MMMM YYYY h:mm A'
	        },
	        calendar: {
	            sameDay: '[Namuhla nga] LT',
	            nextDay: '[Kusasa nga] LT',
	            nextWeek: 'dddd [nga] LT',
	            lastDay: '[Itolo nga] LT',
	            lastWeek: 'dddd [leliphelile] [nga] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'nga %s',
	            past: 'wenteka nga %s',
	            s: 'emizuzwana lomcane',
	            m: 'umzuzu',
	            mm: '%d emizuzu',
	            h: 'lihora',
	            hh: '%d emahora',
	            d: 'lilanga',
	            dd: '%d emalanga',
	            M: 'inyanga',
	            MM: '%d tinyanga',
	            y: 'umnyaka',
	            yy: '%d iminyaka'
	        },
	        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours < 11) {
	                return 'ekuseni';
	            } else if (hours < 15) {
	                return 'emini';
	            } else if (hours < 19) {
	                return 'entsambama';
	            } else {
	                return 'ebusuku';
	            }
	        },
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'ekuseni') {
	                return hour;
	            } else if (meridiem === 'emini') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
	                if (hour === 0) {
	                    return 0;
	                }
	                return hour + 12;
	            }
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal: '%d',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return ss;
	});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : swedish (sv)
	//! author : Jens Alm : https://github.com/ulmus

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var sv = moment.defineLocale('sv', {
	        months: 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
	        monthsShort: 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	        weekdays: 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
	        weekdaysShort: 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
	        weekdaysMin: 'sö_må_ti_on_to_fr_lö'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'YYYY-MM-DD',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY [kl.] HH:mm',
	            LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
	            lll: 'D MMM YYYY HH:mm',
	            llll: 'ddd D MMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Idag] LT',
	            nextDay: '[Imorgon] LT',
	            lastDay: '[Igår] LT',
	            nextWeek: '[På] dddd LT',
	            lastWeek: '[I] dddd[s] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'om %s',
	            past: 'för %s sedan',
	            s: 'några sekunder',
	            m: 'en minut',
	            mm: '%d minuter',
	            h: 'en timme',
	            hh: '%d timmar',
	            d: 'en dag',
	            dd: '%d dagar',
	            M: 'en månad',
	            MM: '%d månader',
	            y: 'ett år',
	            yy: '%d år'
	        },
	        ordinalParse: /\d{1,2}(e|a)/,
	        ordinal: function ordinal(number) {
	            var b = number % 10,
	                output = ~ ~(number % 100 / 10) === 1 ? 'e' : b === 1 ? 'a' : b === 2 ? 'a' : b === 3 ? 'e' : 'e';
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return sv;
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : swahili (sw)
	//! author : Fahad Kassim : https://github.com/fadsel

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var sw = moment.defineLocale('sw', {
	        months: 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
	        monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
	        weekdays: 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
	        weekdaysShort: 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
	        weekdaysMin: 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[leo saa] LT',
	            nextDay: '[kesho saa] LT',
	            nextWeek: '[wiki ijayo] dddd [saat] LT',
	            lastDay: '[jana] LT',
	            lastWeek: '[wiki iliyopita] dddd [saat] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s baadaye',
	            past: 'tokea %s',
	            s: 'hivi punde',
	            m: 'dakika moja',
	            mm: 'dakika %d',
	            h: 'saa limoja',
	            hh: 'masaa %d',
	            d: 'siku moja',
	            dd: 'masiku %d',
	            M: 'mwezi mmoja',
	            MM: 'miezi %d',
	            y: 'mwaka mmoja',
	            yy: 'miaka %d'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return sw;
	});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : tamil (ta)
	//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var symbolMap = {
	        '1': '௧',
	        '2': '௨',
	        '3': '௩',
	        '4': '௪',
	        '5': '௫',
	        '6': '௬',
	        '7': '௭',
	        '8': '௮',
	        '9': '௯',
	        '0': '௦'
	    },
	        numberMap = {
	        '௧': '1',
	        '௨': '2',
	        '௩': '3',
	        '௪': '4',
	        '௫': '5',
	        '௬': '6',
	        '௭': '7',
	        '௮': '8',
	        '௯': '9',
	        '௦': '0'
	    };

	    var ta = moment.defineLocale('ta', {
	        months: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        monthsShort: 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	        weekdays: 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
	        weekdaysShort: 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
	        weekdaysMin: 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY, HH:mm',
	            LLLL: 'dddd, D MMMM YYYY, HH:mm'
	        },
	        calendar: {
	            sameDay: '[இன்று] LT',
	            nextDay: '[நாளை] LT',
	            nextWeek: 'dddd, LT',
	            lastDay: '[நேற்று] LT',
	            lastWeek: '[கடந்த வாரம்] dddd, LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s இல்',
	            past: '%s முன்',
	            s: 'ஒரு சில விநாடிகள்',
	            m: 'ஒரு நிமிடம்',
	            mm: '%d நிமிடங்கள்',
	            h: 'ஒரு மணி நேரம்',
	            hh: '%d மணி நேரம்',
	            d: 'ஒரு நாள்',
	            dd: '%d நாட்கள்',
	            M: 'ஒரு மாதம்',
	            MM: '%d மாதங்கள்',
	            y: 'ஒரு வருடம்',
	            yy: '%d ஆண்டுகள்'
	        },
	        ordinalParse: /\d{1,2}வது/,
	        ordinal: function ordinal(number) {
	            return number + 'வது';
	        },
	        preparse: function preparse(string) {
	            return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
	                return numberMap[match];
	            });
	        },
	        postformat: function postformat(string) {
	            return string.replace(/\d/g, function (match) {
	                return symbolMap[match];
	            });
	        },
	        // refer http://ta.wikipedia.org/s/1er1
	        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 2) {
	                return ' யாமம்';
	            } else if (hour < 6) {
	                return ' வைகறை'; // வைகறை
	            } else if (hour < 10) {
	                    return ' காலை'; // காலை
	                } else if (hour < 14) {
	                        return ' நண்பகல்'; // நண்பகல்
	                    } else if (hour < 18) {
	                            return ' எற்பாடு'; // எற்பாடு
	                        } else if (hour < 22) {
	                                return ' மாலை'; // மாலை
	                            } else {
	                                    return ' யாமம்';
	                                }
	        },
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'யாமம்') {
	                return hour < 2 ? hour : hour + 12;
	            } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
	                return hour;
	            } else if (meridiem === 'நண்பகல்') {
	                return hour >= 10 ? hour : hour + 12;
	            } else {
	                return hour + 12;
	            }
	        },
	        week: {
	            dow: 0, // Sunday is the first day of the week.
	            doy: 6 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return ta;
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : telugu (te)
	//! author : Krishna Chaitanya Thota : https://github.com/kcthota

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var te = moment.defineLocale('te', {
	        months: 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
	        monthsShort: 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
	        weekdaysShort: 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
	        weekdaysMin: 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
	        longDateFormat: {
	            LT: 'A h:mm',
	            LTS: 'A h:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY, A h:mm',
	            LLLL: 'dddd, D MMMM YYYY, A h:mm'
	        },
	        calendar: {
	            sameDay: '[నేడు] LT',
	            nextDay: '[రేపు] LT',
	            nextWeek: 'dddd, LT',
	            lastDay: '[నిన్న] LT',
	            lastWeek: '[గత] dddd, LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s లో',
	            past: '%s క్రితం',
	            s: 'కొన్ని క్షణాలు',
	            m: 'ఒక నిమిషం',
	            mm: '%d నిమిషాలు',
	            h: 'ఒక గంట',
	            hh: '%d గంటలు',
	            d: 'ఒక రోజు',
	            dd: '%d రోజులు',
	            M: 'ఒక నెల',
	            MM: '%d నెలలు',
	            y: 'ఒక సంవత్సరం',
	            yy: '%d సంవత్సరాలు'
	        },
	        ordinalParse: /\d{1,2}వ/,
	        ordinal: '%dవ',
	        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === 'రాత్రి') {
	                return hour < 4 ? hour : hour + 12;
	            } else if (meridiem === 'ఉదయం') {
	                return hour;
	            } else if (meridiem === 'మధ్యాహ్నం') {
	                return hour >= 10 ? hour : hour + 12;
	            } else if (meridiem === 'సాయంత్రం') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'రాత్రి';
	            } else if (hour < 10) {
	                return 'ఉదయం';
	            } else if (hour < 17) {
	                return 'మధ్యాహ్నం';
	            } else if (hour < 20) {
	                return 'సాయంత్రం';
	            } else {
	                return 'రాత్రి';
	            }
	        },
	        week: {
	            dow: 0, // Sunday is the first day of the week.
	            doy: 6 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return te;
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : thai (th)
	//! author : Kridsada Thanabulpong : https://github.com/sirn

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var th = moment.defineLocale('th', {
	        months: 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
	        monthsShort: 'มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
	        weekdaysShort: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
	        weekdaysMin: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'H นาฬิกา m นาที',
	            LTS: 'H นาฬิกา m นาที s วินาที',
	            L: 'YYYY/MM/DD',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY เวลา H นาฬิกา m นาที',
	            LLLL: 'วันddddที่ D MMMM YYYY เวลา H นาฬิกา m นาที'
	        },
	        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
	        isPM: function isPM(input) {
	            return input === 'หลังเที่ยง';
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 12) {
	                return 'ก่อนเที่ยง';
	            } else {
	                return 'หลังเที่ยง';
	            }
	        },
	        calendar: {
	            sameDay: '[วันนี้ เวลา] LT',
	            nextDay: '[พรุ่งนี้ เวลา] LT',
	            nextWeek: 'dddd[หน้า เวลา] LT',
	            lastDay: '[เมื่อวานนี้ เวลา] LT',
	            lastWeek: '[วัน]dddd[ที่แล้ว เวลา] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'อีก %s',
	            past: '%sที่แล้ว',
	            s: 'ไม่กี่วินาที',
	            m: '1 นาที',
	            mm: '%d นาที',
	            h: '1 ชั่วโมง',
	            hh: '%d ชั่วโมง',
	            d: '1 วัน',
	            dd: '%d วัน',
	            M: '1 เดือน',
	            MM: '%d เดือน',
	            y: '1 ปี',
	            yy: '%d ปี'
	        }
	    });

	    return th;
	});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Tagalog/Filipino (tl-ph)
	//! author : Dan Hagman

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var tl_ph = moment.defineLocale('tl-ph', {
	        months: 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
	        monthsShort: 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
	        weekdays: 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
	        weekdaysShort: 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
	        weekdaysMin: 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'MM/D/YYYY',
	            LL: 'MMMM D, YYYY',
	            LLL: 'MMMM D, YYYY HH:mm',
	            LLLL: 'dddd, MMMM DD, YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Ngayon sa] LT',
	            nextDay: '[Bukas sa] LT',
	            nextWeek: 'dddd [sa] LT',
	            lastDay: '[Kahapon sa] LT',
	            lastWeek: 'dddd [huling linggo] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'sa loob ng %s',
	            past: '%s ang nakalipas',
	            s: 'ilang segundo',
	            m: 'isang minuto',
	            mm: '%d minuto',
	            h: 'isang oras',
	            hh: '%d oras',
	            d: 'isang araw',
	            dd: '%d araw',
	            M: 'isang buwan',
	            MM: '%d buwan',
	            y: 'isang taon',
	            yy: '%d taon'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal: function ordinal(number) {
	            return number;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return tl_ph;
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Klingon (tlh)
	//! author : Dominika Kruk : https://github.com/amaranthrose

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

	    function translateFuture(output) {
	        var time = output;
	        time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'leS' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'waQ' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'nem' : time + ' pIq';
	        return time;
	    }

	    function translatePast(output) {
	        var time = output;
	        time = output.indexOf('jaj') !== -1 ? time.slice(0, -3) + 'Hu’' : output.indexOf('jar') !== -1 ? time.slice(0, -3) + 'wen' : output.indexOf('DIS') !== -1 ? time.slice(0, -3) + 'ben' : time + ' ret';
	        return time;
	    }

	    function translate(number, withoutSuffix, string, isFuture) {
	        var numberNoun = numberAsNoun(number);
	        switch (string) {
	            case 'mm':
	                return numberNoun + ' tup';
	            case 'hh':
	                return numberNoun + ' rep';
	            case 'dd':
	                return numberNoun + ' jaj';
	            case 'MM':
	                return numberNoun + ' jar';
	            case 'yy':
	                return numberNoun + ' DIS';
	        }
	    }

	    function numberAsNoun(number) {
	        var hundred = Math.floor(number % 1000 / 100),
	            ten = Math.floor(number % 100 / 10),
	            one = number % 10,
	            word = '';
	        if (hundred > 0) {
	            word += numbersNouns[hundred] + 'vatlh';
	        }
	        if (ten > 0) {
	            word += (word !== '' ? ' ' : '') + numbersNouns[ten] + 'maH';
	        }
	        if (one > 0) {
	            word += (word !== '' ? ' ' : '') + numbersNouns[one];
	        }
	        return word === '' ? 'pagh' : word;
	    }

	    var tlh = moment.defineLocale('tlh', {
	        months: 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
	        monthsShort: 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysShort: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        weekdaysMin: 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[DaHjaj] LT',
	            nextDay: '[wa’leS] LT',
	            nextWeek: 'LLL',
	            lastDay: '[wa’Hu’] LT',
	            lastWeek: 'LLL',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: translateFuture,
	            past: translatePast,
	            s: 'puS lup',
	            m: 'wa’ tup',
	            mm: translate,
	            h: 'wa’ rep',
	            hh: translate,
	            d: 'wa’ jaj',
	            dd: translate,
	            M: 'wa’ jar',
	            MM: translate,
	            y: 'wa’ DIS',
	            yy: translate
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return tlh;
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : turkish (tr)
	//! authors : Erhan Gundogan : https://github.com/erhangundogan,
	//!           Burak Yiğit Kaya: https://github.com/BYK

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var suffixes = {
	        1: '\'inci',
	        5: '\'inci',
	        8: '\'inci',
	        70: '\'inci',
	        80: '\'inci',
	        2: '\'nci',
	        7: '\'nci',
	        20: '\'nci',
	        50: '\'nci',
	        3: '\'üncü',
	        4: '\'üncü',
	        100: '\'üncü',
	        6: '\'ncı',
	        9: '\'uncu',
	        10: '\'uncu',
	        30: '\'uncu',
	        60: '\'ıncı',
	        90: '\'ıncı'
	    };

	    var tr = moment.defineLocale('tr', {
	        months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
	        monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
	        weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
	        weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
	        weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[bugün saat] LT',
	            nextDay: '[yarın saat] LT',
	            nextWeek: '[haftaya] dddd [saat] LT',
	            lastDay: '[dün] LT',
	            lastWeek: '[geçen hafta] dddd [saat] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s sonra',
	            past: '%s önce',
	            s: 'birkaç saniye',
	            m: 'bir dakika',
	            mm: '%d dakika',
	            h: 'bir saat',
	            hh: '%d saat',
	            d: 'bir gün',
	            dd: '%d gün',
	            M: 'bir ay',
	            MM: '%d ay',
	            y: 'bir yıl',
	            yy: '%d yıl'
	        },
	        ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
	        ordinal: function ordinal(number) {
	            if (number === 0) {
	                // special case for zero
	                return number + '\'ıncı';
	            }
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tr;
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : talossan (tzl)
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v with the help of Iustì Canun

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    // After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
	    // This is currently too difficult (maybe even impossible) to add.

	    var tzl = moment.defineLocale('tzl', {
	        months: 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
	        monthsShort: 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
	        weekdays: 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
	        weekdaysShort: 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
	        weekdaysMin: 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
	        longDateFormat: {
	            LT: 'HH.mm',
	            LTS: 'HH.mm.ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D. MMMM [dallas] YYYY',
	            LLL: 'D. MMMM [dallas] YYYY HH.mm',
	            LLLL: 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
	        },
	        meridiemParse: /d\'o|d\'a/i,
	        isPM: function isPM(input) {
	            return 'd\'o' === input.toLowerCase();
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours > 11) {
	                return isLower ? 'd\'o' : 'D\'O';
	            } else {
	                return isLower ? 'd\'a' : 'D\'A';
	            }
	        },
	        calendar: {
	            sameDay: '[oxhi à] LT',
	            nextDay: '[demà à] LT',
	            nextWeek: 'dddd [à] LT',
	            lastDay: '[ieiri à] LT',
	            lastWeek: '[sür el] dddd [lasteu à] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'osprei %s',
	            past: 'ja%s',
	            s: processRelativeTime,
	            m: processRelativeTime,
	            mm: processRelativeTime,
	            h: processRelativeTime,
	            hh: processRelativeTime,
	            d: processRelativeTime,
	            dd: processRelativeTime,
	            M: processRelativeTime,
	            MM: processRelativeTime,
	            y: processRelativeTime,
	            yy: processRelativeTime
	        },
	        ordinalParse: /\d{1,2}\./,
	        ordinal: '%d.',
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    function processRelativeTime(number, withoutSuffix, key, isFuture) {
	        var format = {
	            's': ['viensas secunds', '\'iensas secunds'],
	            'm': ['\'n míut', '\'iens míut'],
	            'mm': [number + ' míuts', '' + number + ' míuts'],
	            'h': ['\'n þora', '\'iensa þora'],
	            'hh': [number + ' þoras', '' + number + ' þoras'],
	            'd': ['\'n ziua', '\'iensa ziua'],
	            'dd': [number + ' ziuas', '' + number + ' ziuas'],
	            'M': ['\'n mes', '\'iens mes'],
	            'MM': [number + ' mesen', '' + number + ' mesen'],
	            'y': ['\'n ar', '\'iens ar'],
	            'yy': [number + ' ars', '' + number + ' ars']
	        };
	        return isFuture ? format[key][0] : withoutSuffix ? format[key][0] : format[key][1];
	    }

	    return tzl;
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt (tzm)
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var tzm = moment.defineLocale('tzm', {
	        months: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        monthsShort: 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	        weekdays: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysShort: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        weekdaysMin: 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
	            nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
	            nextWeek: 'dddd [ⴴ] LT',
	            lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
	            lastWeek: 'dddd [ⴴ] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
	            past: 'ⵢⴰⵏ %s',
	            s: 'ⵉⵎⵉⴽ',
	            m: 'ⵎⵉⵏⵓⴺ',
	            mm: '%d ⵎⵉⵏⵓⴺ',
	            h: 'ⵙⴰⵄⴰ',
	            hh: '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
	            d: 'ⴰⵙⵙ',
	            dd: '%d oⵙⵙⴰⵏ',
	            M: 'ⴰⵢoⵓⵔ',
	            MM: '%d ⵉⵢⵢⵉⵔⵏ',
	            y: 'ⴰⵙⴳⴰⵙ',
	            yy: '%d ⵉⵙⴳⴰⵙⵏ'
	        },
	        week: {
	            dow: 6, // Saturday is the first day of the week.
	            doy: 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tzm;
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : Morocco Central Atlas Tamaziɣt in Latin (tzm-latn)
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var tzm_latn = moment.defineLocale('tzm-latn', {
	        months: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        monthsShort: 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	        weekdays: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysShort: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        weekdaysMin: 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[asdkh g] LT',
	            nextDay: '[aska g] LT',
	            nextWeek: 'dddd [g] LT',
	            lastDay: '[assant g] LT',
	            lastWeek: 'dddd [g] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'dadkh s yan %s',
	            past: 'yan %s',
	            s: 'imik',
	            m: 'minuḍ',
	            mm: '%d minuḍ',
	            h: 'saɛa',
	            hh: '%d tassaɛin',
	            d: 'ass',
	            dd: '%d ossan',
	            M: 'ayowr',
	            MM: '%d iyyirn',
	            y: 'asgas',
	            yy: '%d isgasn'
	        },
	        week: {
	            dow: 6, // Saturday is the first day of the week.
	            doy: 12 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return tzm_latn;
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : ukrainian (uk)
	//! author : zemlanin : https://github.com/zemlanin
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    function plural(word, num) {
	        var forms = word.split('_');
	        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
	    }
	    function relativeTimeWithPlural(number, withoutSuffix, key) {
	        var format = {
	            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
	            'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
	            'dd': 'день_дні_днів',
	            'MM': 'місяць_місяці_місяців',
	            'yy': 'рік_роки_років'
	        };
	        if (key === 'm') {
	            return withoutSuffix ? 'хвилина' : 'хвилину';
	        } else if (key === 'h') {
	            return withoutSuffix ? 'година' : 'годину';
	        } else {
	            return number + ' ' + plural(format[key], +number);
	        }
	    }
	    function weekdaysCaseReplace(m, format) {
	        var weekdays = {
	            'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
	            'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
	            'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
	        },
	            nounCase = /(\[[ВвУу]\]) ?dddd/.test(format) ? 'accusative' : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(format) ? 'genitive' : 'nominative';
	        return weekdays[nounCase][m.day()];
	    }
	    function processHoursFunction(str) {
	        return function () {
	            return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
	        };
	    }

	    var uk = moment.defineLocale('uk', {
	        months: {
	            'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
	            'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
	        },
	        monthsShort: 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
	        weekdays: weekdaysCaseReplace,
	        weekdaysShort: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD.MM.YYYY',
	            LL: 'D MMMM YYYY р.',
	            LLL: 'D MMMM YYYY р., HH:mm',
	            LLLL: 'dddd, D MMMM YYYY р., HH:mm'
	        },
	        calendar: {
	            sameDay: processHoursFunction('[Сьогодні '),
	            nextDay: processHoursFunction('[Завтра '),
	            lastDay: processHoursFunction('[Вчора '),
	            nextWeek: processHoursFunction('[У] dddd ['),
	            lastWeek: function lastWeek() {
	                switch (this.day()) {
	                    case 0:
	                    case 3:
	                    case 5:
	                    case 6:
	                        return processHoursFunction('[Минулої] dddd [').call(this);
	                    case 1:
	                    case 2:
	                    case 4:
	                        return processHoursFunction('[Минулого] dddd [').call(this);
	                }
	            },
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'за %s',
	            past: '%s тому',
	            s: 'декілька секунд',
	            m: relativeTimeWithPlural,
	            mm: relativeTimeWithPlural,
	            h: 'годину',
	            hh: relativeTimeWithPlural,
	            d: 'день',
	            dd: relativeTimeWithPlural,
	            M: 'місяць',
	            MM: relativeTimeWithPlural,
	            y: 'рік',
	            yy: relativeTimeWithPlural
	        },
	        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
	        meridiemParse: /ночі|ранку|дня|вечора/,
	        isPM: function isPM(input) {
	            return (/^(дня|вечора)$/.test(input)
	            );
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            if (hour < 4) {
	                return 'ночі';
	            } else if (hour < 12) {
	                return 'ранку';
	            } else if (hour < 17) {
	                return 'дня';
	            } else {
	                return 'вечора';
	            }
	        },
	        ordinalParse: /\d{1,2}-(й|го)/,
	        ordinal: function ordinal(number, period) {
	            switch (period) {
	                case 'M':
	                case 'd':
	                case 'DDD':
	                case 'w':
	                case 'W':
	                    return number + '-й';
	                case 'D':
	                    return number + '-го';
	                default:
	                    return number;
	            }
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 1st is the first week of the year.
	        }
	    });

	    return uk;
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : uzbek (uz)
	//! author : Sardor Muminov : https://github.com/muminoff

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var uz = moment.defineLocale('uz', {
	        months: 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
	        monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
	        weekdays: 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
	        weekdaysShort: 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
	        weekdaysMin: 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'D MMMM YYYY, dddd HH:mm'
	        },
	        calendar: {
	            sameDay: '[Бугун соат] LT [да]',
	            nextDay: '[Эртага] LT [да]',
	            nextWeek: 'dddd [куни соат] LT [да]',
	            lastDay: '[Кеча соат] LT [да]',
	            lastWeek: '[Утган] dddd [куни соат] LT [да]',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'Якин %s ичида',
	            past: 'Бир неча %s олдин',
	            s: 'фурсат',
	            m: 'бир дакика',
	            mm: '%d дакика',
	            h: 'бир соат',
	            hh: '%d соат',
	            d: 'бир кун',
	            dd: '%d кун',
	            M: 'бир ой',
	            MM: '%d ой',
	            y: 'бир йил',
	            yy: '%d йил'
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 7 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return uz;
	});

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : vietnamese (vi)
	//! author : Bang Nguyen : https://github.com/bangnk

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var vi = moment.defineLocale('vi', {
	        months: 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
	        monthsShort: 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
	        weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	        weekdaysParseExact: true,
	        meridiemParse: /sa|ch/i,
	        isPM: function isPM(input) {
	            return (/^ch$/i.test(input)
	            );
	        },
	        meridiem: function meridiem(hours, minutes, isLower) {
	            if (hours < 12) {
	                return isLower ? 'sa' : 'SA';
	            } else {
	                return isLower ? 'ch' : 'CH';
	            }
	        },
	        longDateFormat: {
	            LT: 'HH:mm',
	            LTS: 'HH:mm:ss',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM [năm] YYYY',
	            LLL: 'D MMMM [năm] YYYY HH:mm',
	            LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
	            l: 'DD/M/YYYY',
	            ll: 'D MMM YYYY',
	            lll: 'D MMM YYYY HH:mm',
	            llll: 'ddd, D MMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[Hôm nay lúc] LT',
	            nextDay: '[Ngày mai lúc] LT',
	            nextWeek: 'dddd [tuần tới lúc] LT',
	            lastDay: '[Hôm qua lúc] LT',
	            lastWeek: 'dddd [tuần rồi lúc] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: '%s tới',
	            past: '%s trước',
	            s: 'vài giây',
	            m: 'một phút',
	            mm: '%d phút',
	            h: 'một giờ',
	            hh: '%d giờ',
	            d: 'một ngày',
	            dd: '%d ngày',
	            M: 'một tháng',
	            MM: '%d tháng',
	            y: 'một năm',
	            yy: '%d năm'
	        },
	        ordinalParse: /\d{1,2}/,
	        ordinal: function ordinal(number) {
	            return number;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return vi;
	});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : pseudo (x-pseudo)
	//! author : Andrew Hood : https://github.com/andrewhood125

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var x_pseudo = moment.defineLocale('x-pseudo', {
	        months: 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
	        monthsShort: 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
	        monthsParseExact: true,
	        weekdays: 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
	        weekdaysShort: 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
	        weekdaysMin: 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
	        weekdaysParseExact: true,
	        longDateFormat: {
	            LT: 'HH:mm',
	            L: 'DD/MM/YYYY',
	            LL: 'D MMMM YYYY',
	            LLL: 'D MMMM YYYY HH:mm',
	            LLLL: 'dddd, D MMMM YYYY HH:mm'
	        },
	        calendar: {
	            sameDay: '[T~ódá~ý át] LT',
	            nextDay: '[T~ómó~rró~w át] LT',
	            nextWeek: 'dddd [át] LT',
	            lastDay: '[Ý~ést~érdá~ý át] LT',
	            lastWeek: '[L~ást] dddd [át] LT',
	            sameElse: 'L'
	        },
	        relativeTime: {
	            future: 'í~ñ %s',
	            past: '%s á~gó',
	            s: 'á ~féw ~sécó~ñds',
	            m: 'á ~míñ~úté',
	            mm: '%d m~íñú~tés',
	            h: 'á~ñ hó~úr',
	            hh: '%d h~óúrs',
	            d: 'á ~dáý',
	            dd: '%d d~áýs',
	            M: 'á ~móñ~th',
	            MM: '%d m~óñt~hs',
	            y: 'á ~ýéár',
	            yy: '%d ý~éárs'
	        },
	        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal: function ordinal(number) {
	            var b = number % 10,
	                output = ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	            return number + output;
	        },
	        week: {
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return x_pseudo;
	});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : chinese (zh-cn)
	//! author : suupic : https://github.com/suupic
	//! author : Zeno Zeng : https://github.com/zenozeng

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var zh_cn = moment.defineLocale('zh-cn', {
	        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat: {
	            LT: 'Ah点mm分',
	            LTS: 'Ah点m分s秒',
	            L: 'YYYY-MM-DD',
	            LL: 'YYYY年MMMD日',
	            LLL: 'YYYY年MMMD日Ah点mm分',
	            LLLL: 'YYYY年MMMD日ddddAh点mm分',
	            l: 'YYYY-MM-DD',
	            ll: 'YYYY年MMMD日',
	            lll: 'YYYY年MMMD日Ah点mm分',
	            llll: 'YYYY年MMMD日ddddAh点mm分'
	        },
	        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            } else {
	                // '中午'
	                return hour >= 11 ? hour : hour + 12;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 600) {
	                return '凌晨';
	            } else if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar: {
	            sameDay: function sameDay() {
	                return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
	            },
	            nextDay: function nextDay() {
	                return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
	            },
	            lastDay: function lastDay() {
	                return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
	            },
	            nextWeek: function nextWeek() {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            lastWeek: function lastWeek() {
	                var startOfWeek, prefix;
	                startOfWeek = moment().startOf('week');
	                prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
	                return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	            },
	            sameElse: 'LL'
	        },
	        ordinalParse: /\d{1,2}(日|月|周)/,
	        ordinal: function ordinal(number, period) {
	            switch (period) {
	                case 'd':
	                case 'D':
	                case 'DDD':
	                    return number + '日';
	                case 'M':
	                    return number + '月';
	                case 'w':
	                case 'W':
	                    return number + '周';
	                default:
	                    return number;
	            }
	        },
	        relativeTime: {
	            future: '%s内',
	            past: '%s前',
	            s: '几秒',
	            m: '1 分钟',
	            mm: '%d 分钟',
	            h: '1 小时',
	            hh: '%d 小时',
	            d: '1 天',
	            dd: '%d 天',
	            M: '1 个月',
	            MM: '%d 个月',
	            y: '1 年',
	            yy: '%d 年'
	        },
	        week: {
	            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	            dow: 1, // Monday is the first day of the week.
	            doy: 4 // The week that contains Jan 4th is the first week of the year.
	        }
	    });

	    return zh_cn;
	});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	//! moment.js locale configuration
	//! locale : traditional chinese (zh-tw)
	//! author : Ben : https://github.com/ben-lin

	;(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' && "function" === 'function' ? factory(__webpack_require__(58)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.moment);
	})(undefined, function (moment) {
	    'use strict';

	    var zh_tw = moment.defineLocale('zh-tw', {
	        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	        weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
	        longDateFormat: {
	            LT: 'Ah點mm分',
	            LTS: 'Ah點m分s秒',
	            L: 'YYYY年MMMD日',
	            LL: 'YYYY年MMMD日',
	            LLL: 'YYYY年MMMD日Ah點mm分',
	            LLLL: 'YYYY年MMMD日ddddAh點mm分',
	            l: 'YYYY年MMMD日',
	            ll: 'YYYY年MMMD日',
	            lll: 'YYYY年MMMD日Ah點mm分',
	            llll: 'YYYY年MMMD日ddddAh點mm分'
	        },
	        meridiemParse: /早上|上午|中午|下午|晚上/,
	        meridiemHour: function meridiemHour(hour, meridiem) {
	            if (hour === 12) {
	                hour = 0;
	            }
	            if (meridiem === '早上' || meridiem === '上午') {
	                return hour;
	            } else if (meridiem === '中午') {
	                return hour >= 11 ? hour : hour + 12;
	            } else if (meridiem === '下午' || meridiem === '晚上') {
	                return hour + 12;
	            }
	        },
	        meridiem: function meridiem(hour, minute, isLower) {
	            var hm = hour * 100 + minute;
	            if (hm < 900) {
	                return '早上';
	            } else if (hm < 1130) {
	                return '上午';
	            } else if (hm < 1230) {
	                return '中午';
	            } else if (hm < 1800) {
	                return '下午';
	            } else {
	                return '晚上';
	            }
	        },
	        calendar: {
	            sameDay: '[今天]LT',
	            nextDay: '[明天]LT',
	            nextWeek: '[下]ddddLT',
	            lastDay: '[昨天]LT',
	            lastWeek: '[上]ddddLT',
	            sameElse: 'L'
	        },
	        ordinalParse: /\d{1,2}(日|月|週)/,
	        ordinal: function ordinal(number, period) {
	            switch (period) {
	                case 'd':
	                case 'D':
	                case 'DDD':
	                    return number + '日';
	                case 'M':
	                    return number + '月';
	                case 'w':
	                case 'W':
	                    return number + '週';
	                default:
	                    return number;
	            }
	        },
	        relativeTime: {
	            future: '%s內',
	            past: '%s前',
	            s: '幾秒',
	            m: '1分鐘',
	            mm: '%d分鐘',
	            h: '1小時',
	            hh: '%d小時',
	            d: '1天',
	            dd: '%d天',
	            M: '1個月',
	            MM: '%d個月',
	            y: '1年',
	            yy: '%d年'
	        }
	    });

	    return zh_tw;
	});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Button2 = __webpack_require__(40);

	var _Button3 = _interopRequireDefault(_Button2);

	var _Dialog = __webpack_require__(46);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DialogButton = function (_Button) {
	    _inherits(DialogButton, _Button);

	    function DialogButton(element) {
	        _classCallCheck(this, DialogButton);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DialogButton).call(this, element));

	        _this.dialog = _Dialog2.default.getInstance(document.getElementById(_this.controls));
	        return _this;
	    }

	    _createClass(DialogButton, [{
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            _get(Object.getPrototypeOf(DialogButton.prototype), 'onKeyDown', this).call(this, event);
	            if (event.keyCode === _keyCodes.ESCAPE && this.dialog.assertive === 'false') this.expanded = 'false';
	            if (event.keyCode === _keyCodes.TAB && event.shiftKey && this.expanded === 'true') {
	                var widgets = this.dialog.widgets;
	                event.preventDefault();
	                widgets[widgets.length - 1].focus();
	            }
	        }
	    }, {
	        key: 'expanded',
	        get: function get() {
	            return _get(Object.getPrototypeOf(DialogButton.prototype), 'expanded', this);
	        },
	        set: function set(expanded) {
	            if (expanded !== this.expanded) {
	                _set(Object.getPrototypeOf(DialogButton.prototype), 'expanded', expanded, this);
	                this.dialog.hidden = String(expanded === 'false');
	                if (expanded === 'true') this.dialog.trigger = this;
	            }
	        }
	    }]);

	    return DialogButton;
	}(_Button3.default);

	exports.default = DialogButton;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Button = __webpack_require__(40);

	var _Button2 = _interopRequireDefault(_Button);

	var _GridCell = __webpack_require__(163);

	var _GridCell2 = _interopRequireDefault(_GridCell);

	var _moment = __webpack_require__(58);

	var _moment2 = _interopRequireDefault(_moment);

	var _DOMTransform = __webpack_require__(32);

	var _DOMTransform2 = _interopRequireDefault(_DOMTransform);

	var _DON = __webpack_require__(166);

	var _DON2 = _interopRequireDefault(_DON);

	var _datepicker = __webpack_require__(167);

	var _datepicker2 = _interopRequireDefault(_datepicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var template = new _DOMTransform2.default();

	(0, _datepicker2.default)(template);

	var DatePicker = function (_Instance) {
	    _inherits(DatePicker, _Instance);

	    function DatePicker(element) {
	        _classCallCheck(this, DatePicker);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).call(this, element));

	        _this.heading = element.querySelector('[role=heading]');
	        _this.grid = element.querySelector('[role=grid]');
	        return _this;
	    }

	    _createClass(DatePicker, [{
	        key: 'onClick',
	        value: function onClick(event) {
	            var target = event.target;
	            if (target.dataset.instance === 'Button') this.onButtonClick(event);
	            var gridcell = _GridCell2.default.closestInstance(target);
	            if (gridcell && gridcell.disabled === 'false') this.onGridCellClick(event);
	        }
	    }, {
	        key: 'onGridCellClick',
	        value: function onGridCellClick(_ref) {
	            var target = _ref.target;

	            this.value = (0, _moment2.default)(this.value, 'YYYY-MM-DD').date(target.dataset.value).format('YYYY-MM-DD');
	            this.emit('change');
	        }
	    }, {
	        key: 'onButtonClick',
	        value: function onButtonClick(_ref2) {
	            var target = _ref2.target;

	            var button = _Button2.default.getInstance(target);
	            var time = (0, _moment2.default)(this.value, 'YYYY-MM-DD');
	            this.value = time.month(time.month() + Number(button.value)).format('YYYY-MM-DD');
	            this.rebuild(this.value);
	        }
	    }, {
	        key: 'rebuild',
	        value: function rebuild(value) {
	            this.heading.textContent = (0, _moment2.default)(value, 'YYYY-MM-DD').format('MMMM YYYY');
	            var grid = this.grid;
	            grid.parentElement.replaceChild(this.grid = _DON2.default.toDOM(template.apply({
	                element: 'dategrid',
	                attributes: { value: value }
	            })), grid);
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.element.dataset.value || (0, _moment2.default)(Date.now().format('YYYY-MM-DD'));
	        },
	        set: function set(value) {
	            this.element.dataset.value = value;
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('click', function (event) {
	                var instance = _this2.closestInstance(event.target);
	                if (instance) instance.onClick(event);
	            });
	        }
	    }]);

	    return DatePicker;
	}(_Instance3.default);

	exports.default = DatePicker;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Grid = __webpack_require__(164);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _Row = __webpack_require__(165);

	var _Row2 = _interopRequireDefault(_Row);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LEFT = _keyCodes.ARROWS.LEFT;
	var UP = _keyCodes.ARROWS.UP;
	var RIGHT = _keyCodes.ARROWS.RIGHT;
	var DOWN = _keyCodes.ARROWS.DOWN;

	var ARROW_CODES = Object.values(_keyCodes.ARROWS);
	var DIGIT_CODES = Object.values(_keyCodes.DIGITS);
	var LETTER_CODES = Object.values(_keyCodes.LETTERS);

	var GridCell = function (_Instance) {
	    _inherits(GridCell, _Instance);

	    function GridCell(element) {
	        _classCallCheck(this, GridCell);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GridCell).call(this, element));

	        element.dataset.mode = 'navigation';
	        _this.grid = _this.closest(_Grid2.default);
	        _this.row = _this.closest(_Row2.default);
	        _this.text = element.querySelector('.text');
	        _this.input = _this.getInput();
	        _this.merged = _this.getMerged();
	        _this.span = null;

	        _this.on('blur', _this.onBlur);
	        _this.on('click', _this.onClick);
	        _this.on('dblclick', _this.onDoubleClick);
	        _this.on('keydown', _this.onKeyDown);
	        return _this;
	    }

	    _createClass(GridCell, [{
	        key: 'getMerged',
	        value: function getMerged() {
	            var element = this.element;
	            var rowSpan = element.rowSpan;
	            var colSpan = element.colSpan;
	            var merged = [];
	            if (rowSpan > 1 || colSpan > 1) {
	                var rows = this.grid.rows;
	                var index = this.index;
	                var rowIndex = this.row.index;
	                for (var i = rowIndex; i < rowIndex + rowSpan; i++) {
	                    var cells = rows[i].cells;
	                    for (var j = index; j < index + colSpan; j++) {
	                        var cell = cells[j];
	                        if (cell !== this) {
	                            cell.span = this;
	                            merged.push(cell);
	                        }
	                    }
	                }
	            }
	            return merged;
	        }
	    }, {
	        key: 'getInput',
	        value: function getInput() {
	            var element = this.element;
	            var input = element.querySelector('input');
	            if (!input) {
	                input = document.createElement('input');
	                input.hidden = true;
	                element.appendChild(input);
	            }
	            input.addEventListener('blur', this.onInputBlur.bind(this));
	            return input;
	        }
	    }, {
	        key: 'onInputBlur',
	        value: function onInputBlur() {
	            this.mode = 'navigation';
	        }
	    }, {
	        key: 'focus',
	        value: function focus() {
	            this.span ? this.span.focus() : this.element.focus();
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick() {
	            if (this.mode === 'navigation' && this.disabled === 'false') {
	                this.grid.unselect();
	                this.selected = 'true';
	            }
	        }
	    }, {
	        key: 'onFocus',
	        value: function onFocus() {
	            this.grid.active = this;
	        }
	    }, {
	        key: 'onBlur',
	        value: function onBlur() {
	            // this.grid.unselect();
	        }
	    }, {
	        key: 'onMouseEnter',
	        value: function onMouseEnter(_ref) {
	            var buttons = _ref.buttons;

	            var grid = this.grid;
	            if (buttons === 1 && grid.multiselectable === 'true') {
	                grid.updateSelection(this);
	            }
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var keyCode = event.keyCode;
	            if (keyCode === _keyCodes.ENTER) this.onEnterKeyDown(event);else if (keyCode === _keyCodes.ESCAPE) this.onEscapeKeyDown(event);else if (ARROW_CODES.includes(keyCode) && this.mode === 'navigation') {
	                event.preventDefault();
	                this.onArrowKeyDown(event);
	            } else if (keyCode === _keyCodes.BACKSPACE) this.onBackspaceKeyDown(event);else if (keyCode === _keyCodes.LETTERS.A && (event.metaKey || event.ctrlKey)) {
	                if (this.mode === 'navigation' && this.grid.multiselectable === 'true') {
	                    event.preventDefault();
	                    this.grid.selectAll();
	                }
	            } else if ([_keyCodes.SPACE].concat(_toConsumableArray(DIGIT_CODES), _toConsumableArray(LETTER_CODES)).includes(keyCode)) {
	                if (keyCode === _keyCodes.SPACE && this.readonly === 'true' && this.selected && this.disabled === 'false') {
	                    event.preventDefault();
	                    this.grid.unselect();
	                    this.selected = 'true';
	                    this.emit('click');
	                }
	                if (!event.metaKey && !event.ctrlKey) this.mode = 'edit';
	            }
	        }
	    }, {
	        key: 'onBackspaceKeyDown',
	        value: function onBackspaceKeyDown(event) {
	            if (this.readonly === 'false' && this.mode === 'navigation') {
	                event.preventDefault();
	                var selected = this.grid.selected;
	                if (selected.length) selected.forEach(function (cell) {
	                    return cell.value = '';
	                });else this.value = '';
	            }
	        }
	    }, {
	        key: 'onEnterKeyDown',
	        value: function onEnterKeyDown(_ref2) {
	            var ctrlKey = _ref2.ctrlKey;

	            if (this.mode === 'navigation') {
	                var grid = this.grid;
	                if (ctrlKey) {
	                    var selected = grid.selected;
	                    if (selected.length) {
	                        var merged = selected.filter(function (cell) {
	                            return Boolean(cell.merged.length);
	                        });
	                        grid.unselect();
	                        if (merged.length) merged.forEach(function (cell) {
	                            return cell.unmerge();
	                        });else grid.merge(selected);
	                    } else this.unmerge();
	                } else {
	                    grid.unselect();
	                    this.mode = 'edit';
	                }
	            } else {
	                this.mode = 'navigation';
	                this.element.focus();
	            }
	        }
	    }, {
	        key: 'unmerge',
	        value: function unmerge() {
	            var merged = this.merged;
	            if (merged.length) {
	                var cell = void 0;
	                while (cell = merged.pop()) {
	                    cell.span = null;
	                    cell.hidden = 'false';
	                }
	                var element = this.element;
	                element.rowSpan = 1;
	                element.colSpan = 1;
	            }
	        }
	    }, {
	        key: 'onEscapeKeyDown',
	        value: function onEscapeKeyDown() {
	            if (this.mode === 'edit') {
	                this.mode = 'navigation';
	                this.element.focus();
	            } else this.grid.unselect();
	        }
	    }, {
	        key: 'onDoubleClick',
	        value: function onDoubleClick() {
	            this.mode = 'edit';
	        }
	    }, {
	        key: 'onArrowKeyDown',
	        value: function onArrowKeyDown(_ref3) {
	            var keyCode = _ref3.keyCode;
	            var ctrlKey = _ref3.ctrlKey;
	            var shiftKey = _ref3.shiftKey;
	            var metaKey = _ref3.metaKey;

	            var grid = this.grid;
	            var current = shiftKey && grid.selection || this;
	            var target = void 0;
	            if (ctrlKey || metaKey) {
	                var rowCells = current.row.cells;
	                var column = current.column;
	                switch (keyCode) {
	                    case LEFT:
	                        target = rowCells[0];break;
	                    case UP:
	                        target = column[0];break;
	                    case RIGHT:
	                        target = rowCells[rowCells.length - 1];break;
	                    case DOWN:
	                        target = column[column.length - 1];break;
	                }
	            } else {
	                switch (keyCode) {
	                    case LEFT:
	                        target = current.leftSibling;break;
	                    case UP:
	                        target = current.topSibling;break;
	                    case RIGHT:
	                        target = current.rightSibling;break;
	                    case DOWN:
	                        target = current.bottomSibling;break;
	                }
	            }
	            if (target) {
	                if (grid.multiselectable === 'true') {
	                    if (shiftKey) grid.updateSelection(target);else {
	                        grid.unselect();
	                        target.focus();
	                    }
	                } else target.focus();
	            }
	        }
	    }, {
	        key: 'mode',
	        get: function get() {
	            return this.element.dataset.mode;
	        },
	        set: function set(mode) {
	            if (mode !== this.mode && this.readonly !== 'true') {
	                var element = this.element;
	                var input = this.input;
	                var text = this.text;
	                if (mode === 'edit') {
	                    input.value = text.textContent;
	                    text.hidden = true;
	                    input.hidden = false;
	                    input.focus();
	                    element.classList.add('focus');
	                } else {
	                    text.textContent = input.value;
	                    input.hidden = true;
	                    text.hidden = false;
	                    element.classList.remove('focus');
	                }
	                element.dataset.mode = mode;
	            }
	        }
	    }, {
	        key: 'readonly',
	        get: function get() {
	            return this.element.getAttribute('aria-readonly') || 'false';
	        },
	        set: function set(readonly) {
	            this.element.setAttribute('aria-readonly', readonly);
	        }
	    }, {
	        key: 'selected',
	        get: function get() {
	            return this.element.getAttribute('aria-selected') || '';
	        },
	        set: function set(selected) {
	            if (this.selected) this.element.setAttribute('aria-selected', selected);
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return this.grid.disabled === 'true' ? 'true' : this.element.getAttribute('aria-disabled') || 'false';
	        },
	        set: function set(disabled) {
	            var element = this.element;
	            element.setAttribute('aria-disabled', disabled);
	            if (disabled === 'true') element.removeAttribute('tabindex');else element.tabIndex = -1;
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.input.value;
	        },
	        set: function set(value) {
	            this.input.value = this.text.textContent = value;
	        }
	    }, {
	        key: 'active',
	        get: function get() {
	            return String(this.element.tabIndex === 0);
	        },
	        set: function set(active) {
	            this.element.tabIndex = active === 'true' ? 0 : -1;
	        }
	    }, {
	        key: 'leftSibling',
	        get: function get() {
	            var cell = this.row.cells[this.index - 1];
	            return cell ? cell.span || cell : null;
	        }
	    }, {
	        key: 'rightSibling',
	        get: function get() {
	            return this.row.cells[this.index + this.element.colSpan] || null;
	        }
	    }, {
	        key: 'topSibling',
	        get: function get() {
	            var cell = this.column[this.row.index - 1];
	            return cell ? cell.span || cell : null;
	        }
	    }, {
	        key: 'bottomSibling',
	        get: function get() {
	            return this.column[this.row.index + this.element.rowSpan] || null;
	        }
	    }, {
	        key: 'index',
	        get: function get() {
	            return this.row.cells.indexOf(this);
	        }
	    }, {
	        key: 'column',
	        get: function get() {
	            var _this2 = this;

	            return this.grid.cells.filter(function (cell) {
	                return cell.index === _this2.index;
	            });
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this3 = this;

	            node.addEventListener('focus', function (event) {
	                var gridcell = _this3.getInstance(event.target);
	                if (gridcell) gridcell.onFocus(event);
	            }, true);
	            node.addEventListener('mouseenter', function (event) {
	                var gridcell = _this3.getInstance(event.target);
	                if (gridcell) gridcell.onMouseEnter(event);
	            }, true);
	        }
	    }]);

	    return GridCell;
	}(_Instance3.default);

	exports.default = GridCell;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Row = __webpack_require__(165);

	var _Row2 = _interopRequireDefault(_Row);

	var _GridCell = __webpack_require__(163);

	var _GridCell2 = _interopRequireDefault(_GridCell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Grid = function (_Instance) {
	    _inherits(Grid, _Instance);

	    function Grid(element) {
	        _classCallCheck(this, Grid);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, element));

	        _this.selection = null;
	        return _this;
	    }

	    _createClass(Grid, [{
	        key: 'unselect',
	        value: function unselect() {
	            this.selected.forEach(function (cell) {
	                return cell.selected = 'false';
	            });
	            this.selection = null;
	        }
	    }, {
	        key: 'merge',
	        value: function merge(cells) {
	            var first = cells[0];
	            var last = cells[cells.length - 1];
	            first.merged = [];
	            cells.forEach(function (cell) {
	                cell.selected = 'false';
	                if (cell !== first) {
	                    first.merged.push(cell);
	                    cell.span = first;
	                    cell.value = '';
	                    cell.hidden = 'true';
	                }
	            });
	            first.element.colSpan = last.index - first.index + 1;
	            first.element.rowSpan = last.row.index - first.row.index + 1;
	            first.mode = 'edit';
	        }
	    }, {
	        key: 'selectAll',
	        value: function selectAll() {
	            var rows = this.rows;
	            var firstRowCells = rows[0].cells;
	            var lastRowCells = rows[rows.length - 1].cells;
	            var topLeftCell = firstRowCells[0];
	            var topRightCell = firstRowCells[firstRowCells.length - 1];
	            var bottomLeftCell = lastRowCells[0];
	            var bottomRightCell = lastRowCells[lastRowCells.length - 1];
	            var active = this.active;
	            var selection = void 0;
	            this.cells.forEach(function (cell) {
	                return cell.selected = 'true';
	            });
	            switch (active) {
	                case topLeftCell:
	                    selection = bottomRightCell;break;
	                case topRightCell:
	                    selection = bottomLeftCell;break;
	                case bottomLeftCell:
	                    selection = topRightCell;break;
	                case bottomRightCell:
	                    selection = topLeftCell;break;
	                default:
	                    selection = active;
	            }
	            this.selection = selection;
	        }
	    }, {
	        key: 'updateSelection',
	        value: function updateSelection(target) {
	            var active = this.active;
	            this.unselect();
	            if (active && target !== active) {
	                var rowStart = Math.min(active.row.index, target.row.index);
	                var rowEnd = Math.max(active.row.index, target.row.index);
	                var colStart = Math.min(active.index, target.index);
	                var colEnd = Math.max(active.index, target.index);
	                var rows = this.rows;
	                var merged = false;
	                var cells = void 0,
	                    cell = void 0,
	                    i = void 0,
	                    j = void 0;
	                for (i = rowStart; i <= rowEnd; i++) {
	                    cells = rows[i].cells;
	                    for (j = colStart; j <= colEnd; j++) {
	                        cell = cells[j];
	                        if (cell.span || cell.merged.length) {
	                            merged = true;
	                            break;
	                        } else cell.selected = 'true';
	                    }
	                    if (merged) break;
	                }
	                if (merged) this.selectAll();else this.selection = target;
	            }
	        }
	    }, {
	        key: 'rows',
	        get: function get() {
	            return this.findAll(_Row2.default);
	        }
	    }, {
	        key: 'cells',
	        get: function get() {
	            return this.findAll(_GridCell2.default);
	        }
	    }, {
	        key: 'multiselectable',
	        get: function get() {
	            return this.element.getAttribute('aria-multiselectable') || 'false';
	        },
	        set: function set(multiselectable) {
	            this.element.setAttribute('aria-multiselectable', multiselectable);
	        }
	    }, {
	        key: 'selected',
	        get: function get() {
	            return this.cells.filter(function (cell) {
	                return cell.selected === 'true';
	            });
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return this.element.getAttribute('aria-disabled') || 'false';
	        },
	        set: function set(disabled) {
	            this.element.setAttribute('aria-disabled', disabled);
	            this.cells.forEach(function (cell, i) {
	                if (disabled === 'true') cell.element.removeAttribute('tabindex');else if (cell.disabled !== 'true') cell.element.tabIndex = i ? -1 : 0;
	            });
	        }
	    }, {
	        key: 'active',
	        get: function get() {
	            return this.find(_GridCell2.default, function (cell) {
	                return cell.active === 'true';
	            });
	        },
	        set: function set(cell) {
	            this.active.active = 'false';
	            cell.active = 'true';
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            _GridCell2.default.attachTo(node);
	        }
	    }]);

	    return Grid;
	}(_Instance3.default);

	exports.default = Grid;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Grid = __webpack_require__(164);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _GridCell = __webpack_require__(163);

	var _GridCell2 = _interopRequireDefault(_GridCell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Row = function (_Instance) {
	    _inherits(Row, _Instance);

	    function Row(element) {
	        _classCallCheck(this, Row);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Row).call(this, element));

	        _this.grid = _this.closest(_Grid2.default);
	        return _this;
	    }

	    _createClass(Row, [{
	        key: 'cells',
	        get: function get() {
	            return this.findAll(_GridCell2.default);
	        }
	    }, {
	        key: 'next',
	        get: function get() {
	            return this.grid.rows[this.index + 1];
	        }
	    }, {
	        key: 'prev',
	        get: function get() {
	            return this.grid.rows[this.index - 1];
	        }
	    }, {
	        key: 'index',
	        get: function get() {
	            return this.grid.rows.indexOf(this);
	        }
	    }]);

	    return Row;
	}(_Instance3.default);

	exports.default = Row;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fromDOM = __webpack_require__(33);

	var _fromDOM2 = _interopRequireDefault(_fromDOM);

	var _fromXML = __webpack_require__(35);

	var _fromXML2 = _interopRequireDefault(_fromXML);

	var _toDOM = __webpack_require__(34);

	var _toDOM2 = _interopRequireDefault(_toDOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @module DON
	 */
	var DON = { fromDOM: _fromDOM2.default, fromXML: _fromXML2.default, toDOM: _toDOM2.default };

	exports.default = DON;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _button = __webpack_require__(168);

	var _button2 = _interopRequireDefault(_button);

	var _grid = __webpack_require__(170);

	var _grid2 = _interopRequireDefault(_grid);

	var _moment = __webpack_require__(58);

	var _moment2 = _interopRequireDefault(_moment);

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var WEEK_DAY_NAMES = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

	exports.default = function (domTransform) {
	    (0, _button2.default)(domTransform);
	    (0, _grid2.default)(domTransform);

	    domTransform.element('datepicker', function (_ref) {
	        var a = _ref.attributes;

	        var now = Date.now();
	        var id = Math.floor(Math.random() * now);
	        var value = a.value || (0, _moment2.default)(now).format('YYYY-MM-DD');

	        return {
	            element: 'div',
	            attributes: {
	                'data-instance': 'DatePicker',
	                'class': (0, _mix2.default)('datepicker', a.mix),
	                'aria-label': a.label,
	                'data-value': value,
	                hidden: a.hidden === 'true' && ''
	            },
	            content: {
	                element: 'div',
	                attributes: { 'class': 'box' },
	                content: [{
	                    element: 'div',
	                    attributes: { 'class': 'header' },
	                    content: [this.apply({
	                        element: 'button',
	                        attributes: { value: '-1' }
	                    }), {
	                        element: 'span',
	                        attributes: {
	                            role: 'heading',
	                            id: 'heading' + id,
	                            'aria-live': 'assertive',
	                            'aria-atomic': 'true'
	                        },
	                        content: (0, _moment2.default)(value, 'YYYY-MM-DD').format('MMMM YYYY')
	                    }, this.apply({
	                        element: 'button',
	                        attributes: { value: '+1' }
	                    })]
	                }, this.apply({
	                    element: 'dategrid',
	                    attributes: { labelledby: 'heading' + id, value: value }
	                })]
	            }
	        };
	    });
	    domTransform.element('dategrid', function (_ref2) {
	        var attributes = _ref2.attributes;

	        var _attributes$value$spl = attributes.value.split('-');

	        var _attributes$value$spl2 = _slicedToArray(_attributes$value$spl, 3);

	        var year = _attributes$value$spl2[0];
	        var month = _attributes$value$spl2[1];
	        var date = _attributes$value$spl2[2];

	        month = Number(month) - 1;
	        var firstDayOfMonth = new Date(year, month, 1).getDay() || 7;
	        var now = new Date();
	        var currentDateString = [now.getFullYear(), now.getMonth(), now.getDate()].join('-');
	        var selectedDateString = [year, month, Number(date)].join('-');
	        var daysInMonth = new Date(year, month + 1, 0).getDate();
	        var weekCount = Math.ceil((daysInMonth + firstDayOfMonth - 1) / 7);
	        var rows = [];

	        for (var i = 0; i < weekCount; i++) {
	            var row = [];
	            for (var j = 1; j <= 7; j++) {
	                var _date = i * 7 + j - firstDayOfMonth + 1;
	                var dateValue = new Date(year, month, _date).getDate();
	                var dateString = [year, month, _date].join('-');

	                row.push({
	                    element: 'gridcell',
	                    attributes: {
	                        value: String(dateValue),
	                        current: dateString === currentDateString && 'date',
	                        selected: String(dateString === selectedDateString),
	                        disabled: (_date < 1 || _date > daysInMonth) && 'true',
	                        readonly: 'true',
	                        weekday: String(j - 1)
	                    },
	                    content: String(dateValue)
	                });
	            }
	            rows.push({ element: 'row', content: row });
	        }
	        return this.apply({
	            element: 'grid',
	            attributes: attributes,
	            content: [{
	                element: 'thead',
	                content: {
	                    element: 'tr',
	                    content: WEEK_DAY_NAMES.map(function (name) {
	                        return {
	                            element: 'th',
	                            attributes: { role: 'columnheader' },
	                            content: name
	                        };
	                    })
	                }
	            }, { element: 'tbody', content: rows }]
	        });
	    });
	};

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('button', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        return {
	            element: 'span',
	            attributes: {
	                'data-instance': a.instance || 'Button',
	                role: a.role || 'button',
	                tabindex: a.disabled === 'true' || ('tabindex' in a ? a.tabindex : '0'),
	                hidden: a.hidden === 'true' ? '' : undefined,
	                title: a.title,
	                'class': (0, _mix2.default)(a.view || 'button', a.mix),
	                'aria-disabled': a.disabled,
	                'aria-pressed': a.pressed,
	                'aria-haspopup': a.haspopup,
	                'aria-controls': a.controls,
	                'aria-expanded': a.expanded,
	                'data-type': a.type,
	                'data-value': a.value
	            },
	            content: this.apply(content)
	        };
	    });
	};

/***/ },
/* 169 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Filters and merges given mixes to string for `class` HTML-attribute
	 * @param {String|*,String|*,...} mix
	 */
	var mix = function mix() {
	  for (var _len = arguments.length, _mix = Array(_len), _key = 0; _key < _len; _key++) {
	    _mix[_key] = arguments[_key];
	  }

	  return _mix.filter(Boolean).join(' ');
	};

	exports.default = mix;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('grid', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        var params = {
	            multiselectable: a.multiselectable === 'true',
	            disabled: a.disabled === 'true',
	            firstCell: null,
	            selectedCell: null
	        };
	        if (a.rows && a.columns) {
	            content = Array.from(new Array(Number(a.rows))).map(function (_) {
	                return {
	                    element: 'row',
	                    content: Array.from(new Array(Number(a.columns))).map(function (_) {
	                        return {
	                            element: 'gridcell'
	                        };
	                    })
	                };
	            });
	        }
	        var result = {
	            element: 'table',
	            attributes: {
	                'data-instance': 'Grid',
	                role: 'grid',
	                'aria-multiselectable': a.multiselectable,
	                'aria-disabled': a.disabled,
	                'aria-label': a.label,
	                'aria-labelledby': a.labelledby,
	                'class': (0, _mix2.default)(a.view || 'grid', a.mix),
	                cellspacing: '0'
	            },
	            content: this.apply(content, params)
	        };
	        if (!params.disabled) (params.selectedCell || params.firstCell).attributes.tabindex = '0';
	        return result;
	    });
	    domTransform.element('row', function (_ref2, params) {
	        var a = _ref2.attributes;
	        var content = _ref2.content;

	        return {
	            element: 'tr',
	            attributes: {
	                'data-instance': 'Row',
	                role: 'row',
	                'class': (0, _mix2.default)(a.view || 'row', a.mix)
	            },
	            content: this.apply(content, params)
	        };
	    });
	    domTransform.element('gridcell', function (_ref3, params) {
	        var a = _ref3.attributes;
	        var content = _ref3.content;

	        var result = {
	            element: 'td',
	            attributes: {
	                'data-instance': 'GridCell',
	                role: 'gridcell',
	                tabindex: params.disabled || '-1',
	                'aria-current': a.current,
	                'aria-selected': a.selected || params.multiselectable && 'false',
	                'aria-disabled': a.disabled,
	                'aria-readonly': a.readonly,
	                'data-value': a.value,
	                'data-weekday': a.weekday,
	                'class': (0, _mix2.default)(a.view || 'gridcell', a.mix)
	            },
	            content: {
	                element: 'span',
	                attributes: { 'class': 'text' },
	                content: content
	            }
	        };
	        if (!params.disabled) {
	            if (!params.firstCell) params.firstCell = result;
	            if (!params.selectedCell && a.selected === 'true') params.selectedCell = result;
	        }
	        return result;
	    });
	};

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _TextBox2 = __webpack_require__(53);

	var _TextBox3 = _interopRequireDefault(_TextBox2);

	var _DatePicker = __webpack_require__(162);

	var _DatePicker2 = _interopRequireDefault(_DatePicker);

	var _keyCodes = __webpack_require__(42);

	var _moment = __webpack_require__(58);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DateBox = function (_TextBox) {
	    _inherits(DateBox, _TextBox);

	    function DateBox(element) {
	        _classCallCheck(this, DateBox);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DateBox).call(this, element));

	        _this.datepicker = _this.find(_DatePicker2.default);
	        _this.datepicker.on('change', _this.onDatePickerChange, _this);
	        _this.on('keydown', _this.onKeyDown);
	        _this.onDocumentClick = _this.onDocumentClick.bind(_this);
	        _this.onDocumentFocus = _this.onDocumentFocus.bind(_this);
	        return _this;
	    }

	    _createClass(DateBox, [{
	        key: 'onDatePickerChange',
	        value: function onDatePickerChange() {
	            var _this2 = this;

	            this.input.value = (0, _moment2.default)(this.datepicker.value, 'YYYY-MM-DD').format('DD.MM.YYYY');
	            setTimeout(function () {
	                _this2.expanded = 'false';
	                _this2.focus();
	            }, 0);
	        }
	    }, {
	        key: 'onDocumentFocus',
	        value: function onDocumentFocus(_ref) {
	            var target = _ref.target;

	            if (!this.element.contains(target)) this.expanded = 'false';
	        }
	    }, {
	        key: 'onDocumentClick',
	        value: function onDocumentClick(_ref2) {
	            var target = _ref2.target;

	            if (!this.element.contains(target)) this.expanded = 'false';
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var keyCode = event.keyCode;
	            if (keyCode === _keyCodes.ESCAPE) this.expanded = 'false';
	            if (keyCode === _keyCodes.SPACE) {
	                event.preventDefault();
	                this.expanded = 'true';
	            }
	        }
	    }, {
	        key: 'onInputFocus',
	        value: function onInputFocus(event) {
	            _get(Object.getPrototypeOf(DateBox.prototype), 'onInputFocus', this).call(this, event);
	            this.expanded = 'true';
	        }
	    }, {
	        key: 'expanded',
	        get: function get() {
	            return this.input.getAttribute('aria-expanded') || 'false';
	        },
	        set: function set(expanded) {
	            this.input.setAttribute('aria-expanded', expanded);
	            this.datepicker.hidden = String(expanded === 'false');
	            if (expanded === 'true') {
	                document.addEventListener('click', this.onDocumentClick);
	                document.addEventListener('focus', this.onDocumentFocus, true);
	            } else {
	                document.removeEventListener('click', this.onDocumentClick);
	                document.removeEventListener('focus', this.onDocumentFocus, true);
	            }
	        }
	    }]);

	    return DateBox;
	}(_TextBox3.default);

	exports.default = DateBox;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Tab = __webpack_require__(173);

	var _Tab2 = _interopRequireDefault(_Tab);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TabList = function (_Instance) {
	    _inherits(TabList, _Instance);

	    function TabList() {
	        _classCallCheck(this, TabList);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(TabList).apply(this, arguments));
	    }

	    _createClass(TabList, [{
	        key: 'on',
	        value: function on(type, listener, context) {
	            this.element.addEventListener(type, listener.bind(context || this));
	        }
	    }, {
	        key: 'select',
	        value: function select(tab) {
	            this.selectedTab.selected = 'false';
	            tab.selected = 'true';
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            var tabs = this.tabs;
	            var index = tabs.indexOf(this.selectedTab) - 1;
	            this.select(index < 0 ? tabs[tabs.length - 1] : tabs[index]);
	            this.emit('change');
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var tabs = this.tabs;
	            var index = tabs.indexOf(this.selectedTab) + 1;
	            this.select(index === tabs.length ? tabs[0] : tabs[index]);
	            this.emit('change');
	        }
	    }, {
	        key: 'tabs',
	        get: function get() {
	            return this.findAll(_Tab2.default);
	        }
	    }, {
	        key: 'selectedTab',
	        get: function get() {
	            return this.find(_Tab2.default, function (_ref) {
	                var selected = _ref.selected;
	                return selected === 'true';
	            });
	        }
	    }, {
	        key: 'controls',
	        get: function get() {
	            return this.element.getAttribute('aria-controls') || '';
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            _Tab2.default.attachTo(node);
	        }
	    }]);

	    return TabList;
	}(_Instance3.default);

	exports.default = TabList;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _TabList = __webpack_require__(172);

	var _TabList2 = _interopRequireDefault(_TabList);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ARROW_CODES = Object.values(_keyCodes.ARROWS);

	var Tab = function (_Instance) {
	    _inherits(Tab, _Instance);

	    function Tab(element) {
	        _classCallCheck(this, Tab);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this, element));

	        _this.list = _this.closest(_TabList2.default);
	        _this.panel = document.getElementById(_this.controls);
	        _this.on('click', _this.onClick);
	        _this.on('keydown', _this.onKeyDown);
	        _this.on('keyup', _this.onKeyUp);
	        return _this;
	    }

	    _createClass(Tab, [{
	        key: 'onClick',
	        value: function onClick() {
	            if (this.selected === 'false') {
	                var list = this.list;
	                list.select(this);
	                list.element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
	            }
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var keyCode = event.keyCode;
	            if (ARROW_CODES.includes(keyCode)) {
	                event.preventDefault();
	                this.onArrowKeyDown(event);
	            }
	            if (keyCode === _keyCodes.SPACE && !event.repeat) {
	                event.preventDefault();
	                this.element.classList.add('active');
	            }
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(_ref) {
	            var keyCode = _ref.keyCode;

	            if (keyCode === _keyCodes.SPACE) {
	                var element = this.element;
	                element.classList.remove('active');
	                element.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
	            }
	        }
	    }, {
	        key: 'onArrowKeyDown',
	        value: function onArrowKeyDown(_ref2) {
	            var keyCode = _ref2.keyCode;

	            keyCode === _keyCodes.ARROWS.LEFT || keyCode === _keyCodes.ARROWS.UP ? this.list.prev() : this.list.next();
	        }
	    }, {
	        key: 'selected',
	        get: function get() {
	            return this.element.getAttribute('aria-selected') || 'false';
	        },
	        set: function set(selected) {
	            var element = this.element;
	            element.setAttribute('aria-selected', selected);
	            element.tabIndex = selected === 'true' ? 0 : -1;
	            this.panel.hidden = selected === 'false';
	            if (selected === 'true' && document.activeElement !== element) element.focus();
	        }
	    }, {
	        key: 'controls',
	        get: function get() {
	            return this.element.getAttribute('aria-controls') || '';
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('focus', function (_ref3) {
	                var target = _ref3.target;
	                return _this2.getInstance(target);
	            }, true);
	        }
	    }]);

	    return Tab;
	}(_Instance3.default);

	exports.default = Tab;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _TreeItem = __webpack_require__(175);

	var _TreeItem2 = _interopRequireDefault(_TreeItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tree = function (_Instance) {
	    _inherits(Tree, _Instance);

	    function Tree() {
	        _classCallCheck(this, Tree);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Tree).apply(this, arguments));
	    }

	    _createClass(Tree, [{
	        key: 'items',
	        get: function get() {
	            return this.findAll(_TreeItem2.default);
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            _TreeItem2.default.attachTo(node);
	        }
	    }]);

	    return Tree;
	}(_Instance3.default);

	exports.default = Tree;

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(41);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _Tree = __webpack_require__(174);

	var _Tree2 = _interopRequireDefault(_Tree);

	var _keyCodes = __webpack_require__(42);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ARROW_CODES = Object.values(_keyCodes.ARROWS);

	var TreeItem = function (_Instance) {
	    _inherits(TreeItem, _Instance);

	    function TreeItem(element) {
	        _classCallCheck(this, TreeItem);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeItem).call(this, element));

	        _this.tree = _this.closest(_Tree2.default);
	        _this.on('dblclick', _this.onDoubleClick);
	        _this.on('keydown', _this.onKeyDown);
	        if (_this.expanded) {
	            element.querySelector('[role=button]').addEventListener('click', function () {
	                return _this.expanded = String(_this.expanded === 'false');
	            });
	        }
	        return _this;
	    }

	    _createClass(TreeItem, [{
	        key: 'onFocus',
	        value: function onFocus() {
	            this.tree.items.forEach(function (item) {
	                return item.element.tabIndex = -1;
	            });
	            this.element.tabIndex = 0;
	            this.selected = 'true';
	        }
	    }, {
	        key: 'onDoubleClick',
	        value: function onDoubleClick(_ref) {
	            var target = _ref.target;

	            if (this.expanded && TreeItem.closestInstance(target) === this) {
	                this.expanded = String(this.expanded === 'false');
	            }
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(event) {
	            var keyCode = event.keyCode;
	            if ([_keyCodes.SPACE, _keyCodes.ENTER].concat(_toConsumableArray(ARROW_CODES)).includes(keyCode)) {
	                event.preventDefault();
	                event.stopPropagation();
	                switch (keyCode) {
	                    case _keyCodes.SPACE:
	                    case _keyCodes.ENTER:
	                        if (this.expanded) this.expanded = String(this.expanded === 'false');
	                        break;
	                    case _keyCodes.ARROWS.LEFT:
	                        this.onLeftArrowKeyDown(event);
	                        break;
	                    case _keyCodes.ARROWS.RIGHT:
	                        this.onRightArrowKeyDown(event);
	                        break;
	                    case _keyCodes.ARROWS.UP:
	                        this.onUpArrowKeyDown(event);
	                        break;
	                    case _keyCodes.ARROWS.DOWN:
	                        this.onDownArrowKeyDown(event);
	                        break;
	                }
	            }
	        }
	    }, {
	        key: 'onLeftArrowKeyDown',
	        value: function onLeftArrowKeyDown() {
	            if (this.expanded === 'true') this.expanded = 'false';else if (this.parent instanceof TreeItem) this.parent.focus();
	        }
	    }, {
	        key: 'onRightArrowKeyDown',
	        value: function onRightArrowKeyDown() {
	            if (this.expanded === 'false') this.expanded = 'true';else if (this.items.length) this.items[0].focus();
	        }
	    }, {
	        key: 'onUpArrowKeyDown',
	        value: function onUpArrowKeyDown() {
	            var parent = this.parent;
	            var items = parent.items.filter(function (_ref2) {
	                var hidden = _ref2.hidden;
	                return hidden === 'false';
	            });
	            var index = items.indexOf(this);
	            var prevItem = items[index - 1];
	            if (prevItem) prevItem.focus();else if (parent instanceof TreeItem) parent.focus();
	        }
	    }, {
	        key: 'onDownArrowKeyDown',
	        value: function onDownArrowKeyDown() {
	            if (this.expanded === 'true') this.items[0].focus();else {
	                var parent = this;
	                while (parent = parent.parent) {
	                    var items = parent.items.filter(function (_ref3) {
	                        var hidden = _ref3.hidden;
	                        return hidden === 'false';
	                    });
	                    var nextItem = items[items.indexOf(this) + 1];
	                    if (nextItem) {
	                        nextItem.focus();
	                        break;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'focus',
	        value: function focus() {
	            this.element.focus();
	        }
	    }, {
	        key: 'items',
	        get: function get() {
	            return this.findAll(TreeItem);
	        }
	    }, {
	        key: 'expanded',
	        get: function get() {
	            return this.element.getAttribute('aria-expanded') || '';
	        },
	        set: function set(expanded) {
	            this.element.setAttribute('aria-expanded', expanded);
	        }
	    }, {
	        key: 'selected',
	        get: function get() {
	            return this.element.getAttribute('aria-selected') || 'false';
	        },
	        set: function set(selected) {
	            if (selected === 'true') this.tree.items.forEach(function (item) {
	                return item.selected = 'false';
	            });
	            this.element.setAttribute('aria-selected', selected);
	        }
	    }, {
	        key: 'parent',
	        get: function get() {
	            return this.closest(TreeItem) || this.tree;
	        }
	    }, {
	        key: 'hidden',
	        get: function get() {
	            return String(Boolean(this.closest(TreeItem, function (_ref4) {
	                var expanded = _ref4.expanded;
	                return expanded === 'false';
	            })));
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this2 = this;

	            node.addEventListener('focus', function (event) {
	                var target = event.target;
	                var treeitem = _this2.getInstance(target);
	                if (treeitem) treeitem.onFocus(event);
	            }, true);
	        }
	    }]);

	    return TreeItem;
	}(_Instance3.default);

	exports.default = TreeItem;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('link', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        return {
	            element: 'a',
	            attributes: Object.assign(a, {
	                view: undefined,
	                mix: undefined,
	                hidden: a.hidden === 'true' && '',
	                'class': (0, _mix2.default)(a.view || 'link', a.mix),
	                'aria-disabled': a.disabled
	            }),
	            content: this.apply(content)
	        };
	    });
	};

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('checkbox', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        var view = a.view || 'checkbox';

	        content = this.apply(view === 'checkbox' ? [{
	            element: 'span',
	            attributes: { 'class': 'box' }
	        }, content] : content);

	        if (a.checked === 'true') {
	            content.push({
	                element: 'input',
	                attributes: {
	                    type: 'hidden',
	                    autocomplete: 'off',
	                    disabled: a.disabled === 'true' ? '' : undefined,
	                    name: a.name,
	                    value: a.value
	                }
	            });
	        }
	        return {
	            element: 'span',
	            attributes: {
	                'data-instance': 'CheckBox',
	                role: 'checkbox',
	                tabindex: a.disabled === 'true' ? undefined : '0',
	                id: a.id,
	                title: a.title,
	                'aria-disabled': a.disabled,
	                'aria-checked': a.checked,
	                'aria-controls': a.controls,
	                'class': (0, _mix2.default)(view, a.mix)
	            },
	            content: content
	        };
	    });
	};

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('radiogroup', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        var params = {
	            disabled: a.disabled === 'true',
	            first: null,
	            checked: null,
	            value: undefined
	        };
	        content = this.apply(content, params);

	        if (!params.disabled) (params.checked || params.first).attributes.tabindex = '0';

	        return {
	            element: 'span',
	            attributes: {
	                'data-instance': 'RadioGroup',
	                role: 'radiogroup',
	                'aria-label': a.label,
	                'aria-disabled': a.disabled,
	                'class': (0, _mix2.default)(a.view || 'radiogroup', a.mix)
	            },
	            content: [
	            /*{
	                element : 'input',
	                attributes : {
	                    type : 'hidden',
	                    autocomplete : 'off',
	                    disabled : a.disabled === 'true' && '',
	                    name : a.name,
	                    value : params.value
	                }
	            },*/
	            content]
	        };
	    });
	    domTransform.element('radio', function (_ref2, params) {
	        var a = _ref2.attributes;
	        var content = _ref2.content;

	        var view = a.view || 'radio',
	            disabled = params.disabled || a.disabled === 'true',
	            result = {
	            element: 'span',
	            attributes: {
	                'data-instance': 'Radio',
	                role: 'radio',
	                tabindex: disabled || a.tabindex || '-1',
	                'data-value': a.value,
	                'aria-checked': a.checked,
	                'aria-disabled': a.disabled,
	                'class': (0, _mix2.default)(view, a.mix)
	            },
	            content: this.apply(view === 'radio' ? [{
	                element: 'span',
	                attributes: { 'class': 'box' }
	            }, content] : content)
	        };
	        if (!params.first) params.first = result;
	        if (a.checked === 'true') {
	            params.checked = result;
	            params.value = a.value;
	        }
	        return result;
	    });
	};

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('listbox', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;
	        var params = arguments.length <= 1 || arguments[1] === undefined ? { value: undefined } : arguments[1];

	        content = [{
	            element: 'span',
	            attributes: { 'class': 'box' },
	            content: this.apply(content, params)
	        }];
	        content.push({
	            element: 'input',
	            attributes: {
	                type: 'hidden',
	                autocomplete: 'off',
	                disabled: a.disabled === 'true' && '',
	                name: a.name,
	                value: params.value
	            }
	        });
	        /*content.push({
	            element : 'hiddeninput',
	            attributes : {
	                disabled : attributes.disabled,
	                name : attributes.name,
	                value : params.value
	            }
	        });*/
	        return {
	            element: 'span',
	            attributes: {
	                'data-instance': 'ListBox',
	                role: 'listbox',
	                tabindex: 'tabindex' in a ? a.tabindex : a.disabled === 'true' || '0',
	                'aria-label': a.label,
	                'aria-disabled': a.disabled,
	                'aria-multiselectable': a.multiselectable,
	                'class': (0, _mix2.default)(a.view || 'listbox', a.mix)
	            },
	            content: content
	        };
	    });
	    domTransform.element('option', function (_ref2, params) {
	        var a = _ref2.attributes;
	        var content = _ref2.content;

	        var result = {
	            element: 'span',
	            attributes: {
	                'data-instance': 'Option',
	                role: 'option',
	                'aria-selected': a.selected,
	                'aria-checked': a.checked,
	                'data-value': a.value,
	                'class': (0, _mix2.default)(a.view || 'option', a.mix)
	            },
	            content: content
	        };
	        if (a.checked === 'true') {
	            params.value = a.value;
	            params.text = content;
	        }
	        return result;
	    });
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _textinput = __webpack_require__(181);

	var _textinput2 = _interopRequireDefault(_textinput);

	var _button = __webpack_require__(168);

	var _button2 = _interopRequireDefault(_button);

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mixes = _mix2.default;

	exports.default = function (domTransform) {
	    (0, _textinput2.default)(domTransform);
	    (0, _button2.default)(domTransform);

	    domTransform.element('textbox', function (_ref) {
	        var _ref$attributes = _ref.attributes;
	        var _ref$attributes$insta = _ref$attributes.instance;
	        var instance = _ref$attributes$insta === undefined ? 'TextBox' : _ref$attributes$insta;
	        var _ref$attributes$view = _ref$attributes.view;
	        var view = _ref$attributes$view === undefined ? 'textbox' : _ref$attributes$view;
	        var role = _ref$attributes.role;
	        var disabled = _ref$attributes.disabled;
	        var name = _ref$attributes.name;
	        var value = _ref$attributes.value;
	        var placeholder = _ref$attributes.placeholder;
	        var hasclear = _ref$attributes.hasclear;
	        var label = _ref$attributes.label;
	        var mix = _ref$attributes.mix;
	        var readonly = _ref$attributes.readonly;
	        var content = _ref.content;

	        hasclear = hasclear === 'true' ? 'hasclear' : '';
	        if (!content || Array.isArray(content) && !content.length) {
	            content = {
	                element: 'textinput',
	                attributes: { role: role, name: name, value: value, placeholder: placeholder, disabled: disabled, readonly: readonly }
	            };
	            if (hasclear) content = [content, {
	                element: 'button',
	                attributes: {
	                    type: 'clear',
	                    tabindex: '-1',
	                    view: 'clearbutton',
	                    disabled: disabled,
	                    hidden: String(!value)
	                }
	            }];
	        }
	        return {
	            element: 'label',
	            attributes: {
	                'data-instance': instance,
	                'aria-label': label,
	                'class': mixes(view, mix, hasclear, disabled === 'true' && 'disabled')
	            },
	            content: this.apply(content)
	        };
	    });
	};

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('textinput', function (_ref) {
	        var a = _ref.attributes;

	        return {
	            element: 'input',
	            attributes: {
	                role: a.role,
	                type: a.type,
	                name: a.name,
	                value: a.value,
	                autocomplete: 'off',
	                placeholder: a.placeholder,
	                readonly: a.readonly === 'true' && 'readonly',
	                disabled: a.disabled === 'true' && 'disabled',
	                'class': (0, _mix2.default)(a.view || 'textinput box', a.mix)
	            }
	        };
	    });
	};

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('textarea', function (_ref) {
	        var a = _ref.attributes;

	        return {
	            element: 'label',
	            attributes: {
	                'data-instance': a.instance || 'TextBox',
	                'aria-label': a.label,
	                'class': (0, _mix2.default)(a.view || 'textbox', a.disabled === 'true' && 'disabled', a.mix)
	            },
	            content: {
	                element: 'textarea',
	                attributes: {
	                    autocomplete: 'off',
	                    disabled: a.disabled === 'true' && '',
	                    placeholder: a.placeholder,
	                    'class': 'box'
	                },
	                content: a.value
	            }
	        };
	    });
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _textbox = __webpack_require__(180);

	var _textbox2 = _interopRequireDefault(_textbox);

	var _textinput = __webpack_require__(181);

	var _textinput2 = _interopRequireDefault(_textinput);

	var _button = __webpack_require__(168);

	var _button2 = _interopRequireDefault(_button);

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    (0, _textbox2.default)(domTransform);
	    (0, _textinput2.default)(domTransform);
	    (0, _button2.default)(domTransform);

	    domTransform.element('passwordbox', function (_ref) {
	        var a = _ref.attributes;
	        var disabled = a.disabled;
	        var value = a.value;


	        return this.apply({
	            element: 'textbox',
	            attributes: {
	                instance: 'PasswordBox',
	                label: a.label,
	                view: a.view,
	                mix: (0, _mix2.default)('passwordbox', a.mix),
	                disabled: disabled
	            },
	            content: [{
	                element: 'textinput',
	                attributes: {
	                    type: 'password',
	                    name: a.name,
	                    value: value,
	                    placeholder: a.placeholder,
	                    disabled: disabled
	                }
	            }, {
	                element: 'button',
	                attributes: {
	                    type: 'watch',
	                    tabindex: '-1',
	                    view: 'watchbutton',
	                    hidden: String(!value),
	                    disabled: disabled
	                }
	            }]
	        });
	    });
	};

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _textbox = __webpack_require__(180);

	var _textbox2 = _interopRequireDefault(_textbox);

	var _textinput = __webpack_require__(181);

	var _textinput2 = _interopRequireDefault(_textinput);

	var _button = __webpack_require__(168);

	var _button2 = _interopRequireDefault(_button);

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    (0, _textbox2.default)(domTransform);
	    (0, _textinput2.default)(domTransform);
	    (0, _button2.default)(domTransform);

	    domTransform.element('numberbox', function (_ref) {
	        var a = _ref.attributes;

	        var disabled = a.disabled;
	        var textbox = this.apply({
	            element: 'textbox',
	            attributes: Object.assign(a, {
	                instance: a.instance || 'NumberBox',
	                mix: (0, _mix2.default)('numberbox', a.mix)
	            })
	        });
	        textbox.content = [textbox.content,
	        /*{ element : 'shiftbutton', value : '+1', content : '▲' },
	        { element : 'shiftbutton', value : '-1', content : '▼' },*/
	        this.apply({
	            element: 'button',
	            attributes: {
	                tabindex: '-1',
	                type: 'shift',
	                value: '+1',
	                disabled: disabled
	            },
	            content: '▲'
	        }), this.apply({
	            element: 'button',
	            attributes: {
	                tabindex: '-1',
	                type: 'shift',
	                value: '-1',
	                disabled: disabled
	            },
	            content: '▼'
	        })];
	        return textbox;
	    });
	};

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _textbox = __webpack_require__(180);

	var _textbox2 = _interopRequireDefault(_textbox);

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    (0, _textbox2.default)(domTransform);

	    domTransform.element('searchbox', function (_ref) {
	        var a = _ref.attributes;

	        return this.apply({
	            element: 'textbox',
	            attributes: Object.assign({
	                instance: 'SearchBox',
	                hasclear: 'true',
	                role: 'searchbox',
	                mix: (0, _mix2.default)('searchbox', a.mix)
	            }, a)
	        });
	    });
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _searchbox = __webpack_require__(185);

	var _searchbox2 = _interopRequireDefault(_searchbox);

	var _button = __webpack_require__(168);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    (0, _searchbox2.default)(domTransform);
	    (0, _button2.default)(domTransform);

	    domTransform.element('searchgroup', function (_ref) {
	        var attributes = _ref.attributes;
	        var content = _ref.content;

	        return {
	            element: 'form',
	            attributes: {
	                role: 'search',
	                'class': 'searchgroup'
	            },
	            content: this.apply(content.length ? content : [{
	                element: 'searchbox',
	                attributes: { label: attributes.label }
	            }, {
	                element: 'button',
	                attributes: { type: 'submit' },
	                content: attributes.buttontext || 'Search'
	            }])
	        };
	    });
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _textbox = __webpack_require__(180);

	var _textbox2 = _interopRequireDefault(_textbox);

	var _button = __webpack_require__(168);

	var _button2 = _interopRequireDefault(_button);

	var _textinput = __webpack_require__(181);

	var _textinput2 = _interopRequireDefault(_textinput);

	var _datepicker = __webpack_require__(167);

	var _datepicker2 = _interopRequireDefault(_datepicker);

	var _moment = __webpack_require__(58);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    (0, _textbox2.default)(domTransform);
	    (0, _button2.default)(domTransform);
	    (0, _textinput2.default)(domTransform);

	    domTransform.element('datebox', function (_ref) {
	        var a = _ref.attributes;

	        var disabled = a.disabled;
	        var value = a.value || (0, _moment2.default)(Date.now()).format('YYYY-MM-DD');
	        return this.apply({
	            element: 'textbox',
	            attributes: {
	                instance: 'DateBox',
	                label: a.label,
	                mix: ['datebox', a.mix].join(' ').trim(),
	                disabled: disabled
	            },
	            content: [{
	                element: 'textinput',
	                attributes: {
	                    name: a.name,
	                    value: (0, _moment2.default)(value, 'YYYY-MM-DD').format('DD.MM.YYYY'),
	                    readonly: 'true',
	                    disabled: disabled
	                }
	            }, {
	                element: 'button',
	                attributes: {
	                    tabindex: '-1',
	                    view: 'datebutton',
	                    disabled: disabled
	                }
	            }, {
	                element: 'datepicker',
	                attributes: { mix: 'popup', hidden: 'true', value: value }
	            }]
	        });
	    });
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _numberbox = __webpack_require__(184);

	var _numberbox2 = _interopRequireDefault(_numberbox);

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SEMISPACE = ' ';

	exports.default = function (domTransform) {
	    (0, _numberbox2.default)(domTransform);

	    domTransform.element('timebox', function (_ref) {
	        var a = _ref.attributes;

	        return this.apply({
	            element: 'numberbox',
	            attributes: Object.assign(a, {
	                instance: a.instance || 'TimeBox',
	                mix: (0, _mix2.default)(a.view || 'timebox', a.mix),
	                readonly: a.readonly || 'true',
	                value: a.value ? a.value.replace(/\s/g, SEMISPACE) : '-- : --'
	            })
	        });
	    });
	};

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _button = __webpack_require__(168);

	var _button2 = _interopRequireDefault(_button);

	var _listbox = __webpack_require__(179);

	var _listbox2 = _interopRequireDefault(_listbox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    (0, _button2.default)(domTransform);
	    (0, _listbox2.default)(domTransform);

	    domTransform.element('selectbox', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        var option = { text: '—', value: undefined };

	        var selectbox = {
	            element: 'span',
	            attributes: {
	                'data-instance': 'SelectBox',
	                role: 'combobox',
	                tabindex: a.disabled === 'true' || '0',
	                'aria-expanded': 'false',
	                'aria-disabled': a.disabled,
	                'class': 'selectbox',
	                'aria-label': a.label,
	                'data-emptyoption': JSON.stringify(option)
	            }
	        };

	        var listbox = this.apply({
	            element: 'listbox',
	            attributes: { mix: 'popup', tabindex: undefined },
	            content: content
	        }, option);

	        var button = this.apply({
	            element: 'button',
	            attributes: {
	                role: 'textbox',
	                readonly: 'true',
	                tabindex: undefined,
	                disabled: a.disabled
	            },
	            content: option.text
	        });

	        selectbox.content = [button, listbox];

	        return selectbox;
	    });
	};

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('menu', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        return {
	            element: 'div',
	            attributes: {
	                'data-instance': a.instance || 'Menu',
	                role: 'menu',
	                id: a.id,
	                hidden: '',
	                'class': (0, _mix2.default)(a.view || 'menu', 'popup', a.mix)
	            },
	            content: this.apply(content)
	        };
	    });
	    domTransform.element('menuitem', function (_ref2) {
	        var a = _ref2.attributes;
	        var content = _ref2.content;

	        return {
	            element: a.href ? 'a' : 'div',
	            attributes: {
	                'data-instance': 'MenuItem',
	                'data-type': a.type,
	                'aria-controls': a.controls,
	                role: 'menuitem',
	                tabindex: '-1',
	                href: a.href,
	                'class': (0, _mix2.default)(a.view || 'menuitem', a.mix)
	            },
	            content: this.apply(content)
	        };
	    });
	};

/***/ },
/* 191 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.element('menubutton', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        return this.apply({
	            element: 'button',
	            attributes: Object.assign(a, {
	                instance: 'MenuButton',
	                haspopup: 'true',
	                expanded: 'false',
	                view: a.view || 'button menubutton',
	                mix: a.mix
	            }),
	            content: content
	        });
	    });
	};

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('group', function (_ref, params) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        return {
	            element: 'span',
	            attributes: {
	                role: a.role || 'group',
	                id: a.id,
	                'aria-label': a.label,
	                'class': (0, _mix2.default)(a.view || 'group', a.mix)
	            },
	            content: this.apply(content, params)
	        };
	    });
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('dialog', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        return {
	            element: 'div',
	            attributes: {
	                'data-instance': a.instance || 'Dialog',
	                role: 'dialog',
	                id: a.id,
	                hidden: '',
	                'class': (0, _mix2.default)(a.view || 'dialog popup', a.mix),
	                'aria-modal': a.modal,
	                'data-assertive': a.assertive
	            },
	            content: this.apply(content)
	        };
	    });
	};

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _button = __webpack_require__(168);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    (0, _button2.default)(domTransform);

	    domTransform.element('dialogbutton', function (_ref) {
	        var attributes = _ref.attributes;
	        var content = _ref.content;

	        return this.apply({
	            element: 'button',
	            attributes: Object.assign({
	                instance: 'DialogButton',
	                haspopup: 'true',
	                expanded: 'false'
	            }, attributes),
	            content: content
	        });
	    });
	};

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mix = __webpack_require__(169);

	var _mix2 = _interopRequireDefault(_mix);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (domTransform) {
	    domTransform.element('tablist', function (_ref) {
	        var a = _ref.attributes;
	        var content = _ref.content;

	        var view = a.view || 'tablist';
	        return {
	            element: 'div',
	            attributes: {
	                'data-instance': 'TabList',
	                role: 'tablist',
	                'class': (0, _mix2.default)(view || 'tablist', a.mix),
	                'aria-controls': a.controls,
	                'aria-orientation': view === 'tabmenu' && 'vertical'
	            },
	            content: this.apply(content)
	        };
	    });
	    domTransform.element('tab', function (_ref2) {
	        var a = _ref2.attributes;
	        var content = _ref2.content;

	        return {
	            element: 'span',
	            attributes: {
	                'data-instance': 'Tab',
	                role: 'tab',
	                tabindex: a.selected === 'true' ? '0' : '-1',
	                'aria-controls': a.controls,
	                'aria-selected': a.selected,
	                'class': (0, _mix2.default)(a.view || 'tab', a.mix)
	            },
	            content: { element: 'span', content: content }
	        };
	    });
	    domTransform.element('tabpanel', function (_ref3) {
	        var a = _ref3.attributes;
	        var content = _ref3.content;

	        return {
	            element: 'div',
	            attributes: {
	                role: 'tabpanel',
	                id: a.id,
	                hidden: a.hidden === 'true' && '',
	                'class': (0, _mix2.default)(a.view || 'tabpanel', a.mix)
	            },
	            content: this.apply(content)
	        };
	    });
	};

/***/ },
/* 196 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.element('spin', function (_ref) {
	        var hidden = _ref.attributes.hidden;

	        return {
	            element: 'span',
	            attributes: {
	                'class': 'spin',
	                hidden: hidden === 'true' && ''
	            }
	        };
	    });
	};

/***/ },
/* 197 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.element('tree', function (_ref) {
	        var attributes = _ref.attributes;
	        var content = _ref.content;

	        return {
	            element: 'span',
	            attributes: {
	                'data-instance': 'Tree',
	                role: 'tree',
	                'class': attributes.view || 'tree'
	            },
	            content: this.apply(content, { first: null })
	        };
	    });
	    domTransform.element('treeitem', function (_ref2, params) {
	        var a = _ref2.attributes;
	        var content = _ref2.content;

	        var tabindex = '-1';
	        var children = {
	            element: 'span',
	            attributes: { 'class': 'label' },
	            content: a.label
	        };
	        if (!params.first) {
	            params.first = this;
	            tabindex = '0';
	        }
	        if (a.expanded && content) children = [{
	            element: 'span',
	            attributes: { role: 'button' }
	        }, children, this.apply({ element: 'group', content: content }, params)];
	        return {
	            element: 'span',
	            attributes: {
	                'data-instance': 'TreeItem',
	                role: 'treeitem',
	                tabindex: tabindex,
	                'aria-expanded': a.expanded,
	                'class': a.view || 'treeitem'
	            },
	            content: children
	        };
	    });
	};

/***/ },
/* 198 */
/***/ function(module, exports) {

	module.exports = "<main>\n    <article>\n        <h1>Link</h1>\n        <section>\n            <link href=\"//yandex.ru\">Simple</link>\n        </section>\n        <section>\n            <link href=\"//google.ru\" rel=\"external\">External</link>\n        </section>\n    </article>\n    <article>\n        <h1>Button</h1>\n        <!--<section>\n            <BUTTON>Native</BUTTON>\n        </section>-->\n        <section>\n            <button>Simple</button>\n        </section>\n        <section>\n            <button pressed=\"true\">Pressed toggle button</button>\n        </section>\n        <section>\n            <button disabled=\"true\">Disabled</button>\n        </section>\n        <section>\n            <button pressed=\"true\" disabled=\"true\">Pressed disabled toggle button</button>\n        </section>\n    </article>\n    <article>\n        <h1>Check box</h1>\n        <!--<section>\n            <label><input type=\"checkbox\"/> Native</label>\n        </section>-->\n        <section>\n            <checkbox name=\"checkbox\" value=\"on\">Simple</checkbox>\n        </section>\n        <section>\n            <checkbox checked=\"true\" name=\"checkbox-checked\" value=\"on\">Checked</checkbox>\n        </section>\n        <section>\n            <checkbox disabled=\"true\" name=\"checkbox-disabled\" value=\"on\">Disabled</checkbox>\n        </section>\n        <section>\n            <checkbox checked=\"true\" disabled=\"true\" name=\"checkbox-checked-disabled\" value=\"on\">Checked disabled</checkbox>\n        </section>\n    </article>\n    <article>\n        <h1>Radio group</h1>\n        <!--<section>\n            <span>\n                <label>Native</label><br/>\n                <label><input type=\"radio\" name=\"native-radio\"/> First</label>\n                <label><input type=\"radio\" name=\"native-radio\"/> Second</label>\n                <label><input type=\"radio\" name=\"native-radio\"/> Third</label>\n            </span>\n        </section>-->\n        <section>\n            <radiogroup name=\"radiogroup\" label=\"Simple\">\n                <radio value=\"first\">First</radio>\n                <radio value=\"second\">Second</radio>\n                <radio value=\"third\">Third</radio>\n            </radiogroup>\n        </section>\n        <section>\n            <radiogroup name=\"radiogroup-checked\" label=\"Checked\">\n                <radio value=\"first\">First</radio>\n                <radio value=\"second\" checked=\"true\">Second</radio>\n                <radio value=\"third\">Third</radio>\n            </radiogroup>\n        </section>\n        <section>\n            <radiogroup disabled=\"true\" name=\"radiogroup-checked-disabled\" label=\"Disabled\">\n                <radio value=\"first\">First</radio>\n                <radio value=\"second\">Second</radio>\n                <radio value=\"third\" checked=\"true\">Third</radio>\n            </radiogroup>\n        </section>\n    </article>\n    <article class=\"listboxstand\">\n        <h1>List box</h1>\n        <!--<section>\n            <label>\n                Native<br/>\n                <SELECT multiple=\"\">\n                    <OPTION>First</OPTION>\n                    <OPTION>Second</OPTION>\n                    <OPTION>Third</OPTION>\n                </SELECT>\n            </label>\n        </section>-->\n        <section>\n            <listbox name=\"listbox\" label=\"Simple\">\n                <option value=\"first\">First option</option>\n                <option value=\"second\">Second option</option>\n                <option value=\"third\">Third option</option>\n            </listbox>\n        </section>\n        <!--<section>\n            <listbox multiselectable=\"true\" name=\"listbox-multiselectable\" label=\"Multiselectable\">\n                <option value=\"first\">First option</option>\n                <option value=\"second\">Second option</option>\n                <option value=\"third\">Third option</option>\n            </listbox>\n        </section>-->\n        <section>\n            <listbox disabled=\"true\" name=\"listbox-disabled\" label=\"Disabled\">\n                <option value=\"first\">First option</option>\n                <option value=\"second\" selected=\"true\">Second option</option>\n                <option value=\"third\">Third option</option>\n            </listbox>\n        </section>\n    </article>\n    <article>\n        <h1>Check list box</h1>\n        <section>\n            <listbox name=\"checklistbox\" label=\"Simple\">\n                <option value=\"first\" checked=\"false\">First option</option>\n                <option value=\"second\" checked=\"false\">Second option</option>\n                <option value=\"third\" checked=\"false\">Third option</option>\n            </listbox>\n        </section>\n        <section>\n            <listbox disabled=\"true\" name=\"checklistbox-disabled\" label=\"Disabled\">\n                <option value=\"first\" checked=\"false\">First option</option>\n                <option value=\"second\" checked=\"true\">Second option</option>\n                <option value=\"third\" checked=\"false\">Third option</option>\n            </listbox>\n        </section>\n    </article>\n    <article>\n        <h1>Text box</h1>\n        <!--<section>\n            <label>Native<br/><input/></label>\n        </section>-->\n        <section>\n            <textbox label=\"Simple\"/>\n        </section>\n        <section>\n            <textbox value=\"Hover me\" label=\"Has clear\" hasclear=\"true\"/>\n        </section>\n        <section>\n            <textbox placeholder=\"Hint\" label=\"Has placeholder\"/>\n        </section>\n        <section>\n            <textbox disabled=\"true\" value=\"Unlock me\" label=\"Disabled\"/>\n        </section>\n    </article>\n    <article>\n        <h1>Text area</h1>\n        <!--<section>\n            <label>Native<br/><TEXTAREA></TEXTAREA></label>\n        </section>-->\n        <section>\n            <textarea label=\"Simple\"/>\n        </section>\n        <section>\n            <textarea disabled=\"true\" value=\"You know how\" label=\"Disabled\"/>\n        </section>\n    </article>\n    <article>\n        <h1>Password box</h1>\n        <!--<section>\n            <label>Native<br/><input type=\"password\"/></label>\n        </section>-->\n        <section>\n            <passwordbox label=\"Simple\" value=\"secret\"/>\n        </section>\n        <section>\n            <passwordbox label=\"Disabled\" disabled=\"true\" value=\"secret\"/>\n        </section>\n    </article>\n    <article>\n        <h1>Number box</h1>\n        <!--<section>\n            <label>Native<br/><input type=\"Number\"/></label>\n        </section>-->\n        <section>\n            <numberbox label=\"Simple\"/>\n        </section>\n        <section>\n            <numberbox label=\"Disabled\" disabled=\"true\"/>\n        </section>\n    </article>\n    <article>\n        <h1>Time box</h1>\n        <!--<section>\n            <label>Native<br/><input type=\"time\"/></label>\n        </section>-->\n        <section>\n            <timebox label=\"Simple\"/>\n        </section>\n        <section>\n            <timebox disabled=\"true\" label=\"Disabled\" value=\"22 : 23\"/>\n        </section>\n    </article>\n    <article>\n        <h1>Date box</h1>\n        <!--<section>\n            <label>Native<br/><input type=\"date\" value=\"2011-11-11\"/></label>\n        </section>-->\n        <section>\n            <datebox label=\"Simple\" value=\"2016-06-12\"/>\n        </section>\n        <section>\n            <datebox disabled=\"true\" label=\"Disabled\" value=\"2016-06-12\"/>\n        </section>\n    </article>\n    <article>\n        <h1>Search box</h1>\n        <!--<section>\n            <label>Native<br/><input type=\"Search\"/></label>\n        </section>-->\n        <section>\n            <searchbox label=\"Simple\"/>\n        </section>\n        <section>\n            <searchbox label=\"Request\" value=\"Press ESC key\"/>\n        </section>\n        <section>\n            <searchbox label=\"Disabled\" disabled=\"true\"/>\n        </section>\n    </article>\n    <article>\n        <h1>Search group</h1>\n        <!--<section>\n            <label>Native<br/><input type=\"Search\"/><BUTTON>Search</BUTTON></label>\n        </section>-->\n        <section>\n            <searchgroup label=\"Simple\"/>\n        </section>\n        <section>\n            <searchgroup>\n                <searchbox label=\"Accent\"/>\n                <button type=\"submit\" mix=\"accent\">Search</button>\n            </searchgroup>\n        </section>\n    </article>\n    <article>\n        <h1>Select box</h1>\n        <!--<section>\n            <label>\n                Native<br/>\n                <SELECT>\n                    <OPTION>First</OPTION>\n                    <OPTION>Second</OPTION>\n                    <OPTION>Third</OPTION>\n                </SELECT>\n            </label>\n        </section>-->\n        <section>\n            <selectbox label=\"Simple\">\n                <option checked=\"false\" value=\"one\">First option</option>\n                <option checked=\"false\" value=\"two\">Second option</option>\n                <option checked=\"false\" value=\"three\">Third option</option>\n            </selectbox>\n        </section>\n        <section>\n            <selectbox label=\"Checked\">\n                <option checked=\"false\" value=\"one\">First option</option>\n                <option checked=\"true\" value=\"two\">Second option</option>\n                <option checked=\"false\" value=\"three\">Third option</option>\n            </selectbox>\n        </section>\n        <section>\n            <selectbox label=\"Disabled\" disabled=\"true\">\n                <option checked=\"false\" value=\"one\">First option</option>\n                <option checked=\"true\" value=\"two\">Second option</option>\n                <option checked=\"false\" value=\"three\">Third option</option>\n            </selectbox>\n        </section>\n    </article>\n    <article>\n        <h1>Menu button</h1>\n        <section>\n            <menubutton controls=\"simplemenu\">Simple menu</menubutton>\n            <menu id=\"simplemenu\">\n                <menuitem>First menu item</menuitem>\n                <menuitem>Second menu item</menuitem>\n                <menuitem>Third menu item</menuitem>\n            </menu>\n        </section>\n        <section>\n            <menubutton controls=\"menuitemlinks\">Menu item links</menubutton>\n            <menu id=\"menuitemlinks\">\n                <menuitem href=\"//yandex.ru\">First menu item</menuitem>\n                <menuitem href=\"//google.com\">Second menu item</menuitem>\n                <menuitem href=\"//microsoft.com\">Third menu item</menuitem>\n            </menu>\n        </section>\n    </article>\n    <article>\n        <h1>Dialog</h1>\n        <section>\n            <dialogbutton controls=\"simpledialog\">Simple dialog</dialogbutton>\n            <dialog id=\"simpledialog\">\n                <h3>Dialog title</h3>\n                <textbox/> <button>Submit</button>\n            </dialog>\n        </section>\n        <section>\n            <dialogbutton controls=\"assertivedialog\">Assertive dialog</dialogbutton>\n            <dialog id=\"assertivedialog\" assertive=\"true\">\n                <h3>Dialog title</h3>\n                <textbox/> <button>Submit</button>\n                <button type=\"close\" mix=\"closebutton\" title=\"Close dialog\"/>\n            </dialog>\n        </section>\n        <section>\n            <dialogbutton controls=\"modaldialog\">Modal dialog</dialogbutton>\n            <dialog id=\"modaldialog\" modal=\"true\">\n                <h3>Dialog title</h3>\n                <textbox/> <button>Submit</button>\n            </dialog>\n        </section>\n        <section>\n            <dialogbutton controls=\"assertivemodaldialog\">Assertive modal dialog</dialogbutton>\n            <dialog id=\"assertivemodaldialog\" modal=\"true\" assertive=\"true\">\n                <h3>Dialog title</h3>\n                <textbox/> <button>Submit</button>\n                <button type=\"close\" mix=\"closebutton\" title=\"Close dialog\"/>\n            </dialog>\n        </section>\n    </article>\n    <article>\n        <h1>Tab list</h1>\n        <section>\n            <tablist>\n                <tab controls=\"tabpanel1\" selected=\"true\">One</tab>\n                <tab controls=\"tabpanel2\">Two</tab>\n                <tab controls=\"tabpanel3\">Three</tab>\n            </tablist>\n            <group view=\"tabpanelgroup\">\n                <tabpanel id=\"tabpanel1\">1</tabpanel>\n                <tabpanel id=\"tabpanel2\" hidden=\"true\">2</tabpanel>\n                <tabpanel id=\"tabpanel3\" hidden=\"true\">3</tabpanel>\n            </group>\n        </section>\n    </article>\n    <article>\n        <h1>Tree</h1>\n        <tree>\n            <treeitem expanded=\"true\" label=\"First\">\n                <treeitem label=\"Nested 1\"/>\n                <treeitem label=\"Nested 2\"/>\n            </treeitem>\n            <treeitem expanded=\"true\" label=\"Second\">\n                <treeitem expanded=\"false\" label=\"Nested 1\">\n                    <treeitem label=\"Subnested I\"/>\n                    <treeitem label=\"Subnested II\"/>\n                    <treeitem label=\"Subnested III\"/>\n                </treeitem>\n                <treeitem label=\"Nested 2\"/>\n            </treeitem>\n            <treeitem expanded=\"true\" label=\"Third\">\n                <treeitem expanded=\"true\" label=\"Nested 1\">\n                    <treeitem expanded=\"true\" label=\"Subnested\">\n                        <treeitem label=\"Deepnested\"/>\n                    </treeitem>\n                </treeitem>\n                <treeitem expanded=\"false\" label=\"Nested 2\">\n                    <treeitem label=\"Subnested\"/>\n                </treeitem>\n            </treeitem>\n        </tree>\n    </article>\n    <article>\n        <h1>Grid</h1>\n        <section>\n            <grid rows=\"3\" columns=\"3\" label=\"Simple\"/>\n        </section>\n        <section>\n            <grid multiselectable=\"true\" label=\"Multiselectable\">\n                <row><gridcell>1 — 1</gridcell><gridcell>1 — 2</gridcell><gridcell>1 — 3</gridcell></row>\n                <row><gridcell>2 — 1</gridcell><gridcell>2 — 2</gridcell><gridcell>2 — 3</gridcell></row>\n                <row><gridcell>3 — 1</gridcell><gridcell>3 — 2</gridcell><gridcell>3 — 3</gridcell></row>\n            </grid>\n        </section>\n        <section>\n            <grid rows=\"3\" columns=\"3\" disabled=\"true\" label=\"Disabled\"/>\n        </section>\n    </article>\n    <article>\n        <h1>Date picker</h1>\n        <section>\n            <datepicker label=\"Simple\"/>\n        </section>\n    </article>\n    <article class=\"mixes\">\n        <h1>Mixes</h1>\n        <section>\n            <button view=\"link\">Button as link</button>\n        </section>\n        <section>\n            <link href=\"//yandex.ru\" mix=\"button\">Link as button</link>\n        </section>\n        <section>\n            <checkbox name=\"checkbox-button\" value=\"on\" view=\"button\">Check button</checkbox>\n        </section>\n        <section>\n            <group label=\"Check button group\" view=\"buttongroup\">\n                <checkbox view=\"button\">One</checkbox>\n                <checkbox view=\"button\">Two</checkbox>\n            </group>\n        </section>\n        <section>\n            <radiogroup name=\"radio-button-group\" label=\"Radio button group\" view=\"buttongroup\" mix=\"radiobuttongroup\">\n                <radio view=\"button\" value=\"first\">One</radio>\n                <radio view=\"button\" value=\"second\">Two</radio>\n                <radio view=\"button\" value=\"third\">Three</radio>\n            </radiogroup>\n        </section>\n        <section class=\"tabbuttongroupexample\">\n            <h1>Tab button group</h1>\n            <tablist view=\"buttongroup\">\n                <tab controls=\"tabbuttonpanel1\" view=\"button\" selected=\"true\">One</tab>\n                <tab controls=\"tabbuttonpanel2\" view=\"button\">Two</tab>\n                <tab controls=\"tabbuttonpanel3\" view=\"button\">Three</tab>\n            </tablist>\n            <group>\n                <tabpanel id=\"tabbuttonpanel1\">1</tabpanel>\n                <tabpanel id=\"tabbuttonpanel2\" hidden=\"true\">2</tabpanel>\n                <tabpanel id=\"tabbuttonpanel3\" hidden=\"true\">3</tabpanel>\n            </group>\n        </section>\n        <section class=\"tabmenuexample\">\n            <h1>Tab menu</h1>\n            <tablist view=\"tabmenu\" mix=\"menu\" controls=\"tabpanelgroup\">\n                <tab controls=\"tabpanelmenu1\" selected=\"true\" view=\"menuitem\">One</tab>\n                <tab controls=\"tabpanelmenu2\" view=\"menuitem\">Two</tab>\n                <tab controls=\"tabpanelmenu3\" view=\"menuitem\">Three</tab>\n            </tablist>\n            <group id=\"tabpanelgroup\">\n                <tabpanel id=\"tabpanelmenu1\">1</tabpanel>\n                <tabpanel id=\"tabpanelmenu2\" hidden=\"true\">2</tabpanel>\n                <tabpanel id=\"tabpanelmenu3\" hidden=\"true\">3</tabpanel>\n            </group>\n        </section>\n    </article>\n    <article>\n        <h1>Spin</h1>\n        <spin/>\n    </article>\n</main>\n"

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(200);

	var ua = navigator.userAgent.toLowerCase();
	if (ua.includes('firefox')) __webpack_require__(235);
	if (ua.includes('webkit')) __webpack_require__(237);

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(201);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(234)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./yandex.all.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./yandex.all.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports
	exports.i(__webpack_require__(203), "");
	exports.i(__webpack_require__(204), "");
	exports.i(__webpack_require__(205), "");
	exports.i(__webpack_require__(206), "");
	exports.i(__webpack_require__(207), "");
	exports.i(__webpack_require__(209), "");
	exports.i(__webpack_require__(210), "");
	exports.i(__webpack_require__(212), "");
	exports.i(__webpack_require__(214), "");
	exports.i(__webpack_require__(216), "");
	exports.i(__webpack_require__(218), "");
	exports.i(__webpack_require__(219), "");
	exports.i(__webpack_require__(220), "");
	exports.i(__webpack_require__(221), "");
	exports.i(__webpack_require__(223), "");
	exports.i(__webpack_require__(226), "");
	exports.i(__webpack_require__(227), "");
	exports.i(__webpack_require__(228), "");
	exports.i(__webpack_require__(229), "");
	exports.i(__webpack_require__(230), "");
	exports.i(__webpack_require__(231), "");
	exports.i(__webpack_require__(232), "");
	exports.i(__webpack_require__(233), "");

	// module
	exports.push([module.id, "\n", ""]);

	// exports


/***/ },
/* 202 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, "body\n{\n    font: 13px Arial;\n}\n[hidden]\n{\n    display: none !important;\n}\n\n/*\n.group\n{\n    display: inline-block;\n}\n.group[aria-label]::before\n{\n    content: attr(aria-label);\n    display: block;\n    margin-bottom: 5px;\n    cursor: default;\n}\n*/\n", ""]);

	// exports


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".link\n{\n    color: #04b;\n}\n.link:not(:focus):not(:hover)\n{\n    text-decoration: none;\n}\n.link:focus\n{\n    box-shadow: 0 0 0 2px #ffdb4d;\n    outline: none;\n}\n.link:hover\n{\n    color: #c00;\n    cursor: pointer;\n}\n.link:active,\n.link.active\n{\n    background: #f3f1ed;\n}\n.link[aria-disabled]\n{\n    color: #ccc;\n    cursor: default;\n}\n.link[rel~=external]:not(:hover)\n{\n    color: #070;\n}\n.link.dim:not(:hover)\n{\n    color: #aaa;\n}\n.link.button:not(:hover)\n{\n    color: #000;\n}\n", ""]);

	// exports


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".button\n{\n    display: inline-block;\n    outline: none;\n    white-space: nowrap;\n    cursor: pointer;\n    background: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    border-radius: 3px;\n    padding: 5px 12px;\n    box-sizing: border-box;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n}\nbutton.button\n{\n    font: inherit;\n    padding: 5px 9px;\n}\nbutton.button::-moz-focus-inner\n{\n    border: 0;\n}\n.button:hover\n{\n    border-color: rgba(0, 0, 0, 0.3);\n}\n.button:focus\n{\n    border-color: #ffdb4d;\n    box-shadow: inset 0 0 0 1px #ffdb4d;\n}\n.button:active,\n.button.active\n{\n    background: #f3f1ed;\n}\n.button[aria-pressed=true],\n.button[aria-checked=true],\n.button[aria-selected=true]\n{\n    background: #ffeba0;\n}\n.button[aria-pressed=true]:active,\n.button[aria-pressed=true].active,\n.button[aria-checked=true]:active,\n.button[aria-checked=true].active,\n.button[aria-selected=true]:active,\n.button[aria-selected=true].active\n{\n    background: #fee481;\n}\n.button[aria-disabled=true]\n{\n    cursor: default;\n    color: rgba(0, 0, 0, 0.5);\n    background: rgba(0, 0, 0, 0.08);\n    border-color: transparent;\n}\n.button[aria-pressed=true][aria-disabled=true],\n.button[aria-checked=true][aria-disabled=true],\n.button[aria-selected=true][aria-disabled=true]\n{\n    background: rgba(0, 0, 0, 0.15);\n    border-color: transparent;\n}\n\n.button.accent\n{\n    background: #ffdb4d;\n    border-color: transparent;\n}\n.button.accent:hover\n{\n    background: #ffd633;\n}\n.button.accent:focus\n{\n    border-color: transparent;\n    box-shadow: none;\n    animation-name: button-accent-focus;\n    animation-duration: 1s;\n    animation-iteration-count: infinite;\n    animation-timing-function: linear;\n}\n.button.accent:active\n{\n    background: #ffcc00;\n}\n@keyframes button-accent-focus\n{\n    from, to\n    {\n        background: #ffcc00;\n    }\n    40%, 60%\n    {\n        background: #ffe066;\n    }\n}\n\n/* checkbutton */\n\n.button[role=checkbox]\n{\n    border-radius: 7px;\n}\n\n/* radiobutton */\n\n.button[role=radio]\n{\n    border-radius: 13px;\n}\n\n/* tabbutton */\n\n.button[role=tab]\n{\n    padding-top: 0;\n    padding-bottom: 0;\n}\n.button[role=tab] > span\n{\n    padding-top: 4px;\n    padding-bottom: 5px;\n    display: inline-block;\n    border-top: 1px solid transparent;\n}\n.button[role=tab][aria-selected=true]:not(:focus) > span\n{\n    border-top-color: black;\n}\n.button[role=tab]:hover\n{\n    color: #c00;\n}\n\n\n", ""]);

	// exports


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".buttongroup\n{\n    display: inline-block;\n}\n.buttongroup .button:not(:focus):not(:last-of-type)\n{\n    border-right-width: 0;\n}\n.buttongroup .button:focus + .button\n{\n    border-left-width: 0;\n}\n.buttongroup .button[aria-checked=true] + .button:not(:focus):not(:hover)\n{\n    border-left-color: rgba(153, 122, 0, 0.5);\n}\n.buttongroup:hover .button:hover + .button:not(:focus)\n{\n    border-left-color: rgba(0, 0, 0, 0.3);\n}\n.buttongroup .button:not(:first-of-type)\n{\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.buttongroup .button:not(:last-of-type)\n{\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.buttongroup[aria-label]::before\n{\n    content: attr(aria-label);\n    display: block;\n    margin-bottom: 5px;\n    cursor: default;\n}\n", ""]);

	// exports


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".checkbox\n{\n    display: inline-block;\n    outline: none;\n    white-space: nowrap;\n    cursor: pointer;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n}\n.checkbox .box\n{\n    background: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    border-radius: 3px;\n    display: inline-block;\n    width: 12px;\n    height: 12px;\n    margin-right: 6px;\n    position: relative;\n    vertical-align: top;\n}\n.checkbox:hover .box\n{\n    border-color: rgba(0, 0, 0, 0.3);\n}\n.checkbox:focus .box\n{\n    border-color: #ffdb4d;\n}\n.checkbox:focus .box\n{\n    box-shadow: inset 0 0 0 1px #ffdb4d;\n}\n.checkbox:active .box,\n.checkbox.active .box\n{\n    background: #f3f1ed;\n}\n.checkbox[aria-checked=true] .box,\n.checkbox[aria-checked=mixed] .box\n{\n    background: #ffeba0;\n}\n.checkbox[aria-checked=true]:active .box,\n.checkbox[aria-checked=mixed]:active .box,\n.checkbox[aria-checked=true].active .box,\n.checkbox[aria-checked=mixed].active .box\n{\n    background: #fee481;\n}\n.checkbox[aria-disabled=true]\n{\n    cursor: default;\n    color: rgba(0, 0, 0, 0.5);\n}\n.checkbox[aria-disabled=true] .box\n{\n    background: rgba(0, 0, 0, 0.08);\n    border-color: transparent;\n}\n.checkbox[aria-checked=true][aria-disabled=true] .box\n{\n    background: rgba(0, 0, 0, 0.15);\n    border-color: transparent;\n}\n.checkbox[aria-checked=true][aria-disabled=true] .box::before\n{\n    opacity: 0.4;\n}\n.checkbox[aria-checked=true] .box::before\n{\n    content: url(" + __webpack_require__(208) + ");\n    position: absolute;\n    top: -6px;\n    left: 1px;\n}\n.checkbox[aria-checked=mixed] .box::before\n{\n    content: '';\n    display: inline-block;\n    background: #000;\n    width: 8px;\n    height: 2px;\n    top: 5px;\n    left: 2px;\n    position: absolute;\n}\n", ""]);

	// exports


/***/ },
/* 208 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' width='15px' height='16px'%3E %3Cpolygon points='13.512,0.453 5.475,12.478 1.708,8.28 0.667,9.605 5.603,15.058 14.722,1.613'/%3E %3C/svg%3E\""

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".radio\n{\n    display: inline-block;\n    outline: none;\n    white-space: nowrap;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n}\n.radio\n{\n    cursor: pointer;\n}\n.radio .box\n{\n    background: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    display: inline-block;\n    width: 12px;\n    height: 12px;\n    margin-right: 6px;\n    position: relative;\n    vertical-align: top;\n    border-radius: 50%;\n}\n.radiogroup\n{\n    display: inline-block;\n}\n.radiogroup .radio\n{\n    margin-right: 10px;\n}\n.radiogroup[aria-label]::before\n{\n    content: attr(aria-label);\n    display: block;\n    margin-bottom: 5px;\n    cursor: default;\n}\n.radio:hover .box\n{\n    border-color: rgba(0, 0, 0, 0.3);\n}\n.radio:focus .box\n{\n    border-color: #ffdb4d;\n}\n.radio:focus .box\n{\n    box-shadow: inset 0 0 0 1px #ffdb4d;\n}\n.radio:active .box,\n.radio.active .box\n{\n    background: #f3f1ed;\n}\n.radio[aria-checked=true] .box\n{\n    background: #ffeba0;\n}\n.radio[aria-checked=true] .box::before\n{\n    content: '';\n    width: 6px;\n    height: 6px;\n    border-radius: 50%;\n    background: #000;\n    position: absolute;\n    top: 3px;\n    left: 3px;\n}\n.radio[aria-checked=true]:active .box,\n.radio[aria-checked=true].active .box\n{\n    background: #fee481;\n}\n.radio[aria-disabled=true],\n.radiogroup[aria-disabled=true],\n.radiogroup[aria-disabled=true] .radio\n{\n    cursor: default;\n    color: rgba(0, 0, 0, 0.5);\n}\n.radio[aria-disabled=true] .box,\n.radiogroup[aria-disabled=true] .radio .box\n{\n    background: rgba(0, 0, 0, 0.08);\n    border-color: transparent;\n}\n.radio[aria-checked=true][aria-disabled=true] .box,\n.radiogroup[aria-disabled=true] .radio[aria-checked=true] .box\n{\n    background: rgba(0, 0, 0, 0.15);\n    border-color: transparent;\n}\n.radio[aria-checked=true][aria-disabled=true] .box::before,\n.radiogroup[aria-disabled=true] .radio[aria-checked=true] .box::before\n{\n    opacity: 0.4;\n}\n", ""]);

	// exports


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".listbox\n{\n    display: inline-block;\n    outline: none;\n    white-space: nowrap;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n}\n.listbox .box\n{\n    background: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    display: block;\n    position: relative;\n    overflow: auto;\n    outline: none;\n}\n.listbox .option\n{\n    display: block;\n    position: relative;\n    height: 24px;\n    padding: 0 13px;\n    line-height: 25px;\n    cursor: pointer;\n}\n.listbox .option[aria-checked]\n{\n    padding: 0 30px;\n}\n.listbox:not([aria-disabled=true]) .option:hover/*:not([aria-selected])*/\n{\n    background: rgba(0, 0, 0, 0.01);\n}\n.listbox .option:first-child\n{\n    margin-top: 4px;\n}\n.listbox .option:last-child\n{\n    margin-bottom: 4px;\n}\n\n/* hover */\n\n.listbox:hover .box\n{\n    border-color: rgba(0, 0, 0, 0.3);\n}\n\n/* focus */\n\n.listbox:focus .box\n{\n    border-color: #ffdb4d;\n    box-shadow: 0 0 0 1px #ffdb4d;\n}\n\n/* option selected */\n/*.listbox:not([aria-disabled=true]) .option[aria-selected=true]:not([aria-checked])\n{\n    background: rgba(0, 0, 0, 0.1);\n}*/\n\n.listbox:focus span[role=option].option[aria-selected=true],\n.listbox:not([aria-disabled=true]) .option[aria-selected=true]:not([aria-checked])\n{\n    background: #ffeba0;\n}\n.listbox:focus span[role=option].option[aria-selected=true]:active,\n.listbox:focus span[role=option].option[aria-selected=true].active\n{\n    background: #fee481;\n}\n.listbox .option[aria-checked=true]::before\n{\n    content: url(" + __webpack_require__(211) + ");\n    position: absolute;\n    top: 2px;\n    left: 10px;\n}\n\n.listbox[aria-disabled=true] .box\n{\n    background: rgba(0, 0, 0, 0.08);\n    border-color: transparent;\n}\n.listbox[aria-disabled=true],\n.listbox[aria-disabled=true] .option\n{\n    cursor: default;\n    color: rgba(0, 0, 0, 0.5);\n}\n\n.listbox[aria-disabled=true] .option[aria-selected=true]:not([aria-checked])\n{\n    background: rgba(0, 0, 0, 0.1);\n}\n.listbox[aria-disabled=true] .option[aria-checked=true]::before\n{\n    opacity: 0.4;\n}\n.listbox[aria-label]::before\n{\n    content: attr(aria-label);\n    display: block;\n    margin-bottom: 5px;\n    cursor: default;\n}\n", ""]);

	// exports


/***/ },
/* 211 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' width='13px' height='14px'%3E %3Cpolygon points='11.45,0.418 4.493,10.825 1.233,7.192 0.332,8.34 4.604,13.059 12.497,1.422'/%3E %3C/svg%3E\""

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".selectbox\n{\n    display: inline-block;\n    outline: none;\n}\n.selectbox .button\n{\n    position: relative;\n    padding-right: 24px;\n}\n.selectbox:focus .button\n{\n    border-color: #ffdb4d;\n    box-shadow: inset 0 0 0 1px #ffdb4d;\n}\n.selectbox.active .button\n{\n    background: #f3f1ed;\n}\n.selectbox .button::after\n{\n    content: url(" + __webpack_require__(213) + ");\n    position: absolute;\n    top: 4px;\n    right: 6px;\n    transition: transform 0.1s ease-out 0s;\n}\n.selectbox[aria-disabled=true]\n{\n    color: rgba(0, 0, 0, 0.5);\n}\n.selectbox[aria-disabled=true] .button::after\n{\n    opacity: 0.2;\n}\n.selectbox[aria-label]::before\n{\n    content: attr(aria-label);\n    display: block;\n    margin-bottom: 5px;\n    cursor: default;\n}\n.selectbox .listbox\n{\n    display: block;\n}\n.selectbox .listbox .box\n{\n    border: none;\n}\n.selectbox[aria-expanded=true] .button::after\n{\n    transform: rotate(-180deg) translateY(-2px);\n}\n.selectbox[aria-expanded=false] .listbox\n{\n    display: none;\n}\n.selectbox:focus .listbox .option[aria-selected=true]\n{\n    background: #ffeba0;\n}\n.selectbox .listbox .option[aria-selected=true]:active,\n.selectbox .listbox .option[aria-selected=true].active\n{\n    background: #fee481;\n}\n", ""]);

	// exports


/***/ },
/* 213 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='6'%3E %3Cpath d='M10.08 0L5.5 4.36.91 0 0 .86l5.5 5.25L11 .86z'/%3E %3C/svg%3E\""

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".textbox\n{\n    display: inline-block;\n    position: relative;\n}\n.textbox > .box\n{\n    background: #fff;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    font: inherit;\n    padding: 5px 8px;\n    outline: none;\n    box-sizing: border-box;\n    width: 180px;\n}\n.textbox:hover > .box\n{\n    border-color: rgba(0, 0, 0, 0.3);\n}\n.textbox > .box:focus,\n.textbox.focus > .box\n{\n    border-color: #ffdb4d;\n    box-shadow: inset 0 0 0 1px #ffdb4d;\n}\n.textbox.disabled,\n.textbox > .box:disabled\n{\n    cursor: default;\n    color: rgba(0, 0, 0, 0.5);\n}\n.textbox > .box:disabled\n{\n    background: rgba(0, 0, 0, 0.08);\n    border-color: transparent;\n}\n.textbox[aria-label]::before\n{\n    content: attr(aria-label);\n    display: block;\n    margin-bottom: 5px;\n    cursor: default;\n}\n.textbox.hasclear > .box\n{\n    padding-right: 26px;\n}\n.textbox .clearbutton\n{\n    display: none;\n    width: 27px;\n    height: 27px;\n    background: url(" + __webpack_require__(215) + ") no-repeat 50% 50%;\n    position: absolute;\n    right: 1px;\n    opacity: 0.25;\n    outline: none;\n}\n.textbox:hover .clearbutton,\n.textbox.focus .clearbutton\n{\n    display: inline-block;\n}\n.textbox:not(.disabled) .clearbutton:hover\n{\n    cursor: pointer;\n    opacity: 1;\n}\n.textbox[aria-invalid=true] > .box\n{\n    border-color: red;\n}\n\n.textboxgroup\n{\n    display: inline-block;\n}\n.textboxgroup .textbox:not(:last-child) > .box\n{\n    border-right: none;\n}\n.textboxgroup .textbox.focus + .textbox > .box\n{\n    border-left-color: #ffdb4d;\n}\n.textboxgroup .textbox.hover:not(.focus) + .textbox:not(:focus) > .box\n{\n    border-left-color: rgba(0, 0, 0, 0.3);\n}\n\n\n/*.textboxgroup\n{\n    display: inline-block;\n}\n.textboxgroup .textinput:not(:focus):not(:last-of-type)\n{\n    border-right-width: 0;\n}\n.textboxgroup .textinput:focus + .textinput\n{\n    border-left-width: 0;\n}\n.textboxgroup .textinput[aria-checked=true] + .textinput:not(:focus):not(:hover)\n{\n    border-left-color: rgba(153, 122, 0, 0.5);\n}\n.textboxgroup:hover .textinput:hover + .textinput:not(:focus)\n{\n    border-left-color: rgba(0, 0, 0, 0.3);\n}*/\n", ""]);

	// exports


/***/ },
/* 215 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E %3Cpath d='M10 .7L9.3 0 5 4.3.7 0 0 .7 4.3 5 0 9.3l.7.7L5 5.7 9.3 10l.7-.7L5.7 5z'/%3E %3C/svg%3E\""

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".passwordbox .box\n{\n    padding-right: 26px;\n}\n.passwordbox .watchbutton\n{\n    display: inline-block;\n    width: 27px;\n    height: 27px;\n    background: url(" + __webpack_require__(217) + ") no-repeat 50% 50%;\n    position: absolute;\n    right: 1px;\n    opacity: 0.25;\n    outline: none;\n}\n.passwordbox:not(.disabled) .watchbutton:hover\n{\n    cursor: pointer;\n    opacity: 0.5;\n}\n.passwordbox.disabled .watchbutton\n{\n    opacity: 0.1;\n}\n", ""]);

	// exports


/***/ },
/* 217 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg width='14px' height='14px' viewBox='0 0 14 14' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath stroke='none' fill-rule='evenodd' fill='%23000000' d='M0,7.5 C0,7.5 2.8,3 7,3 C11.2,3 14,7.5 14,7.5 C14,7.5 11.2,12 7,12 C2.8,12 0,7.5 0,7.5 L0,7.5 Z M7,4.5 C8.5463,4.5 9.8,5.84325 9.8,7.5 C9.8,9.15675 8.5463,10.5 7,10.5 C5.4537,10.5 4.2,9.15675 4.2,7.5 C4.2,5.84325 5.4537,4.5 7,4.5 L7,4.5 Z M7,6 C7.7735,6 8.4,6.67125 8.4,7.5 C8.4,8.328 7.7735,9 7,9 C6.2272,9 5.6,8.328 5.6,7.5 C5.6,6.67125 6.2272,6 7,6 L7,6 Z'%3E%3C/path%3E %3C/svg%3E\""

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".numberbox .box\n{\n    width: 80px;\n    padding-right: 26px;\n}\n.numberbox .button\n{\n    position: absolute;\n    right: 3px;\n    border: none;\n    opacity: 0.25;\n    font-size: 9px;\n    padding: 0 5px;\n}\n.numberbox:not(.disabled) .button:hover\n{\n    background: rgba(0, 0, 0, 0.2);\n    opacity: 0.5;\n}\n.numberbox .button:active\n{\n    background: rgba(0, 0, 0, 0.3);\n}\n.numberbox .button:focus\n{\n    box-shadow: none;\n}\n.numberbox .button[data-value=\"+1\"]\n{\n    bottom: 14px;\n}\n.numberbox .button[data-value=\"-1\"]\n{\n    bottom: 3px;\n}\n.numberbox.disabled .button\n{\n    background: transparent;\n    cursor: default;\n}\n.timebox .box\n{\n    cursor: default;\n}\n", ""]);

	// exports


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".searchbox .box\n{\n    border-radius: 3px;\n}\n", ""]);

	// exports


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".searchgroup .searchbox .box\n{\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-right: none;\n}\n.searchgroup .searchbox.focus + .button\n{\n    border-left-color: #ffdb4d;\n}\n.searchgroup .searchbox:hover:not(.focus) + .button:not(.accent):not(:focus)\n{\n    border-left-color: rgba(0, 0, 0, 0.3);\n}\n.searchgroup .button\n{\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n", ""]);

	// exports


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".datebox > .box\n{\n    width: 120px;\n    padding-right: 26px;\n}\n.datebox .datebutton\n{\n    display: inline-block;\n    width: 27px;\n    height: 27px;\n    background: url(" + __webpack_require__(222) + ") no-repeat 50% 50%;\n    position: absolute;\n    right: 1px;\n    opacity: 0.2;\n    outline: none;\n}\n.datebox:not(.disabled) .datebutton:hover\n{\n    cursor: pointer;\n    opacity: 0.5;\n}\n.datebox.disabled .datebutton\n{\n    opacity: 0.1;\n}\n.datebox .datepicker\n{\n    display: block;\n    padding: 7px;\n    text-align: center;\n    /*position: absolute;\n    border: 1px solid rgba(0, 0, 0, 0.3);\n    background: white;\n    z-index : 1;*/\n}\n.datebox .datepicker .box\n{\n    border : none;\n}\n", ""]);

	// exports


/***/ },
/* 222 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg width='19' height='14' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M5 4h4v-4h-4v4m5 0h4v-4h-4v4m5-4v4h4v-4h-4m-15 9h4v-4h-4v4m5 0h4v-4h-4v4m5 0h4v-4h-4v4m5 0h4v-4h-4v4m-15 5h4v-4h-4v4m5 0h4v-4h-4v4m5 0h4v-4h-4v4'/%3E %3C/svg%3E\""

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".datepicker\n{\n    background: #fff;\n    width: 250px;\n    display: inline-block;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n}\n.datepicker .box\n{\n    padding: 7px;\n    border : 1px solid rgba(0, 0, 0, 0.1);\n    text-align: center;\n    border-radius: 3px;\n}\n.datepicker:hover .box\n{\n    border-color: rgba(0, 0, 0, 0.2);\n}\n.datepicker .button\n{\n    box-sizing: content-box;\n    width: 15px;\n    height: 15px;\n    background-repeat: no-repeat;\n    background-position: center center;\n}\n.datepicker .button:not(:focus)/*:not(:hover)*/\n{\n    border-color: transparent;\n}\n.datepicker .header .button:not(:focus):hover\n{\n    /*border-color: rgba(0, 0, 0, 0.15);*/\n    background-color: rgba(0, 0, 0, 0.02);\n}\n.datepicker .button[data-value=\"-1\"]\n{\n    float: left;\n    background-image: url(" + __webpack_require__(224) + ");\n}\n.datepicker .button[data-value=\"+1\"]\n{\n    float: right;\n    background-image: url(" + __webpack_require__(225) + ");\n}\n.datepicker [role=heading]\n{\n    display: inline-block;\n    padding: 6px;\n    margin-bottom: 5px;\n}\n.datepicker table.grid\n{\n    width: 100%;\n}\n.datepicker table.grid:hover td.gridcell\n{\n    border-color: rgba(0, 0, 0, 0.1);\n    /*border-color: transparent;*/\n}\n\n.datepicker th\n{\n    padding: 2px 2px 6px;\n}\n.datepicker table.grid td.gridcell\n{\n    cursor: pointer;\n    border: 1px solid transparent;\n    padding: 7px 8px;\n}\n.datepicker td.gridcell[data-weekday=\"5\"],\n.datepicker td.gridcell[data-weekday=\"6\"]\n{\n    color: #c00;\n}\n.datepicker td.gridcell[aria-current=date]\n{\n    background: rgba(0, 0, 0, 0.05);\n}\n.datepicker td.gridcell:hover:not([aria-disabled=true])\n{\n    border-color: rgba(0, 0, 0, 0.3);\n}\n.datepicker td.gridcell:active\n{\n    background: #f3f1ed;\n}\n.datepicker td.gridcell[aria-selected=true]\n{\n    background: #ffeba0;\n}\n.datepicker td.gridcell[aria-selected=true]:not(:focus)::before\n{\n    box-shadow: none;\n}\n.datepicker td.gridcell[aria-selected=true]:active\n{\n    background: #fee481;\n}\n.datepicker table.grid td.gridcell[aria-disabled=true]\n{\n    cursor: default;\n    color: rgba(0, 0, 0, 0.5);\n    background-color: transparent;\n}\n.datepicker[aria-label]::before\n{\n    content: attr(aria-label);\n    display: block;\n    margin-bottom: 5px;\n    cursor: default;\n}\n\n", ""]);

	// exports


/***/ },
/* 224 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' width='6px' height='12px'%3E %3Cpolygon fill='%23010101' points='5.463,1.626 1.215,6.008 5.463,10.39 4.856,11.016 0,6.008 4.856,1'/%3E %3C/svg%3E\""

/***/ },
/* 225 */
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' width='6px' height='12px'%3E %3Cpolygon fill='%23010101' points='0,1.626 4.248,6.008 0,10.39 0.607,11.016 5.463,6.008 0.607,1'/%3E %3C/svg%3E\""

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".menu\n{\n    outline: none;\n    white-space: nowrap;\n    background: #fff;\n    padding: 4px 0;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n}\n.menu .menuitem\n{\n    display: block;\n    position: relative;\n    padding: 0 13px;\n    line-height: 25px;\n    cursor: pointer;\n    outline: none;\n    border-left: 2px solid transparent;\n}\n.menu:hover .box\n{\n    border-color: rgba(0, 0, 0, 0.3);\n}\n.menu .menuitem:focus\n{\n    background: #ffeba0;\n}\n.menu .menuitem:focus:active,\n.menu .menuitem:focus.active\n{\n    background: #fee481;\n}\n.menu a.menuitem\n{\n    color: #000;\n    text-decoration: none;\n}\n.menu a.menuitem:focus[href]\n{\n    color: #c00;\n    text-decoration: underline;\n}\n\n.menubutton\n{\n    position: relative;\n    padding-right: 24px;\n}\n.menubutton::after\n{\n    content: url(" + __webpack_require__(213) + ");\n    position: absolute;\n    top: 4px;\n    right: 6px;\n    transition: transform 0.1s ease-out 0s;\n}\n.menubutton[aria-expanded=true]\n{\n    border-color: #ffdb4d;\n    box-shadow: inset 0 0 0 1px #ffdb4d;\n}\n.menubutton[aria-expanded=true]::after\n{\n    transform: rotate(-180deg) translateY(-2px);\n}\n\n", ""]);

	// exports


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".tabmenu\n{\n    border-left: 1px solid rgba(0, 0, 0, 0.1);\n    border-right: 1px solid rgba(0, 0, 0, 0.1);\n}\n.tabmenu:hover\n{\n    border-color: rgba(0, 0, 0, 0.2);\n}\n.tabmenu .menuitem[aria-selected=true]\n{\n    border-left: 2px solid black;\n}\n.tabmenu .menuitem:focus\n{\n    border-left: 2px solid #ffdb4d;\n}\n.tabmenu .menuitem:hover:not(:focus)\n{\n    /*background: rgba(0, 0, 0, 0.01);*/\n    color: #c00;\n}\n", ""]);

	// exports


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".popup\n{\n    position: absolute;\n    margin-top: 3px;\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06), 0 10px 20px -5px rgba(0, 0, 0, 0.4);\n    background: #fff;\n    z-index: 1;\n}\n", ""]);

	// exports


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".dialog\n{\n    padding: 15px;\n}\n\n.dialog h3\n{\n    margin-top: 0;\n}\n\n.backdrop\n{\n    display: table;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 1;\n}\n\n.backdrop > div\n{\n    display: table-cell;\n    vertical-align: middle;\n    text-align: center;\n}\n\n.backdrop .dialog\n{\n    display: inline-block;\n    z-index: 2;\n    box-sizing: border-box;\n    position: relative;\n    text-align: left;\n    margin: 0;\n}\n\n.dialog .closebutton\n{\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 10px;\n    background-image: url(" + __webpack_require__(215) + ");\n    background-repeat: no-repeat;\n    background-position: 50% 50%;\n    opacity: 0.5;\n}\n.dialog .closebutton:hover\n{\n    opacity: 1;\n}\n.dialog .closebutton:not(:focus)\n{\n    border-color: transparent;\n}\n", ""]);

	// exports


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".spin\n{\n    display: inline-block;\n    box-sizing: border-box;\n    border: 2px solid transparent;\n    border-radius: 50%;\n    animation: spin 1s infinite linear;\n    width: 28px;\n    height: 28px;\n}\n\n@keyframes spin\n{\n    from\n    {\n        border-top-color: #fc0;\n        border-left-color: #fc0;\n        transform: rotate(0deg);\n    }\n    to\n    {\n        border-top-color: #fc0;\n        border-left-color: #fc0;\n        transform: rotate(360deg);\n    }\n}\n", ""]);

	// exports


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".tablist\n{\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n}\n.tablist:hover\n{\n    border-color: rgba(0, 0, 0, 0.2);\n}\n.tablist .tab\n{\n    color: #aaa;\n    display: inline-block;\n    padding: 0 15px;\n    border-radius: 0;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n}\n.tablist .tab:hover\n{\n    color: #c00;\n}\n.tablist .tab > span\n{\n    display: block;\n    padding: 16px 0 18px;\n    border-top: 2px solid transparent;\n}\n.tablist .tab[aria-selected=true]\n{\n    color: black;\n    cursor: default;\n}\n.tablist .tab[aria-selected=true] > span\n{\n    border-top: 2px solid black;\n}\n.tablist .tab:focus > span\n{\n    border-color: #ffdb4d;\n}\n", ""]);

	// exports


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".tree\n{\n    display: inline-block;\n    padding-left: 20px;\n    -moz-user-select: none;\n}\n.tree .group\n{\n    display: block;\n    padding-left: 20px;\n}\n.treeitem\n{\n    display: block;\n    position: relative;\n    cursor: pointer;\n    outline: none;\n}\n.treeitem:focus\n{\n    box-shadow: 0 0 0 2px #ffdb4d;\n}\n.treeitem[aria-expanded] > [role=button]\n{\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    color: rgba(0, 0, 0, 0.5);\n    left: -18px;\n    line-height: 11px;\n    padding: 0 2px;\n    position: absolute;\n    top: 4px;\n    border-radius: 2px;\n\n    /*left: 5px;\n    background: white;*/\n}\n.treeitem[aria-expanded] > [role=button]:hover\n{\n    border-color: rgba(0, 0, 0, 0.3);\n    color: #000;\n}\n.treeitem[aria-expanded=false] > [role=button]::before\n{\n    content: '+';\n}\n.treeitem[aria-expanded=true] > [role=button]::before\n{\n    content: '\\2212';\n}\n.treeitem[aria-expanded=false] .group\n{\n    display: none;\n}\n.treeitem .label\n{\n    display: block;\n    padding: 3px 2px;\n}\n.treeitem[aria-selected=true] > .label\n{\n    background: #ffeba0;\n}\n\n.tree\n{\n    padding-left: 0;\n}\n.treeitem[aria-expanded] > [role=button]\n{\n    left: 5px;\n    background: white;\n}\n.treeitem .label\n{\n    padding: 3px 23px;\n}\n", ""]);

	// exports


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".grid\n{\n    border-collapse: collapse;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n}\n.grid[aria-label]::before\n{\n    content: attr(aria-label);\n    display: inline-block;\n    margin-bottom: 5px;\n    cursor: default;\n}\n.grid .gridcell\n{\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    outline: none;\n    width: 80px;\n    height: 16px;\n    position: relative;\n    padding: 5px;\n    text-align: center;\n    cursor: default;\n}\n.grid .gridcell input\n{\n    font: inherit;\n    border: none;\n    padding: 0;\n    width: 100%;\n    text-align: inherit;\n    outline: none;\n}\n.grid .gridcell::before\n{\n    content: '';\n    /*display: none;*/\n    border: 1px solid transparent;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n.grid:not([aria-disabled=true]):hover .gridcell\n{\n    border-color: rgba(0, 0, 0, 0.2);\n}\n.grid:not([aria-disabled=true]) .gridcell:hover\n{\n    background: rgba(0, 0, 0, 0.01);\n}\n.grid .gridcell:focus::before,\n.grid .gridcell.focus::before\n{\n    display: block;\n    border-color: #ffdb4d;\n    box-shadow: 0 0 0 1px #ffdb4d;\n    z-index: 1;\n}\n.grid .gridcell[aria-selected=true]::before\n{\n    display: block;\n    box-shadow: 0 0 0 1px #ffdb4d;\n    background: rgba(255, 235, 160, 0.05);\n}\n.grid[aria-disabled=true],\n.grid .gridcell[aria-disabled=true]\n{\n    color: rgba(0, 0, 0, 0.5);\n}\n.grid[aria-disabled=true] .gridcell,\n.grid .gridcell[aria-disabled=true]\n{\n    background: rgba(0, 0, 0, 0.08);\n}\n.grid[aria-disabled=true] .gridcell\n{\n    border-color: transparent;\n}\n", ""]);

	// exports


/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(236);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(234)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./grid.moz.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./grid.moz.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".grid .gridcell::before\n{\n    top: -1px;\n    left: -1px;\n    right: 1px;\n    bottom: 1px;\n}\n.grid[aria-disabled=true] .gridcell::before\n{\n    display: block;\n    box-shadow: 0 0 0 1px #fff;\n}\n", ""]);

	// exports


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(238);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(234)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./grid.webkit.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./grid.webkit.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, ".grid .gridcell\n{\n    border-color: #d8d8d8;\n}\n.grid:not([aria-disabled=true]):hover .gridcell\n{\n    border-color: #ccc;\n}\n", ""]);

	// exports


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(240);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(234)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./showcase.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./showcase.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(202)();
	// imports


	// module
	exports.push([module.id, "article\n{\n    display: inline-block;\n    padding: 0 20px;\n    margin-right: 80px;\n    vertical-align: top;\n}\nsection\n{\n    margin: 20px 0;\n}\n\n.listbox .box\n{\n    max-height: 150px;\n}\n.selectbox .button\n{\n    min-width: 130px;\n}\n.tabpanel\n{\n    text-align: center;\n    font-size: 46px;\n    opacity: 0.3;\n    cursor: default;\n    padding: 15px;\n}\n.tabpanel:hover\n{\n    background: rgba(0, 0, 0, 0.05);\n}\n\narticle.mixes\n{\n    width: 430px;\n}\narticle.mixes section\n{\n    display: inline-block;\n    margin-top: 4px;\n    margin-right: 30px;\n}\narticle.mixes section.tabbuttongroupexample\n{\n    vertical-align: top;\n}\narticle.mixes section.tabmenuexample .tabmenu\n{\n    display: inline-block;\n    width: 112px;\n}\narticle.mixes section.tabmenuexample .tabpanel\n{\n    display: inline-block;\n    min-width: 65px;\n    vertical-align: top;\n}\n\n.inlineblock\n{\n    display: inline-block !important;\n}\n\narticle.listboxstand .inlineblock\n{\n    margin-right: 20px;\n}\narticle.listboxstand .separator\n{\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n}\n", ""]);

	// exports


/***/ }
/******/ ]);