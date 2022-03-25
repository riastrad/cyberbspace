const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
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
