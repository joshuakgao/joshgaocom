import { TitleCard } from "../../titleCard";
import redditYoutube from "../../../../assets/projects/software/redditLaughs/redditAndYoutube.png";
import memeBackground from "../../../../assets/projects/software/redditLaughs/memeBackground.jpg";

export function RedditLaughsCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      backgroundImage={memeBackground}
      backgroundSize="cover"
      backgroundColor="#1e1e1e"
      foregroundSize="calc(15vw + 15vh + 64px)"
      foregroundPosition={["center", "center"]}
      textPosition={["center"]}
      toFullscreen={toFullscreen}
      to="/other/redditLaughs"
    >
      <h1 className="primary">Reddit Laughs</h1>
      <h2 className="primary">
        Automating a Youtube channel with Reddit content
      </h2>
    </TitleCard>
  );
}
