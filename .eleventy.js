const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const cities = require("./_data/cities.json");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { hasDitheredCopy, getDitheredPath } = require("./bin/dither");
const { generateLocationMap, generateOverviewMap } = require("./bin/map-maker");
const { request } = require("undici");

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

  eleventyConfig.addFilter("books", function (books) {
    if (books.length === 0) {
      return 'nothing... but probably eyeing <a href="https://oku.club/user/riastrad/collection/to-read">one of these</a>.';
    }

    let booklinks;
    for (let i = 0; i < books.length; i++) {
      const linked = `<a href="${books[i].link}">${books[i].title}</a>`;
      if (i === 0) {
        booklinks = linked;
      } else if (i !== 0 && i !== books.length - 1) {
        booklinks += `, ${linked}`;
      } else {
        booklinks += `${books.length > 2 ? "," : ""} & ${linked}`;
      }
    }
    return booklinks;
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
    console.log(`[cyberb] pulling AQI data for ${location}`);
    const { statusCode, body } = await request(
      "https://airnowgovapi.com/reportingarea/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: "latitude=19.0842541&longitude=72.8851751&maxDistance=50",
      },
    );

    if (statusCode !== 200) {
      console.log(`[cyberb] AQI widget failed with error ${statusCode}`);
      return `<table align=center><tr><td>⚠️ failed to retrieve AQI reading for ${location} ⚠️</td></tr></table>`;
    }

    const content = await body.json();
    const { issueDate, time, timezone, aqi } = content[0];

    const widget = `<table align=center>
      <tr>
        <td colspan=2>The last time this site was built the most recent AQI reading was:</td>
      </tr>
      <tr>
        <td style='text-align: center; font-size: 6em;' colspan=2>${aqi}</td>
      </tr>
      <tr>
        <td>date: ${issueDate}</td>
        <td>time: ${time} ${timezone}</td>
      </tr>
    </table>`;

    return widget;
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

  // Date formatting stuff
  eleventyConfig.addFilter("readableBookDate", (dateString) => {
    return DateTime.fromRFC2822(dateString).toFormat("yyyy-MM-dd");
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

  eleventyConfig.addFilter("dateYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });

  // Make sure assets carry through
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("noise");
  eleventyConfig.addPassthroughCopy("docs");
  eleventyConfig.addPassthroughCopy("scripts");
};
