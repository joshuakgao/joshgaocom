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
          game running. Everything below is a &ldquo;dream&rdquo;: a neural
          network hallucinating each frame from its own imagination, following
          the recipe from Ha &amp; Schmidhuber&rsquo;s{" "}
          <em>World Models</em>. A tiny controller flies the bird inside that
          dream. Press <strong>Space</strong> (or tap the frame) and{" "}
          <strong>you</strong> take the stick.
        </P>
      </PostContent>

      <PostContent className="items-center">
        <FlappyWorldDemo basePath={assetsPath} />
      </PostContent>

      <PostContent>
        <H2>How it works</H2>
        <P>
          Three small networks, all frozen and exported to ONNX, run entirely in
          your browser with onnxruntime-web:
        </P>
        <P>
          <strong>V — Vision (a VAE).</strong> A convolutional variational
          autoencoder compresses each 72×128 frame into a 32-number latent code{" "}
          <em>z</em>. Its decoder turns any latent back into a frame — that
          decoder is what paints every image you see above.
        </P>
        <P>
          <strong>M — Memory (an MDN-RNN).</strong> An LSTM with a
          mixture-density head takes the current latent and action and predicts a{" "}
          <em>distribution</em> over the next latent, plus how likely the run is
          to end. Rolling it forward — decoding each predicted latent with the
          VAE — is the dream. It never touches a real game; the physics of pipes
          and gravity live entirely in its weights.
        </P>
        <P>
          <strong>C — Controller.</strong> A small MLP that maps{" "}
          <em>(latent, memory)</em> to an action. It was trained by evolution
          strategies to survive as long as possible — crucially, trained{" "}
          <em>inside the dream</em>, never on the real environment.
        </P>
        <P>
          Each tick the loop is: decode <em>z</em> to the frame you see → the
          controller (or your Space bar) picks flap / no-flap → the MDN-RNN folds
          that action into its memory and imagines the next latent. When the
          model&rsquo;s own predicted crash probability crosses a threshold, the
          dream ends and a fresh one is seeded from a real starting frame. Your
          flap and the controller&rsquo;s share the same stick, so you&rsquo;re
          steering the policy through its own hallucination.
        </P>
      </PostContent>
    </PostWrapper>
  );
}
