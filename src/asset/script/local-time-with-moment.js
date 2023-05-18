"use strict";/* global moment */ /*
 * change all time tags (with datetime attributes) to the visitors local time
 */(function(a){"use strict";// helper function
// wait for the document to be ready
(function(a){"loading"===document.readyState?document.addEventListener("DOMContentLoaded",a):a()})(function(){if(a)// if moment is not loaded, then don't bother
{// find all time tags with datetime attributes
// and data-format attributes
var b=document.querySelectorAll("time[datetime][data-format]");if(b)for(var g=0,h=b.length;g<h;g+=1){// process each element found
var c=b[g],d=c.getAttribute("datetime"),e=c.getAttribute("data-format"),f=c.getAttribute("locale");if(f||(navigator.languages&&0<navigator.languages.length?f=navigator.languages[0]:f="en"),d&&e){// replace contents with local time formatted by moment.js
var i=a(d);i.locale(f),c.innerText=i.format(e);// add lang attribute
// since moment will use the language matching the locale
var j=f.substr(0,2);c.setAttribute("lang",j)}}}})})(moment);
//# sourceMappingURL=local-time-with-moment.js.map