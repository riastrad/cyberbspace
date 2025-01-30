---
layout: shelf.njk
title: shelf.
date: 2025-01-01 10:00:00
tags:
  - nav
navtitle: bookshelf
---

> I have read ✨ **{{ books.have_read | readingProgressYear }}** ✨ so far this year.

## Currently Reading

<div class="shelf">
    {% for book in books.reading %}<div class="shelvedbook"><a href="{{ book.link }}">{{ book.title }}</a></div>{% endfor %}
</div>
<hr />

## Read

I have read **{{ books.have_read.length }}**  books since I started keeping track of them digitially.

<div class="shelf">
    {% for book in books.have_read %}<div class="shelvedbook"><a href="{{ book.link }}">{{ book.title }}</a></div>{% endfor %}
</div>

<hr />
