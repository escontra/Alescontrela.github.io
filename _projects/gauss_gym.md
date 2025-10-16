---
layout: page
title: "Gauss Gym"
description: Using advances in generative modeling to learn reward functions from unlabeled videos.
img: assets/img/viper/viper_method.png
importance: 0
category: work
---

<div class="row">
    <div class="text-center col-3 col-sm-3 mt-4 mt-md-0">
        <h3><a href="https://arxiv.org/pdf/2305.14343.pdf">Paper<br/><i class="fas fa-file-pdf"></i></a></h3>
    </div>
    <div class="text-center col-3 col-sm-3 mt-4 mt-md-0">
        <h3><a href="https://twitter.com/AleEscontrela/status/1661363555495710721?s=20">Twitter<br/><i class="fab fa-twitter"></i></a></h3>
    </div>
    <div class="text-center col-3 col-sm-3 mt-4 mt-md-0">
        <h3><a href="https://github.com/Alescontrela/viper_rl#downloading-data">Data<br/><i class="fas fa-database"></i></a></h3>
    </div>
    <div class="text-center col-3 col-sm-3 mt-4 mt-md-0">
        <h3><a href="https://github.com/Alescontrela/viper_rl">Code<br/><i class="fas fa-file-code"></i></a></h3>
    </div>
</div>
<br/>


## Publication info
{: .no_toc}
---
<div class="publications">
{% bibliography -f papers -q @*[title=Video Prediction Models as Rewards for Reinforcement Learning]* --max 0 %}
</div>



<br/>

## Interactive 3D Visualizations
---

<style>
.viser-carousel-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.viser-carousel-container {
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
  background: #000;
  border-radius: 8px;
}

.viser-carousel-item {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
}

.viser-carousel-item.active {
  opacity: 1;
  pointer-events: all;
}

.viser-carousel-item iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.viser-thumbnail-nav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.viser-nav-arrow {
  background: #333;
  color: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
}

.viser-nav-arrow:hover {
  background: #555;
}

.viser-thumbnail-row {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px;
  max-width: 800px;
}

.viser-thumbnail {
  min-width: 150px;
  height: 100px;
  background: #222;
  border-radius: 4px;
  cursor: pointer;
  border: 3px solid transparent;
  transition: border-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.viser-thumbnail:hover {
  transform: scale(1.05);
  border-color: #666;
}

.viser-thumbnail.active {
  border-color: #4CAF50;
}

.click-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px 40px;
  border-radius: 8px;
  font-size: 18px;
  pointer-events: auto;
  transition: opacity 0.3s;
  cursor: pointer;
  z-index: 10;
}

.click-overlay.hidden {
  opacity: 0;
  pointer-events: none;
}
</style>

<div class="viser-carousel-wrapper">
  <div class="viser-carousel-container" id="viserCarousel">
    <div class="viser-carousel-item active" data-index="0">
      <iframe src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/amazon.viser" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="clickOverlay0">
        Click and drag to interact!
      </div>
    </div>
    <div class="viser-carousel-item" data-index="1">
      <iframe src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/construction.viser" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="clickOverlay1">
        Click and drag to interact!
      </div>
    </div>
  </div>

  <div class="viser-thumbnail-nav">
    <button class="viser-nav-arrow" id="viserPrevBtn" onclick="viserNavigate(-1)">&#8249;</button>
    <div class="viser-thumbnail-row" id="viserThumbnails">
      <div class="viser-thumbnail active" data-index="0" onclick="viserGoTo(0)">
        Amazon
      </div>
      <div class="viser-thumbnail" data-index="1" onclick="viserGoTo(1)">
        Construction
      </div>
    </div>
    <button class="viser-nav-arrow" id="viserNextBtn" onclick="viserNavigate(1)">&#8250;</button>
  </div>
</div>

<script>
let currentViserIndex = 0;
let hasInteracted = false;

function viserNavigate(direction) {
  const items = document.querySelectorAll('.viser-carousel-item');
  const thumbnails = document.querySelectorAll('.viser-thumbnail');

  currentViserIndex += direction;

  if (currentViserIndex < 0) currentViserIndex = items.length - 1;
  if (currentViserIndex >= items.length) currentViserIndex = 0;

  viserGoTo(currentViserIndex);
}

function viserGoTo(index) {
  const items = document.querySelectorAll('.viser-carousel-item');
  const thumbnails = document.querySelectorAll('.viser-thumbnail');

  items.forEach((item, i) => {
    if (i === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  thumbnails.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active');
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      thumb.classList.remove('active');
    }
  });

  currentViserIndex = index;
}

// Hide overlay on interaction
function hideOverlays() {
  if (!hasInteracted) {
    hasInteracted = true;
    const overlays = document.querySelectorAll('.click-overlay');
    overlays.forEach(overlay => overlay.classList.add('hidden'));
  }
}

// Hide on click anywhere in the carousel
document.getElementById('viserCarousel').addEventListener('click', hideOverlays);

// Hide when mouse enters the carousel area (user is about to interact)
document.getElementById('viserCarousel').addEventListener('mouseenter', hideOverlays);

// Also hide when clicking directly on the overlay
document.querySelectorAll('.click-overlay').forEach(overlay => {
  overlay.addEventListener('click', hideOverlays);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    viserNavigate(-1);
  } else if (e.key === 'ArrowRight') {
    viserNavigate(1);
  }
});
</script>

<br/>

## Acknowledgements
{: .no_toc}
---
This work was supported in part by an NSF Fellowship, NSF NRI #2024675, ONR MURI N00014-22-1-2773, Komatsu, and the Vanier Canada Graduate Scholarship. We also thank Google TPU Research Cloud for providing compute resources.

<br/>

## How to cite
{: .no_toc}
---

<div class="publications">
{% bibliography -f papers_new_pref -q @*[title=Video Prediction Models as Rewards for Reinforcement Learning]* --max 0 %}
</div>