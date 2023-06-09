import { TitleCard } from "../../titleCard";
import thumbnail from "../../../../../assets/projects/ai-ml/standford-cs229/lectureThumbnail.jpg";

export function stanfordCs229Card({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/app-dev/joshgaocom"
      toFullscreen={toFullscreen}
      textPosition={["left", "center"]}
      backgroundImage={thumbnail}
    >
      <h1>Stanford CS229: Machine Learning</h1>
      <h2>Taught by Andrew Ng</h2>
    </TitleCard>
  );
}
