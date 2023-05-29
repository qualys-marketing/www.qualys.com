/*
 * there are three types of product help sitemap files
 * list each by type, generate paths to each, and then merge them together
 */

const data = {
	"helpSitemaps": [
		"fim",
		"ioc",
		"oca",
		"ps",
		"ssc",
		"seca",
		"pc",
		"sm"
	],
	"docsWebHelpSitemap": [
		"cloudview/latest",
		"csam/latest",
		"gav/latest",
		"vmdr-ot/latest",
		"vmdr-mobile/latest",
		"certview/latest",
		"pm/latest",
		"pm/api",
		"ud/latest",
		"edr/latest",
		"conn/latest",
		"qflow/latest",
		"ps/latest",
		"tc/latest",
		"cs/latest",
		"cs/api",
		"vmdr/latest",
		"cs/crs-api"
	],
	"portalHelpSitemaps": [
		"admin",
		"assetview",
		"ca",
		"cm",
		"malware",
		"pc",
		"questionnaire",
		"vm",
		"wafv2",
		"was"
	],
	"qwebHelpSitemaps": [
		"fo_portal"
	]
};


const qwebHelpSitemaps = data.qwebHelpSitemaps.map(item => {
	return `/qwebhelp/${item}/sitemap.xml`;
});

const portalHelpSitemaps = data.portalHelpSitemaps.map(item => {
	return `/portal-help/en/${item}/sitemap.xml`;
});

const helpSitemaps = data.helpSitemaps.map(item => {
	return `/${item}/help/sitemap.xml`;
});

const docsWebHelpSitemap = data.docsWebHelpSitemap.map(item => {
	return `/${item}/sitemap.xml`;
});

const sitemaps = (new Array()).concat(
	helpSitemaps, portalHelpSitemaps, qwebHelpSitemaps
);

module.exports = {
	"base": "https://qualysguard.qg2.apps.qualys.com",
	"sitemaps": sitemaps,
	"docsBase": "https://docs.qualys.com/en",
	"apiBase": "",
	"docsWebHelpSitemap": docsWebHelpSitemap
};
