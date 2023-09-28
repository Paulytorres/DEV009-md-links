const path = require('path');

function fn_isMarkdownFile(filePath){
    const markdownExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const ext = path.extname(filePath);
    return markdownExtensions.includes(ext.toLowerCase());
  }

  module.exports = {
    fn_isMarkdownFile
}