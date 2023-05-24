---
layout: page
permalink: /publications/
title: publications
description: 
years: [2018, 2020, 2021, 2022, 2023]
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->
<div class="publications">
<p> Please refer to <a href="https://scholar.google.com/citations?user={{ site.scholar_userid }}" title="Google Scholar">Google Scholar <i class="ai ai-google-scholar"></i></a> for more info :) </p>
{%- assign years = page.years | sort | reverse %}
{%- for y in years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
