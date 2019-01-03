---
layout: post.njk
title: Robust testing
summary: How does my formatting hold up under duress?
date: Created
tags:
  - post
  - test
  - robust
  - duplicate
permalink: /notes/{{ page.date | dateYear }}/{{ title | slug }}/index.html
---

# Quick test

I want to see how my static site generator (& templates) will handle
different aspects of blog posts.

```py
import everything

print(everything[0])
```

## Images?

![](/img/Graph-paper.svg)

## And what about...


### Lists:

1. ordered
1. things
    1. can be nice

* But I
* am also partial
    * to the
    * unordered ones

### Tables:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Quotes

> If at first you don't succeed, redefine what you did as success.
