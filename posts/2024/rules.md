---
layout: post.njk
title: Rules for This Website
summary: Previously undocumented rules I keep in mind when I build this site.
date: 2024-10-21 09:34:00+5:30
tags:
  - post
  - meta
  - web
  - development
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

I've been adhering to some loose mental rules whenever I change or add anything to this website, and I think it's worthwhile to write them down here for posterity. I'll also keep a `CHANGELOG` section down at the bottom and do my best to keep it up-to-date if and when these rules shift.

1. **DON'T OVERTHINK THE COLOR PALLET.**
I think it's really easy to go overboard with colors, and this is a personal cause of many an existential tailspin. So, to avoid falling down this rabbit hole over and over again, I only use black (`#000`), white (`#FFF`), and a slightly transparent yellow (`rgba(238, 238, 51, 0.6)`) on this site.
1. **IF I NEED SOMETHING THAT'S ALREADY ON THE COMPUTER, DON'T BUNDLE IT.**
This rule mostly applies to fonts. For my money, this is the most straightforward way to speed up a site. All computers ship with fonts as part of their operating system. Browsers have access to these fonts. So why not use what's already there? With this approach, my site doesn't have to rely on heavy network requests just to show text. Sure, this limits my design, but I've been happy enough with how the site looks when I use Palatino & Courier New. At the end of the day, I set some fallbacks that feel reasonable and I sleep soundly at night.[^1]
1. **VIEWING A PAGE ON A PHONE SHOULD BE SIMILAR TO DESKTOP, BUT IT DOESN'T HAVE TO BE IDENTICAL.**
A good portion of people viewing my site are probably coming to it via their phone's browser (especially if they click a link I share on social media). I could be a crank and refuse to accommodate them, but [media-queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) exist and aren't too hard to use, so why not make life a little more enjoyable for everyone?
1. **IF IT CAN'T BE ACHIEVED WITH HTML & SOME CLEVER CSS, IT MIGHT NOT BE WORTH IT.**
I have no ill will against JavaScript (unless we start talking about [strict equality](https://dorey.github.io/JavaScript-Equality-Table/)), and I'll use it if I want my site to do something and it feels like the only way (ref. [footnotes](/notes/2022/cyberb-pages-get-a-pedicure)). That being said, I think it's easy to overuse JavaScript and slow down a site unnecessarily. As a result, my first attempt is always to stick with HTML + CSS.
1. **THE SITE SHOULD BE AS CLOSE TO FULLY BAKED AS POSSIBLE WHEN A PAGE IS LOADED.**
This is complimentary to the above rule about JavaScript. Lots of big, complex apps rely on a design pattern of "send the bare minimum and then fill in the blanks as they arrive." In many cases this makes sense, and is a useful strategy. But this website is not a big, complex app. I use a static site generator ([11ty](https://11ty.dev)) to turn Markdown files and Nunjucks templates into HTML. If I have a project that includes data I want to show visitors, I want to bake that data into the pages when I build them, not when the browser loads them (ref. [maps](/notes/2024/how-i-added-maps-to-my-travel-posts) & [dithering](/notes/2024/auto-generating-dithered-blog-images)).[^2]
1. **LET PEOPLE SEE BEHIND THE CURTAIN.**
This one is more philosophical than technical. I'm not trying to make money with this site, and I don't think I'm innovating or doing anything exceptionally unique here. However, I think that the Internet is at its best when ideas are allowed to travel and cross-pollinate. This is only possible if stuff is documented and we explain how the sausage was made. That's why almost every bigger feature on this site has an explanation post (ref. [#development](/tags/development)), and it's also why every page includes a link to the source code on GitHub. I find that doing this leads to good things. Like [pull requests](https://github.com/riastrad/cyberbspace/pull/174) that improve the site's navigation links, or [forum comments](https://news.ycombinator.com/item?id=41534919) that give me new ideas for how to optimize site features.

[^1]: There are plenty of [useful lists](https://github.com/adrg/os-font-list) of operating system fonts to help decide which ones will most likely keep things consistent across platforms.
[^2]: Note that an exception to this rule is the "currently reading" feature on the site's landing page. However, I am [currently working](https://github.com/riastrad/cyberbspace/pull/180) to change this.

<br />
<details>
<summary>CHANGELOG</summary>
  <ul>
    <li><strong>2024-10-21</strong> write out the rules for the first time.</li>
    <li><strong>2024-12-10</strong> fix list formatting & style</li>
  </ul>
</details>
