"use strict";/* global jQuery */ // hide register buttons
// agenda tab functionality
// session filter functionality
/*
 * automatically open video and keynote speaker overlay based on hash value
 */ /*
 * expand/collapse training agenda
 */ /*
 * expand/collapse conference agenda
*/(function(a){"use strict";/**
	 * when accessing an anchored URL, e.g. /2017/qsc/agenda/#training
	 * Firefox doesn't jump to the correct anchors below the Agenda / Training section because the
	 * Agenda / Training section uses jQuery Tools Tabs. As a fix, this code waits 1 second and then
	 * triggers a click event to smooth scroll the page to the correct anchor location
	 */ /*
	 * toggle mobile nav on click of hamburger icon
	 */a(document).on("ready",function(){if(window.location.hash){// get hash value
var b=window.location.hash.substring(1);// do the following code after a brief pause to ensure smooth scrolling occurs AFTER default browser anchor jump event
b=b.split("/"),setTimeout(function(){// trigger click event on link with hash anchor
a("a[href="+b+"]").click()},0)}}),a(document).ready(function(){var b=a(".q-qsc__nav--container");a(".js-qsc__hamburger").on("click",function(){b.hasClass("q-qsc__menu--show")?b.removeClass("q-qsc__menu--show"):b.addClass("q-qsc__menu--show")})})})(jQuery),function(a){"use strict";// sticky sub nav
// scrollspy
function b(){var b,c=a(".q-qsc-section");c.each(function(){var c=a(this),d=c.attr("id");a("#"+d).offset().top-80<=a(window).scrollTop()&&(b=d)}),a(".q-qsc-city__subnav a[href='#"+b+"']").addClass("subnav-active"),a(".q-qsc-city__subnav a").not("a[href='#"+b+"']").removeClass("subnav-active")}// scroll to section
(function(b){if("undefined"!=typeof b&&b.offset()!==void 0){var c=b.offset().top,d=a(window);d.on("scroll",function(){d.scrollTop()>=c?b.addClass("fixed"):b.removeClass("fixed"),document.querySelector(".subnav-active")&&(d.scrollTop()>=c?"":document.querySelector(".subnav-active").classList.remove("subnav-active"))})}})(a(".q-subnav__sticky")),a(".q-qsc__subnav-link").on("click",function(b){if(!a(this).hasClass("no-scroll")){var c=a(this.getAttribute("href"));c.length&&(b.preventDefault(),a("html, body").stop().animate({scrollTop:c.offset().top+20},0))}}),b(),a(window).scroll(function(){b()})}(jQuery),function(a){"use strict";var b=window.location.pathname.replace("/2018/qsc/","").replace("/","");"las-vegas"===b||"london"===b||"berlin"===b||"paris"===b?a("body").addClass("registration-closed"):void 0}(jQuery),function(a){"use strict";// if hash value containing tab ID exists, trigger a click on the tab
function b(){var b=window.location.hash.replace(/#|\//gi,"");"training"===b&&(b="nov18"),a("[data-tab-id=\""+b+"\"]").trigger("click")}a(".tablink").on("click",function(b){// event.preventDefault();
var c=a(b.currentTarget).attr("data-tab-id");a(".tablink").parent().removeClass("active-date"),a(b.currentTarget).parent().addClass("active-date"),a(".tab-content").addClass("hidden"),a(".tab-content-wrapper #"+c).removeClass("hidden"),a(".q-qsc__tabs-item").removeClass("tab-active"),a(b.currentTarget).parents(".q-qsc__tabs-item").addClass("tab-active")}),a(".q-qsc__tabs").on("click",function(b){a(b.currentTarget).toggleClass("open")}),window.addEventListener("hashchange",b),document.addEventListener("DOMContentLoaded",b),b()}(jQuery),function(a){"use strict";a(".filter-link").on("click",function(b){a(b.currentTarget).hasClass("active")?a(b.currentTarget).removeClass("active"):a(b.currentTarget).addClass("active");var c=[];// create array of active filters
// hide all sessions
// show filtered sessions
a(".filter-link.active").each(function(b,d){c.push(a(d).attr("data-filter-id"))}),a(".tab-content-wrapper tr").addClass("hidden"),a(".tab-content-wrapper tr").each(function(b,d){var e=a(d).attr("data-filter-id");-1!==a.inArray(e,c)&&a(d).removeClass("hidden")})}),a(".clear-all a").on("click",function(){a(".filter-link").each(function(b,c){a(c).removeClass("active"),a(".tab-content-wrapper tr").removeClass("hidden")})})}(jQuery),function(a){"use strict";function b(){// get hash value
var b="";window.location.hash&&(b=window.location.hash.substring(1),b=0==b.indexOf("/")?b.substring(1):b),"video"===b?a(".q-qsc-video__icon").trigger("click"):-1===b.indexOf("speaker")?a("[href=\"#"+b+"\"]").trigger("click"):(b=b.replace("speaker-",""),a("[href=\"#"+b+"\"]").trigger("click"))}a(document).ready(b),a(window).on("hashchange",b)}(jQuery),function(a){"use strict";a(".training .agenda").addClass("hidden"),a(".training .title .label").on("click",function(b){a(b.currentTarget).parent().parent().parent().find(".agenda").toggleClass("hidden")})}(jQuery),function(a){"use strict";var b=window.matchMedia("(min-width: 600px)");a(".conference-description").addClass("hidden"),a(".conference-title-wrapper.label").on("click",function(c){b.matches?a(".parallel").addClass("desktop"):a(".parallel").removeClass("desktop"),a(c.currentTarget).parents(".parallel.desktop").length?(a(c.currentTarget).parents(".parallel").find(".conference-description").toggleClass("hidden"),a(c.currentTarget).parents(".parallel").find(".label").toggleClass("opened")):(a(c.currentTarget).parent().find(".conference-description").toggleClass("hidden"),a(c.currentTarget).toggleClass("opened"))})}(jQuery);
//# sourceMappingURL=qsc.js.map