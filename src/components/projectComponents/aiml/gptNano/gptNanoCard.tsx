import thumbnail from "../../../../assets/projects/aiml/realEstateLinearRegression/thumbnail.png";
import { TitleCard } from "../../../customComponents/titleCard";

export function GptNanoCard({ toFullscreen }: { toFullscreen?: boolean }) {
  return (
    <TitleCard
      to="/aiml/gptNano"
      toFullscreen={toFullscreen}
      textPosition={["left", "top"]}
      backgroundImage={thumbnail}
      backgroundDarken={50}
    >
      <h1 className="primary">Gpt Nano</h1>
      <h2 className="primary">Beating Gpt-2</h2>
    </TitleCard>
  );
}
