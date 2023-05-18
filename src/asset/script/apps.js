/* global jQuery */

/* eslint-disable */
webpackJsonp([15,18,19],{

/***/ 										29:
	/***/ (function(module, exports) {

		// removed by extract-text-webpack-plugin

		/***/ }),

	/***/ 										63:
	/***/ (function(module, exports, __webpack_require__) {

		__webpack_require__(9);
		module.exports = __webpack_require__(29);


		/***/ }),

	/***/ 										9:
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";


		var _contentHero = __webpack_require__(3);

		var _contentHero2 = _interopRequireDefault(_contentHero);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		(0, _contentHero2.default)();

		/***/ })

},[63]);
/* eslint-enable */

/*
 * add hash of app abbreviation to trial and beta links based on current page
 */
(function ($) {
	"use strict";

	$(document).ready(function () {
		var href = "";
		var path = window.location.pathname;
		var $trial = $("[href^=\"/free-trial\"]");
		var $beta = $("[href^=\"/beta-signup\"]");

		switch(path) {
		case "/apps/global-assetview/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/ai");
			break;
		case "/apps/cmdb-sync/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/syn");
			break;
		case "/apps/vulnerability-management/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/vm");
			break;
		case "/apps/threat-protection/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/tp");
			break;
		case "/apps/continuous-monitoring/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/cm");
			break;
		case "/apps/indication-of-compromise/":
			href = $beta.attr("href");
			$beta.attr("href", href + "#/ioc");
			break;
		case "/apps/container-security/":
			href = $beta.attr("href");
			$beta.attr("href", href + "#/cs");
			break;
		case "/apps/web-app-scanning/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/was");
			break;
		case "/apps/web-app-firewall/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/waf");
			break;
		case "/apps/policy-compliance/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/pc");
			break;
		case "/apps/pci-asv-compliance/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/pci");
			break;
		case "/apps/file-integrity-monitoring/":
			href = $beta.attr("href");
			$beta.attr("href", href + "#/fim");
			break;
		case "/apps/security-configuration-assessment/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/sca");
			break;
		case "/apps/cloud-security-assessment/":
			href = $beta.attr("href");
			$beta.attr("href", href + "#/csa");
			break;
		case "/apps/security-assessment-questionnaire/":
			href = $trial.attr("href");
			$trial.attr("href", href + "#/saq");
			break;
		}
	});
}(jQuery));
