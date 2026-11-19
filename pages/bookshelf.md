---
layout: shelf.njk
title: shelf.
date: 2026-01-02 10:00:00
tags:
  - nav
navtitle: bookshelf
---

{% include "book-rss-detail.njk" %}

---

## Currently Reading

<div class="shelf">
    {% if books.reading.length > 0 %}
    {% for book in books.reading %}<div class="shelvedbook"><a href="/shelf/{{ book.author | slugify }}/{{ book.title | slugify }}">{{ book.title | uppercase }}</a><p>{{ book.author }}</p></div>{%endfor%}
    {% else %}
    <div class="shelvedbook" style="cursor:wait;"><em>NOTHING</em></div>
    <div class="shelvedbook" style="cursor:wait;"><em>AT THE</em></div>
    <div class="shelvedbook" style="cursor:wait;"><em>MOMENT...</em></div>
    {% endif %}
</div>

---

## Read

👓 **{% readingProgressYear books.have_read %} ({% readingPagesYear books.have_read currentYear %} pages)** so far this year.
🗃️ **{{ books.have_read.length }} books** since I started tracking.
📑 see all book reviews [here](/shelf/reviews).

{% for book in books.have_read %}
  {% capture currentYear %}{{ book.finished | bookDateYear }}{% endcapture %}
  {% if year != currentYear %}
  {% unless year == undefined %}</div><br />{% endunless %}
  {% assign year = currentYear %}
  ### {{ currentYear }}  <small>(<span title="{% readingPagesYear books.have_read currentYear %} pages">{% readingProgressYear books.have_read currentYear %}</span>)</small>
  <div class="shelf">
  {% endif %}
  <div class="shelvedbook"><a href="/shelf/{{ book.author | slugify }}/{{ book.title | slugify }}">{{ book.title | uppercase }}<p>{{ book.author }}</p></a></div>
  {% if forloop.last == true %}</div>{% endif %}
{% endfor %}
</div>
<hr />
