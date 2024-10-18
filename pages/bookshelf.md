---
layout: shelf.njk
title: shelf.
date: 2024-01-01 10:00:00
tags:
  - nav
navtitle: books
---
# Bookshelf.
So far this year I've read **22** books.

## Currently Reading
<div class="shelf">
{% for book in books.currently_reading %}
<div class="shelvedbook">
    {% if book.link %}<a href="{{ book.link }}">{{ book.title }}</a>{% else %}{{ book.title }}{% endif %}
</div>
<ul class="booktooltip">
  <li><strong>{{ book.title }}</strong> by {{ book.author }}</li>
</ul>
{% endfor %}
</div>
<br />

## Read
<div class="shelf">
{% for book in books.have_read %}
<div class="shelvedbook">
    {% if book.link %}<a href="{{ book.link }}">{{ book.title }}</a>{% else %}{{ book.title }}{% endif %}
</div>
<ul class="booktooltip">
  <li><strong>title</strong>:{{ book.title }}</li>
  <li><strong>author</strong>: {{ book.author }}</li>
  <li><strong>read on</strong>: {{ book.events.last.timestamp }}</li>
</ul>
{% endfor %}
</div>
