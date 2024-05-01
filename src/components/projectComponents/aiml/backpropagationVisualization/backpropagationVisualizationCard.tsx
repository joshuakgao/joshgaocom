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
      textPosition={["top", "center"]}
      backgroundImage={backpropVisual}
      backgroundDarken={10}
    >
      <h1
        className="accent"
        style={{
          fontSize: "calc(2vw + 16px)",
          textAlign: "right",
        }}
      >
        Backpropagation Visualization
      </h1>
    </TitleCard>
  );
}
