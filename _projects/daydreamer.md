---
layout: page
title: "DayDreamer: World Models for Physical Robot Learning"
description: Hyper data-efficient robot learning with world models
img: assets/img/daydreamer_splash.png
importance: 1
category: work
---

<div class="row">
    <div class="text-center col-3 col-sm-3 mt-3 mt-md-0">
        <h4><a href="https://arxiv.org/pdf/2206.14176.pdf">Paper<br/><i class="fas fa-file-pdf"></i></a></h4>
    </div>
    <div class="text-center col-3 col-sm-3 mt-3 mt-md-0">
        <h4><a href="https://twitter.com/danijarh/status/1542170248706609152">Twitter<br/><i class="fab fa-twitter"></i></a></h4>
    </div>
    <div class="text-center col-3 col-sm-3 mt-3 mt-md-0">
        <h4><a href="https://www.youtube.com/watch?v=A6Rg0qRwTYs">Talk<br/><i class="fab fa-youtube"></i></a></h4>
    </div>
    <div class="text-center col-3 col-sm-3 mt-3 mt-md-0">
        <h4><a href="https://github.com/danijar/daydreamer">Code<br/><i class="fas fa-file-code"></i></a></h4>
    </div>
</div>

<br/>

<div class="row justify-content-sm-center gx-5 gy-5">
    <a href="https://www.dailymail.co.uk/sciencetech/article-11024615/Robot-dog-walk-ONE-hour-training-scientists-hope-play-fetch-future.html" class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/dailymail.png"
          alt="Card image cap"> 
    </a>
    <a href="https://www.technologyreview.com/2022/07/18/1056059/robot-dog-ai-reinforcement/" class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/mittechreview.png"
          alt="Card image cap"> 
    </a>
    <a href="https://techcrunch.com/2022/07/21/berkeley-shows-off-accelerated-learning-that-puts-robots-on-their-feet-in-minutes/" class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/techcrunch.png"
          alt="Card image cap"> 
    </a>
    <a href="https://techxplore.com/news/2022-07-daydreamer-algorithm-quickly-robots-behaviors.html" class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2">
        <img class="card-img bg-white rounded" src="/assets/img/techxplore.png"
          alt="Card image cap"> 
    </a>
    <a href="https://www.bbc.co.uk/programmes/m001ph7q?at_medium=social&at_campaign=Social_Flow&at_link_id=31E9265C-3ABA-11EE-AC4C-3A0479A687CD&at_campaign_type=owned&at_format=video&at_ptr_name=twitter&at_link_type=web_link&at_bbc_team=editorial&" class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/bbc_one.png"
          alt="Card image cap"> 
    </a>
    <a href="https://www.reddit.com/r/ChatGPT/comments/142bzk3/selflearning_of_the_robot_in_1_hour/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button" class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/reddit_logo.png"
          alt="Card image cap"> 
    </a>
    <a href="https://engineering.berkeley.edu/news/2022/10/step-by-step/" class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/ucbengineering.webp"
          alt="Card image cap"> 
    </a>
    <a href="https://www.youtube.com/watch?v=h8AUJwPdTIE&t=1s" class="col col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/techcrunch_robotics.png"
          alt="Card image cap"> 
    </a>
</div>

<br/>
## Publication info
---

<div class="publications">
{% bibliography -f papers -q @*[title=Daydreamer: World Models for Physical Robot Learning]* %}
</div>

<br/>
## Learning to walk in the real world in under an hour
---

The A1 quadruped shown below learns to walk with DayDreamer in ~1 hour, from scratch, with no human intervention.


{% raw %}
<p style="position: relative; text-align: center; height: 0; padding-bottom: 56.25%; margin-bottom: 0;">
<iframe frameborder="0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin-bottom: -.5em" src="https://www.youtube-nocookie.com/embed/xAXvfVTgqr0?rel=0" allowfullscreen=""></iframe>
</p>
{% endraw %}


<br/>

## Abstract
---

To solve tasks in complex environments, robots need to learn from experience.
Deep reinforcement learning is a common approach to robot learning but requires
a large amount of trial and error to learn, limiting its deployment in the
physical world. As a consequence, many advances in robot learning rely on
simulators. On the other hand, learning inside of simulators fails to capture
the complexity of the real world, is prone to simulator inaccuracies, and the
resulting behaviors do not adapt to changes in the world. The Dreamer algorithm
has recently shown great promise for learning from small amounts of interaction
by planning within a learned world model, outperforming pure reinforcement
learning in video games. Learning a world model to predict the outcomes of
potential actions enables planning in imagination, reducing the amount of trial
and error needed in the real environment. However, it is unknown whether
Dreamer can facilitate faster learning on physical robots. In this paper, we
apply Dreamer to 4 robots to learn online and directly in the real world,
without any simulators. Dreamer trains a quadruped robot to roll off its back,
stand up, and walk from scratch and without resets in only 1 hour. We then push
the robot and find that Dreamer adapts within 10 minutes to withstand
perturbations or quickly roll over and stand back up. On two different robotic
arms, Dreamer learns to pick and place multiple objects directly from camera
images and sparse rewards, approaching human performance. On a wheeled robot,
Dreamer learns to navigate to a goal position purely from camera images,
automatically resolving ambiguity about the robot orientation. Using the same
hyperparameters across all experiments, we find that Dreamer is capable of
online learning in the real world, which establishes a strong baseline. We
release our infrastructure for future applications of world models to robot
learning.

