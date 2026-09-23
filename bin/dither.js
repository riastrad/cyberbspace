const fs = require("fs");
const path = require("path");

module.exports.getFigureN = (inputPath) => {
  const number = /([0-9]*)\.(jpeg|jpg)/.exec(inputPath)[1]
  return (number) ? `Figure nº${number}` : `${inputPath.split('/').pop()}`
};

module.exports.getDitheredPath = (inputPath) => {
  return inputPath.replace(/\/([a-zA-Z0-9\-_]*).(jpeg|jpg)/, "/dithered-$1.$2");
};

module.exports.hasDitheredCopy = (inputPath) => {
  const ditheredCopyPath = this.getDitheredPath(inputPath);
  return fs.existsSync(path.join(__dirname, "..", ditheredCopyPath));
};
