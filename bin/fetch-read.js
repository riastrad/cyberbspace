const fs = require("fs");
const {
  constants,
  fetchBooksFromRSS,
  bookListsAreSame,
} = require("./shelf.js");

async function possiblyUpdateReadFile(books) {
  if (!fs.existsSync(constants.READ_FILE_PATH)) {
    await fs.promises.writeFile(
      constants.READ_FILE_PATH,
      JSON.stringify(books, null, 4),
      {
        encoding: "utf8",
      },
    );
    return;
  }

  const existingReading = await fs.promises.readFile(constants.READ_FILE_PATH);
  if (bookListsAreSame(JSON.parse(existingReading), books)) {
    console.log(`[shelflife] no change, leaving file as is.`);
    return;
  }

  await fs.promises.writeFile(
    constants.READ_FILE_PATH,
    JSON.stringify(books, null, 4),
    { encoding: "utf8" },
  );
  console.log(`[shelflife] updated read books.`);
}

async function main() {
  const reading = await fetchBooksFromRSS(constants.READ_RSS);
  await possiblyUpdateReadFile(reading);
}

main()
  .then(() => console.log("[shelflife] check completed successfully "))
  .catch((error) =>
    console.log(`[shelflife] updated failed with error:\n${error}`),
  );
