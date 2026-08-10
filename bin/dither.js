const fs = require("fs");
const path = require("path");

module.exports.getDitheredPath = (inputPath) => {
  return inputPath.replace(/\/([a-zA-Z0-9\-_]*).png/, "/dithered-$1.png");
};

module.exports.hasDitheredCopy = (inputPath) => {
  const ditheredCopyPath = this.getDitheredPath(inputPath);
  return fs.existsSync(path.join(__dirname, "..", ditheredCopyPath));
};
