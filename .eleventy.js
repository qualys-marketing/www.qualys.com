const inspect = require("util").inspect;
const PostCSSPlugin = require("eleventy-plugin-postcss");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src", {
		//debug: true,
		filter: [
			"404.html",
			"_redirects",
			"_headers",
			".well-known/**/*",
			"favicon*",
			"apple-touch*",
			"mask-icon.svg",
			"robots.txt",
			"**/*.css",
			"**/*.js",
			"**/*.json",
			"!**/*.11ty.js",
			"!**/*.11tydata.js",
		]
	});

	// Copy static folder
	eleventyConfig.addPassthroughCopy("src/asset");

	eleventyConfig.setServerPassthroughCopyBehavior("copy");

	// tell 11ty which files to process and which files to copy while maintaining directory structure
	// eleventyConfig.setTemplateFormats(["md","html","njk"]);

	// Run me after the build ends
	eleventyConfig.on('eleventy.after', async () => {

	});

	eleventyConfig.addPlugin(PostCSSPlugin);

	eleventyConfig.ignores.add("src/404.html");

	// Values can be static:
	eleventyConfig.addGlobalData("myStatic", "static");
	// functions:
	eleventyConfig.addGlobalData("myFunction", () => new Date());

	eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);

	eleventyConfig.addFilter('markdown', function(value) {
		let markdown = require('markdown-it')({
			html: true
		});
		return markdown.render(value);
	});

  eleventyConfig.addFilter('jsonStringify', function(value, replacer, space) {
    if (value && value.replacer) {
      // allow the data to provide it's own replacer
      replacer = value.replacer;
    }

	  return JSON.stringify(value, replacer, space);
	});

	// add support for blocks
    eleventyConfig.addShortcode('renderlayoutblock', function(name) {
        //return (this.page.layoutblock || {})[name] || '';
        var blockContent = '';
        if (this.page.layoutblock && this.page.layoutblock[name]) {
            blockContent = this.page.layoutblock[name];
        }
        return blockContent;
    });

    eleventyConfig.addPairedShortcode('layoutblock', function(content, name) {
        if (!this.page.layoutblock) {
            this.page.layoutblock = {};
        }
        this.page.layoutblock[name] = content;
        return '';
    });

	eleventyConfig.setServerOptions({
		// Whether DOM diffing updates are applied where possible instead of page reloads
    	domDiff: false,
	});

	return {
		dir: {
			input: "src",
			output: "www",
			// ⚠️ These values are both relative to your input directory.
			includes: "_includes",
			layouts: "_layouts",
		}
	}
};
