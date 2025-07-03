const fs = require("fs");
const { Client, collectPaginatedAPI } = require("@notionhq/client");

const READING_FILE_PATH = "./_data/books/reading.json";
const READ_FILE_PATH = "./_data/books/have_read.json";
const READING_RSS = "https://oku.club/rss/collection/SmX9F";
const READ_RSS = "https://oku.club/rss/collection/V7jj3";
const NOTION_DATABASES = {
  reading: "1e40ce2f0a7e807e801ae70e08be5ada",
  have_read: "1e40ce2f0a7e80418e05f661d86a8aa1",
};

module.exports.constants = {
  READING_FILE_PATH,
  READ_FILE_PATH,
  READING_RSS,
  READ_RSS,
};

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });

const cleanupDataFields = (notionResponse) => {
  const cleanBooks = notionResponse.map((book) => {
    const cleanBook = {};
    const {
      title,
      author,
      ISBN,
      started,
      finished,
      publisher,
      pages,
      situ,
      review,
      link,
    } = book.properties;

    if (title.title) cleanBook.title = title.title[0].plain_text;
    if (author.select !== null) cleanBook.author = author.select.name;
    if (ISBN.number !== null) cleanBook.isbn = ISBN.number;
    if (started.date !== null) cleanBook.started = started.date.start;
    if (finished && finished.date !== null) {
      cleanBook.finished = finished.date.start;
    }
    if (publisher && publisher.select !== null) {
      cleanBook.publisher = publisher.select.name;
    }
    if (pages && pages.number !== null) {
      cleanBook.pages = pages.number;
    }
    if (situ && situ.rich_text) {
      cleanBook.situ = situ.rich_text[0].plain_text;
    }
    if (review && review.rich_text.length > 0) {
      cleanBook.review = review.rich_text[0].plain_text;
    }
    if (link && link.url !== null) cleanBook.link = link.url;

    return cleanBook;
  });

  return cleanBooks;
};

module.exports.fetchBooksFromNotion = async (tbl) => {
  try {
    const results = await collectPaginatedAPI(notion.databases.query, {
      database_id: NOTION_DATABASES[tbl],
      sorts:
        tbl === "have_read"
          ? [{ property: "finished", direction: "descending" }]
          : [{ property: "started", direction: "descending" }],
    });

    return cleanupDataFields(results);
  } catch (e) {
    console.error(`[shelflife] error retrieving book data for ${tbl}: ${e}`);
  }
};

module.exports.bookListsAreSame = (previousList, newlyFetchedList) => {
  return (
    previousList.length === newlyFetchedList.length &&
    previousList.every((book) =>
      newlyFetchedList.some((bk) =>
        Object.keys(book).forEach((key) => book[key] === bk[key]),
      ),
    )
  );
};

module.exports.saveUpdatedList = async (newlyFetchedList, file_path) => {
  await fs.promises.writeFile(
    file_path,
    JSON.stringify(newlyFetchedList, null, 4),
    {
      encoding: "utf8",
    },
  );
};
