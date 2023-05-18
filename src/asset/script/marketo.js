/* global jQuery:false _:false XRegExp:false MktoForms2:false qualys */
window.qualys = window.qualys || {};
window.qualys.marketo = window.qualys.marketo || {};

function sanitize(string) {
	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		"/": '&#x2F;',
	};
	const reg = /[&<>"'/]/ig;
	return string.replace(reg, (match)=>(map[match]));
}

(function(qualysMarketo, $, XRegExp, MktoForms2, _) {
	"use strict";

	/*
	 * auto-fill empty fields like fields on 2nd panel of 2-panel form
	 * map some ZoomInfo fields to Qualys Marketo fields
	 */
	qualysMarketo.mapZoomInfoFields = function (form) {
		console.log(zoomInfoMatchResult);

		form.getFormElem().find(":input:not([type=hidden])").each(function () {
			var elementName = $(this).attr("name");
			if (!$(this).val() || ($(this).val().trim() === "" && elementName !== "State" && elementName !== "Email")) {
				form.getFormElem().find("#" + elementName).val(zoomInfoMatchResult[elementName]).trigger("change");
			}
		});

		form.getFormElem().find("#State").val(stateMapping[zoomInfoMatchResult.State]).trigger("change");

		var $companySizeRange = form.getFormElem().find("#Company_Size_Range__c_account");
		if ($companySizeRange.val() === "") {
			var companySizeRange = "";
			if (zoomInfoMatchResult["Num Employees"] <= 250) {
				companySizeRange = "1-250";
			} else if (zoomInfoMatchResult["Num Employees"] <= 5000) {
				companySizeRange = "251-5000";
			} else if (zoomInfoMatchResult["Num Employees"] > 5000) {
				companySizeRange = "5000+";
			}
			$companySizeRange.val(companySizeRange).trigger("change");
		}

	};

	/*
	 * add ZoomInfo FormComplete script
	 */
	qualysMarketo.loadZoomInfo = function (form) {

		var urlParams, leadsource, leadsourceArray;

		// get leadsource value from the url
		urlParams = qualys.parseQueryString(window.location.search);
		leadsource = urlParams.leadsource;

		// partnetr leadsource array, add values in the array to support more partners
		leadsourceArray = ["344572624"];

		// do not execute zoominfo functionality if the url contains specific partner leadsource
		if( leadsource && typeof leadsource === "string" && leadsourceArray.includes(leadsource) ) {
			return;
		}

		function onZoomInfoMatchEvent(matchResult) {
			zoomInfoMatchResult = matchResult;
			qualysMarketo.mapZoomInfoFields(form);
		}

		/*
			When development mode is disabled,
			-No more than 5 requests allowed in 10 minutes from the email address
			-No more than 30 requests allowed in an hour from the same IP address
			otherwise, you'll get CORS error
			When developing, enable dev mode below and test using full-match@zoominfo.com
			When testing locally, use local.dev.qualys.com:3000 as that's configured in ZoomInfo
		*/



		if ($("[src$='formcomplete.js']").length === 0) {
			var development = false;

			if (window.location.host === "localhost" || window.location.host === "local.dev.qualys.com") {
				development = true;
			}
			window._zi = {
				development: development,
				formId: '9xIPVjQNxHniLRwBwvNW',
				callbacks: { onMatch: onZoomInfoMatchEvent }
			};

			var zi = document.createElement('script');
			zi.type = 'text/javascript';
			zi.async = true;
			zi.src = 'https://ws-assets.zoominfo.com/formcomplete.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(zi, s);
		}
	};

	/*
	 * if location is in URL or hash tag (e.g. /#munich),
	 * preselect location field.
	 */
	qualysMarketo.preselectLocation = function (marketoForm) {
		marketoForm.whenReady(function () {
			$(window).trigger("hashchange");
			$(window).on("hashchange", function() {
				if (document.referrer.indexOf("berlin") > 0 || window.location.hash === "#berlin") {
					$("option[value=berlin]").prop("selected", true);
					$("#qsc_location_title").text("Berlin");
				} else if (document.referrer.indexOf("munich") > 0 || window.location.hash === "#munich") {
					$("option[value=munich]").prop("selected", true);
					$("#qsc_location_title").text("Munich");
				} else if (document.referrer.indexOf("paris") > 0 || window.location.hash === "#paris") {
					$("option[value=paris]").prop("selected", true);
					$("#qsc_form_title, .q-square__content .heading--3").text("Inscription");
					$(".mktoForm .mktoButton").text("Inscription");
					$("#qsc_register_text_fr").removeClass("qsc-register__text--hidden").show();
					$("#qsc_register_text_en").addClass("qsc-register__text--hidden");
				} else if (document.referrer.indexOf("london") > 0 || window.location.hash === "#london") {
					$("option[value=london]").prop("selected", true);
					$("#qsc_location_title").text("London");
				} else if (document.referrer.indexOf("san-francisco") > 0 || window.location.hash === "#san-francisco") {
					$("option[value='san-francisco']").prop("selected", true);
				} else if (document.referrer.indexOf("mumbai") > 0 || window.location.hash === "#mumbai") {
					$("option[value=mumbai]").prop("selected", true);
				} else if (document.referrer.indexOf("dubai") > 0 || window.location.hash === "#dubai") {
					$("option[value=dubai]").prop("selected", true);
				} else if (document.referrer.indexOf("las-vegas") > 0 || window.location.hash === "#las-vegas") {
					$("option[value=las-vegas]").prop("selected", true);
				} else if (document.referrer.indexOf("new-york") > 0 || window.location.hash === "#new-york") {
					$("option[value=new-york]").prop("selected", true);
				} else if (document.referrer.indexOf("atlanta") > 0 || window.location.hash === "#atlanta") {
					$("option[value=atlanta]").prop("selected", true);
				} else if (document.referrer.indexOf("chicago") > 0 || window.location.hash === "#chicago") {
					$("option[value=chicago]").prop("selected", true);
				} else if (document.referrer.indexOf("singapore") > 0 || window.location.hash === "#singapore") {
					$("option[value=singapore]").prop("selected", true);
				} else if (document.referrer.indexOf("sydney") > 0 || window.location.hash === "#sydney") {
					$("option[value=sydney]").prop("selected", true);
				}
			});
		});
	};

	/*
	 * inject hidden field based on QSC location
	 */
	qualysMarketo.addQscLocationField = function (marketoForm) {
		marketoForm.whenReady(function () {
			if (window.location.pathname.indexOf("berlin") > 0) {
				$("input[name=\"Event_Location\"]").prop("value", "berlin");
			} else if (window.location.pathname.indexOf("paris") > 0) {
				$("input[name=\"Event_Location\"]").prop("value", "paris");
				$("button.mktoButton").text("Inscription");
			} else if (window.location.pathname.indexOf("london") > 0) {
				$("input[name=\"Event_Location\"]").prop("value", "london");
			} else if (window.location.pathname.indexOf("munich") > 0) {
				$("input[name=\"Event_Location\"]").prop("value", "munich");
			} else if (window.location.pathname.indexOf("dubai") > 0) {
				$("input[name=\"Event_Location\"]").prop("value", "dubai");
			} else if (window.location.pathname.indexOf("mumbai") > 0) {
				$("input[name=\"Event_Location\"]").prop("value", "mumbai");
			} else if (window.location.pathname.indexOf("san-francisco") > 0) {
				$("input[name=\"Event_Location\"]").prop("value", "san francisco");
			}
		});
	};

	/*
	 * inject Quantcast Order ID field with a UUID
	 */
	qualysMarketo.addQuantcastOrderId = function (form) {

		var uuid;

		uuid = window.qualys.utils.generateUUID();
		if ($("input[name=\"quantcastOrderID\"], input[name=\"Quantcast_Order_Id__c\"]").length > 0) {

			$("input[name=\"quantcastOrderID\"]").prop("value", uuid);
			$("input[name=\"Quantcast_Order_Id__c\"]").prop("value", uuid);

		} else {

			form.getFormElem().append("<input type=\"hidden\" name=\"quantcastOrderID\" value=\"" + uuid + "\" />");
			form.getFormElem().append("<input type=\"hidden\" name=\"Quantcast_Order_Id__c\" value=\"" + uuid + "\" />");

		}

	};

	/*
	 * inject hidden field to know of GTM was loaded or not
	 */
	qualysMarketo.addGtmLoadedValue = function (form) {
		var gtmLoaded = false;

		if (window.dataLayer !== undefined && window.dataLayer.length > 2) {
			gtmLoaded = true;
		}

		form.addHiddenFields({"gTMLoaded":gtmLoaded});

	};

	/*
	 *  inject hidden field to identify the black listed countries
	 */

	qualysMarketo.addBlackListedValue = function (form) {

		var isBlackListed = false;
		var countryField = form.getFormElem().find("#Country");
		var countryFieldVal = "";

		if( countryField.length ) {

			form.addHiddenFields({"blackListed": isBlackListed});
			var blacklistFieldName = form.getFormElem().find("[name='blackListed']");

			$(document).on("change", countryField , function() {

				countryFieldVal = countryField.val();

				if( countryFieldVal === "Russian Federation" || countryFieldVal === "Belarus") {
					isBlackListed = true;
				}
				else {
					isBlackListed = false;
				}

				blacklistFieldName.val(isBlackListed);

			});

		}
	};

	/*
	 * inject hidden field to know if user consented to cookie tracking
	 */
	qualysMarketo.addDntCookieValue = function (form) {
		var cookieValue = "Not Set";
		var cookies = window.qualys.parseCookieString(document.cookie);

		cookies.forEach(function (cookie) {
			if (cookie.name === "dnt") {
				if (cookie.value === "0") {
					cookieValue = "Opt In";
				} else if (cookie.value === "1") {
					cookieValue = "Opt Out";
				}
			}
		});

		form.addHiddenFields({"gDPRCookieConsent":cookieValue});
	};

	/**
	 *
	 * fillup form with base64 code information for partner form
	 */

	 qualysMarketo.autoFillupForm = function ( form ) {

		var urlParams, leadsource, x, x_decode, x_values, x_fname, fnameField, x_lname, lnameField, x_email, emailField, x_cname, cnameField, x_title, titleField, x_phone, phoneField, x_country, countryField, x_state, stateField, x_size, sizeField, x_qaccount, qaccountField, accountYes, accountNo;

		urlParams = qualys.parseQueryString(window.location.search);
		leadsource = urlParams.leadsource;

		if( leadsource && typeof leadsource === "string"){

			x = urlParams.x;

			if( x && typeof x === "string") {

				x_decode = window.atob(x);
				x_values = qualys.parseQueryString( x_decode );

				x_email = sanitize( x_values.email );
				x_fname = sanitize( x_values.fname );
				x_lname = sanitize( x_values.lname );
				x_cname = sanitize( x_values.cname );
				x_title = sanitize( x_values.title );
				x_phone = sanitize( x_values.phone );
				x_country = sanitize( x_values.country );
				x_state = sanitize( x_values.state );
				x_size = sanitize( x_values.size );
				x_qaccount = sanitize( x_values.account );

				if( x_email && typeof x_email === "string") {
					emailField = form.getFormElem().find("#Email");
					if( emailField.length ){
						emailField.val( x_email );
					}
				}

				if( x_fname && typeof x_fname === "string") {
					fnameField = form.getFormElem().find("#FirstName");
					if( fnameField.length ){
						fnameField.val( x_fname );
					}
				}

				if( x_lname && typeof x_lname === "string") {
					lnameField = form.getFormElem().find("#LastName");
					if( lnameField.length ){
						lnameField.val( x_lname );
					}
				}

				if( x_cname && typeof x_cname === "string") {
					cnameField = form.getFormElem().find("#Company");
					if( cnameField.length ){
						cnameField.val( x_cname );
					}
				}

				if( x_qaccount && typeof x_qaccount === "string") {
					qaccountField = form.getFormElem().find("[name='qualysAccount']");
					if( qaccountField.length ){
						accountYes = form.getFormElem().find(".qualysAccount label:first-child");
						accountNo = form.getFormElem().find(".qualysAccount label:last-child");
						if(x_qaccount === "yes") {
							accountYes.trigger("click");
						}
						else if(x_qaccount === "no") {
							accountNo.trigger("click");
						}
					}
				}

				if( x_title && typeof x_title === "string") {
					titleField = form.getFormElem().find("#Title");
					if( titleField.length ){
						titleField.val( x_title );
					}
				}

				if( x_phone && typeof x_phone === "string") {
					phoneField = form.getFormElem().find("#Phone");
					if( phoneField.length ){
						phoneField.val( x_phone );
					}
				}

				if( x_country && typeof x_country === "string") {
					if ( form.getFormElem().hasClass("show-next-panel" )) {
						countryField = form.getFormElem().find("#Country");
						if( countryField.length ){
							countryField.val( x_country ).trigger("change");
						}
					}
				}

				if( x_state && typeof x_state === "string") {
					stateField = form.getFormElem().find("#State");
					if( stateField.length ){
						stateField.val( x_state );
					}
				}

				if( x_size && typeof x_size === "string") {
					sizeField = form.getFormElem().find("#Company_Size_Range__c_account");
					if( sizeField.length ){
						sizeField.val( x_size );
					}
				}

			}
		}

	 };

	/*
	 * display a warning popup box if user attempts to leave page after filling out form
	 */
	qualysMarketo.warnBeforeLeaving = function (form) {
		var submitted = false;

		form.onSubmit(function () {
			submitted = true;
		});

		window.addEventListener("beforeunload", function (e) {
			var formModifield = false;
			var values = form.getValues();
			var fieldNames = ["FirstName", "LastName", "Email", "Company", "Title", "Phone", "Country"];

			if (values) {
				fieldNames.forEach(function(fieldName) {
					if (values[fieldName] !== undefined && values[fieldName] !== "") {
					formModifield = true;
					}
				});
			}

			if (formModifield && !submitted) {
				// https://stackoverflow.com/questions/40570164/how-to-customize-the-message-changes-you-made-may-not-be-saved-for-window-onb
				var message = "Custom message no longer shown";

				(e || window.event).returnValue = message; //Gecko + IE
				return message; //Gecko + Webkit, Safari, Chrome etc.
			}
		});
	};

	qualysMarketo.filterFields = function () {
		// trim form values and replace multiple spaces with 1 space
		$("form.mktoForm input").on("blur", function (event) {
			var newVal = $.trim($(event.currentTarget).val());
			newVal = newVal.replace(/\s+/gi, " ");
			$(event.currentTarget).val(newVal);
		});

		// lowercase email address field
		$("form.mktoForm #Email").on("blur", function (event) {
			var newVal = $(event.currentTarget).val().toLowerCase();
			$(event.currentTarget).val(newVal);
		});

		// camelcase name fields
		$("form.mktoForm #FirstName, form.mktoForm #LastName").on("blur", function (event) {
			var newVal = $(event.currentTarget).val();
			newVal = newVal.split(" ").map(function(word) {
				if (word[0] !== undefined) {
					return word[0].toUpperCase() + word.slice(1);
				}
			}).join(" ");
			$(event.currentTarget).val(newVal);
		});

		$("form.mktoForm").on("fieldsFilled", function () {
			$("form.mktoForm #FirstName, form.mktoForm #LastName").trigger("blur");
		});
	};

	var formIsSubmitable, validCountries, validUsStates, validCanadianStates, validCompanySize, errorMessages, errors, formValueMapping, blacklistedEmailDomains = "", prefix = "", hostnames, setLocationCalled = false, zoomInfoMatchResult, stateMapping;

	stateMapping = {
		"Alabama":"AL",
		"Alaska":"AK",
		"Arizona":"AZ",
		"Arkansas":"AR",
		"California":"CA",
		"Colorado":"CO",
		"Connecticut":"CT",
		"Delaware":"DE",
		"District of Columbia":"DC",
		"Florida":"FL",
		"Georgia":"GA",
		"Hawaii":"HI",
		"Idaho":"ID",
		"Illinois":"IL",
		"Indiana":"IN",
		"Iowa":"IA",
		"Kansas":"KS",
		"Kentucky":"KY",
		"Louisiana":"LA",
		"Maine":"ME",
		"Maryland":"MD",
		"Massachusetts":"MA",
		"Michigan":"MI",
		"Minnesota":"MN",
		"Mississippi":"MS",
		"Missouri":"MO",
		"Montana":"MT",
		"Nebraska":"NE",
		"Nevada":"NV",
		"New Hampshire":"NH",
		"New Jersey":"NJ",
		"New Mexico":"NM",
		"New York":"NY",
		"North Carolina":"NC",
		"North Dakota":"ND",
		"Ohio":"OH",
		"Oklahoma":"OK",
		"Oregon":"OR",
		"Pennsylvania":"PA",
		"Rhode Island":"RI",
		"South Carolina":"SC",
		"South Dakota":"SD",
		"Tennessee":"TN",
		"Texas":"TX",
		"Utah":"UT",
		"Vermont":"VT",
		"Virginia":"VA",
		"Washington":"WA",
		"West Virginia":"WV",
		"Wisconsin":"WI",
		"Wyoming":"WY"
	};

	hostnames = ["lps.qualys.com", "www.ssllabs.com", "dev.ssllabs.com"];

	if (hostnames.indexOf(window.location.hostname) !== -1) {
		prefix = "https://www.qualys.com";
	}

	// AJAX in the list of free email domain names
	$.ajax({
		url: prefix + "/asset/data/domain-names-with-free-email.json",
		dataType: "json",
		success: function (data) {
			blacklistedEmailDomains = data;
		},
		error: function (jqXHR, textStatus, errorThrown) {
			throw new Error(`${errorThrown}: ${jqXHR.responseText}`);
		}
	});

	errorMessages = {
		"en" : {
			"invalidEmail" : "Must be a valid email address, e.g. example@yourdomain.com",
			"invalidDisposableEmail": "Must be a valid, non-disposable email address",
			"emailTooLong" : "Email address is too long",
			"emailInvalidDomain" : "Email address must have a valid domain name",
			"workEmailRequired" : "Use company email. Or contact tar@qualys.com",
			"phoneTooShort" : "Phone number cannot be that short",
			"phoneTooLong" : "Phone number cannot be that long",
			"phoneExtTooShort" : "Phone extension cannot be that short",
			"phoneExtToolong" : "Phone extension cannot be that long",
			"minMaxLength" : "Must be between {minLength} and {maxLength} characters long",
			"minMaxValue" : "Must be between {minValue} and {maxValue}",
			"invalidValue" : "Invalid value",
			"updateAccount": "Update Account",
			"usOnly": "This option is only available in the United States",
			"invalidFullName": "Must be both first and last name",
			"useCommunityEdition": "For students, we recommend <a href='https://www.qualys.com/community-edition/'>Qualys Community Edition</a> – a free version of the Qualys Cloud Platform"
		},
		"fr" : {
			"invalidEmail" : "Doit être une adresse email correcte, par ex. votrenom@votrenomdedomaine.com.",
			"emailTooLong" : "Adresse électronique est trop long.",
			"emailInvalidDomain" : "Adresse électronique doit avoir une name. de domaine valide.",
			"workEmailRequired" : "Si vous avez besoin d'aide, contactez tar@qualys.com.",
			"PhoneTooShort" : "Téléphone ne peut être que short.",
			"PhoneTooLong" : "Téléphone ne peut être que long.",
			"phoneExtTooShort" : "Téléphone extension ne peut être que short.",
			"phoneExtToolong" : "Téléphone extension ne peut être que long.",
			"minMaxLength" : "Doit comprendre entre {longueurmin} et {longueurmax} caractères.",
			"minMaxValue" : "Doit être entre {Valeurmin} et {Valeurmax}.",
			"invalidValue" : "Valeur incorrecte",
			"updateAccount": "Mettre à jour le compte",
			"usOnly": "This option is only available in the United States.",
			"invalidFullName": "Must be both first and last name",
			"useCommunityEdition": "For students, we recommend <a href='https://www.qualys.com/community-edition/'>Qualys Community Edition</a> – a free version of the Qualys Cloud Platform."
		},
		"de" : {
			"invalidEmail" : "Muss eine gültige E-Mail-Adresse sein, z.B. example@yourdomain.com.",
			"emailTooLong" : "E-Mail zu long.",
			"emailInvalidDomain" : "E-Mail müssen einen gültigen Domain-name.",
			"workEmailRequired" : "Bei Fragen kontaktieren Sie bitte tar@qualys.com.",
			"PhoneTooShort" : "Telefonnummer nicht, dass short. sein",
			"PhoneTooLong" : "Telefonnummer nicht, dass long. sein",
			"phoneExtTooShort" : "Telefonnummer Erweiterung kann nicht short sein.",
			"phoneExtToolong" : "Telefonnummer Erweiterung kann nicht long sein.",
			"minMaxLength" : "Muss zwischen {minLength} und {maxLength} Zeichen lang sein.",
			"minMaxValue" : "Muss zwischen {minValue} und {maxValue} liegen.",
			"invalidValue" : "Ungültiger Wert",
			"updateAccount": "Konto aktualisieren",
			"usOnly": "This option is only available in the United States.",
			"invalidFullName": "Must be both first and last name",
			"useCommunityEdition": "For students, we recommend <a href='https://www.qualys.com/community-edition/'>Qualys Community Edition</a> – a free version of the Qualys Cloud Platform."
		},
		"es" : {
			"invalidEmail" : "Must be a valid email address, e.g. example@yourdomain.com.",
			"emailTooLong" : "Electronico es muy largo.",
			"emailInvalidDomain" : "Electronico address debe tener un dominio válido name.",
			"workEmailRequired" : "Para más información, no dude en contactarnos en tar@qualys.com.",
			"PhoneTooShort" : "Número de teléfono es muy corto.",
			"PhoneTooLong" : "Número de teléfono es muy largo.",
			"phoneExtTooShort" : "Número de teléfono extensión es muy corto.",
			"phoneExtToolong" : "Número de teléfono extensión es muy largo.",
			"minMaxLength" : "Must be between {minLength} and {maxLength} characters long.",
			"minMaxValue" : "Must be between {minValue} and {maxValue}.",
			"invalidValue" : "Invalid value",
			"updateAccount": "Update Account",
			"usOnly": "This option is only available in the United States.",
			"invalidFullName": "Must be both first and last name",
			"useCommunityEdition": "For students, we recommend <a href='https://www.qualys.com/community-edition/'>Qualys Community Edition</a> – a free version of the Qualys Cloud Platform."
		},
		"ru" : {
			"invalidEmail" : "Must be a valid email address, e.g. example@yourdomain.com.",
			"emailTooLong" : "Адрес электронной почты слишком long.",
			"emailInvalidDomain" : "Адрес электронной почты должны иметь действительный name. области",
			"workEmailRequired" : "За помощью обращайтесь на tar@qualys.com.",
			"PhoneTooShort" : "Телефон не может быть, что short.",
			"PhoneTooLong" : "Телефон не может быть, что long.",
			"phoneExtTooShort" : "Телефон расширение не может быть, что short.",
			"phoneExtToolong" : "Телефон расширение не может быть, что long.",
			"minMaxLength" : "Must be between {minLength} and {maxLength} characters long.",
			"minMaxValue" : "Must be between {minValue} and {maxValue}.",
			"invalidValue" : "Invalid value",
			"updateAccount": "Обновить аккаунт",
			"usOnly": "This option is only available in the United States.",
			"invalidFullName": "Must be both first and last name",
			"useCommunityEdition": "For students, we recommend <a href='https://www.qualys.com/community-edition/'>Qualys Community Edition</a> – a free version of the Qualys Cloud Platform."
		}
	};

	formValueMapping = {
		"Express Lite": {
			"Marketing_Asset_Id_Current__c": "306",
			"last_mkt_asset": "306",
			"Company_Size_Range__c_account": "1-250"
		},
		"Express": {
			"Marketing_Asset_Id_Current__c": "306",
			"last_mkt_asset": "306",
			"Company_Size_Range__c_account": "251-5000"
		},
		"Enterprise": {
			"Marketing_Asset_Id_Current__c": "305",
			"last_mkt_asset": "305",
			"Company_Size_Range__c_account": "5000+"
		},
		"Consultant": {
			"Marketing_Asset_Id_Current__c": "308",
			"last_mkt_asset": "308",
			"Company_Size_Range__c_account": "Security Consultant"
		},
		"Federal Government": {
			"Marketing_Asset_Id_Current__c": "359",
			"last_mkt_asset": "359",
			"Company_Size_Range__c_account": "Federal Government"
		},
		"1-250": {
			"Marketing_Asset_Id_Current__c": "306",
			"last_mkt_asset": "306",
		},
		"251-5000": {
			"Marketing_Asset_Id_Current__c": "306",
			"last_mkt_asset": "306",
		},
		"5000+": {
			"Marketing_Asset_Id_Current__c": "305",
			"last_mkt_asset": "305",
		},
		"Security Consultant": {
			"Marketing_Asset_Id_Current__c": "308",
			"last_mkt_asset": "308",
		},
	};

	// function to translate / localize error messages
	// the parameter "object" takes a JSON object containing optional parameters
	// e.g. {"minValue" : 2, "maxValue" : 4}
	qualysMarketo.t = function (errorKey, object) {
		var translatedMessage, lang, $body, key;
		lang = "en";
		$body = $("body");

		if ($body.hasClass("fr")) {lang = "fr";}
		if ($body.hasClass("de")) {lang = "de";}
		if ($body.hasClass("es")) {lang = "es";}
		if ($body.hasClass("ru")) {lang = "ru";}

		translatedMessage = errorMessages[lang][errorKey];

		for (key in object) {
			if (object.hasOwnProperty(key)) {
				translatedMessage = translatedMessage.replace("{" + key + "}", object[key]);
			}
		}

		return translatedMessage;
	};

	// validate email length
	// 254 octets, maximum according to RFC 5321
	// it is not 320 octets as originally specified in RFC 3696, which has been corrected to 254 octets
	// 100 octets, maximum specified by Qualys Engineering
	qualysMarketo.validateEmail = function (form) {
		var val, emailDomainPart, emailLocalPart;

		// get all field values
		val = form.getValues();

		if (val.Email !== undefined) {
			emailLocalPart = val.Email.split("@")[0];
			emailDomainPart = val.Email.split("@")[1];

			// validate email field
			if (val.Email.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gi) === null) {
				// email format must be valid
				errors.push({"[name='Email']": qualysMarketo.t("invalidEmail")});
			}
			if (qualysMarketo.getUTF8Length(val.Email) > 100) {
				//email address length may not exceed 100 characters
				errors.push({"[name='Email']": qualysMarketo.t("emailTooLong")});
			}
			if (qualysMarketo.getUTF8Length(emailDomainPart) > 253) {
				// RFC 5321 Section 4.5.3.1.2
				// email domain length must not exceed 253 characters
				errors.push({"[name='Email']": qualysMarketo.t("emailTooLong")});
			}
			if (qualysMarketo.getUTF8Length(emailLocalPart) > 64) {
				// RFC 5321 Section 4.5.3.1.1
				// email local part length must not exceed 64 characters
				errors.push({"[name='Email']": qualysMarketo.t("emailTooLong")});
			}

			if (emailDomainPart && emailDomainPart.trim() !== "qualys.com") { // exclude qualys.com emails for testing
				var neverBounceStatuses = ["invalid", "disposable"];
				var dataZiNeverBounceStatus = form.getFormElem().find("#Email").attr("data-zi-neverbounce-status");
				// dataZiNeverBounceStatus = "disposable";
				if (dataZiNeverBounceStatus !== undefined && dataZiNeverBounceStatus.trim() !== "") {
					if ($("input[name=\"neverBounceResultStatus\"]").length > 0) {
						$("input[name=\"neverBounceResultStatus\"]").prop("value", dataZiNeverBounceStatus);
					} else {
						form.getFormElem().append("<input type=\"hidden\" name=\"neverBounceResultStatus\" value=\"" + dataZiNeverBounceStatus + "\" />");
					}

					if (neverBounceStatuses.includes(dataZiNeverBounceStatus)) {
						// if ZoomInfo NeverBounce status is "invalid" or "disposable"
						// return invalid email to user
						// temporarily disable validation due to false positives
						// errors.push({"[name='Email']": qualysMarketo.t("invalidDisposableEmail")});
					}

					if (window.ga) {
						window.ga("send", {
							hitType: "event",
							eventCategory: "Form Progression",
							eventAction: "Info: NeverBounce result is " + dataZiNeverBounceStatus,
							eventLabel: "Email",
							nonInteraction: true
						});
					}
				}
			}

			if (emailDomainPart !== undefined) {
				if (emailDomainPart.match(/^[A-Za-z0-9\-.]+$/) === null) {
					// invalid characters in email domain name
					errors.push({"[name='Email']": qualysMarketo.t("emailInvalidDomain")});
				}
				if (emailDomainPart.match(/\.{2}/) !== null) {
					// email domain part may not have two consecutive dots
					errors.push({"[name='Email']": qualysMarketo.t("emailInvalidDomain")});
				}
				if (emailDomainPart === "qualys.com") {
					// block email aliases at qualys.com
					switch (emailLocalPart) {
					case "info":
					case "sales":
					case "sales-triage-group":
					case "salesinquiry":
					case "tar":
					case "web-dev":
					case "webmaster":
						errors.push({"[name='Email']": qualysMarketo.t("invalidEmail")});
						break;
					}
				}
				if (window.location.pathname.indexOf("/forms/freescan/") !== -1) {
					// FreeScan forms only accept corporate email addresses unless the country is US or UK
					// AJAX in the free email domain names
					var country = $("#Country").val();

					if (country !== "" && country !== "United States" && country !== "United Kingdom (GB)") {
						if ($.inArray(emailDomainPart, blacklistedEmailDomains) !== -1) {
							errors.push({"[name='Email']": qualysMarketo.t("workEmailRequired")});
						}
					}
				}

				// block personal emails on all forms except some
				// the Community Edition form (2470) blocks personal email address but allows .edu ones
				// since the blacklist doesn't contain any .edu email addresses
				var formsIdsAllowPersonalEmails = [1226,3500,3754];
				if ($.inArray(emailDomainPart, blacklistedEmailDomains) !== -1 && !formsIdsAllowPersonalEmails.includes(form.getId())) {
					errors.push({"[name='Email']": qualysMarketo.t("workEmailRequired")});
				}

				// block .edu email addresses from Consultant form
				if (form.getId() === 1803 && emailDomainPart.includes(".edu")) {
					errors.push({ "[name='Email']": qualysMarketo.t("useCommunityEdition") });
					form.getFormElem().find("[type='submit'].mktoButton").addClass("disabled");
					form.submitable(false);
				}
			}
		}
	};

	// validate phone
	qualysMarketo.validatePhone = function (form) {
		var val, phone, extension, numPhoneDigits, numExtDigits, pattern;

		// get all field values
		val = form.getValues();
		phone = extension = "";

		if (val.Phone !== undefined) {
			if (val.Phone.match(/x/i) !== null) {
				val.Phone = val.Phone.replace("X", "x");
				phone = val.Phone.split("x")[0];
				extension = val.Phone.split("x")[1];
				if ($.trim(phone) !== "") {
					numPhoneDigits = phone.replace(/\D/gi, "").length;
				}
				if ($.trim(extension) !== "") {
					numExtDigits = extension.replace(/\D/gi, "").length;
				}
			} else {
				if ($.trim(val.Phone) !== "") {
					numPhoneDigits = $.trim(val.Phone).length;
				}
			}

			pattern = new XRegExp("^[\\p{Number}\\p{Punctuation}\\p{Math_Symbol}\\p{Space_Separator}ext]+$", "i");
			if (!pattern.test(val.Phone)) {
				// phone number must only contain digits, punctuation, spaces and x
				errors.push({"[name='Phone']": qualysMarketo.t("invalidValue")});
			}
			if (numPhoneDigits < 7) {
				// phone number must contain between 7 and 15 digits
				errors.push({"[name='Phone']": qualysMarketo.t("phoneTooShort")});
			}
			if (numPhoneDigits > 15) {
				// phone number must contain between 7 and 15 digits
				errors.push({"[name='Phone']": qualysMarketo.t("phoneTooLong")});
			}
			if (numExtDigits !== 0 && numExtDigits < 2) {
				// phone extension must contain between 2 and 4 digits
				errors.push({"[name='Phone']": qualysMarketo.t("phoneExtTooShort")});
			}
			if (numExtDigits !== 0 && numExtDigits > 4) {
				// phone extension must contain between 2 and 4 digits
				errors.push({"[name='Phone']": qualysMarketo.t("phoneExtToolong")});
			}
		}
	};

	// validate job title
	qualysMarketo.validateJobTitle = function (form) {
		var val;

		// get all field values
		val = form.getValues();

		if (val.Title !== undefined) {
			if (val.Title.toLowerCase() === "student" && val.Marketing_Asset_Id_Current__c === "308") {
				errors.push({ "[name='Title']": qualysMarketo.t("useCommunityEdition") });
				form.getFormElem().find("[type='submit'].mktoButton").addClass("disabled");
				form.submitable(false);
			} else {
				form.getFormElem().find("[type='submit'].mktoButton").removeClass("disabled");
			}
		}
	};

	// validate username
	qualysMarketo.validateUsername = function (form) {
		var val, pattern, platformUsernameInvalid, pciUsernameInvalid;

		// get all field values
		val = form.getValues();

		if (val.Qualys_Username__c !== undefined) {
			platformUsernameInvalid = false;

			// for all trial forms, the username must match pattern based on format at https://www.qualys.com/platform-identification/
			pattern = new XRegExp("^\\p{L}{1,5}[_235897!-]\\p{L}{2}\\d{0,2}$", "i");
			if (!pattern.test(val.Qualys_Username__c)) {
				platformUsernameInvalid = true;
			}

			pciUsernameInvalid = false;

			// for the PCI Compliance trial form, the username must have an @ symbol
			if (window.location.pathname.indexOf("forms/pci-compliance") !== -1) {
				if (val.Qualys_Username__c.indexOf("@") === -1) {
					pciUsernameInvalid = true;
				}
				if (pciUsernameInvalid && platformUsernameInvalid) {
					errors.push({"[name='Qualys_Username__c']": qualysMarketo.t("invalidValue")});
				}
			} else if (platformUsernameInvalid) {
				errors.push({"[name='Qualys_Username__c']": qualysMarketo.t("invalidValue")});
			}
		}
	};

	// get user's platform based on username
	// as of May 2, 2018, this is only used on the CertView and CloudView forms
	// Marketo sandbox form ID 2133
	// Marketo production form ID 2470
	qualysMarketo.getPlatform = function (formValues) {
		var platforms, identifier;

		platforms = {
			"_": "US Platform 1",
			"2": "US Platform 2",
			"3": "US Platform 3",
			"-": "EU Platform 1",
			"5": "EU Platform 2",
			"!": "EU Platform 2",
			"8": "IN Platform 1",
		};

		// platform is based on the 6th character of the username
		if (formValues["Qualys_Username__c"] !== undefined && formValues["Qualys_Username__c"].length >= 6) {
			identifier = formValues["Qualys_Username__c"].slice(5, 6);
			formValues["Qualys_Username_Platform__c"] = platforms[identifier];
		}

		return formValues;
	};

	// validate length
	qualysMarketo.validateLength = function (form, field, minLength, maxLength) {
		var val, length, fieldId, errObj;
		fieldId = "[name='" + field + "']";

		// get all field values
		val = form.getValues();

		if (val[field] !== undefined) {
			length = val[field].length;

			// phone number must contain between 7 and 15 digits
			if (length < minLength || length > maxLength) {
				errObj = {};
				errObj[fieldId] = qualysMarketo.t("minMaxLength", {"minLength" : minLength, "maxLength" : maxLength});
				errors.push(errObj);
			}
		}
	};

	// validate a hidden field value against a Unicode regex
	// requires XRegExp 3.0.0 library
	// https://github.com/slevithan/xregexpd
	qualysMarketo.validateUnicodeRegexField = function (form, field, regex) {
		var val, unicodeRegex, fieldId, errObj;
		fieldId = "[name='" + field + "']";

		unicodeRegex = new XRegExp(regex);

		// get all field values
		val = form.getValues();

		if (val[field] !== undefined && val[field] !== "") {
			// field value must match regex
			if (unicodeRegex.test(val[field]) === false) {
				errObj = {};
				if (field === "fullNameForForms") {
					errObj[fieldId] = qualysMarketo.t("invalidFullName");
				} else {
					errObj[fieldId] = qualysMarketo.t("invalidValue");
				}

				errors.push(errObj);
			}
		}
	};

	// validate numeric value
	qualysMarketo.validateNumericValue = function (form, field, minValue, maxValue) {
		var val, fieldId, errObj;
		fieldId = "[name='" + field + "']";

		// get all field values
		val = form.getValues();
		// get form id
		var mktoFormId = form.getId();

		if (val[field] !== undefined) {
			if (!$.isNumeric(val[field])) {
				if (mktoFormId === 3079) {
					errors.push({"[name='Number_of_Remote_Endpoints__c']": qualysMarketo.t("invalidValue")});
				} else if (mktoFormId === 3357) {
					errors.push({"[name='Number_of_Assets__c']": qualysMarketo.t("invalidValue")});
				}
			}
			else if (val[field] < minValue || val[field] > maxValue) {
				errObj = {};
				errObj[fieldId] = qualysMarketo.t("minMaxValue", {"minValue" : minValue, "maxValue" : maxValue});
				errors.push(errObj);
			}
		}
	};

	// validate country
	qualysMarketo.validateCountry = function (form) {
		// only validate country if it's a select dropdown field
		if ($("[name='Country']").get(0) !== undefined && $("[name='Country']").get(0).tagName === "SELECT")  {
			var val;

			// get all field values
			val = form.getValues();

			if (val.Country !== undefined && validCountries.length > 0) {
				// country must be a valid country
				if ($.inArray(val.Country, validCountries) === -1 || val.Country.indexOf("---") > -1) {
					errors.push({"[name='Country']": qualysMarketo.t("invalidValue")});
				}
			}
		}
	};

	// validate state
	qualysMarketo.validateState = function (form) {
		function checkValidState() {
			if ($.inArray(val.State, validStates) === -1) {
				errors.push({"[name='State']": qualysMarketo.t("invalidValue")});
			}
		}

		// only validate state if it's a select dropdown field
		if ($("[name='State']").get(0) !== undefined && $("[name='State']").get(0).tagName === "SELECT")  {
			var val, validStates;

			// get all field values
			val = form.getValues();

			if (val.State !== undefined) {
				if (validUsStates === undefined || validCanadianStates === undefined) {
					$("#Country").trigger("change");
				}

				// state must be a valid state in the corresponding country
				if (val.Country === "United States") {
					validStates = validUsStates;
					checkValidState();
				} else if (val.Country === "Canada") {
					validStates = validCanadianStates;
					checkValidState();
				} else {
					// country is not US and Canada so set state to empty string
					$("[name='State']").val("");
				}
			}
		}
	};

	// validate trial packages
	qualysMarketo.validateTrialPackage = function (form) {
		var val;

		// get all field values
		val = form.getValues();

		// if package is "Federal Government" and country is not "United States", show error message
		if (val.formTrialPackageType === "Federal Government" && val.Country !== "United States") {
			errors.push({"[name='formTrialPackageType']": qualysMarketo.t("usOnly")});
		}

		// if user changes the country field, Marketo triggers multiple validations displaying duplicate error messages. this code removes these invalid and duplicate errors.
		$("#Country").on("change", function () {
			$(".mktoRadioList.formTrialPackageType .mktoError").remove();
		});
	};

	// validate company size
	qualysMarketo.validateCompanySize = function (form) {
		var val;

		// get all field values
		val = form.getValues();

		if (val.company_size_range !== undefined) {
			// company size must be a valid company size
			if ($.inArray(val.company_size_range, validCompanySize) === -1) {
				errors.push({"[name='company_size_range']": qualysMarketo.t("invalidValue")});
			}
		}
	};

	// validate name of guests
	// if number of guests > 0, then make textarea field required
	qualysMarketo.validateNameOfGuests = function (form) {
		var val;

		// get all field values
		val = form.getValues();

		if (parseInt(val.numberofGuests) > 0 && val.nameofGuests.trim() === "") {
			errors.push({"[name='nameofGuests']": qualysMarketo.t("invalidValue")});
		}
	};

	qualysMarketo.postFilterFields = function () {
		// decode URL fields
		$("form.mktoForm #kw, form.mktoForm #leadsource, form.mktoForm #link, form.mktoForm #referer, form.mktoForm #lsid").each(function (index, element) {
			var newVal = decodeURIComponent($(element).val());
			$(element).val(newVal);
		});
	};

	// do basic form field validation
	qualysMarketo.basicValidation = function (form) {
		var formId, fieldElem;
		formIsSubmitable = true;
		errors = [];

		formId = form.getId();

		qualysMarketo.validateEmail(form);
		qualysMarketo.validatePhone(form);
		if (formId !== 1226) {
			qualysMarketo.validateLength(form, "FirstName", 0, 50);
			qualysMarketo.validateLength(form, "LastName", 0, 50);
		}
		if (formId === 3500) {
			qualysMarketo.validateNameOfGuests(form);
		}
		qualysMarketo.validateLength(form, "Company", 0, 70);
		qualysMarketo.validateLength(form, "Title", 0, 100);
		qualysMarketo.validateJobTitle(form);
		qualysMarketo.validateNumericValue(form, "LeadSource", 1, 9999999999);
		qualysMarketo.validateNumericValue(form, "Number_of_Remote_Endpoints__c", 1, 250000);
		qualysMarketo.validateNumericValue(form, "Number_of_Assets__c", 1, 250000);
		qualysMarketo.validateCountry(form);
		qualysMarketo.validateState(form);
		qualysMarketo.validateTrialPackage(form);
		qualysMarketo.validateCompanySize(form);
		qualysMarketo.validateUsername(form);
		if (formId === 3014) {
			qualysMarketo.validateUnicodeRegexField(form, "fullNameForForms", "\\pL+\\p{Zs}+\\pL+");
		}
		qualysMarketo.validateUnicodeRegexField(form, "FirstName", "\\pL+");
		qualysMarketo.validateUnicodeRegexField(form, "LastName", "\\pL+");
		qualysMarketo.validateUnicodeRegexField(form, "kw", "^\\PC+$");
		qualysMarketo.validateUnicodeRegexField(form, "referer", "^\\PC+$");
		qualysMarketo.postFilterFields();

		// fix bug with lp pages
		// if custom email error message exists in addition to other error messages,
		// only show custom email error message until user fixes the error
		if (errors.length > 1) {
			if (window.location.pathname.indexOf("/lp/") !== -1) {
				var emailErrorObject;

				// loop over errors array
				$.each(errors, function (index, errObject) {
					$.each(errObject, function (fieldId) {
						// if custom email error exists, save it
						if (fieldId === "[name='Email']") {
							emailErrorObject = errObject;
						}
					});
				});

				// reset errors array
				errors = [];
				// insert only the custom error message into the errors array
				errors.push(emailErrorObject);
			}
		}

		// for 2-panel forms
		// remove panel 2 errors in the errors array if user is still on panel 1
		if ($(".show-first-panel").length === 1) {
			// user is on first panel
			// console.log(errors);
			$.each(errors, function (index, errObject) {
				$.each(errObject, function (fieldId) {
					// console.log(fieldId);
					// console.log($(".panel1 " + fieldId));
					if ($(".panel1 " + fieldId).length === 0) {
						// console.log(index);
						errors.splice(index, 1);
					}
				});
			});
			// console.log(errors);
		}

		if (errors.length > 0) {
			formIsSubmitable = false;
			console.log(errors);
			$.each(errors, function (index, errObject) {
				$.each(errObject, function (fieldId, errMsg) {
					fieldElem = form.getFormElem().find(fieldId);
					if (fieldElem.prop("type") === "hidden") {
						// if element is hidden, show error in console
						/* eslint-disable no-console */
						console.error(errObject);
						/* eslint-enable no-console */
					} else {
						// otherwise, show error to user
						$(fieldElem).addClass("mktoInvalid").removeClass("mktoValid");
						fieldElem = form.getFormElem().find(fieldId);
						/* IMPORTANT
						/* CUSTOM ERROR MESSAGES ARE ONLY DISPLAYED
						   AFTER MARKETO ERROR MESSAGES HAVE BEEN RESOLVED */
						form.showErrorMessage(errMsg, fieldElem);
					}
				});
			});
		}

		// FOR DEBUGGING
		/*$(".mktoButton").on("click", function () {
			console.log(JSON.parse(JSON.stringify(errors)));
		});*/

		// move custom trial package error message to where we want it
		var customTrialPackageError = $(".mktoRadioList.formTrialPackageType label .mktoError").detach();
		$(".mktoRadioList.formTrialPackageType").append(customTrialPackageError);

		form.submitable(formIsSubmitable);
		return formIsSubmitable;
	};

	// get valid countries
	qualysMarketo.getValidCountries = function () {
		var $options;
		validCountries = [];

		$options = $("#Country option");

		validCountries = $.map($options, function (option) {
			return option.value;
		});

		return _.uniq(validCountries);
	};

	// get valid US states
	qualysMarketo.getValidUsStates = function () {
		var $options;
		validUsStates = [];

		$options = $("#State option");

		validUsStates = $.map($options, function (option) {
			return option.value;
		});

		return validUsStates;
	};

	// get valid Canadian states
	qualysMarketo.getValidCanadianStates = function () {
		var $options;
		validCanadianStates = [];

		$options = $("#State option");

		validCanadianStates = $.map($options, function (option) {
			return option.value;
		});

		return validCanadianStates;
	};

	// get valid countries
	qualysMarketo.getValidCompanySize = function () {
		var $options;
		validCompanySize = [];

		$options = $("#company_size_range option");
		validCompanySize = $.map($options, function (option) {
			return option.value;
		});

		return validCompanySize;
	};

	// call various helper functions
	qualysMarketo.setup = function (form) {
		var gotUsStates, gotCanadianStates, countryCol;
		gotUsStates = false;
		gotCanadianStates = false;

		qualysMarketo.getValidCountries(form);
		qualysMarketo.getValidCompanySize(form);

		// get valid states
		if (!gotUsStates || !gotCanadianStates) {
			if ($("[name='State']").get(0) !== undefined && $("[name='State']").get(0).tagName === "SELECT")  {
				// this is a select / dropdown field
				$(document).on("focus", "#State", function () {
					if ($("#State option[value='CA']").length == 1) {
						// CA = California so get US states
						qualysMarketo.getValidUsStates(form);
						gotUsStates = true;
					} else {
						qualysMarketo.getValidCanadianStates(form);
						gotCanadianStates = true;
					}
				});

				$("#Country").on("change", function (event) {
					if ($(event.currentTarget).val() === "United States" && !gotUsStates) {
						qualysMarketo.getValidUsStates(form);
						gotUsStates = true;
					} else if ($(event.currentTarget).val() === "Canada" && !gotCanadianStates) {
						qualysMarketo.getValidCanadianStates(form);
						gotCanadianStates = true;
					}
				});
			}
		}

		// move state field into the Marketo row with the country field on layout2 (wide) forms
		countryCol = $("#Country").parents(".mktoFormCol").get(0);
		$(".layout2 #State").parents(".mktoFormCol").insertAfter(countryCol);
	};

	// function to count # of bytes in a string
	// http://stackoverflow.com/questions/2848462/count-bytes-in-textarea-using-javascript/12206089#12206089
	qualysMarketo.getUTF8Length = function(s) {
		var len, code, i;
		len = 0;

		if (s !== undefined) {
			for (i = 0; i < s.length; i += 1) {
				code = s.charCodeAt(i);
				if (code <= 0x7f) {
					len += 1;
				} else if (code <= 0x7ff) {
					len += 2;
				} else if (code >= 0xd800 && code <= 0xdfff) {
					// Surrogate pair: These take 4 bytes in UTF-8 and 2 chars in UCS-2
					// (Assume next char is the other [valid] half and just skip it)
					len += 4;
					i += 1;
				} else if (code < 0xffff) {
					len += 3;
				} else {
					len += 4;
				}
			}
		}

		return len;
	};


	/*
	 * set field value based on URL
	 * mainly used to set asset id NetSuite and SalesForce
	 * also used to set Company Size Range
	 * can be used to set any field by update the fieldValuesByPath
	 */
	qualysMarketo.updateFormValueMapping = function (formValues, mappingKey) {

		var values, key;

		if (mappingKey !== null) {

			values = formValueMapping[mappingKey];

			if (!values) {

				//console.log("No asset ID defined for this URL.");

			} else {

				// loop over values and set matching keys in form values
				for (key in values) {
					if (values.hasOwnProperty(key)) {
						if (values[key] && formValues.hasOwnProperty(key)) {
							formValues[key] = values[key];
						}
					}
				}

			}

		}

		return formValues;

	};

	/*
	 * account for special case on the trial form
	 * like Do you have a Qualys account?
	 * like Select a Qualys Trial package:
	 * Are you a Security Consultant?
	 */
	qualysMarketo.handleTrialForm = function (formValues) {

		var hasQualysAccount;

		hasQualysAccount = $("input[name=\"qualysAccount\"]:checked").val();

		// if the visitor has a qualys account
		if (hasQualysAccount && hasQualysAccount.match(/Yes/i)) {

			// then set the form values as if they had chosen Express
			formValues = qualysMarketo.updateFormValueMapping(
				formValues,
				"Express"
			);

		} else {
			// otherwise...
			// if a package has been chosen
			if (formValues.formTrialPackageType) {
				// then update the form values by package type
				formValues = qualysMarketo.updateFormValueMapping(
					formValues,
					formValues.formTrialPackageType
				);
			}
		}

		return formValues;

	};

	// set user's country and state based on ip address
	// this code reasonably assumes that geoip gets loaded from GTM which runs before marketo.js
	qualysMarketo.setLocation = function (form) {
		var country, state, postalCode, city, companyFromIp;
		state = "";
		postalCode = "";
		city = "";
		companyFromIp = "";

		setLocationCalled = true; // to prevent infinite call loop

		function submitForm(form) {
			form.submitable(true);
			form.submit();
		}

		function updateLocation() {
			form.getFormElem().find("[name=City]").val(city);
			form.getFormElem().find("[name=formIPCity]").val(city);
			form.getFormElem().find("[name=State]").val(state);
			form.getFormElem().find("[name=formIPState]").val(state);
			form.getFormElem().find("[name=PostalCode]").val(postalCode);
			form.getFormElem().find("[name=formIPPostalCode]").val(postalCode);
			form.getFormElem().find("[name=Country]").val(country);
			form.getFormElem().find("[name=formIPCountry]").val(country);
			form.getFormElem().find("[name=companyfromIP]").val(companyFromIp);
			form.getFormElem().find("[name=formIPCompanyname]").val(companyFromIp);
			$(document).trigger("location-data-loaded");
		}

		// if geoip2 call is successful
		function onSuccess (data) {
			if (data && data.traits && data.traits.ip_address) {
				// save location data in local storage
				var key = "maxmind.geoip2.data." + data.traits.ip_address;
				localStorage.setItem(key, JSON.stringify(data));

				// get state
				state = data.subdivisions[0].iso_code;
				city = data.city.names.en;
				postalCode = data.postal.code;
				companyFromIp = data.traits.organization;
				updateLocation();
				submitForm(form);
			}
		}

		// if geoip2 call return error
		function onError (error) {
			// show error in console
			/* eslint-disable no-console */
			console.log(error.code + ": " + error.error);
			submitForm(form);
			/* eslint-enable no-console */
		}

		// only run this code on forms that contain hidden Country field
		if ($("[type=hidden][name=Country]").length > 0) {
			// get ip address from session storage
			var ip = sessionStorage.getItem("ipify.ip", ip);

			// if ip address exists in session storage
			if (ip) {
				// get location data from local storage
				var key = "maxmind.geoip2.data." + ip;
				var data = localStorage.getItem(key);

				if (data) {
					data = JSON.parse(data);
					// get country
					country = data.country.names.en;
					updateLocation();

					// if country is US or Canada
					if (country === "United States" || country === "Canada") {
						// if subdivision (state) data exists
						if (data.subdivisions) {
							// get state
							state = data.subdivisions[0].iso_code;
							city = data.city.names.en;
							postalCode = data.postal.code;
							companyFromIp = data.traits.organization;
							updateLocation();
						} else {
							// otherwise, call GeoIP city API to get state data
							if (window.geoip2) {
								// prevent form submission
								form.submitable(false);
								window.geoip2.city(onSuccess, onError);
							}
						}
					} else {
						// all other countries
						updateLocation();
					}
				}
			}
		}
	};

	// change field values based on Qualys policies
	qualysMarketo.alterFormValues = function (form) {
		var formId, formValues, isProductionFormId;

		formId = form.getId();
		formValues = form.getValues();

		// update form values based on pathname
		formValues = window.qualys.marketo.updateFormValueMapping(formValues, window.location.pathname);

		// if marketing asset ID is specified in form tag, use it
		// this is used on Brightedge pages, e.g. /content/* or /offers/*
		var assetId = form.getFormElem().attr("data-asset-id");

		if (assetId) {
			formValues["Marketing_Asset_Id_Current__c"] = assetId;
		}

		// get all data-input-* form attributes and update corresponding hidden form fields
		$("[id^=mktoForm]").each(function(index, element) {
			$.each(element.attributes,function(index,attribute) {
				if (attribute.name.indexOf("data-input") >= 0) {

					var fieldName = attribute.name.replace("data-input-", "");

					for (var key in formValues) {
						if (key.toLowerCase() === fieldName.toLowerCase()) {
							formValues[key] = attribute.value;
						}
					}
				}
			});
		});

		// Limit the number of characters in the Phone field to 15
		$("[id=Phone]").attr("maxlength", "15");

		// hide all hidden form fields so they don't occupy any screen space
		$("[type=hidden]").each(function(index, element) {
			$(element).parent(".mktoFormRow").addClass("hidden");
		});

		// handle trial style forms
		// 1798 = generic free trial
		// 1815 = generic free trial (french)
		// 1816 = generic free trial (german)
		// 2486 = federal / gov
		// 2632 = container security, azure stack
		// 2399 = free trial form for Brightedge page under /offer/
		// TODO: simplify this list of OR conditions
		isProductionFormId = (formId === 1798 || formId === 1815 || formId === 1816 || formId === 2486 || formId === 2632 || formId === 2399 || formId === 3193);

		if (isProductionFormId) {
			// update trial form values
			formValues = window.qualys.marketo.handleTrialForm(formValues);
		}

		// handle forms that set asset ID based on company size range
		var assetIdFromCompanySize = form.getFormElem().attr("data-input-assetIdFromCompanySize");

		if (assetIdFromCompanySize) {
			// update form values
			var companySizeRange = form.getFormElem().find("[name=Company_Size_Range__c_account]").val();
			formValues = window.qualys.marketo.updateFormValueMapping(formValues, companySizeRange);
		}

		// update form with user's platform
		formValues = window.qualys.marketo.getPlatform(formValues);

		form.setValues(formValues);
		$(document).trigger("alterFormValuesComplete");
	};

	// display warning to encourage users to enter company email address
	qualysMarketo.showCompanyEmailWarning = function (mktoFormId) {
		// function to check and show the email domain warning
		function checkEmailDomain() {
			$("div.mktoError.warning.email").remove();

			var emailAddress, emailDomainPart;
			emailAddress = $("#Email").val();
			emailDomainPart = emailAddress.split("@")[1];
			if ($.inArray(emailDomainPart, blacklistedEmailDomains) !== -1) {
				$("#Email").after(warningFieldMsg);
			}
		}

		var checkEmailField = false;

		// check email domain on all non-whitepaper forms
		if ($.inArray(mktoFormId,["1806","1807","1808","1874","1643","1625","1611","1803"]) === -1) {
			checkEmailField = true;

			// however, if form is in /lp/ folder, don't check email domain
			if (window.location.pathname.indexOf("/lp/") !== -1) {
				checkEmailField = false;
			}

			// also, if form is a FreeScan form and the country is not US or UK or "", don't check email domain
			if (window.location.pathname.indexOf("/forms/freescan/") !== -1) {
				var country = $("#Country").val();

				if (country !== "" && country !== "United States" && country !== "United Kingdom (GB)") {
					checkEmailField = false;
				}
			}
		}

		if (checkEmailField) {
			var deCheckEmailDomain, warningFieldMsg;

			// save HTML of warning message
			warningFieldMsg = "\
			<div class=\"mktoError warning email\">\
			<div class=\"mktoErrorArrowWrap\">\
			<div class=\"mktoErrorArrow\"></div>\
			</div>\
			<div class=\"mktoErrorMsg\">Company email preferred. <a class=\"close-button\">Dismiss</a></div>\
			</div>";

			// remove the email domain warning when user clicks X
			$(document).on("click", "div.mktoError.email .close-button", function () {
				$("div.mktoError.warning.email").remove();
			});

			// debounce the checking and showing of the email domain warning messages
			deCheckEmailDomain = _.debounce(checkEmailDomain, 250);

			// check and show the email domain warning on blur
			$("#Email").on("blur", function () {
				checkEmailDomain();
			});

			// on each key stroke, check and conditionally show the email domain warning message
			$("#Email").on("keypress", deCheckEmailDomain);

			$("#Country").on("change", function () {
				$("div.mktoError.warning.email").remove();
				window.qualys.marketo.showCompanyEmailWarning();
			});
		}
	};

	// cleanup HTML and CSS from Marketo
	qualysMarketo.cleanMarketoHTMLAndCSS = function () {

		// remove Marketo CSS
		$("link[rel=\"stylesheet\"]").each(function (index, item) {

			if ($(item).attr("href").match(/(lps\.qualys|\.marketo)\.com\/.*\.css$/)) {

				$(item).remove();

			}

		});

		// remove style tag inside Marketo forms
		$(".mktoForm style").remove();

		// remove inline style from Marketo elements
		$(".mktoForm, .mktoForm *").each(function (index, item) {

			$(item).attr("style", null);

		});

		// add unique class to each form row container
		$(".mktoField").each(function (index, item) {
			var name = $(item).attr("name");
			$(item).parents(".mktoFormRow").addClass(name);
		});

		// put checkboxes and radio buttons inside their labels
		$(".mktoCheckboxList input, .mktoRadioList input").each(function (index, item) {

			var label, name;

			label = $(item).parents().find("label[for=\"" + item.id + "\"]").get(0);

			name = $(item).attr("name");
			$(item).parent(".mktoRadioList").addClass(name);
			$(item).parent(".mktoCheckboxList").addClass(name);

			if (label) {
				$(label).prepend(item);
				$(label).attr("for", null);
			}

		});

		// remove all Marketo asterix
		$(".mktoAsterix").remove();

		// add class to empty Marketo lables
		$(".mktoLabel:empty").addClass("qmktoLabelEmpty");

		// add class to labels for checkbox lists and radio button lists
		$(".mktoCheckboxList").siblings(".mktoLabel").addClass("qmktoCheckboxListLabel");
		$(".mktoRadioList").siblings(".mktoLabel").addClass("qmktoRadioListLabel");

		$(document).trigger("cleanMarketoHTMLAndCSSComplete");
	};


	// embed Marketo form in HTML page
	qualysMarketo.embedForm = function () {
		var $form, formId, mktoFormId, baseUrl, munchkinId;

		// if data-load-form-in-page attribute is not found, load Marketo form below
		// otherwise, form is being loaded in page (in the HTML)
		// the following conditional block is needed to support Marketo forms in BridgeEdge pages
		// qualys.com/offer, qualys.com/content
		// which don't use the form.hbs partial
		if ($("[data-load-form-in-page]").length === 0) {
			$form = $("form[id^='mktoForm']");

			if ($form.length > 0) {
				formId = $form.get()[0].id;
				mktoFormId = parseInt(formId.replace("mktoForm_", ""), 10);
				if (isNaN(mktoFormId)) {
					throw new Error("Marketo form ID not found!");
				}
				mktoFormId = mktoFormId.toString();
			} else {
				throw new Error("Marketo form not found!");
			}

			baseUrl = $form.attr("data-baseurl");
			munchkinId = $form.attr("data-munchkinid");

			if (!baseUrl) {
				baseUrl = "//lps.qualys.com";
			}

			if (!munchkinId) {
				munchkinId = "797-ENI-742";
			}

			MktoForms2.loadForm(baseUrl, munchkinId, mktoFormId);
		}

		MktoForms2.whenReady(function (form) {
			// remove CSS injected by Marketo Sandbox
			setTimeout(function(){
				$('link[rel=stylesheet][id~="mktoForms2BaseStyle"]').remove();
				$('link[rel=stylesheet][id~="mktoForms2ThemeStyle"]').remove();
			}, 0);

			window.qualys.marketo.alterFormValues(form);
			qualysMarketo.warnBeforeLeaving(form);
			qualysMarketo.loadZoomInfo(form);

			form.onValidate(function (builtInMarketoValidation) {
				window.qualys.marketo.alterFormValues(form);

				var customValidation = window.qualys.marketo.basicValidation(form);
				console.log("builtInMarketoValidation = " + builtInMarketoValidation);
				console.log("customValidation = " + customValidation);
			});

			/*
			 * when the form is submitted, change the asset ID
			 */
			form.onSubmit(function (form) {
				window.qualys.marketo.alterFormValues(form);

				var mktoFormId = form.getId();

				// for forms that don't have visible country and state fields
				if ((mktoFormId === 2760 || mktoFormId === 1801) && !setLocationCalled) {
					// set hidden country and state fields
					// form submission will resume after fields have been updated
					window.qualys.marketo.setLocation(form);
				}

				// remove button label
				setTimeout(function () {
					form.getFormElem().find("[type=submit][disabled]").each(function (index, button) {
						button.innerText = "";
					});
				}, 0);


				// DEBUG: Uncomment the following lines to view form data and block form submission
				/*
				form.submitable(false);
				console.log(JSON.parse(JSON.stringify(form.getValues())));
				$(document).on("location-data-loaded", function () {
					console.log(JSON.parse(JSON.stringify(form.getValues())));
				});
				*/
			});

			form.onSuccess(function () {
				// inform visitors of success (and Pingdom monitoring)
				form.getFormElem().find("[type=submit]").each(function (index, button) {
					$(button).addClass("success");
					button.innerText = "Success";
				});

				var mktoFormId = form.getId();

				if (mktoFormId === 2878) { // for QSC registration form, redirect to confirm page based on user-selected location
					var location = form.getFormElem().find("[name=Event_Location] option:selected").val();
					window.location = window.location.pathname + location.replace(" ", "-") + "/confirm/";
				} else { // for all other forms
					if (mktoFormId === 2760 && self !== top) {
						// For ITAM form in iframe, redirect to parent confirm page
						window.top.location = window.top.location.pathname + "confirm";
					} else {
						// get form's confirmation URL from data-confirm attribute
						var confirmUrl = form.getFormElem().attr("data-confirm");

						// wait a moment before redirecting to allow GTM tags to fire
						setTimeout(function () {
							if (confirmUrl !== undefined && confirmUrl !== "") {
								window.location = confirmUrl;
							} else {
								var search = window.location.search;

								// Take the lead to a different page on successful submit, ignoring the form's configured followUpUrl.
								window.location = window.location.pathname + "confirm/" + search;
							}

						}, 200);
					}
				}

				// return false to prevent the submission handler continuing with its own processing
				return false;
			});
		});

		MktoForms2.whenRendered(function (form) {
			var mktoFormId = form.getId();
			if (zoomInfoMatchResult !== undefined) {
				qualysMarketo.mapZoomInfoFields(form);
			}

			if ($("#Title").length > 0) {
				if (window.qualys.loadJobTitles) {
					window.qualys.loadJobTitles(window.qualys.getLanguage());
				} else {
					throw new Error("job-title-auto-complete.js is probably missing");
				}
			}
			window.qualys.marketo.setup(form);
			window.qualys.marketo.cleanMarketoHTMLAndCSS();
			window.qualys.marketo.filterFields();

			// function to add class "invalid" or "valid" if form field is invalid or valid
			function addValidInvalidClassToFormRows() {
				setTimeout(function(){
					$(".mktoFormRow").removeClass("invalid valid");
					$(".mktoFormRow").each(function (index, element) {
						if ($(element).find(".mktoError").length !== 0 && $(element).find(".mktoError").css("display") !== "none") {
							$(element).addClass("invalid");
						} else if ($(element).find(".mktoValid").length !== 0) {
							$(element).addClass("valid");
						}
					});
				}, 100);
			}

			// call function when any form input blurs or is clicked on
			form.getFormElem().find(":input, select").on("blur, click", addValidInvalidClassToFormRows);

			// call function when user hits tab key
			$(document).on('keyup', function( e ) {
				if( e.which == 9 ) {
					addValidInvalidClassToFormRows();
				}
			} );

			// if trial checkbox exists, move it to above submit button
			$("[for=\"requestedaTrial\"]").parents(".mktoFormRow").detach().insertBefore("div.mktoButtonRow");

			// window.qualys.marketo.showCompanyEmailWarning(mktoFormId);

			// if communication consent checkbox exists, move it to above submit button on non 2-panel forms
			if ($("form .panel2").length === 0) {
				$("[for=\"communicationConsent\"]").parents(".mktoFormRow").detach().insertBefore("div.mktoButtonRow");
			}

			// if user checks the communication consent checkbox, set the communicationConsentDateTime hidden field
			$(document).on("change", "[name=communicationConsent]", function () {
				if ($("[name=communicationConsent]:checked").length > 0) {
					var timestamp = (new Date()).toISOString();
					form.getFormElem().find("[name=communicationConsentDateTime]").val(timestamp);
				} else {
					form.getFormElem().find("[name=communicationConsentDateTime]").val("null");
				}
			});

			if ($.inArray(mktoFormId,[2275,2403,2747,2612,2878]) !== -1) { // for QSC registration form
				window.qualys.marketo.preselectLocation(MktoForms2);
				window.qualys.marketo.addQscLocationField(MktoForms2);
			}

			// gray out certain locations and move them to bottom of options list
			if(mktoFormId !== 2612) {
				/*$("option[value=\"dubai\"]").attr("disabled", "disabled").detach().appendTo("#Event_Location");
				$("option[value=\"mumbai\"]").attr("disabled", "disabled").detach().appendTo("#Event_Location");*/
				$("option[value=\"san-francisco\"]").attr("disabled", "disabled").detach().appendTo("#Event_Location");
				$("option[value=\"paris\"]").attr("disabled", "disabled").detach().appendTo("#Event_Location");
				$("option[value=\"munich\"]").attr("disabled", "disabled").detach().appendTo("#Event_Location");
				$("option[value=\"berlin\"]").attr("disabled", "disabled").detach().appendTo("#Event_Location");
				$("option[value=\"london\"]").attr("disabled", "disabled").detach().appendTo("#Event_Location");
				$("option[value=\"vegas\"]").attr("disabled", "disabled").detach().appendTo("#Event_Location");
			}

			// handle radiobuttons by adding a checked class to the parent label
			$("input[type=\"radio\"]").on("change", function (event) {

				var name = $(event.currentTarget).attr("name");
				$(".mktoRadioList." + name + " label.checked").removeClass("checked");
				$(event.currentTarget).parent("label").addClass("checked");

			});

			// wrap fields in divs to style form in 2 columns
			if (window.location.pathname === "/apps/vulnerability-management-detection-response/mobile-devices/") {
				$(document).on("alterFormValuesComplete", function () {
					if ($(".fieldsWrapper").length === 0) {
						$(".mktoFormRow.qualysAccount, \
							.mktoFormRow.Number_of_Mobile_Devices__c").wrapAll('<div class="fieldsWrapperTop" />');
						$(".mktoFormRow.FirstName, \
							.mktoFormRow.LastName, \
							.mktoFormRow.Email, \
							.mktoFormRow.Company").wrapAll('<div class="fieldsWrapperLeft" />');
						$(".mktoFormRow.Title, \
							.mktoFormRow.Phone, \
							.mktoFormRow.Country, \
							.mktoFormRow.Company_Size_Range__c_account").wrapAll('<div class="fieldsWrapperRight" />');
						$(".fieldsWrapperLeft, \
							.fieldsWrapperRight").wrapAll('<div class="fieldsWrapper" />');

						// on mobile (viewport < 720), initially hide some fields
						if (window.innerWidth < 720) {
							$(".fieldsWrapper").addClass("hidden");
						}
					}
				});

				$("[name='qualysAccount']").on("click", function () {

					var haveAccount = $(this).val();

					// add a class to adjust alignment of username and # mobiles fields

					if (haveAccount === "yes") {
						$(".mktoForm").addClass("hasAccount");
					}
					else {
						$(".mktoForm").removeClass("hasAccount");
					}

					// on mobile (viewport < 720), show and hide some fields

					if (window.innerWidth < 720) {
						// var haveAccount = $(this).val();
						if (haveAccount === "no") {
							$(".fieldsWrapper").removeClass("hidden");
						}
					}
				});
			}

			// handle checkboxes by adding a checked class to the parent label
			$("input[type=\"checkbox\"]:not(.q-bound)").on("change", function (event) {

				var id = $(event.currentTarget).attr("id");
				var $element = $("#" + id).parents("label");

				if ($element.hasClass("checked")) {
					$element.removeClass("checked");
				} else {
					$element.addClass("checked");
				}

			}).addClass("q-bound");

			// add Quantcast order id
			window.qualys.marketo.addQuantcastOrderId(form);

			// add GTM-loaded value to form
			window.qualys.marketo.addGtmLoadedValue(form);

			// add black listed country value to form
			window.qualys.marketo.addBlackListedValue(form);

			// add DNT cookie value to form
			window.qualys.marketo.addDntCookieValue(form);

			// auto fill-up form for leadsource with x
			window.qualys.marketo.autoFillupForm(form);

			// initialize overlays in Marketo forms
			//window.qualys.overlay.setup();

			// re-enable submit button if job title is not student,
			// this is for if submit button was disabled due to job title = student and asset ID = 308 (consultant edition)

			var values = form.getValues();
			var $submitButton = form.getFormElem().find("[type='submit'].mktoButton");

			form.getFormElem().find("#Title").on("blur", function () {
				var jobTitle;

				jobTitle = values["Title"];

				if (jobTitle.toLowerCase() !== "student" ) {
					$submitButton.removeClass("disabled");
				}
			});
			form.getFormElem().find(".mktoRadioList.formTrialPackageType").on("change", function () {
				window.qualys.marketo.alterFormValues(form);
				var Marketing_Asset_Id_Current__c;

				Marketing_Asset_Id_Current__c = values["Marketing_Asset_Id_Current__c"];

				if (Marketing_Asset_Id_Current__c !== "308") {
					$submitButton.removeClass("disabled");
				}
			});
		});
	};


	/*
	 * pre-fill Marketo form fields
	 * http://developers.marketo.com/blog/external-page-prefill/
	 */
	qualysMarketo.prefillMarketoForm = function () {

		// only call the proxy if the Marketo tracking cookie is present
		if (document.cookie.match(/_mkto_trk=/)) {
			// call proxy PHP script and get lead data to pre-fill Marketo form
			let prefix = "";
			let hostnames = ["lps.qualys.com", "www.ssllabs.com", "dev.ssllabs.com"];

			if (hostnames.indexOf(window.location.hostname) !== -1) {
				prefix = "https://www.qualys.com";
			}

			let url = prefix + "/marketo/get-lead-by-cookie.php";

			$.ajax({
				url: url,
				dataType: "json",
				success: function (data) {

					var lead;

					// check if Marketo says the request was successful
					if (data.success) {

						// check if there is a result
						if (data.result.length > 0 && data.result[0]) {

							lead = data.result[0];
							MktoForms2.whenReady(function (form) {

								var formId = form.getId();

								// only prefill forms other than event registration forms
								if ($.inArray(formId,[2747]) === -1) {

									var values;

									// map the results from the REST call to the corresponding field name on the form
									// because some field names need have their first letter uppercased to match the Marketo form field names
									values = Object.keys(lead).reduce(function (acc, v) {

										var key;

										if (!v.match(/^(communicationConsentDateTime|communicationConsent|id|cookies|utm|[A-Z])/)) {

											// uppercase the first letter of some keys to match Marketo form field names
											key = v.charAt(0).toUpperCase() + v.slice(1);

										} else {

											key = v;

										}
										acc[key] = lead[v];

										return acc;

									}, {});

									// pass the new values into the form.vals method to fill the fields
									// Note, this method is recommend by Marketo
									// Note, it may override values the visitor has already typed in
									form.vals(values);
									$("form.mktoForm").trigger("fieldsFilled");


									// after prefill, if the communicationConsent checkbox is checked based on Marketo pre-fill, hide the checkbox field
									if ($("[name=communicationConsent]:checked").length > 0) {
										form.getFormElem().find(".mktoFormRow.communicationConsent").addClass("hidden");
									}
								}
							});

						}

					} else {
						data.errors.forEach(function (error) {
							throw new Error(error.message);
						});
					}

				},
				error: function (jqXHR, textStatus, errorThrown) {
					throw new Error(`${errorThrown}: ${url}`);
				}
			});
		}
	};
}(window.qualys.marketo, jQuery, XRegExp, MktoForms2, _));

jQuery(document).ready(window.qualys.marketo.embedForm);

// call this ASAP so the AJAX request gets fired off
// will wait for Marketo Form Ready event
// temporily disabled form prefill for 2 weeks
// https://jira.intranet.qualys.com/browse/WEB-6796
/*if (window.location.hostname !== "lps.qualys.com") {
	window.qualys.marketo.prefillMarketoForm();
}*/
