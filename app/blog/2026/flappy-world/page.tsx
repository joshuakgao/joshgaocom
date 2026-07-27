"use client";

import { getPostMetadata } from "@/components/content";
import { H2, P, PostContent, PostWrapper } from "@/components/ui";
import FlappyWorldDemo from "./FlappyWorldDemo";

export default function FlappyWorld() {
  const { assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostContent>
        <P>
          This is a <em>World Model</em> playing Flappy Bird — but there is no
          game running. Everything below is a &ldquo;dream&rdquo;: a{" "}
          <strong>DreamerV3</strong> world model hallucinating each frame from
          its own imagination. A learned actor flies the bird inside that dream.
          Press <strong>Space</strong> (or tap the frame) and <strong>you</strong>{" "}
          take the stick.
        </P>
      </PostContent>

      <PostContent className="items-center">
        <FlappyWorldDemo basePath={assetsPath} />
      </PostContent>

      <PostContent>
        <H2>How it works</H2>
        <P>
          Unlike the two-stage World Models recipe (a VAE, then a separate
          memory RNN), DreamerV3 learns one <em>joint</em> world model end to
          end — a Recurrent State-Space Model (RSSM). Its latent state at each
          step splits in two: a <strong>deterministic</strong> part{" "}
          <em>h</em> (a GRU carrying history) and a <strong>stochastic</strong>{" "}
          part <em>z</em> — here 32 independent 32-way categoricals, sampled
          fresh each step. Everything below runs frozen and exported to ONNX,
          entirely in your browser with onnxruntime-web.
        </P>
        <P>
          <strong>The RSSM (dynamics).</strong> A GRU folds the previous
          stochastic state and your action into <em>h</em>, and a{" "}
          <em>prior</em> network predicts the distribution over the next{" "}
          <em>z</em> from history <em>alone</em> — no observation needed. Rolling
          that prior forward is the dream. During training a{" "}
          <em>posterior</em> that also sees the real frame is pulled toward the
          prior (a KL term), so the prior alone becomes a competent forward model
          of pipes and gravity.
        </P>
        <P>
          <strong>The decoder + heads.</strong> From the combined feature{" "}
          <em>[h, z]</em>, a convolutional decoder reconstructs the frame you
          see, while reward and continue heads predict the expected reward and
          the probability the episode keeps going. That continue probability is
          what ends a dream when it drops.
        </P>
        <P>
          <strong>The actor.</strong> A small policy mapping <em>[h, z]</em> to
          an action, trained <em>entirely</em> on trajectories the world model
          imagines — never on the real environment.
        </P>
        <P>
          Each tick the loop is: decode <em>[h, z]</em> to the frame you see →
          the actor (or your Space bar) picks flap / no-flap → the RSSM advances
          its GRU and samples the next <em>z</em>. When the continue head&rsquo;s
          probability crosses a threshold, the dream ends and a fresh one is
          seeded from a real starting state. Your flap and the actor&rsquo;s
          share the same stick, so you&rsquo;re steering the policy through its
          own hallucination.
        </P>
      </PostContent>
    </PostWrapper>
  );
}
