import React from "react";
import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
  YoutubeEmbed,
} from "../../../commonComponents";
import { RedditLaughsCard } from "./redditLaughsCard";

export function RedditLaughsPage() {
  return (
    <ScrollDiv>
      <RedditLaughsCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="6/13/2022"
          projectComponents="Reddit API Scraping - Python Video Editing"
          sources={{
            github: "https://github.com/tugonbob/RedditLaughs",
            youtube: "https://youtu.be/suo1BnijcpE",
          }}
          skills={["python"]}
        />
        <h2>Introduction</h2>
        <p>
          With this project, I wanted to answer an essential question: can I be
          a huge Youtuber without any of the work? Can I get millions of views
          and subscribers through automating the Youtuber processes with some
          carefully created cleverness? Youtubers today are at the whims of the
          Youtube algorithm, which pressures creators to be constantly pumping
          out entertaining videos, driving many Youtubers into creative burnout.
          I'm going to be exploring the idea of curating entertaining content on
          the internet and using a consistent video format to provide to
          Youtube. To do this, I scraped Reddit meme content and some scripted
          video editing to create effortless meme video compilations.
        </p>
        <h2>Reddit Content Scraping</h2>
        <p>
          Step 1: Get content. I needed at least 10 minutes of content to
          satisfy the Youtube algorithm overlords, as well as funny or
          interesting short form videos. Unfortunately, still image memes
          wouldn't be ideal here since they would require some text to speech
          and maybe even hiding parts of the meme so as to not ruin the
          punchline. All items that would require manual editing. And who
          actually wants to do work?
        </p>
        <p>
          To achieve this, I used the Praw {"("}Python Reddit API Wrapper{") "}
          python package, and targeted the top posts of the week in the
          r/perfectlycutscreams subreddit. This content was perfect since all
          posts would be videos and all would "hopefully" generate some sort of
          laugh or unexpectedness.
        </p>
        <h2>Python Video Editing</h2>
        <p>
          After I gathered my content, I needed to put them together to create
          the full meme compilation video. There is this handy dandy python
          package called MoviePy. Perfect for automating video editing. Using
          the package, I simply made a bunch of video appends and slapped a
          "like and subscribe" animation to the beginning of the video. And just
          like that, a freshly minted Youtube video was born and ready to be
          uploaded.
        </p>
        <h2>Other Thoughts</h2>
        <p>
          I could have taken the automation process to its fullest extent by
          automatically running the script on every Monday and posting the video
          through the Youtube API. However, I decided against this because it
          would give me time to review the video for any nsfw content that the
          depths of Reddit can manufacture.
        </p>
        <h2>Demonstration</h2>
        <p style={{ marginBottom: 32 }}>
          Here, I show the process of creating a 60 second "perfectly cut
          screams" video compilation. However, you can define your required
          video length to be as long or short as you want, as well as which
          subreddits to scrape from. This is all defined in the
          "SelectedSubreddits.csv" file.
        </p>
        <YoutubeEmbed embedId="suo1BnijcpE" />
        <h2>Results</h2>
        <p>
          Even though this idea shows a lot of promise, it still requires a lot
          more sophistication in its automation or simply more manual effort
          from a human. There were issues like inconsistent video quality,
          boring video clips, and even nsfw submissions as mentioned before.
          Both of the latter items would require its own challenging machine
          learning algorithms to classify all the videos accurately and
          automatically. However, I am sure that I am not the first to think of
          this idea, and Youtube channels that are heavily automated in a
          similar fashion definitely exist, but also have a huge advantage in
          producing consistent and entertaining content for the Youtube
          audience.
        </p>
        <p>
          Also, I figured out that borrowed content like this can't be monetized
          on Youtube anyways. Dang...
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
