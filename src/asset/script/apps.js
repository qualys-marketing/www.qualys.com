"use strict";/* global jQuery */ /* eslint-disable */ /* eslint-enable */ /*
 * add hash of app abbreviation to trial and beta links based on current page
 */webpackJsonp([15,18,19],{/***/29:/***/function _(){// removed by extract-text-webpack-plugin
/***/},/***/63:/***/function _(a,b,c){c(9),a.exports=c(29)},/***/9:/***/function _(a,b,c){"use strict";var d=c(3),e=function(a){return a&&a.__esModule?a:{default:a}}(d);(0,e["default"])()}},[63]),function(a){"use strict";a(document).ready(function(){var b="",c=window.location.pathname,d=a("[href^=\"/free-trial\"]"),e=a("[href^=\"/beta-signup\"]");"/apps/global-assetview/"===c?(b=d.attr("href"),d.attr("href",b+"#/ai")):"/apps/cmdb-sync/"===c?(b=d.attr("href"),d.attr("href",b+"#/syn")):"/apps/vulnerability-management/"===c?(b=d.attr("href"),d.attr("href",b+"#/vm")):"/apps/threat-protection/"===c?(b=d.attr("href"),d.attr("href",b+"#/tp")):"/apps/continuous-monitoring/"===c?(b=d.attr("href"),d.attr("href",b+"#/cm")):"/apps/indication-of-compromise/"===c?(b=e.attr("href"),e.attr("href",b+"#/ioc")):"/apps/container-security/"===c?(b=e.attr("href"),e.attr("href",b+"#/cs")):"/apps/web-app-scanning/"===c?(b=d.attr("href"),d.attr("href",b+"#/was")):"/apps/web-app-firewall/"===c?(b=d.attr("href"),d.attr("href",b+"#/waf")):"/apps/policy-compliance/"===c?(b=d.attr("href"),d.attr("href",b+"#/pc")):"/apps/pci-asv-compliance/"===c?(b=d.attr("href"),d.attr("href",b+"#/pci")):"/apps/file-integrity-monitoring/"===c?(b=e.attr("href"),e.attr("href",b+"#/fim")):"/apps/security-configuration-assessment/"===c?(b=d.attr("href"),d.attr("href",b+"#/sca")):"/apps/cloud-security-assessment/"===c?(b=e.attr("href"),e.attr("href",b+"#/csa")):"/apps/security-assessment-questionnaire/"===c?(b=d.attr("href"),d.attr("href",b+"#/saq")):void 0})}(jQuery);
//# sourceMappingURL=apps.js.map