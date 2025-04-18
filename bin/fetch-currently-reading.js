const fs = require("fs");
const {
  constants,
  fetchBooksFromRSS,
  bookListsAreSame,
  saveUpdatedList,
} = require("./shelf.js");

async function possiblyUpdateReadingFile(books) {
  if (!fs.existsSync(constants.READING_FILE_PATH)) {
    await fs.promises.writeFile(
      constants.READING_FILE_PATH,
      JSON.stringify(books, null, 4),
      {
        encoding: "utf8",
      },
    );
    return;
  }

  const existingReading = await fs.promises.readFile(
    constants.READING_FILE_PATH,
  );

  if (bookListsAreSame(JSON.parse(existingReading), books)) {
    console.log(`[shelflife] no change, leaving file as is.`);
    return;
  }

  await saveUpdatedList(
    existingReading,
    books,
    constants.READING_FILE_PATH,
    (prepend = false),
  );
  console.log(`[shelflife] updated currently reading.`);
}

async function main() {
  const reading = await fetchBooksFromRSS(constants.READING_RSS);
  await possiblyUpdateReadingFile(reading);
}

main()
  .then(() => console.log("[shelflife] check completed successfully "))
  .catch((error) =>
    console.log(`[shelflife] updated failed with error:\n${error}`),
  );
