/* global jQuery MktoForms2 */
/* eslint-disable */
webpackJsonp([5,18,19],{

/***/ 										23:
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		var _hero = __webpack_require__(2);

		var _hero2 = _interopRequireDefault(_hero);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		(0, _hero2.default)();

		/***/ }),

	/***/ 										40:
	/***/ (function(module, exports) {

		// removed by extract-text-webpack-plugin

		/***/ }),

	/***/ 										77:
	/***/ (function(module, exports, __webpack_require__) {

		__webpack_require__(23);
		module.exports = __webpack_require__(40);


		/***/ })

},[77]);
/* eslint-enable */

/*
 * Enable fancybox overlay popup
 */
(function ($) {
	"use strict";

	$("[data-fancybox]").fancybox({
		toolbar  : false,
		smallBtn : true,
		iframe : {
			preload : false
		}
	});

}(jQuery));


/*
 * Get hash tag and check product checkbox
 */
(function ($, MktoForms2) {

	"use strict";

	var solutions = {
		"ai": "Asset Inventory",
		"syn": "CMDB Sync",
		"vm": "Vulnerability Management",
		"tp": "Threat Protection",
		"cm": "Continuous Monitoring",
		"ioc": "Indication of Compromise",
		"cs": "Container Security",
		"ci": "Cloud Inventory",
		"csa": "Cloud Security Assessment",
		"was": "Web Application Scanning",
		"waf": "Web Application Firewall",
		"pc": "Policy Compliance",
		"pci": "PCI Compliance",
		"sca": "Security Configuration Assessment",
		"saq": "Security Assessment Questionnaire",
		"fim": "File Integrity Monitoring",
		"cri": "Certificate Inventory",
		"cra": "Certificate Assessment"
	};

	var packages = {
		"smb": "Express Lite",
		"sme": "Express",
		"enterprise": "Enterprise",
		"consultant": "Consultant",
		"government": "Federal Government"
	};

	function handleHashChange () {

		if (window.location.hash) {

			// loop over multiple hash entries
			window.location.hash.split("/").forEach(function (hash) {

				var pkg, solution;

				// update solutions interested
				solution = solutions[hash];
				if (solution) {

					$("[value=\"" + solution + "\"]").prop("checked", true);
					$("[value=\"" + solution + "\"]").trigger("change");
					$("input[name=solutionsInterestedOther]").val(solution);

				}

				// update trial package
				pkg = packages[hash];
				if (pkg) {

					$("[value=\"" + pkg + "\"]").prop("checked", true);
					$("[value=\"" + pkg + "\"]").trigger("change");

				}

			});

		}
	}

	$(window).on("hashchange", handleHashChange);
	$(document).ready(handleHashChange);
	$(document).on("click", ".mktoButtonNext", handleHashChange);
	MktoForms2.whenRendered(handleHashChange);

}(jQuery, MktoForms2));


/*
 * two-panel Marketo form based on the Qualys account question
 */
