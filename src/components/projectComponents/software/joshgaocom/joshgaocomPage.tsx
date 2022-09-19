import { MainContentDiv, ScrollDiv } from "../../../commonComponents";
import { JoshgaocomCard } from "./joshgaocomCard";

export default function JoshgaocomPage() {
  return (
    <ScrollDiv>
      <JoshgaocomCard toFullscreen />
      <MainContentDiv>
        <h2>Introduction</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
