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

	var DateInput = __webpack_require__(1);

	$(function () {});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var getDatepicker = __webpack_require__(2);

	var datePicker = getDatepicker();

	var DateInput = function () {
	    function DateInput() {
	        _classCallCheck(this, DateInput);

	        // this.year = o.year;
	        // this.month = o.month;
	        // this.day = o.day;
	        var me = this;

	        datePicker.on('ok', function () {
	            me.year = this.$year.number;
	            me.month = this.$month.number;
	            me.day = this.$day.number;
	            $(me.element).html(me.year + '-' + me.month + '-' + me.day);
	        });
	        datePicker.on('cancel', function () {});

	        this.init();
	        return this;
	    }

	    _createClass(DateInput, [{
	        key: 'init',
	        value: function init() {
	            var me = this;
	            var $dp = $('[data-datepicker]').removeAttr('data-datepicker');
	            if ($dp.length) {
	                $dp.on('touchend', function () {
	                    me.element = $(this);
	                    var date = me.element.html().trim().split('-');
	                    datePicker.reinit({
	                        year: +date[0],
	                        month: +date[1],
	                        day: +date[2]
	                    });
	                    datePicker.show();
	                });
	            }
	        }
	    }]);

	    return DateInput;
	}();

	$(document).ready(function () {
	    new DateInput({});
	});

	module.exports = DateInput;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 * @Author: Yard
	 * @Date: 2016-12-26 17:23:55
	 * @Last Modified by: Yard
	 * @Last Modified time: 2016-12-28 19:35:38
	 */
	__webpack_require__(3);
	var List = __webpack_require__(7);

	/**
	 * 伪观察者，同名事件会相互覆盖
	 */
	function toArray(arr, start, end) {
	    return Array.prototype.slice.call(arr, start || 0, end || arr.length);
	}

	var Observer = function () {
	    function Observer() {
	        _classCallCheck(this, Observer);

	        this._events = {};
	    }

	    _createClass(Observer, [{
	        key: 'on',
	        value: function on(type, fn) {
	            this._events[type] = fn;
	            return this;
	        }
	    }, {
	        key: 'trigger',
	        value: function trigger(type) {
	            var fn = this._events[type];
	            if (fn) {
	                var args = toArray(arguments, 1);
	                fn.apply(this, args);
	            }
	            return this;
	        }
	    }, {
	        key: 'off',
	        value: function off(type) {
	            delete this._events[type];
	            this._events[type] = null;
	            return this;
	        }
	    }]);

	    return Observer;
	}();

	var Datepicker = function (_Observer) {
	    _inherits(Datepicker, _Observer);

	    function Datepicker(o) {
	        _classCallCheck(this, Datepicker);

	        var _this = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this));

	        _this.init(o);
	        _this.bindEvent();
	        return _this;
	    }

	    _createClass(Datepicker, [{
	        key: 'init',
	        value: function init(o) {
	            this.option = o;

	            var today = new Date();
	            this.year = this.option.year || today.getFullYear();
	            this.month = this.option.month || today.getMonth() + 1;
	            this.day = this.option.day || today.getDate();

	            var str = '<div class="data-datepicker-modal dp-hide"><div class="data-datepicker-box">\n            <div class="data-datepicker-head">\n                <div class="data-datepicker-cancel">\u53D6\u6D88</div>\n                <div class="data-datepicker-confirm">\u786E\u8BA4</div>\n            </div>\n            <div class="data-datepicker-xian"></div>\n            \n            <div class="data-datepicker-body">\n            </div>\n        </div></div>';

	            this.$wrap = $(str);
	            this.$body = this.$wrap.find('.data-datepicker-body');
	            this.$confirm = this.$wrap.find('.data-datepicker-confirm');
	            this.$cancel = this.$wrap.find('.data-datepicker-cancel');

	            var $year = new List({ type: 'year', number: this.year });
	            var $month = new List({ type: 'month', number: this.month });
	            var $day = new List({ type: 'day', number: this.day });
	            this.$year = $year;
	            this.$month = $month;
	            this.$day = $day;
	            this.$body.append($year.$wrap, $month.$wrap, $day.$wrap);
	            $('body').append(this.$wrap);
	        }
	    }, {
	        key: 'reinit',
	        value: function reinit(o) {
	            this.option = o;

	            var today = new Date();
	            this.$year.number = this.option.year || today.getFullYear();
	            this.$month.number = this.option.month || today.getMonth() + 1;
	            this.$day.number = this.option.day || today.getDate();
	            this.$year.$contant.html(this.$year.getList(this.$year.number));
	            this.$month.$contant.html(this.$month.getList(this.$month.number));
	            this.$day.$contant.html(this.$day.getList(this.$day.number));
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this.$wrap.removeClass('dp-hide');
	            return this;
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.$wrap.addClass('dp-hide');
	            return this;
	        }
	    }, {
	        key: 'isRunYear',
	        value: function isRunYear(year) {
	            if (year % 100 === 0 && year % 400 === 0) {
	                return true;
	            } else if (year % 100 !== 0 && year % 4 === 0) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'bindEvent',
	        value: function bindEvent() {
	            var _this2 = this;

	            var me = this;
	            this.$wrap.on('touchstart', function () {
	                return false;
	            }).find('.data-datepicker-box').on('touchend', function (e) {
	                e.stopPropagation();
	            });
	            this.$body.find('.data-datepicker-year').on('touchend', function () {
	                _this2.$day.getDays(_this2.$month.number, _this2.isRunYear(_this2.$year.number));
	            });
	            this.$body.find('.data-datepicker-month').on('touchend', function () {
	                _this2.$day.getDays(_this2.$month.number, _this2.isRunYear(_this2.$year.number));
	            });
	            this.$confirm.on('touchend', function () {
	                me.trigger('ok');
	                _this2.hide();
	            });
	            this.$cancel.on('touchend', function () {
	                me.trigger('cancel');
	                _this2.hide();
	            });
	            this.$wrap.on('touchend', function () {
	                _this2.hide();
	            });
	        }
	    }]);

	    return Datepicker;
	}(Observer);

	var datepicker = void 0;
	function getDatePicker() {
	    if (!datepicker) {
	        datepicker = new Datepicker({});
	    }
	    return datepicker;
	}

	module.exports = getDatePicker;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n.dp-hide {\n  display: none;\n}\n.data-datepicker-modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6);\n}\n.data-datepicker-modal .data-datepicker-box {\n  background: #f7f7f7;\n  position: absolute;\n  width: 100%;\n  height: 235px;\n  bottom: 0;\n  left: 0;\n}\n.data-datepicker-modal .data-datepicker-box div {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.data-datepicker-modal .data-datepicker-box .data-datepicker-xian {\n  height: 40px;\n  width: 96%;\n  margin: 0 2%;\n  position: absolute;\n  top: 120px;\n  border-top: 1px solid #dbdbdb;\n  border-bottom: 1px solid #dbdbdb;\n}\n.data-datepicker-modal .data-datepicker-box .data-datepicker-head {\n  background: #f7f7f7;\n  position: relative;\n  z-index: 999;\n  font-size: 16px;\n  line-height: 40px;\n  padding: 0 20px;\n  color: #007aff;\n  border-bottom: 1px #acacac solid;\n}\n.data-datepicker-modal .data-datepicker-box .data-datepicker-color {\n  position: absolute;\n  height: 194px;\n  width: 100%;\n  bottom: 0;\n}\n.data-datepicker-modal .data-datepicker-box .data-datepicker-body {\n  border-color: #f7f7f7;\n  height: 194px;\n  overflow: hidden;\n  font-size: 24px;\n}\n.data-datepicker-modal .data-datepicker-box .data-datepicker-body:after {\n  position: absolute;\n  z-index: 2;\n  height: 194px;\n  width: 100%;\n  bottom: 0;\n  background: linear-gradient(#f7f7f7, rgba(245, 245, 245, 0.5), rgba(245, 245, 245, 0.5), #f7f7f7);\n}\n.data-datepicker-modal .data-datepicker-box .data-datepicker-body div {\n  min-width: 33.3%;\n  flex-grow: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  transform: translateY(200px);\n}\n.data-datepicker-modal .data-datepicker-box .data-datepicker-body div ul {\n  list-style: none;\n  position: relative;\n  top: -240px;\n}\n.data-datepicker-modal .data-datepicker-box .data-datepicker-body div ul li {\n  height: 40px;\n  line-height: 40px;\n  -webkit-font-smoothing: antialiased;\n  width: 40px;\n  text-align: center;\n  color: #3b3b3b;\n  font-family: arial, verdana, sans-serif;\n}\n", ""]);

	// exports


/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 * @Author: Yard
	 * @Date: 2016-12-26 17:23:55
	 * @Last Modified by: Yard
	 * @Last Modified time: 2016-12-28 19:36:31
	 */

	var List = function () {
	    function List(o) {
	        _classCallCheck(this, List);

	        this.pageY = 0;
	        this.count = 0;
	        this.days = 31;

	        this.type = o.type;
	        this.number = o.number;
	        var li = this.getList(this.number);
	        var str = '<div class="data-datepicker-' + this.type + '"><ul>' + li + '</ul></div>';
	        this.$wrap = $(str);
	        this.$contant = this.$wrap.find('ul');

	        this.bindEvent();
	        return this;
	    }

	    _createClass(List, [{
	        key: 'getNumber',
	        value: function getNumber() {
	            if (this.type === 'year') {
	                this.number = this.year(this.number);
	            } else if (this.type === 'month') {
	                this.number = this.month(this.number);
	            } else {
	                this.number = this.day(this.number);
	            }
	        }
	    }, {
	        key: 'year',
	        value: function year(number) {
	            return number;
	        }
	    }, {
	        key: 'month',
	        value: function month(number) {
	            while (number > 12) {
	                number -= 12;
	            }
	            while (number < 1) {
	                number += 12;
	            }
	            return number;
	        }
	    }, {
	        key: 'day',
	        value: function day(number) {
	            while (number > this.days) {
	                number -= this.days;
	            }
	            while (number < 1) {
	                number += this.days;
	            }
	            return number;
	        }
	    }, {
	        key: 'getList',
	        value: function getList(number) {
	            var li = '';
	            switch (this.type) {
	                case 'year':
	                    for (var i = number - 8; i < number + 7; i++) {
	                        li += '<li>' + i + '</li>';
	                    }
	                    return li;
	                case 'month':
	                    for (var _i = number - 8; _i < number + 7; _i++) {
	                        var inode = void 0;
	                        if (_i > 12) {
	                            inode = _i - 12;
	                        } else if (_i < 1) {
	                            inode = _i + 12;
	                        } else {
	                            inode = _i;
	                        }
	                        li += '<li>' + inode + '</li>';
	                    }
	                    return li;
	                case 'day':
	                    for (var _i2 = number - 8; _i2 < number + 7; _i2++) {
	                        var _inode = void 0;
	                        if (_i2 > this.days) {
	                            _inode = _i2 - this.days;
	                        } else if (_i2 < 1) {
	                            _inode = _i2 + this.days;
	                        } else {
	                            _inode = _i2;
	                        }
	                        li += '<li>' + _inode + '</li>';
	                    }
	                    return li;
	                default:
	                    for (var _i3 = number - 8; _i3 < number + 7; _i3++) {
	                        li += '<li>' + _i3 + '</li>';
	                    }
	                    return li;
	            }
	        }
	    }, {
	        key: 'getDays',
	        value: function getDays(month, runYear) {
	            if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
	                this.days = 31;
	            } else if (month === 4 || month === 6 || month === 9 || month === 11) {
	                this.days = 30;
	            } else if (runYear) {
	                this.days = 29;
	            } else {
	                this.days = 28;
	            }
	            this.number = this.number > this.days ? this.days : this.number;
	            this.$contant.html(this.getList(this.number));
	        }
	    }, {
	        key: 'bindEvent',
	        value: function bindEvent() {
	            var _this = this;

	            this.$wrap.on('touchstart', function (e) {
	                _this.handleStart(e);
	            }).on('touchmove', function (e) {
	                _this.handleMove(e);
	            }).on('touchend', function (e) {
	                _this.handleEnd(e);
	            });
	        }
	    }, {
	        key: 'handleStart',
	        value: function handleStart(e) {
	            this.pageY = e.pageY || e.targetTouches[0].pageY;
	        }
	    }, {
	        key: 'handleMove',
	        value: function handleMove(e) {
	            var pageY = e.pageY || e.targetTouches[0].pageY;
	            var long = this.pageY - pageY;
	            this.$contant.css('transform', 'translateY(' + -long + 'px)');
	            this.$contant.css('transition', 'transform 0.2s ease-out');
	        }
	    }, {
	        key: 'handleEnd',
	        value: function handleEnd(e) {
	            var _this2 = this;

	            var pageY = e.pageY || e.changedTouches[0].pageY;
	            var long = this.pageY - pageY;
	            this.count = Math.round(long / 40);
	            this.$contant.css('transform', 'translateY(' + -(this.count * 40) + 'px)');
	            this.$contant.css('transition', 'transform 0.2s ease-out');
	            this.number += this.count;
	            this.getNumber();
	            setTimeout(function () {
	                _this2.$contant.css('transform', 'translateY(0px)');
	                _this2.$contant.css('transition', 'none');
	                _this2.$contant.html(_this2.getList(_this2.number));
	            }, 200);
	        }
	    }, {
	        key: 'clearTeansform',
	        value: function clearTeansform() {
	            this.$contant.css('transform', 'translateY(0px)');
	            this.count = 0;
	        }
	    }]);

	    return List;
	}();

	module.exports = List;

/***/ }
/******/ ]);