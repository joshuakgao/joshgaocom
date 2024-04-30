import backpropVisual from "../../../../assets/projects/aiml/backpropagationVisualization/titleCardImage.png";
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
      textPosition={["top", "right"]}
      backgroundImage={backpropVisual}
      backgroundDarken={10}
    >
      <h1 className="accent">Backpropagation Visualization</h1>
    </TitleCard>
  );
}
