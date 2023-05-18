/* global jQuery Vimeo */

/*
 * switch video on link hover
 */
(function ($) {

	"use strict";

	function playVideo() {
		var activeVideoId = $(".q-app-video-wrapper.active").attr("data-video-id");
		// hide the poster and play icons
		$(".q-app-video-wrapper.active .poster").addClass("hidden");
		$(".q-app-video-wrapper.active .play-icon").addClass("hidden");
		// play the active video
		videos[activeVideoId].play();
	}

	var $videoLinkWrapper = $(".video-link-wrapper");
	var $videoWrapper = $(".q-app-video-wrapper");
	var initialVideoId = $(".q-app-video-wrapper.active").attr("data-video-id");

	// create object of all videos fdgds
	var videos = {};
	$(".q-app-video-wrapper").each(function(index, element) {
		var videoId = $(element).attr("data-video-id");
		var player = new Vimeo.Player($(element).find("iframe"));
		videos[videoId] = player;
	});

	$(".q-app-video-wrapper.active .poster").on("click", playVideo);
	$(".q-app-video-wrapper.active .play-icon").on("click", playVideo);

	// when user clicks a video link ...
	$videoLinkWrapper.on("click", function(event){
		// remove all "active" classes
		$videoLinkWrapper.removeClass("active");
		$videoWrapper.removeClass("active");
		// pause the previously active video
		videos[initialVideoId].pause();

		// get the video id of the video link the user clicked on
		var activeVideoId = $(event.currentTarget).attr("data-video-id");
		// set the corresponding video and video link as active
		$(".videos [data-video-id="+activeVideoId+"]").addClass("active");
		$(event.currentTarget).addClass("active");

		// play the video
		playVideo();
	});

}(jQuery));