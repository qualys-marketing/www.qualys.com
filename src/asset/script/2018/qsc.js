/* global jQuery */
(function ($) {

	"use strict";

	/**
	 * when accessing an anchored URL, e.g. /2017/qsc/agenda/#training
	 * Firefox doesn't jump to the correct anchors below the Agenda / Training section because the
	 * Agenda / Training section uses jQuery Tools Tabs. As a fix, this code waits 1 second and then
	 * triggers a click event to smooth scroll the page to the correct anchor location
	 */
	$(document).on("ready", function () {
		if (window.location.hash) {
			// get hash value
			var hash = window.location.hash.substring(1);
			hash = hash.split("/");
			// do the following code after a brief pause to ensure smooth scrolling occurs AFTER default browser anchor jump event
			setTimeout(function(){
				// trigger click event on link with hash anchor
				$("a[href="+hash+"]").click();
			}, 0);
		}
	});


	/*
	 * toggle mobile nav on click of hamburger icon
	 */
	$(document).ready(function( $ ) {
		var $nav = $(".q-qsc__nav--container");

		$(".js-qsc__hamburger").on("click", function (event) {
			if ($nav.hasClass("q-qsc__menu--show")) {
				$nav.removeClass("q-qsc__menu--show");
			} else {
				$nav.addClass("q-qsc__menu--show");
			}
		});

	});

}(jQuery));
