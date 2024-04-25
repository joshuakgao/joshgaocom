import knnResult from "../../../../assets/projects/aiml/cifarKnnImageClassification/knnResult.png";
import { TitleCard } from "../../../customComponents/titleCard";

export function CifarKnnImageClassificationCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/aiml/cifarKnnImageClassification"
      toFullscreen={toFullscreen}
      textPosition={["left", "middle"]}
      backgroundImage={knnResult}
      backgroundDarken={40}
    >
      <h1 className="primary">Cifar Knn Image Classification</h1>
      <h2 className="primary">With Interactive Demo</h2>
    </TitleCard>
  );
}
