const path = require('path');
const { mdLinks } = require('../index.js'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo mdLinks.js

describe('mdLinks', () => {
  it('debería resolver si el archivo existe y es de tipo Markdown', () => {
    const filePath = '../DEV009-md-links/docs/01-milestone.md'; // Ruta al archivo de prueba
    return expect(mdLinks(filePath)).resolves.toBe('');
  });
  it('debería rechazar con un error si el archivo no existe', () => {
    const filePath = '../DEV009-md-links/docs/noExiste.md';
    return expect(mdLinks(filePath)).rejects.toMatch('no existe');
  });

  it('debería rechazar con un error si el archivo no es de tipo Markdown', () => {
    const filePath = '../DEV009-md-links/docs/01-milestone.jpg'; // Puedes usar un archivo con una extensión no compatible
    return expect(mdLinks(filePath)).rejects.toMatch('no es de tipo Markdown');
  });
});
