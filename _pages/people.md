---
layout: default
title: People
permalink: /people/
description: The people of the CAMP Lab at Purdue University.
---
<section class="section people-page">
  <h1 class="page-title">Our team</h1>

  {% assign faculty = site.people | where: "type", "faculty" %}
  {% assign phd = site.people | where: "type", "phd" | sort: "order" %}
  {% assign ms = site.people | where: "type", "ms" | sort: "order" %}
  {% assign bs = site.people | where: "type", "bs" | sort: "order" %}
  {% assign visiting = site.people | where: "type", "visiting" | sort: "order" %}

  <span class="eyebrow">FACULTY</span>
  {% for person in faculty %}
  <a class="faculty-card" href="{{ person.url | relative_url }}">
    {% assign parts = person.name | split: ' ' %}
    <span class="avatar avatar-lg coral">{% if person.photo %}<img src="{{ person.photo | relative_url }}" alt="{{ person.name }}">{% else %}{{ parts[0] | slice: 0 }}{{ parts.last | slice: 0 }}{% endif %}</span>
    <div class="faculty-body">
      <p class="person-name">{{ person.name }}</p>
      <p class="person-role coral-text">{{ person.role | replace: '</br>', ' · ' | replace: '<br/>', ' · ' | replace: '<br>', ' · ' }}</p>
    </div>
    <span class="card-cta">View profile <i class="ti ti-arrow-right"></i></span>
  </a>
  {% endfor %}

  {% include people_group.html people=phd heading="PhD students" %}
  {% include people_group.html people=ms heading="Master's students" %}
  {% include people_group.html people=bs heading="Undergraduate students" %}
  {% include people_group.html people=visiting heading="Visiting scholars" %}
</section>

{% include gallery.html %}
