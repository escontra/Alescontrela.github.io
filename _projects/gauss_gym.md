---
layout: page
title: "Gauss Gym"
description: An open-source real-to-sim framework for learning locomotion from pixels
img: assets/gif/gauss_gym_splash.gif
importance: 0
category: work
---

<style>
/* Rounded borders for all content images */
img {
  border-radius: 12px;
}

.video-banner-container {
  width: 100%;
  margin: -20px 0 40px 0;
  position: relative;
  overflow: hidden;
  background: #000;
  min-height: 400px;
}

@media (max-width: 768px) {
  .video-banner-container {
    min-height: 300px;
  }
}

.video-banner-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  gap: 0;
}

@media (max-width: 768px) {
  .video-banner-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
}

.video-banner-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #000;
  aspect-ratio: 1;
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
  min-height: 400px;
  color: #fff;
  font-size: 18px;
  background: #000;
}

@media (max-width: 768px) {
  .video-banner-loading {
    min-height: 300px;
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
// Wrap in DOMContentLoaded to ensure proper execution
document.addEventListener('DOMContentLoaded', function() {
  const BUCKET_URL = 'https://gauss-gym-videos.escontrela.me';
  const MANIFEST_URL = BUCKET_URL + '/videos_good.json';
  let videosLoaded = false;
  let isMobile = window.innerWidth <= 768;

  // Create video element
  function createBannerVideoElement(videoUrl) {
    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('crossorigin', 'anonymous');
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.volume = 0;
    video.defaultMuted = true;
    video.preload = 'auto';

    // Create source element with explicit MIME type for Safari
    const source = document.createElement('source');
    source.src = videoUrl;
    source.type = 'video/mp4';
    video.appendChild(source);

    // Explicitly load the video
    video.load();

    video.onerror = function() {
      console.error('[VideoBanner] Failed to load video:', videoUrl);
    };

    return video;
  }

  // Play all videos (called when user interacts on mobile)
  function playAllVideos() {
    const videos = document.querySelectorAll('#videoBanner video');
    console.log('[VideoBanner] Playing', videos.length, 'videos');
    videos.forEach(function(video, index) {
      setTimeout(function() {
        if (video.paused) {
          video.play().catch(function(err) {
            console.error('[VideoBanner] Error playing video', index, ':', err);
          });
        }
      }, index * 50); // Stagger playback by 50ms
    });
  }

  // Load and populate static video grid (5x5 = 25 videos, or 3x2 = 6 on mobile)
  async function loadVideoBanner() {
    const gridContainer = document.getElementById('videoBanner');
    console.log('[VideoBanner] Starting to load banner...');
    console.log('[VideoBanner] Is mobile:', isMobile);

    try {
      console.log('[VideoBanner] Fetching manifest from:', MANIFEST_URL);

      const response = await fetch(MANIFEST_URL, {
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('[VideoBanner] Response status:', response.status);

      if (!response.ok) {
        throw new Error('HTTP ' + response.status + ': ' + response.statusText);
      }

      const data = await response.json();
      const allVideos = data.videos || [];
      console.log('[VideoBanner] Loaded', allVideos.length, 'videos from manifest');

      if (allVideos.length === 0) {
        gridContainer.innerHTML = '<div class="video-banner-loading">No videos found</div>';
        return;
      }

      // Shuffle and pick random videos
      const shuffled = allVideos.sort(function() { return Math.random() - 0.5; });

      // Use 15 videos for desktop (5x3), 9 for mobile (3x3)
      const videoCount = isMobile ? 9 : 15;
      const selectedVideos = shuffled.slice(0, videoCount);

      // Clear loading message
      gridContainer.innerHTML = '';

      // Add videos to grid
      selectedVideos.forEach(function(videoFilename) {
        // Convert filename to 480p version (e.g., video.mp4 -> video_480p.mp4)
        const video480pFilename = videoFilename.replace(/\.mp4$/, '_480p.mp4');
        const videoUrl = BUCKET_URL + '/' + video480pFilename;
        const gridItem = document.createElement('div');
        gridItem.className = 'video-banner-item';
        const video = createBannerVideoElement(videoUrl);
        gridItem.appendChild(video);
        gridContainer.appendChild(gridItem);
      });

      console.log('[VideoBanner]', videoCount, 'videos loaded');
      videosLoaded = true;

      // Try to autoplay videos
      setTimeout(function() {
        playAllVideos();
      }, 500);

    } catch (error) {
      console.error('[VideoBanner] Error:', error);
      gridContainer.innerHTML = '<div class="video-banner-loading">Failed to load videos</div>';
    }
  }

  // Load banner immediately when DOM is ready
  loadVideoBanner();

  // Add interaction handlers for mobile to trigger autoplay
  let hasInteracted = false;
  function handleFirstInteraction() {
    if (!hasInteracted && videosLoaded) {
      hasInteracted = true;
      playAllVideos();
      // Remove listeners after first interaction
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
    }
  }

  // Listen for user interactions
  document.addEventListener('scroll', handleFirstInteraction, { passive: true });
  document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
  document.addEventListener('click', handleFirstInteraction);
});
</script>

<style>
.tldr-section {
  text-align: center;
  margin: 50px auto;
  max-width: 1000px;
  padding: 0 20px;
}

.tldr-label {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--global-theme-color);
  margin-bottom: 15px;
  opacity: 0.8;
}

.tldr-text {
  font-size: clamp(20px, 4vw, 32px);
  font-weight: 700;
  line-height: 1.4;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 10px;
}

@media (max-width: 768px) {
  .tldr-section {
    margin: 30px auto;
  }

  .tldr-label {
    font-size: 14px;
    letter-spacing: 3px;
  }
}
</style>

<div class="tldr-section">
  <p class="tldr-text">
    Train robot policies at 100K+ steps/second in photorealistic 3D environments captured from iPhone videos, datasets, or AI-generated worlds.
  </p>
</div>

<div class="row">
    <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h3><a href="https://arxiv.org/pdf/2510.15352">Paper<br/><i class="fas fa-file-pdf"></i></a></h3>
    </div>
    <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h3><a href="https://huggingface.co/collections/escontra/gauss-gym-datasets-68f1545f33691c8cb43a55ff">Data<br/><svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: -0.125em;">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0216 12.9067C15.1542 12.6053 15.1672 12.266 15.0594 11.9588C15.1666 11.6895 15.1835 11.3879 15.1109 11.1077C15.073 10.9629 15.0125 10.8286 14.9325 10.7088C15.062 10.2511 14.9293 9.76178 14.6096 9.41217C14.4835 9.27426 14.3319 9.17171 14.1684 9.10376C14.2677 8.65557 14.3201 8.18997 14.3201 7.71255C14.3201 4.19004 11.4753 1.3313 7.96213 1.3313C4.449 1.3313 1.60422 4.19004 1.60422 7.71255C1.60422 8.2011 1.65902 8.67732 1.76291 9.13516C1.62551 9.20206 1.49836 9.29437 1.39062 9.41217C1.11172 9.71715 0.970218 10.1156 1.02972 10.5294C1.0386 10.5911 1.05139 10.651 1.06778 10.7088C0.987687 10.8286 0.927261 10.9629 0.889378 11.1077C0.816118 11.3874 0.833871 11.69 0.940828 11.9588C0.833048 12.266 0.845995 12.6053 0.978628 12.9067C1.21674 13.4476 1.77038 13.7844 2.53035 14.0869C3.37522 14.4232 4.30846 14.669 5.2641 14.669C6.03595 14.669 6.70689 14.4811 7.19679 14.048C7.44786 14.0783 7.70328 14.0938 7.96213 14.0938C8.24393 14.0938 8.52162 14.0753 8.79408 14.0396C9.2845 14.4785 9.9591 14.669 10.7361 14.669C11.6956 14.669 12.6219 14.4245 13.4699 14.0869C14.2298 13.7844 14.7835 13.4475 15.0216 12.9067ZM13.2948 13.6471C14.0459 13.3481 14.4327 13.0695 14.5883 12.716C14.6978 12.4671 14.6784 12.18 14.5326 11.9505C14.7261 11.6538 14.689 11.3658 14.6529 11.2275C14.6067 11.0511 14.5112 10.9044 14.3815 10.7991C14.443 10.6965 14.4842 10.5856 14.5019 10.462C14.5523 10.1118 14.363 9.73198 14.0467 9.56892C13.9043 9.49529 13.74 9.46502 13.5786 9.48087C13.6273 9.32464 13.6698 9.16565 13.7056 9.00412C13.7979 8.58845 13.8467 8.15618 13.8467 7.71255C13.8467 4.44972 11.2121 1.80469 7.96213 1.80469C4.71221 1.80469 2.07761 4.44972 2.07761 7.71255C2.07761 8.15775 2.12667 8.59151 2.21966 9.00861C2.255 9.16715 2.29669 9.32322 2.34445 9.47668C2.11872 9.47489 1.89314 9.56403 1.73991 9.73172C1.54674 9.94289 1.46094 10.2024 1.4983 10.462C1.51607 10.5856 1.55722 10.6965 1.61873 10.7991C1.48904 10.9044 1.39352 11.0511 1.34735 11.2275C1.3112 11.3658 1.27415 11.6538 1.46762 11.9505C1.3218 12.18 1.30238 12.4671 1.41189 12.716C1.56755 13.0695 1.95433 13.3481 2.70542 13.6471C3.51574 13.9696 4.38761 14.1956 5.2641 14.1956C6.0583 14.1956 6.6509 13.9775 7.02942 13.5466C7.3332 13.5952 7.64475 13.6204 7.96213 13.6204C8.30268 13.6204 8.63651 13.5913 8.96129 13.5356C9.33929 13.9738 9.93526 14.1956 10.7361 14.1956C11.6163 14.1956 12.4813 13.9709 13.2948 13.6471Z" fill="currentColor"/>
<path d="M6.65394 13.0396C7.07186 12.4243 7.04226 11.9625 6.46887 11.3871C5.89542 10.8119 5.56163 9.97029 5.56163 9.97029C5.56163 9.97029 5.43695 9.48151 5.15298 9.52651C4.869 9.57144 4.6605 10.3019 5.25534 10.7488C5.85017 11.1955 5.13688 11.499 4.90804 11.0795C4.67918 10.6598 4.05428 9.58123 3.73021 9.37492C3.4063 9.16869 3.17821 9.28425 3.25459 9.70942C3.33098 10.1347 4.68571 11.1653 4.5539 11.3883C4.42208 11.6112 3.95754 11.1263 3.95754 11.1263C3.95754 11.1263 2.50395 9.79815 2.18748 10.1442C1.871 10.4903 2.42757 10.7803 3.22073 11.2624C4.01404 11.7443 4.07554 11.8717 3.96302 12.054C3.85033 12.2363 2.0994 10.7543 1.93494 11.3825C1.77063 12.0108 3.72186 12.1932 3.60144 12.6269C3.48102 13.0608 2.22696 11.806 1.97048 12.2949C1.71383 12.784 3.74009 13.3586 3.75649 13.3628C4.411 13.5333 6.07322 13.8945 6.65394 13.0396Z" fill="currentColor"/>
<path d="M9.34631 13.0396C8.9284 12.4243 8.958 11.9625 9.53147 11.3871C10.1049 10.8119 10.4387 9.97029 10.4387 9.97029C10.4387 9.97029 10.5634 9.48151 10.8473 9.52651C11.1313 9.57144 11.3398 10.3019 10.7449 10.7488C10.1502 11.1955 10.8634 11.499 11.0923 11.0795C11.3211 10.6598 11.946 9.58123 12.2701 9.37492C12.594 9.16869 12.8221 9.28425 12.7457 9.70942C12.6693 10.1347 11.3146 11.1653 11.4464 11.3883C11.5782 11.6112 12.0427 11.1263 12.0427 11.1263C12.0427 11.1263 13.4963 9.79815 13.8128 10.1442C14.1293 10.4903 13.5727 10.7803 12.7796 11.2624C11.9863 11.7443 11.9248 11.8717 12.0372 12.054C12.15 12.2363 13.9009 10.7543 14.0653 11.3825C14.2297 12.0108 12.2785 12.1932 12.3989 12.6269C12.5193 13.0608 13.7733 11.806 14.0298 12.2949C14.2864 12.784 12.2602 13.3586 12.2438 13.3628C11.5893 13.5333 9.92703 13.8945 9.34631 13.0396Z" fill="currentColor"/>
<path d="M7.13116 9.21035C7.68053 9.53065 8.39171 9.53183 8.92303 9.17895C8.78645 9.056 8.62418 8.96114 8.44531 8.90388C8.31873 8.86319 8.18387 9.29997 8.04391 9.29997C7.91316 9.29997 7.78674 8.86042 7.66748 8.8961C7.46364 8.95702 7.28051 9.06616 7.13116 9.21035Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.96214 2.41455C5.04774 2.41455 2.68506 4.78667 2.68506 7.71256C2.68506 8.14057 2.73563 8.55677 2.83108 8.9554C2.83237 8.95383 2.83367 8.95226 2.83497 8.95069C2.9882 8.76681 3.20794 8.66545 3.4538 8.66545C3.89524 8.66545 4.23152 8.96376 4.49145 9.28825C4.66026 9.05322 4.91817 8.91361 5.18939 8.91361C5.70739 8.91361 6.01914 9.36479 6.13702 9.7706C6.19547 9.90769 6.47608 10.5321 6.89825 10.9557C7.54116 11.6007 7.7021 12.2661 7.38382 12.9791C7.7851 13.023 8.20295 13.0213 8.61268 12.9707C8.29948 12.2609 8.46169 11.5982 9.10198 10.9557C9.52416 10.5321 9.80484 9.90769 9.86329 9.7706C9.98109 9.36479 10.2927 8.91361 10.8107 8.91361C11.082 8.91361 11.34 9.05324 11.5088 9.28825C11.7687 8.96377 12.105 8.66545 12.5464 8.66545C12.7634 8.66545 12.9601 8.74438 13.1086 8.88932C13.2328 8.33972 13.2699 7.74287 13.212 7.17086C12.9417 4.49924 10.694 2.41455 7.96214 2.41455ZM6.86163 9.58044C6.28068 9.0948 6.02594 8.3752 6.02594 7.90713C6.02594 7.22108 6.90968 8.27063 8.00012 8.27063C9.09037 8.27063 9.97429 7.22098 9.97429 7.90713C9.97429 8.59186 9.49409 9.92922 8.00602 9.92922C7.52576 9.92922 7.15016 9.79086 6.86163 9.58044ZM9.78877 6.27052C9.61583 6.20913 9.32089 6.49448 9.22793 6.31895C9.03104 5.94723 9.17157 5.48568 9.54187 5.28803C9.9121 5.09038 10.3719 5.2315 10.5688 5.60323C10.7656 5.97496 10.625 6.43653 10.2548 6.63417C10.0594 6.73858 9.98235 6.33909 9.78877 6.27052ZM6.21147 6.27052C6.01788 6.33909 5.94089 6.73858 5.74544 6.63417C5.37517 6.43653 5.23461 5.97496 5.43149 5.60323C5.62836 5.2315 6.08813 5.09038 6.45836 5.28803C6.82866 5.48568 6.96919 5.94723 6.7723 6.31895C6.67934 6.49448 6.3844 6.20913 6.21147 6.27052ZM12.0244 6.49289C12.0244 6.76655 11.8035 6.9884 11.5308 6.9884C11.2583 6.9884 11.0374 6.76655 11.0374 6.49289C11.0374 6.21924 11.2583 5.99739 11.5308 5.99739C11.8035 5.99739 12.0244 6.21924 12.0244 6.49289ZM4.46938 6.9884C4.74196 6.9884 4.96292 6.76655 4.96292 6.49289C4.96292 6.21924 4.74196 5.99739 4.46938 5.99739C4.1968 5.99739 3.97584 6.21924 3.97584 6.49289C3.97584 6.76655 4.1968 6.9884 4.46938 6.9884Z" fill="currentColor"/>
</svg></a></h3>
    </div>
    <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h3><a href="https://github.com/escontra/gauss_gym">Code<br/><i class="fas fa-file-code"></i></a></h3>
    </div>
</div>

<br/>

<style>
.author-section {
  text-align: center;
  margin: 40px 0;
  line-height: 1.8;
}

.author-names {
  font-size: clamp(18px, 3vw, 24px);
  margin-bottom: 15px;
}

.author-affiliations {
  font-size: clamp(14px, 2.5vw, 18px);
  color: var(--global-text-color-light);
  margin-bottom: 8px;
}

.author-note {
  font-size: clamp(13px, 2vw, 16px);
  color: var(--global-text-color-light);
}

@media (max-width: 768px) {
  .author-section {
    margin: 30px 0;
  }
}
</style>

<div class="author-section">
  <p class="author-names">
    Alejandro Escontrela<sup>1</sup>, Justin Kerr<sup>1</sup>, Arthur Allshire<sup>1</sup>, Jonas Frey<sup>2</sup>,<br/>
    Rocky Duan<sup>3</sup>, Carmelo Sferrazza<sup>1, 3, &sect;</sup>, Pieter Abbeel<sup>1, 3, &sect;</sup>
  </p>
  <p class="author-affiliations">
    <sup>1</sup>UC Berkeley, <sup>2</sup>ETH Zurich, <sup>3</sup>Amazon FAR (Frontier AI &amp; Robotics)
  </p>
  <p class="author-note">
    <sup>&sect;</sup>Work done while at UC Berkeley
  </p>
</div>

<br/>

<style>
.interactive-section {
  background: linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  padding: 60px 20px;
  margin: 40px -20px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15);
}

@media (max-width: 768px) {
  .interactive-section {
    padding: 40px 15px;
    margin: 30px -15px;
  }
}

.interactive-heading {
  text-align: center;
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 20px;
}

.interactive-heading .gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .interactive-heading {
    font-size: 32px;
  }
}

.interactive-description {
  text-align: center;
  font-size: 20px;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto 40px;
  color: var(--global-text-color);
}

@media (max-width: 768px) {
  .interactive-description {
    font-size: 16px;
    margin-bottom: 30px;
  }
}

.cta-text {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  color: var(--global-theme-color);
}

@media (max-width: 768px) {
  .cta-text {
    font-size: 16px;
  }
}
</style>

<div class="interactive-section">
  <h2 class="interactive-heading" id="try-it-yourself">🎮 <span class="gradient-text">Try It Yourself</span></h2>

  <p class="interactive-description">
    <strong>Explore photorealistic 3D environments</strong> where our robot policies learn to navigate. Each scene—from real-world iPhone captures to AI-generated landscapes—is rendered using 3D Gaussian Splatting and fully interactive in your browser.
  </p>

  <p class="cta-text">
    👇 Select a category, pick a scene, and see the robot's view as it moves through the world
  </p>

<style>
.scene-viewer-wrapper {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0;
}

/* Category selector */
.category-selector {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.category-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 30px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, opacity 0.3s;
  text-align: center;
  border: none;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  opacity: 0.7;
  flex: 1;
  max-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.category-card.active {
  opacity: 1;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  opacity: 1;
}

@media (max-width: 768px) {
  .category-selector {
    gap: 6px;
  }

  .category-card {
    padding: 12px 15px;
    font-size: 12px;
    max-width: 150px;
  }
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

.category-card.veo {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

/* Scene thumbnails */
.scene-thumbnails {
  display: none;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: nowrap;
  animation: fadeIn 0.3s ease-in;
}

.scene-thumbnails.active {
  display: flex;
}

@media (max-width: 768px) {
  .scene-thumbnails {
    flex-wrap: wrap;
    gap: 6px;
  }
}

.scene-thumbnail {
  width: 120px;
  height: 80px;
  background: var(--global-card-bg-color);
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--global-text-color);
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.scene-thumbnail.text-only {
  color: white;
  font-size: 11px;
  padding: 8px;
  text-align: center;
  line-height: 1.3;
}

.scene-thumbnail.text-only.iphone {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.scene-thumbnail.text-only.grandtour {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.scene-thumbnail.text-only.arkit {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.scene-thumbnail.text-only.veo {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
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
  color: white;
  padding: 4px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
}

.scene-thumbnail:hover {
  transform: scale(1.05);
  border-color: var(--global-hover-color);
}

.scene-thumbnail.active {
  border-color: var(--global-theme-color);
}

@media (max-width: 768px) {
  .scene-thumbnail {
    width: 90px;
    height: 65px;
  }
}

/* Viewer container */
.scene-viewer-container {
  width: 100%;
  height: 850px;
  position: relative;
  overflow: hidden;
  background: #000;
  border-radius: 12px;
  display: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .scene-viewer-container {
    height: 500px;
  }
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
  display: none;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

<div class="scene-viewer-wrapper">
  <!-- Category selection -->
  <div class="category-selector" id="categorySelector">
    <button class="category-card iphone" onclick="sceneViewer.selectCategory('iphone')">
      <div>iPhone Scenes</div>
      <div style="font-size: 10px; margin-top: 4px; opacity: 0.9;">5 locations</div>
    </button>
    <button class="category-card grandtour" onclick="sceneViewer.selectCategory('grandtour')">
      <div>GrandTour Scenes</div>
      <div style="font-size: 10px; margin-top: 4px; opacity: 0.9;">5 locations</div>
    </button>
    <button class="category-card arkit" onclick="sceneViewer.selectCategory('arkit')">
      <div>ARKit Scenes</div>
      <div style="font-size: 10px; margin-top: 4px; opacity: 0.9;">5 locations</div>
    </button>
    <button class="category-card veo" onclick="sceneViewer.selectCategory('veo')">
      <div>Veo Scenes</div>
      <div style="font-size: 10px; margin-top: 4px; opacity: 0.9;">4 locations</div>
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
      },
      {
        name: 'Home',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/iphone_home.viser&initialCameraPosition=2.335,8.741,1.031&initialCameraLookAt=-0.856,4.919,-0.456&initialCameraUp=-0.000,0.000,1.000&initialFov=41.0&fixedDpr=2.0&robotViewPosition=bottom'
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
      },
      {
        name: 'Kitchen',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/arkit_kitchen.viser&initialCameraPosition=11.528,11.682,0.237&initialCameraLookAt=15.148,17.454,-2.177&initialCameraUp=-0.000,0.000,1.000&initialFov=118.0&fixedDpr=2.0&robotViewPosition=bottom'
      },
      {
        name: 'Room',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/arkit_room.viser&initialCameraPosition=2.681,6.104,0.910&initialCameraLookAt=13.271,4.359,-9.824&initialCameraUp=-0.000,0.000,1.000&initialFov=120.0&fixedDpr=2.0&robotViewPosition=bottom'
      },
      {
        name: 'Rustic Room',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/arkit_rustic_room.viser&initialCameraPosition=19.965,3.390,0.430&initialCameraLookAt=19.411,-1.618,-2.581&initialCameraUp=-0.000,0.000,1.000&initialFov=110.0&fixedDpr=2.0&robotViewPosition=bottom'
      }
    ],
    veo: [
      {
        name: 'Waterfall',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/veo_waterfall.viser&initialCameraPosition=39.657,62.968,-2.418&initialCameraLookAt=44.061,41.401,-1.607&initialCameraUp=-0.000,0.000,1.000&initialFov=72.0&fixedDpr=2.0'
      },
      {
        name: 'Volcano',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/veo_volcano.viser&initialCameraPosition=32.300,76.802,-0.785&initialCameraLookAt=32.693,72.851,-0.524&initialCameraUp=-0.000,0.000,1.000&initialFov=60.0&fixedDpr=2.0'
      },
      {
        name: 'Regal',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/veo_regal.viser&initialCameraPosition=3.196,12.849,-0.496&initialCameraLookAt=4.219,3.173,-0.224&initialCameraUp=-0.000,0.000,1.000&initialFov=41.0&fixedDpr=2.0'
      },
      {
        name: 'Crystal Cave',
        url: '/assets/viser/index.html?playbackPath=https://gauss-gym.escontrela.me/veo_crystal_cave.viser&initialCameraPosition=11.308,25.543,-0.715&initialCameraLookAt=11.413,19.778,-1.078&initialCameraUp=-0.000,0.000,1.000&initialFov=47.0&fixedDpr=2.0'
      }
    ]
  },

  selectCategory(category) {
    this.currentCategory = category;
    this.currentScene = null; // Reset scene when switching categories

    // Update active category button
    document.querySelectorAll('.category-card').forEach(card => {
      card.classList.remove('active');
    });
    document.querySelector(`.category-card.${category}`).classList.add('active');

    this.showThumbnails();
  },

  showThumbnails() {
    const thumbnailsContainer = document.getElementById('sceneThumbnails');

    // Show thumbnails
    thumbnailsContainer.classList.add('active');

    // Populate thumbnails
    const scenes = this.scenes[this.currentCategory];
    thumbnailsContainer.innerHTML = '';

    scenes.forEach((scene, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'scene-thumbnail';
      thumbnail.onclick = () => this.loadScene(index);

      if (scene.thumbnail) {
        // Has image thumbnail
        const img = document.createElement('img');
        img.src = scene.thumbnail;
        img.alt = scene.name;
        thumbnail.appendChild(img);

        const label = document.createElement('div');
        label.className = 'scene-thumbnail-label';
        label.textContent = scene.name;
        thumbnail.appendChild(label);
      } else {
        // Text-only thumbnail
        thumbnail.classList.add('text-only', this.currentCategory);
        thumbnail.textContent = scene.name;
      }

      thumbnailsContainer.appendChild(thumbnail);
    });

    // Auto-load first scene if none is selected
    if (this.currentScene === null) {
      this.loadScene(0);
    }
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

  hideOverlay() {
    if (!this.hasInteracted) {
      this.hasInteracted = true;
      document.getElementById('clickOverlay').classList.add('hidden');
    }
  },

  init() {
    // Load default category and scene on page load
    this.selectCategory('iphone');
  }
};

// Set up overlay hiding and initialize viewer
document.addEventListener('DOMContentLoaded', function() {
  const viewer = document.getElementById('sceneViewer');
  const overlay = document.getElementById('clickOverlay');

  viewer.addEventListener('click', () => sceneViewer.hideOverlay());
  viewer.addEventListener('mouseenter', () => sceneViewer.hideOverlay());
  viewer.addEventListener('touchstart', () => sceneViewer.hideOverlay());
  overlay.addEventListener('click', () => sceneViewer.hideOverlay());

  // Initialize with default category and scene
  sceneViewer.init();
});
</script>

<p style="text-align: center; font-size: 13px; color: var(--global-text-color-light); margin-top: 20px;">
  Interactive demos made possible by <a href="https://sparkjs.dev/">Spark</a>, <a href="https://viser.studio/main/">Viser</a>, and <a href="https://brentyi.github.io/">Brent Yi</a>
</p>

<p style="text-align: center; font-size: 14px; color: var(--global-text-color-light); margin-top: 15px; font-style: italic;">
  Note: Some examples may be slow to load
</p>

</div>

<br/>

<style>
.video-showcase-section {
  background: linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  padding: 60px 20px;
  margin: 40px -20px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15);
}

@media (max-width: 768px) {
  .video-showcase-section {
    padding: 40px 15px;
    margin: 30px -15px;
  }
}

.video-showcase-heading {
  text-align: center;
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 20px;
}

.video-showcase-heading .gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .video-showcase-heading {
    font-size: 32px;
  }
}

.video-showcase-description {
  text-align: center;
  font-size: 20px;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto 40px;
  color: var(--global-text-color);
}

@media (max-width: 768px) {
  .video-showcase-description {
    font-size: 16px;
    margin-bottom: 30px;
  }
}

.refresh-button {
  display: block;
  margin: 0 auto 30px;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.refresh-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.refresh-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .refresh-button {
    font-size: 16px;
    padding: 12px 30px;
  }
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

.video-grid-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.video-grid-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: var(--global-text-color);
  font-size: 18px;
}
</style>

<div class="video-showcase-section">
  <h2 class="video-showcase-heading" id="video-showcase">🎬 <span class="gradient-text">Scene Showcase</span></h2>

  <p class="video-showcase-description">
    See <strong>gaussian splats</strong> from our dataset. Scenes are from the <a href="https://huggingface.co/datasets/leggedrobotics/grand_tour_dataset">GrandTour</a> subcollection.
  </p>

  <button class="refresh-button" onclick="refreshShowcaseVideos()">
    🔄 Refresh Scene
  </button>

  <div class="video-grid" id="videoShowcaseGrid">
    <div class="video-loading">Loading videos...</div>
  </div>
</div>

<script>
let showcaseVideosCache = null;

async function loadShowcaseVideos() {
  const BUCKET_URL = 'https://gauss-gym-videos.escontrela.me';
  const MANIFEST_URL = BUCKET_URL + '/videos_good.json';

  try {
    const response = await fetch(MANIFEST_URL, {
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ': ' + response.statusText);
    }

    const data = await response.json();
    showcaseVideosCache = data.videos || [];
    console.log('[VideoShowcase] Loaded', showcaseVideosCache.length, 'videos from manifest');

    // Load initial videos
    refreshShowcaseVideos();
  } catch (error) {
    console.error('[VideoShowcase] Error:', error);
    document.getElementById('videoShowcaseGrid').innerHTML = '<div class="video-loading">Failed to load videos</div>';
  }
}

function createShowcaseVideoElement(videoUrl) {
  const video = document.createElement('video');
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('loop', '');
  video.setAttribute('controls', '');
  video.setAttribute('crossorigin', 'anonymous');
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.volume = 0;
  video.defaultMuted = true;
  video.preload = 'auto';

  // Create source element with explicit MIME type for Safari
  const source = document.createElement('source');
  source.src = videoUrl;
  source.type = 'video/mp4';
  video.appendChild(source);

  // Explicitly load the video
  video.load();

  video.onerror = function() {
    console.error('Failed to load video:', videoUrl);
  };

  const attemptPlay = function() {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function(error) {
        console.error('Error auto-playing video:', error);
        setTimeout(function() { video.play().catch(function() {}); }, 100);
      });
    }
  };

  video.addEventListener('loadedmetadata', attemptPlay);
  video.addEventListener('canplay', attemptPlay);

  setTimeout(function() {
    if (video.paused) {
      attemptPlay();
    }
  }, 100);

  return video;
}

function refreshShowcaseVideos() {
  if (!showcaseVideosCache || showcaseVideosCache.length === 0) {
    console.log('[VideoShowcase] No videos in cache yet');
    return;
  }

  const BUCKET_URL = 'https://gauss-gym-videos.escontrela.me';
  const gridContainer = document.getElementById('videoShowcaseGrid');
  const isMobile = window.innerWidth <= 768;
  const videoCount = isMobile ? 1 : 3;

  // Shuffle and pick random videos
  const shuffled = showcaseVideosCache.sort(function() { return Math.random() - 0.5; });
  const selectedVideos = shuffled.slice(0, videoCount);

  // Clear grid
  gridContainer.innerHTML = '';

  // Add videos to grid
  selectedVideos.forEach(function(videoFilename) {
    // Convert filename to 480p version (e.g., video.mp4 -> video_480p.mp4)
    const video480pFilename = videoFilename.replace(/\.mp4$/, '_480p.mp4');
    const videoUrl = BUCKET_URL + '/' + video480pFilename;

    const gridItem = document.createElement('div');
    gridItem.className = 'video-grid-item';
    const video = createShowcaseVideoElement(videoUrl);
    gridItem.appendChild(video);
    gridContainer.appendChild(gridItem);
  });

  console.log('[VideoShowcase]', videoCount, 'videos loaded');
}

// Load videos when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  loadShowcaseVideos();
});
</script>

