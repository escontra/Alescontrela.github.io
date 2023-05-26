---
layout: page
title: "Adversarial Motion Priors Make Good Substitutes for Complex Reward Functions"
description: Using motion priors to learn energy-efficient and natural robot locomotion strategies
img: assets/img/adversarial_motion_priors.png
importance: 2
category: work
---

<div class="row">
    <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h4><a href="https://arxiv.org/pdf/2203.15103.pdf">Paper</a></h4>
    </div>
    <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h4><a href="https://twitter.com/AleEscontrela/status/1509244950529118210?s=20&t=A6gMqJaCywunW8bj2h0qHw">Twitter</a></h4>
    </div>
    <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h4><a href="https://github.com/Alescontrela/AMP_for_hardware">Code</a></h4>
    </div>
</div>

<br/>
<div class="row justify-content-sm-center">
    <a href="https://techcrunch.com/2022/07/21/berkeley-shows-off-accelerated-learning-that-puts-robots-on-their-feet-in-minutes/" class="col-6 col-sm-6 col-md-3 mt-3 mt-md-0">
        <img style="padding: 5% 5% 5% 5%;" class="card-img border bg-white rounded" src="/assets/img/techcrunch.png"
          alt="Card image cap"> 
    </a>
    <a href="https://www.youtube.com/watch?v=h8AUJwPdTIE&t=1s" class="col-6 col-sm-6 col-md-3 mt-3 mt-md-0">
        <img style="padding: 5% 5% 5% 5%; background: linear-gradient(90deg, rgba(18,70,29,1) 0%, rgba(16,92,28,1) 100%) !important;" class="card-img bg-white rounded" src="/assets/img/techcrunch_robotics.png"
          alt="Card image cap"> 
    </a>
</div>

<br/>
## Publication info
---
<div class="publications">
{% bibliography -f papers -q @*[title=Adversarial Motion Priors Make Good Substitutes for Complex Reward Functions]* %}
</div>

<br/>
## Leveraging adversarial motion priors for robot locomotion
---

{% raw %}
<p style="position: relative; text-align: center; height: 0; padding-bottom: 56.25%; margin-bottom: 0;">
<iframe frameborder="0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin-bottom: -.5em" src="https://www.youtube.com/embed/Bo88rwUQbrM?rel=0" allowfullscreen=""></iframe>
</p>
{% endraw %}


<br/>

## Overview
---

<div class="row">
    <div class="text col-12 col-sm-12 col-md-6 mt-4 mt-md-0">
        <p>We propose substituting complex reward functions with motion priors learned from a dataset of motion capture demonstrations. A learned style reward can be combined with an arbitrary task reward to train policies that perform tasks using naturalistic strategies. These natural strategies can also facilitate transfer to the real world. We build upon Adversarial Motion Priors - an approach from the computer graphics domain that encodes a style reward from a dataset of reference motions - to demonstrate that an adversarial approach to training policies can produce behaviors that transfer to a real quadrupedal robot without requiring complex reward functions. We also demonstrate that an effective style reward can be learned from a few seconds of motion capture data gathered from a German Shepherd and leads to energy-efficient locomotion strategies with natural gait transitions.</p>
    </div>
    <div class="text-center col-12 col-sm-12 col-md-6 mt-4 mt-md-0">
        <img class="card-img-top" src="/assets/img/amp_arch.png" alt="Card image cap">
    </div>
</div>

<br/>
## Example behaviors
---

<div class="row">
    <div class="text col-12 col-sm-12 col-md-4">
      <div class="embed-responsive embed-responsive-1by1">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/lhji1NY1-d4" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
    <div class="text col-12 col-sm-12 col-md-4">
      <div class="embed-responsive embed-responsive-1by1">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/oJm77Gz5PR8" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
    <div class="text col-12 col-sm-12 col-md-4">
      <div class="embed-responsive embed-responsive-1by1">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PRcNXRMhVWs" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
</div>

<br/>

