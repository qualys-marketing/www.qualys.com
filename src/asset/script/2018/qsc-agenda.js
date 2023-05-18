/* global jQuery:false $:false */

(function ($) {
	"use strict";

	// sticky sub nav
	createSticky($(".q-subnav__sticky"));

	function createSticky(sticky) {
		if (typeof sticky !== "undefined") {

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
		var target = $(this.getAttribute('href'));

		if( target.length ) {
			event.preventDefault();
			$("html, body").stop().animate({
				scrollTop: target.offset().top + 20
			}, 0);
		}

	});

}(jQuery));

//scrollspy and expand / collapse long passages of text
(function() {
	"use strict";

	var section = document.querySelectorAll(".q-qsc-section");
	var sections = {};
	var i = 0;

	function setSectionOffset() {
		Array.prototype.forEach.call(section, function(e) {
			sections[e.id] = e.offsetTop-80;
		});
	}

	setSectionOffset();

	window.onscroll = function() {
		var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

		for (i in sections) {
			if (sections[i] <= scrollPosition) {
				var activeItem = document.querySelector(".subnav-active");

				if (activeItem){
					activeItem.classList.remove("subnav-active");
				}

				document.querySelector("a[href*=" + i + "]").classList.add("subnav-active");
			}
		}
	};

	// expand/collapse the clicked element
	// when click "Expand+" link, expand the text
	// when click "Collapse+" link, collapse the text
	function handleExpandCollapseClick (event) {

		const button = event.currentTarget;
		const element = button.parentNode;
		const isExpanded = element.classList.contains("expandedHeight");
		if (isExpanded) {

			element.classList.add("collapsedHeight");
			element.classList.remove("expandedHeight");
			setTimeout(() => button.innerText = "Expand +", 200);

		} else {

			element.classList.remove("collapsedHeight");
			element.classList.add("expandedHeight");
			setTimeout(() => button.innerText = "Collapse –", 200);

		}

	}

	function setUpExpandCollapseLinks() {
		const elements = Array.from(document.querySelectorAll(".expandable"));

		elements.forEach(function (element) {

			if (element.querySelector("button") === null) {

				if (element.offsetHeight > 134) {
					// create Expand+, Collapse- button
					let button = document.createElement("button");
					button.innerText = "Expand +";
					button.addEventListener("click", handleExpandCollapseClick);
					element.appendChild(button);

					// collapse text
					element.classList.add("collapsedHeight");

				}
			}
		});
	}

	setUpExpandCollapseLinks();

	// when user clicks on an agenda tab or training class option,
	// need to recalculate section offsets due to page length changing
	$(".class-select-menu-item, .tablink").on("click", function () {
		setTimeout(function () {
			setSectionOffset();
			setUpExpandCollapseLinks();
		}, 0);
	});
})();

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

// expand / collapse agenda rows
(function ($) {
	"use strict";

	$(".toggle, .title-speaker-container .read-more").on("click", function(event){
		if ($(event.currentTarget).parents(".title-speaker-container").hasClass("expanded")) {
			$(event.currentTarget).parents(".title-speaker-container").removeClass("expanded").addClass("collapsed");
			$(event.currentTarget).parents(".title-speaker-container").find(".abstract").addClass("hidden");
		} else if ($(event.currentTarget).parents(".title-speaker-container").hasClass("collapsed")) {
			$(event.currentTarget).parents(".title-speaker-container").removeClass("collapsed").addClass("expanded");
			$(event.currentTarget).parents(".title-speaker-container").find(".abstract").removeClass("hidden");
		}
	});

}(jQuery));