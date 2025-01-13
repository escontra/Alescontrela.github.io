---
layout: page
title: "Autonomously Untangling Long Cables"
description: Sliding and Grasping for Tangle Manipulation (SGTM)
img: assets/img/autonomous_untangling/knot_detection/12.png
importance: 3
category: work
---
<div class="row">
    <div class="text-center col-6 col-sm-6 mt-6 mt-md-0">
        <h4><a href="https://arxiv.org/abs/2207.07813">Paper</a></h4>
    </div>
    <div class="text-center col-6 col-sm-6 mt-6 mt-md-0">
        <h4><a href="https://twitter.com/vainavi_v/status/1553829336515416064?s=20&t=ZX_0LUWEp-_JewObBaZWNQ">Twitter</a></h4>
    </div>
</div>

<br/>
<div class="row justify-content-sm-center">
    <a href="https://www.newscientist.com/article/2329463-robot-unties-knotted-cables-but-cant-pick-them-up-off-the-floor/" class="col-6 col-sm-6 col-md-3 mt-3 mt-md-0">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/newscientist.png"
          alt="Card image cap"> 
    </a>
</div>

<br/>
## Publication info
---
<div class="publications">
{% bibliography -f papers -q @*[title=Autonomously Untangling Long Cables]* %}
</div>

<br/>
## Sliding and Grasping for Tangle Manipulation (SGTM)
---

The following video briefly summarizes the SGTM algorithm. Our <a href="https://www.youtube.com/watch?v=Vckz_Agx2b4">RSS spotlight</a> provides a more detailed explanation of the algorithm, and discusses interesting experimental evaluations.

{% raw %}
<p style="position: relative; text-align: center; height: 0; padding-bottom: 56.25%; margin-bottom: 0;">
<iframe frameborder="0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin-bottom: -.5em" src="https://www.youtube.com/embed/WCSj4_FyayY?rel=0" allowfullscreen=""></iframe>
</p>
{% endraw %}


<br/>

## Knot Detection
---

<div id="carouselExampleIndicators" class="carousel" data-ride="carousel" data-interval="1500">
  <div class="carousel-inner">
    <div class="carousel-item active" data-interval="2500">
      <img class="d-block rounded border" src="/assets/img/autonomous_untangling/knot_detection/12.png" alt="First slide">
    </div>

    {% for image in site.static_files %}
        {% if image.path contains '/assets/img/autonomous_untangling/knot_detection' %}
            <div class="carousel-item">
                <img class="d-block rounded border" src="{{ site.baseurl }}{{ image.path }}" alt="Second slide">
            </div>
        {% endif %}
    {% endfor %}

  </div>
</div>

<br/>

## RSS 2021 Spotlight
---

{% raw %}
<p style="position: relative; text-align: center; height: 0; padding-bottom: 56.25%; margin-bottom: 0;">
<iframe frameborder="0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin-bottom: -.5em" src="https://www.youtube.com/embed/Vckz_Agx2b4?rel=0" allowfullscreen=""></iframe>
</p>
{% endraw %}


<br/>

## Acknowledgements
---
This research was performed at the AUTOLAB at UC Berkeley in affiliation with the Berkeley AI Research (BAIR) Lab, the CITRIS “People and Robots” (CPAR) Initiative, and the RealTime Intelligent Secure Execution (RISE) Lab. The authors were supported in part by donations from Toyota Research Institute and by equipment grants from PhotoNeo, Nvidia, and Intuitive Surgical.

<br/>
## How to cite
---
<div class="publications">
{% bibliography -f papers_new_pref -q @*[title=Autonomously Untangling Long Cables]* --max 0 %}
</div>