## Energy efficiency comparison with baselines
---
<div class="row">
    <div class="text col-12">
        <p>
        We estimate the Cost of Transport (COT) for a policy trained using Adversarial Motion Priors. COT is a dimensionless quantity commonly used in the field of legged locomotion, as it allows for energy-efficiency comparisons of dissimilar robots or controllers. We utilize the COT to measure the efficiency of different baselines at different speeds.
        </p> 
        <p>
        A policy trained using AMP successfully tracks the desired forward velocity commands while exhibiting a lower COT than competing baselines (see paper). The energy efficiency of policies trained with AMP can likely be attributed to the policy extracting energy-efficient motion priors from the reference data. Millions of years of evolution has endowed dogs with energy-efficient locomotion behaviors. Training with AMP enables the policy to extract some of these energy-efficient strategies from the data. Additionally, animals often perform gait transitions when undergoing large changes in velocity, lowering the cost of transport across different speeds. The same principle applies to policies trained using AMP. The below figure demonstrates the robot transitioning from a pacing motion to a canter motion when the desired velocity jumps from 1 m/s to 2 m/s. While pacing is the optimal gait at low speeds, entering a canter motion with a flight phase is a more energy-efficient option at high speeds.
        </p>
    </div>
    <div class="text col-12">
        <img class="card-img-top" src="/assets/img/cot_diagram.png" alt="Card image cap">
    </div>
</div>

<br/>
## Motion priors substitute the need for complex style rewards or custom action spaces
---

<div class="row">
    <div class="text-center col-12 col-sm-12 col-md-5 mt-4 mt-md-0">
        <img class="card-img-top" src="/assets/img/amp_csr_or_cas.png" alt="Card image cap">
    </div>
    <div class="text col-12 col-sm-12 col-md-7 mt-4 mt-md-0">
        <p>Complex reward functions with tens of terms or custom action spaces are normally used to ensure that policies transfer from simulation to reality. The terms in the complex reward function are often used to disincentivize the policy from learning behaviors which exploit the inaccurate simulation dynamics or are inefficient. While policies trained in this manner transfer to hardware, it is often tedious to hand-design giant reward functions and weight their individual components. Additionally, these hand-designed reward functions are often platform-dependent and don't work well across all tasks. Alternatively, researchers have explored defining custom action spaces such as trajectory generators. These hand-defined action spaces prevent the robot from learning undesired behaviors, but often limit the performance of the resulting policy and require significant engineering effort to develop. Adversarial Motion Priors provide a promising alternative to these approaches. Using a small amount of reference data, we can learn a style reward that encourages the agent to learn efficient and aesthetically pleasing behaviors with minimal engineering effort.</p>
    </div>
</div>

<br/>
## More behaviors
---

<div class="row">
    <div class="text col-12 col-sm-12 col-md-4">
        <div class="embed-responsive embed-responsive-1by1">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/mPhKhn8VBgQ" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="text-center"><p>Informal race between <a href="https://arxiv.org/pdf/2111.01674.pdf">Fu et al.</a> (left) and AMP Policy (right)</p></div>
    </div>
    <div class="text col-12 col-sm-12 col-md-4">
        <div class="embed-responsive embed-responsive-1by1">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/xR13j7gVYro" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="text-center"><p>A user can use a joystick policy to provide the policy with command velocities. The AMP controller produces precise behaviors which enable the robot to navigate a course with tight turns.</p></div>
    </div>
    <div class="text col-12 col-sm-12 col-md-4">
        <div class="embed-responsive embed-responsive-1by1">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/hbTpjwsKZQs" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="text-center"><p>AMP policy performing a figure eight maneuver, which requires interpolating within a range of angular velocities.</p></div>
    </div>
</div>

<br/>

## Acknowledgements
---
The authors would like to thank <a href="https://www.lauvisuals.com/">Adam Lau</a>, <a href="https://kerrj.github.io/">Justin Kerr</a>,
<a href="https://www.ipr.kit.edu/english/staff_2970.php">Lars Berscheid</a>, and <a href="https://twitter.com/chungminkim?lang=en">Chung Min Kim</a> for their helpful contributions and discussions.

<br/>
## How to cite
---

<div class="publications">
{% bibliography -f papers_new_pref -q @*[title=Adversarial Motion Priors Make Good Substitutes for Complex Reward Functions]* --max 0 %}
</div>