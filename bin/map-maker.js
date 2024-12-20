const fs = require("fs");
const d3 = require("d3-geo", "d3-geo-projection");
const worldData = require("../_data/ne_110m_admin_0_countries.json");

module.exports.placemapExists = (location) => {
  const svgPath = `./places/${location}.svg`;
  return fs.existsSync(svgPath);
};

// creates and saves the map, no return value
module.exports.generateLocationMap = (cities, location) => {
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
  fs.writeFileSync(`./places/${location}.svg`, mapSvg, { encoding: "utf8" });
};

module.exports.generateOverviewMap = (locations) => {};
