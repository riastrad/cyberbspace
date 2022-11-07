"use strict";

let visibleFootnote = null;

// add the onclick event listener to the body
document.body.addEventListener("click", (e) => {
  // hide currently visible footnotes before doing anything else
  if (visibleFootnote !== null) {
    const previousElement = document.getElementById(visibleFootnote);
    previousElement.style.visibility = "hidden";
    visibleFootnote = null;
  }

  if (e.target.id.includes("fnref")) {
    const textId = e.target.id.replace("ref", "");
    const footnoteText = document.getElementById(textId);
    footnoteText.style.visibility = "visible";
    visibleFootnote = textId;
  }
});
