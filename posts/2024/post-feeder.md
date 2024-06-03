---
layout: post.njk
title: Feeder, Finally
summary: Setting up an RSS feed
date: 2024-06-03 12:20:00
tags:
  - post
  - development
  - web
  - brief
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

Long ago, before we sold the open pastures of the free internet to Social Media companies and then asked them to lease it back to us, the federated internet was hard to keep track of. How were you to know when one of the blogs you followed had published new writing? It was a tricky problem, one that was ultimately solved by each site maintaining it's own RSS feed that could be subscribed to.

I always meant to add a feed to this site[^1] , but I kept putting it off. In my head it required me to deal with XML and that felt like a headache. But I've grown a lot since 2018, and what felt like a mountain of spec reading & tinkering a few years ago turned out to be less than 30 minutes of my time last week. This was a nice realization for me. If you were to ask me if I've had much technical growth in the past few years, I'd probably respond that I've had a little but nothing too significant. Revisiting this bit of work on my personal site, however, I can see that I've actually built up quite a bit of technical muscle[^2] that makes the lift much lighter than it was before.

Anyway, enough jabber. Without further ado, I'm happy to announce that you can now subscribe to an RSS feed for this blog:

```
https://cyberb.space/feed.xml
```

It's worth noting that my timing is no accident here. In about 2 months my family and I will be moving to Mumbai, India. You can expect to see more frequent posts about our experience here, and now you have a handy way to subscribe and have the posts come to you — just use the feed reader of your choice[^3].

[^1]: This is even mentioned at the bottom of the post I made when I redesigned this site back in 2018 (ref. [re:design](/notes/2018/re-design/))
[^2]: Muscle is one thing, but I'm also indebted to [this blog](https://alexanderle.com/create-an-rss-feed-from-scratch) by Alex Le that pointed out that you can easily set up a feed with a static site generator and some basic templating.
[^3]: Aren't public specifications great?
