---
layout: freelance.njk
title: freelance.
date: 2025-01-01 08:00:00
tags:
  - nav
navtitle: freelance
---

## Availability
{% if metadata.freelance.status == 'available' %}
I am currently available for **{{ metadata.freelance.availability }}** of freelance work. You can reach me directly [via email](mailto:{{ metadata.author.email }}) with potential opportunities.
{% else %}
I'm not currently available for freelance work. My next availability is in **{{ metadata.freelance.next_available_date }}**. Don't hesitate to [reach out](mailto:{{ metadata.author.email }}) if that timeline would be compatible with the work you have in mind.
{% endif %}

## Software Engineering

I have +10 years experience working in software in various roles: data analyst, data scientist, support engineer, and software engineer. A more detailed history of my experience can be found in the [work section](/work) of this site.

I do my fastest work in Node.js. But I have also enjoyed working in Python & Go. I have a strong background in scaling backend apps & improving systems built on AWS.

My frontend experience is less prominent but still worth mentioning. I have [strong opinions](/notes/2024/rules-for-this-website/) on keeping static websites performant. I have been proud of contributions made to various web apps and libraries over the years (e.g. [Static Images API Playground](https://docs.mapbox.com/playground/static/) & [@mapbox/quilt](https://github.com/mapbox/quilt)).

Finally, I miss working with maps. I am very likely to jump at any opportunities that include working with maps.

## Writing

Regardless of my availability, I am always interested in writing projects. More specifically, I strongly encourage you to reach out if you'd like to work with me on any of the following:
- Essays ([examples](/writing))
- Book Reviews ([examples](/shelf))
- Travel Writing ([examples](/tags/travel))

I also enjoy writing technical documentation. However, I consider it more of a piece with Software Engineering and will approach any projects from that perspective.

## Inquiries

If you are interested in working with me in any of the above capacities, please feel free to reach out directly via **[{{ metadata.author.email }}](mailto:{{ metadata.author.email }})**.

For non-writing projects, I like to keep the process for new work as straightforward as possible:
1. After an initial e-mail, I will reach out to schedule a meeting to discuss your project in greater detail.
1. Based on our conversation, I will share my preferred rate and ideal timeline.
1. If we agree on terms, we sign a written agreement.
1. Work can start as soon as a contract is finalized.

For writing projects, I understand that every publication has its own set of expectations and editorial workflows. I will do my best to accommodate yours if we agree to work together.
