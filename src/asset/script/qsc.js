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
	$(document).ready(function() {
		var $nav = $(".q-qsc__nav--container");

		$(".js-qsc__hamburger").on("click", function () {
			if ($nav.hasClass("q-qsc__menu--show")) {
				$nav.removeClass("q-qsc__menu--show");
			} else {
				$nav.addClass("q-qsc__menu--show");
			}
		});

	});

}(jQuery));

(function ($) {
	"use strict";

	// sticky sub nav
	createSticky($(".q-subnav__sticky"));

	function createSticky(sticky) {
		if (typeof sticky !== "undefined" && sticky.offset() !== undefined) {

			var	pos = sticky.offset().top,
				win = $(window);

			win.on("scroll", function() {
				win.scrollTop() >= pos ? sticky.addClass("fixed") : sticky.removeClass("fixed");
				//Remove active subMenu status
				if (document.querySelector(".subnav-active")) {
					win.scrollTop() >= pos ? "" : document.querySelector(".subnav-active").classList.remove("subnav-active");
				}
			});
		}
	}

	// scroll to section
	$(".q-qsc__subnav-link").on("click", function(event) {

		if( !$(this).hasClass("no-scroll") ) {
			var target = $(this.getAttribute('href'));

			if( target.length ) {
				event.preventDefault();
				$("html, body").stop().animate({
					scrollTop: target.offset().top + 20
				}, 0);
			}
		}

	});

	// scrollspy

	function scrollSpy() {
		var sections = $(".q-qsc-section");
		var current;

		sections.each( function(){
			var ths = $(this);
			var sectionId = ths.attr("id");

			if ( $("#"+sectionId).offset().top-80 <= $(window).scrollTop() ) {
				current = sectionId;
			}
		});
		$(".q-qsc-city__subnav a[href='#"+current+"']").addClass("subnav-active");
		$(".q-qsc-city__subnav a").not("a[href='#"+current+"']").removeClass("subnav-active");
	}

	scrollSpy();

	$(window).scroll( function() {
		scrollSpy();
	});

}(jQuery));

// hide register buttons
(function ($) {
	"use strict";

	var location = window.location.pathname.replace("/2018/qsc/", "").replace("/", "");

	switch(location) {
		case "las-vegas":
		case "london":
		case "berlin":
		case "paris":
			$("body").addClass("registration-closed");
			break;
	}

}(jQuery));

// agenda tab functionality
(function ($) {
	"use strict";

	$(".tablink").on("click", function(event){
		// event.preventDefault();
		var tabId = $(event.currentTarget).attr("data-tab-id");
		$(".tablink").parent().removeClass("active-date");
		$(event.currentTarget).parent().addClass("active-date");
		$(".tab-content").addClass("hidden");
		$(".tab-content-wrapper #"+tabId).removeClass("hidden");

		$(".q-qsc__tabs-item").removeClass("tab-active");
		$(event.currentTarget).parents(".q-qsc__tabs-item").addClass("tab-active");
	});

	$(".q-qsc__tabs").on("click", function(event){
		$(event.currentTarget).toggleClass("open");
	});

	// if hash value containing tab ID exists, trigger a click on the tab
	function handleHashChange() {
		var hash = window.location.hash.replace(/#|\//gi, "");
		if (hash === "training") {
			hash = "nov18";
		}
		$('[data-tab-id="'+hash+'"]').trigger("click");
	}

	window.addEventListener("hashchange", handleHashChange);
	document.addEventListener("DOMContentLoaded", handleHashChange);
	handleHashChange();

}(jQuery));


// session filter functionality
(function ($) {
	"use strict";

	$(".filter-link").on("click", function(event){
		// toggle display of filter link
		if ($(event.currentTarget).hasClass("active")) {
			$(event.currentTarget).removeClass("active");
		} else {
			$(event.currentTarget).addClass("active");
		}

		var filters =[];

		// create array of active filters
		$(".filter-link.active").each(function (index, element) {
			filters.push($(element).attr("data-filter-id"));
		});

		// hide all sessions
		$(".tab-content-wrapper tr").addClass("hidden");

		// show filtered sessions
		$(".tab-content-wrapper tr").each(function (index, element) {
			var filterId = $(element).attr("data-filter-id");

			if ($.inArray(filterId, filters) !== -1) {
				$(element).removeClass("hidden");
			}
		});
	});

	$(".clear-all a").on("click", function () {
		$(".filter-link").each(function (index, element) {
			$(element).removeClass("active");
			$(".tab-content-wrapper tr").removeClass("hidden");
		});
	});

}(jQuery));

/*
 * automatically open video and keynote speaker overlay based on hash value
 */
(function ($) {
	"use strict";

	function openVideoOverlay() {
		// get hash value
		var hash = "";
		if (window.location.hash) {
			/* Puts hash in variable, and removes the # character */
			hash = window.location.hash.substring(1);
			/* remove initial slash if it exists */
			hash = hash.indexOf("/") == 0 ? hash.substring(1) : hash;
		}

		if (hash === "video") {
			// trigger the click on hash selectors
			$(".q-qsc-video__icon").trigger( "click" );
		} else if (hash.indexOf("speaker") !== -1) {
			hash = hash.replace("speaker-", "");
			$('[href="#'+hash+'"]').trigger( "click" );
		} else {
			$('[href="#'+hash+'"]').trigger( "click" );
		}
	}

	$(document).ready(openVideoOverlay);
	$(window).on("hashchange", openVideoOverlay);
}(jQuery));

/*
 * expand/collapse training agenda
 */
(function ($) {
	"use strict";

	$(".training .agenda").addClass("hidden");

	$(".training .title .label").on("click", function (element) {
		$(element.currentTarget).parent().parent().parent().find(".agenda").toggleClass("hidden");
	});}(jQuery));

/*
 * expand/collapse conference agenda
*/
(function ($) {
	"use strict";

	var x = window.matchMedia("(min-width: 600px)");

	$(".conference-description").addClass("hidden");

	$(".conference-title-wrapper.label").on("click", function (element) {
		if (x.matches) {
			$(".parallel").addClass("desktop");
		} else {
			$(".parallel").removeClass("desktop");
		}
		if ($(element.currentTarget).parents(".parallel.desktop").length) {
			// clicked on parallel breakout session on desktop
			$(element.currentTarget).parents(".parallel").find(".conference-description").toggleClass("hidden");
			$(element.currentTarget).parents(".parallel").find(".label").toggleClass("opened");
		} else { // clicked on regular session
			$(element.currentTarget).parent().find(".conference-description").toggleClass("hidden");
			$(element.currentTarget).toggleClass("opened");
		}
	});
}(jQuery));

/*
 * handle training registration form

(function ($) {
	"use strict";

	$(".training-register-form .q-button").on("click", function (event) {
		var $form = $(event.currentTarget).closest("form");

		var classId = $form.find("input[type=radio]:checked").val();

		if (classId === undefined) {
			$form.find(".validation-rule").removeClass("hidden");
		} else {
			$form.find(".validation-rule").addClass("hidden");

			var classLink = "https://gm1.geolearning.com/geonext/qualys/scheduledclassdetails4enroll.geo?id=" + classId;

			$(event.currentTarget).attr("href", classLink);
		}
	});

	$(".training input[type=radio]").on("click", function (event) {
		$(event.currentTarget).closest("form").find(".validation-rule").addClass("hidden");
	});
}(jQuery));
 */