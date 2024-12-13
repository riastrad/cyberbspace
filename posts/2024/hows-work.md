---
layout: post.njk
title: How's Work?
summary: A log of work I am doing, want to do, and have done.
date: 2024-12-13 11:30:00+5:30
tags:
  - post
  - life
  - web
  - writing
permalink: /notes/{{ page.date | dateYear }}/{{ title | slugify }}/index.html
---

## On the Work

I've alluded to this in a few other posts & the main page of my website, but it bears stating explicitly: one of my main focuses for the next year(ish) is to publish my writing. I'm not leaving software engineering behind completely. It still scratches a very specific itch. But if I'm being honest, I prefer the recent reversal of making writing the main focus and software the hobby. My main goal is to successfully place the manuscript of a novel I've written with a publisher, at the same time I've got short fiction and essays I'm shopping around. (Fighting the battle on multiple fronts, I guess you could say.)

Like any work, accomplishing this goal is weird admixture of preparation, connections, and luck. I've made good progress on some fronts — most notably landing my [first paid essay](https://joinreboot.org/p/nearest-neighbors), which published at the beginning of last week. This felt like a really big milestone! I wrote my thoughts down and someone liked them enough to give me money in exchange for sharing them with a group of readers. The experience of working with the editorial team at Reboot was positive, and while the essay didn't hit all the notes I wanted it to, I do feel like they helped sharped some arguments I made. It's given me the juice to keep pitching other essay ideas to other outlets.

That being said, I'd like to be more than just an "opinion-haver" on the internet. But the literary publishing industry is a more difficult nut to crack. At the moment, I've paused querying literary agents and opted to close out the year polishing up my manuscript. I'm also attempting, with some temerity, to build more relationships in the industry[^1].

Listen. I get that these goals are not unique. I know there are a hundred thousand people who look and think like me sending the same emails. At the end of the day, though, I feel most fulfilled when I am thinking and writing, and I'd like to share the fruit of this labor with more people. If I can find distributors willing to help me hone the work and then share it with a bigger audience, that'd be grand. Of course, if I make it to the end of next year without making any headway, that's also fine. It won't diminish the sense of fulfillment I get from writing. The compulsion to write is a constant. It'll be here regardless. Failure to achieve things in this time frame just means these goals will need to take a backseat to finding a more stable source of income.[^2]

## In the Works

Since I've been so focused on writing and placing more serious fiction & non-fiction, I haven't had too much time to tinker with other small projects. So let me give you a quick rundown of my personal backlog:

1. Finish building a bookshelf for this website.
    ↳ I've landed on a better approach for keeping [Oku](https://oku.club) as my primary interface, which I mentioned in [a previous note](/notes/2024/dropping-the-ocean/). I think this work will fall in place much more quickly once I decide to dedicate time to it.
1. Write an [11ty plugin](https://www.11ty.dev/docs/plugins/#creating-a-plugin) to turn [scroll to text fragment links](https://github.com/WICG/scroll-to-text-fragment) into embedded citations with source links.([cyberbspace#168](https://github.com/riastrad/cyberbspace/issues/168))
    ↳ I don't know that this will have value for anyone other than me. But I think it would be cool if I could just click `copy link to highlight` & drop the link into a page's markdown file then have it automatically turn into a blockquote element that's formatted properly and linked to that text fragment.
1. Finally write that travel note about my trip down south to Kerala.
    ↳ Seriously, it's almost been a month and I have photos and thoughts.
1. Write a personal "wrapped" note before the end of the year.
1. Publish a written commitment to not use generative AI for any of the writing that appears on this website.
1. Fine tune my SVG map implementation ([cyberbspace#159](https://github.com/riastrad/cyberbspace/issues/159)) & generate an overview map for the `#travel` filter tag.
1. Maybe break my rule about only using fonts already on the computer (ref. [rule #2](/notes/2024/rules-for-this-website/#:~:text=IF%20I%20NEED%20SOMETHING%20THAT'S%20ALREADY%20ON%20THE%20COMPUTER%2C%20DON'T%20BUNDLE%20IT)) and load up [Noto Emoji](https://fonts.google.com/noto/specimen/Noto+Emoji/about) so that I get my emoji use to align with my sites aesthetics.
1. I, rather unexpectedly, won an ebay bid for an antique mechanical typewriter! I'm planning to share pictures and thoughts on it when it arrives in the mail.

## Net Works

I tinker with my website when I'm procrastinating on other things. You may have noticed a few changes around here since the last time you visited. I'm not going to write development blogs on them Here's a quick run down in case you were curious:

1. Added a new [writing](/writing) section to the website. I'll include links and info here whenever I publish something somewhere other than this blog. ([cyberbspace#201](https://github.com/riastrad/cyberbspace/pull/201))
1. Fixed some mobile formatting issues with the navigation links & the notes page.
1. Updated the home page formatting to be a bit less clunky. ([cyberbspace#203](https://github.com/riastrad/cyberbspace/pull/203))
   ↳ I find this new format to be a bit more legible across devices, so I'll probably keep it around for a bit.
1. I've fully committed to a single monospace font for the entire site. ([cyberbspace#206](https://github.com/riastrad/cyberbspace/pull/206))
   ↳ I'd had the serif headers + monospace body since I moved over to a static site generator, and — to be perfectly honest — the longer I've had it the more I hated it. This new format feels aesthetically pleasing at the moment, with the caveat that I'll probably be making some adjustments to the size of my headers (they feel a bit intense at the moment).
1. There was some extra top & bottom padding in my footnotes and I couldn't for the life of me understand why. I finally took the time to find the CSS rule that was responsible and trimmed those suckers down. ([cyberbspace@d4026c0](https://github.com/riastrad/cyberbspace/pull/206/commits/d4026c0c81e21066d27976c3fbeb6e91d69d6d32))

## Blog Works

I don't intend for this to become a site dedicated to cataloging the trials and frustrations of making headway in an unfamiliar industry. I find that going that route tends to be a sinkhole where I spend all my time writing about that process and not focusing on the quality of my writing. The writing about the work subsumes the actual work, &c. So please consider this post an anomaly.

That being said, this website is very much a bin I throw random thoughts so that they no longer take up space in my mind. I can make no promises or guarantees about the quality or content of future notes.

[^1]: As you can imagine, this is a bit difficult to do while based in India and focusing on U.S. publishing. I'm feeling my way through it, but if you are or know someone who'd be worth chatting with, [drop me a line](mailto:josh@cyberb.space)!
[^2]: At the moment I'm relying on savings and the generous patronage of my wife.
