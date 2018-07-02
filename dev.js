/*
	圧縮用
*/
console.log('dev.js');

// Mod
const fs = require('fs');
const UglifyES = require('uglify-es');

const str_script = fs.readFileSync('./index.mjs', 'utf8');
const {code, error} = UglifyES.minify(str_script, {
	toplevel: false
});
fs.writeFileSync('./index.min.mjs', code);
console.log('	compressed');
