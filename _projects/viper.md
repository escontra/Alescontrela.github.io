---
layout: page
title: "Video Prediction Models as Rewards for Reinforcement Learning"
description: Using advances in generative modeling to learn reward functions from unlabeled videos.
img: assets/img/viper/viper_method.png
importance: 0
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
    <div class="text-center col-6 col-sm-6 mt-6 mt-md-0">
        <h3><a href="https://arxiv.org/pdf/2305.14343.pdf">Paper</a></h3>
    </div>
    <!-- <div class="text-center col-4 col-sm-4 mt-4 mt-md-0">
        <h4><a href="https://twitter.com/danijarh/status/1542170248706609152">Twitter</a></h4>
    </div> -->
    <div class="text-center col-6 col-sm-6 mt-6 mt-md-0">
        <h3>Code (Coming Soon)</h3>
    </div>
</div>

<br/>

## Overview

In this work, we propose using Video Prediction Rewards (VIPER) for reinforcement learning.
VIPER first learns a video prediction model from expert videos. We then train an agent using
reinforcement learning to maximize the log-likelihood of agent trajectories estimated by the video
prediction model. Directly leveraging the video model’s likelihoods as a
reward signal encourages the agent to match the video model’s trajectory distribution. Additionally,
rewards specified by video models inherently measure the temporal consistency of behavior, unlike
observation-level rewards. Further, evaluating likelihoods is significantly faster than performing
video model rollouts, enabling faster training times and more interactions with the environment.

<div class="embed-responsive embed-responsive-4by3">
<video controls autoplay muted loop>
<source src="/assets/vid/viper_method.mp4" type="video/mp4">
</video>
</div>

We summarize the three key contributions of this paper as follows:
- We present VIPER: a novel, scalable reward specification algorithm which leverages rapid improvements in generative modeling to provide RL agents with rewards from unlabeled videos.
- We perform an extensive evaluation, and show that VIPER can achieve expert-level control without task rewards on 15 DMC tasks, 6 RLBench tasks, and 7 Atari tasks.
- We demonstrate that VIPER generalizes to different environments for which no training data was provided, enabling cross-embodiment generalization for tabletop manipulation.

Along the way, we discuss important implementation details that improve the robustness of VIPER.

## Leveraging Video Prediction Rewards for Reinforcement Learning

### Video Modeling
Our method can integrate any video model that supports computing likelihoods over the joint distribution factorized in the following form:

$$\log p(x_{1:T}) = \sum_{t=1}^T \log p(x_t\mid x_{1:t-1}),$$

where $$x_{1:T}$$ is the full video consisting of $$T$$ frames, $$x_1,\dots,x_T$$.

In this paper, we use an autoregressive transformer model based on VideoGPT as our video
generation model. We first train a VQ-GAN to encode individual frames $$x_t$$ into discrete codes
$$z_t$$. Next, we learn an autoregressive transformer to model the distribution of codes $$z$$ through the
following maximum likelihood objective:

$$\max_{\theta} \sum_{t=1}^T \sum_{i=1}^Z \log p_\theta(z^i_t \mid z^{1:i-1}_t, z_{1:t-1}),$$

The resulting video model is able to produce videos that capture the complex dynamics and behaviors in each environment. For example, a single task-conditond video model trained on 45 RLBench tasks across two arms produces rollouts which accurately model each task:


<img class="mx-auto d-block img-fluid rounded" style="width: 100%;" src="/assets/gif/rlbench_samples_final.gif"/>



### Reward Formulation

Given a pretrained video model, VIPER proposes an intuitive reward that maximizes the conditional log-likelihoods for each transition $$(x_t, a_t, x_{t+1})$$ observed by the agent:

$$r^{\mathrm{VIPER}}_t \doteq \ln p_\theta(x_{t+1}|x_{1:t}).$$

This reward incentivizes the agent to find the most likely trajectory under the expert video distribution as modeled by the video model. However, the most probable sequence does not necessarily capture the distribution of behaviors we want the agent to learn.

For example, when flipping a weighted coin with $$p(\text{heads} = 0.6)$$ 1000 times, typical sequences will
count roughly 600 heads and 400 tails, in contrast to the most probable sequence of 1000 heads that
will basically never be seen in practice. Similarly, the most likely image under a density model
trained on MNIST images is often the image of only background without a digit, despite this never
occurring in the dataset. In the reinforcement learning setting, an additional issue is that solely
optimizing a dense reward such as $$r^{\mathrm{VIPER}}_t$$ can lead to early convergence to local optima.

To overcome these challenges, we take the more principled approach of matching the agent’s trajectory
distribution $$q(x_{1:T} )$$ to the sequence distribution $$p_\theta(x_{1:T} )$$ of the video model by minimizing the
KL-divergence between the two distributions. We refer the reader to the main text for all derivations. The resulting reward is given by:

$$r^{\mathrm{KL}}_t \doteq r^{\mathrm{VIPER}}_t+\beta r^\mathrm{expl}_t,$$

