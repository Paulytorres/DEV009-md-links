const { mdLinks } = require('./index.js');

const filePath = process.argv[2];
const validate = process.argv[3];

mdLinks(filePath, validate)
.then((resolve)=>{
    console.log(resolve)
})
.catch((reject)=>{
    console.log(reject)
})