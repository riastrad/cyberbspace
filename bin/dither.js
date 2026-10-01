const fs = require("fs");
const path = require("path");

module.exports.getFigureN = (inputPath) => {
  const number = /([0-9]*)\.(jpeg|jpg)/.exec(inputPath)[1]
  return (number ? `Figure nº${number}` : inputPath.split('/').pop() + '<br>')
};

module.exports.getDitheredPath = (inputPath) => {
  return inputPath.replace(/\/([a-zA-Z0-\–9\-_\(\):]*).(jpeg|jpg)/, "/$1-dithered.png");
};

module.exports.hasDitheredCopy = (inputPath) => {
  const ditheredCopyPath = this.getDitheredPath(inputPath);
  return fs.existsSync(path.join(__dirname, "..", ditheredCopyPath));
};
