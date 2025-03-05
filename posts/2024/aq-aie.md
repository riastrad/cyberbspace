---
layout: post.njk
title: AQ-Aïe
summary: Dealing with the Air Quality Blues
date: 2024-12-22 15:33:00+5:30
tags:
  - post
  - travel
  - india
  - brief
location: mumbai
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

> **EDITOR'S NOTE:** because the U.S. Government has discontinued its [global air quality](https://www.france24.com/en/live-news/20250305-us-embassies-end-pollution-data-popular-in-china-and-india) intitiatives, the original widget included at the bottom of this page has broken. It's last successful reading was **162** on March 4, 2025 at 7:00am IST. You can read my follow-up post [here](/posts/2025/lost-in-the-haze).

We've had a string of bad air quality days here in Mumbai, and it's got me feeling down. I've never lived somewhere where the air quality could be so obviously hostile to living things. Some mornings I wake up and look out the window and it feels like I'm in San Francisco, except instead of [Karl the Fog](https://www.kqed.org/news/11682057/how-the-bay-areas-fog-came-to-be-named-karl), it's a daily [airborne toxic event](https://en.wikipedia.org/wiki/White_Noise_(novel)).

Here's a picture I took back in the Fall of the South Mumbai skyline. Keep in mind, this photo was taken on a _moderate_ day and the AQI the past few days has been approximately 90-100 points higher than it was then:

{% dither "/img/blog/2024/aqi.png" %}

It's hard not to let this get to you. I miss stepping outside and taking deep gulps of fresh air. I don't think I'll take that for granted again any time soon. I wanted to do something to capture this and how variable it can be. So I set up a little script to pull the current [AQI measurement](https://www.airnow.gov/aqi/aqi-basics/) for the city whenever this site is rebuilt & deployed.

{% aqi location %}

Hopefully, with time, this will become a less interesting feature.

<details>
    <summary>confused by the title of this post?</summary>
    <p>"Aïe" is the french word for "ouch". It is pronounced like the English word "eye".</p>
</details>
