---
layout: post.njk
title: Dropping the Ocean
summary: Brief log of changes to my home page's currently reading feature
date: 2024-11-26 19:00:00
tags:
  - post
  - development
  - web
  - brief
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

I have been frustrated with having to pay Digital Ocean $5.30 every month just because I wanted to show what books I was reading on my site's home page. Last week, I [finally did something](https://github.com/riastrad/cyberbspace/pull/195) about it.

The reason I didn't do this sooner, was because I have had [grand plans](https://github.com/riastrad/cyberbspace/issues/30) to completely re-vamp how I manage my digital reading record. I started down this path & quickly got bogged down in the details of book editions, date formats, ISBN numbers, &c. It all started to feel a bit silly & messy, so I set aside.

Back in 2022 I was steeped in backend engineering. It felt easy and natural to spin up a Node.js server to connect my site to my reading data. Now that I'm no longer surrounded by on-call schedules and availability metrics, I had the epiphany that the feature doesn't need to be up-to-the-minute or highly available. I'm not changing the books I'm currently reading that often. I was being a computational wastrel.

So I've changed my approach. I've now got a GitHub action that runs once every 4 hours to check my reading app's RSS feed. If it's changed compared to data that was previously pulled down, the action updates the data, commits it to my repo, & triggers a fresh site build. You can see the details in the [pull request](https://github.com/riastrad/cyberbspace/pull/195). I like this approach, it gets me closer to where I want to be[^1] without forcing me to spend hours build out a bespoke system. It feels more conducive to iteration, which I've found leads to better outcomes. I already see how I can use this strategy to catalog the books I have read & auto-generate dedicated review pages. I can do this piece by piece until I'm ready to swap out my use of [Oku](https://oku.club) for my own backend. Even better, my book data is now backed up in my site's git history.

My only hesitation about going further down this route is the fact that I won't be able to easily pull my review data from Oku. They hide it behind a series of API calls that I will have to reverse engineer. For now, though, I'm happy that these books & links load instantaneously with the page instead of there being a perceptible delay while the front-end waits to hear back from the back-end.

There's also a small hint of irony about this work. I'm not currently drawing a regular salary from anywhere, so being mindful of expenses is a more prominent part of my life. With the $63.60 I have saved by making this change, I have found the exact justification I needed to go out and buy a few more books.

 [^1]: i.e. managing my reading data myself & baking all of my data into my site directly
