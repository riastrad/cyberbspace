---
layout: base.njk
title: space.
date: 2025-01-31 09:01:00
tags:
  - nav
navtitle: home
permalink: /
---

## Hey. I'm Josh.

I'm a writer & software engineer.

This site is the primary conduit through which my lived experience flows into the digital world. Here is the high level view, in case you don't have time to stick around:

**WHERE I AM**
{{ metadata.outpost.city }}, {{ metadata.outpost.country }}

**WHAT I'M READING**
{{ books.reading | books }}

**RECENT PUBLISHED WRITING**
<a href="{{ publications.first.url }}">{{ publications.first.title }}</a> in *{{ publications.first.publisher }}*

**MY LATEST NOTE**
<a href="{{ collections.posts.last.url }}">{{ collections.posts.last.data.title }}</a> ({{ collections.posts.last.data.date | readableDate }})

If you prefer the social web, you can find me squatting <a rel="me" href="{{ metadata.author.social.mastodon }}">over on Mastodon</a> or experimenting with self-promotion <a href="{{ metadata.author.social.bluesky }}">over on Bluesky</a>.

<hr />
