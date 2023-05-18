require('dotenv').config();

/*
 * site wide data
 * available in all templates under the global `site` object
 */


let envIsProd = process.env.ENVIRONMENT === "production";

module.exports = {
	asset: envIsProd ? "https://ik.imagekit.io/qualys" : "/asset",
	base: {
		url: envIsProd ? "https://www.qualys.com" : process.env.BASE_URL || ""
	},
	community: {
		base: {
			url: envIsProd ? "https://community.qualys.com" : process.env.COMMUNITY_BASE_URL || "/community"
		}
	},
	coveo: {
		public: {
			api: {
				key: process.env.COVEO_PUBLIC_API_KEY
			}
		}
	},
	env: {
		production: envIsProd
	},
	google: {
		gtm: {
			id: "GTM-MNLTS6"
		}
	},
	marketo: {
		base: {
			url: envIsProd ? "https://lps.qualys.com" : "https://app-ab41.marketo.com"
		},
		munchkin: {
			id: envIsProd ? "797-ENI-742" : "295-OCX-077"
		}
	},
	salesforce: {
		base: {
			url: envIsProd ? "https://qualys.secure.force.com" : "https://qa-qualys.cs237.force.com"
		},
		discuss: {
			url: envIsProd ? "https://success.qualys.com/discussions/s" : "https://success-qa.qualys.com/discussions/s"
		},
		partners: {
			url: envIsProd ? "https://success.qualys.com/partners/s" : "https://success-qa.qualys.com/partners/s"
		},
		support: {
			url: envIsProd ? "https://success.qualys.com/support/s" : "https://success-qa.qualys.com/support/s"
		},
		csp: {
			url: envIsProd ? "https://success.qualys.com/customersupport" : "https://success-qa.qualys.com/customersupport"
		}
	},
	azure: {
		subscription: {
			key: process.env.AZURE_SUBSCRIPTION_KEY
		}
	},
	vulnOffice: {
		base: {
			url: envIsProd ? "https://vuln.intranet.qualys.com" : "https://vuln.p08.eng.sjc01.qualys.com:44340"
		}
	},
	lang: "en",
	title: "Qualys, Inc.",
	year: (new Date()).getFullYear(),
	replacer: function replacer (key, value) {

		if (key === "path") {

			// do not output the "path" property when JSON stringify'd
			return undefined;

		}

		return value;

	}
};
