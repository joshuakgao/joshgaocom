import { TitleCard } from "../../titleCard";
import redditYoutube from "../../../../assets/projects/software/redditLaughs/redditToYoutube.png";
import memeBackground from "../../../../assets/projects/software/redditLaughs/memeBackground.jpg";
import redditLogo from "../../../../assets/projects/software/redditLaughs/reddit.png";

export function RedditLaughsCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      backgroundImage={memeBackground}
      backgroundSize="cover"
      backgroundColor="#1e1e1e"
      foregroundImage={redditLogo}
      foregroundSize="calc(5vw + 5vh + 64px)"
      foregroundPosition={["bottom", "center"]}
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
