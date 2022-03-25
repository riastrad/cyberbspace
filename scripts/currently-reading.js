"use strict";

function extractTitlesAndLinks(readingList) {
  const { items } = readingList;
  return items.map((eachBook) => {
    return { title: eachBook.title, url: eachBook.link };
  });
}

function formatTitles(titleList) {
  let titleHTML;
  for (let i = 0; i < titleList.length; i++) {
    const linked = `<a href="${titleList[i].url}">${titleList[i].title}</a>`;
    if (i === 0) {
      titleHTML = linked;
    } else if (i !== 0 && i !== titleList.length - 1) {
      titleHTML += `, ${linked}`;
    } else {
      titleHTML += ` & ${linked}`;
    }
  }
  return titleHTML;
}

function updateCurrentlyReadingSpan(titleHTML) {
  const readingListSpan = document.getElementById("currently-reading");
  readingListSpan.innerHTML = titleHTML;
}

async function driver() {
  fetch("https://api.cyberb.space/oku/rss/collection/SmX9F")
    .then((response) => response.json())
    .then((data) => extractTitlesAndLinks(data))
    .then((titlesAndLinks) => formatTitles(titlesAndLinks))
    .then((titlesHTML) => updateCurrentlyReadingSpan(titlesHTML));
}

driver();
