/* global jQuery _ */

/**
 * Block all use of document.write
 * log it so we can identify where it is used and fix it
 */
(function () {
	"use strict";
	window.document.write = window.document.writeln = function () {
		throw new Error("Blocked unauthorized document write.");
	};
}());

/**
 * Remove preload-transition class from body tag on load
 */
(function ($) {
	"use strict";
	$(window).on("load", function () {
		$("body").removeClass("preload-transition");
	});
}(jQuery));


/*
 * make IE recalculate CSS calc() values when the window is resized
 * this is achieved by toggling the zoom property on the elements with calc()
 */
(function ($, _) {
	"use strict";

	if (navigator.userAgent.match(/Trident/i)) {
		var recalc, derecalc;

		recalc = function () {
			var zoom;

			zoom = $("div.section").css("zoom");

			if (zoom === "100%") {
				zoom = "normal";
			} else {
				zoom = "100%";
			}

			$("#footer, #prefooter, div.section").css({ "zoom": zoom });
		};

		derecalc = _.debounce(recalc, 50);

		$(window).on("resize", derecalc);
	}

}(jQuery, _));


/**
 * add wrapper element to support fixed width, fluid background elements
 * in browsers that do not support calc, a.k.a. IE8
 */
(function ($) {
	"use strict";

	function calcSupport(prefix) {
		prefix = prefix || "";
		var el = document.createElement("div");
		el.style.cssText = prefix + "width: calc(1px);";
		return !!el.style.length;
	}

	$(document).on("ready", function () {
		if (!calcSupport()) {
			$("#footer, #prefooter, #homepage").wrapAll("<div class=\"sectional\" />");
		}
	});
}(jQuery));


/**
 * TODO move this to a "listener" tag in GTM
 * TODO remove jQuery depenancy
 * code for which Google AdWords retargeting code to call
 * refactored with Google Tag Manager
 * https://docs.google.com/a/qualys.com/document/d/11dfrAzkIXdb7BhT31xum4ZCnaYWguXsSi8XWUkpXlRU/edit?usp=sharing
 * https://docs.google.com/a/qualys.com/spreadsheet/ccc?key=0AryvxVKUtJbFdGgwSWcxVDhkcGtmSGJnMm1ZY01jMXc#gid=0
 */
