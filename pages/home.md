---
layout: base.njk
title: space.
date: 2024-12-01 09:01:00
tags:
  - nav
navtitle: home
permalink: /
---

<div class="content">

### Hey. I'm Josh.

I'm a writer & software engineer.

This site is the primary conduit through which my lived reality flows into the digital realm. Here is a quick cheatsheet, if you don't have time to poke around:

> Currently located: {{ metadata.outpost.city }}, {{ metadata.outpost.country }}
> Currently reading: {{ reading | books }}
> Freshly published: <a href="{{ collections.posts.last.url }}">{{ collections.posts.last.data.title }}</a> ({{ collections.posts.last.data.date | readableDate }})

If you prefer the social web rather than just being talked at, you can find me squatting <a rel="me" href="{{ metadata.author.social.mastodon }}">over on Mastodon</a> or experimenting with self-promotion <a href="{{ metadata.author.social.bluesky }}">over on Bluesky</a>.

</div>
