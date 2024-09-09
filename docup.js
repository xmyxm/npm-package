const fs = require('fs');
const path = require('path');

const fileCopy = (readName, writeName) => {
  const src = path.resolve(__dirname, './', readName);
  const docPath = path.resolve(__dirname, './docs', writeName || readName);
  fs.copyFileSync(src, docPath);
};

fileCopy('CHANGELOG.md');
fileCopy('README.md', 'index.md');
