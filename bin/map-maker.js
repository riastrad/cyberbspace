const fs = require("fs");
const d3 = require("d3-geo", "d3-geo-projection");
const worldData = require("../_data/ne_110m_admin_0_countries.json");

MAP_OUTPUT_DIR = "./_site/places";

module.exports.placemapExists = (location) => {
  const svgPath = `./places/${location}.svg`;
  return fs.existsSync(svgPath);
};

// creates and saves the map, no return value
module.exports.generateLocationMap = (cities, location) => {
  console.log(`[cyberbspace] generating svg map for ${location}`);
  const { lat, lon } = cities[location];

  const graticule = d3.geoGraticule10();
  const projection = d3
    .geoEqualEarth()
    .scale(600)
    .center([lon, lat])
    .translate([344, 168.56]);
  const path = d3.geoPath(projection);

  const mapSvg = `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 688 337.12">
    <g>
      <path d="${path(graticule)}" stroke="#000" fill="none"></path>
      <path d="${path(worldData)}" stroke="#fff" fill="#ccc"></path>
      <circle cx="344" cy="168.56" r="5" stroke-width="2px" stroke="#000" fill="rgba(238, 238, 51, 0.6)" />
      <circle cx="344" cy="168.56" r="15" stroke-width="2px" stroke="#000" stroke-dasharray="5,5" fill="transparent" />
    </g>
  </svg>`;

  console.log("[cyberbspace] creating map file for", location);
  fs.writeFileSync(`${MAP_OUTPUT_DIR}/${location}.svg`, mapSvg, {
    encoding: "utf8",
  });
};

module.exports.generateOverviewMap = async (cities) => {
  console.log(
    `[cyberbspace] generating overview map for ${Object.keys(cities).length} cities.`,
  );

  // If we don't provision our dedicated directory first, then
  // we will throw an error at the end of our build
  if (!fs.existsSync(MAP_OUTPUT_DIR)) {
    fs.mkdirSync(MAP_OUTPUT_DIR);
  }

  const graticule = d3.geoGraticule10();
  const projection = d3
    .geoNaturalEarth1()
    .scale(100)
    .center([0, 0])
    .translate([344, 168.56]);
  const path = d3.geoPath(projection);

  const circlator = d3.geoCircle().radius(1.25).precision(0.5);
  const markers = [];
  for (const city in cities) {
    const circle = circlator.center([cities[city].lon, cities[city].lat]);
    markers.push(
      `<path d="${path(circle())}" stroke="#000" fill="rgba(238,238, 51, 0.6)"></path>`,
    );
  }

  const overviewSvg = `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 688 337.12">
    <g>
      <path d="${path(graticule)}" stroke-width=".5px" stroke="#000" fill="none"></path>
      <path d="${path(worldData)}" stroke="#fff" fill="#ccc"></path>
      <path d="${path({ type: "Sphere" })}" stroke="#000" fill="none"></path>
      ${markers}
    </g>
  </svg>`;

  fs.writeFileSync(`${MAP_OUTPUT_DIR}/all-cities.svg`, overviewSvg, {
    encoding: "utf8",
  });
};
