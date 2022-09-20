import { TitleCard } from "../../titleCard";
import redditYoutube from "../../../../assets/projects/software/redditLaughs/redditToYoutube.png";

export function RedditLaughsCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      backgroundImage={redditYoutube}
      backgroundSize="cover"
      backgroundColor="#1e1e1e"
      toFullscreen={toFullscreen}
      to="/software/redditLaughs"
    >
      <h1 className="primary">Reddit Laughs</h1>
      <h2 className="primary">
        Automating a Youtube channel with Reddit content
      </h2>
    </TitleCard>
  );
}
