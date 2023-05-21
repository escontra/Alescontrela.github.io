---
layout: page
permalink: /publications/
title: publications
description: Conference proceedings, workshop papers, journal papers, etc. <u><a href='https://scholar.google.com/citations?user=aLrVFiUAAAAJ'>Google Scholar</a></u> contains a more complete list of my publications.
years: [2018, 2020, 2021, 2022, 2023]
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->
<div class="publications">

{%- assign years = page.years | sort | reverse %}
{%- for y in years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
