"use strict";/* global jQuery */(function(a){"use strict";/**
	 * when accessing an anchored URL, e.g. /2017/qsc/agenda/#training
	 * Firefox doesn't jump to the correct anchors below the Agenda / Training section because the
	 * Agenda / Training section uses jQuery Tools Tabs. As a fix, this code waits 1 second and then
	 * triggers a click event to smooth scroll the page to the correct anchor location
	 */ /*
	 * toggle mobile nav on click of hamburger icon
	 */a(document).on("ready",function(){if(window.location.hash){// get hash value
var b=window.location.hash.substring(1);// do the following code after a brief pause to ensure smooth scrolling occurs AFTER default browser anchor jump event
b=b.split("/"),setTimeout(function(){// trigger click event on link with hash anchor
a("a[href="+b+"]").click()},0)}}),a(document).ready(function(a){var b=a("div.qsc-header div.nav-container");a("div.qsc-header img.hamburger").on("click",function(){b.attr("style")?b.removeAttr("style"):b.css("display","block")})})})(jQuery);
//# sourceMappingURL=qsc.js.map