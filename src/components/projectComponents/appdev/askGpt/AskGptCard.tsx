import homepage from "../../../../assets/projects/software/joshgaocom/homepage.png";
import { TitleCard } from "../../titleCard";

export function AskGptCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      to="/app-dev/joshgaocom"
      toFullscreen={toFullscreen}
      textPosition={["left", "center"]}
      backgroundImage={homepage}
    >
      <h1>Ask GPT</h1>
      <h2>A mobile app that lets you talk to Chat-GPT</h2>
    </TitleCard>
  );
}
