import { MainContentDiv, NameDate, ScrollDiv } from "../../../commonComponents";
import { VolleyballConnectCard } from "./volleyballConnectCard";

export function VolleyballConnectPage() {
  return (
    <ScrollDiv>
      <VolleyballConnectCard toFullscreen />
      <MainContentDiv>
        <NameDate date="7/31/2022" />
        <h2>Introduction</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