(function ($) {
	"use strict";

	/*
	 * async function to get the language tag
	 */
	function getLanguages(callback) {
		var isSupported = {
			"sessionStorage": false
		};
		// start by checking for native browser support
		if (navigator.languages !== undefined && navigator.languages !== null && navigator.languages.length !== undefined && navigator.languages.length !== null && navigator.languages.length > 0) {
			callback(navigator.languages);
		} else {
			// check if session storage is supported and allowed
			try {
				if (window.Storage && window.sessionStorage) {
					isSupported.sessionStorage = true;
				}
			} catch (e) {
				// attempting to access sessionStorage will throw a Security Exception if cookies and website data are always blocked by a client
				isSupported.sessionStorage = false;
			}
			// check local storage for a previous fetched value
			if (isSupported.sessionStorage && sessionStorage.getItem("navigator-languages")) {
				navigator.languages = JSON.parse(sessionStorage.getItem("navigator-languages"));
				callback(navigator.languages);
			} else {
				// make ajax call get value from header
				$.ajax({
					dataType: "json",
					url: "/header/accept-language/",
					success: function (data) {
						// remove the junk that specifies order since all modern browsers return the string in order
						data = data.replace(/;q=(0|1)\.\d+/, "");
						// split the comma separated string into an array
						navigator.languages = data = data.split(",");
						// save it to local storage for later
						if (isSupported.sessionStorage) {
							sessionStorage.setItem("navigator-languages", JSON.stringify(data));
						}
						callback(data);
					}
				});
			}
		}
	}

	/*
	 * callback to pass language to Google Tag Manager
	 */
	function passLanguageToGoogleTagManager(languages) {
		var locale, htmlLang, matches, data;

		data = {
			"event": "Language Ready"
		};

		// user preferred language
		locale = (languages[0] || "en-US");

		// page language overrides user language
		htmlLang = $("html").attr("lang");
		if (htmlLang && (!htmlLang.match(/^(en|en-US)$/i))) {
			locale = htmlLang;
		}

		// url language overrides page language
		matches = window.location.pathname.match(/\/([a-z]{2})\//);
		if (matches) {
			switch (matches[1]) {
			case "lp":
			case "ge":
				break;
			case "uk":
				locale = "en-GB";
				break;
			default:
				locale = matches[1];
				break;
			}
		}

		/*
		 * Syntax of language tags
		 * http://en.wikipedia.org/wiki/IETF_language_tag#Syntax_of_language_tags
		 */
		locale.split("-").forEach(function (subtag, index) {
			// a single primary language subtag
			if (index === 0 && subtag.match(/^([a-z]{2,3}|[a-z]{5,8})$/i)) {
				data["languageTag.language"] = subtag;
			}
			// up to three optional extended language subtags
			if (index >= 1 && index <= 3 && subtag.match(/^[a-z]{3}$/i)) {
				data["languageTag.extendedLanguage"] = subtag;
			}
			// an optional script subtag
			if (index >= 1 && index <= 4 && subtag.match(/^[a-z]{4}$/i)) {
				data["languageTag.script"] = subtag;
			}
			// an optional region subtag
			if (index >= 1 && index <= 5 && subtag.match(/^([a-z]{2}|\d{3})$/i)) {
				data["languageTag.region"] = subtag;
			}
			// optional variant subtags
			if (index >= 1 && subtag.match(/^(\d[a-z]{3}|[a-z]{5,8})$/i)) {
				data["languageTag.variant"] = subtag;
			}
			// TODO optional extension subtags
			// TODO an optional private-use subtag
		});
		// push this data to the google tag manager data layer
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push(data);
	}

	getLanguages(passLanguageToGoogleTagManager);
}(jQuery));


/*
 * FreeScan Patch Tuesday / OWASP, SCAP, etc
 * resize images based on viewport size
 * determine position of scrollable arrows based on height of viewport
 */
(function ($) {
	"use strict";

	$(document).ready(function () {
		if ($("body.forms.freescan, #forms_qualysguard_continuous-monitoring, div.scrollable-overlay").length > 0) {
			var maxImageWidth, maxImageHeight, viewportHeight, viewportWidth;

			maxImageWidth = 0;
			maxImageHeight = 0;
			viewportHeight = $(window).height();
			viewportWidth = $(window).width();

			$("div.jquery-tools-scrollable img").each(function (index, element) {
				var imageWidth, imageHeight, imageScale;

				imageWidth = $(element).width();
				imageHeight = $(element).height();
				/* scale down element size if element is larger than the browser window */
				if (imageWidth > viewportWidth) {
					imageHeight = Math.round(0.8 * viewportWidth * imageHeight / imageWidth);
					imageWidth = 0.8 * viewportWidth;
				}
				if (imageHeight > viewportHeight) {
					imageWidth = Math.round(0.8 * viewportHeight * imageWidth / imageHeight);
					imageHeight = 0.8 * viewportHeight;
				}

				imageScale = imageWidth / $(element).width();
				$(element).removeAttr("width").removeAttr("height").css("width", imageWidth).css("height", imageHeight);

				$(element).parent("div").css({
					"width" : imageWidth,
					"height" : imageHeight,
					"display" : "inline-block",
					"font-size" : (66 * imageScale) + "%"
				});

				// determine max image dimensions
				maxImageWidth = (imageWidth > maxImageWidth) ? imageWidth : maxImageWidth;
				maxImageHeight = (imageHeight > maxImageHeight) ? imageHeight : maxImageHeight;
			});

			// update overlay container to max image dimensions
			$("#overlay").css("width", maxImageWidth).css("height", maxImageHeight);

			// determine position of scrollable arrows based on height of viewport and arrow
			$("a.html-overlay").on("click", function () {
				var arrowHeight, topPosition;

				arrowHeight = 130; // height of arrows
				topPosition = (maxImageHeight / 2) - (arrowHeight / 2);
				$("#overlay a.prev, #overlay a.next").css("top", topPosition);
			});
		}
	});
}(jQuery));


/*
 * FreeScan Patch Tuesday / OWASP, SCAP, etc
 * Load screenshots only after clicking
 * overlay link
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		$(".html-overlay").on("click", function () {
			$("img[data-src]").each(function (index, item) {
				item.src = $(item).attr("data-src");
			});
		});
	});
}(jQuery));


/*
 * jQuery Tools tabs
 */
(function ($) {
	"use strict";

	$(document).ready(function () {

		// setup ul.tabs to work as tabs for each div directly under div.panes
		if (jQuery().tabs !== undefined && jQuery.tabs !== null) {
			$(".panes h3.year, .panes h3.day").addClass("disabled");
			$("div.tabs-without-javascript, ul.tabs-without-javascript")
				.addClass("tabs")
				.removeClass("tabs-without-javascript");

			// jQuery Tabs doesn"t support history for pages that contain multiple tab groups
			$("div.tabs, ul.tabs").each(function (index, item) {
				if (!$(item).hasClass("nested")) {
					var options, itemData;

					options = {
						"current": "active",
						"history": true
					};

					/* look for config data for each item and merge it into the default config */
					try {
						itemData = $.parseJSON($(item).attr("data-tabs-config"));
						if (itemData !== null) {
							$.extend(true, options, itemData);
						}
					} catch (e) {
						$.noop();
					}
					$(item).tabs("div.panes > div", options);
				}
			});
		}
	});
}(jQuery));


/*
 * find and initialize scrollable lists with jQuery Tools
 */
(function ($) {
	"use strict";
	$(document).ready(function () {
		$("div.jquery-tools-scrollable, form.jquery-tools-scrollable").each(function (index, item) {
			var total, totalItemWidth, totalItemHeight, maxItemHeight, itemHeight, itemData, firstElement, lastElement, options, windowWidth;
			/* helper function */
			function widthPlusMargin(element) {
				var marginLeft, marginRight;
				totalItemWidth = $(element).outerWidth();
				marginLeft = parseInt($(element).css("margin-left"), 10);
				if (marginLeft > 0) {
					totalItemWidth += marginLeft;
				}
				marginRight = parseInt($(element).css("margin-right"), 10);
				if (marginRight > 0) {
					totalItemWidth += marginRight;
				}
				return totalItemWidth;
			}

			options = {
				"autoScroll": {
					"autopause": true,
					"autoplay": true,
					"interval": 7000,
					"steps": 1
				},
				"circular": false,
				"clonedClass": "cloned",
				"disabledClass": "disabled",
				"easing": "swing",
				"items": ".items",
				"keyboard": true,
				"navigator": {
					"activeClass": "active",
					"history": false,
					"idPrefix": null,
					"indexed": false,
					"navi": ".navi",
					"naviItem": null
				},
				"next": ".next",
				"prev": ".prev",
				"speed": 400,
				"touch": false,
				"vertical": false,
				"showPageCount": false,
				"mobile": false
			};

			/* look for config data for each item and merge it into the default config */
			try {
				itemData = $.parseJSON($(item).attr("data-scrollable-config"));
				if (itemData !== null) {
					$.extend(true, options, itemData);
				}
			} catch (e) {
				$.noop();
			}

			// only show scrollable on desktop
			windowWidth = $(window).width();
			if (windowWidth > 640 || (windowWidth <= 640 && options.mobile === true)) {
				/* add elements required by jQuery Tools Scrollable */
				$(item)
					.children()
					.wrapAll("<div class=\"scrollable\" />")
					.wrapAll("<div class=\"items\" />");
				if (options.prev !== false) {
					$(item).prepend("<a class=\"prev\" />");
				}
				if (options.next !== false) {
					$(item).append("<a class=\"next\" />");
				}

				/* add elements required by jQuery Tools Scrollable Navigation plugin */
				if (options.navigator !== false) {
					$(item).append("<div class=\"navi\" />");
				}

				/* add page count elements */
				if (options.showPageCount !== false) {
					total = $(item).find("div.items").children().length;
					$(item).prepend("<div class=\"page-count\">Page: <span class=\"page-count-index\">1</span>/<span class=\"page-count-total\">" + total + "</span></div>");
					$(item).find("div.scrollable").on("onSeek", function () {
						var api = $(this).data("scrollable");
						if (api !== "undefined" && api !== null) {
							$(this).siblings("div.page-count").find("span.page-count-index").text(api.getIndex() + 1);
						}
					}).on("onAddItem", function () {
						var api = $(this).data("scrollable");
						if (api !== "undefined" && api !== null) {
							$(this).siblings("div.page-count").find("span.page-count-total").text(api.getSize());
						}
					});
				}

				/* calculate the total item width and the maximum item height */
				totalItemWidth = 0;
				totalItemHeight = 0;
				maxItemHeight = 0;
				$(item).find("div.items").children().each(function (index, child) {
					itemHeight = $(child).outerHeight();
					if (itemHeight > maxItemHeight) {
						maxItemHeight = itemHeight;
					}
					if (options.vertical === false) {
						totalItemWidth += widthPlusMargin(child);
					} else {
						totalItemHeight += $(child).outerHeight();
						totalItemHeight += parseInt($(child).css("margin-top"), 10);
						totalItemHeight += parseInt($(child).css("margin-bottom"), 10);
					}
				});

				/* add little extra space to the total width of the tray */
				totalItemWidth *= 1.1;
				$(item).find("div.scrollable").css({
					"height": maxItemHeight + "px"
				});
				if (options.vertical === false) {
					if (options.circular === true) {

						/* add the width of the first and last elements to the total width to account for the cloned elements */
						firstElement = $(item).find("div.items").children().first();
						lastElement = $(item).find("div.items").children().last();
						totalItemWidth += widthPlusMargin(firstElement);
						totalItemWidth += widthPlusMargin(lastElement);
					}
					$(item).find("div.items").css({
						"width": totalItemWidth + "px"
					});
				}

				/* save total and max item height for later */
				$(item).find("div.scrollable").data("totalItemHeight", totalItemHeight);
				$(item).find("div.scrollable").data("maxItemHeight", maxItemHeight);

				/* load jQuery Tools Scrollable */
				if ($().scrollable !== undefined && $().scrollable !== null) {
					$(item).find("div.scrollable").scrollable(options);
					if (options.navigator !== undefined && options.navigator !== null && options.navigator !== false) {
						$(item).find("div.scrollable").navigator(options.navigator);
					}
					if (options.autoScroll !== undefined && options.autoScroll !== null && options.autoScroll !== false) {
						$(item).find("div.scrollable").autoscroll(options.autoScroll);
					}
					$(item).find("div.scrollable").trigger("scrollableLoad");
				}
			}
		});
	});
}(jQuery));


/**
 * scroll features when page scrolls
 */
(function ($) {
	"use strict";
	$(document).on("ready", function () {
		$("div.jquery-tools-scrollable a").on("active", function (event) {
			var api, targetIndex, speed, $target, scrollableIndex;
			$target = $(event.currentTarget);
			api = $target.parents("div.scrollable").data("scrollable");
			scrollableIndex = api.getIndex();
			targetIndex = $target.index();
			speed = 0;
			if (targetIndex > (scrollableIndex + 6)) {
				api.move(1, speed);
			}
			if (targetIndex < scrollableIndex) {
				api.move(-1, speed);
			}
		});
	});
}(jQuery));


/*
 * switch the active highlight when the user selects another list item
 */
(function ($) {
	"use strict";

	$(document).on("mousedown", "div.active-tracking a, ul.active-tracking a", function () {

		$(this).closest("div.active-tracking, ul.active-tracking").find("a").removeClass("active");
		$(this).addClass("active");

	});
	$(document).on("ready", function () {

		$("div.active-tracking a, ul.active-tracking a").each(function (index, item) {

			var href = $(item).attr("href");

			// match the exact URL
			if (window.location.pathname === href || window.location.hash === href) {

				$(item).addClass("active");

			}

			// match if the window location starts with the link href
			var pattern = new RegExp("^" + href);
			if (pattern.test(window.location.pathname) || pattern.test(window.location.hash)) {

				$(item).addClass("active");

			}

		});

	});

}(jQuery));


/*
 * attach a script to print pages when a print page link is clicked
 */
(function ($) {
	"use strict";
	function replaceSprite(selector) {
		/*
		 * helper function to replace sprites with img tags for printing
		 * inspired by http://quickleft.com/blog/printing-css-sprites
		 * enhanced to work when the selector matches more than one element
		 * and to more any text in the element into the alt tag
		 * and to reset the text indent
		 * and to pass jslint with use strict
		 */
		var back_x, back_y, back_position, back_image,
			width, height, index1, index2, alt;
		$(selector).each(function (index, item) {
			var $item = $(item);
			if ($item.css("background-image") === "none") {
				return;
			}
			if ($.browser.msie === true) {
				back_x = $item.css("background-position-x");
				back_y = $item.css("background-position-y");
				back_position = back_x + " " + back_y;
			} else {
				back_position = $item.css("background-position");
			}
			back_image = $item.css("background-image");
			width = $item.width();
			height = $item.height();
			index1 = back_image.indexOf("http");
			index2 = back_image.indexOf(".png");
			alt = $item.text();
			back_position = back_position.split(" ");
			back_image = back_image.substring(index1, (index2 + 4));
			$item.text("").append("<img src=\"" + back_image + "\" alt=\"" + alt + "\" />").css({
				"background-image": "none",
				"height": height,
				"margin-left": back_position[0],
				"margin-top": back_position[1],
				"overflow": "hidden",
				"text-indent": 0,
				"width": width
			});
		});
	}
	$(window).on("beforeprint", function () {
		replaceSprite("#logo");
	});
	$(document).on("mousedown", "a.print-page", function (event) {
		/* show logo on printed pages */
		if (window.onbeforeprint === undefined || window.onbeforeprint === null) {
			replaceSprite("#logo");
		}
		event.preventDefault();
	}).on("mouseup", "a.print-page", function () {
		window.print();
		event.preventDefault();
	});
}(jQuery));

/*
 * print PDF of a page if a link to the PDF version is found
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		var $pdfElement = $("a.print-pdf");

		if ($pdfElement.length) {
			var pdfUrl = $pdfElement.attr("href");

			$(window).on("beforeprint", function () {
				window.location = pdfUrl;
			});
		}
	});

}(jQuery));

/*
 * Expand and collapse content blocks
 */
(function ($) {
	"use strict";
	$(document).on("ready", function () {
		$("div.collapsable, div.expandable").each(function (index, item) {
			var options, height, opacity, toggle, toggleClassName, itemData;

			options = {
				"animate": {
					"duration": 400,
					"easing": "swing",
					"complete": null,
					"step": null,
					"queue": true,
					"specialEasing": null
				},
				"toggleClass": "arrow-right",
				"toggleInPrevious": true,
				"expandText": "Expand",
				"collapseText" : "Collapse"
			};

			/* look for config data for each item and merge it into the defualt config */
			try {
				itemData = $.parseJSON($(item).attr("data-collapsable"));
				if (itemData !== null) {
					$.extend(true, options, itemData);
				}
				itemData = $.parseJSON($(item).attr("data-expandable"));
				if (itemData !== null) {
					$.extend(true, options, itemData);
				}
			} catch (e) {
				$.noop();
			}

			/* save the original height and opacity for later */
			height = $(item).height() + "px";
			opacity = $(item).css("opacity");

			/* create the html for the toggle link */
			toggleClassName = options.toggleClass;
			if (options.toggleInPrevious) {
				toggleClassName += " toggle-in-previous";
			}
			toggle = $("<a class=\"" + toggleClassName + "\" href=\"#\">" + options.expandText + "</a>");
			$(item).css({"height": 0, "opacity": 0, "overflow": "hidden"});
			$(toggle).on("click", function (event) {
				var div, previousHeight, previousMarginTop;
				if (options.toggleInPrevious) {
					div = $(event.currentTarget).parent().nextAll("div.collapsable:first, div.expandable:first");
				} else {
					div = $(event.currentTarget).nextAll("div.collapsable:first, div.expandable:first");
				}
				if ($(div).height() === 0) {

					/* save previous height and margin top to restore later */
					previousHeight = $(div).height() + "px";
					previousMarginTop = $(div).css("margin-top");

					/* set height to auto to calculate native height of element */
					/* set margin top to -100% to hide content of element and prevent page jumping */
					$(div).css({"height": "auto", "margin-top": "-100%"});
					height = $(div).height() + "px";

					/* restore previous values */
					$(div).css({"height": previousHeight, "margin-top": previousMarginTop});
					$(event.currentTarget).text(options.collapseText).toggleClass("open");
					$(div).animate({"height": height, "opacity": opacity});
				} else {
					$(event.currentTarget).text(options.expandText).toggleClass("open");
					$(div).animate({"height": 0, "opacity": 0});
				}
				event.preventDefault();
			});

			/* add toggle element to dom */
			if (options.toggleInPrevious) {
				$(item).prevAll(":not(br):first").append(toggle);
			} else {
				$(toggle).insertBefore(item);
			}
		});
	});
}(jQuery));


/*
 * toggle visibility of list of links in pre footer
 */
(function toggleMenusInPrefooter () {

	"use strict";

	function handleClickOnHeading (event) {

		if (window.matchMedia("(max-width: 640px)").matches) {
			event.currentTarget.parentNode.classList.toggle("column-is-closed");
			event.preventDefault();
		}

	}

	// hide each list of links in the pre footer on page load
	document.addEventListener("DOMContentLoaded", function () {

		var heading, index, length, lists, list;

		lists = document.querySelectorAll(".prefooter .column");

		length = lists.length;
		for (index = 0; index < length; index += 1) {

			list = lists[index];
			heading = list.querySelector("h6");
			list.classList.toggle("column-is-closed");
			heading.addEventListener("click", handleClickOnHeading);

		}

	});

}());


/*
 * jQuery Tools Overlay for various overlays
 */
(function ($) {
	"use strict";
	$(document).ready(function () {
		var $overlay,
			$overlayContent;

		$("a[data-rel]").each(function () {
			$(this).attr("rel", $(this).data("rel"));
		});
		// for scrollables in an overlay, set the width of the scrollable div
		//$("#overlay div.jquery-tools-scrollable").css("width", )
		if ($().overlay !== undefined && $().overlay !== null && $("a.image-overlay, a.text-overlay, a.iframe-overlay, a.iframe-presentation, a.html-overlay, a.inline-content-overlay").length > 0) {
			$("a.image-overlay, a.text-overlay, a.iframe-overlay, a.iframe-presentation, a.html-overlay, a.inline-content-overlay").overlay({
				effect: "default",
				mask: "#000",
				speed: 200,
				top: "center",
				onBeforeLoad: function () {
					var trigger, element, viewport, rel, filename, basepath, $video, scaleFactor;

					trigger = this.getTrigger();
					element = {
						height: trigger.attr("data-height"),
						src: trigger.attr("href"),
						width: trigger.attr("data-width"),
						scrolling: trigger.attr("data-scrolling")
					};

					viewport = {
						height: Math.round($(window).height()),
						width: Math.round($(window).width())
					};

					// if viewport is greater than 640 (desktop)
					if (Math.round($(window).width()) > 640) {
						scaleFactor = 0.9;
					} else { // otherwise, for mobile
						scaleFactor = 1;
					}

					viewport = {
						height: viewport.height * scaleFactor,
						width: viewport.width * scaleFactor
					};

					/* scale down element size if element is larger than the browser window */
					if (element.width > viewport.width) {
						element.height = Math.round(viewport.width * element.height / element.width);
						element.width = viewport.width;
					}
					if (element.height > viewport.height) {
						element.width = Math.round(viewport.height * element.width / element.height);
						element.height = viewport.height;
					}

					if (element.scrolling !== "no") {
						element.scrolling = "yes";
					}
					$overlay = this.getOverlay();
					if (trigger.hasClass("inline-content-overlay")) {
						$overlay.find("[id^=\"overlay_replace\"]").html($("#detail-" + element.src.substr(1)).clone().attr("id", ""));
						$overlay.find("div.detail").wrap("<div class=\"overlay-content\"></div>");
						$overlayContent = $overlay.find("div.overlay-content");
						$overlayContent.width(element.width);
						$("body").addClass("body-freeze");
						if (viewport.width <= 640) {
							$overlayContent.height(viewport.height).addClass("detail-port");
						} else {
							$overlayContent.height(element.height);
						}
					} else if (trigger.hasClass("image-overlay") && $overlay.hasClass("image")) {
						/* set image source url along with width and height */
						$overlay.find("[id^=\"overlay_replace\"]").html("<img width=\"" + element.width + "\" height=\"" + element.height + "\" src=\"" + element.src + "\" />");
					} else if (trigger.hasClass("iframe-overlay") && $overlay.hasClass("iframe")) {
						/* special logic for privacy content */
						if (element.src === "/company/privacy/") {
							element.src += "content/";
						}
						/* special logic for BrowserCheck Business Edition signup and PPC landing page forms in iframe overlay */
						// from pay per click landing page
						if (element.src.indexOf("/forms/browsercheck-business-edition/") !== -1 || element.src.indexOf("/forms/trials/web_application_scanning/") !== -1 || element.src.indexOf("/forms/trials/pci_compliance/") !== -1 || element.src.indexOf("/forms/trials/vulnerability_management/") !== -1 || $overlay.hasClass("video")) {
							element.scrolling = "no";
						}
						/* set iframe source url along with width and height */
						$("span.video-shadow").addClass("disabled");
						$overlay.find("[id^=\"overlay_replace\"]").replaceWith("<iframe width=\"" + element.width + "\" height=\"" + element.height + "\" src=\"" + element.src + "\" scrolling=\"" + element.scrolling + "\"/>");
					} else if (trigger.hasClass("iframe-presentation") && $overlay.hasClass("iframe")) {
						// replace overlay with HTML 5 video from Amazon S3
						$overlay.addClass("video-presentation-overlay2");
						$("#overlay_replace").replaceWith("<iframe id=\"overlay_replace\" class=\"video-presentation-overlay2\" src=\"" + this.getTrigger().attr("href") + "\" scrolling=\"no\"/>");
					} else if ($overlay.hasClass("video")) {
						rel = $overlay.attr("id");
						filename = $("[data-rel=#" + rel + "]").attr("href");
						filename = filename.replace("-Desktop.m4v", "");
						filename = filename.replace("//d1dejaj6dcqv24.cloudfront.net/videos/careers/", "");
						basepath = "//d1dejaj6dcqv24.cloudfront.net/videos/careers/";
						$video = $overlay.find("video").remove();
						$video.find("source[type=\"video/mp4\"]:eq(0)").attr("src", basepath + filename + ".mov");
						$video.find("source[type=\"video/mp4\"]:eq(1)").attr("src", basepath + filename + "-Desktop.m4v");
						$video.find("source[type=\"video/webm\"]").attr("src", basepath + filename + ".webm");
						$overlay.prepend($video);
						$video.load();
					}
				},
				onLoad: function() {
					$overlay = this.getOverlay();
					$overlayContent = $overlay.find("div.overlay-content");
					var trigger = this.getTrigger();
					// perform comparison on load instead of on before load because dimension
					if (trigger.hasClass("inline-content-overlay") && $(window).width() > 640 && $(window).height() < $overlayContent.height()) {
						$overlay.css({
							top: Math.round($(window).height() * 0.05)
						});
						$overlayContent.css({
							height: Math.round($(window).height() * 0.9)
						}).addClass("detail-port");
					}
				},
				onBeforeClose: function () {
					if ($overlay.hasClass("video")) {
						var $video = $overlay.find("video");
						$video.find("source").removeAttr("src");
						$overlay.find("video").remove();
						$overlay.prepend($video);
						if ($overlay.hasClass("iframe")) {
							$overlay.find("iframe").detach();
							$overlay.append("<div id=\"overlay_replace\"></div>");
						}
					} else if ($overlay.hasClass("iframe")) {
						$("span.video-shadow").removeClass("disabled");
						$overlay.find("iframe").replaceWith("<div id=\"overlay_replace\" />");
						/* remove the embedded flash object */
						$("#overlay object, #overlay iframe").remove();
						$("a.close").removeClass("highlighted");
					}
					$overlay.removeClass("video-presentation-overlay2");
					$("body").removeClass("body-freeze");

				},
				onClose: function () {

					/* re add the place holder div */
					setTimeout(function () {
						if ($("#overlay_replace").length <= 0) {
							$("#overlay").append("<div id=\"overlay_replace\">This video requires the <a href=\"http://www.adobe.com/products/flashplayer.html\">Adobe Flash Player</a>.</div>");
						}
					}, 200);
				}
			});
		}
	});
}(jQuery));


/*
 * stand-alone overlay
 * NOTE only supports creating iframe overlays as of 2014-08-05
 * TODO add support for other types
 * TODO figure out a good way to overlay videos without iframes
 */
(function ($) {
	"use strict";

	var closeOverlays, escapeOverlays, adjustSize, resizeOverlay, deboucedResizeOverlay;

	closeOverlays = function (element, event) {
		// hide the overlay
		$(".overlay-new-background, .overlay-new-container").addClass("overlay-new-background-start");

		// wait for the CSS transition to complete before removing
		setTimeout(function () {
			$(".overlay-new-background, .overlay-new-container").remove();
			$(element).trigger("overlay-closed");
		}, 400);

		$(document).off("keyup", escapeOverlays);
		$(window).off("resize", deboucedResizeOverlay);
		event.preventDefault();
	};

	escapeOverlays = function (element, event) {
		if (event.keyCode === 27) {
			closeOverlays(element, event);
		}
	};

	adjustSize = function (object) {
		var width, height, max;

		width = $(object).attr("data-native-width");
		height = $(object).attr("data-native-height");

		if (width && height) {

			// reset size to native size
			object.width = width;
			object.height = height;

			// restrict overlay to 80% of the available space
			max = {
				width: Math.round($(window).width() * 0.8),
				height: Math.round($(window).height() * 0.8)
			};

			if (object.width > max.width) {
				object.height = max.width * object.height / object.width;
				object.width = max.width;
			}

			if (object.height > max.height) {
				object.width = max.height * object.width / object.height;
				object.height = max.height;
			}

		} else {
			throw new Error("adjustSize() called with an invalid argument.");
		}
	};

	resizeOverlay = function () {
		$(".overlay-new-content *:last-child").each(function (index, element) {

			adjustSize(element);

		});
	};

	if (window._ !== undefined && window._ !== null) {
		deboucedResizeOverlay = _.debounce(resizeOverlay, 200);
	}

	// when ready, find all elements and init
	function setupOverlays () {
		$(".js-overlay-new:not([data-overlay-init])").each(function (index, element) {

			// set attribute to mark this element as initialized
			$(element).attr("data-overlay-init", "true");

			// attach on click callback to create overlay when clicked
			$(element).on("click", function (event) {
				var $target, tag;

				// create html to inject in overlay content
				$target = $(event.currentTarget);
				tag = document.createElement("iframe");
				tag.src = $target.attr("data-overlay-src") || $target.attr("href");
				tag.width = $target.attr("data-overlay-width") || Math.round(0.2 * window.innerWidth);
				tag.height = $target.attr("data-overlay-height") || Math.round(0.2 * window.innerHeight);
				tag.scrolling = $target.attr("data-overlay-scrolling") || "yes";
				tag.className = $target.attr("data-overlay-class") || "";

				$(tag).attr("data-native-width", tag.width);
				$(tag).attr("data-native-height", tag.height);

				adjustSize(tag);

				// create overlay with callback to close
				$("body").append("<div class=\"overlay-new-background overlay-new-background-start\"></div><div class=\"overlay-new-container overlay-new-background-start\"><div class=\"overlay-new-content\">" + tag.outerHTML + "<button class=\"overlay-new-close-button\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><style>.circle-x { fill: none; stroke-miterlimit: 10; stroke-width: 6; stroke: #fff; }</style><circle class=\"circle-x\" cx=\"50\" cy=\"50\" r=\"47\"/><path class=\"circle-x\" d=\"M71.2 71.2l-42.4-42.4m0 42.4l42.4-42.4\"/></svg></button></div></div>");

				// append Free Trial CTA if specified
				if ($target.hasClass("js-overlay-with-trial-cta")) {
					$("div.overlay-new-content").append("<div class=\"overlay-video-cta\"> \
						<div class=\"video-text-container\">\
							<a href=\"https://vimeo.com/qualys\" class=\"arrow-right all-videos\">All Qualys Videos</a>\
							<div class=\"adopt\">\
								<p>Adopt the Qualys Cloud Platform Today!</p>\
								<a href=\"free-tools-trials/#freemium\" class=\"arrow-right free-tools-link\">Or, try a free tool</a>\
								<a href=\"/forms/trials/suite/\" class=\"button-type1\">Free Trial</a>\
							</div> \
						</div> \
					</div>");
				}

				// stop links within the overlay from closing the overlay
				$("div.overlay-new-content a").on("click", function (event) {
					event.stopPropagation();
				});

				// reveal the overlay on the next rendering
				setTimeout(function () {
					$(".overlay-new-background, .overlay-new-container").removeClass("overlay-new-background-start");
				}, 0);

				// attach callbacks to close overlays
				$(".overlay-new-container, .overlay-new-close-button").on("click", closeOverlays.bind(null, element));
				$(document).on("keyup", escapeOverlays.bind(null, element));

				// attach callback to resize overlay when window is resized
				if (deboucedResizeOverlay !== "undefined" && deboucedResizeOverlay !== null) {
					$(window).on("resize", deboucedResizeOverlay);
				}

				event.preventDefault();
			});
		});

	}

	$(document).on("ready dynamicOverlayLinkLoaded", setupOverlays);

	// export function so it can be called after a Marketo form is rendered
	window.qualys = window.qualys || {};
	window.qualys.overlay = window.qualys.overlay || {};
	window.qualys.overlay.setup = setupOverlays;
}(jQuery));


/*
 * Dummies eBook Confirmation Page Filtering by Asset ID
 */
(function ($) {
	"use strict";

	$(window).on("hashchange", function () {
		if ($("body.forms.ebook.confirm").length > 0) {
			if (window.location.hash) {
				var hash;
				hash = window.location.hash.substring(2);
				hash = hash.split("/");
				$("div.ebook").each(function (index, element) {
					var assetId = ($(element).attr("id"));
					if ($.inArray(assetId, hash) === -1) {
						$(element).addClass("hide");
					}
				});
			}
		}
	});

	$(document).on("ready", function () {
		// trigger hash change on page load
		if ($("body.forms.ebook.confirm").length > 0) {
			$(window).trigger("hashchange");
		}
	});
}(jQuery));


/**
 * fancy scrolling for anchors (why don’t browsers do this?)
 */
(function ($) {
	"use strict";

	function scrollToAnchor(event) {
		var hash, offset, duration, scrollTop;

		hash = $(event.currentTarget).attr("href");
		offset = $(hash).offset();

		// add to the offset if there is a sticky menu
		$("div.sticky-menu, .js-position-sticky").each(function (index, item) {
			offset.top -= $(item).outerHeight();
		});

		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		duration = Math.round(Math.sqrt(Math.abs(scrollTop - offset.top)) * 10);

		if (offset.top > 0) {
			$("html, body").animate({
				"scrollTop": offset.top
			}, {
				"duration": duration,
				"easing": "easeInOutQuad",
				complete: function () {
					// use replaceState in history object when available
					if (history.replaceState !== undefined) {
						history.replaceState("", document.title, window.location.pathname + window.location.search + hash);
					}
					// no else statement here because it causes IE9 to jump to the location of the hash
				}
			});

			if (event.originalEvent !== undefined && event.originalEvent.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false; // IE8 alternative to event.preventDefault()
			}
		}
	}

	$(document).on("ready", function () {
		$("a[href^='#']").each(function (index, item) {
			var hash, size, isOnHomepage, isOnSuccessStoriesPage;

			hash = $(item).attr("href");
			size = $(hash).length;
			if (size > 0) {
				// exception for homepage
				isOnSuccessStoriesPage = $(hash).parents("#customers_success-stories").length ? true : false;
				if (!isOnHomepage && !isOnSuccessStoriesPage) {
					$(item).on("click", scrollToAnchor);
				}
			}
		});
	});
}(jQuery));


/**
 * support sticky menus by fixing an element when it is scrolled past
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		$("div.sticky-menu").each(function (index, item) {
			var menuOffset, stickySubMenuHeight, debug;

			debug = false;

			// get the offset to 
			menuOffset = $(item).offset();
			// make an exception index the WAS Features and Learn pages
			if ($(item).hasClass("section-navigation")) {
				stickySubMenuHeight = $("div.sticky-menu div.submenu").outerHeight();
				menuOffset.top -= stickySubMenuHeight;
			} else if ($(item).parent("div.resource-menu").length) {
				// exception for mobile resources page
				$(window).on("load", function () {
					if (window.pageYOffset > 0) {
						// use original location of sticky menu if page has been scrolled
						menuOffset = $(item).parent("div.resource-menu").offset();
					} else {
						menuOffset = $(item).offset();
					}
					if ($(item).parent("div.resource-menu").width() <= 640) {
						menuOffset.top -= 71;
					} 
				});
				
				$(window).on("resize", function () {
					menuOffset = $(item).offset();
					if ($(item).parent("div.resource-menu").width() <= 640) {
						menuOffset.top -= 71;
					} 
				});
			}
			function compareFunctions(iterations, functionA, functionB) {
				var start, end, i, result;

				// test function A
				start = (new Date()).getTime();
				for (i = 0; i < iterations; i += 1) {
					functionA();
				}
				end = (new Date()).getTime();
				result = {
					functionA: {
						start: start,
						end: end,
						duration: end - start
					}
				};
				// console.log("A: " + (end - start) + "ms");

				// test function B
				start = (new Date()).getTime();
				for (i = 0; i < iterations; i += 1) {
					functionB();
				}
				end = (new Date()).getTime();
				result.functionB = {
					start: start,
					end: end,
					duration: end - start
				};
				// console.log("B: " + (end - start) + "ms");

				return result;
			}
			function toggleMenuStickinessA() {
				if (document.body.scrollTop > menuOffset.top || document.documentElement.scrollTop > menuOffset.top) {
					$(item).addClass("stuck");
				} else {
					$(item).removeClass("stuck");
				}
			}
			function toggleMenuStickinessB() {
				if (document.body.scrollTop > menuOffset.top || document.documentElement.scrollTop > menuOffset.top) {
					if (item.className.indexOf("stuck") < 0) {
						item.className += " stuck";
					}
				} else {
					if (item.className.indexOf("stuck") >= 0) {
						item.className = item.className.replace(" stuck", "");
					}
				}
			}
			$(window).on("scroll", toggleMenuStickinessB);
			/* DEBUG code to compare function performance */
			if (debug && window.console !== undefined && window.console.log !== undefined) {
				$(window).on("keydown", function () {
					console.log(event.which);
					if (event.which === 84) {
						compareFunctions(10000, toggleMenuStickinessA, toggleMenuStickinessB);
					}
				});
			}
		});

		/**
		 * mark anchor links active when the viewport is scrolled into their position
		 */
		$("div.sticky-menu a[href^='#']").each(function (index, item) {
			var anchor, offset, outerHeight, top, bottom, menuHeight, floaterHeight, firstHeight;

			menuHeight = $(item).parents("div.sticky-menu").outerHeight();
			anchor = $($(item).attr("href"));
			offset = anchor.offset();
			outerHeight = anchor.outerHeight();
			if (offset !== undefined) {
				top = offset.top;
				bottom = offset.top + outerHeight;
			}
			// account for sticky menu height
			// exception for vm features
			if ($(item).parents("div.sticky-menu").children("div.floater").length) {
				floaterHeight = $(item).parents("div.sticky-menu").children("div.floater").outerHeight();
				top -= menuHeight + floaterHeight;
				bottom -= menuHeight + floaterHeight;
			} else if ($(item).parents("div.web-application-firewall").length) {
				// exception for waf features
				firstHeight = $("div.web-application-firewall > div.sticky-menu:first").outerHeight();
				top -= menuHeight + firstHeight;
				bottom -= menuHeight + firstHeight;
			} else if ($(item).parents("div.continuous-monitoring").length) {
				// exception for cm features
				firstHeight = $("div.continuous-monitoring > div.sticky-menu:first").outerHeight();
				top -= menuHeight + firstHeight;
				bottom -= menuHeight + firstHeight;
			} else if ($(item).parents("#enterprises_qualysguard_web-application-scanning").length) {
				// exception for WAS features
				firstHeight = $("div.sticky-menu.product-nav").outerHeight();
				top -= menuHeight + firstHeight;
				bottom -= menuHeight + firstHeight;
			} else if ($(item).parents("div.policy-compliance").length) {
				// exception for pc features
				firstHeight = $("div.policy-compliance > div.sticky-menu:first").outerHeight();
				top -= menuHeight + firstHeight;
				bottom -= menuHeight + firstHeight;
			} else if ($(item).parents("#enterprises_qualysguard_features").length || $(item).parents("#smb_qualysguard_express_features").length) {
				// exception for enterprise features
				firstHeight = $("div.product-nav.sticky-menu").outerHeight();
				top -= menuHeight + firstHeight;
				bottom -= menuHeight + firstHeight;
			} else if ($(item).parents("#shellshock").length) {
				// exception for shellshock page
				firstHeight = $("div.button-container.sticky-menu").outerHeight();
				top -= menuHeight + firstHeight;
				bottom -= menuHeight + firstHeight;
			} else {
				top -= menuHeight;
				bottom -= menuHeight;
			}
			// workaround bug in Firefox and Chrome
			top -= 1;
			bottom -= 1;
			// account first and last items
			if ($(item).is(":first-child")) {
				top = -Infinity;
			}
			if ($(item).is(":last-child")) {
				bottom = Infinity;
			}

			function toggleActiveAnchorLinks() {
				var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				if (scrollTop >= top && scrollTop < bottom) {
					if (item.className.indexOf("active") < 0) {
						item.className += " active";
						$(item).trigger("active");
					}
				} else {
					if (item.className.indexOf("active") >= 0) {
						item.className = item.className.replace(" active", "");
					}
				}
			}
			$(window).on("scroll", toggleActiveAnchorLinks);
		});
	});

}(jQuery));


