---
layout: shelf.njk
title: shelf.
date: 2025-01-02 10:00:00
tags:
  - nav
navtitle: bookshelf
---

<details>
    <summary>subscribe to book reviews</summary>
    If you're interested in getting notified when I write an informal review for one of these, you can subscribe to this dedicated <a href="/shelf/feed.xml">RSS feed</a>.
</details>

---

## Currently Reading

<div class="shelf">
    {% for book in books.reading %}<div class="shelvedbook"><a href="{{ book.link }}">{{ book.title | uppercase }}</a><p>{{ book.author }}</p></div>{%endfor%}
</div>

---

## Read

👓 **{{ books.have_read | readingProgressYear }}** books so far this year.
🗃️ **{{ books.have_read.length }}** books since I started tracking digitally.

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
