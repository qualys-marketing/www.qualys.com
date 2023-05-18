/* global Swiper */
/*
 * Swiper for customer case study company info box
 */
(function () {
	"use strict";

	var companyInfoSwiper = new Swiper ('.box .swiper-container', {
		// Optional parameters
		loop: true,

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			type: 'bullets'
		},
		autoplay: false
	});

	var companyInfoBox = document.querySelector(".box.a");
	companyInfoBox.addEventListener("click", function () {
		companyInfoSwiper.slideNext();
	});

}());

/*
 * Swiper for quote box
 */
(function () {
	"use strict";

	var quoteBoxSwiper = new Swiper ('.quote-box.swiper-container', {
		// Optional parameters
		loop: true,

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			type: 'bullets'
		},
		autoplay: false
	});

	var quoteBox = document.querySelector(".quote-box");
	quoteBox.addEventListener("click", function () {
		quoteBoxSwiper.slideNext();
	});

}());