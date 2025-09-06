"use client";

import { getPostMetadata } from "@/components/content";
import {
  H1,
  P,
  PostAbstract,
  PostContent,
  PostImg,
  PostLink,
  PostWrapper,
} from "@/components/ui";
import { Button } from "@/components/ui/button";

export default function GptNano() {
  const { year, slug, assetsPath, post } = getPostMetadata();

  return (
    <PostWrapper post={post}>
      <PostContent>
        <P>
          Inspired by{" "}
          <PostLink href="https://www.youtube.com/watch?v=l8pRSuU81PU">
            Andrej Karpathy's video
          </PostLink>
          , I recreated{" "}
          <PostLink href="https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf">
            GPT-2
          </PostLink>{" "}
          and achieved performance that surpasses the original model. We then
          scrape Wikipedia for Civil Engineering-related articles to fine-tune
          the model, resulting in a specialized GPT-Nano that generates
          high-quality text in this domain.
        </P>
        <H1>Pre-train Dataset: Fine Web-Edu</H1>
        <P>
          OpenAI's GPT-2 was trained on the WebText dataset. This was created by
          scraping all outbound links from Reddit with at least 3 karma. The
          text was extracted from the HTML responses.
        </P>
        <P>
          <PostLink href="https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu">
            Fine Web-Edu
          </PostLink>{" "}
          dataset is a corpus of 1.3T high-quality tokens from educational web
          pages filtered from FineWeb dataset. This dataset is generally
          perceived as a higher-quality dataset than the WebText dataset.
        </P>
        <P>To train GPT-Nano, we use the 10B token subset of Fine Web-Edu.</P>
        <H1>Evaluation Dataset: HellaSwag</H1>
        <P>
          To evaluate the how "human-like" our GPT-Nano model is, we use the{" "}
          <PostLink href="https://arxiv.org/pdf/1905.07830">HellaSwag</PostLink>{" "}
          dataset. This dataset consists of 70k multiple choice questions that
          are easy for humans (95.6% accuracy), but difficult for language
          models (29.55% accuracy for GPT-2).
        </P>
        <H1>Training Run Results</H1>
      </PostContent>
      <PostContent size="max-w-7xl">
        <PostImg
          alt="Training run results for GPT-Nano"
          src="/assets/projects/2024/gpt-nano/results.png"
        />
      </PostContent>
      <PostContent>
        <P>
          The left figure is the Loss curve, and the right figure is the
          Accuracy curve on the HellaSwag dataset. The model achieves a final
          accuracy of 30.2%, which is significantly better than GPT-2's 29.55%,
          but not better than GPT-3's 33.8%.
        </P>
        <P>
          This is impressive given that GPT-Nano uses the same architecture as
          GPT-2, but was trained on a much smaller number of tokens (10B vs 100B
          tokens).
        </P>
        <H1>Qualitative</H1>
        <PostImg
          alt="GPT-Nano qualitative results"
          src="/assets/projects/2024/gpt-nano/pre-train-qualitative.png"
        />
        <P>
          GPT-Nano does give a better response than GPT-2 to the prompt: "The
          meaning of life is:".
        </P>
        <H1>Civil Engineering Finetune</H1>
        <P>
          We scrape Wikipedia for all Civil Engineering-related articles to
          fine-tune the model by using the python{" "}
          <PostLink href="https://wikipedia-api.readthedocs.io/en/latest/">
            wikipedia-api
          </PostLink>{" "}
          package. We use the category "Civil engineering" and all its
          subcategories with a depth of 2 to get a list of relevant articles to
          extract text from.
        </P>
        <PostImg
          alt="Civil Engineering finetune qualitative results"
          src="/assets/projects/2024/gpt-nano/finetune-qualitative.png"
        />
        <P>
          Neither GPT-2 nor GPT-Nano were able to correctly identify what
          Abram's Law is. However, GPT-Nano's response is much more relevant to
          Civil Engineering while GPT-2's response is completely irrelevant.
        </P>
      </PostContent>
    </PostWrapper>
  );
}
