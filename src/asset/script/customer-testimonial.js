/* global Vimeo */

/*
 * Play video when user clicks poster image
 */
(function() {
	"use strict";

	var poster = document.querySelector('.poster');
	var playIcon = document.querySelector('.play-icon');
	poster.addEventListener("click", playVideo);
	playIcon.addEventListener("click", playVideo);

	function playVideo() {
		var iframe = document.querySelector('iframe');
		var player = new Vimeo.Player(iframe);
		poster.classList.add("hidden");
		playIcon.classList.add("hidden");
		player.play();
	}
} ());