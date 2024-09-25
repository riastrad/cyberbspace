const { globSync } = require("glob");
const { generateDitheredCopy, hasDitheredCopy } = require("./dither");

async function main() {
  const imgPaths = globSync("./img/blog/**/*.png");

  for (const pathToImg of imgPaths) {
    if (pathToImg.includes("dithered") || hasDitheredCopy(pathToImg)) {
      console.log("[cyberb] skipping img:", pathToImg);
      continue;
    }
    await generateDitheredCopy(pathToImg);
  }
}

main().then(() => {
  console.log("[cyberb] dithering complete");
});