/*
 * show back-to-top button when user has scrolled X pixels down on page
 */
(function ($) {
	"use strict";
	$(document).on("ready", function () {
		// get language code from URL by getting array of all 2-letters between a . or / character
		var languages = window.location.href.match(/[.\/]([a-z]{2})[.\/]/g);

		if (languages !== null) {
			// if 2-letter matches are found, remove . and / characters
			$.each(languages, function (index, value) {
				languages[index] = value.replace(/[.\/]/g, "");
			});
			// add the default English 2-letter code to the array of language matches
			languages.push("en");
		} else {
			// if no 2-letter matches are found, set the language to English
			languages = ["en"];
		}

		/* function to show or hide the Back to Top button */
		function showHideBackToTopButton() {
			var backToTopByLanguage, validLanguages, lang, language, backToTopHtml, windowHeight, documentHeight, shouldBeVisible, isVisible;
			// JSON object to hold mapping of language code to Back to Top message
			backToTopByLanguage = {
				"de": "Zurück nach oben",
				"en": "Back to top",
				"es": "Volver arriba",
				"fr": "Retour vers le haut",
				"ru": "Наверх"
			};

			// get array of valid languages
			validLanguages = [];
			for (lang in backToTopByLanguage) {
				if (backToTopByLanguage.hasOwnProperty(lang)) {
					validLanguages.push(lang);
				}
			}

			// set the language to the first valid language
			$.each(languages, function (index, value) {
				if ($.inArray(value, validLanguages) !== -1) {
					language = value;
					return false;
				}
			});

			// build the Back to Top button HTML
			backToTopHtml = "<div id=\"back-to-top\" style=\"opacity: 0; visibility: hidden;\"><a href=\"#header\">" + backToTopByLanguage[language] + "</a></div>";

			windowHeight = $(window).height();
			documentHeight = $(document).height();

			// inject back-to-top button HTML into page only if document height is greater than 3 times the windows height
			if ((documentHeight > (3 * windowHeight)) && ($("#back-to-top").length === 0)) {
				$("body").prepend(backToTopHtml);
			}

			// when user clicks back-to-top button, jump them back to the top without showing hash tag in URL bar
			$("#back-to-top a").click(function (event) {
				event.preventDefault();
				$(window).scrollTop(0);
			});

			// only show back-to-top button when user has scrolled more than half way down the page
			shouldBeVisible = isVisible = false;
			$(window).scroll(function () {
				shouldBeVisible = $(window).scrollTop() > (1.5 * windowHeight);
				if (shouldBeVisible && !isVisible) {
					isVisible = true;
					$("#back-to-top").css({
						"opacity": 1,
						"visibility": "visible"
					});
				} else if (isVisible && !shouldBeVisible) {
					isVisible = false;
					$("#back-to-top").css({
						"opacity": 0,
						"visibility": "hidden"
					});
				}
			});
		}

		/* when document is ready, call the showHideBackToTopButton() function
		   this is used for most pages where the height of the document doesn’t change much */
		showHideBackToTopButton();

		/* for the customer case study pages, the Read More/Less button causes the document height to change.
		   a custom event called "animationComplete which is attached to the Read More/Less button will get triggered 
		   when the animation is complete. the following event listener which catch that custom event to dynamically 
		   call the showHideBackToTopButton() */
		$("div.rest-of-content").on("animationComplete", showHideBackToTopButton);
	});
}(jQuery));


