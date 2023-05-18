/* global moment */

/*
 * change all time tags (with datetime attributes) to the visitors local time
 */
(function (moment) {

	"use strict";

	// helper function
	function ready(fn) {
		if (document.readyState !== "loading"){
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	// wait for the document to be ready
	ready(function () {

		if (!moment) {

			// if moment is not loaded, then don't bother
			return;

		}

		// find all time tags with datetime attributes
		// and data-format attributes
		const elements = document.querySelectorAll("time[datetime][data-format]");

		if (elements) {

			for (let index = 0, length = elements.length; index < length; index += 1) {

				// process each element found
				const element = elements[index];
				const datetime = element.getAttribute("datetime");
				const format = element.getAttribute("data-format");
				let locale = element.getAttribute("locale");

				if (!locale) {

					// TODO ask browser for visitors preferred locale
					if (navigator.languages && navigator.languages.length > 0) {
						locale = navigator.languages[0];
					} else {
						locale = "en";
					}

				}

				if (datetime && format) {

					// replace contents with local time formatted by moment.js
					const m = moment(datetime);
					m.locale(locale);
					element.innerText = m.format(format);

					// add lang attribute
					// since moment will use the language matching the locale
					const lang = locale.substr(0, 2);
					element.setAttribute("lang", lang);

				}

			}

		}

	});

}(moment));
