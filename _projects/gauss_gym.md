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
  overflow: hidden;
  position: relative;
}

.viser-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.viser-thumbnail-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
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
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/cute_bridge.viser&initialCameraPosition=7.281,4.125,1.143&initialCameraLookAt=13.403,2.937,-0.042&initialCameraUp=-0.000,0.000,1.000&initialFov=60.0&fixedDpr=2.0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="clickOverlay0">
        Click and drag to interact!
      </div>
    </div>
    <div class="viser-carousel-item" data-index="1">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/osaka.viser&initialCameraPosition=15.510,8.662,-0.634&initialCameraLookAt=8.800,6.051,0.017&initialCameraUp=-0.000,0.000,1.000&initialFov=30.0&fixedDpr=2.0&robotViewPosition=bottom" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="clickOverlay1">
        Click and drag to interact!
      </div>
    </div>
    <div class="viser-carousel-item" data-index="2">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/miyajima.viser&initialCameraPosition=11.501,-2.827,1.214&initialCameraLookAt=6.564,2.285,-0.107&initialCameraUp=-0.000,0.000,1.000&initialFov=28.0&fixedDpr=2.0&robotViewPosition=bottom" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="clickOverlay2">
        Click and drag to interact!
      </div>
    </div>
    <div class="viser-carousel-item" data-index="3">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/grace_cathedral.viser&initialCameraPosition=6.479,0.363,0.001&initialCameraLookAt=0.203,2.342,-0.203&initialCameraUp=-0.000,0.000,1.000&initialFov=48.0&fixedDpr=2.0&robotViewPosition=bottom" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="clickOverlay3">
        Click and drag to interact!
      </div>
    </div>
  </div>

  <div class="viser-thumbnail-nav">
    <button class="viser-nav-arrow" id="viserPrevBtn" onclick="viserNavigate(-1)">&#8249;</button>
    <div class="viser-thumbnail-row" id="viserThumbnails">
      <div class="viser-thumbnail active" data-index="0" onclick="viserGoTo(0)">
        <img src="https://gauss-gym.escontrela.me/berkeley.jpg" alt="Berkeley">
        <div class="viser-thumbnail-label">Berkeley</div>
      </div>
      <div class="viser-thumbnail" data-index="1" onclick="viserGoTo(1)">
        <img src="https://gauss-gym.escontrela.me/osaka.jpeg" alt="Osaka">
        <div class="viser-thumbnail-label">Osaka</div>
      </div>
      <div class="viser-thumbnail" data-index="2" onclick="viserGoTo(2)">
        <img src="https://gauss-gym.escontrela.me/miyajima.jpg" alt="Miyajima">
        <div class="viser-thumbnail-label">Miyajima</div>
      </div>
      <div class="viser-thumbnail" data-index="3" onclick="viserGoTo(3)">
        <img src="https://gauss-gym.escontrela.me/san_francisco.jpg" alt="San Francisco">
        <div class="viser-thumbnail-label">San Francisco</div>
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
    const iframe = item.querySelector('iframe');
    if (i === index) {
      item.classList.add('active');
      // Load the iframe for the active item if not already loaded
      if (iframe && iframe.dataset.src && iframe.src !== iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
      }
    } else {
      item.classList.remove('active');
      // Unload the iframe for inactive items to free memory
      if (iframe && iframe.src) {
        iframe.src = '';
      }
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

// Initialize the first carousel item on page load
document.addEventListener('DOMContentLoaded', function() {
  viserGoTo(0);
});

// Hide overlay on interaction
function hideOverlays() {
  if (!hasInteracted) {
    hasInteracted = true;
    const overlays = document.querySelectorAll('.click-overlay');
    overlays.forEach(overlay => overlay.classList.add('hidden'));
  }
}

const carousel = document.getElementById('viserCarousel');

// Hide on click anywhere in the carousel
carousel.addEventListener('click', hideOverlays);

// Hide when mouse enters the carousel area (user is about to interact)
carousel.addEventListener('mouseenter', hideOverlays);

// Hide on touch/drag (mobile)
carousel.addEventListener('touchstart', hideOverlays);
carousel.addEventListener('touchmove', hideOverlays);

// Also hide when clicking/touching directly on the overlay
document.querySelectorAll('.click-overlay').forEach(overlay => {
  overlay.addEventListener('click', hideOverlays);
  overlay.addEventListener('touchstart', hideOverlays);
});
</script>

<br/>

## GrandTour Scenes (interactive)
---

<div class="viser-carousel-wrapper">
  <div class="viser-carousel-container" id="gtCarousel">
    <div class="viser-carousel-item active" data-index="0">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/construction.viser&initialCameraPosition=21.174,5.955,0.292&initialCameraLookAt=25.099,10.757,-3.420&initialCameraUp=-0.000,0.000,1.000&initialFov=77.0&fixedDpr=2.0&robotViewPosition=bottom" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="gtClickOverlay0">
        Click and drag to interact!
      </div>
    </div>
    <div class="viser-carousel-item" data-index="1">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/snow.viser&initialCameraPosition=46.683,19.043,-0.083&initialCameraLookAt=51.083,7.734,-0.183&initialCameraUp=-0.000,0.000,1.000&initialFov=35.0&fixedDpr=2.0&robotViewPosition=bottom" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="gtClickOverlay1">
        Click and drag to interact!
      </div>
    </div>
    <div class="viser-carousel-item" data-index="2">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/warehouse.viser&initialCameraPosition=7.446,5.079,0.518&initialCameraLookAt=7.253,5.132,0.488&initialCameraUp=-0.000,0.000,1.000&initialFov=70.0&fixedDpr=2.0&robotViewPosition=bottom" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="gtClickOverlay2">
        Click and drag to interact!
      </div>
    </div>
    <div class="viser-carousel-item" data-index="3">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/forest.viser&initialCameraPosition=2.745,2.480,0.069&initialCameraLookAt=7.820,7.623,0.266&initialCameraUp=-0.000,0.000,1.000&initialFov=48.0&fixedDpr=2.0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="gtClickOverlay3">
        Click and drag to interact!
      </div>
    </div>
    <div class="viser-carousel-item" data-index="4">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/grindelwald.viser&initialCameraPosition=42.854,24.166,0.785&initialCameraLookAt=35.631,23.912,0.644&initialCameraUp=-0.000,0.000,1.000&initialFov=37.0&fixedDpr=2.0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="gtClickOverlay4">
        Click and drag to interact!
      </div>
    </div>
  </div>

  <div class="viser-thumbnail-nav">
    <button class="viser-nav-arrow" id="gtPrevBtn" onclick="gtNavigate(-1)">&#8249;</button>
    <div class="viser-thumbnail-row" id="gtThumbnails">
      <div class="viser-thumbnail active" data-index="0" onclick="gtGoTo(0)">
        Construction
      </div>
      <div class="viser-thumbnail" data-index="1" onclick="gtGoTo(1)">
        Snow
      </div>
      <div class="viser-thumbnail" data-index="2" onclick="gtGoTo(2)">
        Warehouse
      </div>
      <div class="viser-thumbnail" data-index="3" onclick="gtGoTo(3)">
        Forest
      </div>
      <div class="viser-thumbnail" data-index="4" onclick="gtGoTo(4)">
        Grindelwald
      </div>
    </div>
    <button class="viser-nav-arrow" id="gtNextBtn" onclick="gtNavigate(1)">&#8250;</button>
  </div>
</div>

<script>
let currentGtIndex = 0;
let hasGtInteracted = false;

function gtNavigate(direction) {
  const items = document.querySelectorAll('#gtCarousel .viser-carousel-item');
  const thumbnails = document.querySelectorAll('#gtThumbnails .viser-thumbnail');

  currentGtIndex += direction;

  if (currentGtIndex < 0) currentGtIndex = items.length - 1;
  if (currentGtIndex >= items.length) currentGtIndex = 0;

  gtGoTo(currentGtIndex);
}

function gtGoTo(index) {
  const items = document.querySelectorAll('#gtCarousel .viser-carousel-item');
  const thumbnails = document.querySelectorAll('#gtThumbnails .viser-thumbnail');

  items.forEach((item, i) => {
    const iframe = item.querySelector('iframe');
    if (i === index) {
      item.classList.add('active');
      // Load the iframe for the active item if not already loaded
      if (iframe && iframe.dataset.src && iframe.src !== iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
      }
    } else {
      item.classList.remove('active');
      // Unload the iframe for inactive items to free memory
      if (iframe && iframe.src) {
        iframe.src = '';
      }
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

  currentGtIndex = index;
}

// Initialize the first carousel item on page load
document.addEventListener('DOMContentLoaded', function() {
  gtGoTo(0);
});

// Hide overlay on interaction
function hideGtOverlays() {
  if (!hasGtInteracted) {
    hasGtInteracted = true;
    const overlays = document.querySelectorAll('#gtCarousel .click-overlay');
    overlays.forEach(overlay => overlay.classList.add('hidden'));
  }
}

const gtCarousel = document.getElementById('gtCarousel');

// Hide on click anywhere in the carousel
gtCarousel.addEventListener('click', hideGtOverlays);

// Hide when mouse enters the carousel area (user is about to interact)
gtCarousel.addEventListener('mouseenter', hideGtOverlays);

// Hide on touch/drag (mobile)
gtCarousel.addEventListener('touchstart', hideGtOverlays);
gtCarousel.addEventListener('touchmove', hideGtOverlays);

// Also hide when clicking/touching directly on the overlay
document.querySelectorAll('#gtCarousel .click-overlay').forEach(overlay => {
  overlay.addEventListener('click', hideGtOverlays);
  overlay.addEventListener('touchstart', hideGtOverlays);
});
</script>

<br/>

## ARKit Scenes (interactive)
---

<div class="viser-carousel-wrapper">
  <div class="viser-carousel-container" id="arkitCarousel">
    <div class="viser-carousel-item active" data-index="0">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/arkit_living_room.viser&initialCameraPosition=22.319,8.537,0.725&initialCameraLookAt=22.164,14.110,-5.715&initialCameraUp=-0.000,0.000,1.000&initialFov=81.0&fixedDpr=2.0&robotViewPosition=bottom" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="arkitClickOverlay0">
        Click and drag to interact!
      </div>
    </div>
    <div class="viser-carousel-item" data-index="1">
      <iframe data-src="/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/arkit_office.viser&initialCameraPosition=9.836,19.375,0.767&initialCameraLookAt=12.167,13.237,-2.522&initialCameraUp=-0.000,0.000,1.000&initialFov=70.0&fixedDpr=2.0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div class="click-overlay" id="arkitClickOverlay1">
        Click and drag to interact!
      </div>
    </div>
  </div>

  <div class="viser-thumbnail-nav">
    <button class="viser-nav-arrow" id="arkitPrevBtn" onclick="arkitNavigate(-1)">&#8249;</button>
    <div class="viser-thumbnail-row" id="arkitThumbnails">
      <div class="viser-thumbnail active" data-index="0" onclick="arkitGoTo(0)">
        Living Room
      </div>
      <div class="viser-thumbnail" data-index="1" onclick="arkitGoTo(1)">
        Office
      </div>
    </div>
    <button class="viser-nav-arrow" id="arkitNextBtn" onclick="arkitNavigate(1)">&#8250;</button>
  </div>
</div>

<script>
let currentArkitIndex = 0;
let hasArkitInteracted = false;

function arkitNavigate(direction) {
  const items = document.querySelectorAll('#arkitCarousel .viser-carousel-item');
  const thumbnails = document.querySelectorAll('#arkitThumbnails .viser-thumbnail');

  currentArkitIndex += direction;

  if (currentArkitIndex < 0) currentArkitIndex = items.length - 1;
  if (currentArkitIndex >= items.length) currentArkitIndex = 0;

  arkitGoTo(currentArkitIndex);
}

function arkitGoTo(index) {
  const items = document.querySelectorAll('#arkitCarousel .viser-carousel-item');
  const thumbnails = document.querySelectorAll('#arkitThumbnails .viser-thumbnail');

  items.forEach((item, i) => {
    const iframe = item.querySelector('iframe');
    if (i === index) {
      item.classList.add('active');
      // Load the iframe for the active item if not already loaded
      if (iframe && iframe.dataset.src && iframe.src !== iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
      }
    } else {
      item.classList.remove('active');
      // Unload the iframe for inactive items to free memory
      if (iframe && iframe.src) {
        iframe.src = '';
      }
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

  currentArkitIndex = index;
}

// Initialize the first carousel item on page load
document.addEventListener('DOMContentLoaded', function() {
  arkitGoTo(0);
});

// Hide overlay on interaction
function hideArkitOverlays() {
  if (!hasArkitInteracted) {
    hasArkitInteracted = true;
    const overlays = document.querySelectorAll('#arkitCarousel .click-overlay');
    overlays.forEach(overlay => overlay.classList.add('hidden'));
  }
}

const arkitCarousel = document.getElementById('arkitCarousel');

// Hide on click anywhere in the carousel
arkitCarousel.addEventListener('click', hideArkitOverlays);

// Hide when mouse enters the carousel area (user is about to interact)
arkitCarousel.addEventListener('mouseenter', hideArkitOverlays);

// Hide on touch/drag (mobile)
arkitCarousel.addEventListener('touchstart', hideArkitOverlays);
arkitCarousel.addEventListener('touchmove', hideArkitOverlays);

// Also hide when clicking/touching directly on the overlay
document.querySelectorAll('#arkitCarousel .click-overlay').forEach(overlay => {
  overlay.addEventListener('click', hideArkitOverlays);
  overlay.addEventListener('touchstart', hideArkitOverlays);
});
</script>

<br/>

## Video Gallery
---

<style>
.video-grid-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 0;
  width: 100%;
  aspect-ratio: 1;
  background: #000;
}

/* Mobile: 2x2 grid */
@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
}

.video-grid-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.video-grid-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-grid-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #666;
  font-size: 18px;
}
</style>

<div class="video-grid-container">
  <div id="videoGrid" class="video-grid">
    <div class="video-grid-loading">Loading videos...</div>
  </div>
</div>

<script>
(function() {
  const BUCKET_URL = 'https://gauss-gym-videos.escontrela.me';
  const MANIFEST_URL = `${BUCKET_URL}/videos.json`;

  // Determine grid size based on screen width
  function getGridSize() {
    return window.innerWidth <= 768 ? 4 : 25; // 2x2 or 5x5
  }

  // Randomly sample n items from array
  function randomSample(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }

  // Create video element with appropriate settings
  function createVideoElement(videoUrl) {
    const video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';

    // Set source
    video.src = videoUrl;

    // Handle errors gracefully
    video.onerror = function() {
      console.error('Failed to load video:', videoUrl);
    };

    return video;
  }

  // Load and populate video grid
  async function loadVideoGrid() {
    const gridContainer = document.getElementById('videoGrid');

    try {
      // Fetch video manifest
      const response = await fetch(MANIFEST_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch manifest: ${response.status}`);
      }

      const data = await response.json();
      const videos = data.videos || [];

      if (videos.length === 0) {
        gridContainer.innerHTML = '<div class="video-grid-loading">No videos found</div>';
        return;
      }

      // Determine how many videos we need
      const gridSize = getGridSize();

      // Randomly sample videos
      const selectedVideos = randomSample(videos, gridSize);

      // Clear loading message
      gridContainer.innerHTML = '';

      // Create video elements
      selectedVideos.forEach(videoFilename => {
        const videoUrl = `${BUCKET_URL}/${videoFilename}`;
        const gridItem = document.createElement('div');
        gridItem.className = 'video-grid-item';

        const video = createVideoElement(videoUrl);
        gridItem.appendChild(video);
        gridContainer.appendChild(gridItem);
      });

      // Use Intersection Observer to only play videos when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target.querySelector('video');
          if (video) {
            if (entry.isIntersecting) {
              video.play().catch(e => console.error('Autoplay failed:', e));
            } else {
              video.pause();
            }
          }
        });
      }, { threshold: 0.1 });

      // Observe all grid items
      document.querySelectorAll('.video-grid-item').forEach(item => {
        observer.observe(item);
      });

    } catch (error) {
      console.error('Error loading video grid:', error);
      gridContainer.innerHTML = `<div class="video-grid-loading">Error loading videos: ${error.message}</div>`;
    }
  }

  // Reload grid on resize if crossing mobile/desktop threshold
  let lastGridSize = getGridSize();
  window.addEventListener('resize', () => {
    const newGridSize = getGridSize();
    if (newGridSize !== lastGridSize) {
      lastGridSize = newGridSize;
      loadVideoGrid();
    }
  });

  // Load grid when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadVideoGrid);
  } else {
    loadVideoGrid();
  }
})();
</script>

<br/>
