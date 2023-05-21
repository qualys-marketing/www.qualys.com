/* 
This NodeJS script will recursively read files in a folder 
and execute a series of search and replace commands.
Run it as follows: node recursive-replace.js
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
  var oldContent = fs.readFileSync(filePath, {encoding: 'utf8'});

  // REPLACE {{#if class}} with {% if class %}
  var regex = /\{\{#if\s+([a-zA-Z0-9-_]+)?\}\}/gi;
  var replaceVal = '{% if $1 %}';
  var newContent = oldContent.replace(regex, replaceVal);

  // REPLACE {{/if}} with {% endif %}
  oldContent = newContent;
  regex = /\{\{\/if\}\}/gi;
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

  // REPLACE {{!-- with {#
  oldContent = newContent;
  regex = /\{\{!--/gi;
  replaceVal = '{#';
  newContent = oldContent.replace(regex, replaceVal);

  // REPLACE --}} with #}
  oldContent = newContent;
  regex = /--\}\}/gi;
  replaceVal = '#}';
  newContent = oldContent.replace(regex, replaceVal);

  // REPLACE {{> (lookup . 'ctaPartial')}} with {% include ctaPartial %}
  oldContent = newContent;
  regex = /\{\{>\s*\(\s*lookup\s*\.\s*\'([a-zA-Z0-9-_]+)?\'\s*\)\s*\}\}/gi;
  replaceVal = '{% include $1 %}';
  newContent = oldContent.replace(regex, replaceVal);

  // REPLACE {{> vendor/vimeo-player }} with {% include vendor/vimeo-player.njk %}
  oldContent = newContent;
  regex = /\{\{>\s*([a-zA-Z0-9-_/]+)?\s*\}\}/gi;
  replaceVal = '{% include $1.njk %}';
  newContent = oldContent.replace(regex, replaceVal);

  // REPLACE {{> apps/hero-list this}} with {% include apps/hero-list.njk %}
  oldContent = newContent;
  regex = /\{\{>\s*([a-zA-Z0-9-_/]+)?\s*this\s*\}\}/gi;
  replaceVal = '{% include $1.njk %}';
  newContent = oldContent.replace(regex, replaceVal);

  // REPLACE {{> social-list dark=true centered=true}} with {% include social-list.njk dark=true centered=true %}
  oldContent = newContent;
  regex = /\{\{>\s*([a-zA-Z0-9-_/]+)?\s*([a-zA-Z0-9-_/=:"\'\s]+)\s*\}\}/gi;
  replaceVal = '{% include $1.njk $2 %}';
  newContent = oldContent.replace(regex, replaceVal);

  // replace file extension from hbs to njk
  // filePath = filePath.replace(".hbs", ".njk");

  fs.writeFileSync(filePath, newContent, {encoding: 'utf-8'});
  console.log(`Edited file: ${filePath}`);
};

const main = () => {
  const dir = 'files';
  const filePaths = walk(dir);
  filePaths.forEach(filePath => edit(filePath));
};

main();