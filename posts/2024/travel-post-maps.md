---
layout: post.njk
title: Auto-Generating POI Maps to my Travel Posts
summary: Quick overview of a new blog feature.
date: 2024-09-12 12:30:00
tags:
  - post
  - development
  - web
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

1. Why I did it
1. What my requirements were
  1. should not make me dependent on a 3rd party platform
  1. should be generated at build time, not on page load (no js)
  1. should look good on desktop & mobile
1. How I did it
  1. d3-geo
  1. just put a marker on a map
  1. data management
  1. end result
1. Anything I'd like to change?
  1. Higher data quality, more zoomed in map
  1. More stylized?
