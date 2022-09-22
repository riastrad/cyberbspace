---
layout: post.njk
title: What am I reading?
summary: Quick write up of a tiny addition to the homepage
date: 2022-04-10 19:00:00
tags:
  - post
  - development
  - web
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

## What is this about?

A couple weeks ago, on a lark, I decided to see if I could have the main landing page of this website dynamically update to reflect whatever book I'm currently reading.

Partly inspired by the fact that I started to use [Oku](https://oku.club) - a neat little minimalist app, to track what I'm reading, want to read, and have read - and partly because I had some time between jobs and I needed a discrete little project to occupy myself for a day.

The resulting feature is a small one. I added an additional sentence in the copy of this site's landing page that will display any book I've marked within Oku as "currently reading."

<div><img src="/img/blog/2022/currently-reading-annotated-photo.png" class="blog-pic container" /></div>

## But, how?

I had basically three requirements for the feature:

1. The client-side JavaScript should be as minimal as possible. It's the first JavaScript I've introduced on my site and I don't want to overdo it.
2. I want to display the titles of books and link to them.
3. There can be N number of books at any one time.

### Step 1: RSS ⟶ API

Oku is built by a small engineering team and doesn't currently have any public facing APIs available to query directly. But they do have [RSS feeds](https://oku.club/blog/oku-has-rss-feeds) for any publicly viewable collection on their website. "Collection" is the app's term for an arbitrary grouping of books, either the defaults of "Read," "Want to Read," or "Currently Reading" or any collection made by a user (e.g. "Sitting on My Shelf and Staring at Me," "DNF", &c.).

My initial thought was to write some quick JavaScript to query the RSS feed directly, parse it, and update the landing page. However, the Oku team has good security practices and I wasn't able to do this because of cross-origin resource sharing (aka "CORS") restrictions. This was a minor setback, and also saved me from having to decide how I would parse the feed XML in the Browser.

Ultimately, the project's scope expanded ever so slightly and I ended up writing a [lightweight](https://github.com/riastrad/api.cyberb.space/blob/d9a64c4127e560299c15b093a602e43528dde1dc/server.js#L32-L37) [API](https://github.com/riastrad/api.cyberb.space/blob/d9a64c4127e560299c15b093a602e43528dde1dc/middleware/finalizeJSONResponse.js#L3-L34) and hosting it as a Digital Ocean app.

### Step 2: JavaScript

Once `api.cyberb.space` was up and running, adding the script to the page was pretty straightforward. Using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), I query the API for my currently reading collection, I receive a JSON object in response, then I pull out the title and link data, slap some HTML on it, and update the contents of the `.currently-reading` HTML element on my main page.

The flow ends up looking like this:

```js
async function driver() {
  fetch("https://api.cyberb.space/oku/rss/collection/SmX9F")
    .then((response) => response.json())
    .then((data) => extractTitlesAndLinks(data))
    .then((titlesAndLinks) => formatTitles(titlesAndLinks))
    .then((titlesHTML) => updateCurrentlyReadingSpan(titlesHTML));
}
```

Full code is available [here](https://github.com/riastrad/cyberbspace/blob/main/scripts/currently-reading.js). One fun little detail about this final implementation is that because of how lightweight I keep my website (no custom fonts, inline CSS, and a few other small design decisions). My full site loads fast enough that you can actually see when the JavaScript runs and the placeholder text is updated.

## And so.

This was a fun little project. Did I learn anything new? Not really. But I do like seeing these titles updated with whatever I'm reading at given time.

I'm overdue for a redesign of the homepage and I have some ideas in mind. Regardless, I'll probably incorporate this little feature into whatever changes I make.

As a sort of post script, you should [consider using Oku](https://oku.club/join?invitedBy=riastrad&inviteCode=gCrkDet)! It's nice and uncluttered and the team building it is adamant that they don't want to rely on ad-based revenue to keep it going, which is really refreshing in this day and age.
