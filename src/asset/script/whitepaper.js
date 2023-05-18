/* global Swiper:false */

(function () {

	"use strict";

	new Swiper(".swiper-container", {
		autoHeight: true,
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},
		navigation: {
			nextEl: ".q-lp__screenshot--next",
			prevEl: ".q-lp__screenshot--prev",
			disabledClass: "q-lp__screenshot--nav-disabled"
		}
	});

}());
