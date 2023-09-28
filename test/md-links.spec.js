const path = require('path');
const { mdLinks } = require('../index.js'); 

describe('mdLinks', () => {
  it('debería resolver si el archivo existe y es de tipo Markdown', () => {
    const filePath = '../DEV009-md-links/docs/01-milestone.md'; 
    return expect(mdLinks(filePath)).resolves.toBe('');
  });
  it('debería rechazar con un error si el archivo no existe', () => {
    const filePath = '../DEV009-md-links/docs/noExiste.md';
    return expect(mdLinks(filePath)).rejects.toMatch('no existe');
  });

  it('debería rechazar con un error si el archivo no es de tipo Markdown', () => {
    const filePath = '../DEV009-md-links/docs/01-milestone.jpg'; 
    
    return expect(mdLinks(filePath)).rejects.toMatch('no es de tipo Markdown');
  });
});
