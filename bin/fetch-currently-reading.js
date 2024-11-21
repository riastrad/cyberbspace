const fs = require("fs");
const { request } = require("undici");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

const READING_FILE_PATH = "./_data/reading.json";
const READING_RSS = "https://oku.club/rss/collection/SmX9F";

async function fetchCurrentlyReading() {
  const { statusCode, body } = await request(READING_RSS);
  if (statusCode >= 400) {
    throw new Error(`[shelflife] failed due to status: ${statusCode}`);
  }

  const rawXML = await body.text();
  const books = parser.parse(rawXML).rss.channel.item;
  const cleanBooks = books.map((bk) => {
    return {
      title: bk.title,
      author: bk["dc:creator"],
      link: bk.link,
      started: bk.pubDate,
    };
  });
  return cleanBooks;
}

async function possiblyUpdateReadingFile(books) {
  if (!fs.existsSync(READING_FILE_PATH)) {
    await fs.promises.writeFile(
      READING_FILE_PATH,
      JSON.stringify(books, null, 4),
      {
        encoding: "utf8",
      },
    );
    return;
  }

  const existingReading = await fs.promises.readFile(READING_FILE_PATH);
  if (JSON.stringify(books, null, 4) === existingReading.toString()) {
    console.log(`[shelflife] no change, leaving file as is.`);
    return;
  }

  await fs.promises.writeFile(
    READING_FILE_PATH,
    JSON.stringify(books, null, 4),
    { encoding: "utf8" },
  );
  console.log(`[shelflife] updated currently reading.`);
}

async function main() {
  const reading = await fetchCurrentlyReading();
  await possiblyUpdateReadingFile(reading);
}

main()
  .then(() => console.log("[shelflife] check completed successfully "))
  .catch((error) =>
    console.log(`[shelflife] updated failed with error:\n${error}`),
  );
