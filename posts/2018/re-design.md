---
layout: post.njk
title: Blog Re:Design
summary: How (and why) I refactored my personal website and migrated my old travel blogs.
date: 2018-12-30 8:00:00
tags:
  - post
  - development
  - web
permalink: /notes/{{ page.date | dateYear }}/{{ page.fileSlug }}/index.html
atUri: "at://did:plc:xs5e6hzleslphof223gu4efo/site.standard.document/3mq527eyovx2x"
---

## Why did I do it?

Being a mobile-focused Support Engineer at Mapbox means that I tend to focus on non-general languages and design patterns that are specific to proprietary platforms. The considerations and constraints are very different from something as sprawling and globbed together as the World Wide Web™. But this doesn’t mean that I haven't been required to rub elbows with web development here and there.

My original website was up for about 8 months before I decided it needed new life. You can see the extremely simplistic site I initially made courtesy of the Internet Archive’s [Wayback Machine](https://web.archive.org/web/20180815144009/https://cyberb.space/). I made this site quickly and haphazardly during some downtime between jobs (no lie, I hand coded my resume bullets in vanilla `html`). It certainly shows. Although I don't expect very many people saw it in that state, I was unsatisfied with this first, naïve attempt at building a web page and was craving an excuse to get more exposure to some modern web development tools and systems.

In the interest of posterity, I want to use this inaugural blog post to walk through my motivations for redesigning the site and using the tools that I used.

## What tools did I use?

I want to give credit where credit is due and run through a list of the tools I used to host, design and build the site in its current form. If you’re not interested in my long-winded justifications and (likely inaccurate) descriptions of these tools, the site is [Open Source on GitHub](https://github.com/riastrad/cyberbspace/) where you can see the structure and code (warts and all) for yourself.

### Neocities

This piece hasn’t changed recently, but I think it’s worth documenting. I use [Neocities](https://neocities.org/) to host this website. It’s a cheap solution (on their “supporter” plan it only costs me $5 a month to keep this site up and running) and it provides SSL support by default. This saves me from having to get tangled up in any of the minutia of dotting the `t`s and crossing the `i`s for my basic configuration, which I think should generally be the point of a hosting service.

And I’ll be honest, there are other solutions I could have used. For example, [Netlify](https://www.netlify.com/) has been getting some buzz lately. This can likely be attributed to the "Free for Open Source" tier in their pricing plan. However, Neocities will always hold a soft spot in my heart because they are also [early adopters of IPFS](https://blog.neocities.org/blog/2015/09/08/its-time-for-the-distributed-web.html)[^1] and advocate for a more permanent solution to how the web is structured and maintained.

### Skeleton CSS

To be perfectly blunt, CSS is an area of web-development that have absolutely no comfort with. I’ve known CSS and how it relates to HTML since my edgy days of editing my edgy MySpace™ page[^2] style back in Junior High/High School.

I knew that it would be faster for me to use a boilerplate CSS library and tailor it to my specifications that it would be to start wholly from scratch. But I didn’t want to use some big, ungainly, and wholly generic (as a result of its ubiquity) thing like [Bootstrap](https://getbootstrap.com/docs/3.3/css/).

No kidding, I literally searched the phrase `minimal css boilerplate` and was lucky enough to find [Skeleton CSS](http://getskeleton.com/). The library is small, clean and easy to get up and running with after you browse it’s documentation.

I didn’t want the library loading from an externally hosted server, and I also wanted to tweak certain elements like buttons to my liking, so I downloaded it added it my site’s assets and began to tweak away. In addition to the core modifications, there were also elements that I wanted to customize that weren’t already addressed by the framework. To keep things clean(ish), I implemented these changes as a [separate](https://github.com/riastrad/cyberbspace/blob/master/_includes/assets/css/custom-stuff.css) CSS asset.

### Google Fonts

This is currently the primary thing about the site that I don’t like. This is a misleading way to state this, let me clarify: I am sometimes haunted at night by the thought that Google’s Fonts are so easy to use that one day their servers will go down, or the company will monetize it’s Font business more aggressively and suddenly millions of web pages (this one included) will look _deformed_ and _grotesque_.

So yes, while I did momentarily fall in love with [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) and add it to this new and improved version of my site. I think I can accomplish a similar ascetic by other means once I get over the hump of understanding the best way to bundle a font and remove the external dependency. I’ve already put this one on my “minor skills to learn in the coming year” list (which I’m partially tracking [on the repo](https://github.com/riastrad/cyberbspace/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22%F0%9F%93%9D+new+skill%22+)).

### Nunjucks

Like CSS, JavaScript templating is another area that I do not feel extremely comfortable with. I know it’s a critical part to getting things running smoothly with a site generator - but I had no idea where to start. Don’t tell the project's maintainers this, but I didn’t put too much consideration into this and ultimately defaulted to [Nunjucks](https://mozilla.github.io/nunjucks/) because that’s what all of the examples in [11ty’s documentation](https://11ty.io/docs/) were written in.

After starting this my site refactor, I found out about [Mustache](https://mustache.github.io/) and the concept of “logic-less templates”. Personally, I found that Nunjucks suited my needs and made enough sense once I took the time to read the documentation a bit more closely. So I didn’t investigate, compare, or attempt to rewrite my layout templates after I learned about the other possible solution. That being said, no solution is ever final, so re-visiting my approach to templates might be worthwhile if I have time in the future. I’ll also note that this is the one area where I don’t feel that I’ve done my homework very well.

### 11ty

Based on my needs an interests, I knew that I didn’t want or need anything more complicated[^3] than a static site generator. Selecting a generator actually proved to be one of the harder aspects of the project. I’ve had minor brushes with Jekyll in the past, and while I appreciate the lasting contributions it’s made to this area of web development, it lacked a certain _je ne sais quoi_ that I was looking for in terms of structure and usability.

At work I’ve had the pleasure of being able to use the extremely the sleek, and open-sourced [Batfish](https://github.com/mapbox/batfish) library, but I decided against opting for this familiar tool for two reasons. First, if you are a barista and you spend all day making espresso, the last thing you want to do when you get some free time is spend it making more espresso. I wanted to get a sense of what else was out there and see if there were flexible and (most importantly) _user friendly_ generators gaining traction outside my current circle.

Second, Batfish is lightweight, but it’s made with much beefier projects in mind. Hell, it’s used to maintain all of my current company’s [sprawling documentation](https://www.mapbox.com/documentation/). I don’t expect my site will need to be nearly as dynamic or massive, so I want to keep things nice and simple. Preferably only needing to use a `build` and `serve` command when developing, with minimal configuration or tom foolery required to get things up and running.

At some point during my research, I came across [**11ty**](https://11ty.io). 11ty checked all my boxes, had clear documentation and examples, and seemed very easy to get up and running with one Saturday afternoon while I was browsing for tools.

I also have to be perfectly honest and admit that to get over the learning curve[^4] I did a fair amount of cribbing from the [eleventy-boilerplate blog](https://github.com/danurbanowicz/eleventy-netlify-boilerplate) put out by [Dan Urbanowicz](https://www.danurbanowicz.com/). <br />(👋 Thanks, Dan!)

## Why are the majority of blogs from before 2011?

It’s no fun designing and building a website without content. I had some lame, test content written when I first started working on the blog section, but it was uninspiring and I was having trouble seeing the bigger picture with just a handful of stand-in posts.

Fortunately, during the holiday break I had a moment of inspiration! When I was younger and traveled, I had maintained travel blogs. These old blogs were currently sitting precariously on 3<sup>rd</sup> party blogging sites that I didn’t control. At any moment this part of my personal digital history might disappear[^5] and there would be no recourse for getting it back.

This prompted me to decide to migrate **_all_** of my old posts over to this new blog I was building. It also provided an ample opportunity to tweak my site's blog structure and design as I added more and more content to it. Round a corner here. Tweak a spacing there. Add a word count, just because I started to get curious along the way.

Now I’ve got [Suburban Berber](https://joshsmanytravels.blogspot.com/) and [Josh Has Gone French](https://www.travelblog.org/Bloggers/JoshhasgoneFrench/) dated, tagged, and archived on this site. This site that I manage and style **_and_** I’m quite pleased with the look and feel of the posts. If you’re curious about my past experience living abroad or just want to see how different my writing style was years ago, feel free to click around. I pulled them over in the exact same state they were in (title typos and all), the only thing that’s changed is the style.

Overall it was a fun trip down memory lane, and I’m glad I had the thought and time to follow through.

## Declaration of My Goldilocks Strategy re: Web Development

Of course, even after putting all of this effort into polishing up the site, there are still things that are still squatting in the back of my mind that I’d like to improve. For posterity's sake, and to preempt any potential criticism from my peers, I’m going to list my primary nit picks here and now.

* The `/work/` page is not interesting or easily maintainable
* The site's home page leaves something to be desired (both in terms of content & style)
* I’m not currently show casing any fun, creative dev projects I’ve worked on
* My current footnote implementation is clunky and I hate it
* My blog doesn’t have an RSS feed or any Newsletter functionality
* I have a Google Font dependency

These are all the ones I’ve noted so far. When inspiration strikes, or I see something I want to change I try to add it [as an issue](https://github.com/riastrad/cyberbspace/issues) to my repo. Since this site will only ever be maintained by yours truly, and even though I’m managing the site and related projects via GitHub, I’m not actively trying to follow best-practice code conventions (e.g. I have definitely committed to `master` more times than I have ever done in a professional setting).

My main goal is to make updates to the areas I want to improve, or use it as a learning tool to gain familiarity with a concept, tool or system, in a low-risk environment. I’m casually referring to this as a “Goldilocks Strategy” toward my site's development and maintenance.

I’ll be making minor tweaks to every piece until it all feels just right.

[^1]: IPFS is a very interesting project that I’ve been following for the last few years. I won’t get into it because it’s tangential to this blog. But if thinking about how to improve the structural integrity of the system that currently stores an increasingly large share of all of humanity’s knowledge, communication, and creativity is your jam, I encourage you to check it out.
[^2]: Don’t look for my MySpace page. It’s long gone, I assure you.
[^3]: Don’t worry, I know that static-site generators can be extremely complicated if they want to be.
[^4]: Just to clarify, this is definitely the result of my inexperience with web development and limited exposure to the structure and functionality of static-site generators.
[^5]: Yes, I’m noticing that resilient systems and future-proofing my digital footprint appear to have become a re-occurring theme in this post.
