"use client";

import { getPostMetadata } from "@/components/content";
import {
  H1,
  H2,
  MultilineCode,
  P,
  PostContent,
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
        <H1>Overview</H1>
        <P>
          Model-free reinforcement learning agents learn a policy directly from
          environment interaction: they never build an explicit notion of what
          the game <em>is</em>, only of what to do next. A world model inverts
          that. It first learns the dynamics of the environment — given the
          current state and an action, what does the next frame look like, what
          reward arrives, does the episode end — and then trains a policy
          entirely inside that learned simulator, without touching the real game
          again.
        </P>
        <P>
          The question I wanted to answer is whether that indirection pays for
          itself. Learning a simulator is strictly harder than learning a
          policy, and any error in the simulator is an error the policy is free
          to exploit. So I trained four agents on Flappy Bird: tabular
          Q-Learning, DQN, PPO, and a DreamerV3 world model whose actor is
          trained only in imagination. Every agent gets the same budget of{" "}
          <strong>100 million environment steps</strong> and roughly the same
          capacity, <strong>~1.2M parameters</strong>, so the comparison is
          about how the experience is used rather than how much of it there is.
        </P>
        <P>
          The ordering is clean and matches the amount of structure each method
          imposes on the problem: Q-Learning &lt; DQN &lt; PPO &lt; DreamerV3.
          The world model wins, and it wins despite paying a tax the baselines
          do not — a large fraction of its step budget is spent collecting
          rollouts that are then discarded.
        </P>

        <H1>Method</H1>

        <H2>Environment</H2>
        <P>
          Flappy Bird is a two-action game (<InlineMath math="\text{flap}" /> or{" "}
          <InlineMath math="\text{noop}" />) with a deceptively unforgiving
          reward landscape: the agent must commit to an action every frame, and
          almost every mistake is terminal. The environment exposes the game
          state directly as a normalized vector — the bird&apos;s height,
          velocity, and rotation, plus the geometry of the three upcoming pipes
          — alongside the rendered frame. Reward is <InlineMath math="+1" /> per
          pipe cleared. The baselines consume the state vector; the world model
          learns to predict pixels, which is why the demo above can render a
          game that does not exist.
        </P>

        <H2>Baselines</H2>
        <P>
          <strong>Q-Learning</strong> discretizes the continuous state into bins
          and maintains a table of action values, updated with the standard
          temporal-difference rule. The table is sized to match the ~1.2M
          parameter budget of the neural agents. It is the weakest of the four
          for the reason you would expect: binning throws away the geometry of
          the state space, so nothing learned in one bin transfers to its
          neighbours, and the tail of rarely-visited states never gets enough
          visits to converge.
        </P>
        <P>
          <strong>DQN</strong> replaces the table with a network, which restores
          generalization across nearby states, and adds a replay buffer and a
          target network to stabilize bootstrapping. It clears the tabular agent
          comfortably, but it inherits the usual off-policy pathologies: value
          overestimation, and a replay distribution that drifts away from the
          states the current policy actually visits.
        </P>
        <P>
          <strong>PPO</strong> optimizes the policy directly with a clipped
          surrogate objective and a learned value baseline. Being on-policy, it
          never trains on stale experience, and the clipping keeps each update
          from destroying a policy that took millions of steps to find. It is
          the strongest model-free baseline here, and it doubles as a component
          of the world model pipeline — the trained PPO agent is what makes
          rollout collection tractable.
        </P>

        <H2>Collecting a behaviourally diverse dataset</H2>
        <P>
          A world model learns dynamics from whatever it is shown, so the
          dataset has to span the state space the agent will actually meet:
          crashes into the top pipe, crashes into the bottom pipe, crashes into
          the ground, and long clean glides. Sampling games from a single policy
          gives many near-duplicates of its favourite trajectory and almost
          nothing from the rare states. If the model has never seen a bird
          descending fast toward the ground, it will happily hallucinate that
          the bird floats.
        </P>
        <P>
          I fix this with rollout-level <strong>novelty search</strong>:
          generate far more games than you keep, and retain only the ones that
          fly differently from everything kept so far. The result is a set of
          100k rollouts that covers the behaviour space rather than the
          behaviour <em>mode</em>.
        </P>
        <P>
          <strong>Generating a candidate.</strong> Each step is drawn from a
          mixture of two policies: with probability <InlineMath math="q" /> the
          trained PPO agent picks the action (sampled, not greedy), otherwise the
          bird flaps with probability <InlineMath math="p_{\text{flap}}" />. That
          flap probability is resampled per candidate from a range, which is what
          makes a single pool behaviourally varied. <InlineMath math="q" /> starts
          each round at a value ramped linearly from 0 on the first round to 1 on
          the last, so collection begins with near-random flailing and ends
          near-on-policy, and the dataset covers both regimes. Within a rollout,
          every step carries a small chance of setting <InlineMath math="q = 0" />{" "}
          permanently, which yields games that start competent and then fall
          apart — the recoveries and crashes a purely on-policy agent almost
          never visits.
        </P>
        <P>
          <strong>Describing a behaviour.</strong> A rollout&apos;s descriptor is
          its last <InlineMath math="k" /> state observations, flattened.
          Trailing rather than whole-trajectory, so games of different lengths
          stay comparable and the descriptor captures how a rollout <em>ended</em>{" "}
          — which is where the interesting dynamics live. Because the environment
          exposes normalized game state directly, no encoder is needed, and
          unlike a raw frame the descriptor carries none of the uncontrollable
          horizontal scroll. Rollouts shorter than <InlineMath math="k" /> steps
          are left-padded with their first state so all descriptors stack.
        </P>
        <P>
          <strong>Selecting.</strong> Each round plays a pool of candidates and
          keeps a handful by greedy farthest-point selection: repeatedly save the
          candidate whose descriptor is furthest from its <em>nearest</em>{" "}
          neighbour in the archive, then add it to the archive so the next pick
          must differ from it too. Novelty is nearest-neighbour distance rather
          than an average, so a candidate counts as novel only if it is unlike{" "}
          <em>every</em> saved rollout. The first pick faces an empty archive
          (novelty <InlineMath math="+\infty" />) and is therefore arbitrary;
          every pick after it maximizes the minimum distance to what is already
          kept. Selection is greedy and confined to the current pool, so it
          approximates a spread-out set rather than optimizing one globally.
        </P>
        <P>
          <strong>Cost.</strong> Only a fraction of every pool is saved, so
          collection spends roughly 4&times; the environment frames it stores at
          the default settings. Those discarded frames are real experience, and I
          charge all of them to the world model agent — including the frames
          spent training the PPO policy that assists collection. This matters for
          the comparison below: the DreamerV3 actor is not getting 100M steps of
          clean data plus a free teacher. Its 100M step budget covers the PPO
          run, the discarded candidates, and the kept rollouts combined.
        </P>
        <P>
          <strong>Splitting.</strong> Whole rollouts are assigned to train or
          validation, spread evenly across the novelty-ordered stream, rather
          than splitting sliding windows downstream. Splitting at the window
          level would put windows from the same game in both sets and leak
          training frames into validation. Both splits draw from the same
          archive, so validation is as behaviourally diverse as training. Each
          saved rollout carries one extra post-terminal frame so the final
          transition has a valid <InlineMath math="\text{next state}" />.
        </P>

        <H2>The world model</H2>
        <P>
          The world model is a{" "}
          <PostLink href="https://arxiv.org/abs/2301.04104">DreamerV3</PostLink>{" "}
          recurrent state-space model (RSSM). Each latent state is the
          concatenation of a deterministic GRU state, which carries memory across
          time, and a stochastic state drawn from a set of categorical
          distributions, which absorbs the parts of the next frame that are not
          predictable from the past. Several heads read off that latent: a
          convolutional decoder that reconstructs the frame, a reward predictor,
          a continue predictor for termination, and the dynamics predictor that
          lets the model roll forward without observations at all.
        </P>
        <MultilineCode>
          <Small># one imagination step, no environment involved</Small>
          <Small>h_t = GRU(h_t-1, z_t-1, a_t-1) # deterministic state</Small>
          <Small>z_t ~ Categorical(prior(h_t)) # stochastic state</Small>
          <Small>feat = [h_t, flatten(z_t)]</Small>
          <Small>a_t = actor(feat); r_t = reward(feat)</Small>
          <Small>frame = decoder(feat) # only needed to look at</Small>
        </MultilineCode>
        <P>
          Once the model is trained, the actor and critic never see the real
          game. They are optimized on imagined trajectories rolled out from
          latent states, with the critic bootstrapping value estimates through
          the model&apos;s own predicted rewards and continue flags. The demo at
          the top of this page is exactly that loop running in your browser: the
          decoder is drawing frames from the latent state, the actor is choosing
          actions from the same latent state, and the episode ends when the
          continue head decides it has crashed. Your spacebar simply overrides
          the actor&apos;s action for that frame.
        </P>

        <H1>Experiments</H1>
        <P>
          Each agent is trained for 100M environment steps and evaluated over
          [TODO: N] episodes in the real game. Score is pipes cleared; I report
          the mean and the best episode.
        </P>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-medium">Agent</th>
                <th className="text-left py-2 pr-4 font-medium">Params</th>
                <th className="text-left py-2 pr-4 font-medium">Mean score</th>
                <th className="text-left py-2 font-medium">Best score</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4">Q-Learning</td>
                <td className="py-2 pr-4">~1.2M</td>
                <td className="py-2 pr-4">TODO</td>
                <td className="py-2">TODO</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">DQN</td>
                <td className="py-2 pr-4">~1.2M</td>
                <td className="py-2 pr-4">TODO</td>
                <td className="py-2">TODO</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">PPO</td>
                <td className="py-2 pr-4">~1.2M</td>
                <td className="py-2 pr-4">TODO</td>
                <td className="py-2">TODO</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">DreamerV3</td>
                <td className="py-2 pr-4">~1.2M</td>
                <td className="py-2 pr-4 font-medium">TODO</td>
                <td className="py-2 font-medium">TODO</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* TODO: learning curves (score vs env steps, all four agents)
        <PostImg
          src={`${assetsPath}/learning_curves.webp`}
          alt="Learning curves"
        /> */}
        <P>
          [TODO: tie these numbers to the discussion once they are final.] The
          ranking is Q-Learning &lt; DQN &lt; PPO &lt; DreamerV3, and each step
          of that ladder corresponds to removing a specific limitation.
          Q-Learning is capped by discretization: it cannot generalize between
          adjacent bins, so much of its 100M steps is spent re-learning the same
          physics at slightly different heights. DQN recovers that generalization
          and immediately improves, but its off-policy targets and drifting
          replay distribution make the last stretch of learning slow and
          unstable. PPO removes the distribution mismatch entirely and gets the
          most out of pure model-free learning.
        </P>
        <P>
          DreamerV3 beats PPO because it extracts more from each frame. A
          model-free agent uses a transition once, to nudge a value estimate or a
          policy gradient; the world model uses it to improve a model of the
          game, and that model can then be replayed millions of times at no
          environmental cost. Imagination also decouples policy improvement from
          the danger of the real environment — the actor can crash arbitrarily
          often in the dream while it works out the flap timing, and it gets to
          practice on exactly the rare states novelty search went looking for.
          The world model agent&apos;s effective experience ends up far larger
          than its 100M step budget, which is the trade the extra machinery is
          supposed to buy.
        </P>

        <H1>Limitations</H1>
        <P>
          The world model is only as good as its dataset, and the dataset here
          depends on a PPO policy that has to be trained first. Novelty search
          widens the distribution considerably, but it widens it around a seed
          policy; a genuinely from-scratch collection scheme would be a stronger
          result. The behaviour descriptor is also hand-chosen: trailing state
          observations work well for Flappy Bird because the state is
          low-dimensional and interpretable, but this does not obviously transfer
          to environments where the interesting variation is not in the last few
          frames.
        </P>
        <P>
          Flappy Bird is also a friendly case for learned dynamics. The physics
          are deterministic, the state is small, and episodes are short, so the
          model can be accurate enough that the actor&apos;s exploits of it stay
          harmless. Longer-horizon environments with stochastic dynamics give the
          actor much more room to find and exploit places where the dream
          diverges from reality. Finally, the comparison holds parameters and
          environment steps fixed but not wall-clock or FLOPs; DreamerV3 does
          substantially more computation per environment step than PPO does.
        </P>

        <H1>Conclusion</H1>
        <P>
          With parameter count and environment interaction held fixed, learning a
          policy inside a learned simulator beats learning it in the real
          environment — even after charging the world model for every frame it
          threw away during collection. The ordering Q-Learning &lt; DQN &lt; PPO
          &lt; DreamerV3 tracks how much structure each method extracts from a
          transition, and the world model extracts the most: it turns a finite
          stream of experience into an unbounded one. The demo at the top of this
          page is the clearest statement of that claim I can make. There is no
          game there. There is a network that learned what the game is, and an
          actor that learned to play it without ever seeing the real thing.
        </P>
      </PostContent>
    </PostWrapper>
  );
}
