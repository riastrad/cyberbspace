const fs = require("fs");
const { request } = require("undici");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

const READING_FILE_PATH = "./_data/books/reading.json";
const READ_FILE_PATH = "./_data/books/have_read.json";
const READING_RSS = "https://oku.club/rss/collection/SmX9F";
const READ_RSS = "https://oku.club/rss/collection/V7jj3";

module.exports.constants = {
  READING_FILE_PATH,
  READ_FILE_PATH,
  READING_RSS,
  READ_RSS,
};

module.exports.fetchBooksFromRSS = async (rss) => {
  const { statusCode, body } = await request(rss);
  if (statusCode >= 400) {
    throw new Error(`[shelflife] failed due to status: ${statusCode}`);
  }

  const rawXML = await body.text();
  let books = parser.parse(rawXML).rss.channel.item;

  // when there's only one book the rss item is an object, not an array
  if (books.length === undefined) books = [books];

  const cleanBooks = books.map((bk) => {
    const book = {
      title: bk.title,
      author: bk["dc:creator"],
      link: bk.link,
    };

    // silly little hack to correctly name date key
    rss.endsWith("SmX9F")
      ? (book.started = bk.pubDate)
      : (book.finished = bk.pubDate);
    return book;
  });
  return cleanBooks;
};

module.exports.bookListsAreSame = (previousList, newlyFetchedList) => {
  const titleAndAuthorFilter = (book) => {
    return { title: book.title, author: book.author };
  };

  const previousTitles = previousList.map(titleAndAuthorFilter);
  const newlyFetchedTitles = newlyFetchedList.map(titleAndAuthorFilter);

  return (
    previousTitles.length === newlyFetchedTitles.length &&
    previousTitles.every((book) =>
      newlyFetchedTitles.some(
        (bk) => book.title === bk.title && book.author === bk.author,
      ),
    )
  );
};

const prependNewBooks = (previousList, newlyFetchedList) => {
  const newBooks = newlyFetchedList.filter(
    (bk) =>
      !previousList.some(
        (prevbk) => bk.title === prevbk.title && bk.author === prevbk.author,
      ),
  );
  console.log(
    "[shelflife] updating data files with new books:",
    newBooks.map((b) => b.title).join(", "),
  );

  previousList.unshift(...newBooks);
  return previousList;
};

module.exports.saveUpdatedList = async (
  previousList,
  newlyFetchedList,
  file_path,
  prepend = true,
) => {
  const newBookList = prepend
    ? prependNewBooks(JSON.parse(previousList), newlyFetchedList)
    : newlyFetchedList;

  await fs.promises.writeFile(file_path, JSON.stringify(newBookList, null, 4), {
    encoding: "utf8",
  });
};
