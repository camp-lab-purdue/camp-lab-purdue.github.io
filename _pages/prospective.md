---
layout: default
title: Prospective students
permalink: /prospective/
description: Information for prospective students interested in joining the CAMP Lab.
---
<section class="section prospective">
  <h1 class="page-title">Prospective students</h1>
  <p class="page-sub">Interested in joining the CAMP Lab? Read on.</p>

  <div class="prose">
    <p>The CAMP Lab is looking for curious, motivated students who want to work on
    lifelong learning, explainable AI, or robotics.
    We welcome applicants at all levels — prospective PhD students and postdocs, as well as Purdue undergraduate and master's students
    looking for research experience.</p>

    <h2>What we look for</h2>
    <ul>
      <li>A strong foundation in machine learning, programming, statistics, and/or robotics.</li>
      <li>An interest in reinforcement learning, lifelong learning, explainability/interpretability, theory of mind, or robotics.<br/><i>Prior experience is strongly recommended, particularly for PhD and postdoc.</i></li>
      <li>Self-motivated students who make steady progress on their own and take ownership of shaping their problem and direction.</li>
    </ul>

    <h2>How to reach out</h2>
    <p>If the lab's research resonates with you, please fill out the interest form below.<br/>I will contact you if there is a potential fit.</p>
  </div>

  <!-- Express-interest call to action.
       TO ENABLE THE BUTTON: paste your Google Form link between the quotes below.
       While it's left empty (""), a disabled "coming soon" placeholder shows instead. -->
  {% assign form_url = "" %}
  <div class="cta-card">
    <div>
      <p class="cta-title">Express your interest</p>
      {% if form_url != "" %}
      <p class="cta-sub">A short form about your background and what you'd like to work on.</p>
      {% else %}
      <p class="cta-sub">An interest form is coming soon. In the meantime, feel free to reach out by email.</p>
      {% endif %}
    </div>
    {% if form_url != "" %}
    <a class="btn btn-primary" href="{{ form_url }}">Open the interest form <i class="ti ti-arrow-right"></i></a>
    {% else %}
    <span class="btn btn-disabled" aria-disabled="true">Form coming soon</span>
    {% endif %}
  </div>

  <!-- Optional: embed the form inline instead of (or in addition to) the button above.
       Paste your Google Form's embed URL into the src and uncomment.
  <div class="form-embed">
    <iframe src="FORM_EMBED_URL" width="100%" height="900" frameborder="0">Loading…</iframe>
  </div>
  -->
</section>
