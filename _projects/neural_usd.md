---
layout: page
title: "Neural USD: Scalable Scene Editing via Differentiable Universal Scene Description"
description: Interactive 3D scene editing using Neural USD representations
img: https://neural-usd.escontrela.me/splash_whitebg.png
importance: 1
category: work
---

<style>
.dataset-section {
  margin: 60px 0;
}

.carousel-slide {
  display: none;
}

.carousel-slide.active {
  display: block;
}

.slide-content {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .slide-content {
    flex-direction: column;
    gap: 10px;
  }
}

/* Glow boxes for original and predictions */
.glow-box {
  background: linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.glow-box h4 {
  text-align: center;
  font-size: 1.1em;
  font-weight: 800;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.original-box {
  flex: 0 0 auto;
  width: 200px;
}

@media (max-width: 768px) {
  .original-box {
    width: 100%;
  }
}

.predictions-box {
  flex: 1;
  min-width: 0;
}

.original-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.operations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-items: center;
}

@media (max-width: 768px) {
  .operations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.media-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.media-item label {
  font-size: 0.9em;
  font-weight: 600;
  color: #667eea;
  text-align: center;
}

.original-img, .original-video {
  width: 100%;
  max-width: 180px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin: 0 auto;
  display: block;
}

.operation-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.operation-cell label {
  font-size: 0.85em;
  font-weight: 600;
  color: #764ba2;
  text-align: center;
}

.operation-video {
  width: 100%;
  max-width: 180px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  margin: 0 auto;
  display: block;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.carousel-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.carousel-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.carousel-button:disabled {
  background: linear-gradient(135deg, #ccc 0%, #999 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.carousel-counter {
  font-weight: 600;
  color: #667eea;
}

.splash-figure {
  width: 50%;
  margin: 30px auto;
  background: #f0f0f0;
  display: block;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

html[data-theme='dark'] .splash-figure {
  background:rgb(193, 186, 186);
}

.splash-figure img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .splash-figure {
    width: 95%;
  }
}

.method-figure {
  width: 95%;
  margin: 30px auto;
  background: #f0f0f0;
  display: block;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

html[data-theme='dark'] .method-figure {
  background:rgb(193, 186, 186);
}

.method-figure img {
  width: 100%;
  height: auto;
  display: block;
}

.author-section {
  text-align: center;
  margin: 20px 0;
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

<script>
const carousels = {};

function registerCarousel(datasetId, totalSlides) {
  carousels[datasetId] = {
    currentSlide: 0,
    totalSlides: totalSlides
  };
  updateCarousel(datasetId);
}

function nextSlide(datasetId) {
  const carousel = carousels[datasetId];
  if (carousel.currentSlide < carousel.totalSlides - 1) {
    carousel.currentSlide++;
    updateCarousel(datasetId);
  }
}

function prevSlide(datasetId) {
  const carousel = carousels[datasetId];
  if (carousel.currentSlide > 0) {
    carousel.currentSlide--;
    updateCarousel(datasetId);
  }
}

function updateCarousel(datasetId) {
  const carousel = carousels[datasetId];
  const slides = document.querySelectorAll(`#${datasetId}-carousel .carousel-slide`);
  
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === carousel.currentSlide);
  });
  
  document.getElementById(`${datasetId}-counter`).textContent = 
    `${carousel.currentSlide + 1} / ${carousel.totalSlides}`;
  
  document.getElementById(`${datasetId}-prev`).disabled = carousel.currentSlide === 0;
  document.getElementById(`${datasetId}-next`).disabled = 
    carousel.currentSlide === carousel.totalSlides - 1;
}
</script>


# Neural USD: An object-centric framework for iterative editing and control
---

<div class="author-section">
  <p class="author-names">
    Alejandro Escontrela<sup>†,*</sup>, <a href="https://www.linkedin.com/in/shrinu-kushagra-1ab73731/">Shrinu Kushagra</a><sup>†</sup>, <a href="https://www.sjoerdvansteenkiste.com/">Sjoerd van Steenkiste</a><sup>v</sup>, <a href="https://yuliarubanova.github.io/">Yulia Rubanova</a><sup>†</sup>,<br/>
    <a href="https://holynski.org/">Aleksander Hołyński</a><sup>†</sup>, <a href="https://k-r-allen.github.io/">Kelsey Allen</a><sup>†</sup>, <a href="https://x.com/sirbayes?lang=en">Kevin Murphy</a><sup>†</sup>, <a href="https://tkipf.github.io/">Thomas Kipf</a><sup>†,‡</sup>
  </p>
  <p class="author-affiliations">
    <sup>†</sup>Google DeepMind, <sup>*</sup>U.C. Berkeley, <sup>v</sup>Google Research
  </p>
  <p class="author-note">
    <sup>*</sup>Corresponding authors: <a href="mailto:escontrela@berkeley.edu">escontrela@berkeley.edu</a>, <a href="mailto:tkipf@google.com">tkipf@google.com</a>. Work done during an internship
  </p>
</div>

<div class="row">
    <div class="text-center col-12 mt-4 mt-md-0">
        <h3><a href="TODO">Paper<br/><i class="fas fa-file-pdf"></i></a></h3>
    </div>
</div>

<br/>

## Overview
---

Amazing progress has been made in controllable generative modeling, especially over the last few years. However, some challenges remain. One of them is precise and iterative object editing. In many of the current methods, trying to edit the generated image (for example, changing the color of a particular object in the scene or changing the background while keeping other elements unchanged) by changing the conditioning signals often leads to unintended global changes in the scene. In this work, we take the first steps to address the above challenges. Taking inspiration from the Universal Scene Descriptor (USD) standard developed in the computer graphics community, we introduce the “Neural Universal Scene Descriptor” or Neural USD. In this framework, we represent scenes and objects in a structured, hierarchical manner. This accommodates diverse signals, minimizes model-specific constraints, and enables per-object control over appearance, geometry, and pose. We further apply a fine-tuning approach which ensures that the above control signals are disentangled from one another. We evaluate several design considerations for our framework, demonstrating how Neural USD enables iterative and incremental workflows.

<div class="splash-figure">
  <img src="https://neural-usd.escontrela.me/splash.png" alt="Neural USD Overview">
</div>

## Method
---

A Neural USD consists of assets with multiple modalities: appearance, geometry, and pose. Pre-trained image models fine-tune on Neural USD data, encoding appearance and geometry from a source image and pose from a target image to reconstruct the target. At inference time, objects' poses, geometry, and appearance can be modified, including the background:

<div class="method-figure">
  <img src="https://neural-usd.escontrela.me/method_figure.png" alt="Neural USD method">
</div>

## Control Examples
---

Neural USD allows users to perform a variety of pose, appearance, and geometry modifications to both the foreground and the background objects:


<div class="method-figure">
  <img src="https://neural-usd.escontrela.me/control_examples.png" alt="Neural USD control examples">
</div>

## Object Replacement
---

Object replacement examples with appearance and geometry conditioning (top) and geometry conditioning (bottom):

<div class="method-figure">
  <img src="https://neural-usd.escontrela.me/examples_replace.png" alt="Neural USD object replacement">
</div>

## Neural USD Examples
---

Below we demonstrate some of the interactive operations made possible by using Neural USD. We showcase examples on four well-known datasets: Objectron, Waymo, MOVI-E, and Ego4D Egotracks.

### Objectron

<div class="dataset-section">
  <div id="objectron-carousel">

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/1_2.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/reconstruction/1_2.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/geometry_xz/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xy/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xz/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/1_7.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/reconstruction/1_7.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/geometry_xz/boxes/1_7.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/1_7.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/1_7.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xy/boxes/1_7.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xz/boxes/1_7.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/2_0.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/reconstruction/2_0.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/2_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/2_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xy/boxes/2_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xz/boxes/2_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/2_4.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/reconstruction/2_4.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xy/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xz/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/2_6.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/reconstruction/2_6.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xy/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xz/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/3_0.png" alt="Source with bboxes" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/3_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/3_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xz/boxes/3_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/3_6.png" alt="Source with bboxes" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/3_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/3_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xz/boxes/3_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/3_7.png" alt="Source with bboxes" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/3_7.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/3_7.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_xz/boxes/3_7.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/4_5.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/reconstruction/4_5.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/4_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/4_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_yz/boxes/4_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/src_bboxes/4_6.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/original/reconstruction/4_6.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/rotation_x/boxes/4_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/scaling/boxes/4_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/objectron/translation_yz/boxes/4_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="carousel-controls">
    <button class="carousel-button" id="objectron-prev" onclick="prevSlide('objectron')">Previous</button>
    <span class="carousel-counter" id="objectron-counter">1 / 10</span>
    <button class="carousel-button" id="objectron-next" onclick="nextSlide('objectron')">Next</button>
  </div>
</div>

<script>registerCarousel('objectron', 10);</script>


### Waymo

<div class="dataset-section">
  <div id="waymo-carousel">

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/src_bboxes/1_5.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/reconstruction/1_5.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xy/boxes/1_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xz/boxes/1_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/rotation_y/boxes/1_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/scaling/boxes/1_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xy/boxes/1_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xz/boxes/1_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_yz/boxes/1_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/src_bboxes/2_2.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/reconstruction/2_2.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry Rotate</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_rotate/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xz/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/rotation/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/scaling/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xy/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xz/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_yz/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/src_bboxes/2_4.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/reconstruction/2_4.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry Rotate</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_rotate/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xz/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/rotation/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/scaling/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xy/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xz/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_yz/boxes/2_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/src_bboxes/2_5.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/reconstruction/2_5.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry Rotate</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_rotate/boxes/2_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xz/boxes/2_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/rotation/boxes/2_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/scaling/boxes/2_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xy/boxes/2_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xz/boxes/2_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_yz/boxes/2_5.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/src_bboxes/3_1.png" alt="Source with bboxes" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xy/boxes/3_1.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xz/boxes/3_1.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/rotation_y/boxes/3_1.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/scaling/boxes/3_1.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xy/boxes/3_1.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xz/boxes/3_1.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/src_bboxes/3_3.png" alt="Source with bboxes" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xy/boxes/3_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xz/boxes/3_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/rotation_y/boxes/3_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/scaling/boxes/3_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xy/boxes/3_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xz/boxes/3_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/original/src_bboxes/3_4.png" alt="Source with bboxes" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xy/boxes/3_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/geometry_xz/boxes/3_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/rotation_y/boxes/3_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/scaling/boxes/3_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xy/boxes/3_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/waymo/translation_xz/boxes/3_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="carousel-controls">
    <button class="carousel-button" id="waymo-prev" onclick="prevSlide('waymo')">Previous</button>
    <span class="carousel-counter" id="waymo-counter">1 / 7</span>
    <button class="carousel-button" id="waymo-next" onclick="nextSlide('waymo')">Next</button>
  </div>
</div>

<script>registerCarousel('waymo', 7);</script>


### MOVI-E

<div class="dataset-section">
  <div id="movi-e-carousel">

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/src_bboxes/1_0.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/reconstruction/1_0.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xy/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xz/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_yz/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_x/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_y/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Z</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_z/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/scaling/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xy/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xz/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_yz/boxes/1_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/src_bboxes/1_2.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/reconstruction/1_2.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xy/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xz/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_yz/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_x/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_y/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Z</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_z/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/scaling/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xy/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xz/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_yz/boxes/1_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/src_bboxes/1_3.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/reconstruction/1_3.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xy/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xz/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_yz/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_x/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_y/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Z</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_z/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/scaling/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xy/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xz/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_yz/boxes/1_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/src_bboxes/1_6.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/reconstruction/1_6.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xy/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xz/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_yz/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation X</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_x/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_y/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Z</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_z/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/scaling/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xy/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xz/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_yz/boxes/1_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/src_bboxes/2_2.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/reconstruction/2_2.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xy/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_yz/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_y/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Z</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_z/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xy/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xz/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_yz/boxes/2_2.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/src_bboxes/2_3.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/reconstruction/2_3.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xy/boxes/2_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_yz/boxes/2_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_y/boxes/2_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Z</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_z/boxes/2_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xy/boxes/2_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xz/boxes/2_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_yz/boxes/2_3.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/src_bboxes/2_6.png" alt="Source with bboxes" class="original-img">
            </div>
            <div class="media-item">
              <label>Reconstruction (Upper Bound)</label>
              <img src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/original/reconstruction/2_6.png" alt="Reconstruction" class="original-img">
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Geometry XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_xy/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Geometry YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/geometry_yz/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Y</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_y/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Rotation Z</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/rotation_z/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XY</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xy/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation XZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_xz/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation YZ</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/movi-e/translation_yz/boxes/2_6.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="carousel-controls">
    <button class="carousel-button" id="movi-e-prev" onclick="prevSlide('movi-e')">Previous</button>
    <span class="carousel-counter" id="movi-e-counter">1 / 7</span>
    <button class="carousel-button" id="movi-e-next" onclick="nextSlide('movi-e')">Next</button>
  </div>
</div>

<script>registerCarousel('movi-e', 7);</script>


### Egotracks

<div class="dataset-section">
  <div id="egotracks-carousel">

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <video class="original-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/egotracks/original/src/2_0.mp4" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/egotracks/scaling/2_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/egotracks/translation/2_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <video class="original-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/egotracks/original/src/3_0.mp4" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/egotracks/scaling/3_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/egotracks/translation/3_0.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-slide">
      <div class="slide-content">
        <div class="glow-box original-box">
          <h4>Original</h4>
          <div class="original-grid">
            <div class="media-item">
              <label>Source w/ Bounding Boxes</label>
              <video class="original-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/egotracks/original/src/5_4.mp4" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
        <div class="glow-box predictions-box">
          <h4>Predictions</h4>
          <div class="operations-grid">
            <div class="operation-cell">
              <label>Scaling</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/egotracks/scaling/5_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
            <div class="operation-cell">
              <label>Translation</label>
              <video class="operation-video" autoplay loop muted playsinline>
                <source src="https://neural-usd.escontrela.me/neural_usd_examples/egotracks/translation/5_4.mp4" type="video/mp4">
              </video>
              <script>
                document.currentScript.previousElementSibling.playbackRate = 0.0625;
              </script>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="carousel-controls">
    <button class="carousel-button" id="egotracks-prev" onclick="prevSlide('egotracks')">Previous</button>
    <span class="carousel-counter" id="egotracks-counter">1 / 3</span>
    <button class="carousel-button" id="egotracks-next" onclick="nextSlide('egotracks')">Next</button>
  </div>
</div>

<script>registerCarousel('egotracks', 3);</script>

## How to cite
{: .no_toc}
---

<div class="publications">
{% bibliography -f papers --template bib_bibtex_only -q @*[title=Neural USD: Scalable Scene Editing via Differentiable Universal Scene Description]* --max 0 %}
</div>