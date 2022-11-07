const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
  // swap out markdown engines & add support for footnote syntax
  const options = {
    html: true,
    breaks: true,
    linkify: true
  };

  const markdownParser = markdownIt(options).use(markdownItFootnote);
  // fiddle with the default formatting
  markdownParser.renderer.rules.footnote_block_open = () =>
    '<ol class="footnotes-list">\n';
  markdownParser.renderer.rules.footnote_block_close = () => "</ol>\n";
  markdownParser.renderer.rules.footnote_anchor = () => "";

  eleventyConfig.setLibrary("md", markdownParser);

  // This is little trick makes all my css inline (i.e. fast)
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // This is to keep track of all my posts
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/posts\//) !== null;
    });
  });

  // Date formatting stuff
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy.MM.dd");
  });

  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("dateYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });

  // Make sure assets carry through
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("docs");
  eleventyConfig.addPassthroughCopy("scripts");
};
