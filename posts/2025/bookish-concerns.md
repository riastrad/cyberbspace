---
layout: post.njk
title: Bookish Concerns
summary: Notes on migrating my reading data to Notion
date: 2025-05-02 16:00:00+5:30
tags:
  - post
  - web
  - development
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

This is bit of a follow-up to [a previous note](/notes/2025/shelf-life).

The past month or so I've been traveling and receiving a lot of writing rejections. A tricky combination for getting quality writing done. One side effect of this is that I have been tinkering with my website a bit more.

<img class="blog-pic" src="/img/blog/2025/bookish-1.png" />
<div class="center-text"><small>The current state of my digital bookshelf.</small></div><br />

Specifically, I've been thinking about how limiting it is to depend on the incomplete and inaccurate data from my reading app to display reading information on this website.

My needs are simple. I want my website be able to pull book information and additional reading data (dates, reviews, &c.) from a central source of truth that I can update easily from my phone. A [home-cooked meal](https://www.robinsloan.com/notes/home-cooked-app/), but I'm fine using some ready-made mixes.

Preferably, this source of truth would give me more control over data types, structure, and content. And basically be as close to a spreadsheet that I can download and/or move around whenever I need to move house.[^1]

## Notional Work

Ultimately, I opted to move all my reading data to Notion and pull it via the platform's developer APIs. This is not a plug for the Notion platform. I selected it primarily because it saved me the trouble of building out my own UI or — God forbid — having to edit a Google sheet on my phone. That being said, aside from the fact that it's robust data fields feel unnecessarily complex for my needs, putting data into Notion and then pulling it out was an incredibly straightforward process.

<img class="blog-pic" src="/img/blog/2025/bookish-2.png" />
<div class="center-text"><small>An overview screenshot of my private Notion integration.</small></div><br />

The largest upfront cost — in terms of precious moments of my finite life — of this project was pulling together my reading data and cleaning it up. I've known since I got off of GoodReads and moved to Oku that my reading data has been incomplete or incorrect. I saved I had to merge and standardize two clunky data sets and convert them to a CSV file This involved some [messy scripting](https://gist.github.com/riastrad/76cf1f25731ced7f6c48134ee583bfce) I don't care to discuss too in-depth.

After I got everything into one place, there was still the need to do some manual cleanup. Gaps in the data that needed to be filled with the help of [my physical records](/notes/2022/a-notational-universe/). Once I had everything clean enough, I uploaded my csv to Notion, created an API integration for my personal workspace, and tweaked my github workflow to pull the data and restructure it.[^2]

<img class="blog-pic" src="/img/blog/2025/bookish-3.png" />
<div class="center-text"><small>Here's what the database looks like in Notion's desktop app</small></div><br />

Now I'm in a great place where — even though everything is still a bit incomplete and haphazard — I can edit the data directly and within a few hours any changes I make will also propagate over to this website.

## Final thoughts

As I mentioned, this current state is good, but it is not perfect. The main positive I gain from this is near complete control over my data. The biggest negative is that I'm [currently hardcoded to the data structure of Notion's API responses](https://github.com/riastrad/cyberbspace/blob/4987c694032109dd531b10b12e69ef3787018307/bin/shelf.js#L22-L64). If Notion ever changes anything or nixes its free tier, I'll have to spend some time rewriting uninspired code to get the data into my preferred format.

There's also still room for small quality of life improvements. For example, to include _in situ_ photographs, I currently use a fairly manual workflow to add them to the site & then I need to retroactively add the path to my book data. I can imagine a future where I update the workflow to be a bit more automated. Upload to Notion? GitHub workflow that updates Notion pages? Could I use [webhooks](https://developers.notion.com/reference/webhooks) so that I no longer have to check the data with a cron job?

Ultimately this is another iterative step in my bookshelf building process. I'm beginning to come to terms with the fact that I'm very close to just writing my own bespoke API and frontend UI. For the moment, the cost of keeping the lights on for that project feels prohibitive.[^3] That notwithstanding, I'm happy with this step to have more control over my data and a a simple way to update everything via my phone.

<img class="blog-pic" src="/img/blog/2025/bookish-4.png" />
<div class="center-text"><small>Screenshot of editing a book in the data on the app.</small></div><br />



[^1]: You can read [this ticket](https://github.com/riastrad/cyberbspace/issues/236), if your curious about the different paths forward that I was brainstorming here.
[^2]: I know this is me [drawing an owl](https://knowyourmeme.com/memes/how-to-draw-an-owl) a bit, but I don't know if this is interesting enough to write it out in detail. Feel free to [reach out](mailto:josh@cyberb.space?subject=%5Bcyberbspace%5D%20draw%20the%20rest%20of%20the%20owl) if you're interested in more specifics.
[^3]: Who knows? Maybe I'll follow the lead of [compost.party](https://compost.party) and host it on an old solar-powered phone.