/*
 * adjust width of slideshow for full width slideshows
 */
(function ($) {
	"use strict";

	/*
	 * Adjust width of slides and slide wrapper. Note: div.items element 
	 * is dynamically inserted by the scroller.
	 */
	function slideAdjust() {
		var slide_width, numSlides, tray_width, scrollable_width;

		// update slide width based on viewport width
		slide_width = $("div.scrollable").width();
		$("div.slideshow.full-width div.slide").css("width", slide_width);

		// updated tray width
		numSlides = $("div.slide").length;

		/* add 2 to the number of slides for first and last
		 * dynamically-generated slides and multiply total width by 1.5 for
		 * extra space */
		tray_width = (numSlides + 2) * slide_width * 1.5;
		$("div.slideshow.full-width div.items").css("width", tray_width);

		// update tray position
		scrollable_width = $("div.slideshow div.scrollable").width();
		$("div.slideshow.full-width div.items").css("left", scrollable_width * -1);
	}

	/**
	 * adjust width of slideshow with every window resize for "full bleed" scroller
	 */
	$(document).on("ready", function () {
		slideAdjust();
	});
	$(window).on("resize", function () {
		slideAdjust();
	});
}(jQuery));


/*
 * Expand / collapse success story nav on hover
 * TODO refactor with CSS hover and transitions
 */

