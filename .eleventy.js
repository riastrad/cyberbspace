const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const d3 = require("d3-geo", "d3-geo-projection");
const worldData = require("./_data/ne_110m_admin_0_countries.json");
const cities = require("./_data/cities.json");
const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

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

  // keep a list of unique tags
  eleventyConfig.addFilter("taglist", function (collection) {
    const tags = [];

    for (let i = 0; i < collection.length; i++) {
      tags.push(...collection[i].data.tags);
    }
    const uniqueTags = new Set(tags);
    uniqueTags.delete("post");
    return uniqueTags;
  });

  // This is to keep track of all my posts
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/posts\//) !== null;
    });
  });

  // Generate travel post map SVG
  eleventyConfig.addShortcode("cartographer", (location) => {
    if (!cities[location]) return "";
    const { lat, lon, display_name, url } = cities[location];

    const graticule = d3.geoGraticule10();
    const projection = d3
      .geoEqualEarth()
      .scale(600)
      .center([lon, lat])
      .translate([344, 168.56]);
    const path = d3.geoPath(projection);

    const mapSvg = `<svg width="688" height="337.12" viewBox="0 0 688 337.12">
      <g>
        <path d="${path(graticule)}" stroke="#000" fill="none"></path>
        <path d="${path(worldData)}" stroke="#fff" fill="#ccc"></path>
        <circle cx="344" cy="168.56" r="5" stroke-width="2px" stroke="#000" fill="rgba(238, 238, 51, 0.6)" />
        <circle cx="344" cy="168.56" r="15" stroke-width="2px" stroke="#000" stroke-dasharray="5,5" fill="transparent" />
      </g>
    </svg>`;

    return `
    <div align=center><b>a dispatch from:</b> <a href="${url}">${display_name}</a></div>
     ${mapSvg}
    <br />
     `;
  });

  // Date formatting stuff
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
