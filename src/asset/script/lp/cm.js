/* global jQuery */

/**
 * show/hide fields based on user selection
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		var buttonLabel = "";
		$("fieldset.current-customer, fieldset.new-customer").addClass("hidden");

		$("input[name=haveAccount]").on("change", function() {
			var haveAccount = ($("input[name=haveAccount]:checked").val() === "yes") ? true : false;

			if (haveAccount) {

				// hide and clear the fields for new customers
				$("fieldset.new-customer").addClass("hidden").find(":input").val("");
				$("fieldset.current-customer").removeClass("hidden");
				buttonLabel = $("span.button-text").attr("data-updateAccount");
				$("form a.button-type1").html("<span class=\"arrow-right-negative-space\">▶</span> " + buttonLabel);
			} else {

				// hide and clear the fields for current customers
				$("fieldset.current-customer").addClass("hidden").find(":input").val("");
				$("fieldset.new-customer").removeClass("hidden");
				buttonLabel = $("span.button-text").attr("data-createAccount");
				$("form a.button-type1").html("<span class=\"arrow-right-negative-space\">▶</span> " + buttonLabel);
			}
		});
	});
}(jQuery));


/**
 * show/hide learn more section
 */
(function ($) {
	"use strict";

	$(document).on("ready", function () {
		$(".learn-more-expanded").addClass("hidden");
		$(".banner-middle").addClass("banner-middle-collapsed");
		$(".circle").on("mouseenter", function (event) {
			$(event.currentTarget).addClass("circle-hover");
		}).on("mouseleave", function () {
			$(event.currentTarget).removeClass("circle-hover");
		});
		$(".show-more").on("click", function () {
			$(".learn-more-expanded").removeClass("hidden");
			$(".banner-middle").removeClass("banner-middle-collapsed");
			$(".learn-more-collapsed").addClass("hidden");
		});
	});
}(jQuery));


(function ($) {
	"use strict";

	var target_index, img_target;

	// index of active element
	target_index = 0;
	// order of sequence
	img_target = ["prevent-breaches","achieve-compliance","maintain-uptime","save-time-money"];

	// executed on mouse event
	function activate(old_target, target) {
		if (!$(".trigger." + target).hasClass("active")) {
			$(".trigger.active").removeClass("active");
			$(".detail.active").hide().removeClass("active");
			target_index = jQuery.inArray(target,img_target);
			$(".trigger." + target).addClass("active");
			$(".detail." + target).fadeIn().addClass("active");
		}
	}

	// allows for automatically triggering activate() at the proper time
	// for the next element in the sequence
	function autoSwap() {
		var previous;

		previous = $(".banner-bottom").find(".trigger.active").attr("data-trigger");
		target_index = (target_index >= 3) ? 0 : target_index + 1;
		activate(previous, img_target[target_index]);
	}

	$(document).on("ready", function () {
		var timer;

		// kicks off the sequence
		timer = setInterval(function () {
			autoSwap();
		}, 4500);
		
		$(".rollover-disabled").removeClass("rollover-disabled");
		
		// on mouseenter, execute function activate() to hide/show content
		// and stops the timed animation
		$(".banner-bottom").on("mouseenter", ".trigger", function () {
			activate($(this).parents(".banner-bottom").find(".trigger.active").attr("data-trigger"), $(this).attr("data-trigger"));
			clearInterval(timer);
		});
		
		// on mouseleave, restart the timed animation
		$(".banner-bottom").on("mouseleave", ".trigger", function () {
			timer = setInterval(function () {
				autoSwap();
			}, 4500);
		});
	});
}(jQuery));


(function ($) {
	"use strict";

	var interval, sequence_done, in_view;

	interval = false;
	sequence_done = true;
	in_view = false;

	// executes the animation sequence cycle
	// -don't run in the middle of a cycle
	function runSequence() {
		if (sequence_done) {
			sequence_done = false;
			$(".icon-1 .outline").transition({opacity: 1, delay: 500},500).transition({rotate: "+=360"}, 9000, "linear").transition({opacity: 0},500);
			$(".icon-2 .outline").transition({opacity: 1, delay: 1000},500).transition({rotate: "-=359"}, 9000, "linear").transition({opacity: 0},500);
			$(".icon-3 .outline").transition({opacity: 1, delay: 1500},500).transition({rotate: "+=360"}, 9000, "linear").transition({opacity: 0},500);
			$(".icon-4 .outline").transition({opacity: 1, delay: 2000},500).transition({rotate: "-=359"}, 9000, "linear").transition({opacity: 0},500);
			$(".icon-5 .outline").transition({opacity: 1, delay: 2500},500).transition({rotate: "+=360"}, 9000, "linear").transition({opacity: 0},500, function () { sequence_done = true; });
		}
	}
	
	// determines if the element is completely within the viewport
	function inView(e) {
		var view_top, view_bottom, element_top, element_bottom;

		view_top = $(window).scrollTop();
		view_bottom = view_top + $(window).height();
		element_top = $(e).offset().top;
		element_bottom = element_top + $(e).height();
		if (element_top >= view_top && element_bottom <= view_bottom) {
			in_view = true;
		} else {
			in_view = false;
		}
	}

	$(document).on("scroll", function () {
		inView(".section.intro ul");

		if (in_view && interval === false) {
			interval = setInterval(function () {
				runSequence();
			}, 1000);
		}

		if (!in_view && interval) {
			clearInterval(interval);
			interval = false;
		}
	});
}(jQuery));
