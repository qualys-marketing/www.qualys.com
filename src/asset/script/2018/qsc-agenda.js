"use strict";/* global jQuery:false $:false */ //scrollspy and expand / collapse long passages of text
// hide register buttons
// expand / collapse agenda rows
(function(a){"use strict";// sticky sub nav
// scroll to section
(function(b){if("undefined"!=typeof b){var c=b.offset().top,d=a(window);d.on("scroll",function(){d.scrollTop()>=c?b.addClass("fixed"):b.removeClass("fixed"),document.querySelector(".subnav-active")&&(d.scrollTop()>=c?"":document.querySelector(".subnav-active").classList.remove("subnav-active"))})}})(a(".q-subnav__sticky")),a(".q-qsc__subnav-link").on("click",function(b){var c=a(this.getAttribute("href"));c.length&&(b.preventDefault(),a("html, body").stop().animate({scrollTop:c.offset().top+20},0))})})(jQuery),function(){"use strict";function a(){Array.prototype.forEach.call(d,function(a){f[a.id]=a.offsetTop-80})}// expand/collapse the clicked element
// when click "Expand+" link, expand the text
// when click "Collapse+" link, collapse the text
function b(a){var b=a.currentTarget,c=b.parentNode,d=c.classList.contains("expandedHeight");d?(c.classList.add("collapsedHeight"),c.classList.remove("expandedHeight"),setTimeout(function(){return b.innerText="Expand +"},200)):(c.classList.remove("collapsedHeight"),c.classList.add("expandedHeight"),setTimeout(function(){return b.innerText="Collapse \u2013"},200))}function c(){var a=Array.from(document.querySelectorAll(".expandable"));a.forEach(function(a){if(null===a.querySelector("button")&&134<a.offsetHeight){// create Expand+, Collapse- button
var c=document.createElement("button");c.innerText="Expand +",c.addEventListener("click",b),a.appendChild(c),a.classList.add("collapsedHeight")}})}var d=document.querySelectorAll(".q-qsc-section"),f={},g=0;// when user clicks on an agenda tab or training class option,
// need to recalculate section offsets due to page length changing
a(),window.onscroll=function(){var a=document.documentElement.scrollTop||document.body.scrollTop;for(g in f)if(f[g]<=a){var b=document.querySelector(".subnav-active");b&&b.classList.remove("subnav-active"),document.querySelector("a[href*="+g+"]").classList.add("subnav-active")}},c(),$(".class-select-menu-item, .tablink").on("click",function(){setTimeout(function(){a(),c()},0)})}(),function(a){"use strict";var b=window.location.pathname.replace("/2018/qsc/","").replace("/","");"las-vegas"===b||"london"===b||"berlin"===b||"paris"===b?a("body").addClass("registration-closed"):void 0}(jQuery),function(a){"use strict";a(".toggle, .title-speaker-container .read-more").on("click",function(b){a(b.currentTarget).parents(".title-speaker-container").hasClass("expanded")?(a(b.currentTarget).parents(".title-speaker-container").removeClass("expanded").addClass("collapsed"),a(b.currentTarget).parents(".title-speaker-container").find(".abstract").addClass("hidden")):a(b.currentTarget).parents(".title-speaker-container").hasClass("collapsed")&&(a(b.currentTarget).parents(".title-speaker-container").removeClass("collapsed").addClass("expanded"),a(b.currentTarget).parents(".title-speaker-container").find(".abstract").removeClass("hidden"))})}(jQuery);
//# sourceMappingURL=qsc-agenda.js.map