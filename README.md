# www.qualys.com
A migration of the Qualys website to Eleventy.

## Instructions for migrating web pages

1. copy and paste hbs, css and js files within a folder
2. delete
{{#extends "default"}}
{{/extends}}
{{#block "content"}}
{{/block}}
3. add "layout: default.njk" to YAML frontmatter
4. replace
{{#append "styles"}}
	<link rel="stylesheet" href="index.css">
{{/append}}

with

{% layoutblock 'appendStyles' %}
    <link rel="stylesheet" href="index.css">
{% endlayoutblock %}

Replace
{{#append "scripts"}}
	{{> vendor/vimeo-player }}
	<script src="company.js"></script>
{{/append}}

with

{% layoutblock 'appendScripts' %}
    <script src="company.js"></script>
{% endlayoutblock %}

Replace

{{> vendor/vimeo-player }}

with

{% include "vimeo-player.njk" %}

Replace

{{#if disableAnimation}} 

with

{% if disableAnimation %} 

{{/if}}

with

{% endif %}

{{> (lookup . 'ctaPartial')}}
with
{% include ctaPartial %}



{{{squareLink}}}
with
{{squareLink}}

{{@root.site.asset}}
with
{{site.asset}}

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

{{ component('default-hero', {
	href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.2/swiper-bundle.min.css',
	color: "red"
	title: "About Qualys."
	subheading: "The leading provider of information security and compliance cloud solutions."
	background: "about-us-hero-desktop.jpg"
	squarePartial: "company/square.njk"
	squareBaseline: true
}) }}

{{!--
with
{#

--}}
with
#}

