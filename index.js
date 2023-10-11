const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { fn_isMarkdownFile, extractLinks, readMarkdownFile } = require('./data.js');

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
        } else {
          if (validate) {
            validateLinks(links)
              .then((validatedLinks) => resolve(validatedLinks))
              .catch((validateErr) => reject(validateErr));
          } else {
            resolve(links);
          }
          }
        });
    });
  });
};
function validateLinks(links) {
  const linkPromises = links.map((link) => {
    return axios
      .head(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'false';
        return link;
      })
      .catch((error) => {
        link.status = error.response ? error.response.status : 'N/A';
        link.ok = false;
        return link;
      });
  });

  return Promise.all(linkPromises);
}

module.exports = { mdLinks };