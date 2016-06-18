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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance3 = __webpack_require__(1);

	var _Instance4 = _interopRequireDefault(_Instance3);

	var _Button = __webpack_require__(2);

	var _Button2 = _interopRequireDefault(_Button);

	var _TextBox = __webpack_require__(4);

	var _TextBox2 = _interopRequireDefault(_TextBox);

	var _CheckBox = __webpack_require__(5);

	var _CheckBox2 = _interopRequireDefault(_CheckBox);

	var _Dialog = __webpack_require__(6);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _DOMTransform = __webpack_require__(7);

	var _DOMTransform2 = _interopRequireDefault(_DOMTransform);

	var _DON = __webpack_require__(8);

	var _DON2 = _interopRequireDefault(_DON);

	var _button = __webpack_require__(9);

	var _button2 = _interopRequireDefault(_button);

	var _textbox = __webpack_require__(10);

	var _textbox2 = _interopRequireDefault(_textbox);

	var _checkbox = __webpack_require__(11);

	var _checkbox2 = _interopRequireDefault(_checkbox);

	var _dialog = __webpack_require__(12);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import components


	// import template engine


	// import templates


	// create application components

	var TodoApp = function (_Instance) {
	    _inherits(TodoApp, _Instance);

	    function TodoApp(element) {
	        _classCallCheck(this, TodoApp);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoApp).call(this, element));

	        element.appendChild(_DON2.default.toDOM(domTransform.apply({ element: 'todoapp' })));
	        element.querySelector('form').addEventListener('submit', _this.onSubmit.bind(_this));
	        _this.list = element.querySelector('ul');
	        _this.attach(_Button2.default, _TextBox2.default, _CheckBox2.default, TodoItem);
	        return _this;
	    }

	    _createClass(TodoApp, [{
	        key: 'attach',
	        value: function attach() {
	            var _this2 = this;

	            for (var _len = arguments.length, components = Array(_len), _key = 0; _key < _len; _key++) {
	                components[_key] = arguments[_key];
	            }

	            components.forEach(function (Component) {
	                return Component.attachTo(_this2.element);
	            });
	        }
	    }, {
	        key: 'onSubmit',
	        value: function onSubmit(event) {
	            var textbox = this.find(_TextBox2.default);
	            var text = textbox.value.trim();
	            if (text) {
	                this.list.appendChild(_DON2.default.toDOM(domTransform.apply({ element: 'todoitem', text: text })));
	                textbox.value = '';
	            } else textbox.element.focus();
	            event.preventDefault();
	        }
	    }]);

	    return TodoApp;
	}(_Instance4.default);

	var TodoItem = function (_Instance2) {
	    _inherits(TodoItem, _Instance2);

	    function TodoItem(element) {
	        _classCallCheck(this, TodoItem);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoItem).call(this, element));

	        _this3.dialog = _Dialog2.default.getInstance(document.getElementById('removeitemconfirm'));
	        _this3.onDialogSubmit = _this3.onDialogSubmit.bind(_this3);
	        return _this3;
	    }

	    _createClass(TodoItem, [{
	        key: 'onDialogSubmit',
	        value: function onDialogSubmit(event) {
	            this.expanded = 'false';
	            this.remove();
	            event.preventDefault();
	        }
	    }, {
	        key: 'onButtonClick',
	        value: function onButtonClick() {
	            if (this.find(_CheckBox2.default).checked === 'true') this.remove();else {
	                this.dialog.trigger = this;
	                this.expanded = 'true';
	            }
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            this.element.closest('ul').removeChild(this.element);
	        }
	    }, {
	        key: 'focus',
	        value: function focus() {
	            this.find(_Button2.default).focus();
	        }
	    }, {
	        key: 'expanded',
	        get: function get() {
	            return this.element.getAttribute('aria-expanded') || 'false';
	        },
	        set: function set(expanded) {
	            if (expanded !== this.expanded) {
	                this.element.setAttribute('aria-expanded', expanded);
	                if (expanded === 'true') {
	                    this.dialog.element.addEventListener('submit', this.onDialogSubmit);
	                    this.dialog.hidden = 'false';
	                } else {
	                    this.dialog.element.removeEventListener('submit', this.onDialogSubmit);
	                    this.dialog.hidden = 'true';
	                }
	            }
	        }
	    }], [{
	        key: 'attachTo',
	        value: function attachTo(node) {
	            var _this4 = this;

	            node.addEventListener('click', function (event) {
	                var target = event.target;
	                var button = _Button2.default.getInstance(target);
	                if (button && button.type === 'remove') {
	                    var item = _this4.getInstance(target.closest('[data-instance=TodoItem]'));
	                    if (item) item.onButtonClick(event);
	                }
	            });
	        }
	    }]);

	    return TodoItem;
	}(_Instance4.default);

	// create template engine instance


	var domTransform = new _DOMTransform2.default();

	// connect lib templates
	[_button2.default, _textbox2.default, _checkbox2.default, _dialog2.default].forEach(function (template) {
	    return template(domTransform);
	});

	// write application templates
	domTransform.element('todoapp', function () {
	    return this.apply({
	        element: 'main',
	        content: [{ element: 'h2', content: 'TODO list' }, { element: 'ul' }, {
	            element: 'form',
	            content: [{
	                element: 'textbox',
	                attributes: { placeholder: 'What are you going to do?' }
	            }, {
	                element: 'button',
	                attributes: { type: 'submit' },
	                content: 'Remember'
	            }]
	        }, {
	            element: 'confirmdialog',
	            attributes: {
	                text: 'Item is not marked as "done". Are you sure?',
	                id: 'removeitemconfirm',
	                submitLabel: 'Remove item'
	            }
	        }]
	    });
	});
	domTransform.element('confirmdialog', function (_ref) {
	    var attributes = _ref.attributes;
	    var content = _ref.content;

	    return this.apply({
	        element: 'dialog',
	        attributes: { modal: 'true', id: attributes.id },
	        content: content || {
	            element: 'form',
	            content: [{ element: 'p', content: attributes.text }, {
	                element: 'button',
	                attributes: { type: 'submit', mix: 'accent' },
	                content: attributes.submitLabel || 'Ok'
	            }, {
	                element: 'button',
	                attributes: { type: 'close' },
	                content: attributes.dismissLabel || 'Cancel'
	            }]
	        }
	    });
	});
	domTransform.element('todoitem', function (_ref2) {
	    var text = _ref2.text;

	    return this.apply({
	        element: 'li',
	        attributes: { 'data-instance': 'TodoItem', 'aria-haspopup': 'true' },
	        content: [{
	            element: 'checkbox',
	            attributes: { title: 'Mark as "done"' }
	        }, {
	            element: 'span',
	            attributes: { 'class': 'text' },
	            content: text
	        }, {
	            element: 'button',
	            attributes: { view: 'removebutton', type: 'remove', title: 'Remove' },
	            content: '×'
	        }]
	    });
	});

	// init app
	new TodoApp(document.body);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var map = Array.prototype.map;

	var Instance = function () {
	    function Instance(element) {
	        _classCallCheck(this, Instance);

	        element.instance = this;
	        this.element = element;
	    }

	    _createClass(Instance, [{
	        key: 'on',
	        value: function on(type, listener, context) {
	            this.element.addEventListener(type, listener.bind(context || this));
	        }
	    }, {
	        key: 'emit',
	        value: function emit(type) {
	            this.element.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
	        }
	    }, {
	        key: 'find',
	        value: function find(Class, filter) {
	            return filter ? this.findAll(Class, filter)[0] || null : Class.getInstance(this.element.querySelector('[data-instance=' + Class.name + ']'));
	        }
	    }, {
	        key: 'findAll',
	        value: function findAll(Class, filter) {
	            var result = map.call(this.element.querySelectorAll('[data-instance=' + Class.name + ']'), function (element) {
	                return Class.getInstance(element);
	            });
	            return filter ? result.filter(filter) : result;
	        }
	    }, {
	        key: 'closest',
	        value: function closest(Class, filter) {
	            var instance = this;
	            do {
	                instance = Class.getInstance(instance.element.parentElement.closest('[data-instance=' + Class.name + ']'));
	            } while (instance && filter && !filter(instance));
	            return instance;
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            return this.element.id || '';
	        }
	    }, {
	        key: 'hidden',
	        get: function get() {
	            return String(this.element.hidden);
	        },
	        set: function set(hidden) {
	            this.element.hidden = hidden === 'true';
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return this.element.getAttribute('aria-disabled') || 'false';
	        },
	        set: function set(disabled) {
	            this.element.setAttribute('aria-disabled', disabled);
	        }
	    }], [{
	        key: 'getInstance',
	        value: function getInstance(element) {
	            return element && element.dataset && element.dataset.instance === this.name ? element.instance || new this(element) : null;
	        }
	    }, {
	        key: 'closestInstance',
	        value: function closestInstance(element) {
	            return this.getInstance(element.closest('[data-instance=' + this.name + ']'));
	        }
	    }]);

	    return Instance;
	}();

	exports.default = Instance;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Instance2 = __webpack_require__(1);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _keyCodes = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Button = function (_Instance) {
	    _inherits(Button, _Instance);

	    function Button(element) {
	        _classCallCheck(this, Button);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this, element));

	        _this.on('click', _this.onClick);
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
	                var element = this.element;
	                element.classList.remove('active');
	                element.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
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
	                this.element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
	            }
	            if (this.expanded) {
	                this.expanded = String(this.expanded === 'false');
	            }
	            if (this.type === 'submit') {
	                var form = this.element.closest('form');
	                if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
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

	    return Button;
	}(_Instance3.default);

	exports.default = Button;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(1);

	var _Instance3 = _interopRequireDefault(_Instance2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TextBox = function (_Instance) {
	    _inherits(TextBox, _Instance);

	    function TextBox(element) {
	        _classCallCheck(this, TextBox);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextBox).call(this, element));

	        _this.input = element.querySelector('input,textarea');
	        _this.input.addEventListener('blur', _this.onInputBlur.bind(_this));
	        if (element.classList.contains('hasclear')) {
	            _this.clear = element.querySelector('.clear');
	            _this.clear.addEventListener('click', _this.onClearClick.bind(_this));
	            _this.input.addEventListener('input', _this.onInputInput.bind(_this));
	        }
	        return _this;
	    }

	    _createClass(TextBox, [{
	        key: 'onInputInput',
	        value: function onInputInput() {
	            this.clear.hidden = !this.value;
	        }
	    }, {
	        key: 'onClearClick',
	        value: function onClearClick() {
	            this.value = '';
	            this.clear.hidden = true;
	        }
	    }, {
	        key: 'onInputFocus',
	        value: function onInputFocus() {
	            this.element.classList.add('focus');
	        }
	    }, {
	        key: 'onInputBlur',
	        value: function onInputBlur() {
	            this.element.classList.remove('focus');
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return String(this.input.disabled);
	        },
	        set: function set(disabled) {
	            if (this.input.disabled = disabled === 'true') this.element.classList.add('disabled');else this.element.classList.remove('disabled');
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

	            node.addEventListener('focus', function (event) {
	                var target = event.target,
	                    tagName = target.tagName;
	                if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
	                    var element = target.closest('[data-instance=TextBox]');
	                    if (element) _this2.getInstance(element).onInputFocus(event);
	                }
	            }, true);
	        }
	    }]);

	    return TextBox;
	}(_Instance3.default);

	exports.default = TextBox;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(1);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _keyCodes = __webpack_require__(3);

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
	            var element = this.element,
	                input = element.querySelector('input');
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
	                var element = this.element;
	                element.classList.remove('active');
	                element.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
	            }
	        }
	    }, {
	        key: 'onClick',
	        value: function onClick(event) {
	            if (this.disabled === 'true') event.stopImmediatePropagation();else {
	                this.checked = String(this.checked === 'false');
	                this.element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
	            }
	        }
	    }, {
	        key: 'checked',
	        get: function get() {
	            return this.element.getAttribute('aria-checked') || 'false';
	        },
	        set: function set(checked) {
	            var element = this.element,
	                input = this.input;
	            element.setAttribute('aria-checked', checked);
	            if (checked === 'true') element.appendChild(input);else element.removeChild(input);
	        }
	    }, {
	        key: 'disabled',
	        get: function get() {
	            return this.element.getAttribute('aria-disabled') || 'false';
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Instance2 = __webpack_require__(1);

	var _Instance3 = _interopRequireDefault(_Instance2);

	var _keyCodes = __webpack_require__(3);

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
	            var element = this.element,
	                backdrop = this.backdrop = document.createElement('div'),
	                div = document.createElement('div');
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
	            var widgets = this.widgets,
	                lastWidget = widgets[widgets.length - 1];
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
	            }),
	                node = void 0,
	                widgets = [];
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
	                        this.widgets[0].focus();
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
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	                return (/^\s*\n\s*$/.test(_text.content) ? null : _text
	                );
	            },
	            // text : text => text,
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

	    _createClass(DOMTransform, [{
	        key: 'node',
	        value: function node(name, transform) {
	            this.nodes[name] = transform;
	        }
	    }, {
	        key: 'element',
	        value: function element(name, transform) {
	            this.elements[name] = transform;
	        }
	    }, {
	        key: 'apply',
	        value: function apply(object, params) {
	            if (!object) {
	                return null;
	            } else if (Array.isArray(object)) {
	                var result = [],
	                    i = 0,
	                    item = void 0;
	                for (i; i < object.length; i++) {
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
	    }]);

	    return DOMTransform;
	}();

	exports.default = DOMTransform;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var map = Array.prototype.map,
	    reduce = Array.prototype.reduce,
	    domImplementation = document.implementation;

	var processChildNodes = function processChildNodes(node) {
	    return map.call(node.childNodes, function (child) {
	        return DON.fromDOM(child);
	    });
	};

	var processContent = function processContent(content, element) {
	    Array.isArray(content) ? content.forEach(function (item) {
	        return processContent(item, element);
	    }) : element.appendChild(DON.toDOM(content));
	};

	var DON = {
	    fromDOM: function fromDOM(node) {
	        switch (node.nodeType) {
	            case Node.ELEMENT_NODE:
	                return {
	                    node: 'element',
	                    element: node.tagName,
	                    attributes: reduce.call(node.attributes, function (res, attr) {
	                        res[attr.name] = attr.value;
	                        return res;
	                    }, {}),
	                    content: processChildNodes(node)
	                };
	            case Node.TEXT_NODE:
	                return {
	                    node: 'text',
	                    content: node.textContent
	                };
	            case Node.COMMENT_NODE:
	                return {
	                    node: 'comment',
	                    content: node.textContent
	                };
	            case Node.DOCUMENT_NODE:
	                return {
	                    node: 'document',
	                    content: processChildNodes(node)
	                };
	            case Node.DOCUMENT_TYPE_NODE:
	                return {
	                    node: 'doctype',
	                    name: node.name
	                };
	            default:
	                throw Error('Unsupported node');
	        }
	    },
	    toDOM: function toDOM(object) {
	        if (Array.isArray(object)) {
	            return object.map(function (item) {
	                return DON.toDOM(item);
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
	                var element = document.createElement(object.element),
	                    attributes = object.attributes,
	                    content = object.content;
	                if (attributes) {
	                    var name = void 0,
	                        value = void 0;
	                    for (name in attributes) {
	                        value = attributes[name];
	                        if (typeof value !== 'undefined') {
	                            element.setAttribute(name, value);
	                        }
	                    }
	                }
	                if (content) processContent(content, element);
	                return element;
	            case 'text':
	                return document.createTextNode(object.content);
	            case 'comment':
	                return document.createComment(object.content);
	            case 'document':
	                return object.type === 'html' ? domImplementation.createHTMLDocument(object.title) : domImplementation.createDocument(object.namespaceURI || null, object.qualifiedNameStr, object.documentType || null);
	            case 'doctype':
	                return domImplementation.createDocumentType(object.name, object.publicId, object.systemId);
	            default:
	                throw Error('Unsupported node');
	        }
	    }
	};

	exports.default = DON;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.element('button', function (_ref) {
	        var attributes = _ref.attributes;
	        var content = _ref.content;

	        return {
	            element: 'span',
	            attributes: {
	                'data-instance': attributes.instance || 'Button',
	                role: attributes.role || 'button',
	                tabindex: attributes.disabled === 'true' ? undefined : attributes.tabindex || '0',
	                title: attributes.title,
	                'class': [attributes.view || 'button', attributes.mix].join(' ').trim(),
	                'aria-disabled': attributes.disabled,
	                'aria-pressed': attributes.pressed,
	                'aria-haspopup': attributes.haspopup,
	                'aria-controls': attributes.controls,
	                'aria-expanded': attributes.expanded,
	                'data-type': attributes.type,
	                'data-value': attributes.value
	            },
	            content: this.apply(content)
	        };
	    });
	};

	/*export const button = ({ attributes, content }) => ({
	    element : 'span',
	    instance : attributes.instance || 'Button',
	    role : attributes.role || 'button',
	    tabindex : attributes.disabled === 'true'? undefined : '0',
	    title : attributes.title,
	    classes : [attributes.view || 'button', attributes.mix],
	    disabled : attributes.disabled,
	    pressed : attributes.pressed,
	    haspopup : attributes.haspopup,
	    controls : attributes.controls,
	    expanded : attributes.expanded,
	    action : attributes.action,
	    value : attributes.value,
	    content
	});*/

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.element('textbox', function (_ref) {
	        var attributes = _ref.attributes;

	        var content = [{
	            element: 'input',
	            attributes: {
	                autocomplete: 'off',
	                disabled: attributes.disabled === 'true' ? '' : undefined,
	                placeholder: attributes.placeholder,
	                value: attributes.value,
	                'class': 'box'
	            }
	        }];
	        if (attributes.hasclear === 'true') {
	            content.push({
	                element: 'span',
	                attributes: {
	                    role: 'button',
	                    tabindex: attributes.disabled === 'true' ? undefined : '-1',
	                    'aria-disabled': String(attributes.disabled === 'true'),
	                    'class': 'clear',
	                    hidden: attributes.value ? undefined : ''
	                }
	            });
	        }
	        return {
	            element: 'label',
	            attributes: {
	                'data-instance': 'TextBox',
	                'aria-label': attributes.label,
	                'class': [attributes.view || 'textbox', attributes.hasclear === 'true' ? 'hasclear' : undefined, attributes.disabled === 'true' ? 'disabled' : undefined, attributes.mix].join(' ').trim()
	            },
	            content: content
	        };
	    });
	    domTransform.element('textarea', function (_ref2) {
	        var attributes = _ref2.attributes;

	        return {
	            element: 'label',
	            attributes: {
	                'data-instance': 'TextBox',
	                'aria-label': attributes.label,
	                'class': [attributes.view || 'textbox', attributes.disabled === 'true' ? 'disabled' : '', attributes.mix].join(' ').trim()
	            },
	            content: {
	                element: 'textarea',
	                attributes: {
	                    autocomplete: 'off',
	                    disabled: attributes.disabled === 'true' ? '' : undefined,
	                    placeholder: attributes.placeholder,
	                    'class': 'box'
	                },
	                content: attributes.value
	            }
	        };
	    });
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.element('checkbox', function (_ref) {
	        var attributes = _ref.attributes;
	        var content = _ref.content;

	        var view = attributes.view || 'checkbox';

	        content = this.apply(view === 'checkbox' ? [{
	            element: 'span',
	            attributes: { 'class': 'box' }
	        }, content] : content);

	        if (attributes.checked === 'true') {
	            content.push({
	                element: 'input',
	                attributes: {
	                    type: 'hidden',
	                    autocomplete: 'off',
	                    disabled: attributes.disabled === 'true' ? '' : undefined,
	                    name: attributes.name,
	                    value: attributes.value
	                }
	            });
	        }
	        return {
	            element: 'span',
	            attributes: {
	                'data-instance': 'CheckBox',
	                role: 'checkbox',
	                tabindex: attributes.disabled === 'true' ? undefined : '0',
	                id: attributes.id,
	                title: attributes.title,
	                'aria-disabled': attributes.disabled,
	                'aria-checked': attributes.checked,
	                'aria-controls': attributes.controls,
	                'class': view
	            },
	            content: content
	        };
	    });
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (domTransform) {
	    domTransform.element('dialog', function (_ref) {
	        var attributes = _ref.attributes;
	        var content = _ref.content;

	        return {
	            element: 'div',
	            attributes: {
	                'data-instance': attributes.instance || 'Dialog',
	                role: 'dialog',
	                id: attributes.id,
	                hidden: '',
	                'class': 'dialog popup',
	                'aria-modal': attributes.modal,
	                'data-assertive': attributes.assertive
	            },
	            content: this.apply(content)
	        };
	    });
	};

/***/ }
/******/ ]);