<br/>

## Overview
---

Training vision-based robot policies requires massive amounts of diverse, high-quality data. Traditional simulators struggle to provide photorealistic visual experiences at the scale needed for modern reinforcement learning, forcing researchers to choose between visual fidelity and training throughput.

We present **GaussGym**, a novel approach that integrates *3D Gaussian Splatting* as a drop-in renderer within vectorized physics simulators such as IsaacGym. This integration enables unprecedented speed—exceeding **100,000 steps per second on consumer GPUs**—while maintaining photorealistic visual fidelity.

**Key capabilities:**
- **Photorealistic rendering** using 3D Gaussian Splatting at massive scale
- **Diverse scene creation** from iPhone scans, datasets (GrandTour, ARKit), and generative video models (Veo)
- **Sim2real transfer** with motion blur, camera randomization, and intrinsic jitter
- **Rich sensing** beyond RGB: depth maps, heightmaps, and terrain-based rewards
- **Tasks** are provided out of the box, including pursuit tasks and goal reaching.

This work bridges high-throughput simulation and high-fidelity perception, advancing scalable and generalizable robot learning. All code and data are open-sourced for the community to build upon.

<div style="text-align: center; margin: 30px 0;">
  <img src="https://gauss-gym.escontrela.me/all_scenes_compressed.png"
       alt="Overview of all scenes"
       style="max-width: 100%; height: auto;">
  <p style="margin-top: 10px; font-size: 16px; color: var(--global-text-color-light); font-style: italic;">
    Gauss Gym provides tooling to extract scenes from a variety of datasets, including iPhone scans, existing image datasets (e.g. GrandTour, ARKitScenes), and even generative video models like Veo.
  </p>