Where $$\beta$$ balances the relative importance of the VIPER and exploration rewards. We summarize VIPER in the figure below:

<div class="row">
    <div class="text-center col-12 col-sm-12 col-md-12 mt-4 mt-md-0">
        <figure class="figure mx-auto d-block rounded">
            <img class="mx-auto d-block img-fluid rounded" src="/assets/img/viper/viper_method_figure.png"/>
            <figcaption class="figure-caption text-center">Full outline of the VIPER algorithm.</figcaption>
        </figure>
    </div>
</div>


## Benchmarks

We evaluate using VIPER rewards for policy learning on 15 tasks from the DeepMind Control Suite, 7 tasks from Atari Gym, and 6 tasks from the Robot Learning Benchmark. Aggregate plots of the results are shown below. We compare VIPER to Adversarial Motion Priors, and to a Task Oracle with access to full state information and task reward.

<div class="row">
    <div class="text-center col-12 col-sm-12 col-md-12 mt-4 mt-md-0">
        <figure class="figure mx-auto d-block rounded">
            <img class="mx-auto d-block img-fluid rounded" src="/assets/img/viper/results_agg.png"/>
            <figcaption class="figure-caption text-center">Aggregate results across 15 DMC tasks, 7 Atari games, and 6 RLBench tasks. DMC results are provided for DrQ and DreamerV3 (Dv3) RL agents. Atari and RLBench results are reported for DreamerV3. Atari scores are computed using Human-Normalized Mean.</figcaption>
        </figure>
    </div>
</div>



<div class="row">
    <div class="text-center col-12 col-sm-12 col-md-5 mt-4 mt-md-0">
        <figure class="figure mx-auto d-block">
            <img class="mx-auto d-block img-fluid rounded" style="width: 100%;" src="/assets/gif/VIPER/DMC_GIFS_final.gif"/>
            <figcaption class="figure-caption text-center">Sample policies learned for the DeepMind Control Suite set of tasks.</figcaption>
        </figure>
    </div>
    <div class="text col-12 col-sm-12 col-md-7 mt-4 mt-md-0">
        <p>In DMC, VIPER achieves near expert-level performance from pixels with our video prediction
            rewards alone. Although VIPER slightly underperforms Task Oracle, this is surprising as the Task
            Oracle uses full state information along with dense task rewards. VIPER outperforms both variants
            of AMP. Worth noting is the drastic performance difference between the single-task and multi-task
            AMP algorithms. This performance gap can possibly be attributed to mode collapse, whereby the
            discriminator classifies all frames for the current task as fake samples, leading to an uninformative
            reward signal for the agent. Likelihood-based video models, such as VIPER, are less susceptible to
            mode collapse than adversarial methods.</p>
    </div>
</div>

<div class="row">
    <div class="text col-12 col-sm-12 col-md-12 mt-4 mt-md-0">
        <p>In Atari, VIPER approaches the performance of the Task Oracle trained with the original sparse task
        reward, and outperforms the AMP baseline. We found that masking the scoreboard
        in each Atari environment when training the video model improved downstream RL performance.
        </p>
    </div>
</div>

<div class="row">
    <div class="text-center col-12 col-sm-12 col-md-12 mt-4 mt-md-0">
    <figure class="figure mx-auto d-block">
        <img class="mx-auto d-block img-fluid rounded" style="width: 100%" src="/assets/gif/VIPER/ATARI_GIFS_final.gif"/>
    <figcaption class="figure-caption text-center">Sample policies learned for Atari games.</figcaption>
    </figure>
    </div>
</div>

<div class="row">
    <div class="text col-12 col-sm-12 col-md-12 mt-4 mt-md-0">
        <p>For RLBench, VIPER outperforms the Task Oracle because RLBench tasks provide very sparse
rewards after long sequences of actions, which pose a challenging objective for RL agents. VIPER
instead provides a dense reward extracted from the expert videos, which helps learn these challenging
tasks. When training the video model, we found it beneficial to train at a reduced frame rate,
accomplished by subsampling video sequences by a factor of 4. Otherwise, we observed the
video model would assign high likelihoods to stationary trajectories, resulting in learned policies
rarely moving and interacting with the scene. We hypothesize that this may be partially due to
the high control frequency of the environment, along with the initial slow acceleration of the
robot arm in demonstrations, resulting in very little movement between adjacent frames.</p>
    </div>
</div>

<div class="row">
<div class="text-center col-12 col-sm-12 col-md-12 mt-4 mt-md-0">
    <figure class="figure mx-auto d-block">
        <img class="mx-auto d-block img-fluid rounded" style="width: 100%;" src="/assets/gif/VIPER/RLBench_final.gif"/>
    <figcaption class="figure-caption text-center">Sample policies learned for RLBench manipulation tasks.</figcaption>
    </figure>
</div>
</div>

## Cross-Embodiment Generalization

