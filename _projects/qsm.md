---
layout: page
title: "Learning a Diffusion Model Policy from Rewards via Q-Score Matching"
description: Learning diffusion model policies for off-policy reinforcement learning.
img: assets/img/score_matching_rl/qsm_splash.png
importance: 1
category: work
---

<div class="row">
    <div class="text-center col-6 col-sm-6 mt-6 mt-md-0">
        <h3><a href="https://arxiv.org/abs/2312.11752">Paper<br/><i class="fas fa-file-pdf"></i></a></h3>
    </div>
    <div class="text-center col-6 col-sm-6 mt-6 mt-md-0">
        <h3><a href="https://github.com/Alescontrela/score_matching_rl">Code<br/><i class="fas fa-file-code"></i></a></h3>
    </div>
</div>
<br/>


## Publication info
{: .no_toc}
---
<div class="publications">
{% bibliography -f papers -q @*[title=Learning a Diffusion Model Policy from Rewards via Q-Score Matching]* --max 0 %}
</div>

<br/>

## Abstract
---

Diffusion models have become a popular choice for representing actor policies in behavior cloning and offline reinforcement learning. This is due to their natural ability to optimize an expressive class of distributions over a continuous space. However, previous works fail to exploit the score-based structure of diffusion models, and instead utilize a simple behavior cloning term to train the actor, limiting their ability in the actor-critic setting. In this paper, we present a theoretical framework linking the structure of diffusion model policies to a learned Q-function, by linking the structure between the score of the policy to the action gradient of the Q-function. We focus on off-policy reinforcement learning and propose a new policy update method from this theory, which we denote _Q score matching_. Notably, this algorithm only needs to differentiate through the denoising model rather than the entire diffusion model evaluation, and converged policies through Q-score matching are implicitly multi-modal and explorative in continuous domains. We conduct experiments in simulated environments to demonstrate the viability of our proposed method and compare to popular baselines.

<br/>

## Acknowledgements
{: .no_toc}
---
Michael Psenka acknowledges support from ONR grant N00014-22-1-2102. Alejandro Escontrela acknowledges support from an NSF Fellowship, NSF NRI \#2024675. Yi Ma acknowledges support from ONR grant N00014-22-1-2102 and the joint Simons Foundation-NSF DMS grant \#2031899. This work was partially supported by NSF 1704458, the Northrop Grumman Mission Systems Research in Applications for Learning Machines (REALM) initiative, NIH NIA 1R01AG067396, and ARO MURI W911NF-17-1-0304.

<br/>

## How to cite
{: .no_toc}
---

<div class="publications">
{% bibliography -f papers_new_pref -q @*[title=Learning a Diffusion Model Policy from Rewards via Q-Score Matching]* --max 0 %}
</div>