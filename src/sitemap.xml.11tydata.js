/**
 * find all pages in file system and exclude pages based on robots.txt
 * and sitemap.xml.blacklist.txt
 * Sitemap element definitions
 * https://en.wikipedia.org/wiki/Sitemaps#Element_definitions
 * TODO find a better way to calculate last modified
 * TODO cache this for 24 hours
 */
const glob = require("glob");
const path = require("path");
const fs = require("graceful-fs");
const site = require("./_data/site.js");
const { abort } = require("process");

const src = path.resolve(__dirname, "../src");
const robots = fs.readFileSync(path.resolve(__dirname, "robots.txt"), "utf8");
let blacklist = fs.readFileSync(path.resolve(__dirname, "sitemap.xml.blacklist.txt"), "utf8").toString().split("\n");

// filter out false-y values, like empty strings
blacklist = blacklist.filter(bl => bl);

// some patterns to block from sitemap.xml
let blacklistPatterns = [
	new RegExp("/confirm/$"),
	new RegExp("^/40"),
	new RegExp("^/emails"),
	new RegExp("iframe"),
];

// filter to only lines starting with Disallow:
const disallowMatches = robots.match(/Disallow:\s+.*?\n/g);
blacklistPatterns = blacklistPatterns.concat(disallowMatches.map(disallowMatch => {
	return new RegExp(
		"^" + disallowMatch.replace(/(Disallow:\s+|\n)/g, "").replace("*", ".*")
	);
}));

function matchesABlacklistPattern(location) {
	let shouldSkip = false;
	blacklistPatterns.forEach(pattern => {
		if (location.match(pattern)) {
			shouldSkip = true;
			return;
		}
	});

	return shouldSkip;
}

function isInSitemapBlacklistTxt(location) {
	return blacklist.includes(location);

}

function isBlocked(location) {
	return isInSitemapBlacklistTxt(location) || matchesABlacklistPattern(location);
}

module.exports = new Promise((resolve, reject) => {

	glob(path.join(src, "**/*.+(njk|txt|pdf)"), (err, files) => {

		if (err) {
			reject(err);
		} else {
			var urls = files.map(file => {

				let changeFrequency, lastModified, location, priority, skip;

				/*
					* DISABLED - mtime of HTML files changes with each build
					* TODO find a better way to calculate last modified
					* MAYBE use mtime of matching hbs file in site/pages
					* otherwise, use mtime of matching file in site/static
					* otherwise, use mtime of file in www
					* MAYBE a separate process that runs daily
					* checksums all files
					* updates a log file with new checksums
					* averages deltas between checksums to produce change frequency
					* only produces a value for files with more than two checksums
					* outputs to another file that this script can read
					* BETTER YET, extract this info from the version control log
					* subversion is painfully slow, so wait until we migrate to git
					*/
				/*
				stats = fs.statSync(file);
				lastModified = moment(stats.mtime).format("YYYY-MM-DD");

				// calculate change frequency based on last modified
				if (moment().subtract(24, "hour").isBefore(stats.mtime)) {
					changeFrequency = "hourly";
				} else if (moment().subtract(3, "day").isBefore(stats.mtime)) {
					changeFrequency = "daily";
				} else if (moment().subtract(3, "week").isBefore(stats.mtime)) {
					changeFrequency = "weekly";
				} else if (moment().subtract(3, "month").isBefore(stats.mtime)) {
					changeFrequency = "monthly";
				} else {
					changeFrequency = "yearly";
				}
				*/

				// determine location
				location = "/" + path.relative(src, file);

				// remove njk filenames from paths
				regex = /([a-zA-Z0-9-_\.]+)\.njk$/i;
				replaceVal = '';
				location = location.replace(regex, replaceVal);

				// filter out certain files and folders
				const excludedFolders = ["_includes", "_layouts", "_data", "robots.txt", "humans.txt", "LICENSE.txt", "blacklist.txt", "sitemap.xml"];
				excludedFolders.forEach(function (item, index, arr) {
					if (location.includes(item)) {
						skip = true;
					}
				});

				// calculate priority
				// priority is determined by how many folders there are
				// limit to one decimal point
				let folders = location.split("/").length;
				if (location.match(/\.pdf$/)) {

					// penalty for being a PDF
					// this will help search engines to return HTML over PDF
					folders += 5;

				}
				priority = (12 - folders) / 10;
				if (priority <= 0) {
					priority = 0.1;
				}

				// filter files by robots.txt and sitemap.blacklist.txt
				if (!isBlocked(location) && !skip) {
					// comply with sitemap protocol and limit length of loc field to 2048 characters
					if ((site.base.url.length + location.length) > 2048) {
						/* eslint-disable no-console */
						console.warn(`<loc> field value, ${site.base.url}${location}, exceeds maximum length of 2048; location excluded from sitemap`);
						return;
					}
					return {
						"location": location,
						"lastModified": lastModified,
						"changeFrequency": changeFrequency,
						"priority": priority
					};
				}
			});

			urls = urls.filter(item => item);

			// make array of URL objects unique by URL
			const key = 'location';
			const uniqueUrls = [...new Map(urls.map(item =>
			[item[key], item])).values()];

			resolve({
				"urls": uniqueUrls
			});
		};

	});
});
