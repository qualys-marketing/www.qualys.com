/* global jQuery */
(function ($) {

	"use strict";

	function deliberatelyObfusticatedFunction(i) {
		var a, b, c;

		a = "";
		b = i.split(" ");
		c = b[1].split("-");

		if (b.length === 2) {

			if (c.length === 2) {
				b[1] = c[1];
			}
			a = (b[0].charAt(0) + b[1]).toLowerCase();
		} else {

			throw new Error(`input format error, input = &gt;&gt;&gt;${i}&lt;&lt;&lt;`);

		}

		return a + String.fromCharCode(0x40);
	}

	$(document).on("ready", function () {

		/* show a popup over each person's image in the image map */
		$("div.company-management-bodyshots area").on("mouseover", function (event) {
			var id;

			$("ul.company-management-links li").css({"display": "none"});

			/* get unique ID from area link */
			id = event.currentTarget.href.split("#").pop();
			$("ul.company-management-links li.company-management-" + id).fadeIn("fast");
		});

		/* animate the window scrolling to each anchor position */
		$("ul.company-management-links li a, div.company-management-bodyshots map area, div.back-to-top a").on("click", function (event) {
			var destinationElement, destinationOffset;

			destinationElement = $(event.currentTarget).attr("href").replace("#","");
			destinationOffset = $("#"+destinationElement).offset().top;

			$("html:not(:animated),body:not(:animated)").animate({
				scrollTop: destinationOffset-20
			}, 750, null, function () {
				window.location.hash = $(event.currentTarget).attr("href");
			});

			event.preventDefault();
		});

		$("a.company-management-bio-email").bind("click", function (event) {
			var href, hrefSplit, protocol, remainder;

			href = $(event.currentTarget).attr("href");
			hrefSplit = href.split(":");
			protocol = hrefSplit[0];
			remainder = decodeURIComponent(hrefSplit[1]);

			if (remainder.match(/\s/)) {
				$(event.currentTarget).attr("href", protocol + String.fromCharCode(0x3a) + deliberatelyObfusticatedFunction(remainder) + "qualys" + String.fromCharCode(0x2e, 0x63, 0x6f, 0x6d));
			}
		});
	});
}(jQuery));