(function ($) {
	"use strict";

	$(document).on("ready", function () {
		var logoContainer = $("body.customers-success-stories div.section.nav div.expand");
		logoContainer.slideUp();
		$("body.customers-success-stories div.section.nav").mouseenter(
			function () {
				logoContainer.stop(true, false).slideDown();
				$("div.logo-container img.double-down-arrow").stop(true, false).fadeOut();
			}
		).mouseleave(
			function () {
				logoContainer.stop(true, false).slideUp();
				$("div.logo-container img.double-down-arrow").stop(true, false).fadeIn();
			}
		);
	});
}(jQuery));

/*
 * FreeScan Landing Page (OWASP, Patch Tuesday, SCAP, etc)
 */
(function($) {
	"use strict";

	$(document).ready(function () {
		// only run the following on the security-at-your-fingertips page
		if ($("body.security-at-your-fingertips").length > 0) {
			// flip cards on hover
			$("div.card.flip").hover(
				function () {
					$(this).find("div.card-wrapper").addClass("flipIt");
					var badge = $(this).find("div a div").attr("class").replace(" icon", "");
					$("h2").addClass("hide");
					$("h2." + badge + "-msg").removeClass("hide");
				},
				function () {
					$(this).find("div.card-wrapper").removeClass("flipIt");
				}
			);


			// get URLs of each card and make wrapper div clickable to fix bug in certain browsers
			$("div.card-wrapper a.front").each(function (index, element) {
				var cardHref = $(element).attr("href");
				$(element).parent("div.card-wrapper").attr("data-link", cardHref);
			});

			$(document).on("click", "div.card-wrapper", function (event) {
				var link = $(event.currentTarget).attr("data-link");
				window.location.href = link;
			});
		}
	});
}(jQuery));


