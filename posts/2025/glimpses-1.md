---
layout: post.njk
title: Glimpses of the World as It Otherwise Might Be
summary: Part 1, Toward a Heliocentric Infrastructure
date: 2025-03-19 13:05:00+5:30
tags:
  - post
  - technology
  - review
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

## Part 1: Toward a Heliocentric Infrastructure

I'm going to be direct here at the start. The world I have known and lived in for the past three decades and change is in free fall. I have pages and pages of thoughts on the present moment that I would love to share, but due to the circumstances of my life[^1] I am not able to share them publicly. Besides, there are better, more qualified writers on that beat.

Instead, I've decided to use this post to introduce a topic that might turn into a series: technology projects on the margins that point toward the possibility of change. Not disruption, change. Projects that hint at the possibility of a better world.

I don't plan to make this post too in-depth or well researched. The projects I've mentioned are mostly proofs of concept and are here to serve as prompts more than guideposts. Think of this more as an inspiration board than a how-to guide.

### The Present Shortcoming

The state of the Internet and the infrastructure we use to run it are frustratingly fragile and unimaginative. Modern civilization, in its current shape, could not survive without the networked exchange of information across the globe. If the entire internet were to go dark, the entire game (i.e. global civilization) would grind to a halt.[^2]

Despite this extreme dependence, our means of maintaining the network continue to be crude and unimaginative — the last few decades of "innovation" have led to huge pockets of centralization for the computational infrastructure that stores and serves the data we need.

Rather than building our confidence in the system by ensuring it is a web of countless nodes that can withstand the chaos of the world, we have turned the problem over to monolithic companies that abstract away the details and tell us not to worry. A team of highly paid experts is focused ensuring the data center's resilience to any _force majeure_ that might occur.

### What Gives Me Hope

Faced with this bleak status quo, I find myself gravitating to projects that reject the necessity of sprawling server farms and their outsized energy demands. These are artifacts of centralization and the biases created by their own success. Despite the shadow of the current monolith, it is possible to cultivate an approach to networked computers that recognizes their connection to the physical world and seeks to work in harmony with it, rather than subjugate it.

Here are just a few of the projects that speak to this possibility.

#### Alternative Hosting
When the internet was first invented, computation and connectivity were bulky, cumbersome technologies. This has changed, but the common approach to the internet remains needlessly tied to the patterns dictated by initial constraints.

[compost.party](https://compost.party) is a fun little experiment that I learned about [via Mastodon](https://post.lurk.org/@computersandblues/112570463568163343). It's not much more than a proof of concept, but it shows that a small website can be run and hosted on an old cell phone whose only power source is a battery and a small solar array that plugs directly into the phone. For a lot of the independent web, like this website you're currently reading, you shouldn't need much more than that.

Imagine a world where lightweight personal websites are hosted on cell phones. It almost makes the act of visiting the website more personal, doesn't it? The knowledge that the page you're viewing might be hosted on a device I carry with me everywhere I go.

#### Alternative Power
The specter of energy-demand haunts the pervasive success of the Internet. But it's so abstracted away that by the time you load a website on your phone, you're not thinking of how many server racks it took to support DNS, load balancers, or the web server(s) that ultimately handed the information back to you; let alone where the electricity required to keep these resources available 24/7 was generated.

[LOW←TECH MAGAZINE](https://solar.lowtechmagazine.com/) is an excellent publication that does a great job of pushing through the many, obfuscating abstractions of modern technology and exploring legitimate alternatives to the status quo. For the purposes of this post, I find the write ups of [how they set up their solar powered website](https://solar.lowtechmagazine.com/about/the-solar-website/) and  [how to build a small solar power system](https://solar.lowtechmagazine.com/2023/12/how-to-build-a-small-solar-power-system/) endlessly inspiring. Not only are they calling attention to the need to power the web using alternative energy sources, they have taken the time to outline in painstaking detail how you could build your own DIY system to maintain that power _and_ put it into practice themselves.

It is possible to shift away from power-hungry data centers and monopolistic hosting providers. The materials and knowledge are available to your average dilettante. All we need is the Sun and the will to change.

#### Alternative Structures
Currently the modern internet is built around speed. This is reflected in the protocols that determine how to serve us content. If you request a web page that is hosted on a platform with multiple servers in different parts of the world, the DNS server you ping will point you in the direction of whatever service will respond fastest. This is usually whichever server is closer to you.

When your only concern is the speed with which the information is returned, this approach is logical and straight forward, but it comes at a greater and greater cost.

The [Solar Protocol project](https://solarprotocol.net) reimagines how we store and retrieve data. Rather than constantly burning energy to keep servers on and ready at all times, what if our network protocols prioritized the presence of the Sun and the energy it shares with us freely every day?

The spin of the Earth dictates the cadence and rhythm of life for the natural world. This has always been the case. Why should the network we've built to sustain our way of life try so hard to reject this reality?

### The Imperative

The guiding light of this post is that imagining new, alternative structures is not just a fun thought experiment, it is the obligation of any technologist of good conscience. Especially as existing structures are crumbling.

I've written about this before, a bit [more obliquely](/notes/2024/this-world-is-ending/), but the fact remains.


[^1]: As the spouse of diplomat living abroad, any public speech is bound by the [Hatch Act of 1939](https://osc.gov/Services/Pages/HatchAct-Federal.aspx#tabGroup31|tabGroup12)
[^2]: I'm simplifying for the sake of increasing the dramatic stakes in this piece. But despite this caveat, you don't need to look too far into the past to see that even [a partial outage](https://www.bbc.com/news/articles/cr54m92ermgo) of some of the machines we plug into the Internet can cause extreme disruption of the status quo.
