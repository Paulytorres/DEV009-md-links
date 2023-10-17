const path = require('path');
const { mdLinks } = require('../index.js'); 

describe('mdLinks', () => {
  it('debería resolver si el archivo existe y es de tipo Markdown', () => {
    const filePath = '../DEV009-md-links/docs/01-milestone.md'; 
    return expect(mdLinks(filePath)).resolves.toEqual(Array()); 
  });
  it('debería rechazar con un error si el archivo no existe', () => {
    const filePath = '../DEV009-md-links/docs/noExiste.md';
    return expect(mdLinks(filePath)).rejects.toMatch('no existe'); //para comprobar que una cadena coincide con una expresión regular
  });

  it('debería rechazar con un error si el archivo no es de tipo Markdown', () => {
    const filePath = '../DEV009-md-links/docs/01-milestone.jpg'; 
    
    return expect(mdLinks(filePath)).rejects.toMatch('no es de tipo Markdown');
  });
});

it('debería resolver con un array de objetos de enlaces', () => {
  const filePath = '../DEV009-md-links/docs/04-milestone.md';
  return mdLinks(filePath).then((result) => {
    expect(result).toBeInstanceOf(Array);

    result.forEach((link) => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('file');
    });
  });
});