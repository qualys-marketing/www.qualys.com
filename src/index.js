/* global _ Waypoint Vimeo TimelineLite Swiper:false */

/* eslint-disable */
webpackJsonp([2],{

/***/ 										15:
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		var _timelinelite = __webpack_require__(0);

		var _timelinelite2 = _interopRequireDefault(_timelinelite);

		var _waypoint = __webpack_require__(1);

		var _waypoint2 = _interopRequireDefault(_waypoint);

		var _quoteBox = __webpack_require__(56);

		var _quoteBox2 = _interopRequireDefault(_quoteBox);

		var _tp = __webpack_require__(4);

		var _tp2 = _interopRequireDefault(_tp);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		// toggle quotes
		// homepage js
		(0, _quoteBox2.default)();

		// // animate laptop
		// (0, _tp2.default)();

		// hero animations
		var t1 = new _timelinelite2.default();

		var ease = window.Power4.easeInOut;
		var hero = document.querySelector(".q-home-hero");
		// var heroContent = document.querySelector(".q-home-hero__content");
		// var headings = heroContent.childNodes;
		var numbersEl = document.querySelector(".q-home__platform-numbers");
		var qslabEl = document.querySelector(".q-home__try");
		var feed = document.querySelector(".q-home-feed");
		//var heroDiagram = document.querySelector(".hero-diagram");

		function onHeroDiagramComplete() {
			// trigger custom event to when hero image completes animating
			if (window.CustomEvent) {
				event = new CustomEvent("heroDiagramComplete");
			} else {
				event = document.createEvent("CustomEvent");
				event.initCustomEvent("heroDiagramComplete", true, true);
			}

			//heroDiagram.dispatchEvent(event);
		}

		var waypoint1 = new _waypoint2.default({ // eslint-disable-line
			element: hero,

			offset: "100%",

			handler: function handler(direction) {
				if (direction === "down") {
					t1.addLabel("start"); // start time = 0

					// animate banner image
					// https://greensock.com/docs/TweenLite/static.fromTo()
					// .fromTo(element, duration (s), fromVars, toVars, startTime)
					// t1.fromTo(".q-home-hero__content-left", 1, { y: "30%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: ease }, "start+=.1");


					// animate position and alpha transparency of headings
					// t1.fromTo(".q-home-hero__introduction", 1.25, { autoAlpha: 0 }, { autoAlpha: 1, ease: ease }, "start+=0.25");
					t1.fromTo(".q-home-hero__heading .line1", 0.75, { y: "20px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease }, "start+=0.25");
					t1.fromTo(".q-home-hero__heading .line2", 0.75, { y: "20px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease }, "start+=0.50");
					t1.fromTo(".q-home-hero__heading .line3", 0.75, { y: "20px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease }, "start+=0.75");
					//t1.staggerFromTo(".q-home-hero__heading span", 1.25, "start+=0.25");
					t1.fromTo(".q-home-hero__text", 1, { y: "30px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease }, "start+=1");
					t1.fromTo(".q-home-hero__cta", 1, { autoAlpha: 0 }, { autoAlpha: 1, ease: ease }, "start+=1.25");

					t1.fromTo(".hero-diagram", 1, { x: "30px", autoAlpha: 0 }, { x: "0", autoAlpha: 1, ease: ease, onComplete: onHeroDiagramComplete }, "start+=0.85");
					t1.fromTo(".q-home-hero__graphic-caption", 1, { autoAlpha: 0 }, { autoAlpha: 1, ease: ease }, "start+=0.95");

				}
			}
		});

		var finish = false;
		function onFinish() {
			finish = true;
		}

		var t3 = new _timelinelite2.default();
		var waypoint2 = new _waypoint2.default({ // eslint-disable-line
			element: numbersEl,
			offset: "100%",

			handler: function handler(direction) {
				if (direction === "down" && !finish) {
					t3.fromTo(".q-home__platform-numbers-heading", 1, { y: "-20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: window.Power4.easeInOut }, 0.3)
					  .staggerFromTo(".q-numbers__item", 0.8, { y: "20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: window.Power4.easeInOut, onComplete: onFinish }, 0.2, "-=0.75");
				}
			}
		});

		var done = false;
		function onDone() {
			done = true;
		}

		var t4 = new _timelinelite2.default();
		var waypoint3 = new _waypoint2.default({ // eslint-disable-line
			element: qslabEl,
			offset: "100%",

			handler: function handler(direction) {
				if (direction === "down" && !done) {
					t4.addLabel("start"); // start time = 0
					t4.fromTo(".q-home__try", 0.74, { y: "50px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease , onComplete: onDone }, "start+=0.85");
					t4.fromTo(".q-slab-top", 0.74, { y: "-30px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease , onComplete: onDone }, "start+=1.55");
					t4.fromTo(".q-slab-middle", 0.74, { y: "-30px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease, onComplete: onDone }, "start+=1.45");
					t4.fromTo(".q-slab-bottom", 0.74, { y: "-30px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease, onComplete: onDone }, "start+=1.35");
					t4.fromTo(".q-home__try-heading", 0.6, { y: "30px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease, onComplete: onDone }, "start+=1.65");
					t4.fromTo(".q-home__try-text", 0.8, { y: "30px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease, onComplete: onDone }, "start+=1.65");
					t4.fromTo(".q-home__try-button", 0.8, { y: "30px", autoAlpha: 0 }, { y: "0", autoAlpha: 1, ease: ease, onComplete: onDone }, "start+=1.65");
				}
			}
		});

		// global IT laptop animation

		var laptopDone = false;
		function onLaptopDone() {
			laptopDone = true;
		}

		var t5 = new _timelinelite2.default();
		var globalLaptop = document.querySelector(".asset-inventory-dashboard");
		var waypoint5 = new _waypoint2.default({ // eslint-disable-line
			element: globalLaptop,
			offset: "60%",

			handler: function handler(direction) {
				if (direction === "down" && !laptopDone) {
					t5.fromTo("#ai-dashboard-laptop", 1, { x: "-25%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, ease: ease , onComplete: onLaptopDone });
				}
			}
		});

		// vulnerabilit age animation

		var vAgeDone = false;
		function onvAgeDone() {
			vAgeDone = true;
		}

		var t6 = new _timelinelite2.default();
		var vAgeLaptop = document.querySelector(".q-grid__container.intro");
		var waypoint5 = new _waypoint2.default({ // eslint-disable-line
			element: vAgeLaptop,
			offset: "60%",

			handler: function handler(direction) {
				if (direction === "down" && !vAgeDone) {
					t6.fromTo(".vm-widget", 1, { x: "25%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, ease: ease , onComplete: onvAgeDone });
				}
			}
		});

		// IT Security blue panels

		var bluePanelsDone = false;
		function onBluePanelsDone() {
			bluePanelsDone = true;
		}

		var t7 = new _timelinelite2.default();
		var bluePanelsContainer = document.querySelector(".it-security-blocks");
		var bluePanelLeft = document.querySelector(".q-home__security-panel.left-panel");
		var bluePanelRight = document.querySelector(".q-home__security-panel.right-panel");
		var waypoint6 = new _waypoint2.default({ // eslint-disable-line
			element: bluePanelsContainer,
			offset: "60%",

			handler: function handler(direction) {
				if (direction === "down" && !bluePanelsDone) {
					t4.addLabel("start"); // start time = 0
					t7.fromTo(bluePanelLeft, 1, { y: "50px", autoAlpha: 0 }, { y: "0px", autoAlpha: 1, ease: ease , onComplete: onBluePanelsDone }, "start+=0.25");
					t7.fromTo(bluePanelRight, 1, { y: "50px", autoAlpha: 0 }, { y: "0px", autoAlpha: 1, ease: ease , onComplete: onBluePanelsDone }, "start+=0.85");
				}
			}
		});

		// stagger in articles

		var complete = false;
		function onComplete() {
			complete = true;
		}
		var t2 = new _timelinelite2.default();
		var waypoint4 = new _waypoint2.default({ // eslint-disable-line
			element: feed,

			offset: "100%",

			handler: function handler(direction) {
				if (direction === "down" && !complete) {
					t2.staggerFromTo(".q-home-feed__item", 1, { y: "20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: window.Power4.easeInOut, onComplete: onComplete }, 0.1);
				}
			}
		});

		// stagger in apps grid

		var appsGrid = document.querySelector(".q-home__powerful-apps-page-container");

		var t8 = new _timelinelite2.default();
		var waypoint7 = new _waypoint2.default({ // eslint-disable-line
			element: appsGrid,

			offset: "100%",

			handler: function handler(direction) {
				if (direction === "down") {
					t8.staggerFromTo(".active-page .q-home-apps__block", 1, { y: "20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: window.Power4.easeInOut }, 0.1);
				}
			}
		});


		/***/ }),

	/***/ 										35:
	/***/ (function(module, exports) {

		// removed by extract-text-webpack-plugin

		/***/ }),

	/***/ 										56:
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		function quoteBox(el) {
			var box = el || document.querySelectorAll(".q-quote-box");

			var _loop = function _loop(i) {
				var counterEl = box[i].querySelector(".q-quote-box__counter");
				var current = box[i].querySelector(".q-quote-box__counter-current");
				var quotes = box[i].querySelectorAll(".q-blockquote");

				if (counterEl) {

					counterEl.addEventListener("click", function () {

						var activeEl = box[i].querySelector(".q-blockquote--active");

						if (activeEl.nextElementSibling) {
							activeEl.nextElementSibling.classList.add("q-blockquote--active");
						} else {
							quotes[0].classList.add("q-blockquote--active");
						}

						activeEl.classList.remove("q-blockquote--active");

						for (var j = 0; j < quotes.length; j++) {

							if (quotes[j].classList.contains("q-blockquote--active")) {
								current.innerText = j + 1;
							}
						}
					});
				}
			};

			for (var i = 0; i < box.length; i++) {
				_loop(i);
			}
		}

		exports.default = quoteBox;

		/***/ }),

	/***/ 										69:
	/***/ (function(module, exports, __webpack_require__) {

		__webpack_require__(15);
		module.exports = __webpack_require__(35);


		/***/ })

},[69]);
/* eslint-enable */

/*
 * testimonial carousel
 */
(function () {

	"use strict";

	var testimonialSwiper = new Swiper('.testimonial-container', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
	});

	document.querySelector(".slide-0").addEventListener("click", function () {
		testimonialSwiper.slideTo(0, 400);
	});
	document.querySelector(".slide-1").addEventListener("click", function () {
		testimonialSwiper.slideTo(1, 400);
	});
	document.querySelector(".slide-2").addEventListener("click", function () {
		testimonialSwiper.slideTo(2, 400);
	});
	document.querySelector(".slide-3").addEventListener("click", function () {
		testimonialSwiper.slideTo(3, 400);
	});

	var slideTabs = document.querySelectorAll(".slide-tab");

	testimonialSwiper.on("slideChange", function ( ) {
		var activeTab = document.querySelector(".slide-" + testimonialSwiper.activeIndex );
		Array.prototype.forEach.call(slideTabs, function(el){
			el.classList.remove("active-slide-tab");
			activeTab.classList.add("active-slide-tab");
		});
	});


}());

/*
 * apps tabs
 */
(function () {

	// active/current tab function

	var j, i, appsTabs, appsMenuTabs, pages, currentPage, currentMenu, appMenuOverlay, t9;

	appsTabs = document.querySelectorAll(".apps-tab");
	appsMenuTabs = document.querySelectorAll(".apps-menu-tab");
	pages = document.querySelectorAll(".apps-page");
	appMenuOverlay = document.querySelector(".app-category-menu-overlay");

	for(j = 0; j < appsTabs.length; j++) {
		appsTabs[j].addEventListener("click", clickTab);
		appsMenuTabs[j].addEventListener("click", clickMenuTab);
	}

	appMenuOverlay.addEventListener("click", function(){
		appMenuOverlay.classList.toggle("menu-active");
	});

	// event listener function
	function clickTab(e) {

		var pageID = e.currentTarget.getAttribute("data-tab");

		for (i = 0; i < appsTabs.length; i++) {
			// deactivate all tabs
			appsTabs[i].classList.remove("active-tab");
			// hide all pages
			pages[i].classList.remove("active-page");
		}

		// activate current tab
		e.currentTarget.classList.add("active-tab");

		// show current page
		currentPage = document.querySelector("."+ pageID);
		currentPage.classList.add("active-page");
		t9 = new TimelineLite();
		t9.staggerFromTo("."+ pageID +" .q-home-apps__block", 1, { y: "20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: window.Power4.easeInOut }, 0.1);

	}

	function clickMenuTab(e) {

		var pageID = e.currentTarget.getAttribute("data-tab");
		var menuID = e.currentTarget.getAttribute("data-menu");

		for (i = 0; i < appsTabs.length; i++) {
			// deactivate all tabs
			appsTabs[i].classList.remove("active-tab");
			// hide all pages
			pages[i].classList.remove("active-page");
		}

		appMenuOverlay.classList.remove("menu-active");

		currentMenu = document.querySelector("."+ menuID);
		currentMenu.classList.add("active-tab");

		// show current page
		currentPage = document.querySelector("."+ pageID);
		currentPage.classList.add("active-page");

		t9 = new TimelineLite();
		t9.staggerFromTo("."+ pageID +" .q-home-apps__block", 1, { y: "20%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: window.Power4.easeInOut }, 0.1);


	}

	var appSliderInit, viewportWidth, allAppSliders;

	appSliderInit = 0;
	allAppSliders = document.querySelectorAll(".q-home-apps__slider");

	function updateAppsSwiper(){

		viewportWidth = window.innerWidth;
		if( viewportWidth < 720 ){
			if( !appSliderInit ){

				for (i = 0; i < allAppSliders.length; i++) {
					new Swiper( allAppSliders[i], {
						slidesPerView: "auto",
						centeredSlides: false,
						spaceBetween: 15,
						observer: true,
						observeParents: true,
						on: {
							init: function () {
								appSliderInit = 1;
							},
						},
					});
				}
			}
		}
	}

	updateAppsSwiper();

	var derecalc = _.debounce( updateAppsSwiper , 200);

	window.addEventListener("resize", derecalc );

}());

(function () {

	"use strict";

	// init news and events carousel
	new Swiper(".swiper-container", {
		slidesPerView: "auto",
		navigation: {
			nextEl: ".q-carousel-button--next",
			prevEl: ".q-carousel-button--prev",
			disabledClass: "q-carousel-button--disabled"
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
		centeredSlides: false,
		spaceBetween: 30
	});

	// init home hero carousel
	new Swiper(".swiper-container-hero", {
		speed: 1000, // speed in milliseconds
		effect: 'slide', // 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
		slidesPerView: "auto",
		navigation: false,
		pagination: {
			el: '.swiper-pagination-hero',
			type: 'bullets',
			clickable: true
		},
		// autoplay: false,
		autoplay: {
			delay: 6500, // duration of each slide in ms
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		},
		loop: true,
		autoHeight: false
	});

}());

// Toggle cloud platform lists

(function () {

	"use strict";

	var numbersList = document.querySelectorAll(".q-home__cp-list");

	Array.prototype.forEach.call(numbersList, function(el){
		el.addEventListener("click", function(){

			// toggle the minus class
			if( !el.classList.contains("mobile-active")){
				el.classList.toggle("active");
			}
			el.classList.remove("mobile-active");
		});
	});

	var securityTabs = document.querySelectorAll(".q-home__security-panel-box");

	Array.prototype.forEach.call(securityTabs, function(el){
		el.addEventListener("click", function(){

			// toggle the minus class
			if( !el.classList.contains("mobile-active")){
				el.classList.toggle("active");
			}
			el.classList.remove("mobile-active");
		});
	});

}());

/*
 * Play video when user clicks poster image
 */
(function() {
	"use strict";

	var videoWrapper = document.querySelector(".q-home__video-poster");
	var poster = document.querySelector(".poster");
	var playIcon = document.querySelector(".q-home__video-poster-icon");
	poster.addEventListener("click", playVideo);
	playIcon.addEventListener("click", playVideo);

	function playVideo() {
		var iframe = document.querySelector(".vimeo-player");
		var player = new Vimeo.Player(iframe);

		videoWrapper.classList.add("video-playing");
		player.play();
	}
} ());

/**
 * animate global IT laptop
 */

// var animationStarted = false;
// var t = new _timelinelite2.default();
// var ease = window.Power4.easeInOut;

// new Waypoint({
// 	element: document.querySelector(".asset-inventory-dashboard"),
// 	offset: "75%",
// 	handler: function(direction) {
// 		if (direction === "down" && !animationStarted) {
// 			animationStarted = true;
// 			t.fromTo(
// 				"#ai-dashboard-laptop",
// 				1,
// 				{
// 					x: "25%",
// 					autoAlpha: 0
// 				},
// 				{
// 					x: "0%",
// 					autoAlpha: 1,
// 					ease: ease
// 				}
// 			);
// 		}
// 	}
// });