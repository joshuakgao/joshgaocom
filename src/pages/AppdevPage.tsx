import { ScrollDiv } from "../components/commonComponents";
import {
  AskGptCard,
  JoshgaocomCard,
} from "../components/projectComponents/appdev";

export function AppdevPage() {
  return (
    <ScrollDiv>
      <AskGptCard />
      <JoshgaocomCard />
    </ScrollDiv>
  );
}
