/* global jQuery */

window.qualys = window.qualys || {};

(function(qualys, $) {
	"use strict";

	qualys.displayJobTitles = function(job_titles) {
		var css;

		// if jQuery UI is not loaded, load it and then run autocomplete
		if (jQuery.ui === undefined || jQuery.ui === null) {

			// load jquery UI CSS theme
			$("head").append("<link />");
			css = $("head link:last");
			css.attr({
				"rel": "stylesheet",
				"href": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css"
			});
			$.getScript("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js")
				.done(function() {
					$("#myform_title, #title, #Title").autocomplete({
						source: function( request, response ) {
							qualys.getJobTitles(request, response, job_titles);
						}
					});
				});
		// otherwise, it's already loaded so just run autocomplete
		} else {
			$("#myform_title, #title, #Title").autocomplete({
				source: function( request, response ) {
					qualys.getJobTitles(request, response, job_titles);
				}
			});
		}
	};

	qualys.getJobTitles = function(request, response, job_titles) {
		var term, reg;
		term = $.trim(request.term);
		// show autocomplete only when 3 or more non-space characters are typed
		if (term !== "" && term.length > 2) {
			reg = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
			response($.grep(job_titles, function (value) {
				return reg.test(value);
			}));
		}
	};

	qualys.loadJobTitles = function(language) {
		var prefix = "";
		var hostnames = ["lps.qualys.com", "www.ssllabs.com", "dev.ssllabs.com"];

		if (hostnames.indexOf(window.location.hostname) !== -1) {
			prefix = "https://www.qualys.com";
		}

		$.getJSON(prefix + "/asset/text/" + language + "/job-titles.json")
			.done(function(data) {
				var job_titles = [];

				$.each(data, function(key, val) {
					job_titles.push(val);
				});

				qualys.displayJobTitles(job_titles);
			})
			.fail(function() { // if error, just load the English job titles
				qualys.loadJobTitles("en");
			});
	};

	qualys.getLanguage = function() {
		var language, languages;

		// list of languages must match folders in form processor "messages" folder
		languages = ["de", "es", "fr", "ru"];

		// get the language and then load the language-specific job titles
		// use this approach after we bake pages based on language
		//language = $("html").attr("lang");

		// get language from URL (temporary solution while we still have many forms in PHPHTMLib)
		language = window.location.pathname.match(/\/\w{2}\/$/);

		if (language === undefined || language === null) {
			language = "en";
		} else {
			language = language[0].replace(/^\/|\/$/g,"");
			// if language in URL is not in list of existing languages, set to English
			if (languages.indexOf(language) === -1) {
				language = "en";
			}
		}
		return language;
	};

	$(document).ready(function () {
		qualys.loadJobTitles(qualys.getLanguage());
	});
}(window.qualys, jQuery));