---
layout: post.njk
title: Post title
summary: Quick summary of post
tags:
  - post
  <!-- any other relevant tags -->
permalink: /notes/{{ page.date | dateYear }}/{{ title | slug }}/index.html
---

**TO DO:**
- [x] archive old travel blogs
- [ ] improve formatting of blockquotes & lists
- [ ] add syntax highlighter for code snippets

Formatting cheat sheet:

**Tables**

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

**Code**

```py
import everything

print(everything[0])
```

**Images**
<!-- Use an absolute path -->
![](/img/Graph-paper.svg)

**Lists**

1. ordered
1. things
    1. can be nice

* But I
* am also partial
    * to the
    * unordered ones
