import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { JoshgaocomCard } from "./joshgaocomCard";

export function JoshgaocomPage() {
  return (
    <ScrollDiv>
      <JoshgaocomCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="10/3/2022"
          skills={["react", "typescript", "css", "figma"]}
          projectComponents="Personal Portfolio Website Design"
          sources={{
            github: "https://github.com/tugonbob/joshgao",
          }}
        />
        <h2>Introduction</h2>
        <p>
          I wanted to learn how to use the React framework to create a website.
          So I though what better way to do so than by creating my developer
          portfolio.
        </p>
        <h2>Design</h2>
        <p>
          I took a lot of inspiration from the website https://snp.agency. The
          colors, animations and fonts all spoke to me. It was minimal, yet
          beautiful. After I sketched out an outline of my website in Figma, the
          coding began.
        </p>
        <h2>Code</h2>
        <h3>Difficulties of CSS</h3>
        <p>
          Learning React was quite difficult primarliy because of CSS. Its
          syntax was very different from any other language. My only saving
          grace was that inline styles from React-Native was somewhat similar. I
          was banging my head against the wall wondering why my div had a random
          margin, and I was scratching my head wondering what the difference
          between an "@" and a "." was. And to top it all off, coding animations
          are the WORST in CSS.
        </p>
        <h3>CSS Animations</h3>
        <p>
          I would like to draw your attention to the hamburger menu in the top
          right corner {"("}You may have make your browser narrower for desktop
          users{")"}. The hamburger menu animation alone took several days to
          construct. The middle line actually consists of two lines for the "x"
          when you click it. When I would hover over the hamburger menu, the
          hidden line would pop out for no reason. I was debugging something so
          simple for over a day, and it was one of the most frustrating days of
          my life.
        </p>
        <h2>Writing</h2>
        <p>
          Now comes the fun part. Well, writing the "blog posts" of these
          projects was tedious. But being able to look back at all my work and
          capturing my though processees sparked emense pride and joy for the
          work that I had acomplished. In the header, I can highlight what
          skills I used using small logos and provide important links like the
          Github or Youtube. I even edited my project images in none other than
          MS Paint. The process was time consuming but worth every second.
        </p>
      </MainContentDiv>
    </ScrollDiv>
  );
}
