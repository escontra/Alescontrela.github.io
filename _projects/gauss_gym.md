---
layout: page
title: "Gauss Gym"
description: Using advances in generative modeling to learn reward functions from unlabeled videos.
img: assets/img/viper/viper_method.png
importance: 0
category: work
---

<style>
.video-banner-container {
  width: 100%;
  margin: -20px 0 40px 0;
  position: relative;
  overflow: hidden;
}

.video-banner-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0;
  width: 100%;
  height: 600px;
  background: #000;
}

/* Mobile: 4x3 grid */
@media (max-width: 768px) {
  .video-banner-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    height: 450px;
  }
}

.video-banner-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.video-banner-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 10;
}

.banner-title {
  font-size: 120px;
  font-weight: 900;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.05em;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

@media (max-width: 768px) {
  .banner-title {
    font-size: 60px;
  }
}

.video-banner-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  color: #666;
  font-size: 18px;
  background: #000;
}

@media (max-width: 768px) {
  .video-banner-loading {
    min-height: 450px;
  }
}
</style>

<div class="video-banner-container">
  <div id="videoBanner" class="video-banner-grid">
    <div class="video-banner-loading">Loading...</div>
  </div>
  <div class="banner-overlay">
    <h1 class="banner-title">GaussGym</h1>
  </div>
</div>

