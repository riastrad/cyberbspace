---
layout: shelf.njk
title: shelf.
date: 2025-01-02 10:00:00
tags:
  - nav
navtitle: bookshelf
---

> I have read ✨ **{{ books.have_read | readingProgressYear }}** ✨ so far this year.

## Currently Reading

| **started** | **title** | **author** |
| :--      | :--       | :--        |
{% for book in books.reading %}| {{ book.started | readableBookDate }} | [{{ book.title }}]({{ book.link }}) | {{ book.author }} |
{% endfor %}

---

## Read

I have read **{{ books.have_read.length }}**  books since I started keeping track of them digitally.

| **finished** | **title** | **author** |
| :--      | :--       | :--        |
{% for book in books.have_read %}| {{ book.finished | readableBookDate }} | [{{ book.title }}]({{ book.link }}) | {{ book.author }} |
{% endfor %}

<hr />
