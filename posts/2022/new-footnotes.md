---
layout: post.njk
title: Cyberb-pages Get a Pedicure
summary: Quick show and tell about the site's newest little feature
date: 2022-11-06 20:35:00
tags:
  - post
  - development
  - web
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

## The Background

When I first set up this personal site way back in 2018, I posted a blog about the process (ref. [Re:Design](/posts/2018/re-design.md)). I also made a list of the things that I wasn't happy about. Among those were the fact that adding footnotes to a post was clunky and involved typing inline HTML to the body of the post. I've been thinking about how to improve not just the experience of writing with footnotes (for myself) but also the experience of interacting with a footnote (for you, the reader).

## The Plan

I had a couple ideas floating around in my head about what the end result should look like. First: I wanted to be able to insert footnotes into my blogs without any HTML. While writing, this just feels more ergonomic. Second: I wanted footnotes to appear alongside the part of the blog you were at when you clicked the footnote[^1]. Finally: I wanted the experience of clicking on a footnote link to be the same on desktop and mobile.

## A Quick Note on My Own Naïveté

I will admit that in addition to the other criteria I've listed above, I also had this vague notion that it would be cool to do the whole thing in pure CSS. I think this was mostly due to a persistent[^2] misunderstanding on my part about the primary role that CSS serves. I like to keep my pages as free from JavaScript as possible because I find it keeps things, on the whole cleaner. But alas, in my reading of CSS docs, I was forced to acknowledge that CSS is here to _style_ and any feature that requires _nuanced interactivity_ will require me to write a little JavaScript.

## Footnotes in Markdown

When researching how I could update my [11ty](https://www.11ty.dev/) config to include support for parsing markdown [footnote syntax](https://www.markdownguide.org/extended-syntax/#footnotes), I was fortunate enough to stumble across [this blog from Al Power](https://www.alpower.com/tutorials/configuring-footnotes-with-eleventy). I followed Al's recommendations almost exactly, with some slight modifications[^3] to suit the style of my site and the interactivity.

Here's what my config update looked like[^4]:

```js
const markdownParser = markdownIt(options).use(markdownItFootnote);

// fiddle with the default formatting
markdownParser.renderer.rules.footnote_block_open = () =>
  '<ol class="footnotes-list">\n';
markdownParser.renderer.rules.footnote_block_close = () => "</ol>\n";
markdownParser.renderer.rules.footnote_anchor = () => "";

eleventyConfig.setLibrary("md", markdownParser);
```

I was a little bit wary of swapping out the markdown engine that 11ty uses wholesale, but `markdown-it` is open source, well maintained, and I confirmed it didn't break any of my existing pages before rolling with it.[^5]

## Interacting with Footnotes

Supporting markdown style footnotes turned out to be simple, the trickiest part of this feature turned out to be the interactivity of the footnotes. But first, let's talk about style.

### Styling

For styling, I didn't want the footnotes to appear unless they had been clicked on. So the first thing to do was make every element of the `.footnote-item` class be hidden. I also wanted to make sure that each footnote would be fixed to the bottom of the browser's viewport and stay centered with an appropriate width.

Unfortunately, because I was using fixed positioning, I wasn't able to rely on my base.css that typically keeps things in a nice responsive container depending on the device that's been loaded.

Here's what the final CSS ended up looking like[^6]:

```css
.footnote-item {
  z-index: 998;
  margin: 0px auto; /* next 3 lines center the div */
  left: 0;
  right: 0;
  background: white;
  outline: #000 solid 0.1em;
  padding: 0.5em;
  box-shadow: 0.5em 0.5em #ee3;
  position: fixed;
  bottom: 2em;
  max-width: 80vw;
  visibility: hidden;
}

/* For devices larger than 700px */
@media (min-width: 700px) {
  .footnote-item {
    width: 60vw;
  }
}
```

The media query is necessary because I noticed that things were looking a bit wonky between desktop and mobile viewports, and I wanted to follow the pattern that I had set in `base.css`[^7].

### Interactivity

Once I had the style right, the only remaining piece was to add the interactivity that would make a footnote item appear when it's reference was clicked and disappear when I clicked anywhere else. Like any feature, there are multiple ways I could have tackled this. I could have queried the body of the DOM for all `footnote-ref` elements and then added an `onclick` function - but this didn't help me with the "unselecting" action when a user clicks a second time.

In the end, I went with the most straightforward approach I could think of: an event listener on the whole `body` element of the page. If I get a footnote reference, I flip the related `footnote-item`'s `visibility` to `visible`. To make any selected items invisible after another click, I used a global variable to keep track of which element (if any) has been previously selected and flip it's `visibility` to `hidden`.

Here's what all of that looks like in code:

```js
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
```

I'm mostly happy with how this turned out. I think my new rule might not be that I shouldn't use JavaScript on my pages _at all_. Rather, if I do, I'll do my best to only use vanilla JavaScript[^8] with my implementations.

## Final Thoughts

It feels good to finally tackle this feature I've been thinking about for the past four years. I honestly don't know why it took me this long. I also have to say, as someone whose work has been primarily focused on backend problems the past few years, it feels good to dig into some front end fundamentals[^9].

Okay, that's all of the words I have on this for now. Hope you like footnotes! You'll be seeing a lot of them in future posts :]

[^1]: This is personal preference, but I find jumping back and forth from the middle of an article to the bottom of a page a bit disorienting - especially the return trip if the anchor links aren't working quite right.
[^2]: Maybe _willful_?
[^3]: Yes, I am aware that I sound like a comment on a recipe blog here.
[^4]: To be clear, all of my updates to the renderer are only stripping out additional HTML that I did not need or want.
[^5]: I also realized that 11ty uses `markdown-it` as [it's default markdown renderer](https://www.11ty.dev/docs/languages/markdown/) while I was writing this blog. Such is life.
[^6]: It might seem like an excessive amount of rules for what I wanted to do, but I actually ended up removing a lot of unused CSS because of these updates. Overall I count it as a net positive.
[^7]: Which I initially stole from [skeleton.css](http://getskeleton.com/)
[^8]: Within reason, _obviously_. I'm not going to write my own DOM every time I want to interact with elements on the page.
[^9]: Honestly, it takes me back to being 14 and editing a MySpace page. It's experiential learning in the name of a fun little thing for myself.
