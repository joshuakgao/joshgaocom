import React from "react";
import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { RedditLaughsCard } from "./redditLaughsCard";

export function RedditLaughsPage() {
  return (
    <ScrollDiv>
      <RedditLaughsCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="6/13/2022"
          components="Reddit API Scraping - Python Video Editing"
        />
        <h2>Introduction</h2>
        <p>
          With this project, I wanted to answer an essential question: can I be
          a huge youtuber without any of the work? Can I get millions of views
          and subscribers through automating the youtuber processes with some
          carefully created cleverness? Youtubers today are at the whims of the
          Youtube algorithm, which pressures creators to be constantly pumping
          out entertaing videos, driving many Youtubers into creative burnout.
          I'm going to be exploring the idea of curating entertaining content on
          the internet and using a consistent video format to provide to
          youtube. To do this, I scraped Reddit meme content and some scripted
          video editing to create effortless meme video compliations.
        </p>
        <h2>Reddit Content Scraping</h2>
        <p>
          Step 1: Get content. I needed at least 10 minutes of content to
          satisfy the Youtube algorithm overlords, as well as funny or
          interesting short form videos. Unfortunately, still image memes
          wouldn't be ideal here since they would require some text to speech
          and maybe even hiding parts of the meme as to not ruin the punchline.
          All items that would require manual editing. And who wants actually to
          do work?
        </p>
        <p>
          To achieve this, I used the Praw {"("}Python Reddit API Wrapper{")"}{" "}
          python package, and targeted the top posts of the week in the
          r/perfectlycutscreams subreddit. This content was perfect since all
          posts would be videos and all would "hopefully" generate some sort of
          laugh or unexepectedness.
        </p>
        <h2>Python Video Editing</h2>
        <p>
          After I gathered my content, I need to put them together to create the
          full meme compliation video. There is this handy dandy python package
          called Moviepy. Perfect for automating video editing. Using the
          package, I simply made a bunch of video appends and slapped a "like
          and subscribe" animation to the beginning of the video. And just like
          that, a freshly minted Youtube video was born and ready to be
          uploaded.
        </p>
        <h2>Other Thoughts</h2>
        <p>
          I could have taken the automation process to its fullest extent by
          automatically running the script on every Monday and post the video
          through the Youtube API. However, I decided against this because it
          would give me time to review the video for any nsfw content that the
          depths of Reddit can manufacture.
        </p>
        <h2>Demo</h2>
        <h2>Results</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
