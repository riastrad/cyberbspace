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

<div class="shelf">
    {% for book in books.reading %}<div class="shelvedbook"><a href="{{ book.link }}">{{ book.title | uppercase }}</a><p>{{ book.author }}</p></div>{%endfor%}
</div>

---

## Read

I have read **{{ books.have_read.length }}**  books since I started keeping track of them digitally.

{% for book in books.have_read %}
  {% capture currentYear %}{{ book.finished | bookDateYear }}{% endcapture %}
  {% if year != currentYear %}
  {% unless year == undefined %}</div><br />{% endunless %}
  {% assign year = currentYear %}
  ### {{ currentYear }}
  <div class="shelf">
  {% endif %}
  <div class="shelvedbook"><a href="/shelf/{{ book.author | slugify }}/{{ book.title | slugify }}">{{ book.title | uppercase }}<p>{{ book.author }}</p></a></div>
  {% if forloop.last == true %}</div>{% endif %}
{% endfor %}
</div>
<hr />
