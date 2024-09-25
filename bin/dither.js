const dither = require("dither-me-this");
const fs = require("fs");
const path = require("path");

const DITHERING_OPTIONS = {
  errorDiffusionMatrix: "stucki",
  palette: ["#000", "#fff"],
};

async function ditherAndSave(inputPath, outputPath) {
  try {
    const original = await fs.promises.readFile(inputPath);
    const ditheredImage = await dither(original, DITHERING_OPTIONS);
    await fs.promises.writeFile(outputPath, ditheredImage);
  } catch (err) {
    throw err;
  }
}

module.exports.generateDitheredCopy = async (filepath) => {
  if (!filepath.endsWith(".png")) {
    throw new Error(
      "Dithering does not currently work well with non-PNG image formats",
    );
  }

  console.log("[cyberb] creating dithered copy:", filepath);
  try {
    const resolvedInputPath = path.join(__dirname, "..", filepath);
    const resolvedOutputPath =
      module.exports.getDitheredPath(resolvedInputPath);
    await ditherAndSave(resolvedInputPath, resolvedOutputPath);
  } catch (e) {
    throw e;
  }
};

module.exports.getDitheredPath = (inputPath) => {
  return inputPath.replace(/\/([a-zA-Z0-9\-_]*).png/, "/dithered-$1.png");
};

module.exports.hasDitheredCopy = (inputPath) => {
  const ditheredCopyPath = this.getDitheredPath(inputPath);
  return fs.existsSync(path.join(__dirname, "..", ditheredCopyPath));
};
