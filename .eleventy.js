const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const cities = require("./_data/cities.json");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { hasDitheredCopy, getDitheredPath } = require("./bin/dither");
const { generateLocationMap, generateOverviewMap } = require("./bin/map-maker");

module.exports = function (eleventyConfig) {
  // swap out markdown engines & add support for footnote syntax
  const options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const markdownParser = markdownIt(options).use(markdownItFootnote);
  // fiddle with the default formatting
  markdownParser.renderer.rules.footnote_block_open = () =>
    '<ol class="footnotes-list">\n';
  markdownParser.renderer.rules.footnote_block_close = () => "</ol>\n";
  markdownParser.renderer.rules.footnote_anchor = () => "";

  eleventyConfig.setLibrary("md", markdownParser);

  // make sure dev blogs are visually appealing!
  eleventyConfig.addPlugin(syntaxHighlight);

  // This is little trick makes all my css inline (i.e. fast)
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Process book data
  eleventyConfig.addFilter("readingProgressYear", function (books) {
    const currentYear = DateTime.now().year;

    const booksThisYear = books.filter((book) =>
      book.finished.includes(currentYear),
    );
    return `${booksThisYear.length} ${booksThisYear.length !== 1 ? "books" : "book"}`;
  });

  eleventyConfig.addFilter("booksBeingRead", function (books) {
    if (books.length === 0) {
      return "💀 nothing, nada, zilch 💀";
    }

    let bookButtons, bookPopovers;
    for (let i = 0; i < books.length; i++) {
      const btn = `<button popovertarget="book-card-${i}">${books[i].title}</button>`;
      const pop = `<div id="book-card-${i}" popover>Hello there!</div>`;
      if (i === 0) {
        bookButtons = btn;
      } else if (i !== 0 && i !== books.length - 1) {
        bookButtons += `, ${btn}`;
      } else {
        bookButtons += `${books.length > 2 ? "," : ""} & ${btn}`;
      }
      bookPopovers ? (bookPopovers += pop) : (bookPopovers = pop);
    }
    return bookButtons + bookPopovers;
  });

  // keep a list of unique tags
  eleventyConfig.addFilter("taglist", function (collection) {
    const tags = [];

    for (let i = 0; i < collection.length; i++) {
      tags.push(...collection[i].data.tags);
    }
    const uniqueTags = new Set(tags.sort());
    uniqueTags.delete("post");
    return uniqueTags;
  });

  // This is to keep track of all my posts
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/posts\//) !== null;
    });
  });

  // Generate travel overview map & specific location maps
  eleventyConfig.on("eleventy.after", async () => {
    await generateOverviewMap(cities);
    for (const city in cities) {
      generateLocationMap(cities, city);
    }
  });

  // currently this only returns an HTML widget that
  // shows the aqi for Mumbai, though this could easily be changed
  eleventyConfig.addAsyncShortcode("aqi", async (location) => {
    const fallback = `<table align=center><tr><td>⚠️ failed to retrieve AQI reading for ${location.toUpperCase()} ⚠️</td></tr></table>`;
    return fallback;
  });

  eleventyConfig.addShortcode("cartographer", (location) => {
    if (location === "all") {
      return `<img id="overviewMap" class="svgMap" src="/places/all-cities.svg" />`;
    }

    const { url, display_name } = cities[location];

    const svgImg = `<img class="svgMap" src="/places/${location}.svg" />`;

    return `
    <div align=center><b>a dispatch from:</b> <a href="${url}">${display_name}</a></div>
    ${svgImg}
    <br />
     `;
  });

  // image dithering
  eleventyConfig.addAsyncShortcode("dither", async (filepath) => {
    if (!hasDitheredCopy(filepath)) {
      throw new Error(
        `Cannot create dithering effect for ${filepath} if no dithered twin has been created.`,
      );
    }

    const hoverableHTML = `<div class="dithered-hover">
      <img src="${getDitheredPath(filepath)}" class="blog-pic" />
      <img src="${filepath}" class="blog-pic" />
    </div>`;

    return hoverableHTML;
  });

  eleventyConfig.addFilter("encodeURI", (link) => {
    return encodeURI(link);
  });

  eleventyConfig.addFilter("uppercase", (text) => {
    return typeof text === "string" ? text.toUpperCase() : text;
  });

  // Date formatting stuff
  eleventyConfig.addFilter("readableBookDate", (dateString) => {
    return DateTime.fromFormat(dateString, "yyyy-MM-dd").toFormat(
      "MMM dd, yyyy",
    );
  });

  eleventyConfig.addFilter("bookDateYear", (dateString) => {
    return DateTime.fromFormat(dateString, "yyyy-MM-dd").toFormat("yyyy");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("MMM dd, yyyy");
  });

  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("feedDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toUTC().toISO();
  });

  eleventyConfig.addFilter("reviewFeedDate", (dateString) => {
    return DateTime.fromFormat(dateString, "yyyy-MM-dd").toISO();
  });

  eleventyConfig.addFilter("dateYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });

  // Make sure assets carry through
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("noise");
  eleventyConfig.addPassthroughCopy("docs");
  eleventyConfig.addPassthroughCopy("scripts");
};
