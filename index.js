const path = require('path');
const fs = require('fs');
const { fn_isMarkdownFile, extractLinks } = require('./data.js');

const mdLinks = (filePath) => {
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
      fs.readFile(pathAbsolute, 'utf-8', (readErr, fileContent) => {
        if (readErr) {
          reject(`Error al leer el archivo '${filePath}': ${readErr.message}`);
          return;
        }

        const links = extractLinks(fileContent, pathAbsolute);

        resolve(links);
      });

    })
  }); 
  }
module.exports = { mdLinks };