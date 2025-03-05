---
layout: post.njk
title: Lost in the Haze
summary: Due to budget cuts the contents of the air in your lungs is unknown.
date: 2025-03-05 15:33:00+5:30
tags:
  - post
  - brief
  - travel
  - india
location: mumbai
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

This is a follow-up to a previous post (ref. [AQ-Aïe](/notes/2024/aq-aie/)).

The air quality continues to have its ups and downs here in Mumbai. Most days I get all of the negative health consequences of being a smoker without any of the fun. It's been odd to realize how you can adjust to this type of environment as a human. When we had our first heavy pollution days after moving here, it felt overwhelming and bleak. In more recent days, when I've checked my AQI app and seen that it's a mere 150 outside, I've had the thought, "not bad, maybe I should venture out." The human mind is perhaps too adaptable.

Back in December, during some of the worst air quality days so far, I wrote a blog post about the experience. I included a small widget at the end of my blog that showed the latest AQI reading, to help illustrate the point. However, the AQI integration has since become obselete. Not because the issues have been proactively addressed. But because the API I was pinging to get real time data relied on U.S. State Department sensors. On Tuesday, March 4th, 2025, the global network of sensors was [disconnected from the public API](https://www.france24.com/en/live-news/20250305-us-embassies-end-pollution-data-popular-in-china-and-india). The API still returns a `200: OK` response, but the response body contains no data.[^1]

As a result, my initial page no longer displays the AQI as of the most recent site build. I have lots of thoughts and feelings about this. Unfortunately, the [Hatch Act of 1939](https://osc.gov/Services/Pages/HatchAct-Federal.aspx#tabGroup31|tabGroup12) prohibits me from sharing them here. The only thing I will say is that me and my family are still here breathing this air, and it will continue to impact us regardless of whether or not we know its corresponding index value.

[^1]: A [410](https://http.cat/status/410) would have been preferred, or even a [451](https://http.cat/status/451), but this does not seem like an appropriate time to quibble about protocol correctness.
