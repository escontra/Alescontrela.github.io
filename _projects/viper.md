---
layout: page
title: "Video Prediction Models as Rewards for Reinforcement Learning"
description: Using advances in generative modeling to learn reward functions from unlabeled videos.
img: assets/img/viper/viper_method.png
importance: 1
category: work
---
<!-- 
<div class="row justify-content-sm-center">
    <a href="https://www.dailymail.co.uk/sciencetech/article-11024615/Robot-dog-walk-ONE-hour-training-scientists-hope-play-fetch-future.html" class="col-6 col-sm-6 col-md-3 mt-3 mt-md-0">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/dailymail.png"
          alt="Card image cap"> 
    </a>
    <a href="https://www.technologyreview.com/2022/07/18/1056059/robot-dog-ai-reinforcement/" class="col-6 col-sm-6 col-md-3 mt-3 mt-md-0">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/mittechreview.png"
          alt="Card image cap"> 
    </a>
    <a href="https://techcrunch.com/2022/07/21/berkeley-shows-off-accelerated-learning-that-puts-robots-on-their-feet-in-minutes/" class="col-6 col-sm-6 col-md-3 mt-3 mt-md-0">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/techcrunch.png"
          alt="Card image cap"> 
    </a>
    <a href="https://techxplore.com/news/2022-07-daydreamer-algorithm-quickly-robots-behaviors.html" class="col-6 col-sm-6 col-md-3 mt-3 mt-md-0">
        <img class="card-img bg-white rounded" src="/assets/img/techxplore.png"
          alt="Card image cap"> 
    </a>
</div> -->


## Publication info
<div class="publications">
{% bibliography -f papers -q @*[title=Video Prediction Models as Rewards for Reinforcement Learning]* %}
</div>

<br/>
<div class="row">
    <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h4><a href="https://arxiv.org/pdf/2206.14176.pdf">Paper</a></h4>
    </div>
    <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h4><a href="https://twitter.com/danijarh/status/1542170248706609152">Twitter</a></h4>
    </div>
    <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h4>Code (Coming Soon)</h4>
    </div>
</div>

<br/>

## Overview
Specifying reward signals that allow agents to learn complex behaviors is a long-
standing challenge in reinforcement learning. A promising approach is to extract
preferences for behaviors from unlabeled videos, which are widely available on
the internet. We present Video Prediction Rewards (VIPER), an algorithm that
leverages pretrained video prediction models as action-free reward signals for
reinforcement learning. Specifically, we first train an autoregressive transformer
on expert videos and then use the video prediction likelihoods as reward signals
for a reinforcement learning agent. VIPER enables expert-level control without
programmatic task rewards across a wide range of DMC, Atari, and RLBench tasks.
Moreover, generalization of the video prediction model allows us to derive rewards
for an out-of-distribution environment where no expert data is available, enabling
cross-embodiment generalization for tabletop manipulation. We see our work as
starting point for scalable reward specification from unlabeled videos that will
benefit from the rapid advances in generative modeling. 

## Video Prediction Rewards

## Leveraging Video Prediction Rewards for Reinforcement Learning

## Benchmarks

## Design Decisions

## Acknowledgements
This work was supported in part by an NSF Fellowship, NSF NRI #2024675, and the Vanier Canada Graduate Scholarship.
