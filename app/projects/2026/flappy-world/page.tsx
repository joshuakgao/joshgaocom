"use client";

import { getPostMetadata } from "@/components/content";
import {
  H1,
  H2,
  H3,
  MultilineCode,
  P,
  PostContent,
  PostImg,
  PostLink,
  PostWrapper,
  Small,
} from "@/components/ui";
import { InlineMath } from "react-katex";
import FlappyWorldDemo from "./FlappyWorldDemo";

export default function FlappyWorld() {
  const { assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostContent className="items-center">
        <H2>World Model Interactive Demo</H2>
        <FlappyWorldDemo basePath={assetsPath} />
      </PostContent>

      <PostContent>
        <H1>Overview</H1>
        <P>
          Research interest in world models has exploded in recent years driven
          by their potential to enable scalable training of robotics. A world
          model that can accurately represent the environment and predict its
          future state given an action could allow robots to learn and refine
          policies within an imagined world, reducing the need for costly
          deployment and potentially unsafe real-world interaction. We explore
          how to train a{" "}
          <PostLink href="https://arxiv.org/abs/2301.04104">DreamerV3</PostLink>{" "}
          world model and policy through the lens of Flappy Birds.
        </P>
        <H1>Flappy Birds Environment</H1>
        <P>
          We chose Flappy Birds as our environment because of its minimal action
          set (flap, no-flap) and relatively simple objective (avoid the pipes
          for as long as possible). However, the game is deceptively unforgiving
          to play - as I have never reached a score above 20 😥.{" "}
          <span className="font-bold">
            Every agent is trained on only visual input (pixels) and do not have
            access to the game's internal states.{" "}
          </span>
          We downsample the number of pixels from 512x288 to 128x72 - a 4x
          compression rate. We reward the agent +1.0 for successfully passing a
          pipe, +0.1 every frame it stays alive, -1.0 for dying, and -0.5 each
          frame it touches the top of the screen.
        </P>
        <H1>Collecting a Behaviourally Diverse Dataset</H1>
        <P>
          Collecting a behvaiourally diverse dataset is more challenging than
          naively collecting rollouts with random actions. A 50% flap
          probability seems reasonable, but you quickly realize that a flap
          action at approximately every other step quickly launches the bird
          into the top of the screen. Even if you considerably lower the flap
          probability, the large majority of rollouts will only include the bird
          dying on the first pipe. When core of Flappy Birds gameplay is after
          the first pipe, the world model will need much deeper runs to
          accurately model the game.
        </P>
        <P>
          We solve this by relying on a pre-trained PPO policy to collect longer
          rollouts. However, rollouts that are 100% guided by the PPO policy
          only would represent "correct" gameplay. In order for the world model
          to fully model the environment, it needs rollouts with a degree of
          randomness in actions and death reasons. We need rollouts that spam
          the flap action, and rollouts that don't flap at all. We need rollouts
          that hit the first set of pipes at different locations, and we need
          deep runs. We need rollouts that die on the bottom pipe and rollouts
          that die on the top pipe. How can we represent all of this in dataset?
        </P>
        <P>
          To do this, we 1. induce various level of randomness and 2. treat the
          internal game state representation as an embedding vector.
        </P>
        <P>
          We randomly select a flap probability between 0% and 6%. We decided
          this range by collecting rollouts and found that there was
          approximately the same number of rollouts where the bird died on the
          top pipe vs the bottom pipe. Next, we define the probability that we
          use the pre-trained PPO at each step as "q". The first rollout
          collected will have a q of 0%. q will then be linearly increased to
          100% as more rollouts are collected. This enables a reasonable
          distribution of short rollouts vs long rollouts. Additionally, we drop
          q to 0% at a chance of 1% each step to encourage more diverse deaths
          at the extremes of death heights (getting as high as possible between
          two pipes, hitting the ground between two pipes).
        </P>
        <P>
          At each rollout collection step, we fire up a pool of 64 playthroughs
          and keep 16 of the most novel rollouts compared to all of the
          collected ones. We create a "behavior descriptor" of each rollout by
          collecting the normalized internal state vectors of the last 50 steps
          of the rollout. We take the last 50 steps, because it represents how
          the bird died which is the most important part for the world model to
          represent. With the behavior descriptors, we can treat them as rollout
          embeddings, and calculate a similarity score between the rollout, and
          all other already collected rollouts. The rollout in the pool that is
          the most dis-similar is the most behaviorly diverse.
        </P>
        <P>
          <span className="font-bold">
            To train DreamerV3, we collect 10,000 rollouts.
          </span>{" "}
          We show the histogram of rollout death height as well as rollout
          length. These histograms show we have a behaviourly diverse dataset of
          death heights, and rollout lenghts.
        </P>
        <PostImg
          src={`${assetsPath}/rollout_death_height_hist.webp`}
          alt="Rollout death height histogram"
        />
        <PostImg
          src={`${assetsPath}/rollout_length_hist.webp`}
          alt="Rollout length histogram"
        />
        <H1>DreamerV3</H1>
        <P>
          We follow the implementation of DreamerV3. For more detailed
          information, please refer to{" "}
          <PostLink href="https://arxiv.org/abs/2301.04104">
            their paper
          </PostLink>
          . We provide a figure below from the paper as convenient overview of
          DreamerV3.
        </P>
        <PostImg
          src={`${assetsPath}/dreamerv3.webp`}
          alt="DreamerV3 training"
        />
        <P>
          Hopefully, I can distil how DreamerV3 works into a simplified summary.
          Again, please refer to{" "}
          <PostLink href="https://arxiv.org/abs/2301.04104">
            their paper
          </PostLink>{" "}
          for more information. DreamerV3 has two components, the world model
          and the behavior components. The world model can be simply understood
          as an{" "}
          <PostLink href="https://en.wikipedia.org/wiki/Recurrent_neural_network">
            RNN
          </PostLink>{" "}
          attached to an encoder and decorder of a latent representation (z).
          The latent (z), recurrent state (h), and action (a) are provided to
          the world model to predict the latent state of the next state. This
          predicted latent state can be decoded into an image that looks like a
          "dream". The behavior component uses an{" "}
          <PostLink href="https://en.wikipedia.org/wiki/Actor-critic_algorithm">
            actor critic model
          </PostLink>{" "}
          to predict the action that should be taken, and reward given for that
          action, as well as the next latent state.
        </P>
        <H1>Experiments</H1>
        <H2>Baselines</H2>
        <P>
          We compare against the popular reinforcement learning baselines{" "}
          <PostLink href="https://en.wikipedia.org/wiki/Q-learning">
            Q-Learning
          </PostLink>
          , <PostLink href="https://arxiv.org/abs/1312.5602">DQN</PostLink>, and{" "}
          <PostLink href="https://en.wikipedia.org/wiki/Proximal_policy_optimization">
            PPO
          </PostLink>
          .
        </P>
        <H2>Training & Results</H2>
        <P>
          We train a 12M parameter DreamerV3 world model for 20 epochs on our
          rollout dataset. For fair comparison, we train 1M parameter models for
          each method for 1 million real environment frames, with a learning
          rate of 1e-4 and a batch size of 16.
        </P>
        <P>
          We generate a 32 val seeds and 100 test seeds. We use the 32 val seeds
          during training to select the best checkpoints by highest mean score,
          and we use the test seeds to do final evaluation of those best
          checkpoints. We collect the mean, median, min, and max scores as well
          as the standard deviations, and provide the histogram of scores in the
          figures below.
        </P>
        <H1>---Result figures here plz</H1>
        <P>
          DreamerV3 beats other baseline methods because it extracts more from
          each frame. A model-free agent uses a transition once, to nudge a
          value estimate or a policy gradient. The world model uses it to
          improve a model of the game, and that model can then be replayed
          millions of times at no environmental cost. Imagination also decouples
          policy improvement from the danger of the real environment and the
          actor can crash arbitrarily often in the dream while it works out the
          flap timing, and it gets to practice on exactly the rare states
          novelty search went looking for. The world model agent's effective
          experience ends up far larger than its 100M step budget, which is the
          trade the extra machinery is supposed to buy.
        </P>
        <H1>Conclusion</H1>
        <P>
          We show that training on latent representations is not only viable but
          may also be superior to training directly in the environment. I
          believe world models are well deserving of the excitement surrounding
          them and have tremendous potential for advancing robotics. I hope to
          explore world models further in my future research.
        </P>
        <H2>Acknowledgements</H2>
        <P>
          I'd like to thank the creators of{" "}
          <PostLink href="https://github.com/markub3327/flappy-bird-gymnasium">
            flappy-world-gymnasium
          </PostLink>{" "}
          and especially the authors of{" "}
          <PostLink href="https://arxiv.org/abs/2301.04104">
            DreamerV3 paper
          </PostLink>
          . This project would not have been possible without their incredible
          work.
        </P>
      </PostContent>
    </PostWrapper>
  );
}
