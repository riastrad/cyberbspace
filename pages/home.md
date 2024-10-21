---
layout: base.njk
title: space.
date: 2024-01-01 09:01:00
tags:
  - nav
navtitle: home
permalink: /
---

<div class="twelve columns content">

<div align=center><h3>Hiya. I'm Josh.</h3></div>

I'm a Software Engineer on a brief hiatus to pursue a career as a writer.

Like most personal sites, I use this space to house two different aspects of my digital life: a personal blog (currently focused on [#travel](/tags/travel)) and an often out-of-date resume.

If you prefer the social web rather than just being talked at, you can find me squatting <a rel="me" href="{{ metadata.author.social.mastodon }}">over on Mastodon</a> and experimenting with self-promotion <a href="{{ metadata.author.social.mastodon }}">over on Blue Sky</a>.

> Currently located: {{ metadata.outpost.city }}, {{ metadata.outpost.country }}
> Currently reading: <span id="currently-reading"><a href="https://oku.club/user/riastrad/collection/reading">...loading</a></span>
> Latest post: <a href="{{ collections.posts.last.url }}">{{ collections.posts.last.data.title }}</a> ({{ collections.posts.last.data.date | readableDate }})

</div>
<script type="text/javascript" src="./scripts/currently-reading.js"></script>
