"use strict";/* global jQuery Vimeo */ /*
 * switch video on link hover
 */(function(a){"use strict";function b(){var b=a(".q-app-video-wrapper.active").attr("data-video-id");// hide the poster and play icons
// play the active video
a(".q-app-video-wrapper.active .poster").addClass("hidden"),a(".q-app-video-wrapper.active .play-icon").addClass("hidden"),f[b].play()}var c=a(".video-link-wrapper"),d=a(".q-app-video-wrapper"),e=a(".q-app-video-wrapper.active").attr("data-video-id"),f={};// when user clicks a video link ...
a(".q-app-video-wrapper").each(function(b,c){var d=a(c).attr("data-video-id"),e=new Vimeo.Player(a(c).find("iframe"));f[d]=e}),a(".q-app-video-wrapper.active .poster").on("click",b),a(".q-app-video-wrapper.active .play-icon").on("click",b),c.on("click",function(g){c.removeClass("active"),d.removeClass("active"),f[e].pause();// get the video id of the video link the user clicked on
var h=a(g.currentTarget).attr("data-video-id");// set the corresponding video and video link as active
// play the video
a(".videos [data-video-id="+h+"]").addClass("active"),a(g.currentTarget).addClass("active"),b()})})(jQuery);
//# sourceMappingURL=multi-video-player.js.map