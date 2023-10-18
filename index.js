const path = require('path');
const fs = require('fs');
const { fn_isMarkdownFile, extractLinks, readMarkdownFile, validateLinks } = require('./data.js');

const mdLinks = (filePath, validate = false) => {
  return new Promise((resolve, reject) => {
    const pathAbsolute = path.resolve(filePath);

    fs.access(pathAbsolute, fs.constants.F_OK, (err) => {
      if (err) {
        reject(`El archivo '${filePath}' no existe.`);
        return;
      }

      if (!fn_isMarkdownFile(pathAbsolute)) {
        reject(`El archivo '${filePath}' no es de tipo Markdown.`);
        return;
      }

      readMarkdownFile(pathAbsolute, (readErr, links) => {
        if (readErr) {
          reject(readErr);
        }

        if (validate) {
            validateLinks(links)
              .then((validatedLinks) => resolve(validatedLinks))
              .catch((validateErr) => reject(validateErr));
        }
        
        resolve( links.length === 0 ? [] : links );
          
        });
    });
  });
};

module.exports = { mdLinks };