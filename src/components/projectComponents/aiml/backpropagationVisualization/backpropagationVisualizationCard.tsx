import knnResult from "../../../../assets/projects/aiml/cifarKnnImageClassification/knnResult.png";
import { TitleCard } from "../../../customComponents/titleCard";

export function BackpropagationVisualizationCard({
  toFullscreen,
}: {
  toFullscreen?: boolean;
}) {
  return (
    <TitleCard
      to="/aiml/backpropagationVisualization"
      toFullscreen={toFullscreen}
      textPosition={["left", "middle"]}
      backgroundImage={knnResult}
      backgroundDarken={40}
    >
      <h1 className="primary">Interactive Backpropagation Visualization</h1>
    </TitleCard>
  );
}
