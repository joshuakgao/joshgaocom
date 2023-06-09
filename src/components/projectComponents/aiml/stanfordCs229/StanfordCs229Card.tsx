import { TitleCard } from "../../titleCard";
import thumbnail from "../../../../assets/projects/aiml/stanfordCs229/lectureThumbnail.jpg";

export function StanfordCs229Card({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/aiml/stanfordCs229"
      toFullscreen={toFullscreen}
      textPosition={["left", "center"]}
      backgroundDarken={30}
      backgroundImage={thumbnail}
      isFolder
    >
      <h1 className="primary">Stanford CS229: Machine Learning</h1>
      <h2 className="primary">Lectures presented by Andrew Ng</h2>
    </TitleCard>
  );
}
