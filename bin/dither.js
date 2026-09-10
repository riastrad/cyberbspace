const fs = require("fs");
const path = require("path");

module.exports.getDitheredPath = (inputPath) => {
  return inputPath.replace(/\/([a-zA-Z0-9\-_]*).jpeg/, "/dithered-$1.jpeg");
};

module.exports.hasDitheredCopy = (inputPath) => {
  const ditheredCopyPath = this.getDitheredPath(inputPath);
  return fs.existsSync(path.join(__dirname, "..", ditheredCopyPath));
};
