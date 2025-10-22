const fs = require("fs");
const { Client, collectPaginatedAPI } = require("@notionhq/client");
const Sharp = require("sharp");

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

const situImgPath = (dateRead, bookTitle) => {
  const year = dateRead.split("-")[0];
  const title = bookTitle
    .toLowerCase()
    .replaceAll(/['’,\.\?\!]/g, "")
    .replaceAll(" ", "-");

  return `/img/books/${year}/${title}.png`;
};

const cleanupDataFields = async (notionResponse) => {
  const cleanBooks = notionResponse.map(async (book) => {
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

    // There are more robust solutions, but an error to help me catch empty rows is
    // a simple guardrail to add for something that only comes up once in a while
    if (!title.title[0]) {
      throw new Error("[DATA ERROR] Data table contains an empty row.");
    } else {
      cleanBook.title = title.title[0].plain_text;
    }
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

    if (cleanBook.finished) {
      const finalPath = await possiblySaveNewSituImage(title, finished, situ);
      if (finalPath) cleanBook.situ = finalPath;
    }
    if (review && review.rich_text.length > 0) {
      //Necessary to stitch rich_text components together like this to preserve any hyperlinks
      cleanBook.review = review.rich_text.reduce((finalText, current) => {
        console.log(`[debug]:${cleanBook.title}:: ${current.type}`);
        if (current.type !== "text") return finalText;
        if (current.href === null) return (finalText += current.plain_text);
        return (finalText += `<a href=\"${current.href}\">${current.plain_text}</a>`);
      }, "");
    }
    if (link && link.url !== null) cleanBook.link = link.url;

    return cleanBook;
  });

  return Promise.all(cleanBooks);
};

const possiblySaveNewSituImage = async (title, finished, situ) => {
  if (!finished || finished.date === null || !title.title) {
    return;
  }

  // In the future, maybe get a bit more clever with update timestamps & image metadata,
  // but for now I'll just skip the work if the file is already in the repo
  const situPath = situImgPath(finished.date.start, title.title[0].plain_text);
  if (fs.existsSync(`.${situPath}`)) {
    console.log(
      `[shelflife] situ image already exists, skipping: .${situPath}`,
    );
    return situPath;
  }

  if (
    !situ ||
    situ.type !== "files" ||
    situ.files.length === 0 ||
    !situ.files[0].file.url
  ) {
    // if there's no image in Notion, we can't pull it down
    return;
  }

  const imgUri = situ.files[0].file.url;

  const rawImage = await fetch(imgUri);
  const image = new Sharp(Buffer.from(await rawImage.arrayBuffer()));
  return image
    .rotate()
    .resize({ height: 500 })
    .toFile(`.${situPath}`)
    .then((info) => {
      console.log(
        `[shelflife] saved new situ image at: .${situPath} (${info.width}x${info.height}, ${info.size / 1000} KB)`,
      );
      return situPath;
    })
    .catch((err) => {
      console.log(`[shelflife] could not save file ${situPath}`);
      throw err;
    });
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

    const finalData = await cleanupDataFields(results);
    return finalData;
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
