import appPreview from "../../../../assets/projects/app-dev/askGpt/chatpage-background.png";
import { TitleCard } from "../../titleCard";

export function AskGptCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      to="/app-dev/askGpt"
      toFullscreen={toFullscreen}
      textPosition={["left", "center"]}
      backgroundImage={appPreview}
    >
      <h1 className="primary">Ask GPT</h1>
      <h2 className="primary">A mobile app that lets you talk to Chat-GPT</h2>
    </TitleCard>
  );
}
