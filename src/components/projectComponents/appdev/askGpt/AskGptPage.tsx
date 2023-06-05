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
          skills={["react-native", "typescript", "firebase"]}
          projectComponents="Mobile Application Integration with Chat-GPT"
        />
        <h2>Introduction</h2>
      </MainContentDiv>
    </ScrollDiv>
  );
}
