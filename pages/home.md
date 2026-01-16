---
layout: base.njk
title: space.
date: 2026-01-31 09:01:00
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
{{ books.reading | booksBeingRead }}

**RECENT PUBLISHED WRITING**
<a href="{{ publications.first.url }}">{{ publications.first.title }}</a> in *{{ publications.first.publisher }}*

**MY LATEST NOTE**
<a href="{{ collections.posts.last.url }}">{{ collections.posts.last.data.title }}</a> ({{ collections.posts.last.data.date | readableDate }})

**SOCIALS**
I dabble with <a href="{{ metadata.author.social.bluesky }}">Bluesky</a>, <a href="{{ metadata.author.social.bandcamp }}"> Bandcamp</a>, and <a href="{{ metadata.author.social.letterboxd }}">Letterboxd</a>. But I have doubts and reservations about using any service I don't control to host my writing and opinions.

<hr />
