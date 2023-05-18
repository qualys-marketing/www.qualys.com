/* global jQuery:false */
/* eslint-disable */
webpackJsonp([0],{

	/***/ 										26:
	/***/ (function(module, exports, __webpack_require__) {
	
		"use strict";
	
	
		var _tabs = __webpack_require__(8);
	
		var _tabs2 = _interopRequireDefault(_tabs);
	
		var _hero = __webpack_require__(2);
	
		var _hero2 = _interopRequireDefault(_hero);
	
		var _Sticky = __webpack_require__(44);
	
		var _Sticky2 = _interopRequireDefault(_Sticky);
	
		var _promo = __webpack_require__(46);
	
		var _promo2 = _interopRequireDefault(_promo);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		(0, _hero2.default)();
		(0, _promo2.default)();
		(0, _tabs2.default)("q-tabs__link");
	
		var el = document.querySelector(".q-subscriptions-sticky");
	
		if (el) {
		new _Sticky2.default(); // eslint-disable-line
		}
	
	/***/ }),
	
	/***/ 										41:
	/***/ (function(module, exports) {
	
	// removed by extract-text-webpack-plugin
	
	/***/ }),
	
	/***/ 										44:
	/***/ (function(module, exports, __webpack_require__) {
	
		"use strict";
	
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
	
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
		var Sticky = function () {
			function Sticky(el) {
				var _this = this;
	
				_classCallCheck(this, Sticky);
	
				_initialiseProps.call(this);
	
				this.el = el || document.querySelector("." + this.blockName);
	
				this.stickyLayoutEl = this.el.querySelector("." + this.blockName + "__layout--sticky");
				this.listEl = this.el.querySelector("." + this.blockName + "__list");
				this.itemEls = this.el.querySelectorAll("." + this.blockName + "__item");
	
				this.build();
	
				setTimeout(function () {
					_this.onResize();
					_this.onScroll();
				});
	
				this.lastRender = 0;
	
				window.addEventListener("scroll", this.onScroll);
				window.addEventListener("resize", this.onResize);
			}
	
			_createClass(Sticky, [{
				key: "build",
				value: function build() {
					var _this2 = this;
	
					var glistEl = this.glistEl = document.createElement("div");
	
					this.itemEls.forEach(function (el) {
						var headlineEl = el.querySelector("." + _this2.blockName + "__heading");
						var itemEl = document.createElement("li");
	
						itemEl.className = _this2.blockName + "__gitem";
						itemEl.appendChild(headlineEl.cloneNode(true));
						glistEl.appendChild(itemEl);
					});
	
					glistEl.className = this.blockName + "__glist";
					this.gitemEls = glistEl.childNodes;
	
					this.el.appendChild(glistEl);
				}
			}, {
				key: "handleLayout",
				value: function handleLayout(scrollY) {
					var offset = this.offsetTop + this.height - window.innerHeight;
	
					if (scrollY > offset) {
						this.stickyLayoutEl.style.position = "absolute";
						this.stickyLayoutEl.style.top = "auto";
						this.stickyLayoutEl.style.bottom = "0px";
					} else if (scrollY >= this.offsetTop) {
						this.stickyLayoutEl.style.position = "fixed";
						this.stickyLayoutEl.style.top = "";
					} else {
						this.stickyLayoutEl.style.position = "";
						this.stickyLayoutEl.style.top = "";
					}
				}
			}, {
				key: "handleHeadlines",
				value: function handleHeadlines(scrollY) {
					var _this3 = this;
	
					if (scrollY >= this.itemsOffsetTop + this.offsetTop - window.innerHeight + this.items.length * this.headlineHeight) {
						this.glistEl.style.position = "fixed";
						this.glistEl.style.top = "";
						this.glistEl.style.bottom = "0px";
					} else {
						this.glistEl.style.position = "absolute";
						this.glistEl.style.top = this.itemsOffsetTop + "px";
						this.glistEl.style.bottom = "";
					}
	
					var hiddenClassName = this.blockName + "__gitem--hidden";
	
					this.items.forEach(function (item, i) {
						var invertedIndex = _this3.items.length - i;
						var offset = item.offsetTop + _this3.offsetTop - window.innerHeight + invertedIndex * _this3.headlineHeight;
	
						if (scrollY >= offset) {
							if (!item.ghostEl.classList.contains(hiddenClassName)) {
								item.ghostEl.classList.toggle(hiddenClassName, true);
							}
						} else {
							if (item.ghostEl.classList.contains(hiddenClassName)) {
								item.ghostEl.classList.toggle(hiddenClassName, false);
							}
						}
					});
				}
			}]);
	
			return Sticky;
		}();
	
		var _initialiseProps = function _initialiseProps() {
			var _this4 = this;
	
			this.items = [];
			this.blockName = "q-subscriptions-sticky";
	
			this.onScroll = function () {
				var scrollY = window.scrollY || document.querySelector("html").scrollTop;
	
				if (Date.now() - _this4.lastRender > 5000) {
					_this4.onResize();
				}
	
				_this4.handleLayout(scrollY);
				_this4.handleHeadlines(scrollY);
			};
	
			this.onResize = function () {
				_this4.offsetTop = _this4.el.offsetTop;
				_this4.height = _this4.el.offsetHeight;
	
				_this4.headlineHeight = _this4.gitemEls[0].offsetHeight;
				_this4.itemsOffsetTop = _this4.listEl.offsetTop;
	
				_this4.glistEl.style.left = _this4.itemEls[0].offsetLeft + "px";
				_this4.glistEl.style.width = _this4.itemEls[0].offsetWidth + "px";
	
				_this4.itemEls.forEach(function (el, i) {
					_this4.items[i] = {
						el: el,
						ghostEl: _this4.gitemEls[i],
						offsetTop: el.offsetTop
					};
				});
	
				_this4.lastRender = Date.now();
			};
		};
	
		exports.default = Sticky;
	
	/***/ }),
	
	/***/ 										46:
	/***/ (function(module, exports, __webpack_require__) {
	
		"use strict";
	
	
		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = animatePromo;
	
		var _waypoint = __webpack_require__(1);
	
		var _waypoint2 = _interopRequireDefault(_waypoint);
	
		var _timelinelite = __webpack_require__(0);
	
		var _timelinelite2 = _interopRequireDefault(_timelinelite);
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
		function animatePromo() {
			var el = document.querySelector(".q-subscriptions-cloud-platform");
			var ease = window.Power4.easeInOut;
	
			if (el) {
				var t = new _timelinelite2.default();
			var waypoint1 = new _waypoint2.default({ // eslint-disable-line
				element: el,
	
				offset: "100%",
	
				handler: function handler(direction) {
					if (direction === "down") {
						t.addLabel("start").staggerFromTo(".q-subscriptions-cloud-platform__dots path", 0.8, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: ease }, 0.05).fromTo(".q-subscriptions-cloud-platform__arrows", 1, { rotation: -180, autoAlpha: 0, transformOrigin: "center" }, { rotation: 0, autoAlpha: 1 }, "start+=1.3");
					}
				}
			});
			}
		}
	
	/***/ }),
	
	/***/ 										80:
	/***/ (function(module, exports, __webpack_require__) {
	
		__webpack_require__(26);
		module.exports = __webpack_require__(41);
	
	
	/***/ })
	
	},[80]);
	/* eslint-enable */
	
	/*
	 * add hash of app abbreviation to trial and beta links based on current page
	 */
	(function ($) {
		"use strict";
	
		$(document).ready(function () {
			var path = window.location.pathname;
			var $trial = $("[href^=\"/free-trial\"]");
			// var $beta = $("[href^=\"/beta-signup\"]");
			var href;
	
			switch(path) {
			case "/subscriptions/smb/":
				href = $trial.attr("href");
				$trial.attr("href", href + "#/smb");
				break;
			case "/subscriptions/sme/":
				href = $trial.attr("href");
				$trial.attr("href", href + "#/sme");
				break;
			case "/subscriptions/enterprise/":
				href = $trial.attr("href");
				$trial.attr("href", href + "#/enterprise");
				break;
			case "/subscriptions/consultants/":
				href = $trial.attr("href");
				$trial.attr("href", href + "#/consultant");
				break;
			}
		});
	}(jQuery));
