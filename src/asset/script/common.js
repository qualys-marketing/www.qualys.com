/* global Waypoint TimelineLite qualys Vimeo jQuery */
window.qualys = window.qualys || {};

/* eslint-disable */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 											var parentJsonpFunction = window["webpackJsonp"];
	/******/ 											window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
		/******/ 		// add "moreModules" to the modules object,
		/******/ 		// then flag all "chunkIds" as loaded and fire callback
		/******/ 												var moduleId, chunkId, i = 0, resolves = [], result;
		/******/ 												for(;i < chunkIds.length; i++) {
			/******/ 													chunkId = chunkIds[i];
			/******/ 													if(installedChunks[chunkId]) {
				/******/ 														resolves.push(installedChunks[chunkId][0]);
				/******/ 			}
			/******/ 													installedChunks[chunkId] = 0;
			/******/ 		}
		/******/ 												for(moduleId in moreModules) {
			/******/ 													if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
				/******/ 														modules[moduleId] = moreModules[moduleId];
				/******/ 			}
			/******/ 		}
		/******/ 												if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
		/******/ 												while(resolves.length) {
			/******/ 													resolves.shift()();
			/******/ 		}
		/******/ 												if(executeModules) {
			/******/ 													for(i=0; i < executeModules.length; i++) {
				/******/ 														result = __webpack_require__(__webpack_require__.s = executeModules[i]);				/******/ 			}
			/******/ 		}
		/******/ 												return result;
		/******/ 	};
	/******/
	/******/ 	// The module cache
	/******/ 											var installedModules = {};
	/******/
	/******/ 	// objects to store loaded and loading chunks
	/******/ 											var installedChunks = {
		/******/ 												20: 0
		/******/ 	};
	/******/
	/******/ 	// The require function
	/******/ 											function __webpack_require__(moduleId) {
		/******/
		/******/ 		// Check if module is in cache
		/******/ 												if(installedModules[moduleId]) {
			/******/ 													return installedModules[moduleId].exports;
			/******/ 		}
		/******/ 		// Create a new module (and put it into the cache)
		/******/ 												var module = installedModules[moduleId] = {
			/******/ 													i: moduleId,
			/******/ 													l: false,
			/******/ 													exports: {}
			/******/ 		};
		/******/
		/******/ 		// Execute the module function
		/******/ 												modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		/******/
		/******/ 		// Flag the module as loaded
		/******/ 												module.l = true;
		/******/
		/******/ 		// Return the exports of the module
		/******/ 												return module.exports;
		/******/ 	}
	/******/
	/******/ 	// This file contains only the entry chunk.
	/******/ 	// The chunk loading function for additional chunks
	/******/ 											__webpack_require__.e = function requireEnsure(chunkId) {
		/******/ 												var installedChunkData = installedChunks[chunkId];
		/******/ 												if(installedChunkData === 0) {
			/******/ 													return new Promise(function(resolve) { resolve(); });
			/******/ 		}
		/******/
		/******/ 		// a Promise means "currently loading".
		/******/ 												if(installedChunkData) {
			/******/ 													return installedChunkData[2];
			/******/ 		}
		/******/
		/******/ 		// setup Promise in chunk cache
		/******/ 												var promise = new Promise(function(resolve, reject) {
			/******/ 													installedChunkData = installedChunks[chunkId] = [resolve, reject];
			/******/ 		});
		/******/ 												installedChunkData[2] = promise;
		/******/
		/******/ 		// start chunk loading
		/******/ 												var head = document.getElementsByTagName("head")[0];
		/******/ 												var script = document.createElement("script");
		/******/ 												script.type = "text/javascript";
		/******/ 												script.charset = "utf-8";
		/******/ 												script.async = true;
		/******/ 												script.timeout = 120000;
		/******/
		/******/ 												if (__webpack_require__.nc) {
			/******/ 													script.setAttribute("nonce", __webpack_require__.nc);
			/******/ 		}
		/******/ 												script.src = __webpack_require__.p + "" + chunkId + ".js";
		/******/ 												var timeout = setTimeout(onScriptComplete, 120000);
		/******/ 												script.onerror = script.onload = onScriptComplete;
		/******/ 												function onScriptComplete() {
			/******/ 			// avoid mem leaks in IE.
			/******/ 													script.onerror = script.onload = null;
			/******/ 													clearTimeout(timeout);
			/******/ 													var chunk = installedChunks[chunkId];
			/******/ 													if(chunk !== 0) {
				/******/ 														if(chunk) {
					/******/ 															chunk[1](new Error("Loading chunk " + chunkId + " failed."));
					/******/ 				}
				/******/ 														installedChunks[chunkId] = undefined;
				/******/ 			}
			/******/ 		}
		/******/ 												head.appendChild(script);
		/******/
		/******/ 												return promise;
		/******/ 	};
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 											__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 											__webpack_require__.c = installedModules;
	/******/
	/******/ 	// identity function for calling harmony imports with the correct context
	/******/ 											__webpack_require__.i = function(value) { return value; };
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 											__webpack_require__.d = function(exports, name, getter) {
		/******/ 												if(!__webpack_require__.o(exports, name)) {
			/******/ 													Object.defineProperty(exports, name, {
				/******/ 														configurable: false,
				/******/ 														enumerable: true,
				/******/ 														get: getter
				/******/ 			});
			/******/ 		}
		/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 											__webpack_require__.n = function(module) {
		/******/ 												var getter = module && module.__esModule ?
			/******/ 			function getDefault() { return module["default"]; } :
			/******/ 			function getModuleExports() { return module; };
		/******/ 												__webpack_require__.d(getter, "a", getter);
		/******/ 												return getter;
		/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 											__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 											__webpack_require__.p = "/asset";
	/******/
	/******/ 	// on error function for async loading
	/******/ 											__webpack_require__.oe = function(err) { console.error(err); throw err; };
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 											return __webpack_require__(__webpack_require__.s = 81);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

		module.exports = TimelineLite;

		/***/ }),
	/* 1 */
	/***/ (function(module, exports) {

		module.exports = Waypoint;

		/***/ }),
	/* 2 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = animateHero;

		var _timelinelite = __webpack_require__(0);

		var _timelinelite2 = _interopRequireDefault(_timelinelite);

		var _waypoint = __webpack_require__(1);

		var _waypoint2 = _interopRequireDefault(_waypoint);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function animateHero(el) {
			var t = new _timelinelite2.default();
			var complete = false;
			var className = el || "q-default-hero";

			var hero = document.querySelector("." + className);

			if (hero !== null) {
				var heroContent = document.querySelector("." + className + "__content").childNodes;
				var heroBox = document.querySelector("." + className + "__box-wrap") || null;
				var heroImage = document.querySelector("." + className + "__image");
				var ease = window.Power4.easeInOut;

				function onHeroImageComplete() {
					// trigger custom event to when hero image completes animating
					if (window.CustomEvent) {
						event = new CustomEvent("heroImageComplete");
					} else {
						event = document.createEvent("CustomEvent");
						event.initCustomEvent("heroImageComplete", true, true);
					}

					heroImage.dispatchEvent(event);
				}

				function onHeroBoxComplete() {
					// trigger custom event to when hero box completes animating
					if (window.CustomEvent) {
						event = new CustomEvent("heroBoxComplete");
					} else {
						event = document.createEvent("CustomEvent");
						event.initCustomEvent("heroBoxComplete", true, true);
					}

					heroBox.dispatchEvent(event);
				}

				var waypoint1 = new _waypoint2.default({ // eslint-disable-line
					element: hero,

					offset: "100%",

					handler: function handler(direction) {
						if (direction === "down" && !complete) {
							t.addLabel("start")
								.staggerFromTo(heroContent, 1, { y: "20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease, onComplete: onComplete }, 0.1)
								.call(heroContentComplete)
								.fromTo(heroImage, 1, { y: "30%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease, onComplete: onHeroImageComplete }, "start+=.8")
								.fromTo(heroBox, 1, { y: "-20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease, onComplete: onHeroBoxComplete }, "start+=.8");
						}
					}
				});
			}

			function onComplete() {
				complete = true;
			}

			function heroContentComplete() {
				// trigger custom event to stagger app badges in the Apps Overview page
				if (window.CustomEvent) {
																			var event = new CustomEvent("heroContentComplete");
				} else {
																			var event = document.createEvent("CustomEvent");
																			event.initCustomEvent("heroContentComplete", true, true);
				}

				hero.dispatchEvent(event);
			}
		}

		/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = animateContentHero;

		var _timelinelite = __webpack_require__(0);

		var _timelinelite2 = _interopRequireDefault(_timelinelite);

		var _waypoint = __webpack_require__(1);

		var _waypoint2 = _interopRequireDefault(_waypoint);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function animateContentHero(el) {
			var t = new _timelinelite2.default();
			var className = el || "q-content-hero";

			var hero = document.querySelector("." + className);
			var hgroup = document.querySelector("." + className + "__hgroup").childNodes;
			var heroContent = document.querySelector("." + className + "__content-inner");
			var heroBox = document.querySelector("." + className + "__box-wrap");
			var ease = window.Power4.easeInOut;

			var complete = false;
			function onComplete() {
				complete = true;
			}

	var waypoint1 = new _waypoint2.default({ // eslint-disable-line
				element: hero,

				offset: "100%",

				handler: function handler(direction) {
					if (direction === "down" && !complete) {
						t.addLabel("start").staggerFromTo(hgroup, 1, { y: "20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease, onComplete: onComplete }, 0.1).fromTo(heroBox, 0.8, { y: "-20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease }, "start+=.8").fromTo(heroContent, 0.8, { autoAlpha: 0 }, { autoAlpha: 1, ease: ease }, "start+=.8");
					}
				}
			});
		}

		/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = animateTp;

		var _waypoint = __webpack_require__(1);

		var _waypoint2 = _interopRequireDefault(_waypoint);

		var _timelinelite = __webpack_require__(0);

		var _timelinelite2 = _interopRequireDefault(_timelinelite);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function animateTp() {

			var laptop = document.getElementById("q-laptop-container");
			var ease = window.Power4.easeInOut;

			var complete = false;
			function onComplete() {
				complete = true;
			}

			var t1 = new _timelinelite2.default();
	var waypoint1 = new _waypoint2.default({ // eslint-disable-line
				element: laptop,

				offset: "75%",

				handler: function handler(direction) {
					if (direction === "down" && !complete) {
						t1.addLabel("start").fromTo("#q-laptop-container .q-laptop", 0.75, { x: "-10%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, ease: ease, onComplete: onComplete }).fromTo(".q-svg-dashboard__title", 1, { y: "-20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease }, "start+=0.25").staggerFromTo(".q-svg-dashboard__item", 1, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.15, "start+=0.25").staggerFrom(".q-svg-dashboard__animate-path", 1, { drawSVG: 0 }, 0.3, "start+=1").staggerFromTo(".q-svg-dashboard__rect", 1, { scaleX: 0 }, { scaleX: 1 }, 0.2, "start+=1").fromTo(".q-svg-dashboard__circle", 2, { rotation: 0, transformOrigin: "center" }, { rotation: 360, ease: window.Power2.easeInOut }, "start+=0.5").staggerFromTo(".q-svg-dashboard__bullets rect", 0.2, { x: -10, autoAlpha: 0 }, { x: 0, autoAlpha: 1 }, 0.1, "start+=1");
					}
				}
			});
		}

		/***/ }),
	/* 5 */
	/***/ (function(module, exports) {

		module.exports = Swiper;

		/***/ }),
	/* 6 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = animateVm;

		var _waypoint = __webpack_require__(1);

		var _waypoint2 = _interopRequireDefault(_waypoint);

		var _timelinelite = __webpack_require__(0);

		var _timelinelite2 = _interopRequireDefault(_timelinelite);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function animateVm() {
			var laptop = document.getElementById("q-laptop-container");

			if (laptop) {
				var ease = window.Power4.easeInOut;

				var complete = false;
				function onComplete() {
					complete = true;
				}

				var t1 = new _timelinelite2.default();
				var waypoint1 = new _waypoint2.default({ // eslint-disable-line
					element: laptop,

					offset: "75%",

					handler: function handler(direction) {
						if (direction === "down" && !complete) {
							t1.addLabel("start").fromTo("#q-laptop-container .q-laptop", 1, { y: "20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease, onComplete: onComplete }).fromTo(".q-svg-dashboard__title", 1, { y: "-20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease }, "start+=.25").fromTo(".q-svg-dashboard__button", 1, { y: "-20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease }, "start+=.25").staggerFromTo(".q-svg-dashboard__item", 1, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.15, "start+=.75").staggerFromTo(".q-svg-dashboard__bar", 0.6, { scaleY: 0, autoAlpha: 0, transformOrigin: "bottom" }, { scaleY: 1, autoAlpha: 1, ease: ease }, 0.15, "start+=1");
						}
					}
				});
			}
		}

		/***/ }),
	/* 7 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _timelinelite = __webpack_require__(0);

		var _timelinelite2 = _interopRequireDefault(_timelinelite);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var Modal = function () {
			function Modal(el, id, video) {
				_classCallCheck(this, Modal);

				this.contentId = id;
				this.video = video;
				el.addEventListener("click", this.onOpen.bind(this));
			}

			_createClass(Modal, [{
				key: "build",
				value: function build() {
					this.el = document.createElement("div");
					var html = "\n\t\t\t<div class=\"q-modal\">\n\t\t\t\t<div class=\"q-modal__content\">\n\t\t\t\t\t<button class=\"q-modal__close\">\n\t\t\t\t\t\t<svg class=\"q-modal__close-icon\" viewBox=\"0 0 16 16\">\n\t\t\t\t\t\t\t<path d=\"M8 6.5454545L1.454545 0 0 1.4545455 6.545455 8 0 14.5454545 1.454545 16 8 9.4545455 14.545455 16 16 14.5454545 9.454545 8 16 1.4545455 14.545455 0 8 6.5454545z\"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"q-modal__inner\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"q-modal__overlay\"></div>\n\t\t\t</div>\n\t\t";

					this.el.innerHTML = html;
					this.overlayEl = this.el.querySelector(".q-modal__overlay");
					this.overlayEl.addEventListener("click", this.onClose.bind(this));
					this.closeEl = this.el.querySelector(".q-modal__close");
					this.closeEl.addEventListener("click", this.onClose.bind(this));
					this.contentEl = this.el.querySelector(".q-modal__content");
					this.innerEl = this.el.querySelector(".q-modal__inner");
					this.contentEl.appendChild(this.getContent());
					this.videoEl = this.el.querySelector("video");

					document.body.appendChild(this.el);

					this.postBuild();
				}
			}, {
				key: "postBuild",
				value: function postBuild() {
					if (this.videoEl) {
						this.contentEl.classList.add("q-modal__content--is-video");
						var width = this.getContent().children[0].offsetWidth;
						var height = this.getContent().children[0].offsetHeight;
						this.getContent().style.width = width + "px";
						this.getContent().style.height = height + "px";
						this.contentEl.style.width = width + "px";
						this.contentEl.style.height = height + "px";
					}
				}
			}, {
				key: "getContent",
				value: function getContent() {
					return document.getElementById(this.contentId);
				}
			}, {
				key: "open",
				value: function open() {
					var _this = this;

					return new Promise(function (resolve) {
						if (!_this.el) {
							_this.build();
						}

						new _timelinelite2.default().add("start").set(_this.el, { display: "block" }).fromTo(_this.overlayEl, 0.3, { opacity: 0 }, { opacity: 1 }).fromTo(_this.contentEl, 0.3, { opacity: 0.5, y: "-40%" }, { opacity: 1, y: "0%" }, "start").call(resolve);
					});
				}
			}, {
				key: "close",
				value: function close() {
					new _timelinelite2.default().set(this.el, { display: "none" });
				}
			}, {
				key: "onOpen",
				value: function onOpen(e) {
					e.preventDefault();

					this.open();

					// in case of inline-embedded video
					if (this.videoEl) {
						this.videoEl.play();
					}
				}
			}, {
				key: "onClose",
				value: function onClose(e) {
					e.preventDefault();

					this.close();

					// in case of inline-embedded video
					if (this.videoEl) {
						this.videoEl.pause();
					}
				}
			}]);

			return Modal;
		}();

		exports.default = Modal;

		/***/ }),
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		function tabs(tabEl) {
			var links = document.querySelectorAll("." + tabEl);

			var setTabs = function setTabs(el, active) {

				// target panel
				var anchorId = active || el.getAttribute("data-tabId");

				// always constant
				var contentTabs = document.querySelectorAll(".q-tabs__link");
				var tabContent = document.querySelectorAll(".q-tabs__panel");
				var activeTab = document.querySelectorAll(".q-tabs__link[data-tabId=\"" + anchorId + "\"]")[0];

				// hide all content & remove active classes of tabs
				for (var i = 0; i < tabContent.length; i++) {
					tabContent[i].classList.remove("q-tabs__panel--active");
					contentTabs[i].classList.remove("q-tabs__link--active");
				}

				// add active class to active content
				document.getElementById(anchorId).classList.add("q-tabs__panel--active");

				// remove active state from content tabs
				for (var _i = 0; _i < contentTabs.length; _i++) {
					links[_i].classList.remove("q-tabs__link--active");
				}

				// Always show the current content tab as active
				activeTab.classList.add("q-tabs__link--active");

				// update hash in URL
				window.location.hash = "#" + anchorId;

			};

			if (links) {
				var _loop = function _loop(i) {
					var el = links[i];

					el.addEventListener("click", function (e) {

						e.preventDefault();

						setTabs(el);
					});
				};

				// on clicks for the tab elements
				for (var i = 0; i < links.length; i++) {
					_loop(i);
				}

				/*
		 * handle hash change with tab id
		 */
				function handleHashChange (event) {

					var hash, element;

					// get hash value
					if (window.location.hash) {

						hash = window.location.hash.substring(1);
						if (hash) {

							// find matching element
							element = document.querySelector("[data-tabid=" + hash + "]");
							if (element) {

								// only make the tab active if it's not already active
								if (!element.classList.contains("q-tabs__link--active")) {

									setTabs(element, hash);

								}

							}

						}

					}


				}

				window.addEventListener("hashchange", handleHashChange);
				document.addEventListener("DOMContentLoaded", handleHashChange);

			}

		}
		exports.default = tabs;

		/***/ }),
	/* 9 */,
	/* 10 */,
	/* 11 */,
	/* 12 */,
	/* 13 */,
	/* 14 */,
	/* 15 */,
	/* 16 */,
	/* 17 */,
	/* 18 */,
	/* 19 */,
	/* 20 */,
	/* 21 */,
	/* 22 */,
	/* 23 */,
	/* 24 */,
	/* 25 */,
	/* 26 */,
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		__webpack_require__(57);

		__webpack_require__(55);

		__webpack_require__(49);

		__webpack_require__(53);

		__webpack_require__(51);

		/***/ }),
	/* 28 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";
		/* WEBPACK VAR INJECTION */										(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

			/*!
 * VERSION: 0.1.3
 * DATE: 2017-03-29
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * DrawSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
			var _gsScope = typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : undefined || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
			(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {

				"use strict";

				var _doc = _gsScope.document,
					_getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function () {},
					_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
					_isEdge = ((_gsScope.navigator || {}).userAgent || "").indexOf("Edge") !== -1,
					//Microsoft Edge has a bug that causes it not to redraw the path correctly if the stroke-linecap is anything other than "butt" (like "round") and it doesn't match the stroke-linejoin. A way to trigger it is to change the stroke-miterlimit, so we'll only do that if/when we have to (to maximize performance)
					DrawSVGPlugin;

				function getDistance(x1, y1, x2, y2, scaleX, scaleY) {
					x2 = (parseFloat(x2) - parseFloat(x1)) * scaleX;
					y2 = (parseFloat(y2) - parseFloat(y1)) * scaleY;
					return Math.sqrt(x2 * x2 + y2 * y2);
				}

				function unwrap(element) {
					if (typeof element === "string" || !element.nodeType) {
						element = _gsScope.TweenLite.selector(element);
						if (element.length) {
							element = element[0];
						}
					}
					return element;
				}

				//accepts values like "100%" or "20% 80%" or "20 50" and parses it into an absolute start and end position on the line/stroke based on its length. Returns an an array with the start and end values, like [0, 243]
				function parse(value, length, defaultStart) {
					var i = value.indexOf(" "),
						s,
						e;
					if (i === -1) {
						s = defaultStart !== undefined ? defaultStart + "" : value;
						e = value;
					} else {
						s = value.substr(0, i);
						e = value.substr(i + 1);
					}
					s = s.indexOf("%") !== -1 ? parseFloat(s) / 100 * length : parseFloat(s);
					e = e.indexOf("%") !== -1 ? parseFloat(e) / 100 * length : parseFloat(e);
					return s > e ? [e, s] : [s, e];
				}

				function getLength(element) {
					if (!element) {
						return 0;
					}
					element = unwrap(element);
					var type = element.tagName.toLowerCase(),
						scaleX = 1,
						scaleY = 1,
						length,
						bbox,
						points,
						prevPoint,
						i,
						rx,
						ry;
					if (element.getAttribute("vector-effect") === "non-scaling-stroke") {
						//non-scaling-stroke basically scales the shape and then strokes it at the screen-level (after transforms), thus we need to adjust the length accordingly.
						scaleY = element.getScreenCTM();
						scaleX = scaleY.a;
						scaleY = scaleY.d;
					}
					try {
						//IE bug: calling <path>.getTotalLength() locks the repaint area of the stroke to whatever its current dimensions are on that frame/tick. To work around that, we must call getBBox() to force IE to recalculate things.
						bbox = element.getBBox(); //solely for fixing bug in IE - we don't actually use the bbox.
					} catch (e) {
						//firefox has a bug that throws an error if the element isn't visible.
					}
					if ((!bbox || !bbox.width && !bbox.height) && (type === "rect" || type === "circle" || type === "ellipse")) {
						//if the element isn't visible, try to discern width/height using its attributes.
						bbox = {
							width: parseFloat(element.getAttribute(type === "rect" ? "width" : type === "circle" ? "r" : "rx")),
							height: parseFloat(element.getAttribute(type === "rect" ? "height" : type === "circle" ? "r" : "ry"))
						};
						if (type !== "rect") {
							bbox.width *= 2;
							bbox.height *= 2;
						}
					}
					if (type === "path") {
						prevPoint = element.style.strokeDasharray;
						element.style.strokeDasharray = "none";
						length = element.getTotalLength() || 0;
						if (scaleX !== scaleY) {
							console.log("Warning: <path> length cannot be measured accurately when vector-effect is non-scaling-stroke and the element isn't proportionally scaled.");
						}
						length *= (scaleX + scaleY) / 2;
						element.style.strokeDasharray = prevPoint;
					} else if (type === "rect") {
						length = bbox.width * 2 * scaleX + bbox.height * 2 * scaleY;
					} else if (type === "line") {
						length = getDistance(element.getAttribute("x1"), element.getAttribute("y1"), element.getAttribute("x2"), element.getAttribute("y2"), scaleX, scaleY);
					} else if (type === "polyline" || type === "polygon") {
						points = element.getAttribute("points").match(_numbersExp) || [];
						if (type === "polygon") {
							points.push(points[0], points[1]);
						}
						length = 0;
						for (i = 2; i < points.length; i += 2) {
							length += getDistance(points[i - 2], points[i - 1], points[i], points[i + 1], scaleX, scaleY) || 0;
						}
					} else if (type === "circle" || type === "ellipse") {
						rx = bbox.width / 2 * scaleX;
						ry = bbox.height / 2 * scaleY;
						length = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
					}
					return length || 0;
				}

				function getPosition(element, length) {
					if (!element) {
						return [0, 0];
					}
					element = unwrap(element);
					length = length || getLength(element) + 1;
					var cs = _getComputedStyle(element),
						dash = cs.strokeDasharray || "",
						offset = parseFloat(cs.strokeDashoffset),
						i = dash.indexOf(",");
					if (i < 0) {
						i = dash.indexOf(" ");
					}
					dash = i < 0 ? length : parseFloat(dash.substr(0, i)) || 0.00001;
					if (dash > length) {
						dash = length;
					}
					return [Math.max(0, -offset), Math.max(0, dash - offset)];
				}

				DrawSVGPlugin = _gsScope._gsDefine.plugin({
					propName: "drawSVG",
					API: 2,
					version: "0.1.3",
					global: true,
					overwriteProps: ["drawSVG"],

					init: function init(target, value, tween, index) {
						if (!target.getBBox) {
							return false;
						}
						var length = getLength(target) + 1,
							start,
							end,
							overage,
							cs;
						this._style = target.style;
						if (typeof value === "function") {
							value = value(index, target);
						}
						if (value === true || value === "true") {
							value = "0 100%";
						} else if (!value) {
							value = "0 0";
						} else if ((value + "").indexOf(" ") === -1) {
							value = "0 " + value;
						}
						start = getPosition(target, length);
						end = parse(value, length, start[0]);
						this._length = length + 10;
						if (start[0] === 0 && end[0] === 0) {
							overage = Math.max(0.00001, end[1] - length); //allow people to go past the end, like values of 105% because for some paths, Firefox doesn't return an accurate getTotalLength(), so it could end up coming up short.
							this._dash = length + overage;
							this._offset = length - start[1] + overage;
							this._addTween(this, "_offset", this._offset, length - end[1] + overage, "drawSVG");
						} else {
							this._dash = start[1] - start[0] || 0.000001; //some browsers render artifacts if dash is 0, so we use a very small number in that case.
							this._offset = -start[0];
							this._addTween(this, "_dash", this._dash, end[1] - end[0] || 0.00001, "drawSVG");
							this._addTween(this, "_offset", this._offset, -end[0], "drawSVG");
						}
						if (_isEdge) {
							//to work around a bug in Microsoft Edge, animate the stroke-miterlimit by 0.0001 just to trigger the repaint (only necessary if stroke-linecap isn't "butt"; also unnecessary if it's "round" and stroke-linejoin is also "round"). Imperceptible, relatively high-performance, and effective. Another option was to set the "d" <path> attribute to its current value on every tick, but that seems like it'd be much less performant.
							cs = _getComputedStyle(target);
							end = cs.strokeLinecap;
							if (end !== "butt" && end !== cs.strokeLinejoin) {
								end = parseFloat(cs.strokeMiterlimit);
								this._addTween(target.style, "strokeMiterlimit", end, end + 0.0001, "strokeMiterlimit");
							}
						}
						return true;
					},

					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function set(ratio) {
						if (this._firstPT) {
							this._super.setRatio.call(this, ratio);
							this._style.strokeDashoffset = this._offset;
							if (ratio === 1 || ratio === 0) {
								this._style.strokeDasharray = this._offset < 0.001 && this._length - this._dash <= 10 ? "none" : this._offset === this._dash ? "0px, 999999px" : this._dash + "px," + this._length + "px";
							} else {
								this._style.strokeDasharray = this._dash + "px," + this._length + "px";
							}
						}
					}

				});

				DrawSVGPlugin.getLength = getLength;
				DrawSVGPlugin.getPosition = getPosition;
			});if (_gsScope._gsDefine) {
				_gsScope._gsQueue.pop()();
			}
			//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
			(function (name) {
				"use strict";

				var getGlobal = function getGlobal() {
					return (_gsScope.GreenSockGlobals || _gsScope)[name];
				};
				if (true) {
					//AMD
					!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(62)], __WEBPACK_AMD_DEFINE_FACTORY__ = (getGlobal),
						__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ?
							(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
						__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
				} else if (typeof module !== "undefined" && module.exports) {
					//node
					require("gsap/TweenLite");
					module.exports = getGlobal();
				}
			})("DrawSVGPlugin");
			/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61)));

		/***/ }),
	/* 29 */,
	/* 30 */,
	/* 31 */,
	/* 32 */,
	/* 33 */,
	/* 34 */,
	/* 35 */,
	/* 36 */,
	/* 37 */,
	/* 38 */,
	/* 39 */,
	/* 40 */,
	/* 41 */,
	/* 42 */
	/***/ (function(module, exports) {

		// removed by extract-text-webpack-plugin

		/***/ }),
	/* 43 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		var _vm = __webpack_require__(6);

		var _vm2 = _interopRequireDefault(_vm);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		(0, _vm2.default)();

		/***/ }),
	/* 44 */,
	/* 45 */,
	/* 46 */,
	/* 47 */,
	/* 48 */,
	/* 49 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		var alertEl = document.querySelector(".q-alert");
		var close = document.querySelector(".q-alert__close");

		if (alertEl) {
			close.addEventListener("click", function () {
				alertEl.classList.add("q-alert--hidden");
			});
		}

		/***/ }),
	/* 50 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _timelinelite = __webpack_require__(0);

		var _timelinelite2 = _interopRequireDefault(_timelinelite);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var Modal = function () {
			function Modal(el, vimeoUrl) {
				_classCallCheck(this, Modal);

				this.el = el;
				this.vimeoUrl = vimeoUrl;
				el.addEventListener("click", this.onOpen.bind(this));
			}

			_createClass(Modal, [{
				key: "build",
				value: function build() {
					this.el.appendChild(this.getContent());
					this.postBuild();
				}
			}, {
				key: "postBuild",
				value: function postBuild() {
					this.playerEl.classList.add("q-company-video__vimeo-video");
				}
			}, {
				key: "getScript",
				value: function getScript() {
					if (document.getElementById("vimeo-player")) {
						return Promise.resolve();
					}

					return new Promise(function (resolve) {
						var s = document.createElement("script");
						s.id = "vimeo-player";
						s.src = "https://player.vimeo.com/api/player.js";
						s.onload = resolve;

						document.body.appendChild(s);
					});
				}
			}, {
				key: "getContent",
				value: function getContent() {
					var playerEl = this.playerEl = document.createElement("div");

					return playerEl;
				}
			}, {
				key: "open",
				value: function open() {
					var _this = this;

					return new Promise(function (resolve) {
						if (!_this.playerEl) {
							_this.build();
						}

						new _timelinelite2.default().add("start").set(_this.el, { display: "block" }).call(resolve);
					});
				}
			}, {
				key: "onOpen",
				value: function onOpen(e) {
					var _this2 = this;

					e.preventDefault();

					this.open().then(this.getScript).then(function () {
						_this2.player = new window.Vimeo.Player(_this2.playerEl, {
							autoplay: true,
							url: _this2.vimeoUrl
						});
					});
				}
			}]);

			return Modal;
		}();

		exports.default = Modal;

		/***/ }),
	/* 51 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		var _InlineVideo = __webpack_require__(50);

		var _InlineVideo2 = _interopRequireDefault(_InlineVideo);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var instances = [];
		var els = document.querySelectorAll("[data-inline-video]");

		els.forEach(function (el) {
			var videoembed = el.dataset.videoembed;


			var instance = instances.find(function (i) {
				return i.key === videoembed;
			});

			if (!instance) {
				instances.push(new _InlineVideo2.default(el, videoembed));
			}
		});

		/***/ }),
	/* 52 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _Modal2 = __webpack_require__(7);

		var _Modal3 = _interopRequireDefault(_Modal2);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

		var Vimeo = function (_Modal) {
			_inherits(Vimeo, _Modal);

			function Vimeo(el, vimeoUrl) {
				_classCallCheck(this, Vimeo);

				var _this = _possibleConstructorReturn(this, (Vimeo.__proto__ || Object.getPrototypeOf(Vimeo)).call(this, el));

				_this.vimeoUrl = vimeoUrl;
				return _this;
			}

			_createClass(Vimeo, [{
				key: "postBuild",
				value: function postBuild() {
					this.contentEl.classList.add("q-modal__content--is-video");
				}
			}, {
				key: "getScript",
				value: function getScript() {
					if (document.getElementById("vimeo-player")) {
						return Promise.resolve();
					}

					return new Promise(function (resolve) {
						var s = document.createElement("script");
						s.id = "vimeo-player";
						s.src = "https://player.vimeo.com/api/player.js";
						s.onload = resolve;

						document.body.appendChild(s);
					});
				}
			}, {
				key: "getContent",
				value: function getContent() {
					var playerEl = this.playerEl = document.createElement("div");

					return playerEl;
				}
			}, {
				key: "onOpen",
				value: function onOpen(e) {
					var _this2 = this;

					e.preventDefault();

					this.open().then(this.getScript).then(function () {
						_this2.player = new window.Vimeo.Player(_this2.playerEl, {
							autoplay: true,
							url: _this2.vimeoUrl
						});
					});
				}
			}, {
				key: "onClose",
				value: function onClose(e) {
					e.preventDefault();

					this.close();
					this.el.remove();
					this.el = undefined;
				}
			}]);

			return Vimeo;
		}(_Modal3.default);

		exports.default = Vimeo;

		/***/ }),
	/* 53 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		var _Modal = __webpack_require__(7);

		var _Modal2 = _interopRequireDefault(_Modal);

		var _Vimeo = __webpack_require__(52);

		var _Vimeo2 = _interopRequireDefault(_Vimeo);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var instances = [];
		var els = document.querySelectorAll("[data-modal]");

		els.forEach(function (el) {
			var modal = el.dataset.modal;


			var instance = instances.find(function (i) {
				return i.key === modal;
			});

			if (!instance) {
				if (modal.indexOf("vimeo") !== -1) {
					instances.push(new _Vimeo2.default(el, modal));
				} else {
					instances.push(new _Modal2.default(el, modal));
				}
			}
		});

		/***/ }),
	/* 54 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		var _timelinelite = __webpack_require__(0);

		var _timelinelite2 = _interopRequireDefault(_timelinelite);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var Navigation = function () {
			function Navigation() {
				var _this = this;

				_classCallCheck(this, Navigation);

				this.speed = 0.25;
				this.isOpen = false;
				this.currentPanel = undefined;

				this.onMenuClick = function (e) {
					e.preventDefault();

					_this.isOpen = !_this.isOpen;

					if (_this.isOpen) {
						_this.open();
					} else {
						_this.close();
					}
				};

				this.onBackClick = function () {
					new _timelinelite2.default().fromTo(_this.currentPanel, _this.speed, { x: "0%" }, { x: "-100%" }).set(_this.currentPanel, { display: "none", zIndex: 0 });
				};

				this.onItemClick = function (e) {
					var target = e.target.dataset.target;

					var targetEl = _this.el.querySelector("[data-title=\"" + target + "\"]");

					if (!targetEl) return;

					e.preventDefault();

					_this.currentPanel = targetEl;

					new _timelinelite2.default().set(targetEl, { display: "block", zIndex: 1 }).fromTo(targetEl, _this.speed, { x: "-100%" }, { x: "0%" });
				};

				this.menuEls = document.querySelectorAll(".js-menu");
				this.backEls = document.querySelectorAll(".js-back");
				this.el = document.querySelector(".q-navigation-mobile");
				if (this.el !== null) {
					this.linkEls = this.el.querySelectorAll("[data-target]");
					this.panelEl = this.el.querySelector("q-navigation-mobile__panel--first");
				}

				this.attachEvents();
			}

			_createClass(Navigation, [{
				key: "attachEvents",
				value: function attachEvents() {
					var _this2 = this;

					this.menuEls.forEach(function (el) {
						return el.addEventListener("click", _this2.onMenuClick);
					});
					this.backEls.forEach(function (el) {
						return el.addEventListener("click", _this2.onBackClick);
					});
					if (this.linkEls !== undefined) {
						this.linkEls.forEach(function (el) {
							return el.addEventListener("click", _this2.onItemClick);
						});
					}
				}
			}, {
				key: "open",
				value: function open() {
					new _timelinelite2.default().set(this.el, { display: "block" }).fromTo(this.el, this.speed, { x: "-100%" }, { x: "0%" });
				}
			}, {
				key: "close",
				value: function close() {
					new _timelinelite2.default().fromTo(this.el, this.speed, { x: "0%" }, { x: "-100%" }).set(this.el, { display: "none" });
				}
			}]);

			return Navigation;
		}();

		var nav = new Navigation();

		/***/ }),
	/* 55 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
																			value: true
		});
		exports.default = undefined;

		var _Navigation = __webpack_require__(54);

		var _Navigation2 = _interopRequireDefault(_Navigation);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		exports.default = _Navigation2.default;

		/***/ }),
	/* 56 */,
	/* 57 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		if (window.NodeList && !NodeList.prototype.forEach) {
			NodeList.prototype.forEach = function (callback, argument) {
				argument = argument || window;
				for (var i = 0; i < this.length; i++) {
					callback.call(argument, this[i], i, this);
				}
			};
		}

		// https://tc39.github.io/ecma262/#sec-array.prototype.find
		if (!Array.prototype.find) {
			Object.defineProperty(Array.prototype, "find", {
				value: function value(predicate) {
					// 1. Let O be ? ToObject(this value).
					if (this == null) {
						throw new TypeError("\"this\" is null or not defined");
					}

					var o = Object(this);

					// 2. Let len be ? ToLength(? Get(O, "length")).
					var len = o.length >>> 0;

					// 3. If IsCallable(predicate) is false, throw a TypeError exception.
					if (typeof predicate !== "function") {
						throw new TypeError("predicate must be a function");
					}

					// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
					var thisArg = arguments[1];

					// 5. Let k be 0.
					var k = 0;

					// 6. Repeat, while k < len
					while (k < len) {
						// a. Let Pk be ! ToString(k).
						// b. Let kValue be ? Get(O, Pk).
						// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
						// d. If testResult is true, return kValue.
						var kValue = o[k];
						if (predicate.call(thisArg, kValue, k, o)) {
							return kValue;
						}
						// e. Increase k by 1.
						k++;
					}

					// 7. Return undefined.
					return undefined;
				}
			});
		}

		/***/ }),
	/* 58 */,
	/* 59 */,
	/* 60 */,
	/* 61 */
	/***/ (function(module, exports) {

		var g;

		// This works in non-strict mode
		g = (function() {
			return this;
		})();

		//try {
		// This works if eval is allowed (see CSP)
		// NOT ALLOWED
		//g = g || Function("return this")() || (1,eval)("this");
		//} catch(e) {
		// This works if the window reference is available
		if(typeof window === "object")
			g = window;
		//}

		// g can still be undefined, but nothing to do about it...
		// We return undefined, instead of nothing here, so it's
		// easier to handle this case. if(!global) { ...}

		module.exports = g;


		/***/ }),
	/* 62 */
	/***/ (function(module, exports) {

		module.exports = TweenLite;

		/***/ }),
	/* 63 */,
	/* 64 */,
	/* 65 */,
	/* 66 */,
	/* 67 */,
	/* 68 */,
	/* 69 */,
	/* 70 */,
	/* 71 */,
	/* 72 */,
	/* 73 */,
	/* 74 */,
	/* 75 */,
	/* 76 */,
	/* 77 */,
	/* 78 */,
	/* 79 */,
	/* 80 */,
	/* 81 */
	/***/ (function(module, exports, __webpack_require__) {

		__webpack_require__(27);
		__webpack_require__(28);
		module.exports = __webpack_require__(42);


		/***/ }),
	/* 82 */
	/***/ (function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(43);


		/***/ })
