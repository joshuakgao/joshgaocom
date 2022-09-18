import { MainContentDiv, NameDate, ScrollDiv } from "../../../commonComponents";
import { JoshgaocomCard } from "./joshgaocomCard";

export default function JoshgaocomPage() {
  return (
    <ScrollDiv>
      <JoshgaocomCard toFullscreen />
      <MainContentDiv>
        <NameDate date="9/21/2022" />
        <h2>Introduction</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
