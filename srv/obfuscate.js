// obfuscate.js
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const sourceFilePath = path.join(__dirname, 'path-to-your-source-file.js');
const outputFilePath = path.join(__dirname, 'path-to-output-file.js');

const code = fs.readFileSync(sourceFilePath, 'utf8');

const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
  compact: true,
  controlFlowFlattening: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  deadCodeInjection: true,
  renameGlobals: true
}).getObfuscatedCode();

fs.writeFileSync(outputFilePath, obfuscatedCode);
console.log('Obfuscation complete.');
