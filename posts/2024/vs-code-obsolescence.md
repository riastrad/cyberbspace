---
layout: post.njk
title: VS Code Obsolescence
summary: crashing code editors in the year of our lord twenty twenty four?!
date: 2024-08-20 14:44:00
tags:
  - post
  - review
  - development
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

For the first time in a while, my development machine is not one provided by my work. Because I'm taking a break from the world of software engineering all the work I'm doing[^1] is happening on the 2015 MacBook Pro I had leftover from a previous job[^2].

Now, maybe this is a naive proposition, but I think that a 9 year old laptop with 250 GB of memory, a 2.9 GHz dual-core processor, and 8 GB of RAM should still hum along quite well[^3] for basic tasks. Yet, lo and behold, as I was working on [some tweaks to my site](https://github.com/riastrad/cyberbspace/pull/129) I was dismayed to learn that this wasn't the case. With only my web browser open & VS Code running, my laptop slowed to a crawl. Taking a peak at Activity Monitor, VS Code & it's associated processes were gobbling up _all_ of my CPU. I was stunned. Naysayers might cry foul and say it was probably some renegade plugin. But this was a fresh install, I hadn't added any 3rd party plugins.

So I've been forced to give VS Code the boot and look around with bleary eyes at the alternatives. My main criteria were that it should preferably be something that doesn't rely on Electron and that has a file tree I can easily toggle on and off[^4]. After some brief and frustrating time spent (mis)configuring NeoVIM[^5], I am now just tweaking my website using TextMate[^6]. I would have loved to try out [CodeEdit](https://www.codeedit.app), but alas they are not supporting MacOS versions <13.x, so here we are.


[^1]: Writing out this quick blog post included.
[^2]: I did not steal this laptop. In ancient times, when I worked as a data analytics consultant, my company had a subsidized B.Y.O.-Laptop policy where they would cut you a check for a couple hundred bucks and you could decide what laptop you wanted to have instead of just being handed a standard issue one. Of course, as a consultant, I usually had a client-provided laptop for security reasons, so this PC has been mostly a personal device since I first acquired it nearly a decade ago.
[^3]: Even if my OS is relegated to only security updates and I'll never see the lush, verdant digital fields of whatever patch of California Apple decides to name the next iteration of MacOS after.
[^4]: Having a project file tree adjacent to my currently working file is a mental salve, and not having the option to quickly toggle it out of the box makes me feel like Loki under his fateful venom drip.
[^5]: Honestly, I've started and stopped several times with using NeoVIM and the biggest hurdle for me isn't learning the abstruse commands or interface, it's being able to properly install and manage plugins without a bunch of yak shaving. If NeoVIM shipped with a project file tree out of the box, then that's probably what I'd be using now.
[^6]: For those keeping score at home, the highest I've seen TextMate's CPU % in my Activity Monitor — even while actively editing documents — is ~5%. When I'm not actively typing, it's using less CPU than Activity Monitor itself!
