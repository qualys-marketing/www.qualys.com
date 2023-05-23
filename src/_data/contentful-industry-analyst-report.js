const EleventyFetch = require("@11ty/eleventy-fetch");
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// Contentful API docs
// https://www.contentful.com/developers/docs/references/content-delivery-api/
const space_id = "4l0w8syj29ap";
const environment_id = "master";
const access_token = process.env.CONTENTFUL_ACCESS_TOKEN;
const content_type = "industryAnalystReport";
const limit = "1000"; // max API query results
const url = `https://cdn.contentful.com//spaces/${space_id}/environments/${environment_id}/entries?access_token=${access_token}&limit=${limit}&content_type=${content_type}`;

console.log(url);

module.exports = async function() {
    /* This returns a promise */
    return EleventyFetch(url, {
	    duration: "1d", // save for 1 day
	    type: "json"    // we’ll parse JSON for you
    });
}; 