"use strict";/* global Swiper */ /*
 * Swiper for customer case study company info box
 */ /*
 * Swiper for quote box
 */(function(){"use strict";var a=new Swiper(".box .swiper-container",{// Optional parameters
loop:!0,// If we need pagination
pagination:{el:".swiper-pagination",clickable:!0,type:"bullets"},autoplay:!1}),b=document.querySelector(".box.a");b.addEventListener("click",function(){a.slideNext()})})(),function(){"use strict";var a=new Swiper(".quote-box.swiper-container",{// Optional parameters
loop:!0,// If we need pagination
pagination:{el:".swiper-pagination",clickable:!0,type:"bullets"},autoplay:!1}),b=document.querySelector(".quote-box");b.addEventListener("click",function(){a.slideNext()})}();
//# sourceMappingURL=case-studies.js.map