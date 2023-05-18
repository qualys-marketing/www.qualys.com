
# www.qualys.com

A migration of the Qualys website to Eleventy, Github and Netlify.
## Setup

Change to desired folder path, e.g.

    cd /Users/{{username}}/Projects/

Clone the "qualys" repo from Github

    git clone https://github.com/javanigus/qualys.git

The repo will be cloned to /Users/{{username}}/Projects/qualys/.  
Open that folder VisualStudio Code.  
Open a new terminal in VS Code.  
Install node dependencies.  

    npm install

Run eleventy in the termimal.  

    npx @11ty/eleventy --serve

Eleventy will start a local web server, usually at http://localhost:8080/. Browse to that URL to verify the site loads.  
Make changes to files.  
Stage, commit and push the changes back to Github in VS Code.  
Go to https://github.com/javanigus/qualys/commits/main to verify commit in Github.  
Go to Netlify to verify changes are published (https://qualys-poc2.netlify.app/)
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
    │  ├─ _includes/ (all partials and reusable components go in here)  
    │  │  ├─ header.njk  
    │  │  ├─ footer.njk  
    │  │  ├─ ...  
    │  ├─ _layouts/ (all layouts go in here)  
    │  │  ├─ default.njk  
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
Add "layout: default.njk" to YAML frontmatter.  

    ---
    layout: default.njk
    title: About Qualys
    ...
    ___

### Add component support
Add the following line below the YAML frontmatter.  

    {%- from "component.njk" import  component -%}

### Update CSS block
Replace

    {{#append "styles"}}
    <link rel="stylesheet" href="index.css">
    {{/append}}

with

    {% layoutblock 'appendStyles' %}
    <link  rel="stylesheet"  href="index.css">
    {% endlayoutblock %}

  
### Update JS block
Replace

    {{#append "scripts"}}
    <script src="company.js"></script>
    {{/append}}

with

    {% layoutblock 'appendScripts' %}
    <script  src="company.js"></script>
    {% endlayoutblock %}

  
### Update Handlebars "Partial" references
When you see a reference to a partial like this

    {{> vendor/vimeo-player }}

Copy the partial code into a new file under _includes, e.g. /src/_includes/vimeo-player.njk  
Replace the Handlebars reference as follows

    {% include "vimeo-player.njk" %}

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

### Replace Handlebars partials that pass parameters with Nunjuncks components
For example, if you encounter a partial like the one below

    {{>
    default-hero
    color="red"
    title="About Qualys."
    subheading="The leading provider of information security and compliance cloud solutions."
    background="about-us-hero-desktop.jpg"
    squarePartial="company/square.njk"
    squareBaseline=true
    }}

  

copy the partial code into an include file and replace the partrial reference as follows:

    {{ component('default-hero', {
    href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.2/swiper-bundle.min.css',
    color: "red",
    title: "About Qualys.",
    subheading: "The leading provider of information security and compliance cloud solutions."
    background: "about-us-hero-desktop.jpg",
    squarePartial: "company/square.njk"
    squareBaseline: true
    }) }}

 
