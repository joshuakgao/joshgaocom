import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { JoshgaocomCard } from "./joshgaocomCard";

export default function JoshgaocomPage() {
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
      </MainContentDiv>
    </ScrollDiv>
  );
}
