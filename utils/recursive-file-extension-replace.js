/* 
This NodeJS script will recursively read files in a folder 
and rename the file extension.
Set the old file extensions in the regex line
Set the new file extension in the "newExtension" variable.
Set the path to the folder in the "foundFiles" variable.
Run the script as follows: node recursive-file-extension-replace.js
*/

'use strict';

const path = require('path');
const fs = require('fs');

const listDir = (dir, fileList = []) => {

    let files = fs.readdirSync(dir);
	let newExtension = "njk";

    files.forEach(file => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = listDir(path.join(dir, file), fileList);
        } else {
            if(/\.hbs$/.test(file)) {
                let name = file.split('.')[0].replace(/\s/g, '_') + '.' + newExtension;
                let src = path.join(dir, file);
                let newSrc = path.join(dir, name);
                fileList.push({
                    oldSrc: src,
                    newSrc: newSrc
                });
            }
        }
    });

    return fileList;
};

let foundFiles = listDir( './partials');
foundFiles.forEach(f => {
   fs.renameSync(f.oldSrc, f.newSrc); 
});