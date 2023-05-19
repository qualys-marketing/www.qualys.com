/* global */

/* eslint-disable */
webpackJsonp(
    [12],
    {
        /***/ 12: /***/ function (module, exports, __webpack_require__) {
            "use strict";

            var _hero = __webpack_require__(2);

            var _hero2 = _interopRequireDefault(_hero);

            var _swiper = __webpack_require__(5);

            var _swiper2 = _interopRequireDefault(_swiper);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            // default hero transition
            (0, _hero2.default)();

            // init customers carousel
            // var swiper = new _swiper2.default(".swiper-container", {
            //  slidesPerView: "auto",
            //  navigation: {
            //    nextEl: ".q-carousel-button--next",
            //    prevEl: ".q-carousel-button--prev",
            //    disabledClass: "q-carousel-button--disabled"
            //  },
            //  spaceBetween: 30
            // });

            // swiper init workaround
            // setTimeout(function () {
            //  swiper.update(true);
            // }, 100);

            /***/
        },

        /***/ 32: /***/ function (module, exports) {
            // removed by extract-text-webpack-plugin
            /***/
        },

        /***/ 66: /***/ function (module, exports, __webpack_require__) {
            __webpack_require__(12);
            module.exports = __webpack_require__(32);

            /***/
        },
    },
    [66]
);
/* eslint-enable */

/* Counters */

const counterSection = document.querySelector(".q-company-counters");

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (!document.querySelector(".hasScrolled")) {
                counterupdated();
            }
        }
    });
});
observer.observe(counterSection);

function counterupdated() {
    let counts = setInterval(updated, 20);
    let upto = 0;
    const counters = document.querySelector(".q-company-counters");
    counters.classList.add("hasScrolled");
    function updated() {
        var count = document.getElementById("counter_text_50");
        count.innerHTML = ++upto;
        if (upto === 70) {
            clearInterval(counts);
        }
    }
    let counts1 = setInterval(updated1, 20);
    let upto1 = 0;
    function updated1() {
        var count1 = document.getElementById("counter_text_100");
        count1.innerHTML = ++upto1;
        if (upto1 === 70) {
            clearInterval(counts1);
        }
    }

    let counts2 = setInterval(updated2, 20);
    let upto2 = 0;
    function updated2() {
        var count2 = document.getElementById("counter_text_500");
        count2.innerHTML = ++upto2;
        if (upto2 === 53) {
            clearInterval(counts2);
        }
    }

    let counts3 = setInterval(updated3, 50);
    let upto3 = 0;
    function updated3() {
        var count3 = document.getElementById("counter_text_1000");
        count3.innerHTML = ++upto3;
        if (upto3 === 31) {
            clearInterval(counts3);
        }
    }
}

/* Counters */