/*
 * scale viewport for tablets
 */
(function ($) {
	"use strict";

	var mql;

	function scaleTabletViewportToDesktop() {
		var nonScaledWidth, scaledWidth, scale, content, matches;

		// calculate non-scaled window width
		// by getting the current scaled window width and
		// the current scale factor
		scaledWidth = window.innerWidth;

		// extract current scale from viewport meta tag
		content = $("meta[name=viewport]").attr("content");

		// only for pages with viewport meta tags
		if (content) {
			matches = content.match(/\binitial-scale=(\d*\.?\d*)(,|$)/);

			// condition for when initial scale is/is not found
			if (matches) {
				scale = parseFloat(matches[1]);
				if (isNaN(scale)) {
					throw new Error("Initial scale value in viewport meta tag is not a number.");
				}
			} else {
				throw new Error("Initial scale value not found in viewport meta tag.");
			}

			nonScaledWidth = Math.round(scaledWidth / scale);

			// only adjust scale for tablets
			// currently we define tablets between 640 and 1004 pixels wide
			if (nonScaledWidth > 640 && nonScaledWidth < 1004) {
				scale = nonScaledWidth / 1004;
			} else {
				scale = 1;
			}

			$("meta[name=viewport]").attr(
				"content",
				"width=device-width, initial-scale=" + scale
			);
		}
	}

	$(document).on("ready", scaleTabletViewportToDesktop);

	if (window.matchMedia !== undefined && window.matchMedia !== null) {
		mql = window.matchMedia("screen and (orientation:portrait)");
		mql.addListener(scaleTabletViewportToDesktop);
	}

}(jQuery));


