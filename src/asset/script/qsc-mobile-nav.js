"use strict";function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}/* global jQuery */ /*
 * handle QSC mobile submenu
 */(function(a){"use strict";// close mobile nav after click submenu link
// toggle expand / collapse of submenus
a(".q-navigation-mobile-submenu__item .q-navigation-mobile__link").on("click",function(){a(".q-navigation-mobile__button").trigger("click")}),a(".q-location-link.q-navigation-mobile__link").on("click",function(b){var c=a(b.currentTarget).parent().next(".submenu-container"),d=c.attr("style");_typeof(d)!=="undefined"&&!1!==d&&"display: block;"===d||(a(".q-navigation-mobile__list .submenu-container").slideUp(),c.slideDown())})})(jQuery);
//# sourceMappingURL=qsc-mobile-nav.js.map