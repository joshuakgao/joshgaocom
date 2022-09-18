import { TitleCard } from "../../titleCard";
import redditYoutube from "../../../../assets/projects/software/redditLaughs/redditYoutubeLogo.png";

export function RedditLaughsCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      backgroundImage={redditYoutube}
      backgroundSize="20vh"
      backgroundColor="#e9e9e9"
      toFullscreen={toFullscreen}
      to="/software/redditLaughs"
    >
      <h1>Reddit Laughs</h1>
      <h2>Automating a Youtube channel with Reddit content</h2>
    </TitleCard>
  );
}