/******/ ]);
/* eslint-enable */

/*
 * lazy load print styles
 */
(function() {
	var s = document.getElementsByTagName("head")[0]
		, l = document.createElement("link");
	l.rel = "stylesheet";
	l.href = "/asset/stylesheet/shared.print.css";
	l.media = "print";
	s.appendChild(l);
})();

// The throttle function below was copied from the underscore.js library

window._ = window._ || {};
window._.now = window._.now || Date.now || function(){
	return new Date().getTime();
};

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
/* eslint-disable */
window._.throttle = window._.throttle || function(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function() {
		previous = options.leading === false ? 0 : _.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function() {
		var now = _.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};
/* eslint-enable */



/*
 * Fixed Header
 * Change the header content
 */
(function () {

	"use strict";

	var doc = document.querySelector("body");
	var globalheader = document.querySelector(".q-header");

	if (typeof Waypoint == "undefined") {
		console.log("Waypoint is not defined. This is probably an old page using an old layout.");
	} else if (globalheader !== null) {
		var showMenu = document.querySelector(".js-show-menu");
		var initialOffset = 1875;
		var offset = initialOffset;
		new Waypoint({
			element: doc,

			offset: function() {
				return -(offset);
			},

			handler: function handler(direction) {
				if (direction === "down") {
					globalheader.classList.add("q-header--fixed","q-header--compact");
				}
			}
		});
		new Waypoint({
			element: doc,

			offset: function() {
				return -offset;
			},

			handler: function handler(direction) {
				if (direction === "up") {
					globalheader.classList.remove("q-header--fixed","q-header--compact");
				}
			}
		});

		if (showMenu) {
			showMenu.addEventListener("click", function(){
				offset = document.documentElement.scrollTop + initialOffset;
				globalheader.classList.remove("q-header--compact");
				Waypoint.refreshAll();
			});
		}

		window.addEventListener("scroll", window._.throttle(function(){
			if (document.body.scrollTop === 0) {
				Waypoint.refreshAll();
				offset = initialOffset;
			}}, 100)
		);

		// waypoints for showing/hiding bottom header border as soon as user scrolls
		new Waypoint({
			element: doc,

			offset: function() {
				return -1;
			},

			handler: function handler(direction) {
				if (direction === "down") {
					globalheader.classList.add("q-header--border");
				} else if (direction === "up") {
					globalheader.classList.remove("q-header--border");
				}
			}
		});
	}
}());

/*
 * Search box in desktop header
 *
 */
(function () {

	"use strict";

	// native JS document ready function
	function ready(fn) {
		if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	// function to close search panel by triggering click on search close button
	function closeSearch(searchCloseBtn) {
		var event = document.createEvent("HTMLEvents");
		event.initEvent("click", true, false);
		searchCloseBtn.dispatchEvent(event);
		lastScrollTop = window.scrollY;
	}

	var lastScrollTop = 0;

	// when document is ready ...
	ready(function () {
		// get header element
		var searchBtn = document.querySelector(".q-header__actions .q-nav-actions__item--search-btn");

		if (searchBtn !== null) {
			// get elements
			var header = document.querySelector(".q-header");
			var searchCloseBtn = document.querySelector(".q-nav-actions__item--search-close");
			var overlayMask = document.querySelector(".overlay-mask");

			// toggle a class when the search button is clicked
			searchBtn.addEventListener("click", function () {
				header.classList.toggle("q-search-mode");
				overlayMask.classList.toggle("show");
				document.querySelector(".q-header .q-site-search-form__field-input").focus();

				// if user scrolls 100px either up or down, close the search panel
				lastScrollTop = window.scrollY;

				window.addEventListener("scroll", function () {
					header = document.querySelector(".q-header");
					if (header.classList.contains("q-search-mode")) {
						if (Math.abs(window.scrollY - lastScrollTop) > 100) {
							closeSearch(searchCloseBtn);
						}
					}
				});
			});

			// toggle a class when the search close button is clicked
			searchCloseBtn.addEventListener("click", function () {
				header.classList.toggle("q-search-mode");
				overlayMask.classList.toggle("show");
			});

			// close search box when user clicks the ESC key
			document.addEventListener("keyup", function (event) {
				if (event.keyCode == 27 && document.querySelector(".q-search-mode")) { // escape key maps to keycode `27`
					closeSearch(searchCloseBtn);
				}
			});

			// close search box when user clicks the overlay mask
			overlayMask.addEventListener("click", function () {
				if (document.querySelector(".q-search-mode")) {
					closeSearch(searchCloseBtn);
				}
			});
		}
	});

}());

/*
 * Search box in mobile header
 *
 */
(function () {

	"use strict";

	// native JS document ready function
	function ready(fn) {
		if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	// function to close mobile search box
	function closeMobileSearch(qNavigationMobile, mobileSearchInput, qNavigationMobileList) {
		qNavigationMobile.classList.remove("q-search-mode");
		if (mobileSearchInput) {
			mobileSearchInput.value = "";
		}
		qNavigationMobileList.setAttribute("style", "");
	}

	// when document is ready ...
	ready(function () {
		// get mobile nav element
		var qNavigationMobile = document.querySelector(".q-navigation-mobile");

		if (qNavigationMobile !== null) {
			var qClickHelper = document.querySelector(".q-click-helper");
			var qHideSearch = document.querySelector(".q-hide-search");
			var mobileSearchInput = document.querySelector(".q-search-mobile .q-site-search-form__field-input");
			var mobileNavCloseBtn = document.querySelector(".q-navigation-mobile__button");
			var qNavigationMobileList = document.querySelector(".q-navigation-mobile__list");
			var qNavigationMobileWrapper = document.querySelector(".q-navigation-mobile-wrapper");
			var qNavigationMobileLinkContainer = document.querySelector(".q-navigation-mobile__link-container");

			// set the top position and toggle a class when the mobile search field is clicked
			if (qClickHelper) {
				qClickHelper.addEventListener("click", function () {
					var qNavigationMobileListTopPadding = window.getComputedStyle(qNavigationMobileList, null).getPropertyValue("padding-top");
					var qNavigationMobileLinkContainerHeight = qNavigationMobileLinkContainer.clientHeight;

					// calculate the correct top position to scroll to using CSS transition
					var top = qNavigationMobileWrapper.scrollTop -
								qNavigationMobileLinkContainerHeight -
								parseInt(qNavigationMobileListTopPadding);

					qNavigationMobileList.setAttribute("style", "top: " + top + "px");
					qNavigationMobile.classList.add("q-search-mode");

					setTimeout(function(){
						mobileSearchInput.focus();
					}, 300);
				});
			}

			// close mobile search when certain buttons are clicked on
			if (qClickHelper) {
				qHideSearch.addEventListener("click", function () {
					closeMobileSearch(qNavigationMobile, mobileSearchInput, qNavigationMobileList);
				});
			}

			if (mobileNavCloseBtn) {
				mobileNavCloseBtn.addEventListener("click", function () {
					closeMobileSearch(qNavigationMobile, mobileSearchInput, qNavigationMobileList);
				});
			}
		}
	});
}());


/**
 * adjust anchor link jumps to accommodate sticky nav height
 * if element to click on is not an anchor tag, add data-href attribute to the tag,
 * e.g. <img data-href="#philippe-courtot" ..> as used on the Management page
 */
(function () {
	"use strict";

	// native JS document ready function
	function ready(fn) {
		if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	// when document is ready ...
	ready(function () {
		document.addEventListener("click", function(event){
			var element = event.target;
			var href = element.getAttribute("href");
			if (href === null) {
				href = element.getAttribute("data-href");
			}

			// if the link is an anchor link
			if (href !== null && href.charAt(0) === "#") {
				// use setTimeout 0 to run next command "immediately after" the previous (default) action of jumping to the anchor destination
				setTimeout(function(){
					// scroll down an additional 81 pixels to accommodate the height (81 px) of the sticky nav
					window.scrollBy(0, -81);
				}, 0);
			}
		});
	});
}());



/*
 * helper function for parsing Query strings
 */
(function () {
	"use strict";

	/*
	 * return object with param names and values
	 */
	function parseQueryString(queryString) {
		var params, readKey, key, value, characters, c, i, l, decoded;

		queryString = queryString || "";
		readKey = true;
		key = value = "";
		params = {};
		characters = queryString.split("");

		for (i = 0, l = characters.length; i < l; i += 1) {
			c = characters[i];

			if ((c === "?" && i === 0) || c === "&" || c === ";") {
				readKey = true;
			} else {

				if (c === "=") {
					readKey = false;
				} else {

					if (readKey) {
						key += c;
					} else {
						value += c;
					}
				}
			}

			if (c === "&" || c === ";" || i === (l - 1)) {
				decoded = {
					"key": decodeURIComponent(key.replace(/\+/g, " ")),
					"value": decodeURIComponent(value.replace(/\+/g, " "))
				};

				// put multiple values for the same key into an array
				if (hasOwnProperty(decoded.key)) {
					if (params[decoded.key] instanceof Array) {
						params[decoded.key] = params[decoded.key].concat(decoded.value);
					} else {
						params[decoded.key] = [params[decoded.key]].concat(decoded.value);
					}
				} else {
					params[decoded.key] = decoded.value;
				}

				key = value = "";
			}
		}

		return params;
	}
	window.qualys = window.qualys || {};
	window.qualys.parseQueryString = parseQueryString;


	/*
	 * return array of objects with cookie names and values
	 */
	function parseCookieString(cookieString) {
		var cookies;

		// basic DoS preventation
		if (cookieString.length > (20 * 4096)) {
			throw new Error("Cookie string too long. length = " + cookieString.length);
		}

		cookies = cookieString.split(/;\s*/).map(function (cs) {

			// basic DoS preventation
			if (cs.length > 4096) {
				throw new Error("Cookie too big. length = " + cs.length);
			}

			return {
				"name": cs.slice(0, cs.indexOf("=")),
				"value": cs.slice(cs.indexOf("=") + 1)
			};
		});

		return cookies;
	}

	window.qualys = window.qualys || {};
	window.qualys.parseCookieString = parseCookieString;
}());

/*
 * util - generate UUID from Math.random()
 */
(function registerQualysUtils () {

	"use strict";

	/**
	 * generateUUID - create a random UUID string
	 * @returns {String} uuid
	 */
	function generateUUID () {

		var template, uuid;

		template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
		uuid = template.replace(/[xy]/g, function generateRandomChar (match) {

			var number, value;

			number = Math.random() * 16 | 0;
			if (match === "x") {

				value = number;

			} else {

				value = number & 0x3 | 0x8;

			}

			return value.toString(16);

		});

		return uuid;

	}

	window.qualys = window.qualys || {};
	window.qualys.utils = window.qualys.utils || {};
	window.qualys.utils.generateUUID = generateUUID;

}());

// display free trial form in an overlay after 30 seconds
(function () {
	"use strict";
	// check cookie that determines if user has seen and closed the free trial overlay
	var freeTrialOverlayCookie = document.cookie.match(/qualys\.free-trial\.overlay/);

	// native JS document ready function
	function ready(fn) {
		if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	// if this is the first time the user has seen the free trial overlay
	// or if the free trial cookie has expired (deleted by the browser)
	if (!freeTrialOverlayCookie) {
		// when document is ready ...
		ready(function () {
			// load JS library if not already loaded
			function loadScriptIfNotDefined(src, onloadCallback) {
				var headTag = document.getElementsByTagName("head")[0];
				var scriptTag = document.createElement("script");
				scriptTag.type = "text/javascript";
				scriptTag.src = src;
				scriptTag.onload = onloadCallback;
				headTag.appendChild(scriptTag);
			}

			// load jQuery if not already loaded
			function loadJqueryIfNotDefined() {
				if (typeof jQuery === "undefined") {
					loadScriptIfNotDefined("//code.jquery.com/jquery-3.2.1.min.js", loadFancyBoxIfNotDefined);
				} else {
					loadFancyBoxIfNotDefined();
				}
			}

			function loadFancyBoxIfNotDefined() {
				var $ = window.jQuery;
				// load FancyBox CSS if not already loaded
				var hasFancyBoxCssLink = $("link[href*='fancybox']").length;

				if (hasFancyBoxCssLink === 0) {
					$("<link/>", {
						rel: "stylesheet",
						type: "text/css",
						href: "https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.25/jquery.fancybox.min.css"
					}).appendTo("head");
				}

				// load FancyBox JS if not already loaded
				if (typeof $.fancybox === "undefined") {
					loadScriptIfNotDefined("https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.25/jquery.fancybox.min.js", displayFreeTrialOverlay.bind(null, $));
				} else {
					displayFreeTrialOverlay($);
				}
			}

			// show free trial overlay using FancyBox
			// http://fancyapps.com/fancybox/3/docs/#iframe
			function displayFreeTrialOverlay($) {
				$.fancybox.open({
					src: "/free-trial/iframe/",
					type: "iframe",

					opts: {
						baseTpl	:
							"<div class=\"fancybox-container free-trial-overlay-wrapper\" role=\"dialog\" tabindex=\"-1\">" +
								"<div class=\"fancybox-bg\"></div>" +
								"<div class=\"fancybox-inner\">" +
									"<div class=\"fancybox-infobar\">" +
										"<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>" +
									"</div>" +
									"<div class=\"fancybox-toolbar\">{{buttons}}</div>" +
									"<div class=\"fancybox-navigation\">{{arrows}}</div>" +
									"<div class=\"fancybox-stage\"></div>" +
									"<div class=\"fancybox-caption-wrap\"><div class=\"fancybox-caption\"></div></div>" +
								"</div>" +
							"</div>",
						tpl : "<iframe id=\"fancybox-frame{rnd}\" name=\"fancybox-frame{rnd}\" class=\"fancybox-iframe\" frameborder=\"0\" vspace=\"0\" hspace=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency=\"true\" src=\"\"></iframe>",
						// Preload iframe before displaying it
						// This allows to calculate iframe content width and height
						// (note: Due to "Same Origin Policy", you can't get cross domain data).
						preload : true,

						// Custom CSS styling for iframe wrapping element
						// You can use this to set custom iframe dimensions
						css : {},
						smallBtn : true,
						toolbar: false,

						// Iframe tag attributes
						attr : {
							scrolling : "auto"
						},
						afterClose : function() {

							if (location.hostname === "localhost") {

								// on localhost the cookie is not secure
								// and expires with the session
								document.cookie = [
									"qualys.free-trial.overlay=true",
									"path=/"
								].join("; ");

							} else {

								// set a cookie to expire in 1 day (24 hours)
								var expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
								document.cookie = [
									"qualys.free-trial.overlay=true",
									"domain=.qualys.com",
									"path=/",
									"expires=" + expires.toUTCString(),
									"secure=yes"
								].join("; ");

							}

						}
					}
				});
			}

			var pathname = window.location.pathname;
			// only show free trial overlay on the following pages
			var pathsToShowFreeTrialOverlay = [
				"/cloud-platform/",
				"/public-cloud/",
				"/private-cloud/",
				"/solution/",
				"/apps/"
			];

			if (pathsToShowFreeTrialOverlay.indexOf(pathname) !== -1) {
				// wait 30 seconds to display free trial overlay
				setTimeout(loadJqueryIfNotDefined, 30000);
			}
		});
	}
}());


// display mobile trial banner overlay

(function () {
	"use strict";

	// set cookie
	function setCookie() {
		// set a session cookie
		if (location.hostname === "localhost") {
			// on localhost the cookie is not secure
			// and expires with the session
			document.cookie = [
				"qualys.mobile-free-trial.overlay=true",
				"path=/"
			].join("; ");
		} else {
			// set a session cookie
			document.cookie = [
				"qualys.mobile-free-trial.overlay=true",
				"domain=.qualys.com",
				"path=/",
				"secure=yes"
			].join("; ");
		}
	}

	// check cookie that determines if user has seen and closed the free trial overlay
	var freeTrialOverlayCookie = document.cookie.match(/qualys\.mobile-free-trial\.overlay/);
	var closeButton = [].slice.call(document.querySelectorAll('.mobile-trial-overlay .close-button'));
	var mobileTrialOverlay = [].slice.call(document.querySelectorAll('.mobile-trial-overlay'));
	var trialButton = [].slice.call(document.querySelectorAll('.mobile-trial-overlay .q-button'));
	var pathname = window.location.pathname;
	var mobileTrialOverlayNode = document.querySelector('.mobile-trial-overlay');
	var showTrialOverlay = true;
	var pathsToNotShowFreeTrialMobileOverlay = [
		"/trial/",
		"/free-trial/",
		"/free-trial/confirm/",
		"/confirm/",
		"/company/privacy/content/",
		"/videos/2014/qualysguard/training/introduction-to-qualysguard-training-classes/",
		"/forms/trials/pci-compliance-iframe/",
		"/videos/2013/qualysguard/express-lite/",
		"/2018/qsc/las-vegas/get-invited/",
		"/ignite-videos/",
		"/ignite-videos/confirm/",
		"/partners/integration/list/",
		"/apps/vulnerability-management-detection-response/",
		"/forms/vmdr/",
		"/lp/vmdr/",
		"/partners/portal/"
	];

	// don't show trial overlay on trial pages and in iframes
	for (let path of pathsToNotShowFreeTrialMobileOverlay) {
		if (pathname.indexOf(path) !== -1) {
			showTrialOverlay = false;
			break;
		}
	}

	// check expiration of mobile trial overlay
	if (mobileTrialOverlayNode) {
		var expires = mobileTrialOverlayNode.getAttribute("data-expires");

		if (expires) {
			var expirationDate = new Date(expires);
			if (expirationDate && expirationDate < new Date()) {
				showTrialOverlay = false;
			}
		}
	}

	if (closeButton.length > 0 && mobileTrialOverlay.length > 0 && trialButton.length > 0 && showTrialOverlay) {
		// if cookie doesn't exist
		if (!freeTrialOverlayCookie) {
			// show the overlay
			mobileTrialOverlay[0].classList.remove("hidden");

			// when user clicks to close the overlay ...
			closeButton[0].addEventListener("click", function () {
				// hide the overlay
				mobileTrialOverlay[0].classList.add("hidden");
				setCookie();
			});

			// when user clicks to trial button in the overlay ...
			trialButton[0].addEventListener("click", function () {
				setCookie();
			});
		}
	}

}());

/*
 * Non-web packed hero animation
 * e.g. /support/sla/, /certview/
 */
(function () {

	function animateQualysHero() {
		var tl = new TimelineLite();
		var heroContent = document.querySelector(".heroContent") || null;
		var heroBox = document.querySelector(".heroBox") || null;
		var heroImage = document.querySelector(".heroImage") || null;
		var ease = window.Power4.easeInOut;
		var event;

		function onHeroContentComplete() {
			// trigger custom event to when hero content completes animating
			if (window.CustomEvent) {
				event = new CustomEvent("heroContentComplete");
			} else {
				event = document.createEvent("CustomEvent");
				event.initCustomEvent("heroContentComplete", true, true);
			}

			heroContent.dispatchEvent(event);
		}

		function onHeroImageComplete() {
			// trigger custom event to when hero image completes animating
			if (window.CustomEvent) {
				event = new CustomEvent("heroImageComplete");
			} else {
				event = document.createEvent("CustomEvent");
				event.initCustomEvent("heroImageComplete", true, true);
			}

			heroImage.dispatchEvent(event);
		}

		function onHeroBoxComplete() {
			// trigger custom event to when hero box completes animating
			if (window.CustomEvent) {
				event = new CustomEvent("heroBoxComplete");
			} else {
				event = document.createEvent("CustomEvent");
				event.initCustomEvent("heroBoxComplete", true, true);
			}

			heroBox.dispatchEvent(event);
		}

		tl.addLabel("start");

		if (heroContent !== null) {
			tl.staggerFromTo(heroContent.childNodes, 1, { y: "20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease, onComplete: onHeroContentComplete}, 0.1);
		}
		if (heroImage !== null) {
			tl.fromTo(heroImage, 1, { y: "30%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease, onComplete: onHeroImageComplete }, "start+=.8");
		}
		if (heroBox !== null) {
			tl.fromTo(heroBox, 1, { y: "-20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease, onComplete: onHeroBoxComplete}, "start+=.8");
		}
	}

	animateQualysHero();

	window.qualys = window.qualys || {};
	window.qualys.utils = window.qualys.utils || {};
	window.qualys.utils.animateQualysHero = animateQualysHero;
}());

/*
 * On hover, rotate tick mark beside More link in main nav
 */
(function () {
	var chevrons = document.querySelectorAll(".q-nav-chevron:last-of-type");

	if (chevrons) {
		Array.prototype.forEach.call(chevrons, function(el){
			el.addEventListener('mouseover', function () {
				el.classList.remove("out");
				el.classList.add("over");
			});

			el.addEventListener('mouseout', function () {
				el.classList.remove("over");
				el.classList.add("out");
			});
		});
	}
}());

// inject partner logo based on leadsource URL parameter
// show/hide conditional messages on confirmation pages
(function() {
	// native JS document ready function
	function ready(fn) {
		if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	function injectPartnerLogo() {
		var leadsource, url, urlParams;

		// get the leadsource parameter value from the URL query string
		urlParams = qualys.parseQueryString(window.location.search);
		if (typeof urlleadsource !== 'undefined') {
			leadsource = urlleadsource;
		}

		function getLogo(url) {
			// AJAX in the partner logo
			var request = new XMLHttpRequest();
			request.open("GET", url, true);

			request.onload = function() {
				if (this.status >= 200 && this.status < 400) {
					// Success!
					// trigger the customer partnerLogoExists event
					switch (document.readyState) {
					case "uninitialized":
					case "loading":
						ready(function () {
							document.dispatchEvent(partnerLogoExistsEvent);
						});
						break;
					case "interactive":
					case "complete":
						document.dispatchEvent(partnerLogoExistsEvent);
						break;
					}
				} else {
					// We reached our target server, but it returned an error

				}
			};

			request.onerror = function() {
				// There was a connection error of some sort
			};

			request.send();
		}

		// create custom event called partnerLogoExistsEvent
		var partnerLogoExistsEvent;

		if (window.CustomEvent) {
			partnerLogoExistsEvent = new CustomEvent("partnerLogoExistsEvent");
		} else {
			partnerLogoExistsEvent = document.createEvent("CustomEvent");
			partnerLogoExistsEvent.initCustomEvent("partnerLogoExistsEvent", true, true);
		}

		// if the leadsource value exists
		if (leadsource && typeof leadsource === "string") {
			// strip non-digits from the leadsource value and build the url to png logo
			url = "/images/logos/lsid-partners/" + leadsource.replace(/\D+/g, "") + ".png";
			// see if the partner logo (png) exists
			getLogo(url);

			document.addEventListener("partnerLogoExistsEvent", function () {
				var qHeaderNavigation = document.querySelector(".q-header__navigation");
				var qHeaderActions = document.querySelector(".q-header__actions");
				var contactUs = document.querySelector(".contact-us");
				var contactAlliances = document.querySelector(".contact-alliances");

				qHeaderNavigation.classList.add("hidden");
				qHeaderActions.classList.add("hidden");
				qHeaderActions.insertAdjacentHTML("afterend", "<img class=\"partner-logo\" src=\"" + url + "\"/>");
				// on form confirmation pages, hide general contact info and unhide alliances contact info
				if (contactUs !== null) {
					contactUs.classList.add("hidden");
				}
				if (contactAlliances !== null) {
					contactAlliances.classList.remove("hidden");
				}
			});
		}
	}

	var pathname = window.location.pathname;
	// only show partner logo co-branding on the following pages
	var pathsToPartnerBranding = [
		"/free-trial/",
		"/forms/",
		"/community-edition/",
		"/certview/",
		"/cloudview/"
	];

	for (var i = 0; i < pathsToPartnerBranding.length; i++) {
		if (pathname.indexOf(pathsToPartnerBranding[i]) === 0) {
			injectPartnerLogo();
		}
	}
})();

// inject arrow image to text links to support multiline links
(function() {
	// get all links with class "q-link"
	var qLinks = document.querySelectorAll(".q-link");

	function decodeHtml(html) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}

	// loop over each link
	[].forEach.call(qLinks, function(qLink) {
		var arrowImage = "link-arrow.svg";

		if (qLink.classList.contains("q-link--white")) {
			arrowImage = "arrow-right-white.svg";
		} else if (qLink.classList.contains("q-link--gray")) {
			arrowImage = "arrow-right-gray.svg";
		}

		// get the link text
		var text = qLink.textContent.trim();
		var textArray = text.split(" ");

		// get the last word of the link text
		var lastWord = textArray.pop();
		// get the first word(s) of the link text
		var firstWords = textArray.join(" ");

		// create text nodes for the link text
		var firstWordsNode = document.createTextNode(decodeHtml(firstWords + " "));
		var lastWordNode = document.createTextNode(lastWord);

		// create an arrow node for the link arrow
		var arrowElement = document.createElement("img");
		arrowElement.setAttribute("class", "link-arrow");
		arrowElement.setAttribute("src", "https://ik.imagekit.io/qualys/image/icon/" + arrowImage);
		arrowElement.setAttribute("width", "7");
		arrowElement.setAttribute("height", "10");

		// create a span node to wrap the last word with the link arrow
		var span = document.createElement("span");
		span.setAttribute("class", "nowrap");

		// remove the original link's text
		qLink.innerHTML = "";
		// add the link text and arrow
		qLink.appendChild(firstWordsNode);
		span.appendChild(lastWordNode);
		span.appendChild(arrowElement);
		qLink.appendChild(span);
	});
})();

/*
 * Play video when user clicks poster image
 */
(function() {
	"use strict";

	var poster = document.querySelector(".single-video-wrapper .poster");
	var playIcon = document.querySelector(".single-video-wrapper .play-icon");

	if (poster) {
		poster.addEventListener("click", playVideo);
	}

	if (playIcon) {
		playIcon.addEventListener("click", playVideo);
	}

	function playVideo() {
		var iframe = document.querySelector(".single-video-wrapper iframe");
		var player = new Vimeo.Player(iframe);
		poster.classList.add("hidden");
		playIcon.classList.add("hidden");
		player.play();
	}
} ());

/*
 * if a visitor closes the ad on the homepage
 * then remember that for 24 hours
 */
(function () {

	"use strict";

	function handleClick () {

		// hide promo banner
		promoBanners = [].slice.call(document.querySelectorAll(".js-promo-banner"));

		if (promoBanners) {
			promoBanners.forEach(function (promo, index) {
				promoBanners[index].classList.add("promo--hidden");
			});
		}

		// set a cookie to expire in 1 day (24 hours)
		var oneDayFromNow = new Date((new Date()).getTime() + (24 * 60 * 60 * 1000));
		document.cookie = [
			"qualys.promo.banner.notice=false",
			"path=/",
			"expires=" + oneDayFromNow.toUTCString(),
			"secure=yes"
		].join("; ");

	}

	var promoBanners;

	// if the promo banner cookie doesn't exist, show one promo banner at a time
	if (!document.cookie.match(/qualys\.promo\.banner\.notice/)) {

		// get array of promo banners
		var promos = [].slice.call(document.querySelectorAll(".js-promo-banner"));

		// get client's current time in seconds
		var seconds = Math.round((Date.now() || (new Date()).getTime()) / 1000);

		// filter out expired promos
		promos = promos.filter(function (promo) {

			var expires = promo.getAttribute("data-expires");
			if (expires) {
				var expirationDate = new Date(expires);
				if (expirationDate && expirationDate > new Date()) {
					return promo;
				}
			}

		});

		// randomly get index of one promo banner to show
		var index = seconds % promos.length, lc, noBanner = false;

		// do not show banner for pages under certain locations
		const lcs = ["whitepapers", "forms", "free-trial", "lp"];
		const pname = window.location.pathname;


		for (lc of lcs) {
			if( pname.indexOf(lc) >= 0 ){
				noBanner = true;
				break;
			}
		}

		// show one promo banner
		if (index >= 0 && !noBanner) {
			promos[index].classList.remove("promo--hidden");
		}

	}

	// when user clicks to close the promo banner close button, call the handleClick function
	var promoBannerCloseButtons = [].slice.call(document.querySelectorAll(".q-alert__close"));

	if (promoBannerCloseButtons) {
		promoBannerCloseButtons.forEach(function (button) {
			button.addEventListener("click", handleClick);
		});
	}

}());

// promo banner

(function () {

	"use strict";

	var promoAssetInventory = document.querySelector(".js-promo-banner");
	var body = document.querySelector("body");
	var closeButton = document.querySelector(".q-alert__close");

	function closeAlertBanner(){
		body.classList.remove("q-has-promo-banner");
	}

	if(promoAssetInventory && !promoAssetInventory.classList.contains("promo--hidden")) {

		body.classList.add("q-has-promo-banner");

		new Waypoint({
			element: body,
			offset: "-40px",
			handler: function(direction) {
				if (direction === "down") {
					body.classList.add("header-sticky");
				}
				if (direction === "up") {
					body.classList.remove("header-sticky");
				}
			}
		});

		closeButton.addEventListener("click", closeAlertBanner);
	}
}());

// laptop / screenshot animation

(function () {

	"use strict";

	function setWaypointAndAnimation(wayPointElementId, wayPointOffset, timeLineElementClass) {
		var animationStarted = false;
		var t = new TimelineLite();
		var ease = window.Power4.easeInOut;

		// get timeline elements
		var timeLineElement = document.querySelectorAll(timeLineElementClass);
		if (timeLineElement.length === 0) {
			timeLineElement = document.querySelectorAll("#" + wayPointElementId + " .q-ipad");
		}

		// determine start position and direction of animation
		var xStart = "25%";

		if (window.innerWidth > 1080) {
			var wayPointElement = document.getElementById(wayPointElementId);
			if (wayPointElement.classList.contains("rtl")) {
				xStart = "-25%";
			}
		}

		new Waypoint({
			element: document.getElementById(wayPointElementId),
			offset: wayPointOffset,
			handler: function (direction) {
				if (direction === "down" && !animationStarted) {
					animationStarted = true;
					t.fromTo(
						timeLineElement,
						1,
						{
							x: xStart,
							autoAlpha: 0
						},
						{
							x: "0%",
							autoAlpha: 1,
							ease: ease
						}
					);
				}
			}
		});
	}

	var screenshots = document.querySelectorAll(".q-apps-screenshot__image");

	Array.prototype.forEach.call(screenshots, function (screenshot, index) {
		// add unique id to each screenshot
		var wayPointElementId = "wayPoint" + index;
		screenshot.setAttribute("id", wayPointElementId);

		// set offset when animation should begin
		var wayPointOffset = "75%";

		// call animation function
		setWaypointAndAnimation(wayPointElementId, wayPointOffset, "#" + wayPointElementId + " .q-laptop");
	});
}());

/*
 * Lazy Load Images
 * https://www.stevefenton.co.uk/2019/09/html-loading-attribute-for-lazy-loading-images-and-iframes/
 */
(function () {
	"use strict";

	if ('loading' in HTMLImageElement.prototype) {
		// This uses the browser's own native lazy load
		const imageElements = document.querySelectorAll('img[loading="lazy"]');
		imageElements.forEach(img => { img.src = img.dataset.src; });
	} else { // for Safari
		// This downloads a polyfill from Cloudflare's CDN and makes it happen without the browser
		const lazyScript = document.createElement('script');
		lazyScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js';
		lazyScript.integrity = 'sha512-TmDwFLhg3UA4ZG0Eb4MIyT1O1Mb+Oww5kFG0uHqXsdbyZz9DcvYQhKpGgNkamAI6h2lGGZq2X8ftOJvF/XjTUg==';
		lazyScript.crossOrigin = "anonymous";
		document.body.appendChild(lazyScript);
	}
}());

(function () {
	"use strict";

	const downloadAnchors = document.querySelectorAll('a.js-downloadPdfLink');

	function genPresignedUrl(dataPdf) {
		const getPresignedApiUrl = "https://0n600u6dw8.execute-api.us-east-1.amazonaws.com/beta/presigned";
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			"file": dataPdf
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		return fetch(getPresignedApiUrl, requestOptions);	  
	}

	for (let downloadAnchor of downloadAnchors) {
		if (downloadAnchor.hasAttribute("data-pdf")) {
			let dataPdf = downloadAnchor.getAttribute("data-pdf");
			if(dataPdf !== "") {
				downloadAnchor.addEventListener("click", (event) => {
					event.preventDefault();
					if(!downloadAnchor.hasAttribute("disabled")) {
						downloadAnchor.style.cursor = 'wait';
						downloadAnchor.setAttribute('disabled', '');
						genPresignedUrl(dataPdf).then(response => response.json()).then((res) => {
							const downloadLink = document.createElement("a");
							downloadLink.classList.add("hidden");
							downloadLink.href = res.url;
							downloadLink.download = dataPdf;
							downloadLink.rel = "noopener";
							downloadLink.target="_blank";
							document.body.appendChild(downloadLink);
							downloadAnchor.style.cursor = "pointer";
							downloadAnchor.removeAttribute("disabled");
							downloadLink.click();
							document.body.removeChild(downloadLink);
						})
						.catch(error => console.log('error', error));
					}
				});	
			}
		}
	}
}());