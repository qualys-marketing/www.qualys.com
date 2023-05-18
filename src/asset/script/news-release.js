/* global jQuery */
(function ($) {

	"use strict";

	// convert images so when clicked on, large version appears in an overlay
	$(".news-release-body img").each(function (index, element) {
		$(element).next("br").remove();
		$(element).parent("p").addClass("image-container");
		var imgUrl = $(element).attr("src");
		var imgCaption = $(element).parent().find("em").text();
		var link = `<a href="${imgUrl}" data-fancybox data-caption="${imgCaption}"></a>`;
		$(element).wrap(link);
	});

}(jQuery));