(function ($) {
	"use strict";
	/**
	 * show/hide mobile nav sections
	 */
	$(document).ready(function () {
		$("div.hamburger-menu").on("click", function() {
			$("#content, div.mobile-nav").toggle();
			var navDisplay = $("div.mobile-nav").css("display");
			if (navDisplay === "block") {
				$("div.mobile-header").addClass("solid-bg");
				$("div.hamburger-menu").addClass("on");
				$("div.patty-container").addClass("hidden");
				$("div.x-container").removeClass("hidden");
				$("div.preprefooter, div.prefooter, div.footer").addClass("hidden");
			} else {
				$("div.mobile-header").removeClass("solid-bg");
				$("div.hamburger-menu").removeClass("on");
				$("div.patty-container").removeClass("hidden");
				$("div.x-container").addClass("hidden");
				$("div.preprefooter, div.prefooter, div.footer").removeClass("hidden");
			}
		});
		//show/hide global search display
		$("div.mobile-nav div.search a").on("click", function (event) {
			event.preventDefault();
			$("div.hamburger-menu").trigger("click");
			$("div.search-panel-wrapper, div.search-panel-overlay").addClass("search-active");
		});
		$("div.menu.has-sub-menu").on("click", function(event) {
			var target = $(event.currentTarget);
			if (target.hasClass("expanded")) {
				target.removeClass("expanded");
				target.find("div.container").addClass("hidden");
			} else {
				target.addClass("expanded");
				target.find("div.container").removeClass("hidden");
			}
		});

		function handleViewportWidthChange(mql) {
			if (!mql.matches) {
				/* The viewport is > 640px wide */
				var $content, $mobileNav;

				$content = $("#content");
				$mobileNav = $("div.mobile-nav");

				if ($content.css("display") === "none") {
					$content.removeAttr("style");
				}
				if ($mobileNav.css("display") === "block") {
					$mobileNav.removeAttr("style");
					$("div.hamburger-menu").removeClass("on");
					$("div.patty-container").removeClass("hidden");
					$("div.preprefooter, div.prefooter, div.footer").removeClass("hidden");
					$("div.x-container").addClass("hidden");
					$mobileNav.find("div.menu").removeClass("expanded").find("div.container").addClass("hidden");
				}
			}
		}

		if (window.matchMedia !== undefined && window.matchMedia !== null) {
			var mql = window.matchMedia("(max-width: 640px)");
			mql.addListener(handleViewportWidthChange);
			handleViewportWidthChange(mql);
		}
	});
}(jQuery));


