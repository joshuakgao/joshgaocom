import { ScrollDiv } from "../components/commonComponents";
import {
  RealEstateLinearRegressionCard,
  BackpropagationVisualizationCard,
  CifarKnnImageClassificationCard,
  GptNanoCard,
} from "../components/projectComponents";

export function AimlPage() {
  return (
    <ScrollDiv className="fade-in-1">
      <GptNanoCard />
      <BackpropagationVisualizationCard />
      <CifarKnnImageClassificationCard />
      <RealEstateLinearRegressionCard />
    </ScrollDiv>
  );
}
