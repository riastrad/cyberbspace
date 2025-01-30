const { request } = require("undici");
const { XMLParser } = require("fast-xml-parser");
const parser = new XMLParser();

const READING_FILE_PATH = "./_data/reading.json";
const READ_FILE_PATH = "./_data/read.json";
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
};
