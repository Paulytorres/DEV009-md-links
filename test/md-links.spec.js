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
    return expect(mdLinks(filePath)).rejects.toMatch('El archivo ', filePath, ' no es de tipo Markdown.');
  });

  it('debería resolver con un array vacío si el archivo no contiene enlaces', () => {
    const filePath = '../DEV009-md-links/docs/01-milestone.md';
    return mdLinks(filePath).then((result) => {
      expect(result).toEqual([]);
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

  it('debería resolver con un array de objetos de enlaces para el archivo de prueba', async() => {
    const filePath = '../DEV009-md-links/docs/prueba.md';
    const pathAbsolute = path.resolve(filePath);
    const links = await mdLinks(filePath);
    expect(links).toEqual([
      {
        file: pathAbsolute,
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: "Markdown",
      },
      {
        file: pathAbsolute,
        href: "https://nodejs.org/",
        text: "Node.js",
      },
      {
        file: pathAbsolute,
        href: "https://nodejs.org/es/",
        text: "Node.js",
      },
      {
        file: pathAbsolute,
        href: "https://developers.google.com/linkroto",
        text: "motor de JavaScript V8 de Chrome",
      }
      ]);
    });

    it('debería resolver con un array de objetos de enlaces para el archivo de prueba con link validados', async () => {
      const filePath = '../DEV009-md-links/docs/prueba.md';
      const pathAbsolute = path.resolve(filePath);
      try {
        const links = await mdLinks(filePath, true);
        expect(links).toEqual([
          {
            file: pathAbsolute,
            href: "https://es.wikipedia.org/wiki/Markdown",
            status: 200,
            text: "Markdown",
            ok: true

          },
          {
            file: pathAbsolute,
            href: "https://nodejs.org/",
            status: 200,
            text: "Node.js",
            ok: true
          },
          {
            file: pathAbsolute,
            href: "https://nodejs.org/es/",
            status: 200,
            text: "Node.js",
            ok: true
          },
          {
            file: pathAbsolute,
            href: "https://developers.google.com/linkroto",
            status: 404,
            text: "motor de JavaScript V8 de Chrome",
            ok: false
          }
        
        ]);
      } catch (error) {
        console.error(error);
      }
      });
    });

  