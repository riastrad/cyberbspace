---
layout: post.njk
title: "Digitially Syndicated Book Reviews"
summary: "Announcing a dedicated RSS feed for book reviews"
date: 2025-07-04 12:50:00+5:30
tags:
  - post
  - development
  - web
  - brief
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

This is just a brief note to share that I have recently added a new RSS feed to the website. I've started keeping my book-related content in a different corner of the site, and rather than shimming all of that back into the main feed, I've opted to set up a new dedicated feed:

```
https://cyberb.space/shelf/feed.xml
```

For context, these reviews are not rigorous or in-depth. For the most part, you can think of them as the brief note I might post in a social app like GoodReads. I typically type them out on my phone right after I've finished reading and I don't feel the need to revisit or revise them too often. But it's nice to have everything organized and under my own control.

If you've been following the blog at all, you know that I've been tinkering with how I track and syndicate the list of books that I have read (see previous posts: [Bookish Concerns](/notes/2025/bookish-concerns) & [Shelf Life](/notes/2025/shelf-life)). So far I've enjoyed the self-managed workflow. It's fun to build and change whenever I feel the urge. Selfishly, it's nice to have a tool completely organized around my own needs!

The only sense of lack that I feel, and it's by no means constant, is that this is a pretty antisocial approach to a public reading tracker. I'm broadcasting my thoughts and impressions, but I have no mechanism for hearing what other people think about the books I'm reading. It's a social node that is not plugged in to any network. But that's not necessarily a feature of the approach. If you come across a book review and feel the urge to discuss, feel free to [ping me on social media]({{ metadata.author.social.bluesky }}) or [send me an email](mailto:{{ metadata.author.email }}). I can't guarantee a prompt response, but I can say that I'll read with interest.

The work of setting up a separate feed was pretty straightforward. If you're interested in how I set these two feeds using my static generator, [11ty](https://www.11ty.dev/), you can look directly at the changes & additions I made to my template files over [here](https://github.com/riastrad/cyberbspace/pull/246).