</div>

<br/>

## Lowering the Visual Sim2Real Gap
---

A critical challenge in sim-to-real transfer is the visual gap between simulated and real-world images. Real cameras introduce artifacts like motion blur, lens distortion, and varying intrinsics that are rarely modeled in traditional simulators. GaussGym addresses this by simulating these effects efficiently during training.

**Motion Blur**: Real cameras capture images over finite exposure times, creating motion blur when the robot or camera moves. We simulate this by alpha-blending rendered images along the camera's twist vector, parameterized by shutter speed. This can be randomized during training to improve robustness to varying lighting conditions and motion speeds.

**Camera Randomization**: We support randomization of camera pose, intrinsics (focal length, principal point), and extrinsics to ensure policies generalize across different camera configurations. All randomizations run efficiently within the vectorized renderer.

**Terrain-Aware Rewards**: Beyond visual rendering, GaussGym integrates with NVIDIA Warp to provide heightmap measurements directly from the 3D scene geometry. This enables computation of terrain-based rewards and geometric constraints without expensive raycasting.

<div style="text-align: center; margin: 30px 0;">
  <img src="https://gauss-gym.escontrela.me/motion_blur_compressed.png"
       alt="Overview of all scenes"
       style="max-width: 100%; height: auto;">
  <p style="margin-top: 10px; font-size: 16px; color: var(--global-text-color-light); font-style: italic;">
    Motion blur achieved by alpha-blending images along the cameras twist vector and is parameterized by the shutter speed, which can also be randomized.
  </p>
