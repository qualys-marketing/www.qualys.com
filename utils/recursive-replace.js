/*
This NodeJS script will recursively read files in a folder
and execute a series of search and replace commands.
Set the name of the folder as the value of the "dir" variable.
Run the script as follows: node recursive-replace.js
*/

const fs = require('fs');
const path = require('path');

const walk = dir => {
  try {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        // Recurse into subdir
        results = [...results, ...walk(file)];
      } else {
        // Is a file
        results.push(file);
      }
    });
    return results;
  } catch (error) {
    console.error(`Error when walking dir ${dir}`, error);
  }
};

const edit = filePath => {
  if (filePath.endsWith('hbs')) {
    var oldContent = fs.readFileSync(filePath, {encoding: 'utf8'});

    // REPLACE {{#if class}} with {% if class %}
    var regex = /\{\{#if\s+([a-zA-Z0-9-_\.]+)?\}\}/gi;
    var replaceVal = '{% if $1 %}';
    var newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{/if}} with {% endif %}
    oldContent = newContent;
    regex = /\{\{\/if\}\}/gi;
    replaceVal = '{% endif %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE page.platform with platform
    oldContent = newContent;
    regex = /page\.([a-zA-Z0-9-_]+)?/gi;
    replaceVal = ' $1 ';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{markdown biography}} with {{ biography | markdown | safe }}
    oldContent = newContent;
    regex = /\{\{markdown\s+([a-zA-Z0-9-_\.]+)?\s*\}\}/gi;
    replaceVal = '{% if $1 %}{{ $1 | markdown | safe }}{% endif %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{unless x}} with {% if not x %}
    oldContent = newContent;
    regex = /\{\{#unless\s+([a-zA-Z0-9-_\.@]+)?\s*\}\}/gi;
    replaceVal = '{% if not $1 %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{/unless}} with {% endif %}
    oldContent = newContent;
    regex = /\{\{\/unless\s*\}\}/gi;
    replaceVal = '{% endif %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{@root.site.asset}} with {{site.asset}}
    oldContent = newContent;
    regex = /\{\{@root\.site\.asset\}\}/gi;
    replaceVal = '{{site.asset}}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{{class}}} with {{ class | safe }}
    oldContent = newContent;
    regex = /\{\{\{\s*([a-zA-Z0-9-_]+)?\s*\}\}\}/gi;
    replaceVal = '{{ $1 | safe }}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE @first with loop.first
    oldContent = newContent;
    regex = /@first/gi;
    replaceVal = 'loop.first';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE @index with loop.index
    oldContent = newContent;
    regex = /@index/gi;
    replaceVal = 'loop.index';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{!-- lorem }} with {# lorem #}
    oldContent = newContent;
    regex = /\{\{!([\w\s*\-_/\\'.,:\n]*)?\}\}/gim;
    replaceVal = '{# $1 #}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{> (lookup . 'ctaPartial')}} with {% include ctaPartial %}
    oldContent = newContent;
    regex = /\{\{>\s*\(\s*lookup\s*\.\s*\'([a-zA-Z0-9-_]+)?\'\s*\)\s*\}\}/gi;
    replaceVal = '{% include "$1" %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{> (lookup . 'partial') this }} with {% include partial %}
    oldContent = newContent;
    regex = /\{\{>\s*\(\s*lookup\s*\.\s*\'([a-zA-Z0-9-_]+)?\'\s*\)\s*this\s*\}\}/gi;
    replaceVal = '{% include "$1" %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{> vendor/vimeo-player }} with {% include vendor/vimeo-player.njk %}
    oldContent = newContent;
    regex = /\{\{>\s*([a-zA-Z0-9-_/]+)?\s*\}\}/gi;
    replaceVal = '{% include "$1.njk" %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{> apps/hero-list this}} with {% include apps/hero-list.njk %}
    oldContent = newContent;
    regex = /\{\{>\s*([a-zA-Z0-9-_/]+)?\s*this\s*\}\}/gi;
    replaceVal = '{% include "$1.njk" %}';
    newContent = oldContent.replace(regex, replaceVal);

    /* REPLACE {{> social-list dark=true centered=true}} with
    {% set dark=true centered=true %}
    {% include social-list.njk %} */
    function replacer(match, p1, p2, offset, string) {
      var variablesArray = p2.split(/"\s+/gi);
      variablesArray = variablesArray.filter(n => n);
      var statements = variablesArray.map(function (statement) {
        return `{% set ${statement}" %}`;
      });
      statements = statements.join("\n") + "\n" + `{% include "${p1}.njk" %}`;
      return statements;
    }

    oldContent = newContent;
    regex = /\{\{>\s*([a-zA-Z0-9-_/]+)?\s*([a-zA-Z0-9-_/\.=:"'\s]+)\s*\}\}/gi;
    newContent = oldContent.replace(regex, replacer);

    // REPLACE {{#each items as |child|}} with {% for child in items %}
    oldContent = newContent;
    regex = /\{\{#each\s+([a-zA-Z0-9-_/]+)?\s*as\s*\|\s*([a-zA-Z0-9-_/=:"'\s]+)?\s*\|\s*\}\}/gi;
    replaceVal = '{% for $2 in $1 %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{#each this}} with {% for item in this %}
    oldContent = newContent;
    regex = /\{\{#each\s+([a-zA-Z0-9-_/]+)?\s*\}\}/gi;
    replaceVal = '{% for item in $1 %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{/each}} with {% endfor %}
    oldContent = newContent;
    regex = /\{\{\/each\}\}/gi;
    replaceVal = '{% endfor %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{/append}} with {% endlayoutblock %}
    oldContent = newContent;
    regex = /\{\{\/append\s*\}\}/gi;
    replaceVal = '{% endlayoutblock %}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{lowercase-hyphen title}} with {{ title | lower | replace(" ", "-") }}
    oldContent = newContent;
    regex = /\{\{lowercase-hyphen\s+([a-zA-Z0-9-_/=:"'\s]+)?\s*\}\}/gi;
    replaceVal = '{{ $1 | lower | replace(" ", "-") }}';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{#jsonContext ' with {% set this = }}
    oldContent = newContent;
    regex = /\{\{#jsonContext\s+'/gi;
    replaceVal = '{% set this =';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE ]'}} with ] %}
    oldContent = newContent;
    regex = /\]'\}\}/gi;
    replaceVal = '] %}';
    newContent = oldContent.replace(regex, replaceVal);

    // DELETE {{/jsonContext}}
    oldContent = newContent;
    regex = /\{\{\/jsonContext\s*\}\}/gi;
    replaceVal = '';
    newContent = oldContent.replace(regex, replaceVal);

    // GET LAYOUT AND DELETE {{#extends "default"}}
    oldContent = newContent;
    regex = /\{\{#extends\s+"([a-zA-Z0-9-_/=:"'\s]+)?"\s*\}\}/gi;
    replaceVal = '';
    newContent = oldContent.replace(regex, replaceVal);
    var arr = regex.exec(oldContent);
    var layout = "default";
    if (arr) {
      layout = arr[1];
    }

    // REPLACE date in frontmatter with mydate
    oldContent = newContent;
    regex = /^date:/gmi;
    replaceVal = 'mydate:';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE --- with ---\n{layout}
    oldContent = newContent;
    regex1 = /^---\nlayout/i;
    regex2 = /^---/i;
    replaceVal = '---\nlayout: ' + layout + '.njk';
    if (regex1.exec(oldContent) !== null) {
      // do nothing because we already ran the script
    } else if (regex2.exec(oldContent) !== null) {
      newContent = oldContent.replace(regex2, replaceVal) + oldContent;
    }

    // REPLACE {{#append "meta-tags"}} with {% layoutblock 'appendMeta-layout' %}
    oldContent = newContent;
    regex = /\{\{#append\s+"meta-tags"\}\}/gi;
    replaceVal = `{% layoutblock "appendMeta-${layout}" %}`;
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{#append "styles"}} with {% layoutblock 'appendStyles-default' %}
    oldContent = newContent;
    regex = /\{\{#append\s+"styles"\}\}/gi;
    replaceVal = `{% layoutblock "appendStyles-${layout}" %}`;
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{#append "scripts"}} with {% layoutblock 'appendScripts-default' %}
    oldContent = newContent;
    regex = /\{\{#append\s+"scripts"\}\}/gi;
    replaceVal = `{% layoutblock "appendScripts-${layout}" %}`;
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{#append "hints"}} with {% layoutblock 'appendHints-default' %}
    oldContent = newContent;
    regex = /\{\{#append\s+"hints"\}\}/gi;
    replaceVal = `{% layoutblock "appendHints-${layout}" %}`;
    newContent = oldContent.replace(regex, replaceVal);

    // DELETE {{/extends}}
    oldContent = newContent;
    regex = /\{\{\/extends\s*\}\}/gi;
    replaceVal = '';
    newContent = oldContent.replace(regex, replaceVal);

    // DELETE {{#block "content"}}
    oldContent = newContent;
    regex = /\{\{#block\s+"content"\s*\}\}/gi;
    replaceVal = '';
    newContent = oldContent.replace(regex, replaceVal);

    // DELETE {{#block "prefooter-contents"}}
    oldContent = newContent;
    regex = /\{\{#block\s+"prefooter-contents"\s*\}\}/gi;
    replaceVal = '';
    newContent = oldContent.replace(regex, replaceVal);

    // DELETE {{#block "preheader"}}
    oldContent = newContent;
    regex = /\{\{#block\s+"preheader"\s*\}\}/gi;
    replaceVal = '';
    newContent = oldContent.replace(regex, replaceVal);

    // DELETE {{#block "single-column-content"}}
    oldContent = newContent;
    regex = /\{\{#block\s+"single-column-content"\s*\}\}/gi;
    replaceVal = '';
    newContent = oldContent.replace(regex, replaceVal);

    // DELETE {{/block}}
    oldContent = newContent;
    regex = /\{\{\/block\s*\}\}/gi;
    replaceVal = '';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{ moment page.startTime format="LLLL z" }} with {{ moment }}
    oldContent = newContent;
    regex = /\{\{\s*moment\s+[a-zA-Z0-9\.\-"=_/\s]*\s*\}\}/gi;
    replaceVal = 'MOMENT';
    newContent = oldContent.replace(regex, replaceVal);

    // REPLACE {{jsonStringify items  null 4}} with {{ items | jsonStringify(null, 4) }}
    oldContent = newContent;
    regex = /\{\{\s*jsonStringify\s+([a-zA-Z0-9\.\-"=_/]+)*\s*([a-zA-Z0-9\.\-"=_/]+)*?\s*?([a-zA-Z0-9\.\-"=_/]+)*?\s*\}\}/gi;
    replaceVal = '{{ $1 | jsonStringify($2, $3) }}';
    newContent = oldContent.replace(regex, replaceVal);

    // todo
    // /partials/apps/cmdb-hero-laptop.hbs
    // /partials.laptop.hbs

    // replace file extension from hbs to njk
    // filePath = filePath.replace(".hbs", ".njk");

    fs.writeFileSync(filePath, newContent, {encoding: 'utf-8'});
    console.log(`Edited file: ${filePath}`);
  }
};

const main = () => {
  const dir = 'pages'; // folder name containing files
  const filePaths = walk(dir);
  filePaths.forEach(filePath => edit(filePath));
};

main();
