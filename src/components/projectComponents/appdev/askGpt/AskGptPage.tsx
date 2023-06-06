import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { AskGptCard } from "./AskGptCard";

export function AskGptPage() {
  return (
    <ScrollDiv>
      <AskGptCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="6/4/2023"
          skills={["react", "typescript", "firebase", "figma"]}
          projectComponents="Mobile Application Integration with Chat-GPT"
        />
        <h2>Introduction</h2>
        <p>
          On November 30, 2022, OpenAI released their groundbreaking ChatGPT.
          Widely regarded as the biggest improvement in AI technology, it could
          code complete applications with a simple prompt, significantly aid
          students in writing essays, and even create art such as poems and
          short stories on any topic. However, I noticed a gap: Why wasn't there
          a mobile app for ChatGPT? Surely, it's much easier to ask a question
          on your mobile phone than to open up your computer and use the
          website. Thus, the mobile app "Ask GPT" was born.
        </p>
        <h2>Strategy & Design</h2>
        <p>
          My strategy to differentiate my mobile app from others was to emulate
          the design choices of the original website as closely as possible. I
          aimed to copy their colors, create a similar logo, use matching fonts,
          and even replicate authentication screens. This way, I would
          potentially be seen as the "official" mobile app version. I mocked
          this up using Figma.
        </p>
        <h2>Code</h2>
        <p>
          I implemented the app using React Native, a JavaScript framework that
          allows building iOS and Android mobile applications with just one set
          of code. AskGPT consists of three main components: the UI, the
          connection with the OpenAI API, and the Stripe integration.
        </p>
        <h3>UI</h3>
        <p>
          The UI was relatively simple to put together. I decided to avoid fancy
          animations or overly complex components.
        </p>
        <h3>OpenAI API</h3>
        <p>
          To enable users to interact with ChatGPT, we needed to utilize
          OpenAI's API, which provides responses to specific prompts using the
          GPT-3.5 model. Calling this API was straightforward, but streaming the
          response posed challenges. If you simply called the API, it would take
          2 to 10 seconds to generate the response, which would then be
          displayed all at once. However, I wanted to stream the response in
          real-time, minimizing delay. To achieve this, I searched for a
          Server-Side Event package capable of handling OpenAI's server events.
          After extensive searching, I finally found "react-native-sse" and
          managed to implement it successfully.
        </p>
        <h3>Stripe Payments</h3>
        <p>
          My intention wasn't to create AskGPT for free; I wanted to monetize
          it. I researched the pricing of similar mobile apps and settled on a
          $7.99 per month subscription fee. OpenAI's API was incredibly
          inexpensive per call, and I estimated that the average user wouldn't
          utilize $7.99 worth of API calls each month. I set up my Stripe server
          using a custom domain and hosted it on Ngrok, allowing me to process
          payments.
        </p>
        <h3>Publishing</h3>
        <p>
          However, disaster struck. When I began developing the app, I knew it
          was only a matter of time before OpenAI would release their own mobile
          app, effectively rendering mine obsolete and jeopardizing my revenue
          streams. I needed to act quickly. Just as I was about to publish the
          app to the app stores, the day of reckoning arrived. OpenAI released
          their app, forcing me to accept that I had wasted three months of work
          during my free time.
        </p>
        <p>
          Nevertheless, I will still publish the app to be able to say that I
          completed my project and to learn the end-to-end process of mobile app
          creation. However, I do wish OpenAI would have taken their time.
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
