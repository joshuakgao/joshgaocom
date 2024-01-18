import { ScrollDiv } from "../components/commonComponents";
import {
  AskGptCard,
  JoshgaocomCard,
} from "../components/projectComponents/appdev";

export function AppdevPage() {
  return (
    <ScrollDiv className="fade-in-1">
      <AskGptCard />
      <JoshgaocomCard />
    </ScrollDiv>
  );
}