(function ($, MktoForms2) {

	"use strict";

	MktoForms2.whenRendered(function (form) {

		var $accountInput, $row, accountVal, $accountRadioList, $form, $panel1, $panel2, $theRest;
		
		$accountInput = $("input[name=qualysAccount]");
		if ($accountInput.length > 0) {

			$form = form.getFormElem();
			

			// always unwrap to remove panel1 and panel2 divs so we can re do it
			$(".q-mktoFormSet > *").unwrap();

			// split form elements into two sets to create two panels
			// split on the qualysAccount field
			if ($form.find(".mktoButtonNext").length > 0) {
				$row = $form.find(".mktoButtonNext").closest(".mktoButtonRow");
			} else {
				$row = $form.find("input[name=qualysAccount]").closest(".mktoFormRow");
			}
			$panel1 = $row.prevAll().addBack();
			$panel2 = $row.nextAll();
			$panel1.wrapAll("<div class='q-mktoFormSet panel1'/>");
			$panel2.wrapAll("<div class='q-mktoFormSet panel2'/>");

			// fix for "Interested in detection of impacted file" checkbox
			$("input[name=Interested_in_detection_of_impacted_file__c]").addClass("mktoValid");

			// show first panel
			$form.addClass("show-first-panel");

			// get radio list
			$accountRadioList = $accountInput.closest(".mktoRadioList");

			// replace qualysAccount field with clone to remove all event listeners
			$accountRadioList.replaceWith($accountRadioList.get(0).cloneNode(true));

			// hide the qualys account field and all the field before it
			// if it, and all the field before it, are valid
			accountVal = $("input[name=qualysAccount]:checked").val();

			if (accountVal) {

				// the qualys account field is valid, now check the rest
				$theRest = $("input[name=qualysAccount]")
					.closest(".mktoFormRow").prevAll()
					.find("input[type!=hidden]:not(.mktoValid)");

				if ($theRest.length === 0) {
					$form.removeClass("show-first-panel");
					$form.addClass("show-next-panel");
				}

			}

		}

	});

	MktoForms2.whenReady(function (form) {

		var $form, $accountInput, $accountRow, $submitButton;

		// save for later
		$form = form.getFormElem();

		// check for the qualys account input
		$accountInput = $form.find("input[name=qualysAccount]");
		if ($accountInput.length > 0) {

			var documentLang = $("html").attr("lang");
			var nextBtnText = "Next";
			var backBtnText = "Back";
			if( "fr" === documentLang) {
				nextBtnText = "Suivant";
				backBtnText = "Précédent";
			}
			else if( "de" === documentLang ){
				nextBtnText = "Weiter";
				backBtnText = "Zurück";
			}
			// inject next button after the qualys account input
			$accountRow = $accountInput.closest(".mktoFormRow");
			$accountRow.after("<div class=\"mktoButtonRow\"><span class=\"mktoButtonWrap mktoInset\"><button type=\"button\" class=\"mktoButton mktoButtonNext\">"+ nextBtnText +"</button></span></div>");
			$(".mktoButtonNext").on("click", function () {

				var accountVal, $theRest;

				// validate visible fields
				form.validate();

				// fix for "Interested in detection of impacted file" checkbox
				$("input[name=Interested_in_detection_of_impacted_file__c]").addClass("mktoValid");

				// check account value
				accountVal = $("input[name=qualysAccount]:checked").val();
				if (accountVal) {

					// check Marketo form value
					if (form.getValues()["qualysAccount"] === accountVal) {

						// hide the qualys account field and all the field before it
						// if it, and all the field before it, are valid
						if (accountVal) {

							// the qualys account field is valid, now check the rest
							$theRest = $("input[name=qualysAccount]")
								.closest(".mktoFormRow").prevAll().find("input[type!=hidden]:not(.mktoValid)");
							if ($theRest.length === 0) {

								$form.removeClass("show-first-panel");
								$form.addClass("show-next-panel");

							}

						}

					} else {

						// set the value via the API which causes the form to render
						form.setValues({ "qualysAccount": accountVal });

					}

				} else {
					// show error message for Qualys Account field
					var $accountInputWrapper = $accountInput.parents(".mktoFieldWrap");
					form.showErrorMessage("This field is required.", $accountInputWrapper);
				}

			});

			// inject back button next to the submit button
			$submitButton = $form.find("button[type=submit]");
			$submitButton.before("<button type=\"button\" class=\"mktoButton mktoButtonBack\">"+ backBtnText +"</button>");
			$(".mktoButtonBack").on("click", function () {

				$form.addClass("show-first-panel");
				$form.removeClass("show-next-panel");

			});

		}

		form.onSubmit(function (form) {

			var $form, $theRest;

			$form = form.getFormElem();

			// show panel1 if there are any invalid fields there
			$theRest = $("input[name=qualysAccount]").closest(".mktoFormRow")
				.prevAll().find("input[type!=hidden]:not(.mktoValid)");

			if ($theRest.length > 0) {

				$form.addClass("show-first-panel");
				$form.removeClass("show-next-panel");

			}

		});

	});

}(jQuery, MktoForms2));