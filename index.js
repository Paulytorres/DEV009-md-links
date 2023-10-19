const path = require('path');
const fs = require('fs');
const { fn_isMarkdownFile, readMarkdownFile, validateLinks } = require('./data.js');

const mdLinks = (filePath, validate) => {
  return new Promise((resolve, reject) => {
    const pathAbsolute = path.resolve(filePath);
    fs.access(pathAbsolute, fs.constants.F_OK, (err) => {
      if (err) {
        reject('El archivo '+ pathAbsolute +' no existe.');
        return;
      } else {
        if (!fn_isMarkdownFile(pathAbsolute)) {
          reject('El archivo '+ pathAbsolute+ ' no es de tipo Markdown.');
          return;
        } else {
          readMarkdownFile(pathAbsolute, (readErr, links) => {
            if (readErr) {
              reject(readErr);
              return;
            }
            if (validate) {
              validateLinks(links)
                .then((validatedLinks) => resolve(validatedLinks))
                .catch((validateErr) => reject(validateErr));
            } else {
              resolve(links.length === 0 ? 'no se encontraron links' : links);
            }
          });
        }
      }
    });
  });
}; 
module.exports = { mdLinks };