/*
 * Show/hide global search display
 */
(function ($) {
	"use strict";

	function closeSearchOverlay(event) {
		event.preventDefault();
		$("div.search-panel-wrapper, div.search-panel-overlay").removeClass("search-active");
	}

	$(document).on("ready", function () {

		// toggle search overlay when visitor clicks search icon
		// search icon is a submit button
		$("a.toolbar-item.search").on("click", function (event) {
			event.preventDefault();
			$("div.search-panel-wrapper, div.search-panel-overlay").toggleClass("search-active");
		});

		$("div.search-panel-wrapper a.close").on("click", closeSearchOverlay);

		$("div.search-panel-overlay").on("click", closeSearchOverlay);

		$(document).on("keyup", function (event) {
			if (event.keyCode === 27) {
				closeSearchOverlay(event);
			}
		});
	});
}(jQuery));


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
				if (params.hasOwnProperty(decoded.key)) {
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
 * function to add hidden inputs to a form from cookie values
 * Note, Marketo forms can do this on their onw, so this can be removed once all form use Marketo
 */
(function () {
	"use strict";

	function createInputsFromCookies(cookieNames) {
		var cookies, filteredCookies, inputs, fragment;

		cookieNames = cookieNames || ["gclid", "invite", "kw", "leadsource", "link", "_mkto_trk", "referrer"];

		// get cookies
		cookies = window.qualys.parseCookieString(document.cookie);

		// filter cookies to only the ones we want
		filteredCookies = cookies.filter(function (cookie) {
			return (cookieNames.indexOf(cookie.name) >= 0);
		});

		// create input elements for each filtered cookie
		inputs = filteredCookies.map(function (cookie) {
			var input = document.createElement("input");
			input.type = "hidden";

			// convert cookie names to input names
			switch (cookie.name) {
			case "_mkto_trk":
				input.name = "marketoTrackingCookie";
				break;
			default:
				input.name = decodeURIComponent(cookie.name);
				break;
			}

			input.value = decodeURIComponent(cookie.value);
			return input;
		});

		// append inputs to form
		fragment = inputs.reduce(function (p, c) {
			p.appendChild(c);
			return p;
		}, document.createDocumentFragment());

		return fragment;
	}

	window.qualys = window.qualys || {};
	window.qualys.createInputsFromCookies = createInputsFromCookies;
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


/*
 * show transparent header on select pages only
 */
(function ($) {
	"use strict";

	// pages on which to show transparent header
	var pages = [
		"/solutions/azure/",
		"/asset-discovery/",
		"/subscriptions/",
		"/compliance-monitoring/",
		"/web-application-security/",
		"/threat-protection/",
		"/network-security/",
		"/public-clouds/",
		"/public-clouds/amazon-web-services/",
		"/public-clouds/microsoft-azure/",
		"/public-clouds/google-cloud-platform/",
		"/security-compliance-cloud-platform/",
		"/2017/rsac/",
		"/2017/infosec/",
		"/subscriptions/consultant/" // e.g. /company/
	];

	// hosts on which to exclude executing code below
	var excludedHosts = [
		"investor.qualys.com",
		"lps.qualys.com"
	];

	$(document).on("ready", function () {
		var host = document.location.host;
		var pathname, regex, isMatch;

		// only execute code if host is not in the excludedHosts list
		if ($.inArray(host, excludedHosts) === -1) {
			pathname = window.location.pathname;
			isMatch = false;

			// check which page user is on to determine whether to show transparent header
			// SPECIAL CASE: if this is the HOME PAGE
			if (pathname === "/") {
				isMatch = true;
			}

			// For all other pages in the "pages" array above
			for (var i = 0; i < pages.length; i++) {
				regex = new RegExp("^" + pages[i] + "$", "g");
				if (pathname.match(regex) !== null) {
					isMatch = true;
				}
			}

			if (isMatch) {
				setTimeout(function(){
					$("div.header-wrapper, div.mobile-header").addClass("transparent fixed");
				}, 0);
			}
		}
	});
}(jQuery));

/*
 * toggle global nav when global menu link is clicked
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		$("#header a.global-link").on("click", function (event) {
			$(event.currentTarget).addClass("hidden");
			$("#header div.local-nav").addClass("hidden");
			$("#nav, #header div.toolbar").removeClass("hidden");
		});
	});
}(jQuery));