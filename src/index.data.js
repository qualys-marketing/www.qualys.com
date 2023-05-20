const moment = require("moment-timezone");

let promiseOfNews = require("./company/newsroom/index.data.js");
let promiseOfEvents = require("./company/events/events.data.js");

module.exports = Promise.all(
	[promiseOfNews, promiseOfEvents]
).then(results => {

	let news = results[0];
	let events = results[1];

	// allow only selected media coverage items to show on the home page
	// NOTE commented out during re-integration merge because it did not appear in trunk
	// news.mediaCoverages = news.mediaCoverages.filter(mediaCoverage => mediaCoverage.showOnHomepage);

	// initialize page data context
	let page = {};

	let theLatestNews = [
		Object.assign({ "type": "Blog Posts", "blogPost": true }, news.blogPosts[0]),
		Object.assign({ "type": "Blog Posts", "blogPost": true  }, news.blogPosts[1]),
		Object.assign({ "type": "Press Releases", "pressRelease": true }, news.newsReleases[0]),
		Object.assign({ "type": "Press Releases", "pressRelease": true }, news.newsReleases[1]),
		Object.assign({ "type": "Media Coverage", "mediaCoverage": true }, news.mediaCoverages[0]),
		Object.assign({ "type": "Media Coverage", "mediaCoverage": true }, news.mediaCoverages[1])
	];

	// only if we get events
	if (events && events.items) {

		// filter events down to the events that we create microsites for
		events = events.items.filter(event => event.url && event.url.match(/^https:\/\/www\.qualys\.com/));

		// filter out webcasts
		events = events.filter(event => !event.url.match(/webcast/));

		// filter events down to events starting in the next six weeks
		events = events.filter(event => moment(event.start).isBefore(moment().add(6, "weeks")));

		// add the next big event, if there is one
		if (events.length > 0) {

			// limit to one change a day
			// pick one based on the current day
			let days = Math.abs(moment().diff(events[events.length - 1].start, "days"));
			let index = days % events.length;
			theLatestNews.push(Object.assign({ "type": "Events" }, events[index]));

		}

	}

	// blog post headlines are already HTML encoded
	if (theLatestNews[0].headline) {
		theLatestNews[0].rawHeadline = theLatestNews[0].headline;
		delete theLatestNews[0].headline;
	}
	if (theLatestNews[1].headline) {
		theLatestNews[1].rawHeadline = theLatestNews[1].headline;
		delete theLatestNews[1].headline;
	}

	// fix the news release link
	theLatestNews[2].link = `/company/newsroom/news-releases/usa/${news.newsReleases[0].urlSlug}/`;
	theLatestNews[3].link = `/company/newsroom/news-releases/usa/${news.newsReleases[1].urlSlug}/`;

	// prepend media outlet name to media coverage headline
	if (theLatestNews[4].mediaOutlet) {
		let mediaOutletName = theLatestNews[4].mediaOutlet.name;
		let headline = theLatestNews[4].headline;
		theLatestNews[4].headline = `${mediaOutletName}: ${headline}`;
	}
	if (theLatestNews[5].mediaOutlet) {
		let mediaOutletName = theLatestNews[5].mediaOutlet.name;
		let headline = theLatestNews[5].headline;
		theLatestNews[5].headline = `${mediaOutletName}: ${headline}`;
	}

	if (theLatestNews[6]) {

		// put the event title in the headline field
		theLatestNews[6].headline = theLatestNews[6].title;
		// move the url to the link
		theLatestNews[6].link = theLatestNews[6].url;

		// subtract one day from the event end time
		// remove the end date for one day events
		if (theLatestNews[6].end) {

			let end = moment.parseZone(theLatestNews[6].end);
			let start = moment.parseZone(theLatestNews[6].start);
			if (end.isAfter(start.clone().add(1, "day"))) {
				theLatestNews[6].end = end.clone().subtract(1, "day").format();
			} else {
				delete theLatestNews[6].end;
			}

		}

	}

	// sort by publication date
	theLatestNews.sort((a, b) => {

		let ma = moment(a.publicationDate || a.end || a.start);
		let mb = moment(b.publicationDate || b.end || b.start);

		if (ma.isBefore(mb)) {
			return 1;
		} else if (ma.isAfter(mb)) {
			return -1;
		} else {
			return 0;
		}

	});

	// limit to the three latest items for now
	page.items = theLatestNews.slice(0, 7);
	return Promise.resolve(page);

}).catch(err => {
	return Promise.reject(err);
});