</div>

## Extracting scenes from videos
---

Creating diverse, high-quality training environments has traditionally been a bottleneck in robot learning. Manual scene creation is labor-intensive, while existing datasets offer limited diversity. GaussGym dramatically simplifies this process by automatically extracting simulation-ready 3D scenes from videos and images.

**Automated Scene Pipeline**: Our pipeline leverages recent advances in Structure from Motion (SfM), Surface Reconstruction, and Differentiable Rendering. Input images are processed through [VGGT](https://vgg-t.github.io/) to extract metric poses and dense point clouds with normals. These are then used to: (1) reconstruct high-resolution collision meshes for physics simulation with [NKSR](https://github.com/nv-tlabs/NKSR), and (2) train 3D Gaussian Splatting models with [gsplat](https://github.com/nerfstudio-project/gsplat) for photorealistic rendering.

**From Capture to Sim in Minutes**: What previously required days of manual modeling now happens automatically. Simply capture a video with your iPhone, run it through our pipeline, and get a simulation-ready scene complete with both visual rendering and collision geometry. This enables rapid iteration and massive scaling to thousands of diverse environments.

<div style="text-align: center; margin: 30px 0;">
  <img src="https://gauss-gym.escontrela.me/data_compressed.png"
       alt="Overview of all scenes"
       style="max-width: 100%; height: auto;">
</div>

**Beyond Real-World Capture**: Our pipeline also supports extracting scenes from generative video models like Veo. Users can describe desired training scenarios via text prompts (e.g., "a crystal cave with glowing formations"), generate videos, and automatically extract 3D scenes for simulation. This opens up entirely new possibilities for training in environments that don't exist in the real world.

<div style="text-align: center; margin: 30px 0;">
  <img src="https://gauss-gym.escontrela.me/veo_compressed.png"
       alt="Overview of all scenes"
       style="max-width: 100%; height: auto;">
</div>


## Rich Multi-Modal Sensing
---

While photorealistic RGB rendering is essential for vision-based policies, many robotics tasks benefit from additional sensing modalities. GaussGym efficiently renders depth maps alongside RGB images, enabling richer perception without sacrificing performance.

**Depth Rendering**: Using the same 3D Gaussian Splatting representation, we render per-pixel depth maps that provide geometric understanding of the scene. This is particularly valuable for:
- **Navigation tasks** where obstacle distance matters
- **Manipulation** requiring precise geometric reasoning
- **Multi-modal policies** that fuse RGB and depth for robustness

**Performance**: Depth rendering adds minimal overhead to the already fast RGB rendering pipeline, maintaining the 100K+ steps/second throughput that makes large-scale training practical.

**Sensor Flexibility**: The depth maps can be configured to match real sensor characteristics (range limits, noise patterns) to further improve sim-to-real transfer.

<div style="text-align: center; margin: 30px 0;">
  <img src="https://gauss-gym.escontrela.me/amazon_depth_compressed.png"
       alt="Overview of all scenes"
       style="max-width: 100%; height: auto;">
</div>

## Policy Learning
---

<style>
.architecture-container {
  display: flex;
  gap: 30px;
  margin: 30px 0;
  align-items: center;
}

.architecture-text {
  flex: 1;
  min-width: 0;
}

.architecture-image {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.architecture-image img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 968px) {
  .architecture-container {
    flex-direction: column-reverse;
  }

  .architecture-text,
  .architecture-image {
    width: 100%;
  }
}
</style>

<div class="architecture-container">
  <div class="architecture-text">
    <p>Our vision-based policy uses a recurrent encoder that fuses visual and proprioceptive observations over time. At each timestep, DinoV2 embeddings from RGB images are concatenated with proprioceptive measurements and processed through an LSTM, creating a compact latent representation that captures temporal dynamics and visual semantics. We use LSTM instead of transformers to ensure fast inference on-robot.</p>

    <p>This shared representation feeds two specialized heads:</p>

    <p><strong>Voxel Prediction Head:</strong> Unflattens the latent vector into a 3D grid and applies transposed convolutions to predict dense volumetric occupancy and terrain heights, forcing the network to learn scene geometry.</p>

    <p><strong>Policy Head:</strong> A second LSTM processes the latent representation and outputs parameters of a Gaussian distribution over joint position offsets.</p>
  </div>

  <div class="architecture-image">
    <img src="https://gauss-gym.escontrela.me/network_compressed.png"
         alt="Network architecture diagram">
  </div>
</div>

## Sim2Real Transfer

<style>
.side-by-side-container {
  display: flex;
  gap: 20px;
  margin: 30px 0;
  justify-content: center;
  align-items: flex-start;
}

.side-by-side-container img {
  width: 48%;
  height: auto;
}

@media (max-width: 768px) {
  .side-by-side-container {
    flex-direction: column;
    gap: 20px;
  }

  .side-by-side-container img {
    width: 100%;
  }
}
</style>

We provide deployment code to evaluate learned policies on hardware. We also validate our architecture on the Unitree A1 quadrupedal robot, demonstrating perceptive locomotion on 17cm stairs.


<div class="side-by-side-container">
  <img src="https://gauss-gym.escontrela.me/sim_a1_compressed.png"
       alt="Simulation A1">
  <img src="https://gauss-gym.escontrela.me/real_a1_compressed.png"
       alt="Real A1">
</div>


## How to cite
{: .no_toc}
---

<div class="publications">
{% bibliography -f papers --template bib_bibtex_only -q @*[title=GaussGym: An Open-Source Real-To-Sim Framework for Learning Locomotion from Pixels]* --max 0 %}
</div>