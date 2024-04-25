import { ScrollDiv } from "../components/commonComponents";
import { RealEstateLinearRegressionCard } from "../components/projectComponents";
import { CifarKnnImageClassificationCard } from "../components/projectComponents/aiml/cifarKnnImageClassification/cifarKnnImageClassificationCard";

export function AimlPage() {
  return (
    <ScrollDiv className="fade-in-1">
      <RealEstateLinearRegressionCard />
      <CifarKnnImageClassificationCard />
    </ScrollDiv>
  );
}
