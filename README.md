
# www.qualys.com

A migration of the Qualys website to Eleventy, Github and Netlify.

## New Site Stack
* **Static Site Generator**: [Eleventy](https://www.11ty.dev/docs/)
* **Template Engine**: [Nunjucks](https://mozilla.github.io/nunjucks/templating.html)
* **Version Control**: [Github](https://github.com/)
* **Build System and Web Hosting**: [Netlify](https://docs.netlify.com/)
* **Content Management System**: [Contentful](https://www.contentful.com/)
* **Image Optimization and CDN**: [ImageKit](https://imagekit.io/)

The static site generator converts Nunjucks templates and data from JSON files, or node.js modules, into HTML files. The Eleventy Fetch plugin fetches and caches data from the Contentful CMS API and other external data sources. That data is also used to build pages. When you commit and push changes to Github, that will automatically trigger Netlify to clone the repo, build the static site, and publish the changes to the Netlify CDN.

## Setup

Change to desired folder path, e.g.
```Shell
cd /Users/{{username}}/Projects/
```
Clone the "qualys" repo from Github
```Shell
git clone https://github.com/qualys-marketing/www.qualys.com.git
```
The repo will be cloned to /Users/{{username}}/Projects/www.qualys.com/.
Open that folder in VisualStudio Code.
Open a new terminal in VS Code.
If you don't have NodeJS, [install it](https://nodejs.dev/en/learn/how-to-install-nodejs/).
Install node dependencies.
```Shell
npm install
```
Run eleventy in the terminal.
```Shell
npx @11ty/eleventy --serve --incremental
```
Eleventy will start a local web server, usually at http://localhost:8080/. Browse to that URL to verify the site loads.
Scroll down to the bottom of the page. Below the footer, you'll see a data dump of all variables accessible to the page you are viewing.
Make changes to files.
Stage, commit and push the changes back to Github (you can use VS Code to commit and push changes).
Go to https://github.com/qualys-marketing/www.qualys.com/commits/main to verify commit in Github.
Go to Netlify to verify changes are published (https://qualys-poc2.netlify.app/).
Create a .env file in the project root folder and add the content from a coworker's .env file.

## Overview of file structure
```
/
├─ .cache/  (stores cached data from Eleventy Fetch plugin)
├─ node_modules/ (stores node modules after running npm install)
├─ www/ (built files go in here)
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ robots.txt
│  ├─ ...
├─ src/ (source files go in here)
│  ├─ _data/ (global data files go in here)
│  │  ├─ site.js
│  │  ├─ footerLinks.json
│  │  ├─ ...
│  ├─ _includes/ (all reusable partials go in here)
│  │  ├─ header.njk
│  │  ├─ footer.njk
│  │  ├─ ...
│  ├─ _layouts/ (all layouts go in here)
│  │  ├─ default.njk
│  │  ├─ form.njk
│  ├─ asset/ (all static assets go in there)
│  │  ├─ stylesheet/
│  │  │  ├─ common.css (global CSS file)
│  │  │  ├─ ...
│  │  ├─ script/
│  │  │  ├─ common.js (global JS file)
│  │  │  ├─ ...
│  │  ├─ image/
│  │  ├─ ...
│  ├─ .well-known
│  │  ├─ security.txt (cybersecurity reporting info)
│  ├─ index.css  (home page CSS)
│  ├─ index.js  (home page JS)
│  ├─ index.njk (home page HTML)
│  ├─ _headers (contains custom HTTP headers)
│  ├─ _redirects (contains all redirects)
│  ├─ 404.html
│  ├─ sitemap.xml
│  ├─ robots.txt
│  ├─ ...
├─ utils
│  ├─ recursive-replace.js (migration script)
│  ├─ ...
├─ .gitignore
├─ package.json (list of all node module dependencies to install)
├─ README.md (this file that you are reading)
├─ netlify.toml (Netlify config file)
├─ .eleventy.js (Eleventy config file)
├─ .env (local environment variables: tokens, passwords, etc)
├─ postcss.config.js (PostCSS config file - include autoprefixer)
├─ ...
```

## Instructions for migrating web pages
Migrate one folder at a time, without subfolders. You will be migrating from the Handlebars templating engine (hbs) to the [Nunjucks templating engine](https://mozilla.github.io/nunjucks/templating.html) (njk).

### Copy files

Copy and paste hbs, css and js files within one folder, e.g. /company/.

### Rename CSS files
If you encounter any CSS files with an hbs extension, e.g. index.css.hbs,

 1. Remove the .hbs extension so the file name is index.css
 2. Remove an Handlebars syntax within the file

Eleventy will always process files with hbs, njk, md extensions and output an HTML file, e.g. index.css.html, wnich is never what we want.

### Delete unused code
Delete the following lines of code.
```Handlebars
{{#extends "default"}}
{{/extends}}
{{#block "content"}}
{{/block}}
```
### Specify layout
Add "layout: default.njk" to YAML frontmatter (or some other layout).
```yaml
---
layout: default.njk
title: About Qualys
...
---
```

### Update CSS block
Replace
```Handlebars
{{#append "styles"}}
	<link rel="stylesheet" href="index.css">
{{/append}}
```
with
```Nunjucks
{% layoutblock 'appendStyles-default' %}
	<link  rel="stylesheet"  href="index.css">
{% endlayoutblock %}
```
Note: "-default" is the name of the layout the page immediately inherits from. If the page uses the "form" layout, then the code block would be
```Nunjucks
{% layoutblock 'appendStyles-form' %}
	<link  rel="stylesheet"  href="index.css">
{% endlayoutblock %}
```
### Update JS block
Replace
```Handlebars
{{#append "scripts"}}
	<script src="company.js"></script>
{{/append}}
```
with
```Nunjucks
{% layoutblock 'appendScripts-default' %}
	<script  src="company.js"></script>
{% endlayoutblock %}
```
Note: "-default" is the name of the layout the page immediately inherits from. If the page uses the "form" layout, then the code block would be
```Nunjucks
{% layoutblock 'appendScripts-form' %}
  <script  src="company.js"></script>
{% endlayoutblock %}
```
### Update Hints block
Replace
```Handlebars
{{#append "hints"}}
	<link  rel="preconnect"  href="https://www.googletagmanager.com">
{{/append}}
```
with
```Nunjucks
{% layoutblock 'appendHints-default' %}
	<link  rel="preconnect"  href="https://www.googletagmanager.com">
{% endlayoutblock %}
```
Note: "-default" is the name of the layout the page immediately inherits from. If the page uses the "form" layout, then the code block would be
```Nunjucks
{% layoutblock 'appendHints-form' %}
	<link  rel="preconnect"  href="https://www.googletagmanager.com">
{% endlayoutblock %}
```
### Update Handlebars "partial" references
When you see a reference to a partial like this
```Handlebars
{{> vendor/vimeo-player }}
```
Copy the partial code into a new file under _includes, e.g. /src/_includes/vimeo-player.njk
Replace the Handlebars reference as follows
```Nunjucks
{% include "vendor/vimeo-player.njk" %}
```
If the partial includes parameters, pass the parameters using {% set %} as in this this example.

Replace
```Handlebars
{{>
default-hero
  color="red"
  title="About Qualys."
  subheading="The leading provider of information security and compliance cloud solutions."
  background="about-us-hero-desktop.jpg"
  squarePartial="company/square.njk"
  squareBaseline=true
}}
```
with
```Nunjucks
{% set color = "red" %}
{% set heroTitle = "About Qualys." %}
{% set subheading = "The leading provider of information security and compliance cloud solutions." %}
{% set background = "about-us-hero-desktop.jpg" %}
{% set squarePartial = "company/square.njk" %}
{% set squareBaseline = true %}

{% include "default-hero.njk" %}
```
### Replace Handlebars syntax with Nunjucks syntax
Replace
```Handlebars
{{#if disableAnimation}}
```
with
```Nunjucks
{% if disableAnimation %}
```
Replace
```Handlebars
{{/if}}
```
with
```Nunjucks
{% endif %}
```
Replace
```Handlebars
{{> (lookup . 'ctaPartial')}}
```
with
```Nunjucks
{% include ctaPartial %}
```
Replace
```Handlebars
{{{squareLink}}}
```
with
```Nunjucks
{{squareLink}}
```
Replace
```Handlebars
{{@root.site.asset}}
```
with
```Nunjucks
{{site.asset}}
```
Replace
```Handlebars
{{!--
```
with
```Nunjucks
{#
```
Replace
```Handlebars
--}}
```
with
```Nunjucks
#}
```
Replace
```Handlebars
{{@root.site.asset}}
```
with
```Nunjucks
{{site.asset}}
```
Replace
```Handlebars
@first
```
with
```Nunjucks
loop.first
```
### Loops
When looping over objects in Nunjucks, you must specify the name of the iterator and, using dot or bracket notation, prefix the key with the iterator name. Compare the following Handlebars to Nunjucks code.

**Handlebars**
```Handlebars
{{#each quotes}}
	<h3 class="heading--4 apps-block-heading">{{heading}}</h3>
	<p>{{copy}}</p>
	<a href="{{url}}" class="q-link">Learn more</a>
{{/each}}
```
**Nunjucks**
```Nunjucks
{% for item in quotes %}
	<h3 class="heading--4 apps-block-heading">{{item.heading}}</h3>
	<p>{{item["copy"]}}</p>
	<a href="{{item.url}}" class="q-link">Learn more</a>
{% endfor %}
```

### Replace inline JSON data (jsonContext)
 If you encounter inline JSON data within HTML, replace it with a {% set %} statement, e.g. replace this
```Handlebars
{{#jsonContext '[
	{
		"heading"	: "Web Application Scanning",
		"copy"		: "Find, fix security holes in web apps, APIs.",
		"url"		: "/apps/web-app-scanning/"
	},
	{
		"heading"	: "Web Application Firewall",
		"copy"		: "Block attacks and patch web application vulnerabilities.",
		"url"		: "/apps/web-app-firewall/"
	}
]'}}

{{#each this}}
	<h3 class="heading--4 apps-block-heading">{{heading}}</h3>
	<p>{{copy}}</p>
	<a href="{{url}}" class="q-link">Learn more</a>
{{/each}}
```
 with this
```Nunjucks
{% set data = [
	{
		"heading"	: "Web Application Scanning",
		"copy"		: "Find, fix security holes in web apps, APIs.",
		"url"		: "/apps/web-app-scanning/"
	},
	{
		"heading"	: "Web Application Firewall",
		"copy"		: "Block attacks and patch web application vulnerabilities.",
		"url"		: "/apps/web-app-firewall/"
	}
] %}

{% for item in quotes %}
	<h3 class="heading--4 apps-block-heading">{{item.heading}}</h3>
	<p>{{item.copy}}</p>
	<a href="{{item.url}}" class="q-link">Learn more</a>
{% endfor %}
```
### Data.js files that fetch remote data
When you encounter data.js files that fetch remote data, e.g. from Contentful, refactor the code to use [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/). For example,
```Javascript
const EleventyFetch = require("@11ty/eleventy-fetch");
module.exports = async function() {
	let url = "https://api.github.com/repos/11ty/eleventy";
	/* This returns a promise */
	return EleventyFetch(url, {
		duration: "1d", // save for 1 day
		type: "json"    // we’ll parse JSON for you
	});
};
```

### Old website file count
|File type|Count  |
|--|--|
|/site/layouts/*.hbs  | 16 |
|/site/partials/*.hbs  | 351 |
|/site/pages/*.hbs  | 1659 |
|/site/pages/*.css  | 602 |
|/site/pages/*.js  | 258 |
|/site/pages/*.data.js  | 73 |
|/site/pages/*.json  | 110 |

### Old website file count containing jsonContext
|Folder|Count  |
|--|--|
|/site/pages/*.hbs  | 131 |
|/site/partials/*.hbs  | 27 |

### Old website file count containing contentful.createClient
|Folder|Count  |
|--|--|
|/site/pages/*.data.js  | 44 |

### Pages that use ReactJS
|Folder|Migrate or not|Action|
|--|--|--|
|Community | No |Redirect Community to Discussions site|
|Docs Release Notes | Yes |Replace React with Svelte|
|Find a Partner | Yes |Replace React with PartnerFleet|
|Training | Yes |Replace React with JavaScript / jQuery|
|Vulnerability Detection Pipeline | Yes |Replace React with Svelte|

### Pages that pull external data
|File|Source|Migrate or not|Frequency of use|Difficulty Level|Note|
|--|--|--|--|--|--|
|site/pages/2022/black-hat-usa/index.data.js:|Contentful||Yearly|Easy||
|site/pages/2023/04/virtual-summit/index.data.js:|Contentful||Quarterly|Easy||
|site/pages/2023/05/servicenow-knowledge/index.data.js:|Contentful|No||Easy|File copied unnecessarily|
|site/pages/community/channels.data.js:||No||
|site/pages/community/fetch-content.js:||No||
|site/pages/community/index.data.js:||No||
|site/pages/company/community-terms-of-use/index.data.js:||No||
|site/pages/company/events/fullcalendar.json.data.js|Salesforce||Daily|Easy||
|site/pages/company/events/speaking-engagements.json.data.js:|Contentful|||Easy||
|site/pages/company/events/webcasts.json.data.js:|Contentful|||Easy||
|site/pages/company/newsroom/industry-analyst-reports/data.js:|Contentful|||Easy||
|site/pages/company/newsroom/media-contacts/data.js:||No||Easy|PR team always asks web team to update this. Just move to local JSON file.|
|site/pages/company/newsroom/media-coverage/media-coverage.data.js:|Contentful|||Difficult|Must also create a array of pages|
|site/pages/company/newsroom/news-releases/news-release.data.js:|Contentful|||Difficult|Must also create a array of pages|
|site/pages/company/privacy/index.data.js:|Contentful||Yearly|Easy||
|site/pages/company/privacy/content/index.data.js:|Contentful||Yearly|Easy||
|site/pages/documentation/documentation.data.js:|Contentful||Monthly|Easy|Docs team always asks web team to update this|
|site/pages/documentation/release-notes/release-notes.json.data.js:|Contentful||Monthly|Easy|Docs team always asks web team to update this|
|site/pages/fundamentals/what-is-vulnerability-management-detection-response/datasheet-data.js:|Contentful||Easy||
|site/pages/fundamentals/what-is-vulnerability-management-detection-response/infographic-data.js:|Contentful||Easy||
|site/pages/fundamentals/what-is-vulnerability-management-detection-response/reports-data.js:|Contentful||Easy||
|site/pages/fundamentals/what-is-vulnerability-management-detection-response/webinars-data.js:|Contentful||Moderate||
|site/pages/fundamentals/what-is-vulnerability-management-detection-response/whitepaper-data.js:|Contentful||Easy||
|site/pages/notifications/notifications.data.js:|Contentful|No||
|site/pages/partners/integration/integration.data.js:||No|Rarely||Partner team always asks web team to update this. Just move to local JSON file.|
|site/pages/partners/integration/list/index.data.js:||No|Rarely||Partner team always asks web team to update this. Just move to local JSON file.|
|site/pages/qsc/2022/atlanta/index.data.js:|Contentful||Yearly|Easy||
|site/pages/qsc/2022/chicago/index.data.js:|Contentful||Yearly|Easy||
|site/pages/qsc/2022/dallas/index.data.js:|Contentful||Yearly|Easy||
|site/pages/qsc/2022/las-vegas/index.data.js:|Contentful||Yearly|Easy||
|site/pages/qsc/2022/london/index.data.js:|Contentful||Yearly|Easy||
|site/pages/qsc/2022/mumbai/index.data.js:|Contentful||Yearly|Easy||
|site/pages/qsc/2022/new-york/index.data.js:|Contentful||Yearly|Easy||
|site/pages/qsc/2022/san-francisco/index.data.js:|Contentful||Yearly|Easy||
|site/pages/qsc/2023/london/index.data.js:|Contentful||Yearly|Easy||
|site/pages/qsc/2023/munich/index.data.js:|Contentful||Yearly|Easy||
|site/pages/research/security-advisories/security-advisories.data.js:|Contentful||Quarterly|Easy||
|site/pages/research/security-alerts/security-alert.data.js:|Contentful + Vuln Server||Quarterly|Difficult |Pulls data from both Contentful and vuln office server.|
|site/pages/resources/resources.data.js:|Contentful||Monthly|Moderate|Everyone asks web team to update this. Consider moving to local JSON file.|
|site/pages/training/training.data.js:|Contentful + Heroku||Monthly|Difficult |This is part of a React app. It pulls data from Heroku / GeoLearning.|
|site/pages/training/course/course.data.js:|Contentful||Monthly|Easy||
|site/pages/training/library/library.data.js:|Contentful + Vimeo||Monthly|Difficult |Training team always asks web team to update this. It pulls data from Vimeo.|
|site/pages/tru/security-alerts-data.js:|Contentful + Vuln Server|||Difficult |This pulls data from vuln office server.|
|site/pages/tru/webinars-data.js:|Contentful|||Moderate||
|site/pages/webcasts/webcasts.data.js:|Contentful|||Easy||

### Old website files containing "return page" that generate multiple pages
* /site/pages/company/newsroom/news-releases/index.data.js
* /site/pages/company/newsroom/media-coverage/media-coverage.data.js
* /site/pages/training/course/course.data.js
* /site/pages/training/library/library.data.js
* /site/pages/webcasts/webcasts.data.js

### Migration steps
1. Migrate all 16 layouts manually. :heavy_check_mark:
2. Migrate all redirects. :hourglass: (add recent changes)
3. Migrate all custom headers. :heavy_check_mark:
4. Migrate all favicons. :heavy_check_mark:
5. Migrate robots.txt. :heavy_check_mark:
6. Add [PostCSS auto-prefixer](https://www.npmjs.com/package/eleventy-plugin-postcss) support :heavy_check_mark:
7. Migrate sitemap. :heavy_check_mark:
8. Migrate sitemap for product help. :heavy_check_mark:
9. Have Vuln Detection Pipeline server publish JSON data to Github
10. Write script to list side by side the file size of all html files generated from old hbs files and new njk files to compare sizes and quickly check if the migration script works correctly. Many strip out all whitespace.
10. Migrate all 351 partials and all 1659 pages programmatically using migration script. :hourglass:[See script](https://github.com/qualys-marketing/www.qualys.com/blob/main/utils/recursive-replace.js).
11. Change all .hbs file extensions to .njk [See script](https://github.com/qualys-marketing/www.qualys.com/blob/main/utils/recursive-file-extension-replace.js)
12. Migrate some code that the automation script could not migrate, like the code blocks below.
13. Rename all data.js files to 11tydata.js
14. Migrate data.js files that generate multiple pages, e.g. press releases, manually
15. Migrate data.js files that pull data from external sources, e.g. Contentful, manually
16. Migrate all other data.js files manually.
17. Move all images to AWS / ImageKit.
18. Move all PDFs to AWS CloudFront (assets2.qualys.com)

```Handlebars
{{> icon-plus-content
  icon=icon
  title=heading
  copy=copy
  divider=divider
  link=link
}}
```
```Handlebars
<div id="modal-{{../id}}-{{@index}}">
```
```
central \"single-pane-of-glass\" dashboard."
```

```Handlebars
{{>
	ipad
	image=screenshotImage
	alt=altText
	centered=false
	fixedWidth=true
	animate=true
}}
```

```Handlebars
{{moment page.startTime format="LLLL z" tz="UTC" locale="en-US"}}
```

### Development Steps for Migration Script

1. Copy source "pages" folder and "partials" folder and paste them into temporary "migration" folder
2. Copy utils/recursive-replace.js and utils/recursive-file-extension-replace.js from new repo to "migration" folder
3. Delete the following files and folders in the "pages" folder:
- migration/pages/trust-compliance/
- migration/pages/community/
4. In recursive-replace.js and recursive-file-extension-replace.js, set folder name to "pages"
5. Run migration scripts
```Shell
node recursive-replace.js
node recursive-file-extension-replace.js
```
4. In recursive-replace.js and recursive-file-extension-replace.js, set folder name to "partials"
5. Run migration scripts
```Shell
node recursive-replace.js
node recursive-file-extension-replace.js
```
7. Copy contents of migrated "pages" folder to new site's "src" folder
8. Copy contents of migrated "partials" folder to new site's "_includes" folder
10. Delete "src/trust-compliance" folder
11. Open the new site in a terminal and run Eleventy
```Shell
npx @11ty/eleventy --serve --incremental
```
12. Fix errors by updating migration script
13. git reset the local repo
14. Optionally, delete empty folders with
```Shell
find . -type d -empty -delete
```
15. Repeat all steps until migration script runs without error and produces desired results.

### Troubleshooting
If you lose your .env file, copy the one in the source website and remove the Contenful Preview API tokens.

If Eleventy acts up, like saying it can't find a layout that does exist, close and reopen the terminal and rerun Eleventy.

### Launch Steps
1. Run recursive-replace.js
2. Run recursive-file-extension-replace.js
3. Test [See list of all pages](https://qualys-poc2.netlify.app/list-of-all-pages/)
4. Update DNS to point to Netlify

![New Stack Workflow](https://ik.imagekit.io/qualys/New%20Qualys%20Website%20Tech%20Stack_KHNROprnu.png?updatedAt=1689984271373)

### Help
Confused? Try diffing similar pages that have already been migrated, e.g. company.hbs to company.njk.
Need more help?
* Contact ayahya@qualys.com
* Post a question on Stack Overflow
* Hire a freelancer on upwork.com.