<script>
(function() {
  const BUCKET_URL = 'https://gauss-gym-videos.escontrela.me';
  const MANIFEST_URL = `${BUCKET_URL}/videos.json`;

  // Determine grid size based on screen width
  function getBannerGridSize() {
    return window.innerWidth <= 768 ? 12 : 15; // 4x3 or 5x3
  }

  // Randomly sample n items from array
  function randomSample(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }

  // Create video element with appropriate settings
  function createBannerVideoElement(videoUrl) {
    const video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = videoUrl;
    video.onerror = function() {
      console.error('Failed to load video:', videoUrl);
    };
    return video;
  }

  // Load and populate video banner
  async function loadVideoBanner() {
    const gridContainer = document.getElementById('videoBanner');

    try {
      const response = await fetch(MANIFEST_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch manifest: ${response.status}`);
      }

      const data = await response.json();
      const videos = data.videos || [];

      if (videos.length === 0) {
        gridContainer.innerHTML = '<div class="video-banner-loading">No videos found</div>';
        return;
      }

      const gridSize = getBannerGridSize();
      const selectedVideos = randomSample(videos, gridSize);
      gridContainer.innerHTML = '';

      selectedVideos.forEach(videoFilename => {
        const videoUrl = `${BUCKET_URL}/${videoFilename}`;
        const gridItem = document.createElement('div');
        gridItem.className = 'video-banner-item';
        const video = createBannerVideoElement(videoUrl);
        gridItem.appendChild(video);
        gridContainer.appendChild(gridItem);
      });

      // Auto-play all videos
      document.querySelectorAll('.video-banner-item video').forEach(video => {
        video.play().catch(e => console.error('Autoplay failed:', e));
      });

    } catch (error) {
      console.error('Error loading video banner:', error);
      gridContainer.innerHTML = `<div class="video-banner-loading">Error: ${error.message}</div>`;
    }
  }

  // Load banner when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadVideoBanner);
  } else {
    loadVideoBanner();
  }
})();
</script>

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

## Interactive 3D Scenes
---

<style>
.scene-viewer-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

/* Category selector */
.category-selector {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.category-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 60px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
  min-width: 200px;
  border: none;
  font-size: 18px;
  font-weight: bold;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.category-card.iphone {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.category-card.grandtour {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.category-card.arkit {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

/* Scene thumbnails */
.scene-thumbnails {
  display: none;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  animation: fadeIn 0.3s ease-in;
}

.scene-thumbnails.active {
  display: flex;
}

.scene-thumbnail {
  min-width: 150px;
  height: 100px;
  background: #222;
  border-radius: 8px;
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

.scene-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.scene-thumbnail-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}

.scene-thumbnail:hover {
  transform: scale(1.05);
  border-color: #666;
}

.scene-thumbnail.active {
  border-color: #4CAF50;
}

/* Viewer container */
.scene-viewer-container {
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
  background: #000;
  border-radius: 8px;
  display: none;
}

.scene-viewer-container.active {
  display: block;
  animation: fadeIn 0.3s ease-in;
}

.scene-viewer-container iframe {
  width: 100%;
  height: 100%;
  border: none;
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

.back-button {
  background: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: background 0.3s;
  display: none;
}

.back-button.active {
  display: inline-block;
}

.back-button:hover {
  background: #555;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

<div class="scene-viewer-wrapper">
  <!-- Back button -->
  <button class="back-button" id="backButton" onclick="sceneViewer.showCategories()">
    &#8249; Back to Categories
  </button>

  <!-- Category selection -->
  <div class="category-selector" id="categorySelector">
    <button class="category-card iphone" onclick="sceneViewer.selectCategory('iphone')">
      <div>iPhone Scenes</div>
      <div style="font-size: 12px; margin-top: 8px; opacity: 0.9;">4 locations</div>
    </button>
    <button class="category-card grandtour" onclick="sceneViewer.selectCategory('grandtour')">
      <div>GrandTour Scenes</div>
      <div style="font-size: 12px; margin-top: 8px; opacity: 0.9;">5 locations</div>
    </button>
    <button class="category-card arkit" onclick="sceneViewer.selectCategory('arkit')">
      <div>ARKit Scenes</div>
      <div style="font-size: 12px; margin-top: 8px; opacity: 0.9;">2 locations</div>
    </button>
  </div>

  <!-- Scene thumbnails (hidden by default) -->
  <div class="scene-thumbnails" id="sceneThumbnails"></div>

  <!-- Viewer container (hidden by default) -->
  <div class="scene-viewer-container" id="sceneViewer">
    <iframe id="sceneIframe"></iframe>
    <div class="click-overlay" id="clickOverlay">Click and drag to interact!</div>
  </div>
</div>

<script>
const sceneViewer = {
  currentCategory: null,
  currentScene: null,
  hasInteracted: false,

  scenes: {
    iphone: [
      {
        name: 'Berkeley',
        thumbnail: 'https://gauss-gym.escontrela.me/berkeley.jpg',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/cute_bridge.viser&initialCameraPosition=7.281,4.125,1.143&initialCameraLookAt=13.403,2.937,-0.042&initialCameraUp=-0.000,0.000,1.000&initialFov=60.0&fixedDpr=2.0'
      },
      {
        name: 'Osaka',
        thumbnail: 'https://gauss-gym.escontrela.me/osaka.jpeg',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/osaka.viser&initialCameraPosition=15.510,8.662,-0.634&initialCameraLookAt=8.800,6.051,0.017&initialCameraUp=-0.000,0.000,1.000&initialFov=30.0&fixedDpr=2.0&robotViewPosition=bottom'
      },
      {
        name: 'Miyajima',
        thumbnail: 'https://gauss-gym.escontrela.me/miyajima.jpg',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/miyajima.viser&initialCameraPosition=11.501,-2.827,1.214&initialCameraLookAt=6.564,2.285,-0.107&initialCameraUp=-0.000,0.000,1.000&initialFov=28.0&fixedDpr=2.0&robotViewPosition=bottom'
      },
      {
        name: 'San Francisco',
        thumbnail: 'https://gauss-gym.escontrela.me/san_francisco.jpg',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/grace_cathedral.viser&initialCameraPosition=6.479,0.363,0.001&initialCameraLookAt=0.203,2.342,-0.203&initialCameraUp=-0.000,0.000,1.000&initialFov=48.0&fixedDpr=2.0&robotViewPosition=bottom'
      }
    ],
    grandtour: [
      {
        name: 'Construction',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/construction.viser&initialCameraPosition=21.174,5.955,0.292&initialCameraLookAt=25.099,10.757,-3.420&initialCameraUp=-0.000,0.000,1.000&initialFov=77.0&fixedDpr=2.0&robotViewPosition=bottom'
      },
      {
        name: 'Snow',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/snow.viser&initialCameraPosition=46.683,19.043,-0.083&initialCameraLookAt=51.083,7.734,-0.183&initialCameraUp=-0.000,0.000,1.000&initialFov=35.0&fixedDpr=2.0&robotViewPosition=bottom'
      },
      {
        name: 'Warehouse',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/warehouse.viser&initialCameraPosition=7.446,5.079,0.518&initialCameraLookAt=7.253,5.132,0.488&initialCameraUp=-0.000,0.000,1.000&initialFov=70.0&fixedDpr=2.0&robotViewPosition=bottom'
      },
      {
        name: 'Forest',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/forest.viser&initialCameraPosition=2.745,2.480,0.069&initialCameraLookAt=7.820,7.623,0.266&initialCameraUp=-0.000,0.000,1.000&initialFov=48.0&fixedDpr=2.0'
      },
      {
        name: 'Grindelwald',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/grindelwald.viser&initialCameraPosition=42.854,24.166,0.785&initialCameraLookAt=35.631,23.912,0.644&initialCameraUp=-0.000,0.000,1.000&initialFov=37.0&fixedDpr=2.0'
      }
    ],
    arkit: [
      {
        name: 'Living Room',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/arkit_living_room.viser&initialCameraPosition=22.319,8.537,0.725&initialCameraLookAt=22.164,14.110,-5.715&initialCameraUp=-0.000,0.000,1.000&initialFov=81.0&fixedDpr=2.0&robotViewPosition=bottom'
      },
      {
        name: 'Office',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/arkit_office.viser&initialCameraPosition=9.836,19.375,0.767&initialCameraLookAt=12.167,13.237,-2.522&initialCameraUp=-0.000,0.000,1.000&initialFov=70.0&fixedDpr=2.0'
      }
    ]
  },

  selectCategory(category) {
    this.currentCategory = category;
    this.showThumbnails();
  },

  showThumbnails() {
    const categorySelector = document.getElementById('categorySelector');
    const thumbnailsContainer = document.getElementById('sceneThumbnails');
    const backButton = document.getElementById('backButton');

    // Hide categories, show thumbnails
    categorySelector.style.display = 'none';
    thumbnailsContainer.classList.add('active');
    backButton.classList.add('active');

    // Populate thumbnails
    const scenes = this.scenes[this.currentCategory];
    thumbnailsContainer.innerHTML = '';

    scenes.forEach((scene, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'scene-thumbnail';
      thumbnail.onclick = () => this.loadScene(index);

      if (scene.thumbnail) {
        const img = document.createElement('img');
        img.src = scene.thumbnail;
        img.alt = scene.name;
        thumbnail.appendChild(img);
      }

      const label = document.createElement('div');
      label.className = 'scene-thumbnail-label';
      label.textContent = scene.name;
      thumbnail.appendChild(label);

      thumbnailsContainer.appendChild(thumbnail);
    });
  },

  loadScene(sceneIndex) {
    this.currentScene = sceneIndex;
    const scene = this.scenes[this.currentCategory][sceneIndex];
    const viewerContainer = document.getElementById('sceneViewer');
    const iframe = document.getElementById('sceneIframe');
    const overlay = document.getElementById('clickOverlay');

    // Show viewer
    viewerContainer.classList.add('active');

    // Load iframe
    iframe.src = scene.url;

    // Show overlay
    overlay.classList.remove('hidden');
    this.hasInteracted = false;

    // Update thumbnail active state
    document.querySelectorAll('.scene-thumbnail').forEach((thumb, i) => {
      if (i === sceneIndex) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  },

  showCategories() {
    const categorySelector = document.getElementById('categorySelector');
    const thumbnailsContainer = document.getElementById('sceneThumbnails');
    const viewerContainer = document.getElementById('sceneViewer');
    const backButton = document.getElementById('backButton');
    const iframe = document.getElementById('sceneIframe');

    // Unload iframe to free memory
    iframe.src = '';

    // Reset view
    categorySelector.style.display = 'flex';
    thumbnailsContainer.classList.remove('active');
    viewerContainer.classList.remove('active');
    backButton.classList.remove('active');

    this.currentCategory = null;
    this.currentScene = null;
  },

  hideOverlay() {
    if (!this.hasInteracted) {
      this.hasInteracted = true;
      document.getElementById('clickOverlay').classList.add('hidden');
    }
  }
};

// Set up overlay hiding
document.addEventListener('DOMContentLoaded', function() {
  const viewer = document.getElementById('sceneViewer');
  const overlay = document.getElementById('clickOverlay');

  viewer.addEventListener('click', () => sceneViewer.hideOverlay());
  viewer.addEventListener('mouseenter', () => sceneViewer.hideOverlay());
  viewer.addEventListener('touchstart', () => sceneViewer.hideOverlay());
  overlay.addEventListener('click', () => sceneViewer.hideOverlay());
});
</script>

<br/>
