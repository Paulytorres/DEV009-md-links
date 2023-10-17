const {
    fn_isMarkdownFile,
    extractLinks,
    readMarkdownFile,
    validateLinks,
} = require('../data.js');
const fs = require('fs');
const path = require('path');

describe('Se probarán las funciones puras de mi data.js', () => {
    test('fn_isMarkdownFile debe reconocer extensiones Markdown', () => {
        expect(fn_isMarkdownFile('../DEV009-md-links/docs/04-milestone.md')).toBe(true);
        expect(fn_isMarkdownFile('../DEV009-md-links/docs/thumb.png')).toBe(false);
    });

    test('extractLinks debe extraer los enlaces de un archivo Markdown', async () => {
        const filePath = '../DEV009-md-links/docs/04-milestone.md'; 
        const pathAbsolute = path.resolve(filePath);
        const fileContent = await new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (readErr, content) => {
                if (readErr) {
                    reject(readErr);
                } else {
                    resolve(content);
                }
            });
        });
        const links = extractLinks(fileContent, pathAbsolute);
        expect(links).toEqual([
            {
                "text": "mdlinks-example",
                "href": "https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680",
                "file": pathAbsolute
            },
            {
                "text": "mdlinks-example-validate",
                "href": "https://github.com/Laboratoria/bootcamp/assets/123121338/502cbafc-b4ac-4734-85b3-1734f67af1d3",
                "file": pathAbsolute
            },
            {
                "text": "mdlinks-example-stats",
                "href": "https://github.com/Laboratoria/bootcamp/assets/123121338/910720c6-aa3f-4d08-b076-c1add13c95f1",
                "file": pathAbsolute
            },
            {
                "text": "mdlinks-example-stats-validate",
                "href": "https://github.com/Laboratoria/bootcamp/assets/123121338/9d9971a0-866a-4c64-a890-4c62c3df3700",
                "file": pathAbsolute
            },
            {
                "text": "NPM",
                "href": "https://www.npmjs.com/",
                "file": pathAbsolute
            }
        ]
        );
    });

    test('readMarkdownFile debe leer y extraer los enlaces de un archivo Markdown', (done) => {
        const filePath = '../DEV009-md-links/docs/04-milestone.md';
        const pathAbsolute = path.resolve(filePath);
        readMarkdownFile(pathAbsolute, (error, links) => {
            expect(error).toBeNull();
            expect(links).toHaveLength(5);
            expect(links[0].text).toBe('mdlinks-example');
            expect(links[0].href).toBe('https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680');
            done();
        });
    });

    test('validateLinks debe validar los enlaces correctamente',  async () => {
        const links = [
            {
                "text": "mdlinks-example",
                "href": "https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680",
                "file": ''
            },
        ];
        const validatedLinks = await validateLinks(links);

        validatedLinks.forEach((link) => {
            expect(link.status).toBe(200); 
            expect(link.ok).toBe(true);
        });
    });
    test('validateLinks debe validar los enlaces rotos',  async () => {
        const links = [
            {
                "text": "mdlinks-example",
                "href": "https://github.axs/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680",
                "file": ''
            },
        ];
        const validatedLinks = await validateLinks(links);

        validatedLinks.forEach((link) => {
            expect(link.status).toBe(404); 
            expect(link.ok).toBe(false);
        });
    });
});