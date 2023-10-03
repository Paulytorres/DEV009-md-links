const path = require('path');


function fn_isMarkdownFile(filePath){
    const markdownExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const ext = path.extname(filePath);
    return markdownExtensions.includes(ext.toLowerCase());
  }

  function extractLinks(fileContent, filePath) {
    const links = [];
    const regexExp = /\[([a-zA-ZÀ-ÿ0-9-—._:`'"?¿!¡,()\s\u00f1\u00d1]+)]\(http[a-zA-ZÀ-ÿ0-9-@:;!%._/?&\+~#=]{1,250}\)/g;
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
  module.exports = {
    fn_isMarkdownFile, extractLinks,
}