---
layout: base.njk
title: space.
date: 2024-12-01 09:01:00
tags:
  - nav
navtitle: home
permalink: /
---

## Hey. I'm Josh.

I'm a writer & software engineer.

This site is the primary conduit through which my lived experience flows into the digital world. Here is the high level view, in case you don't have time to stick around:

> Currently located: {{ metadata.outpost.city }}, {{ metadata.outpost.country }}
> Currently reading: {{ reading | books }}
> Freshly published: <a href="{{ collections.posts.last.url }}">{{ collections.posts.last.data.title }}</a> ({{ collections.posts.last.data.date | readableDate }})

If you prefer the social web, you can find me squatting <a rel="me" href="{{ metadata.author.social.mastodon }}">over on Mastodon</a> or experimenting with self-promotion <a href="{{ metadata.author.social.bluesky }}">over on Bluesky</a>.