We seek to understand how this generalization can be used to learn more general reward functions. We train a model on two datasets of different robot arms, and evaluate the cross-embodiment generalization capabilities of the model. Specifically, we gather demonstrations for 23 tasks on the Rethink Robotics Sawyer Arm, and demonstrations for 30 tasks on the Franka Panda robotic arm, where only 20 tasks are overlapping between arms. We then train a task-conditioned autoregressive video model on these demonstration videos and evaluate the video model by querying unseen arm/task combinations, where a single initial frame is used for open loop predictions.

Sample video model rollouts for in distribution training tasks and an OOD arm/task combination are shown below:

<figure class="figure mx-auto d-block">
<div class="row">
    <div class="text-center col-4 col-sm-4 col-md-4 mt-4 mt-md-0">
        <img class="mx-auto d-block w-100 rounded border border-warning" style="border-width: 5px !important;" src="/assets/gif/VIPER/generalization_saucepan_sawyer.gif"/>
    </div>
    <div class="text-center col-4 col-sm-4 col-md-4 mt-4 mt-md-0">
        <img class="mx-auto d-block w-100 rounded border border-warning" style="border-width: 5px !important;" src="/assets/gif/VIPER/generalization_umbrella_panda.gif"/>
    </div>
    <div class="text-center col-4 col-sm-4 col-md-4 mt-4 mt-md-0">
        <img class="mx-auto d-block w-100 rounded border border-success" style="border-width: 5px !important;" src="/assets/gif/VIPER/generalization_saucepan_panda.gif"/>
    </div>
</div>
<figcaption class="figure-caption text-center">Sampled video predictions for in distribution reference videos (Left and Middle) and an OOD arm/task combination (Right). The video model displays cross-embodiment generalization to arm/task combination not observed in the training data. Video model generalization can enable specifying new tasks where no reference data is available.</figcaption>
</figure>

Even though the video model was not directly trained on demon-
strations of the Franka Panda arm to solve the
saucepan task in RLBench, it is able to generate
reasonable trajectories for the arm and task combination


We observe that these generalization capabilities also extend to downstream RL, where we use our trained video model with VIPER to learn a policy for the Franka Robot arm to solve an OOD task without requiring demos for that specific task and arm combination. These results demonstrate a promising direction for future work in applying VIPER to larger scale video models that will be able to better generalize and learn desired behaviors only through a few demonstrations.

<div class="row">
    <div class="text-center col-12 col-sm-12 col-md-12 mt-4 mt-md-0">
        <figure class="figure mx-auto d-block rounded">
            <img class="mx-auto d-block img-fluid rounded" style="width: 80%;" src="/assets/img/viper/cross_embodiment_generalization.png"/>
            <figcaption class="figure-caption text-center">(Left) Training curve for RL agent trained with VIPER on OOD task. (Right) Task-conditional likelihood for reference and random trajectory for an OOD task.</figcaption>
        </figure>
    </div>
</div>


## Visualizing Video Model Uncertainty

We can visualize the the uncertainty of the video model by upsampling per-frame log-probabilities for each VQCode. We find that the video model correctly assigns low log probs to trajectories that are not consistent with the reference videos, and high log probs to trajectories that are consistent with the reference videos. We show this for low return trajectories and expert trajectories in the figure below:

<figure class="figure mx-auto d-block">
<div class="row">
    <div class="text-center col-6 col-sm-6 col-md-6 mt-4 mt-md-0">
        <img class="mx-auto d-block w-100 rounded border border-danger" style="border-width: 3px !important; width: 100%;" src="/assets/gif/VIPER/uncertainty_rlbench_bad.gif"/>
    </div>
    <div class="text-center col-6 col-sm-6 col-md-6 mt-4 mt-md-0">
        <img class="mx-auto d-block w-100 rounded border border-success" style="border-width: 3px !important; width: 100%;" src="/assets/gif/VIPER/uncertainty_rlbench_good.gif"/>
    </div>
</div>
<div class="row">
    <div class="text-center col-6 col-sm-6 col-md-6 mt-4 mt-md-0">
        <img class="mx-auto d-block w-100 rounded border border-danger" style="border-width: 3px !important; width: 100%;" src="/assets/gif/VIPER/uncertainty_dmc_bad.gif"/>
    </div>
    <div class="text-center col-6 col-sm-6 col-md-6 mt-4 mt-md-0">
        <img class="mx-auto d-block w-100 rounded border border-success" style="border-width: 3px !important; width: 100%;" src="/assets/gif/VIPER/uncertainty_dmc_good.gif"/>
    </div>
</div>
<figcaption class="figure-caption text-center">Upsampled VQCode conditional log probabilities for low return trajectories (left) and expert trajectories (right). Visualizations correspond to RLBench (top) and DeepMind Control (bottom). RLBench uses 16X16 VQCodes while DMC uses 8X8. Brighther colors correspond to higher log probabilities.</figcaption>
</figure>

## Acknowledgements
This work was supported in part by an NSF Fellowship, NSF NRI #2024675, ONR MURI N00014-22-1-2773, Komatsu, and the Vanier Canada Graduate Scholarship. We also thank Google TPU Research Cloud for providing compute resources.
