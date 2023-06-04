import {
  ContentHeader,
  MainContentDiv,
  ScrollDiv,
} from "../../../commonComponents";
import { VolleyballConnectCard } from "./volleyballConnectCard";

export function VolleyballConnectPage() {
  return (
    <ScrollDiv>
      <VolleyballConnectCard toFullscreen />
      <MainContentDiv>
        <ContentHeader
          date="7/28/2022"
          skills={["react", "typescript", "firebase"]}
          projectComponents="Mobile Dev"
          sources={{
            github: "https://github.com/tugonbob/VolleyballConnect",
            youtube: "",
          }}
        />
        <h2>Introduction</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
