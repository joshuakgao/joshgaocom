import { MainContentDiv, ScrollDiv } from "../../../commonComponents";
import { VolleyballConnectCard } from "./volleyballConnectCard";

export function VolleyballConnectPage() {
  return (
    <ScrollDiv>
      <VolleyballConnectCard toFullscreen />
      <MainContentDiv>
        <h2>Introduction</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
