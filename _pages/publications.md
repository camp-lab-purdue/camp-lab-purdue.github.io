---
layout: default
title: Publications
permalink: /publications/
description: Publications from the CAMP Lab at Purdue University.
---
<section class="section publications">
  <h1 class="page-title">Publications</h1>
  <p class="page-sub">Peer-reviewed research from the CAMP Lab.</p>

  <div id="pub-filters" class="filter-chips" role="group" aria-label="Filter by topic"></div>

  <div id="all" class="pub-list">
    <!-- To add a new year, copy a block below and change the year in BOTH the
         heading id and the --query filter. Only 2024+ (lab-era) papers are shown. -->
    <h2 class="pub-year" id="y2026">2026</h2>
    {% bibliography --query @*[year=2026] %}

    <h2 class="pub-year" id="y2025">2025</h2>
    {% bibliography --query @*[year=2025] %}

    <h2 class="pub-year" id="y2024">2024</h2>
    {% bibliography --query @*[year=2024] %}
  </div>
</section>
<script src="{{ '/assets/js/publications.js' | relative_url }}" defer></script>
