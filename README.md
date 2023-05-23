
# www.qualys.com

A migration of the Qualys website to Eleventy, Github and Netlify.
## Setup

Change to desired folder path, e.g.

    cd /Users/{{username}}/Projects/

Clone the "qualys" repo from Github

    git clone https://github.com/javanigus/qualys.git

The repo will be cloned to /Users/{{username}}/Projects/qualys/.  
Open that folder in VisualStudio Code.  
Open a new terminal in VS Code.  
Install node dependencies.  

    npm install

Run eleventy in the terminal.  

    npx @11ty/eleventy --serve

Eleventy will start a local web server, usually at http://localhost:8080/. Browse to that URL to verify the site loads.  
Scroll down to the bottom of the page. Below the footer, you'll see a data dump of all variables accessible to the page you are viewing.  
Make changes to files.  
Stage, commit and push the changes back to Github in VS Code.  
Go to https://github.com/javanigus/qualys/commits/main to verify commit in Github.  
Go to Netlify to verify changes are published (https://qualys-poc2.netlify.app/).  
Create a .env file in the project root folder and add the following to it.  

    ENVIRONMENT=development

## Overview of file structure

    /  
    ├─ node_modules/  
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
    │  ├─ index.css  (home page CSS)  
    │  ├─ index.js  (home page JS)  
    │  ├─ index.njk (home page HTML)  
    ├─ .gitignore  
    ├─ package.json  
    ├─ README.md  
    ├─ .env  
    ├─ ...  


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

    {{#extends "default"}}
    {{/extends}}
    {{#block "content"}}
    {{/block}}

### Specify layout
Add "layout: default.njk" to YAML frontmatter (or some other layout).  

    ---
    layout: default.njk
    title: About Qualys
    ...
    ___


### Update CSS block
Replace

    {{#append "styles"}}
	    <link rel="stylesheet" href="index.css">
    {{/append}}

with

    {% layoutblock 'appendStyles-default' %}
	    <link  rel="stylesheet"  href="index.css">
    {% endlayoutblock %}

Note: "-default" is the name of the layout the page immediately inherits from. If the page uses the "form" layout, then the code block would be 

    {% layoutblock 'appendStyles-form' %}
	    <link  rel="stylesheet"  href="index.css">
    {% endlayoutblock %}
  
### Update JS block
Replace

    {{#append "scripts"}}
	    <script src="company.js"></script>
    {{/append}}

with

    {% layoutblock 'appendScripts-default' %}
	    <script  src="company.js"></script>
    {% endlayoutblock %}

Note: "-default" is the name of the layout the page immediately inherits from. If the page uses the "form" layout, then the code block would be 

    {% layoutblock 'appendScripts-form' %}
	    <script  src="company.js"></script>
    {% endlayoutblock %}

### Update Hints block
Replace

    {{#append "hints"}}
	    <link  rel="preconnect"  href="https://www.googletagmanager.com">
    {{/append}}

with

    {% layoutblock 'appendHints-default' %}
	    <link  rel="preconnect"  href="https://www.googletagmanager.com">
    {% endlayoutblock %}

Note: "-default" is the name of the layout the page immediately inherits from. If the page uses the "form" layout, then the code block would be 

    {% layoutblock 'appendHints-form' %}
	    <link  rel="preconnect"  href="https://www.googletagmanager.com">
    {% endlayoutblock %}
  
### Update Handlebars "Partial" references
When you see a reference to a partial like this

    {{> vendor/vimeo-player }}

Copy the partial code into a new file under _includes, e.g. /src/_includes/vimeo-player.njk  
Replace the Handlebars reference as follows

    {% include "vimeo-player.njk" %}

If the partial includes parameters, pass the parameters using {% set %} as in this this example.

Replace

    {{>
    default-hero
	    color="red"
	    title="About Qualys."
	    subheading="The leading provider of information security and compliance cloud solutions."
	    background="about-us-hero-desktop.jpg"
	    squarePartial="company/square.njk"
	    squareBaseline=true
    }}

with

    {% set href = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.2/swiper-bundle.min.css" %}
    {% set color = "red" %}
    {% set heroTitle = "About Qualys." %}
    {% set subheading = "The leading provider of information security and compliance cloud solutions." %}
    {% set background = "about-us-hero-desktop.jpg" %}
    {% set squarePartial = "company/square.njk" %}
    {% set squareBaseline = true %}
    
    {% include "default-hero.njk" %}

### Replace Handlesbars syntax with Nunjucks syntax
Replace

    {{#if disableAnimation}}

with

    {% if disableAnimation %}
Replace

    {{/if}}

with

    {% endif %}

Replace

    {{> (lookup . 'ctaPartial')}}

with

    {% include ctaPartial %}

Replace

    {{{squareLink}}}

with

    {{squareLink}}

Replace

    {{@root.site.asset}}

with

    {{site.asset}}

Replace

    {{!--

with

    {#

  Replace

    --}}

with

    #}

Replace

    {{@root.site.asset}}

with

    {{site.asset}}

Replace

    @first

with

    loop.first

### Loops
When looping over objects in Nunjucks, you must specify the name of the iterator and then using dot or bracket notation, prefix the key with the iterator name. Compare the following Handlebars to Nunjucks code.

**Handlbars**

    {{#each quotes}}
		<h3 class="heading--4 apps-block-heading">{{heading}}</h3>
		<p>{{copy}}</p>
		<a href="{{url}}" class="q-link">Learn more</a>
	{{/each}}

 **Nunjucks**

    {% for item in quotes %}
		<h3 class="heading--4 apps-block-heading">{{item.heading}}</h3>
		<p>{{item.copy}}</p>
		<a href="{{item.url}}" class="q-link">Learn more</a>
	{% endfor %}


### Replace inline JSON data (jsonContext)
 If you encounter inline JSON data within HTML, replace it with a {% set %} statement, e.g. replace this

    {{#jsonContext '[
	{
		"heading"	: "Web Application Scanning",
		"copy"		: "Find, fix security holes in web apps, APIs.",
		"icon"		: "was",
		"url"		: "/apps/web-app-scanning/"
	},
	{
		"heading"	: "Web Application Firewall",
		"copy"		: "Block attacks and patch web application vulnerabilities.",
		"icon"		: "waf",
		"url"		: "/apps/web-app-firewall/"
	}]'}}
	
	{{#each this}}
		<h3 class="heading--4 apps-block-heading">{{heading}}</h3>
		<p>{{copy}}</p>
		<a href="{{url}}" class="q-link">Learn more</a>
	{{/each}}

 with this

    {% set data = [
	{
		"heading"	: "Web Application Scanning",
		"copy"		: "Find, fix security holes in web apps, APIs.",
		"icon"		: "was",
		"url"		: "/apps/web-app-scanning/"
	},
	{
		"heading"	: "Web Application Firewall",
		"copy"		: "Block attacks and patch web application vulnerabilities.",
		"icon"		: "waf",
		"url"		: "/apps/web-app-firewall/"
	}] %}
	
	{% for item in quotes %}
		<h3 class="heading--4 apps-block-heading">{{item.heading}}</h3>
		<p>{{item.copy}}</p>
		<a href="{{item.url}}" class="q-link">Learn more</a>
	{% endfor %}

### Data.js files that fetch remote data
When you encounter data.js files that fetch remote data, e.g. from Contentful, refactor the code to use the [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/). For example,

    const EleventyFetch = require("@11ty/eleventy-fetch");
    module.exports = async function() {
	    let url = "https://api.github.com/repos/11ty/eleventy";
	    /* This returns a promise */
	    return EleventyFetch(url, {
		    duration: "1d", // save for 1 day
		    type: "json"    // we’ll parse JSON for you
	    });
    };


### File count
|File type|Count  |
|--|--|
|/site/layouts/*.hbs  | 16 |
|/site/partials/*.hbs  | 351 |
|/site/pages/*.hbs  | 1659 |
|/site/pages/*.css  | 602 |
|/site/pages/*.js  | 258 |
|/site/pages/*.data.js  | 73 |
|/site/pages/*.json  | 110 |

### File count containing jsonContext
|Folder|Count  |
|--|--|
|/site/pages/*.hbs  | 131 |
|/site/partials/*.hbs  | 27 |

### File count containing contentful.createClient
|Folder|Count  |
|--|--|
|/site/pages/*.data.js  | 44 |


### Migration plan
1. Migrate all 16 layouts manually.
2. Migrate all 351 partials and all 1659 pages programmatically using migration script: [recursive-replace.js](https://github.com/javanigus/qualys/blob/main/utils/recursive-replace.js).
3. Migrate some code that the automation script could not migrate.
4. Migrate all 73 data.js files manually.
5. Migrate all redirects.

### Help
Confused? Try diffing similar pages that have already been migrated, e.g. company.hbs to company.njk.
Need more help? Contact ayahya@qualys.com.

### Resources
* [Handlebars template engine docs](https://handlebarsjs.com/guide/#what-is-handlebars)
* [Nunjucks template engine docs](https://mozilla.github.io/nunjucks/templating.html#user-defined-templates-warning)
* [Eleventy static site builder docs](https://www.11ty.dev/docs/)
* [Netlify docs](https://docs.netlify.com/)