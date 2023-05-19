
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

### Delete unused code
Delete the following code.  

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

 ### Move JSON data to _data folder
 If you encounter inline JSON data within HTML, e.g. a list of management team members, create a new file for it in _data, e.g. _data/management.json and put the JSON data there. The data will be accessible as it will be global. 
 