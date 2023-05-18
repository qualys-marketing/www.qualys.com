/* global jQuery */
/*
 * handle QSC mobile submenu
 */
(function ($) {
	"use strict";

	// close mobile nav after click submenu link
	$(".q-navigation-mobile-submenu__item .q-navigation-mobile__link").on("click", function () {
		$(".q-navigation-mobile__button").trigger("click");
	});

	// toggle expand / collapse of submenus
	$(".q-location-link.q-navigation-mobile__link").on("click", function (event) {
		var $submenu = $(event.currentTarget).parent().next(".submenu-container");
		var submenuStyleAttr = $submenu.attr("style");

		if (typeof submenuStyleAttr !== typeof undefined && submenuStyleAttr !== false && submenuStyleAttr === "display: block;") {
			// do nothing since submenu already expanded
		}
		else {
			$(".q-navigation-mobile__list .submenu-container").slideUp();
			$submenu.slideDown();
		}
	});
}(jQuery));