<br/>
## Robots
---

{% raw %}
<div class="card-deck">
  <div class="card">
    <img class="card-img-top" src="https://imagedelivery.net/3j6TRSJdJ6zKbW2C_AD0hA/fada8d6d-ea88-4326-4d1b-c7dd99c75e00/public" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title text-center">A1 Quadruped Walking</h5>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="https://imagedelivery.net/3j6TRSJdJ6zKbW2C_AD0hA/ab2132c2-1466-4a35-8280-05f5e5b57500/public" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title text-center">UR5 Multi-Object Visual Pick Place</h5>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="https://imagedelivery.net/3j6TRSJdJ6zKbW2C_AD0hA/7bad5268-6ec3-4155-1829-b58b7b675300/public" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title text-center">XArm Visual Pick and Place</h5>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="https://imagedelivery.net/3j6TRSJdJ6zKbW2C_AD0hA/c004b964-cc0e-46c9-30eb-b152365dc300/public" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title text-center">Sphero Ollie Visual Navigation</h5>
    </div>
  </div>
</div>
{% endraw %}

<br/>
## All Media Coverage
---

<ul>
  <li><a href="https://www.dailymail.co.uk/sciencetech/article-11024615/Robot-dog-walk-ONE-hour-training-scientists-hope-play-fetch-future.html">Daily Mail</a></li>
  <li><a href="https://www.technologyreview.com/2022/07/18/1056059/robot-dog-ai-reinforcement/">MIT Technology Review</a></li>
  <li><a href="https://techcrunch.com/2022/07/21/berkeley-shows-off-accelerated-learning-that-puts-robots-on-their-feet-in-minutes/">TechCrunch</a> (<a href="https://www.youtube.com/watch?v=h8AUJwPdTIE">Video</a>)</li>
  <li><a href="https://syncedreview.com/2022/07/04/learning-without-simulations-uc-berkeleys-daydreamer-establishes-a-strong-baseline-for-real-world-robotic-training/">Synced</a></li>
  <li><a href="https://singularityhub.com/2022/08/08/this-robot-dog-has-an-ai-brain-and-taught-itself-to-walk-in-just-an-hour/">SingularityHub</a></li>
  <li><a href="https://www.zmescience.com/science/robot-teaches-itself-to-walk-235242/">ZME Science</a></li>
  <li><a href="https://www.technology.org/2022/06/29/daydreamer-world-models-for-physical-robot-learning/">Technology Org</a></li>
  <li><a href="https://www.indiatimes.com/technology/science-and-future/robot-dog-taught-itself-how-to-walk-575118.html">India Times</a></li>
  <li><a href="https://analyticsindiamag.com/this-robot-used-dreamer-algorithm-to-learn-walking-in-60-minutes/">Analytics India Mag (AIM)</a></li>
  <li><a href="https://www.marktechpost.com/2022/07/05/uc-berkeley-researchers-use-a-dreamer-world-model-to-train-a-variety-of-real-world-robots-to-learn-from-experience/">MarkTechPost</a></li>
  <li><a href="https://news7g.com/daydreamer-world-model-for-learning-robot-physics/">NEWS7g</a></li>
  <li><a href="https://www.actuia.com/actualite/daydreamer-former-les-robots-dans-le-monde-reel-grace-a-lapprentissage-par-renforcement-en-ligne/">ActuIA</a></li>
  <li><a href="https://www.i-programmer.info/news/105-artificial-intelligence/15646-robot-dog-from-rolling-on-floor-to-walking-in-1-hour.html">I Programmer</a></li>
  <li><a href="https://engineering.berkeley.edu/news/2022/10/step-by-step/">Berkeley Engineering</a></li>
</ul>

<br/>

## Acknowledgements
---
We thank <a href="https://stepjam.github.io/">Stephen James</a> and <a href="https://kerrj.github.io/">Justin Kerr</a> for helpful suggestions and help with
printing the protective shell of the quadruped robot. We thank <a href="https://www.linkedin.com/in/ademi-adeniji">Ademi Adeniji</a> for help with setting up
the XArm robot and <a href="https://twitter.com/ravenhuang4?lang=en">Raven Huang</a> for help with setting up the UR5 robot. This work was supported
in part by an NSF Fellowship, NSF NRI #2024675, and the Vanier Canada Graduate Scholarship.

<br/>

## How to cite
---
<div class="publications">
{% bibliography -f papers_new_pref -q @*[title=Daydreamer: World Models for Physical Robot Learning]* --max 0 %}
</div>