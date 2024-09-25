const dither = require("dither-me-this");
const fs = require("fs");
const path = require("path");

const ELEVENTY_OUTPUT_DIR = "_site/";
const DITHERING_OPTIONS = {
  errorDiffusionMatrix: "stucki", // current favorite "stucki"
  palette: ["#000", "#fff", "#FFFF33"],
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
    const relativeOutputPath = filepath.replace(
      /\/([a-zA-Z0-9\-_]*).png/,
      "/dithered-$1.png",
    );
    const resolvedInputPath = path.join(__dirname, "..", filepath);
    const resolvedOutputPath = path.join(
      __dirname,
      "..",
      ELEVENTY_OUTPUT_DIR,
      relativeOutputPath,
    );
    await ditherAndSave(resolvedInputPath, resolvedOutputPath);
    return relativeOutputPath;
  } catch (e) {
    throw e;
  }
};
