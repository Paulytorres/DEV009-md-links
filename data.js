const path = require('path');
const fs = require('fs');
const axios = require('axios');

function fileExists(filePath) {
  return new Promise((resolve, reject) => {
      const pathAbsolute = path.resolve(filePath);

      fs.access(pathAbsolute, fs.constants.F_OK, (err) => {
          if (err) {
              reject(`El archivo '${filePath}' no existe.`);
          } else {
              resolve();
          }
      });
  });
}
//verifica si el archivo en la ruta proporcionada es un archivo Markdown.
function fn_isMarkdownFile(filePath) {
  const markdownExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const ext = path.extname(filePath);
  return markdownExtensions.includes(ext.toLowerCase());
}
//busca en el contenido del archivo las coincidencias de enlaces Markdown 
//y los almacena en un array de objetos
function extractLinks(fileContent, filePath) {
  const links = [];
  const regexExp =/\[([^\]]+)]\((http[a-zA-ZÀ-ÿ0-9-@:;!%._/?&\+~#=]{1,250})\)/g;
  let match;

  while ((match = regexExp.exec(fileContent)) !== null) {
    links.push({
      text: match[1],
      href: match[2],
      file: path.resolve(filePath),
    });
  }

  return links;
}
//lee el contenido de un archivo Markdown en la ruta proporcionada 
//y llama a un callback con cualquier error que pueda ocurrir durante la lectura de enlaces extraídos.
function readMarkdownFile(filePath, callback) {
  fs.readFile(filePath, 'utf-8', (readErr, fileContent) => {
    if (readErr) {
      callback(`Error al leer el archivo '${filePath}': ${readErr.message}`);
    } else {
      const links = extractLinks(fileContent, filePath);
      callback(null, links);
    }
  });
}

// toma una lista de enlaces y realiza una solicitud HTTP HEAD a cada uno para validar si están activos
function validateLinks(links) {
  const linkPromises = links.map((link) => {
    return axios
      .head(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok = response.status >= 200 && response.status < 400 ? true : false;
        return link;
      })
      .catch((error) => {
        link.status = error.response ? error.response.status : 404;
        link.ok = false;
        return link;
      });
  });

  return Promise.all(linkPromises);
}

module.exports = { fileExists, fn_isMarkdownFile, extractLinks, readMarkdownFile, validateLinks };